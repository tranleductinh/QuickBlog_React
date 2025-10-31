"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { cn } from "@/lib/utils";

// --- Helper Functions ---

const getDeviceInfo = () => {
  return {
    screenWidth: () =>
      Math.max(
        0,
        window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth ||
          0
      ),
    screenHeight: () =>
      Math.max(
        0,
        window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight ||
          0
      ),
    screenRatio: function () {
      return this.screenWidth() / this.screenHeight();
    },
    screenCenterX: function () {
      return this.screenWidth() / 2;
    },
    screenCenterY: function () {
      return this.screenHeight() / 2;
    },
    mouseCenterX: function (e) {
      return e.clientX - this.screenCenterX();
    },
    mouseCenterY: function (e) {
      return e.clientY - this.screenCenterY();
    },
  };
};

const addEase = (pos, to, ease) => {
  pos.x += (to.x - pos.x) / ease;
  pos.y += (to.y - pos.y) / ease;
  pos.z += (to.z - pos.z) / ease;
};

const getElementBackground = (element) => {
  let currentElement = element;

  while (currentElement) {
    const style = getComputedStyle(currentElement);
    const bgColor = style.backgroundColor;

    if (
      bgColor &&
      bgColor !== "rgba(0, 0, 0, 0)" &&
      bgColor !== "transparent"
    ) {
      return bgColor;
    }

    currentElement = currentElement.parentElement;
  }

  return null;
};

const parseColor = (color) => {
  try {
    return new THREE.Color(color);
  } catch (error) {
    if (color.startsWith("rgb")) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        return new THREE.Color(
          parseInt(matches[0]) / 255,
          parseInt(matches[1]) / 255,
          parseInt(matches[2]) / 255
        );
      }
    }
    console.warn(`Could not parse color: ${color}. Falling back to white.`);
    return new THREE.Color(0xffffff);
  }
};

const isColorDark = (color) => {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
  return luminance < 0.5;
};

// --- Main Component ---

