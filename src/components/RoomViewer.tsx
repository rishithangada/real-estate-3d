"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type RoomKey = "bedroom" | "living" | "kitchen" | "bathroom" | "exterior";

const ROOM_PRESETS: Record<RoomKey, { label: string; wall: number; accent: number; floor: number; light: number }> = {
  bedroom: { label: "Bedroom", wall: 0xd8d0c5, accent: 0x5d476f, floor: 0x6b553c, light: 0xffd9bb },
  living: { label: "Living Room", wall: 0xd4c5b0, accent: 0x2d3561, floor: 0x5c4a32, light: 0xffd4a0 },
  kitchen: { label: "Kitchen", wall: 0xe5e2d8, accent: 0x315f63, floor: 0x667076, light: 0xffffff },
  bathroom: { label: "Bathroom", wall: 0xd7e5e7, accent: 0x2b6f8a, floor: 0x73858b, light: 0xd9f2ff },
  exterior: { label: "Exterior", wall: 0xbec8d4, accent: 0x3d5269, floor: 0x305a37, light: 0xfff0ca },
};

function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((m) => m.dispose());
    } else if (material) {
      material.dispose();
    }
  });
}

export default function RoomViewer({ room = "living" }: { room?: RoomKey }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const preset = ROOM_PRESETS[room];
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(room === "exterior" ? 0x101828 : 0x0d0d1a);
    scene.fog = new THREE.Fog(scene.background, 22, 58);

    const w = el.clientWidth || 900;
    const h = el.clientHeight || 620;
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(room === "exterior" ? 10 : 8, room === "exterior" ? 6 : 5, room === "exterior" ? 12 : 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      const fallback = document.createElement("div");
      fallback.className = "flex h-full w-full items-center justify-center bg-[#101321] p-8 text-center";
      fallback.innerHTML = `<div><div class="text-sm uppercase tracking-[0.24em] text-indigo-300">3D preview unavailable</div><div class="mt-3 text-3xl font-bold text-white">${preset.label}</div><div class="mt-3 max-w-sm text-sm leading-6 text-gray-400">Your browser could not create a WebGL context. The room selector and property details are still available.</div></div>`;
      el.appendChild(fallback);
      return () => {
        if (el.contains(fallback)) el.removeChild(fallback);
      };
    }
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, room === "exterior" ? 0.65 : 0.42);
    scene.add(ambient);

    const sunLight = new THREE.DirectionalLight(preset.light, room === "exterior" ? 1.8 : 1.2);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    scene.add(sunLight);

    const roomLight = new THREE.PointLight(preset.light, 1.4, 22);
    roomLight.position.set(0, 3.5, 0);
    roomLight.castShadow = true;
    if (room !== "exterior") scene.add(roomLight);

    function mat(color: number, roughness = 0.75) {
      return new THREE.MeshStandardMaterial({ color, roughness });
    }

    function plane(width: number, height: number, color: number) {
      return new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshStandardMaterial({ color, roughness: 0.85, side: THREE.DoubleSide })
      );
    }

    function box(width: number, height: number, depth: number, color: number, roughness = 0.7) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), mat(color, roughness));
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    }

    function addRoomShell() {
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mat(preset.floor, 0.9));
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);

      const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), mat(0xf0ece4, 0.82));
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = 4;
      scene.add(ceiling);

      const backWall = plane(10, 4, preset.accent);
      backWall.position.set(0, 2, -5);
      scene.add(backWall);

      const leftWall = plane(10, 4, preset.wall);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.set(-5, 2, 0);
      scene.add(leftWall);

      const rightWall = plane(10, 4, preset.wall);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.set(5, 2, 0);
      scene.add(rightWall);

      const windowGlass = new THREE.Mesh(
        new THREE.PlaneGeometry(1.3, 1.7),
        new THREE.MeshStandardMaterial({ color: 0x88bbff, transparent: true, opacity: 0.25, roughness: 0.1 })
      );
      windowGlass.rotation.y = Math.PI / 2;
      windowGlass.position.set(-4.96, 2.5, 1);
      scene.add(windowGlass);
    }

    function addLivingRoom() {
      const sofaBase = box(3.5, 0.5, 1.2, 0x3a3a5c);
      sofaBase.position.set(-1.5, 0.25, -3.5);
      scene.add(sofaBase);

      const sofaBack = box(3.5, 0.8, 0.3, 0x3a3a5c);
      sofaBack.position.set(-1.5, 0.9, -4.05);
      scene.add(sofaBack);

      const table = box(1.6, 0.08, 0.8, 0x7a5c38, 0.45);
      table.position.set(-1.5, 0.58, -2.4);
      scene.add(table);

      const shelf = box(0.35, 2.5, 1.6, 0x4a3728);
      shelf.position.set(4.8, 1.25, -2);
      scene.add(shelf);
    }

    function addBedroom() {
      const bedBase = box(3.8, 0.45, 5.0, 0x4b3b53);
      bedBase.position.set(-1.1, 0.35, -2.2);
      scene.add(bedBase);

      const mattress = box(3.6, 0.35, 4.7, 0xf1eee7, 0.95);
      mattress.position.set(-1.1, 0.78, -2.2);
      scene.add(mattress);

      const headboard = box(3.9, 1.4, 0.25, 0x35263f);
      headboard.position.set(-1.1, 1.15, -4.65);
      scene.add(headboard);

      const nightstand = box(0.8, 0.7, 0.8, 0x6a4f32);
      nightstand.position.set(1.6, 0.35, -4.0);
      scene.add(nightstand);

      const dresser = box(2.0, 1.1, 0.7, 0x6a4f32);
      dresser.position.set(3.5, 0.55, -1.0);
      scene.add(dresser);
    }

    function addKitchen() {
      const backCounter = box(7.8, 0.9, 0.85, 0xe8e3d8, 0.55);
      backCounter.position.set(0, 0.45, -4.45);
      scene.add(backCounter);

      const island = box(3.2, 0.95, 1.55, 0x263f45, 0.5);
      island.position.set(-0.4, 0.48, -1.5);
      scene.add(island);

      const fridge = box(1.2, 2.5, 0.75, 0xb9c3cc, 0.35);
      fridge.position.set(3.7, 1.25, -4.5);
      scene.add(fridge);

      const cabinets = box(7.6, 0.75, 0.45, 0x7b5d3b, 0.65);
      cabinets.position.set(0, 2.9, -4.75);
      scene.add(cabinets);

      const pendant = box(0.18, 0.7, 0.18, 0xf6d28b, 0.3);
      pendant.position.set(-0.4, 2.7, -1.5);
      scene.add(pendant);
    }

    function addBathroom() {
      const tub = box(3.0, 0.75, 1.35, 0xf1f7f8, 0.4);
      tub.position.set(-2.4, 0.38, -3.8);
      scene.add(tub);

      const vanity = box(1.8, 0.9, 0.7, 0x35566a, 0.55);
      vanity.position.set(2.8, 0.45, -4.35);
      scene.add(vanity);

      const mirror = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.1),
        new THREE.MeshStandardMaterial({ color: 0xb9e3ff, metalness: 0.4, roughness: 0.15 })
      );
      mirror.position.set(2.8, 2.0, -4.94);
      scene.add(mirror);

      const showerGlass = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.2, 2.0),
        new THREE.MeshStandardMaterial({ color: 0x9bd5ff, transparent: true, opacity: 0.26, roughness: 0.05 })
      );
      showerGlass.position.set(-4.0, 1.1, -1.0);
      scene.add(showerGlass);
    }

    function addExterior() {
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), mat(preset.floor, 0.95));
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const house = box(6.5, 3.2, 4.6, 0xc9d1dc, 0.7);
      house.position.set(0, 1.6, -1.2);
      scene.add(house);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.0, 4), mat(0x2a2f3a, 0.6));
      roof.rotation.y = Math.PI / 4;
      roof.position.set(0, 4.2, -1.2);
      roof.castShadow = true;
      scene.add(roof);

      const door = box(0.9, 1.8, 0.12, 0x5c3c24, 0.55);
      door.position.set(-1.8, 0.9, 1.15);
      scene.add(door);

      const windowA = box(1.1, 0.9, 0.1, 0x8ab8ff, 0.18);
      windowA.position.set(1.1, 1.75, 1.18);
      scene.add(windowA);

      const path = box(1.2, 0.04, 4.5, 0xb7aa98, 0.9);
      path.position.set(-1.8, 0.03, 3.7);
      scene.add(path);
    }

    if (room === "exterior") {
      addExterior();
    } else {
      addRoomShell();
      if (room === "bedroom") addBedroom();
      if (room === "living") addLivingRoom();
      if (room === "kitchen") addKitchen();
      if (room === "bathroom") addBathroom();
    }

    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 512;
    labelCanvas.height = 128;
    const ctx = labelCanvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "rgba(8, 12, 22, 0.82)";
      ctx.fillRect(0, 0, 512, 128);
      ctx.fillStyle = "#c7d2fe";
      ctx.font = "bold 42px Arial";
      ctx.fillText(preset.label, 30, 78);
      const texture = new THREE.CanvasTexture(labelCanvas);
      const label = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 0.7),
        new THREE.MeshBasicMaterial({ map: texture, transparent: true })
      );
      label.position.set(-3.2, 3.25, room === "exterior" ? 2.0 : -4.9);
      scene.add(label);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.target.set(0, room === "exterior" ? 1.8 : 1.5, room === "exterior" ? -0.5 : -1);
    controls.update();

    let idleTimer: ReturnType<typeof setTimeout>;
    const startAutoRotate = () => {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
    };
    const stopAutoRotate = () => {
      controls.autoRotate = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(startAutoRotate, 3000);
    };
    startAutoRotate();
    renderer.domElement.addEventListener("pointerdown", stopAutoRotate);

    const onResize = () => {
      const width = el.clientWidth || 900;
      const height = el.clientHeight || 620;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

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
      controls.dispose();
      disposeScene(scene);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [room]);

  return <div ref={mountRef} className="h-full w-full" data-room={room} />;
}
