import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Plane,
  ScrollControls,
  Scroll,
  Text,
  useScroll,
} from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "../model/model";

function CameraRig() {
  const scroll = useScroll();
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    const offset = scroll.offset; 
    const radius = 8;
    const angle = offset * Math.PI * 0.5; 

    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function Screen() {
  return (
    <Canvas className="w-full h-full"  camera={{ position: [0, 2, 8], fov: 45 }}>
      <Suspense fallback={null}>
       
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ff6b9d" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#00ffff" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} />

       <group position={[0, -1.5, -2]}  >
        <Model />
        <Plane position={[0, -0.5, 0]} args={[15, 15]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="0x1f1f1f" roughness={0.95} metalness={0.0} />
        </Plane>
       </group>
        

       
        <ScrollControls damping={0.3} pages={3}>
          <Scroll>
            <Text
              position={[-5.5, 1, 0]}
              fontSize={0.8}
              color="#ffffff"
              anchorX="left"
              anchorY="middle"
            >
              to AEIE
            </Text>
            <Text
              position={[-5, 0.3, 0]}
              fontSize={0.25}
              color="#cccccc"
              anchorX="left"
              anchorY="top"
              maxWidth={6}
              lineHeight={1.4}
            >
              Something extraordinary is brewing. We're crafting a revolutionary
              platform that will transform how you experience digital innovation.
              Get ready for cutting-edge technology, seamless design, and
              features that haven't been seen before.
            </Text>
          </Scroll>

         
          <CameraRig />
        </ScrollControls>
      </Suspense>

     
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
