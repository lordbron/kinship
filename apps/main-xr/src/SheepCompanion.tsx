import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

type SheepCompanionProps = {
  src: string;
};

export default function SheepCompanion({ src }: SheepCompanionProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setLoadError(null);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.2, 3.2);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x223344, 1.8);
    scene.add(hemisphereLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaec8ff, 1.2);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    const root = new THREE.Group();
    scene.add(root);

    const clock = new THREE.Clock();
    const loader = new GLTFLoader();
    let mixer: THREE.AnimationMixer | null = null;
    let frameId = 0;

    const resize = () => {
      const width = Math.max(mount.clientWidth, 1);
      const height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer?.update(delta);
      root.rotation.y += delta * 0.35;
      renderer.render(scene, camera);
    };

    resize();
    loader.load(
      src,
      (gltf: GLTF) => {
        const model = gltf.scene;
        root.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 1.8 / maxDim;

        model.position.x -= center.x;
        model.position.y -= box.min.y;
        model.position.z -= center.z;
        model.scale.setScalar(scale);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          mixer.clipAction(gltf.animations[0]).play();
        }

        animate();
      },
      undefined,
      () => {
        setLoadError("3D model failed to load");
        animate();
      },
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      mixer?.stopAllAction();
      renderer.dispose();
      scene.clear();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  return (
    <div className="sheep-canvas-shell">
      <div ref={mountRef} className="sheep-canvas" />
      {loadError && <p className="sheep-error-text">{loadError}</p>}
    </div>
  );
}
