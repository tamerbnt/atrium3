import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RobotHead, RobotHeadHandle } from './RobotHead';
import { CAMERA_WAYPOINTS } from '../types/cameraWaypoints';
import { probeWebGLCapabilities } from '../utils/deviceDetection';
import {
  createBakedEnvironmentTexture,
  createBrushedMetalTexture,
  createSmallTerracottaGradientTexture,
  createEyeGlowTexture,
  createAtriumLogoTexture,
} from '../utils/textureGenerators';

// Dev-only Perf monitor: completely excluded (tree-shaken) from production bundle
const DevPerf = import.meta.env.DEV
  ? React.lazy(() => import('r3f-perf').then((mod) => ({ default: mod.Perf })))
  : null;

gsap.registerPlugin(ScrollTrigger);

interface Scene3DProps {
  isMobile: boolean;
  isSoftwareGl?: boolean;
  isInView: boolean;
  scrollProgress?: number;
  activeWaypointIndex?: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}

// 4 Stylized Robot Heads arrangement: refined cohesive cluster composition for Desktop
// Dynamic triangular/diamond hierarchy with Hero Front-Right as dominant anchor
export const DESKTOP_ROBOT_CONFIGS = [
  {
    id: 1,
    name: 'Hero Central',
    pos: [0.18, 0.00, 0.42] as [number, number, number],
    rot: [0.08, -0.22, -0.04] as [number, number, number],
    scale: 1.15,
    phase: 0,
  },
  {
    id: 2,
    name: 'Top Left Accent',
    pos: [-0.38, 0.46, -0.16] as [number, number, number],
    rot: [-0.04, 0.08, 0.02] as [number, number, number],
    scale: 0.72,
    phase: 2.1,
  },
  {
    id: 3,
    name: 'Lower Left Base',
    pos: [-0.56, -0.42, 0.04] as [number, number, number],
    rot: [0.06, 0.14, -0.03] as [number, number, number],
    scale: 0.82,
    phase: 3.8,
  },
  {
    id: 4,
    name: 'Back Right Depth',
    pos: [0.70, 0.64, -0.48] as [number, number, number],
    rot: [0.05, -0.32, 0.04] as [number, number, number],
    scale: 0.60,
    phase: 5.4,
  },
];

// 2 Stylized Robot Heads for Mobile: perfectly centered duo with zero side clipping
// Eliminates off-screen right cropping, cuts draw calls and vertices in half
export const MOBILE_ROBOT_CONFIGS = [
  {
    id: 1,
    name: 'Hero Central',
    pos: [0.16, -0.04, 0.38] as [number, number, number],
    rot: [0.06, -0.18, -0.03] as [number, number, number],
    scale: 1.05,
    phase: 0,
  },
  {
    id: 2,
    name: 'Left Companion',
    pos: [-0.34, 0.22, -0.12] as [number, number, number],
    rot: [-0.03, 0.10, 0.02] as [number, number, number],
    scale: 0.76,
    phase: 2.1,
  },
];

export const ROBOT_CONFIGS = DESKTOP_ROBOT_CONFIGS;

function SoftwareGlPacer({ active }: { active: boolean }) {
  const { gl, invalidate } = useThree();

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let timerId = 0;

    const afterDraw = (cb: () => void) => {
      const rawGl = gl.getContext() as WebGL2RenderingContext;
      if (typeof rawGl?.fenceSync !== 'function') {
        timerId = window.setTimeout(cb, 80);
        return;
      }
      const sync = rawGl.fenceSync(rawGl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      rawGl.flush();
      const poll = () => {
        if (cancelled) {
          if (sync) rawGl.deleteSync(sync);
          return;
        }
        const state = sync ? rawGl.getSyncParameter(sync, rawGl.SYNC_STATUS) : rawGl.SIGNALED;
        if (state === rawGl.UNSIGNALED) {
          timerId = window.setTimeout(poll, 5);
        } else {
          if (sync) rawGl.deleteSync(sync);
          timerId = window.setTimeout(cb, 80);
        }
      };
      timerId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      if (cancelled) return;
      invalidate();
      requestAnimationFrame(() => {
        if (!cancelled) afterDraw(tick);
      });
    };

    tick();

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [active, gl, invalidate]);

  return null;
}

