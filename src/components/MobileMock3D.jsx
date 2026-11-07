import { useEffect, useRef, useState } from 'react';
import * as THREE from '../../vendor/three/three.module.js';
import { OrbitControls } from '../../vendor/three/examples/jsm/controls/OrbitControls.js';

function roundedRect(width, height, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

export function MobileMock3D({ image, alt, setIsPaused }) {
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const screenMaterialsRef = useRef([]);
  const rendererRef = useRef(null);
  const texturesRef = useRef([null, null]);
  const activeScreenRef = useRef(0);
  const hasScreenRef = useRef(false);
  const transitionFrameRef = useRef(null);
  const loadIdRef = useRef(0);
  const renderRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let controls;
    let observer;
    let frame = null;
    let handleStart;
    let handleEnd;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
    camera.position.set(0, 0, 10.2);

    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      rendererRef.current = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.className = 'absolute left-1/2 top-0 h-full w-[140%] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 touch-none bg-transparent';
      renderer.domElement.style.opacity = '0';
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xffffff, 0x252a31, 2.2));
      const keyLight = new THREE.DirectionalLight(0xffffff, 3);
      keyLight.position.set(-3, 5, 7);
      scene.add(keyLight);
      const edgeLight = new THREE.DirectionalLight(0x91d8e8, 1.6);
      edgeLight.position.set(4, -2, -4);
      scene.add(edgeLight);

      const phone = new THREE.Group();
      phone.rotation.set(0.035, -0.18, -0.1);
      scene.add(phone);

      const bodyGeometry = new THREE.ExtrudeGeometry(roundedRect(2.1, 4.25, 0.3), {
        depth: 0.12,
        bevelEnabled: true,
        bevelSegments: 5,
        bevelSize: 0.035,
        bevelThickness: 0.035,
        steps: 1,
        curveSegments: 10
      });
      bodyGeometry.translate(0, 0, -0.06);
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x101419, metalness: 0.72, roughness: 0.24 });
      phone.add(new THREE.Mesh(bodyGeometry, bodyMaterial));

      const screenWidth = 1.98;
      const screenHeight = 4.02;
      const screenGeometry = new THREE.ShapeGeometry(roundedRect(screenWidth, screenHeight, 0.2), 12);
      const positions = screenGeometry.getAttribute('position');
      const uvs = screenGeometry.getAttribute('uv');
      for (let i = 0; i < positions.count; i++) {
        uvs.setXY(i, positions.getX(i) / screenWidth + 0.5, positions.getY(i) / screenHeight + 0.5);
      }
      uvs.needsUpdate = true;

      screenMaterialsRef.current = [0, 1].map((index) => {
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
        const screen = new THREE.Mesh(screenGeometry, material);
        screen.position.z = 0.105 + index * 0.001;
        screen.renderOrder = index + 1;
        phone.add(screen);
        return material;
      });

      const sideMaterial = new THREE.MeshStandardMaterial({ color: 0x7d858e, metalness: 0.8, roughness: 0.22 });
      [[-1.075, 0.9, 0.06, 0.34], [-1.075, 0.38, 0.06, 0.48], [1.075, 0.62, 0.06, 0.56]].forEach(([x, y, width, height]) => {
        const button = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.08), sideMaterial);
        button.position.set(x, y, 0);
        phone.add(button);
      });

      const cameraPlate = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.72, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x1b2027, metalness: 0.55, roughness: 0.3 })
      );
      cameraPlate.position.set(-0.57, 1.52, -0.105);
      phone.add(cameraPlate);
      const lensMaterial = new THREE.MeshStandardMaterial({ color: 0x080b10, metalness: 0.8, roughness: 0.12 });
      [[-0.72, 1.69], [-0.42, 1.69], [-0.72, 1.38]].forEach(([x, y]) => {
        const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.045, 24), lensMaterial);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(x, y, -0.14);
        phone.add(lens);
      });

      controls = new OrbitControls(camera, renderer.domElement);
      controlsRef.current = controls;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.rotateSpeed = 0.65;
      controls.minPolarAngle = 0.9;
      controls.maxPolarAngle = 2.2;

      const render = () => {
        frame = null;
        controls.update();
        renderer.render(scene, camera);
      };
      const scheduleRender = () => {
        if (frame === null) frame = window.requestAnimationFrame(render);
      };
      renderRef.current = scheduleRender;
      controls.addEventListener('change', scheduleRender);
      handleStart = () => setIsPaused(true);
      handleEnd = () => setIsPaused(false);
      controls.addEventListener('start', handleStart);
      controls.addEventListener('end', handleEnd);

      const resize = () => {
        const { width, height } = renderer.domElement.getBoundingClientRect();
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        scheduleRender();
      };
      observer = new ResizeObserver(resize);
      observer.observe(mount);
      resize();
    } catch {
      observer?.disconnect();
      controls?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
      rendererRef.current = null;
      controlsRef.current = null;
      screenMaterialsRef.current = [];
      renderRef.current = null;
      return undefined;
    }

    return () => {
      observer?.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
      if (transitionFrameRef.current !== null) window.cancelAnimationFrame(transitionFrameRef.current);
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
      controls.dispose();
      controlsRef.current = null;
      rendererRef.current = null;
      renderRef.current = null;
      scene.traverse((object) => {
        if (!object.isMesh) return;
        object.geometry.dispose();
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
      });
      texturesRef.current.forEach((texture) => texture?.dispose());
      texturesRef.current = [null, null];
      screenMaterialsRef.current = [];
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [setIsPaused]);

  useEffect(() => {
    if (screenMaterialsRef.current.length !== 2) return undefined;
    let cancelled = false;
    const loadId = ++loadIdRef.current;

    const cancelTransition = () => {
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
        transitionFrameRef.current = null;
      }
      screenMaterialsRef.current.forEach((material, index) => {
        if (index === activeScreenRef.current) {
          material.opacity = 1;
          return;
        }
        material.opacity = 0;
        texturesRef.current[index]?.dispose();
        texturesRef.current[index] = null;
        material.map = null;
        material.needsUpdate = true;
      });
      renderRef.current?.();
    };

    new THREE.TextureLoader().load(image, (texture) => {
      if (cancelled || loadId !== loadIdRef.current || screenMaterialsRef.current.length !== 2) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = rendererRef.current?.capabilities.getMaxAnisotropy() ?? 1;
      cancelTransition();

      const previousIndex = activeScreenRef.current;
      const nextIndex = hasScreenRef.current ? 1 - previousIndex : 0;
      const previousMaterial = screenMaterialsRef.current[previousIndex];
      const nextMaterial = screenMaterialsRef.current[nextIndex];
      texturesRef.current[nextIndex]?.dispose();
      nextMaterial.map = texture;
      nextMaterial.opacity = hasScreenRef.current ? 0 : 1;
      nextMaterial.needsUpdate = true;
      texturesRef.current[nextIndex] = texture;

      if (!hasScreenRef.current) {
        hasScreenRef.current = true;
        activeScreenRef.current = nextIndex;
        setReady(true);
        if (mountRef.current) mountRef.current.querySelector('canvas')?.style.setProperty('opacity', '1');
        renderRef.current?.();
        return;
      }

      const start = performance.now();
      const fadeDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 650;
      const fade = (now) => {
        const progress = fadeDuration === 0 ? 1 : Math.min((now - start) / fadeDuration, 1);
        nextMaterial.opacity = progress;
        previousMaterial.opacity = 1 - progress;
        renderRef.current?.();
        if (progress < 1) {
          transitionFrameRef.current = window.requestAnimationFrame(fade);
          return;
        }
        transitionFrameRef.current = null;
        previousMaterial.map = null;
        previousMaterial.needsUpdate = true;
        texturesRef.current[previousIndex]?.dispose();
        texturesRef.current[previousIndex] = null;
        activeScreenRef.current = nextIndex;
      };
      transitionFrameRef.current = window.requestAnimationFrame(fade);
    });
    return () => {
      cancelled = true;
      loadIdRef.current++;
      cancelTransition();
    };
  }, [image]);

  const handleKeyDown = (event) => {
    const controls = controlsRef.current;
    if (!controls) return;
    const turn = 0.16;
    if (event.key === 'ArrowLeft') controls.rotateLeft(turn);
    else if (event.key === 'ArrowRight') controls.rotateLeft(-turn);
    else if (event.key === 'ArrowUp') controls.rotateUp(turn);
    else if (event.key === 'ArrowDown') controls.rotateUp(-turn);
    else return;
    event.preventDefault();
    renderRef.current?.();
  };

  return (
    <div
      ref={mountRef}
      role="group"
      tabIndex={0}
      aria-label={`${alt}. Drag to rotate, or focus and use the arrow keys.`}
      onKeyDown={handleKeyDown}
      className="relative aspect-[1/2] w-full rounded-[2.4rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E22C28]"
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full rounded-[2rem] object-cover transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}

