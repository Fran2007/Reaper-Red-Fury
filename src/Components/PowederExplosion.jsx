import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function PowderExplosion() {
  const particles = useRef();
  const count = 500;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 6;
  }

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ff6a00" size={0.05} />
    </points>
  );
}

export default PowderExplosion;
