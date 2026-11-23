import { useEffect, useRef } from "react";

/**
 * 3D Ambient Neural Celestial Sphere
 * ─────────────────────────────────────────────────────────────────────────────
 * • Positioned seamlessly on the right side of the Hero section.
 * • Moves and tilts in 3D tracking cursor movement with smooth inertia damping.
 * • Interactive particle evasion: particles dynamically push aside and spring back when cursor approaches.
 * • Continuous auto-spin and dynamic cosine similarity lines between vector nodes.
 */

interface Particle {
  x0: number;
  y0: number;
  z0: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  isKeyNode: boolean;
}

export default function HeroTelemetryPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Sphere parameters
    const TOTAL_PARTICLES = 280;
    const SPHERE_RADIUS = 460;
    const particles: Particle[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      const y = 1 - (i / (TOTAL_PARTICLES - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      particles.push({
        x0: x * SPHERE_RADIUS,
        y0: y * SPHERE_RADIUS,
        z0: z * SPHERE_RADIUS,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
        isKeyNode: i % 6 === 0,
      });
    }

    // Decoupled 3D rotation: continuous auto-spin never stops, while tilt offsets track cursor
    let spinAngle = 0.25;
    let tiltX = 0.12;
    let tiltY = 0.0;
    let targetTiltX = 0.12;
    let targetTiltY = 0.0;
    const autoSpinSpeed = 0.0035;

    // Track mouse coordinates for both 3D sphere tilt and particle evasion
    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      
      // Local canvas coordinates for particle evasion
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };

      // Screen-wide coordinates for 3D sphere tilt & rotation tracking
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetTiltY = normX * 0.85; // Smooth horizontal tilt tracking
      targetTiltX = -normY * 0.65; // Smooth vertical pitch tracking
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      targetTiltX = 0.12;
      targetTiltY = 0.0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);

    // 60 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuous auto-spin advances continuously on every frame (never stops)
      spinAngle += autoSpinSpeed;

      // Smoothly interpolate tilt offsets tracking cursor
      tiltY += (targetTiltY - tiltY) * 0.045;
      tiltX += (targetTiltX - tiltX) * 0.045;

      // Combined 3D rotation angles
      const rotY = spinAngle + tiltY;
      const rotX = tiltX;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 950;

      const mouse = mouseRef.current;
      const REPULSION_RADIUS = 175;
      const REPULSION_FORCE = 52;

      // 1. Draw Volumetric Sphere Body (Soft ambient celestial presence with zero hard borderline)
      const sphereBacking = ctx.createRadialGradient(
        centerX - SPHERE_RADIUS * 0.25,
        centerY - SPHERE_RADIUS * 0.15,
        SPHERE_RADIUS * 0.05,
        centerX,
        centerY,
        SPHERE_RADIUS
      );
      sphereBacking.addColorStop(0, "rgba(18, 27, 42, 0.45)");
      sphereBacking.addColorStop(0.65, "rgba(11, 16, 26, 0.3)");
      sphereBacking.addColorStop(0.9, "rgba(7, 10, 17, 0.12)");
      sphereBacking.addColorStop(1, "rgba(5, 8, 14, 0)"); // Fades smoothly to 0 at perimeter

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, SPHERE_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = sphereBacking;
      ctx.fill();
      ctx.restore();

      // 2. Project 3D Particles & Apply Cursor Evasion Physics
      const projected = particles.map((p) => {
        // 3D rotation
        const x1 = p.x0 * cosY - p.z0 * sinY;
        const z1 = p.z0 * cosY + p.x0 * sinY;

        const y2 = p.y0 * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y0 * sinX;

        // Perspective scale factor
        const scale = fov / (fov + z2);

        // Projected 2D position without evasion
        const basePx = centerX + x1 * scale;
        const basePy = centerY + y2 * scale;

        // Current position with displacement
        let currentPx = basePx + p.dx;
        let currentPy = basePy + p.dy;

        // Calculate evasion / repulsion force from cursor
        if (mouse.active) {
          const distX = currentPx - mouse.x;
          const distY = currentPy - mouse.y;
          const dist = Math.sqrt(distX * distX + distY * distY);

          if (dist < REPULSION_RADIUS && dist > 0.001) {
            const factor = Math.pow(1 - dist / REPULSION_RADIUS, 1.8) * REPULSION_FORCE;
            const targetDx = (distX / dist) * factor;
            const targetDy = (distY / dist) * factor;

            p.vx += (targetDx - p.dx) * 0.24;
            p.vy += (targetDy - p.dy) * 0.24;
          }
        }

        // Spring-damping return to base orbit
        p.vx += -p.dx * 0.12;
        p.vy += -p.dy * 0.12;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.dx += p.vx;
        p.dy += p.vy;

        currentPx = basePx + p.dx;
        currentPy = basePy + p.dy;

        // Depth alpha (brighter in front, dimmer behind)
        const alpha = Math.max(0.12, Math.min(0.95, (z2 + SPHERE_RADIUS) / (SPHERE_RADIUS * 2)));

        return {
          px: currentPx,
          py: currentPy,
          z: z2,
          scale,
          alpha,
          isKeyNode: p.isKeyNode,
        };
      });

      // Sort by depth (painter's algorithm)
      projected.sort((a, b) => a.z - b.z);

      // 3. Dynamic Connection Lines between Nearby Vectors
      const CONNECTION_DIST = 68;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z < -SPHERE_RADIUS * 0.3) continue; // Skip far backside lines

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.z < -SPHERE_RADIUS * 0.3) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * Math.min(p1.alpha, p2.alpha) * 0.38;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(136, 192, 208, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // 4. Draw Vector Particles on Surface
      projected.forEach((p) => {
        const radius = Math.max(1.5, (p.isKeyNode ? 4.5 : 2.5) * p.scale);

        if (p.isKeyNode && p.alpha > 0.4) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 3.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(136, 192, 208, ${p.alpha * 0.28})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isKeyNode
          ? `rgba(236, 239, 244, ${p.alpha})`
          : `rgba(136, 192, 208, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[980px] h-[980px] lg:w-[1020px] lg:h-[1020px] pointer-events-auto select-none overflow-visible">
      <canvas
        ref={canvasRef}
        className="h-full w-full pointer-events-auto"
        style={{ display: "block" }}
      />
    </div>
  );
}
