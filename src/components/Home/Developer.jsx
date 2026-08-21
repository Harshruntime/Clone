'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Developer() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredSide, setHoveredSide] = useState(null); // 'left' | 'right' | null
  const mousePosRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;

    const particles = [];
    const NUM_PARTICLES = 1300;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const r = Math.random();
        let color = '#171717';
        if (r < 0.03) color = '#dc2626';
        else if (r < 0.08) color = '#2563eb';
        else color = '#18181b';

        particles.push({
          x: Math.random() * (width || 1000),
          y: Math.random() * (height || 600),
          baseX: Math.random() * (width || 1000),
          baseY: Math.random() * (height || 600),
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 1.2 + 0.8,
          baseColor: color,
          alpha: Math.random() * 0.5 + 0.3,
          seed: Math.random() * 100,
        });
      }
    };

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      if (particles.length === 0) {
        initParticles();
      } else {
        particles.forEach((p) => {
          p.baseX = Math.random() * width;
          p.baseY = Math.random() * height;
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // =========================================================================
    // Precise Two-Parallel-Line Curly Braces { } (Matches Image 1, 3, 4)
    // =========================================================================
    const getLeftBracePoints = (centerX, centerY) => {
      const boxW = Math.min(width * 0.38, 380);
      const boxH = Math.min(height * 0.74, 390);
      const halfW = boxW / 2;
      const halfH = boxH / 2;
      const cornerR = 40;
      const notchDepth = 28;
      const notchH = 44;
      const armEndX = 100;
      const hookLen = 22;
      const lineGap = 22; // Parallel line gap

      const generateBraceBackbone = (isRight) => {
        const path = [];
        const sign = isRight ? 1 : -1;
        const startX = sign * armEndX;

        // 1. Top Hook (downward tip at center top)
        for (let t = 0; t <= 1; t += 0.15) {
          path.push({ x: startX, y: -halfH + t * hookLen, nx: sign, ny: 0 });
        }

        // 2. Top Horizontal Arm
        const cornerStartX = sign * (halfW - cornerR);
        const topArmSteps = 16;
        for (let i = 0; i <= topArmSteps; i++) {
          const t = i / topArmSteps;
          path.push({
            x: startX + t * (cornerStartX - startX),
            y: -halfH,
            nx: 0,
            ny: -1,
          });
        }

        // 3. Top Corner Arc
        const arcSteps = 12;
        const startAng = Math.PI * 1.5;
        const endAng = isRight ? Math.PI * 2.0 : Math.PI * 1.0;
        for (let i = 0; i <= arcSteps; i++) {
          const ang = startAng + (i / arcSteps) * (endAng - startAng);
          const cx = sign * (halfW - cornerR);
          const cy = -halfH + cornerR;
          path.push({
            x: cx + Math.cos(ang) * cornerR,
            y: cy + Math.sin(ang) * cornerR,
            nx: Math.cos(ang),
            ny: Math.sin(ang),
          });
        }

        // 4. Upper Vertical Spine
        const spineX = sign * halfW;
        const notchTopY = -notchH / 2;
        const upperSpineSteps = 14;
        for (let i = 0; i <= upperSpineSteps; i++) {
          const t = i / upperSpineSteps;
          path.push({
            x: spineX,
            y: -halfH + cornerR + t * (notchTopY - (-halfH + cornerR)),
            nx: sign,
            ny: 0,
          });
        }

        // 5. Middle Rectangular Notch (< or >)
        const notchOuterX = sign * (halfW + notchDepth);
        const notchBotY = notchH / 2;
        for (let t = 0; t <= 1; t += 0.2) {
          path.push({ x: spineX + t * (notchOuterX - spineX), y: notchTopY, nx: 0, ny: -1 });
        }
        for (let t = 0; t <= 1; t += 0.15) {
          path.push({ x: notchOuterX, y: notchTopY + t * notchH, nx: sign, ny: 0 });
        }
        for (let t = 0; t <= 1; t += 0.2) {
          path.push({ x: notchOuterX + t * (spineX - notchOuterX), y: notchBotY, nx: 0, ny: 1 });
        }

        // 6. Lower Vertical Spine
        const botCornerStartY = halfH - cornerR;
        const lowerSpineSteps = 14;
        for (let i = 0; i <= lowerSpineSteps; i++) {
          const t = i / lowerSpineSteps;
          path.push({
            x: spineX,
            y: notchBotY + t * (botCornerStartY - notchBotY),
            nx: sign,
            ny: 0,
          });
        }

        // 7. Bottom Corner Arc
        const botStartAng = isRight ? 0 : Math.PI;
        const botEndAng = isRight ? Math.PI * 0.5 : Math.PI * 0.5;
        for (let i = 0; i <= arcSteps; i++) {
          const ang = botStartAng + (i / arcSteps) * (botEndAng - botStartAng);
          const cx = sign * (halfW - cornerR);
          const cy = halfH - cornerR;
          path.push({
            x: cx + Math.cos(ang) * cornerR,
            y: cy + Math.sin(ang) * cornerR,
            nx: Math.cos(ang),
            ny: Math.sin(ang),
          });
        }

        // 8. Bottom Horizontal Arm
        for (let i = 0; i <= topArmSteps; i++) {
          const t = i / topArmSteps;
          path.push({
            x: cornerStartX + t * (startX - cornerStartX),
            y: halfH,
            nx: 0,
            ny: 1,
          });
        }

        // 9. Bottom Hook (upward tip at center bottom)
        for (let t = 0; t <= 1; t += 0.15) {
          path.push({
            x: startX,
            y: halfH - t * hookLen,
            nx: sign,
            ny: 0,
          });
        }

        return path;
      };

      const leftBackbone = generateBraceBackbone(false);
      const rightBackbone = generateBraceBackbone(true);

      const convertBackboneToTwoParallelLines = (backbone) => {
        const line1Dots = [];
        const line2Dots = [];

        backbone.forEach((pt) => {
          const halfGap = lineGap / 2;

          // Line 1: Outer Dotted Line
          line1Dots.push({
            x: centerX + pt.x + pt.nx * halfGap,
            y: centerY + pt.y + pt.ny * halfGap,
          });

          // Line 2: Inner Dotted Line
          line2Dots.push({
            x: centerX + pt.x - pt.nx * halfGap,
            y: centerY + pt.y - pt.ny * halfGap,
          });
        });

        return [...line1Dots, ...line2Dots];
      };

      return [
        ...convertBackboneToTwoParallelLines(leftBackbone),
        ...convertBackboneToTwoParallelLines(rightBackbone),
      ];
    };

    // =========================================================================
    // Right Side: 6 Concentric Circles (Matches antigravity.google)
    // =========================================================================
    const getRightCirclePoints = (centerX, centerY) => {
      const points = [];
      const numCircles = 6;
      const ringRadius = Math.min(width * 0.15, 180);
      const circleRadius = Math.min(width * 0.052, 62);
      const innerRadius = circleRadius * 0.65;

      const pointsOuter = 36;
      const pointsInner = 20;

      for (let c = 0; c < numCircles; c++) {
        const angle = (c * 2 * Math.PI) / numCircles - Math.PI / 2;
        const cx = centerX + ringRadius * Math.cos(angle);
        const cy = centerY + ringRadius * Math.sin(angle);

        // 1. Outer Circle Line
        for (let p = 0; p < pointsOuter; p++) {
          const theta = (p * 2 * Math.PI) / pointsOuter;
          points.push({
            x: cx + circleRadius * Math.cos(theta),
            y: cy + circleRadius * Math.sin(theta),
            isInnerRing: false,
          });
        }

        // 2. Inner Concentric Ring Line
        for (let p = 0; p < pointsInner; p++) {
          const theta = (p * 2 * Math.PI) / pointsInner;
          points.push({
            x: cx + innerRadius * Math.cos(theta),
            y: cy + innerRadius * Math.sin(theta),
            isInnerRing: true,
          });
        }
      }

      return points;
    };

    // Animation Loop - Ultra Smooth Motion Physics
    let time = 0;
    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.02;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.02;

      let leftCenter = { x: width * 0.25, y: height * 0.5 };
      let rightCenter = { x: width * 0.75, y: height * 0.5 };

      if (leftCardRef.current && containerRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const lRect = leftCardRef.current.getBoundingClientRect();
        leftCenter = {
          x: lRect.left - cRect.left + lRect.width / 2,
          y: lRect.top - cRect.top + lRect.height / 2,
        };
      }
      if (rightCardRef.current && containerRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const rRect = rightCardRef.current.getBoundingClientRect();
        rightCenter = {
          x: rRect.left - cRect.left + rRect.width / 2,
          y: rRect.top - cRect.top + rRect.height / 2,
        };
      }

      let shapeTargets = [];
      if (hoveredSide === 'left') {
        shapeTargets = getLeftBracePoints(leftCenter.x, leftCenter.y);
      } else if (hoveredSide === 'right') {
        shapeTargets = getRightCirclePoints(rightCenter.x, rightCenter.y);
      }

      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      particles.forEach((p, idx) => {
        let tx = p.baseX;
        let ty = p.baseY;
        let isTargeted = false;

        p.baseX += Math.sin(time * 0.5 + p.seed) * 0.08;
        p.baseY += Math.cos(time * 0.8 + p.seed) * 0.08;
        if (p.baseX < 0) p.baseX = width;
        if (p.baseX > width) p.baseX = 0;
        if (p.baseY < 0) p.baseY = height;
        if (p.baseY > height) p.baseY = 0;

        if (shapeTargets.length > 0 && idx < shapeTargets.length) {
          const target = shapeTargets[idx];
          tx = target.x;
          ty = target.y;
          isTargeted = true;

          if (target.isInnerRing) {
            tx += Math.sin(time * 0.8 + p.seed) * 1.2;
            ty += Math.cos(time * 0.8 + p.seed) * 1.2;
          }
        }

        const lerpSpeed = isTargeted ? 0.025 : 0.01;
        p.x += (tx - p.x) * lerpSpeed;
        p.y += (ty - p.y) * lerpSpeed;

        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const maxDist = 140;
        if (distSq < maxDist * maxDist && mx > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / maxDist) * 5;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 0.02;
          p.y += Math.sin(angle) * force * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, isTargeted ? p.size * 1.15 : p.size, 0, Math.PI * 2);

        if (isTargeted) {
          ctx.fillStyle = '#09090b';
          ctx.globalAlpha = 0.9 + Math.sin(time * 2 + p.seed) * 0.1;
        } else {
          ctx.fillStyle = p.baseColor;
          ctx.globalAlpha = p.alpha;
        }

        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [hoveredSide]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current.targetX = e.clientX - rect.left;
    mousePosRef.current.targetY = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mousePosRef.current.targetX = -1000;
    mousePosRef.current.targetY = -1000;
    setHoveredSide(null);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[640px] py-24 px-6 md:px-12 bg-[#fafafa] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Dual Cards Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        
        {/* Left Side: For developers */}
        <div
          ref={leftCardRef}
          onMouseEnter={() => setHoveredSide('left')}
          className="group relative flex flex-col items-center justify-center text-center p-8 md:p-14 rounded-3xl transition-all duration-300 cursor-pointer"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neutral-200/90 bg-white/80 backdrop-blur-md shadow-2xs mb-6">
            <span className="text-xs font-medium text-neutral-600">Available at no charge</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-2">
            For developers
          </h2>

          {/* Subheading */}
          <p className="text-3xl sm:text-4xl md:text-4xl font-normal tracking-tight text-neutral-800 mb-9">
            Achieve new heights
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-neutral-950 text-white font-medium text-sm transition-all duration-200 hover:bg-neutral-800 hover:scale-105 active:scale-95 shadow-md">
            Download
          </button>
        </div>

        {/* Right Side: For organizations */}
        <div
          ref={rightCardRef}
          onMouseEnter={() => setHoveredSide('right')}
          className="group relative flex flex-col items-center justify-center text-center p-8 md:p-14 rounded-3xl transition-all duration-300 cursor-pointer"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-neutral-200/90 bg-white/80 backdrop-blur-md shadow-2xs mb-6">
            <span className="text-xs font-medium text-neutral-600">Now Available!</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-normal tracking-tight text-neutral-900 mb-2">
            For organizations
          </h2>

          {/* Subheading */}
          <p className="text-3xl sm:text-4xl md:text-4xl font-normal tracking-tight text-neutral-800 mb-9">
            Level up your entire team
          </p>

          {/* CTA Button */}
          <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-neutral-900 font-medium text-sm transition-all duration-200 hover:bg-white hover:border-neutral-300 hover:scale-105 active:scale-95 shadow-2xs">
            Read More
          </button>
        </div>

      </div>
    </section>
  );
}