const AnimatedWave = ({
  className,
  speed = 0.015,
  amplitude = 30,
  smoothness = 300,
  wireframe = true,
  waveColor,
  opacity = 1,
  mouseInteraction = true,
  quality = "medium",
  fov = 60,
  waveOffsetY = -300,
  waveRotation = 29.8,
  cameraDistance = -1000,
  autoDetectBackground = true,
  backgroundColor = "lightgray",
  ease = 12,
  mouseDistortionStrength = 0.5,
  mouseDistortionSmoothness = 100,
  mouseDistortionDecay = 0.0005,
  mouseShrinkScaleStrength = 0.7,
  mouseShrinkScaleRadius = 200,
}) => {
  const containerRef = useRef(null);
  const sceneElementsRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    groundPlain: null,
    animationFrameId: null,
    mouse: { x: 0, y: 0 },
  });

  const [webGLFailed, setWebGLFailed] = useState(false);

  const getQualitySettings = useCallback((quality) => {
    switch (quality) {
      case "low":
        return { width: 64, height: 32 };
      case "high":
        return { width: 256, height: 128 };
      default:
        return { width: 128, height: 64 };
    }
  }, []);

  const determineWaveColor = useCallback(() => {
    if (waveColor) return parseColor(waveColor);

    if (autoDetectBackground && containerRef.current) {
      const detectedBg = getElementBackground(containerRef.current);
      if (detectedBg) {
        const parsedBgColor = parseColor(detectedBg);
        return isColorDark(parsedBgColor)
          ? new THREE.Color(0xffffff)
          : new THREE.Color(0x000000);
      }
    }

    return new THREE.Color(0x000000);
  }, [waveColor, autoDetectBackground]);

  const createGroundPlain = useCallback(() => {
    const { width: geometryWidth, height: geometryHeight } =
      getQualitySettings(quality);

    const groundPlain = {
      group: null,
      geometry: null,
      material: null,
      plane: null,
      simplex: null,
      factor: smoothness,
      scale: amplitude,
      speed,
      cycle: 0,
      ease,
      move: new THREE.Vector3(0, waveOffsetY, cameraDistance),
      look: new THREE.Vector3((waveRotation * Math.PI) / 180, 0, 0),
      mouseDistortionStrength,
      mouseDistortionSmoothness,
      mouseDistortionDecay,
      distortionTime: 0,
      mouseShrinkScaleStrength,
      mouseShrinkScaleRadius,
      _originalPositions: new Float32Array(),

      create(scene) {
        this.group = new THREE.Object3D();
        this.group.position.copy(this.move);
        look: new THREE.Euler((waveRotation * Math.PI) / 180, 0, 0),
          (this.geometry = new THREE.PlaneGeometry(
            4000,
            2000,
            geometryWidth,
            geometryHeight
          ));
        this._originalPositions = new Float32Array(
          this.geometry.attributes.position.array
        );

        const waveColorValue = determineWaveColor();
        this.material = new THREE.MeshLambertMaterial({
          color: waveColorValue,
          opacity,
          blending: opacity < 1 ? THREE.NormalBlending : THREE.NoBlending,
          side: THREE.DoubleSide,
          transparent: opacity < 1,
          depthWrite: opacity < 1 ? false : true,
          wireframe,
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.simplex = createNoise2D();
        this.moveNoise({ x: 0, y: 0 });

        this.group.add(this.plane);
        scene.add(this.group);
      },

      moveNoise(mouse) {
        if (!this.geometry || !this.simplex || !this._originalPositions) return;
        const positions = this.geometry.attributes.position;
        const currentMouseX = mouseInteraction ? mouse.x : 0;
        const currentMouseY = mouseInteraction ? mouse.y : 0;

        this.distortionTime += this.mouseDistortionDecay;

        for (let i = 0; i < positions.count; i++) {
          const originalX = this._originalPositions[i * 3];
          const originalY = this._originalPositions[i * 3 + 1];
          let newX = originalX;
          let newY = originalY;

          const xoff_wave = originalX / this.factor;
          const yoff_wave = originalY / this.factor + this.cycle;
          let zOffset = this.simplex(xoff_wave, yoff_wave) * this.scale;

          positions.setXYZ(i, newX, newY, zOffset);
        }

        positions.needsUpdate = true;
        this.cycle += this.speed;
      },

      update(mouse) {
        this.moveNoise(mouse);
        if (mouseInteraction && this.group) {
          this.move.x = -(mouse.x * 0.04);
          this.move.y = waveOffsetY + mouse.y * 0.04;
          addEase(this.group.position, this.move, this.ease);
          addEase(this.group.rotation, this.look, this.ease);
        }
      },

      dispose() {
        this.geometry?.dispose();
        this.material?.dispose();
        this.group?.remove(this.plane);
      },
    };

    return groundPlain;
  }, [
    quality,
    smoothness,
    amplitude,
    speed,
    ease,
    waveOffsetY,
    cameraDistance,
    waveRotation,
    determineWaveColor,
    opacity,
    wireframe,
    mouseInteraction,
    getQualitySettings,
    mouseDistortionStrength,
    mouseDistortionSmoothness,
    mouseDistortionDecay,
    mouseShrinkScaleStrength,
    mouseShrinkScaleRadius,
  ]);

  const setupScene = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const device = getDeviceInfo();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      fov,
      device.screenRatio(),
      0.1,
      20000
    );

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(device.screenWidth(), device.screenHeight());
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
      setWebGLFailed(false);
    } catch (e) {
      console.error("Failed to create WebGL context:", e);
      setWebGLFailed(true);
      return;
    }

    const waveColorValue = determineWaveColor();
    const pointLight = new THREE.PointLight(waveColorValue, 4, 1000);
    pointLight.position.set(0, 200, -500);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const groundPlain = createGroundPlain();
    groundPlain.create(scene);

    sceneElementsRef.current = {
      scene,
      camera,
      renderer,
      groundPlain,
      animationFrameId: null,
      mouse: { x: device.screenCenterX(), y: device.screenCenterY() },
    };

    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      sceneElementsRef.current.mouse.x = device.mouseCenterX(e);
      sceneElementsRef.current.mouse.y = device.mouseCenterY(e);
    };

    if (mouseInteraction) window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const current = sceneElementsRef.current;
      if (!current.camera || !current.renderer) return;
      current.camera.aspect = device.screenRatio();
      current.camera.updateProjectionMatrix();
      current.renderer.setSize(device.screenWidth(), device.screenHeight());
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      const current = sceneElementsRef.current;
      if (
        !current.scene ||
        !current.camera ||
        !current.renderer ||
        !current.groundPlain
      )
        return;
      current.groundPlain.update(current.mouse);
      current.renderer.render(current.scene, current.camera);
      current.animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (mouseInteraction)
        window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      const current = sceneElementsRef.current;
      if (current.animationFrameId)
        cancelAnimationFrame(current.animationFrameId);
      current.groundPlain?.dispose();
      current.renderer?.dispose();
      current.scene?.clear();
      if (container.contains(current.renderer.domElement)) {
        container.removeChild(current.renderer.domElement);
      }
    };
  }, [fov, determineWaveColor, createGroundPlain, mouseInteraction]);

  useEffect(() => {
    const cleanup = setupScene();
    return () => cleanup?.();
  }, [setupScene]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      style={{ backgroundColor: backgroundColor || "transparent" }}
    >
      {webGLFailed && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          WebGL not supported
        </div>
      )}
    </div>
  );
};

export default AnimatedWave;
