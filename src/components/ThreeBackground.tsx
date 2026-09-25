"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 3. Lighting (Midnight Cyan & Electric Blue)
    const ambientLight = new THREE.AmbientLight(0x0a1930, 2.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 4.5, 75); // Electric Cyan
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3.8, 75); // Neon Sky Blue
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x2563eb, 3.2, 75); // Deep Cobalt
    pointLight3.position.set(0, 15, -10);
    scene.add(pointLight3);

    // 4. Crystals Group
    const crystalsGroup = new THREE.Group();
    scene.add(crystalsGroup);

    // Create 3D Floating Crystals
    const crystalGeometries = [
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.IcosahedronGeometry(1.0, 0),
      new THREE.TetrahedronGeometry(1.4, 0),
      new THREE.ConeGeometry(0.9, 1.8, 5),
    ];

    const crystalMaterials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transmission: 0.85,
        opacity: 0.9,
        transparent: true,
        roughness: 0.08,
        metalness: 0.25,
        ior: 1.6,
        reflectivity: 0.95,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x22d3ee,
        transmission: 0.88,
        opacity: 0.88,
        transparent: true,
        roughness: 0.05,
        metalness: 0.2,
        ior: 1.55,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        transmission: 0.82,
        opacity: 0.9,
        transparent: true,
        roughness: 0.1,
        metalness: 0.3,
        ior: 1.65,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x0c254d,
        transmission: 0.65,
        opacity: 0.95,
        transparent: true,
        roughness: 0.12,
        metalness: 0.45,
        ior: 1.7,
      }),
    ];

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const crystals: {
      mesh: THREE.Mesh;
      initialPos: THREE.Vector3;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    const numCrystals = 26;
    for (let i = 0; i < numCrystals; i++) {
      const geom = crystalGeometries[i % crystalGeometries.length];
      const mat = crystalMaterials[i % crystalMaterials.length];

      const crystalMesh = new THREE.Mesh(geom, mat);

      // Glowing cyan wireframe overlay for sharp geometric crystalline edges
      const wireframeMesh = new THREE.Mesh(geom, wireframeMat);
      crystalMesh.add(wireframeMesh);

      // Random Position Spread
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 20 - 5;
      crystalMesh.position.set(x, y, z);

      // Random Initial Scale
      const scale = 0.6 + Math.random() * 0.9;
      crystalMesh.scale.set(scale, scale, scale);

      crystalsGroup.add(crystalMesh);

      crystals.push({
        mesh: crystalMesh,
        initialPos: new THREE.Vector3(x, y, z),
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.018,
          z: (Math.random() - 0.5) * 0.012,
        },
        floatSpeed: 0.001 + Math.random() * 0.0015,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // 5. Electric Cyan Sparkles (Star Points Particles)
    const sparklesCount = 340;
    const sparklePositions = new Float32Array(sparklesCount * 3);
    const sparkleScales = new Float32Array(sparklesCount);
    const sparklePhases = new Float32Array(sparklesCount);

    for (let i = 0; i < sparklesCount; i++) {
      sparklePositions[i * 3] = (Math.random() - 0.5) * 60;
      sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 2;

      sparkleScales[i] = Math.random() * 0.3 + 0.1;
      sparklePhases[i] = Math.random() * Math.PI * 2;
    }

    const sparkleGeo = new THREE.BufferGeometry();
    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePositions, 3));

    // Custom Canvas Texture for Glowing Soft Sparkle Stars (Cyan / Electric Sky Glow)
    const createSparkleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.25, "rgba(103, 232, 249, 0.95)");
        gradient.addColorStop(0.65, "rgba(56, 189, 248, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const sparkleMat = new THREE.PointsMaterial({
      size: 0.9,
      map: createSparkleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const sparklePoints = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparklePoints);

    // 6. Mouse Cursor Movement Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;

      // Smooth Easing / Damping towards Mouse Cursor Position
      targetMouseX += (mouseX - targetMouseX) * 0.04;
      targetMouseY += (mouseY - targetMouseY) * 0.04;

      // Group Tilt & Rotation according to Cursor Movement
      crystalsGroup.rotation.y = targetMouseX * 0.35 + elapsedTime * 0.03;
      crystalsGroup.rotation.x = -targetMouseY * 0.25;
      crystalsGroup.position.x = targetMouseX * 1.5;
      crystalsGroup.position.y = targetMouseY * 1.2;

      // Rotate and Float Individual Crystals
      crystals.forEach((c) => {
        c.mesh.rotation.x += c.rotSpeed.x;
        c.mesh.rotation.y += c.rotSpeed.y;
        c.mesh.rotation.z += c.rotSpeed.z;

        // Subtle Sinusoidal Floating movement
        c.mesh.position.y =
          c.initialPos.y + Math.sin(elapsedTime * 1.5 + c.floatOffset) * 0.8;
        c.mesh.position.x =
          c.initialPos.x + Math.cos(elapsedTime * 1.2 + c.floatOffset) * 0.5;
      });

      // Animate Sparkle Particles according to Cursor & Time
      sparklePoints.rotation.y = targetMouseX * 0.2 + elapsedTime * 0.015;
      sparklePoints.rotation.x = -targetMouseY * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    const container = containerRef.current;
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      crystalGeometries.forEach((g) => g.dispose());
      crystalMaterials.forEach((m) => m.dispose());
      wireframeMat.dispose();
      sparkleGeo.dispose();
      sparkleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-gradient-to-br from-[#02050e] via-[#050d21] to-[#081533]"
    />
  );
}