/**
 * Inner 3D scene content with Three.js objects
 */
function SceneContent({
  isMobile,
  isSoftwareGl,
  isInView,
  activeWaypointIndex = 0,
  onStatsUpdate,
}: {
  isMobile: boolean;
  isSoftwareGl: boolean;
  isInView: boolean;
  activeWaypointIndex?: number;
  scrollProgress?: number;
  onStatsUpdate?: (stats: { fps: number; drawCalls: number; triangles: number }) => void;
}) {
  const { gl, scene, pointer, camera, viewport } = useThree();

  // Head component handle references
  const head1Ref = useRef<RobotHeadHandle>(null);
  const head2Ref = useRef<RobotHeadHandle>(null);
  const head3Ref = useRef<RobotHeadHandle>(null);
  const head4Ref = useRef<RobotHeadHandle>(null);

  // Master cluster group ref and terracotta disc mesh ref
  const clusterGroupRef = useRef<THREE.Group>(null);
  const discMeshRef = useRef<THREE.Mesh>(null);

  // Global window-wide pointer tracking so cursor tracking functions seamlessly across entire page
  const windowPointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      windowPointerRef.current.x = nx;
      windowPointerRef.current.y = ny;
      windowPointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      windowPointerRef.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  const initialWaypoint = isMobile ? CAMERA_WAYPOINTS[0].mobile : CAMERA_WAYPOINTS[0].desktop;

  // Discrete Triggered Waypoint Camera State
  const cameraTargetRef = useRef({
    posX: initialWaypoint.position[0],
    posY: initialWaypoint.position[1],
    posZ: initialWaypoint.position[2],
    lookX: initialWaypoint.lookAt[0],
    lookY: initialWaypoint.lookAt[1],
    lookZ: initialWaypoint.lookAt[2],
    fov: initialWaypoint.fov,
    clusterRotX: 0,
    clusterRotY: 0,
    discY: 0,
    discTiltX: 0,
  });

  // Standalone GSAP timeline for discrete waypoint state changes
  useEffect(() => {
    const safeIndex = Math.min(Math.max(0, activeWaypointIndex), 3);
    const wp = CAMERA_WAYPOINTS[safeIndex];
    if (!wp) return;
    const target = isMobile ? wp.mobile : wp.desktop;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Distinct spatial cluster and disc transformations complementing camera position
    const clusterMods: Record<number, { rotY: number; rotX: number; discY: number; discTiltX: number }> = {
      0: { rotY: 0, rotX: 0, discY: 0, discTiltX: 0 },
      1: { rotY: -0.24, rotX: 0.18, discY: -0.22, discTiltX: -0.15 }, // Tension angle for the bottleneck (Dolly Zoom)
      2: { rotY: 0.36, rotX: 0.06, discY: -0.32, discTiltX: 0.08 },  // Specular light catch for the shift (Orbital Arc)
      3: { rotY: -0.12, rotX: 0.24, discY: -0.42, discTiltX: -0.20 }, // Structural architecture view (Elevated View)
    };
    const mod = clusterMods[safeIndex] || { rotY: 0, rotX: 0, discY: 0, discTiltX: 0 };

    // Fire standalone GSAP timeline with defined duration (0.95s) and smooth power2.inOut easing
    gsap.to(cameraTargetRef.current, {
      posX: target.position[0],
      posY: target.position[1],
      posZ: target.position[2],
      lookX: target.lookAt[0],
      lookY: target.lookAt[1],
      lookZ: target.lookAt[2],
      fov: target.fov,
      clusterRotY: mod.rotY,
      clusterRotX: mod.rotX,
      discY: mod.discY,
      discTiltX: mod.discTiltX,
      duration: prefersReducedMotion ? 0.05 : 0.95,
      ease: 'power2.inOut',
      overwrite: 'auto',
      onUpdate: () => {
        const cam = camera as THREE.PerspectiveCamera;
        if (cam && Math.abs(cam.fov - cameraTargetRef.current.fov) > 0.02) {
          cam.fov = cameraTargetRef.current.fov;
          cam.updateProjectionMatrix();
        }
      },
    });
  }, [activeWaypointIndex, isMobile, camera]);

  const lookAtTarget = useMemo(
    () => new THREE.Vector3(initialWaypoint.lookAt[0], initialWaypoint.lookAt[1], initialWaypoint.lookAt[2]),
    [initialWaypoint]
  );

  // FPS tracking
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Generate procedural textures once (0 KB network payload)
  const { envTexture, brushedTex, terracottaDiscTex, eyeGlowTex, logoTex } = useMemo(() => {
    const env = createBakedEnvironmentTexture(gl);
    const brushed = createBrushedMetalTexture();
    const discTex = createSmallTerracottaGradientTexture();
    const glowTex = createEyeGlowTexture();
    const logo = createAtriumLogoTexture();
    return {
      envTexture: env,
      brushedTex: brushed,
      terracottaDiscTex: discTex,
      eyeGlowTex: glowTex,
      logoTex: logo,
    };
  }, [gl]);

  // Set scene environment statically once — baked HDR reflections with transparent canvas clear
  useEffect(() => {
    scene.environment = envTexture;
    scene.background = null;
    gl.setClearColor(0x000000, 0);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [scene, envTexture, gl]);

  // MATERIAL VARIATION HIERARCHY:
  // 1. Hero Central (frontmost): Higher contrast, glossier lacquer clearcoat, crisp specular reflections
  const heroBodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#252931'),
      metalness: 0.96,
      roughness: 0.16, // Glossier finish
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 1.0, // Crisp high-gloss specular highlight on bevel fillets
      clearcoatRoughness: 0.06,
      envMapIntensity: 2.5,
      reflectivity: 0.96,
    });
  }, [brushedTex]);

  // 2. Background Robots: Softer satin-matte sheen, deeper atmospheric recession
  const backgroundBodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1b1e24'),
      metalness: 0.92,
      roughness: 0.28, // Softer satin diffuse sheen
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.65,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.6,
      reflectivity: 0.90,
    });
  }, [brushedTex]);

  // JAW MATERIALS:
  const heroJawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#16191f'),
      metalness: 0.95,
      roughness: 0.20,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.95,
      clearcoatRoughness: 0.10,
      envMapIntensity: 2.0,
    });
  }, [brushedTex]);

  const backgroundJawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#121418'),
      metalness: 0.92,
      roughness: 0.32,
      bumpMap: brushedTex,
      bumpScale: 0.005,
      clearcoat: 0.50,
      clearcoatRoughness: 0.22,
      envMapIntensity: 1.4,
    });
  }, [brushedTex]);

  // Distant background robot materials: higher roughness, reduced specular & emissive as atmospheric depth cue
  const distantBodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0d0f13'),
      metalness: 0.88,
      roughness: 0.40,
      bumpMap: brushedTex,
      bumpScale: 0.003,
      clearcoat: 0.25,
      clearcoatRoughness: 0.35,
      envMapIntensity: 1.0,
    });
  }, [brushedTex]);

  const distantJawMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0b0c10'),
      metalness: 0.86,
      roughness: 0.42,
      bumpMap: brushedTex,
      bumpScale: 0.003,
      clearcoat: 0.20,
      clearcoatRoughness: 0.35,
      envMapIntensity: 0.9,
    });
  }, [brushedTex]);

  // Base glowing terracotta eye material
  const eyeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e05a36'),
      emissive: new THREE.Color('#ff5a30'),
      emissiveIntensity: 2.8,
      roughness: 0.12,
      metalness: 0.0,
    });
  }, []);

  // Softer eye glow for the furthest robot (atmospheric depth cue)
  const distantEyeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c24a28'),
      emissive: new THREE.Color('#d94820'),
      emissiveIntensity: 1.6,
      roughness: 0.25,
      metalness: 0.0,
    });
  }, []);

  // Rivet bolt material
  const rivetMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0f1115'),
      metalness: 0.98,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
  }, []);

  // Small floating terracotta flat space material
  const terracottaFlatSpaceMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: terracottaDiscTex,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
  }, [terracottaDiscTex]);

  // Atrium brand logo material shared across all robot heads
  const logoMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: logoTex,
      transparent: true,
      roughness: 0.20,
      metalness: 0.90,
      clearcoat: 0.90,
      clearcoatRoughness: 0.10,
      emissive: new THREE.Color('#d95332'),
      emissiveMap: logoTex,
      emissiveIntensity: 0.45,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
      depthWrite: false,
    });
  }, [logoTex]);

  // Cleanup all GPU textures and materials on unmount
  useEffect(() => {
    return () => {
      envTexture.dispose();
      brushedTex.dispose();
      terracottaDiscTex.dispose();
      eyeGlowTex.dispose();
      logoTex.dispose();
      heroBodyMaterial.dispose();
      backgroundBodyMaterial.dispose();
      heroJawMaterial.dispose();
      backgroundJawMaterial.dispose();
      distantBodyMaterial.dispose();
      distantJawMaterial.dispose();
      eyeMaterial.dispose();
      distantEyeMaterial.dispose();
      rivetMaterial.dispose();
      terracottaFlatSpaceMaterial.dispose();
      logoMaterial.dispose();
    };
  }, [
    envTexture,
    brushedTex,
    terracottaDiscTex,
    eyeGlowTex,
    logoTex,
    heroBodyMaterial,
    backgroundBodyMaterial,
    heroJawMaterial,
    backgroundJawMaterial,
    distantBodyMaterial,
    distantJawMaterial,
    eyeMaterial,
    distantEyeMaterial,
    rivetMaterial,
    terracottaFlatSpaceMaterial,
    logoMaterial,
  ]);

  // Compute responsive layout offsets using viewport in world units
  // Framed generously on the right side of the hero section on desktop
  const clusterOffsetX = Math.min(Math.max(viewport.width * 0.26, 1.45), 2.05);
  const clusterShiftX = 0.20;
  const clusterOffsetY = -0.34;
  const terracottaRadius = 2.70; // Restored to original full stage scale

  const activeRobotConfigs = DESKTOP_ROBOT_CONFIGS;

  // Frame animation loop with zero heap allocation and frame-rate-independent damping
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const now = performance.now();
    const t = now * 0.001;

    // 0. Sync projection matrix when waypoint FOV transitions
    const cam = state.camera as THREE.PerspectiveCamera;
    if (cam && cam.isPerspectiveCamera && Math.abs(cam.fov - cameraTargetRef.current.fov) > 0.01) {
      cam.fov = cameraTargetRef.current.fov;
      cam.updateProjectionMatrix();
    }

    // 1. Mouse pointer parallax + Discrete Triggered Waypoint Camera
    const pX = windowPointerRef.current.active ? windowPointerRef.current.x : pointer.x;
    const pY = windowPointerRef.current.active ? windowPointerRef.current.y : pointer.y;

    const targetCamX = cameraTargetRef.current.posX + pX * (isMobile ? 0.02 : 0.06);
    const targetCamY = cameraTargetRef.current.posY + pY * (isMobile ? 0.02 : 0.05);
    const targetCamZ = cameraTargetRef.current.posZ;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetCamX, 5.0, dt);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetCamY, 5.0, dt);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetCamZ, 5.0, dt);

    lookAtTarget.set(
      cameraTargetRef.current.lookX,
      cameraTargetRef.current.lookY,
      cameraTargetRef.current.lookZ
    );
    state.camera.lookAt(lookAtTarget);

    // 2. Cluster waypoint orientation + subtle gentle drift
    if (clusterGroupRef.current) {
      clusterGroupRef.current.position.x = clusterShiftX + Math.sin(t * 0.4) * 0.015;
      clusterGroupRef.current.position.y = Math.cos(t * 0.3) * 0.012;
      clusterGroupRef.current.rotation.x = THREE.MathUtils.damp(
        clusterGroupRef.current.rotation.x,
        cameraTargetRef.current.clusterRotX,
        5.0,
        dt
      );
      clusterGroupRef.current.rotation.y = THREE.MathUtils.damp(
        clusterGroupRef.current.rotation.y,
        cameraTargetRef.current.clusterRotY,
        5.0,
        dt
      );
      clusterGroupRef.current.rotation.z = Math.sin(t * 0.25) * 0.008;
    }

    // 3. Terracotta stage disc discrete waypoint state (fully visible tilted stage beneath robots)
    if (discMeshRef.current) {
      const baseDiscY = isMobile ? -0.70 : -0.96;
      discMeshRef.current.position.y = THREE.MathUtils.damp(
        discMeshRef.current.position.y,
        baseDiscY + cameraTargetRef.current.discY,
        5.0,
        dt
      );
      discMeshRef.current.rotation.x = THREE.MathUtils.damp(
        discMeshRef.current.rotation.x,
        -Math.PI * 0.38 + cameraTargetRef.current.discTiltX,
        5.0,
        dt
      );
    }

    // 4. Performance FPS counter calculation (only when telemetry HUD callback is active)
    if (onStatsUpdate) {
      frameCountRef.current += 1;
      if (now - lastTimeRef.current >= 500) {
        const currentFps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        onStatsUpdate({
          fps: currentFps,
          drawCalls: gl.info.render.calls,
          triangles: gl.info.render.triangles,
        });
      }
    }
  });

  const headRefs = [head1Ref, head2Ref, head3Ref, head4Ref];

  return (
    <>
      {/* Studio Lighting with pre-baked Environment reflections */}
      <ambientLight intensity={0.42} />
      <directionalLight position={[clusterOffsetX + clusterShiftX + 4, 7, 5]} intensity={2.8} color="#ffffff" />
      <directionalLight position={[clusterOffsetX + clusterShiftX - 4, 3, 3]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[clusterOffsetX + clusterShiftX, -3, -2]} intensity={0.6} color="#404040" />

      {/* COOL-TONED DIRECTIONAL RIM LIGHT (Thin edge highlight separating silhouette from dark background) */}
      <directionalLight
        position={[clusterOffsetX + clusterShiftX - 5, clusterOffsetY + 3.5, -4.5]}
        intensity={1.1}
        color="#ffffff"
        castShadow={false}
      />

      {/* Terracotta Upward Rim Glow centered directly beneath Robot 1 */}
      <pointLight
        position={[
          clusterOffsetX + clusterShiftX + 0.16,
          clusterOffsetY - 0.94,
          0.38,
        ]}
        intensity={4.8}
        color="#d96342"
        distance={11.0}
      />
      {/* Soft fill point light extending warmth toward the left robots */}
      <pointLight
        position={[
          clusterOffsetX - 0.28,
          clusterOffsetY - 0.82,
          -0.05,
        ]}
        intensity={1.8}
        color="#b85438"
        distance={8.5}
      />

      {/* Cluster Group containing the floating terracotta flat space & Robot Heads */}
      <group position={[clusterOffsetX, clusterOffsetY, 0]}>
        {/* FLOATING TERRACOTTA GRADIENT FLAT STAGE (Original expansive 2.70 radius stage) */}
        <mesh
          ref={discMeshRef}
          position={[clusterShiftX + 0.14, -0.96, 0.30]}
          rotation={[-Math.PI * 0.38, 0, 0]}
          material={terracottaFlatSpaceMaterial}
        >
          <circleGeometry args={[terracottaRadius, 64]} />
        </mesh>

        {/* STYLIZED ROBOT HEADS (4 robots on Desktop) */}
        <group ref={clusterGroupRef} position={[clusterShiftX, 0, 0]}>
          {activeRobotConfigs.map((config, index) => (
            <RobotHead
              key={config.id}
              ref={headRefs[index]}
              position={config.pos}
              rotation={config.rot}
              scale={config.scale}
              phase={config.phase}
              bodyMaterial={
                index === 0
                  ? heroBodyMaterial
                  : index === 3
                  ? distantBodyMaterial
                  : backgroundBodyMaterial
              }
              jawMaterial={
                index === 0
                  ? heroJawMaterial
                  : index === 3
                  ? distantJawMaterial
                  : backgroundJawMaterial
              }
              eyeMaterial={index === 3 ? distantEyeMaterial : eyeMaterial}
              rivetMaterial={rivetMaterial}
              eyeGlowTexture={eyeGlowTex}
              logoMaterial={logoMaterial}
              logoTexture={logoTex}
              globalPointerRef={windowPointerRef}
            />
          ))}
        </group>
      </group>

      {/* Selective Bloom Post-Processing Pass (hardware GPU desktop only) */}
      {!isMobile && !isSoftwareGl && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={1.2}
            luminanceSmoothing={0.25}
            intensity={0.8}
            mipmapBlur
            radius={0.35}
          />
        </EffectComposer>
      )}

      {isSoftwareGl && <SoftwareGlPacer active={isInView} />}
    </>
  );
}

