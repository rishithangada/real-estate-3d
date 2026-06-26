"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function RoomViewer() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d1a);
    scene.fog = new THREE.Fog(0x0d0d1a, 20, 50);

    // Camera — positioned outside the room looking in
    const w = el.clientWidth;
    const h = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(8, 5, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    scene.add(sunLight);

    // Point light inside room (warm ceiling light)
    const roomLight = new THREE.PointLight(0xffd4a0, 1.5, 20);
    roomLight.position.set(0, 3.5, 0);
    roomLight.castShadow = true;
    scene.add(roomLight);

    // ── Room geometry ──────────────────────────────────────
    // Floor
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x5c4a32, roughness: 0.9 });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.8 });
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 4;
    scene.add(ceiling);

    // Wall helper
    function makeWall(w: number, h: number, color: number) {
      return new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshStandardMaterial({ color, roughness: 0.85, side: THREE.DoubleSide })
      );
    }

    const wallColor = 0xd4c5b0;
    const accentWall = 0x2d3561; // feature wall — deep navy

    // Back wall (z = -5)
    const backWall = makeWall(10, 4, accentWall);
    backWall.position.set(0, 2, -5);
    scene.add(backWall);

    // Front wall (z = +5) — open/transparent to see inside; omitted intentionally
    // Left wall (x = -5)
    const leftWall = makeWall(10, 4, wallColor);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-5, 2, 0);
    scene.add(leftWall);

    // Right wall (x = +5)
    const rightWall = makeWall(10, 4, wallColor);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(5, 2, 0);
    scene.add(rightWall);

    // ── Furniture ──────────────────────────────────────────
    function box(w: number, h: number, d: number, color: number, roughness = 0.7) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color, roughness })
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    // Sofa
    const sofaBase = box(3.5, 0.5, 1.2, 0x3a3a5c);
    sofaBase.position.set(-1.5, 0.25, -3.5);
    scene.add(sofaBase);

    const sofaBack = box(3.5, 0.8, 0.3, 0x3a3a5c);
    sofaBack.position.set(-1.5, 0.9, -4.05);
    scene.add(sofaBack);

    // Coffee table
    const table = box(1.6, 0.06, 0.8, 0x7a5c38, 0.4);
    table.position.set(-1.5, 0.6, -2.4);
    scene.add(table);
    const tableLegs = box(0.08, 0.55, 0.08, 0x5c4222);
    const legOffsets = [[-0.7, -1], [0.7, -1], [-0.7, 1], [0.7, 1]] as const;
    for (const [ox, oz] of legOffsets) {
      const leg = tableLegs.clone();
      leg.position.set(-1.5 + ox, 0.275, -2.4 + oz * 0.35);
      scene.add(leg);
    }

    // Bookshelf on right wall
    const shelf = box(0.3, 2.5, 1.5, 0x4a3728);
    shelf.position.set(4.85, 1.25, -2);
    scene.add(shelf);
    // Books
    const bookColors = [0x8b2252, 0x225a8b, 0x228b22, 0xb8860b, 0x6b2191];
    for (let i = 0; i < 5; i++) {
      const book = box(0.25, 0.28, 0.08 + Math.random() * 0.06, bookColors[i % bookColors.length], 0.9);
      book.position.set(4.72, 0.5 + i * 0.35, -1.75 + i * 0.2);
      book.rotation.y = (Math.random() - 0.5) * 0.1;
      scene.add(book);
    }

    // Window on left wall (lighter rect suggesting a window)
    const windowFrame = box(0.05, 1.8, 1.4, 0xffffff, 0.1);
    windowFrame.position.set(-4.97, 2.5, 1);
    scene.add(windowFrame);
    const windowGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.3, 1.7),
      new THREE.MeshStandardMaterial({ color: 0x88bbff, transparent: true, opacity: 0.25, roughness: 0.1 })
    );
    windowGlass.rotation.y = Math.PI / 2;
    windowGlass.position.set(-4.96, 2.5, 1);
    scene.add(windowGlass);

    // Window light spill
    const windowSpot = new THREE.SpotLight(0xaad4ff, 3, 12, Math.PI / 5, 0.5);
    windowSpot.position.set(-4, 2.5, 1);
    windowSpot.target.position.set(2, 1, 1);
    scene.add(windowSpot);
    scene.add(windowSpot.target);

    // ── Controls ───────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // prevent going below floor
    controls.target.set(0, 1.5, -1);
    controls.update();

    // Auto-rotate when idle
    let idleTimer: ReturnType<typeof setTimeout>;
    const startAutoRotate = () => { controls.autoRotate = true; controls.autoRotateSpeed = 0.6; };
    const stopAutoRotate = () => { controls.autoRotate = false; clearTimeout(idleTimer); idleTimer = setTimeout(startAutoRotate, 3000); };
    startAutoRotate();
    renderer.domElement.addEventListener("pointerdown", stopAutoRotate);

    // ── Resize handler ─────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // ── Animate ────────────────────────────────────────────
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopAutoRotate);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
