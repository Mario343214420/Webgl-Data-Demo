<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from 'tween.js';
export default {
  mounted() {
    this.initScene();
    this.createTerrain();
    this.animateTerrain();
    this.renderScene();
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 20;

      this.controls = new OrbitControls(this.camera, this.$refs.canvas )
      this.renderer = new THREE.WebGLRenderer({ canvas: this.$refs.canvas });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    createTerrain() {
      const grassTexture = new THREE.Texture(this.generateGrassTexture());
      grassTexture.needsUpdate = true;
      const grassMaterial = new THREE.MeshBasicMaterial({ map: grassTexture });

      const dirtTexture = new THREE.Texture(this.generateDirtTexture());
      dirtTexture.needsUpdate = true;
      const dirtMaterial = new THREE.MeshBasicMaterial({ map: dirtTexture });

      const geometry = new THREE.BoxGeometry(1, 1, 1);

      const terrainSize = 10; // 地形尺寸
      const terrainResolution = 64; // 地形分辨率

      this.terrain = [];

      for (let i = 0; i < terrainResolution; i++) {
        for (let j = 0; j < terrainResolution; j++) {
          const cube1 = new THREE.Mesh(geometry, grassMaterial);
          const cube2 = new THREE.Mesh(geometry, dirtMaterial);

          const x = (i / (terrainResolution - 1)) * terrainSize - terrainSize / 2;
          const y = (j / (terrainResolution - 1)) * terrainSize - terrainSize / 2;

          cube1.position.set(x, y, 1.01);
          cube2.position.set(x, y, 0);

          this.terrain.push(cube1);
          this.terrain.push(cube2);

          this.scene.add(cube1);
          this.scene.add(cube2);
        }
      }
    },
    generateGrassTexture() {
      // const canvas = document.createElement('canvas');
      // canvas.width = 64;
      // canvas.height = 64;
      //
      // const context = canvas.getContext('2d');
      // context.fillStyle = '#00ff00'; // 绿色
      //
      // // 绘制草的纹理
      // // 这里使用简单的随机点来表示草的分布
      // for (let i = 0; i < 10; i++) {
      //   const x = Math.random() * canvas.width;
      //   const y = Math.random() * canvas.height;
      //   context.fillRect(x, y, 8, 8);
      // }
      //
      // return canvas;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const resolution = 64;
      const size = resolution * resolution;
      canvas.width = resolution;
      canvas.height = resolution;
      const imageData = context.createImageData(resolution, resolution);
      const data = imageData.data;

      for (let i = 0; i < size; i++) {
        const x = i % resolution;
        const y = Math.floor(i / resolution);

        const r = Math.floor(Math.random() * 30 + 180);
        const g = Math.floor(Math.random() * 60 + 195);
        const b = Math.floor(Math.random() * 30 + 30);
        const a = 255;

        const index = (x + y * resolution) * 4;
        data[index + 0] = r;
        data[index + 1] = g;
        data[index + 2] = b;
        data[index + 3] = a;
      }

      context.putImageData(imageData, 0, 0);

      return canvas;

      // const canvas = document.createElement('canvas');
      // canvas.width = 64;
      // canvas.height = 64;
      //
      // const context = canvas.getContext('2d');
      //
      // // 创建线性渐变
      // const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      // gradient.addColorStop(0, '#005400'); // 深绿色
      // gradient.addColorStop(1, '#00ff00'); // 浅绿色
      //
      // context.fillStyle = gradient;
      // context.fillRect(0, 0, canvas.width, canvas.height);
      //
      // return canvas;
    },
    generateDirtTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;

      const context = canvas.getContext('2d');
      context.fillStyle = '#8b4513'; // 棕色

      // 绘制土地的纹理
      // 这里使用简单的线性渐变来表示土地的纹理
      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#8b4513');
      gradient.addColorStop(1, '#d2b48c');
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      return canvas;
    },
    animateTerrain() {
      const maxHeight = 2; // 最大高度
      const center = { x: 0, y: 0 }; // 地形中心点

      this.terrain.forEach((cube) => {
        const initialPosition = { x: cube.position.x, y: cube.position.y, z: cube.position.z };

        const distance = Math.sqrt(
          Math.pow(cube.position.x - center.x, 2) + Math.pow(cube.position.y - center.y, 2)
        );
        const maxDistance = Math.sqrt(Math.pow(5, 2) + Math.pow(5, 2)); // 最大距离为中心点到四角的距离
        const scale = 1 - distance / maxDistance; // 根据距离计算缩放比例

        const targetPosition = {
          x: cube.position.x,
          y: cube.position.y,
          z: initialPosition.z + maxHeight * scale,
        };

        new TWEEN.Tween(cube.position)
          .to(targetPosition, 1000)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .yoyo(true)
          .repeat(Infinity)
          .start();
      });
    },
    renderScene() {
      const animate = () => {
        requestAnimationFrame(animate);
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
      };

      animate();
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
}

canvas {
  display: block;
}
</style>