/**
 * Main 3D Scene Wrapper with IntersectionObserver and DPR Cap
 */
export default function Scene3D({
  isMobile,
  isSoftwareGl: isSoftwareGlProp,
  isInView,
  scrollProgress,
  activeWaypointIndex = 0,
  onStatsUpdate,
}: Scene3DProps) {
  // Completely delete the 3D scene, robots, floor and animations on mobile
  if (isMobile) {
    return null;
  }

  const isSoftwareGl = useMemo(
    () => isSoftwareGlProp ?? probeWebGLCapabilities().isSoftwareGl,
    [isSoftwareGlProp]
  );

  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    if (isSoftwareGl) return 1;
    // Cap desktop DPR to 2x and mobile to 1.5x
    return Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
  }, [isMobile, isSoftwareGl]);

  // Check if developer requested r3f-perf overlay via URL param '?perf=true' or hash '#perf'
  const [showDevPerf, setShowDevPerf] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.env.DEV) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('perf') === 'true' || window.location.hash.includes('perf')) {
        setShowDevPerf(true);
      }
    }
  }, []);

  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <Canvas
        camera={{
          position: [0.0, isMobile ? 0.12 : 0.25, isMobile ? 4.95 : 4.75],
          fov: isMobile ? 50 : 44,
          near: 0.1,
          far: 100,
        }}
        dpr={dpr}
        shadows={false} // Performance: Zero dynamic shadow maps
        frameloop={isInView && !isSoftwareGl ? 'always' : 'demand'}
        gl={{
          antialias: !isMobile && !isSoftwareGl,
          powerPreference: 'high-performance',
          alpha: true,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        {/* Dev-only r3f-perf instrument overlay: tree-shaken from production build */}
        {DevPerf && showDevPerf && (
          <Suspense fallback={null}>
            <DevPerf position="top-left" />
          </Suspense>
        )}

        <SceneContent
          isMobile={isMobile}
          isSoftwareGl={isSoftwareGl}
          isInView={isInView}
          activeWaypointIndex={activeWaypointIndex}
          scrollProgress={scrollProgress}
          onStatsUpdate={onStatsUpdate}
        />
      </Canvas>
    </div>
  );
}
