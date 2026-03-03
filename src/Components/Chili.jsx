import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Chili({ position = [0, 0, 0], rotationSpeed = 0.01 }) {
  const groupRef = useRef();

  const geometry = useMemo(() => {
    // 🔥 Perfil lateral del chile (más realista)
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const y = i * 0.04;

      // Forma base (más grueso arriba, más fino abajo)
      let radius = 0.35 * Math.sin((i / 50) * Math.PI);

      // Punta más fina
      if (i > 40) radius *= 0.6;

      // Irregularidades naturales
      radius += Math.sin(i * 0.4) * 0.05;
      radius += Math.cos(i * 0.2) * 0.03;

      points.push(new THREE.Vector2(radius, y));
    }

    const geo = new THREE.LatheGeometry(points, 128);

    // 🌊 Curvatura tipo chile real
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      const bend = Math.sin(y * 1.2) * 0.5;
      x += bend;

      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 🌶️ Cuerpo */}
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#a40000"
          roughness={0.35}
          metalness={0.1}
          clearcoat={0.7}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* 🌿 Tallo */}
      <mesh position={[0.2, 3.1, 0]} rotation={[0.3, 0, 0.5]}>
        <cylinderGeometry args={[0.12, 0.18, 0.8, 32]} />
        <meshStandardMaterial color="#2e7d32" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default Chili;
