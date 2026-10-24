/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { RotateCw, Eye, Sparkles, ChevronDown, ChevronUp, Compass } from 'lucide-react';

interface Hero3DCanvasProps {
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion Scroll tracking
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Framer Motion 3D perspective transform for the container
  const containerY = useTransform(scrollYProgress, [0, 0.4], [0, 70]);
  const containerScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.94]);
  const containerRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 8]);
  const containerOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 0.92, 0.75]);

  // Mirror scroll progress to ref for 60fps Three.js animation loop without re-renders
  const scrollRef = useRef(0);
  useEffect(() => {
    return smoothScroll.on('change', (latest) => {
      scrollRef.current = latest;
    });
  }, [smoothScroll]);

  // User interactive state (mirrored into refs for zero-stall animation loop)
  const [autoRotate, setAutoRotate] = useState(true);
  const [cameraView, setCameraView] = useState<'front' | 'angle' | 'close'>('front');
  const [accentColor, setAccentColor] = useState<'purple' | 'cyan' | 'emerald'>('purple');
  const [showControls, setShowControls] = useState(true);

  const autoRotateRef = useRef(autoRotate);
  const cameraViewRef = useRef(cameraView);
  const accentColorRef = useRef(accentColor);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    cameraViewRef.current = cameraView;
  }, [cameraView]);

  useEffect(() => {
    accentColorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Initialize Three.js Scene & Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Environment Map (Studio PBR reflection)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key + Cool Fill + Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xa78bfa, 2.5); // Warm violet key
    keyLight.position.set(4, 5, 4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.8); // Cyan fill
    fillLight.position.set(-4, 2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 2.0); // Rim backlight
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // 5. Materials definition
    const colorMap = {
      purple: { primary: 0x8b5cf6, emissive: 0xa855f7, glow: 0xc084fc },
      cyan: { primary: 0x06b6d4, emissive: 0x0891b2, glow: 0x38bdf8 },
      emerald: { primary: 0x10b981, emissive: 0x059669, glow: 0x34d399 },
    };

    const armorMaterial = new THREE.MeshStandardMaterial({
      color: 0x161824,
      roughness: 0.25,
      metalness: 0.85,
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: 0x2d3142,
      roughness: 0.4,
      metalness: 0.6,
    });

    const goldTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.9,
    });

    const visorMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      roughness: 0.1,
      metalness: 0.95,
      emissive: colorMap.purple.emissive,
      emissiveIntensity: 0.85,
    });

    const glowCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.2,
      emissive: colorMap.purple.primary,
      emissiveIntensity: 1.5,
    });

    // 6. Assemble 3D Character Group (Procedural 10-part model)
    const characterRoot = new THREE.Group();
    scene.add(characterRoot);

    // Pedestal base & Ground shadow
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.15, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0f111a,
      roughness: 0.6,
      metalness: 0.4,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.6;
    baseMesh.receiveShadow = !isSoftwareGl;
    characterRoot.add(baseMesh);

    // Neon ring around base
    const ringGeo = new THREE.TorusGeometry(1.7, 0.025, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: colorMap.purple.glow });
    const baseRing = new THREE.Mesh(ringGeo, ringMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.52;
    characterRoot.add(baseRing);

    // Character Body Container
    const actorGroup = new THREE.Group();
    actorGroup.position.y = -0.5;
    characterRoot.add(actorGroup);

    // Torso / Tech Jacket
    const torsoGeo = new THREE.CylinderGeometry(0.55, 0.4, 0.95, 8);
    const torsoMesh = new THREE.Mesh(torsoGeo, armorMaterial);
    torsoMesh.position.y = 0;
    torsoMesh.castShadow = !isSoftwareGl;
    actorGroup.add(torsoMesh);

    // Chest Plate
    const chestPlateGeo = new THREE.BoxGeometry(0.7, 0.5, 0.25);
    const chestPlate = new THREE.Mesh(chestPlateGeo, armorMaterial);
    chestPlate.position.set(0, 0.1, 0.28);
    actorGroup.add(chestPlate);

    // Arc Core in Chest
    const coreGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const coreMesh = new THREE.Mesh(coreGeo, glowCoreMaterial);
    coreMesh.position.set(0, 0.12, 0.4);
    actorGroup.add(coreMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.2, 0.22, 0.25, 16);
    const neckMesh = new THREE.Mesh(neckGeo, jointMaterial);
    neckMesh.position.y = 0.55;
    actorGroup.add(neckMesh);

    // Head Container
    const headGroup = new THREE.Group();
    headGroup.position.y = 0.85;
    actorGroup.add(headGroup);

    // Cyber Helmet
    const helmetGeo = new THREE.SphereGeometry(0.48, 32, 24);
    helmetGeo.scale(1, 1.15, 1.05);
    const helmetMesh = new THREE.Mesh(helmetGeo, armorMaterial);
    helmetMesh.castShadow = !isSoftwareGl;
    headGroup.add(helmetMesh);

    // Curved Visor
    const visorGeo = new THREE.SphereGeometry(0.46, 32, 16, 0, Math.PI, Math.PI * 0.25, Math.PI * 0.4);
    const visorMesh = new THREE.Mesh(visorGeo, visorMaterial);
    visorMesh.rotation.y = -Math.PI / 2;
    visorMesh.position.set(0, -0.02, 0.06);
    headGroup.add(visorMesh);

    // Headset / Earphones (Left & Right)
    const earpieceGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 24);
    earpieceGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earpieceGeo, jointMaterial);
    leftEar.position.set(-0.52, 0, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earpieceGeo, jointMaterial);
    rightEar.position.set(0.52, 0, 0);
    headGroup.add(rightEar);

    // Headphone arch
    const archGeo = new THREE.TorusGeometry(0.52, 0.04, 16, 32, Math.PI * 0.9);
    const archMesh = new THREE.Mesh(archGeo, goldTrimMaterial);
    archMesh.rotation.z = -Math.PI * 0.45;
    archMesh.position.set(0, 0.1, 0);
    headGroup.add(archMesh);

    // Shoulders & Arms
    const shoulderGeo = new THREE.SphereGeometry(0.22, 16, 16);

    const leftShoulder = new THREE.Mesh(shoulderGeo, armorMaterial);
    leftShoulder.position.set(-0.7, 0.35, 0);
    actorGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeo, armorMaterial);
    rightShoulder.position.set(0.7, 0.35, 0);
    actorGroup.add(rightShoulder);

    // Forearms holding holographic tablet
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.65, 16);

    const leftArm = new THREE.Mesh(armGeo, jointMaterial);
    leftArm.position.set(-0.55, 0.05, 0.3);
    leftArm.rotation.x = Math.PI / 4;
    leftArm.rotation.z = -Math.PI / 8;
    actorGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, jointMaterial);
    rightArm.position.set(0.55, 0.05, 0.3);
    rightArm.rotation.x = Math.PI / 4;
    rightArm.rotation.z = Math.PI / 8;
    actorGroup.add(rightArm);

    // Floating Holographic Pad
    const padGeo = new THREE.BoxGeometry(0.85, 0.03, 0.55);
    const padMesh = new THREE.Mesh(padGeo, visorMaterial);
    padMesh.position.set(0, 0.05, 0.62);
    padMesh.rotation.x = -Math.PI / 6;
    actorGroup.add(padMesh);

    // Floating 3D Code Cube above pad
    const cubeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const cubeMesh = new THREE.Mesh(cubeGeo, glowCoreMaterial);
    cubeMesh.position.set(0, 0.3, 0.62);
    actorGroup.add(cubeMesh);

    // 7. Orbiting Tech Satellites (React, TS, UI/UX, Node symbols)
    const orbitGroup = new THREE.Group();
    characterRoot.add(orbitGroup);

    const orbitItems: {
      mesh: THREE.Mesh;
      baseAngle: number;
      angle: number;
      baseRadius: number;
      speed: number;
      y: number;
    }[] = [];

    const techNodes = [
      { color: 0x61dafb, size: 0.12 }, // React Cyan
      { color: 0x3178c6, size: 0.11 }, // TypeScript Blue
      { color: 0x8b5cf6, size: 0.13 }, // UI/UX Violet
      { color: 0x22c55e, size: 0.11 }, // Node Green
    ];

    techNodes.forEach((node, i) => {
      const geo = new THREE.OctahedronGeometry(node.size, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const baseAngle = (i * Math.PI * 2) / techNodes.length;
      const baseRadius = 1.6 + (i % 2) * 0.3;
      const y = -0.2 + (i % 3) * 0.35;
      mesh.position.set(Math.cos(baseAngle) * baseRadius, y, Math.sin(baseAngle) * baseRadius);
      orbitGroup.add(mesh);
      orbitItems.push({
        mesh,
        baseAngle,
        angle: baseAngle,
        baseRadius,
        speed: 0.008 + (i % 2) * 0.004,
        y,
      });
    });

    // Outer orbital ring
    const orbitRingGeo = new THREE.TorusGeometry(1.85, 0.015, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI * 0.4;
    orbitRing.position.y = 0.1;
    characterRoot.add(orbitRing);

    // 8. Mouse Tracking & Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.008;
      } else {
        targetRotationY = normX * 0.45;
        targetRotationX = -normY * 0.2;
      }

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop (Strictly adhering to Three.js & ultra-mode rules)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animationFrameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          animationFrameId = window.setTimeout(cb, 80);
        }
      };
      animationFrameId = window.setTimeout(poll, 5);
    }

    const targetCameraPos = new THREE.Vector3(0, 0.4, 5.2);
    const targetCameraLook = new THREE.Vector3(0, 0.1, 0);

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();
      const scroll = scrollRef.current; // framer-motion scroll value (0 to 1)

      // SCROLL-TRIGGERED 3D RESPONSIVENESS:
      // 1) As user scrolls down, camera smoothly adapts elevation and depth
      const scrollCamYOffset = scroll * 0.75;
      const scrollCamZOffset = scroll * 0.5;

      if (cameraViewRef.current === 'front') {
        targetCameraPos.set(0, 0.35 + scrollCamYOffset, 5.0 + scrollCamZOffset);
      } else if (cameraViewRef.current === 'angle') {
        targetCameraPos.set(2.4, 0.8 + scrollCamYOffset, 4.4 + scrollCamZOffset);
      } else if (cameraViewRef.current === 'close') {
        targetCameraPos.set(0, 0.5 + scrollCamYOffset, 3.4 + scrollCamZOffset);
      }
      camera.position.lerp(targetCameraPos, 0.05);
      camera.lookAt(targetCameraLook);

      // Accent color updates
      const currentAccent = colorMap[accentColorRef.current] || colorMap.purple;
      visorMaterial.emissive.setHex(currentAccent.emissive);
      glowCoreMaterial.emissive.setHex(currentAccent.primary);
      ringMat.color.setHex(currentAccent.glow);

      // Character gentle breathing and rotation + scroll response
      const scrollTiltX = scroll * 0.35;
      const scrollSpinY = scroll * Math.PI * 1.5;

      actorGroup.position.y = -0.5 + Math.sin(time * 2) * 0.04 + scroll * 0.15;
      cubeMesh.position.y = 0.28 + Math.sin(time * 3) * 0.05 + scroll * 0.2;
      cubeMesh.rotation.y += delta * (1.5 + scroll * 4);
      cubeMesh.rotation.x += delta * (0.8 + scroll * 2);

      // Head tracking
      headGroup.rotation.y = THREE.MathUtils.damp(
        headGroup.rotation.y,
        targetRotationY * 0.6 + Math.sin(scroll * Math.PI) * 0.3,
        5,
        delta
      );
      headGroup.rotation.x = THREE.MathUtils.damp(
        headGroup.rotation.x,
        targetRotationX * 0.5 - scrollTiltX * 0.3,
        5,
        delta
      );

      // Root rotation combines auto-rotate or manual tracking + dynamic scroll rotation
      if (autoRotateRef.current && !isDragging) {
        characterRoot.rotation.y += delta * 0.35;
      } else {
        characterRoot.rotation.y = THREE.MathUtils.damp(
          characterRoot.rotation.y,
          targetRotationY + scrollSpinY,
          4,
          delta
        );
      }
      characterRoot.rotation.x = THREE.MathUtils.damp(
        characterRoot.rotation.x,
        targetRotationX * 0.3 + scrollTiltX,
        4,
        delta
      );

      // Orbiting tech items expand radius and accelerate on scroll
      const dynamicRadiusMultiplier = 1 + scroll * 0.45;
      orbitItems.forEach((item) => {
        item.angle += item.speed * (1 + scroll * 3.5);
        const currentRadius = item.baseRadius * dynamicRadiusMultiplier;
        item.mesh.position.x = Math.cos(item.angle) * currentRadius;
        item.mesh.position.z = Math.sin(item.angle) * currentRadius;
        item.mesh.position.y = item.y + Math.sin(time * 2 + item.angle) * 0.1 + scroll * 0.25;
        item.mesh.rotation.y += delta * (2 + scroll * 5);
        item.mesh.rotation.x += delta * (1 + scroll * 3);
      });

      orbitRing.rotation.z += delta * (0.2 + scroll * 1.2);
      orbitRing.scale.setScalar(1 + scroll * 0.35);

      // Render
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    // Start loop
    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      animationFrameId = requestAnimationFrame(tick);
    }

    // 10. Clean up
    return () => {
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      // Dispose geometries and materials
      [
        baseGeo,
        ringGeo,
        torsoGeo,
        chestPlateGeo,
        coreGeo,
        neckGeo,
        helmetGeo,
        visorGeo,
        earpieceGeo,
        archGeo,
        shoulderGeo,
        armGeo,
        padGeo,
        cubeGeo,
        orbitRingGeo,
      ].forEach((g) => g.dispose());

      [
        armorMaterial,
        jointMaterial,
        goldTrimMaterial,
        visorMaterial,
        glowCoreMaterial,
        baseMat,
        ringMat,
        orbitRingMat,
      ].forEach((m) => m.dispose());

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      style={{
        y: containerY,
        scale: containerScale,
        rotateX: containerRotateX,
        opacity: containerOpacity,
        transformPerspective: 1200,
      }}
      className={`relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-[#111322]/80 via-[#0d0e19]/60 to-[#07080d] border border-purple-500/15 shadow-[0_0_50px_rgba(139,92,246,0.1)] ${className}`}
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Clean 3D badge top-left */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131525]/90 border border-purple-500/25 text-xs font-mono text-purple-200">
        <span className="w-2 h-2 rounded-full bg-purple-400" />
        <span>3D Character</span>
      </div>

      {/* WebGL Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        title="Хулганаар эргүүлж харах боломжтой"
      />

      {/* Collapsible Bottom Control Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[540px]">
        {/* Toggle Bar */}
        <button
          onClick={() => setShowControls((prev) => !prev)}
          className="mx-auto mb-1 flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-slate-400 hover:text-white bg-[#121422]/90 hover:bg-[#1a1c30] border border-slate-800 rounded-full transition-colors shadow-lg"
          aria-label={showControls ? '3D удирдлагыг хураах' : '3D удирдлагыг нээх'}
        >
          {showControls ? (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
              <span>3D удирдлагыг хураах</span>
            </>
          ) : (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-purple-400" />
              <span>3D удирдлага нээх</span>
            </>
          )}
        </button>

        {showControls && (
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-[#0e101d]/90 border border-purple-500/20 backdrop-blur-md shadow-2xl">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                autoRotate
                  ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span>{autoRotate ? 'Эргэлтийг зогсоох' : 'Эргүүлэх'}</span>
            </button>

            {/* Camera View Switcher */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
              <Eye className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
              <button
                onClick={() => setCameraView('front')}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  cameraView === 'front'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Нүүрэн
              </button>
              <button
                onClick={() => setCameraView('angle')}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  cameraView === 'angle'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Хажуу
              </button>
              <button
                onClick={() => setCameraView('close')}
                className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  cameraView === 'close'
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ойрын
              </button>
            </div>

            {/* Accent Color Swatches */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-xl border border-white/5">
              <Sparkles className="w-3 h-3 text-slate-400" />
              <button
                onClick={() => setAccentColor('purple')}
                className={`w-4 h-4 rounded-full bg-purple-500 transition-transform ${
                  accentColor === 'purple' ? 'ring-2 ring-white scale-110' : 'opacity-70'
                }`}
                title="Нил ягаан неон"
                aria-label="Нил ягаан неон"
              />
              <button
                onClick={() => setAccentColor('cyan')}
                className={`w-4 h-4 rounded-full bg-cyan-400 transition-transform ${
                  accentColor === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-70'
                }`}
                title="Цэнхэр неон"
                aria-label="Цэнхэр неон"
              />
              <button
                onClick={() => setAccentColor('emerald')}
                className={`w-4 h-4 rounded-full bg-emerald-400 transition-transform ${
                  accentColor === 'emerald' ? 'ring-2 ring-white scale-110' : 'opacity-70'
                }`}
                title="Номин ногоон неон"
                aria-label="Номин ногоон неон"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
