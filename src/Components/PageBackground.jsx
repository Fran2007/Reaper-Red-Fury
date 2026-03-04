export default function PageBackground({ children, className = "" }) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden text-white bg-gradient-to-br from-black via-red-950 to-orange-950 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.25),transparent_60%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
