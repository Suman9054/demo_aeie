import { useEffect, useRef } from "react";
import type { Group } from "three";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Model() {
  const ref = useRef<Group>(null!);
  const { scene, animations } = useGLTF("/robo.glb");
  const { actions, names } = useAnimations(animations, ref);

  useEffect(() => {
    // play first animation in loop
    const action = actions[names[0]];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
    return () => {
      if (action) action.fadeOut(0.5);
    };
  }, [actions, names]);

  return <primitive ref={ref} object={scene} />;
}

