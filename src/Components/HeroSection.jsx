import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef(null);
  const fluidRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let frame;

    const PARTICLE_COUNT = 160; // 🔥 Bajamos un poco para estabilidad

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
        });
      }
    }

    function animate() {
      time.current += 0.0025;

      // 🔥 Fondo fluido GPU
      const x1 = 50 + Math.sin(time.current * 2) * 25;
      const y1 = 50 + Math.cos(time.current * 1.5) * 25;

      const x2 = 50 + Math.cos(time.current * 1.3) * 30;
      const y2 = 50 + Math.sin(time.current * 1.8) * 30;

      fluidRef.current.style.background = `
        radial-gradient(circle at ${x1}% ${y1}%, rgba(255,40,0,0.35), transparent 60%),
        radial-gradient(circle at ${x2}% ${y2}%, rgba(255,120,0,0.25), transparent 60%)
      `;

      // 🔥 Canvas particles
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          p.vx -= dx * 0.0003;
          p.vy -= dy * 0.0003;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 60, 0, 0.5)";
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    window.addEventListener("resize", resize);

    resize();
    createParticles();
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden text-white flex items-center justify-center bg-gradient-to-br from-black via-red-950 to-orange-950"
    >
      {/* 🔥 Fondo fluido GPU */}
      <div ref={fluidRef} className="absolute inset-0" />

      {/* 🔥 Glow central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25),transparent_60%)]" />

      {/* 🌊 Canvas partículas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 🧠 Contenido */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
          REAPER RED FURY
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Polvo puro de Carolina Reaper para los amantes del picante extremo.
        </p>

        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/40 backdrop-blur-sm">
          <p className="text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Número 1 del mundo · 1.4M en la escala Scoville
          </p>
        </div>
      </div>
    </section>
  );
}
