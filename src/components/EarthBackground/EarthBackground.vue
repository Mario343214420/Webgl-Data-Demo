<template>
  <div id="cvsBg"></div>
</template>

<script>

  import * as THREE from 'three'
  const earthMap = require('./map.png')
  export default {
    name: 'EarthBackground',
    mounted(){
      this.drw_ball(500, 500, earthMap, 77, 'cvsBg')
    },
    methods: {
      drw_ball: function (w, h, picUrl, radius, id) {
        //var w = 800, h =600;//场景高宽
        var camera_deg = 45, aspect = w / h, near = .1, far = 10000//相机参数
        var container = document.getElementById(id)
        var renderer = new THREE.WebGLRenderer({ alpha: true, lights: true })
        var camera = new THREE.PerspectiveCamera(
          camera_deg, aspect, near, far
        )
        var scene = new THREE.Scene()
        scene.add(camera)
        camera.position.z = 200
        renderer.setSize(w, h)
        //附加DOM元素
        container.append(renderer.domElement)
        //设置球体的值
        var segemnt = 60, rings = 60
        var earth_png = new THREE.TextureLoader().load(picUrl)
        //var sphereMaterial = new THREE.MeshBasicMaterial(earth_png);
        var sphereMaterial = new THREE.MeshLambertMaterial({
          map: earth_png,
          opacity: 0.6
        })
        var sphere = new THREE.Mesh(
          new THREE.SphereGeometry(radius, segemnt, rings),
          sphereMaterial
        )

        // sphere.material.emissive=new THREE.Color(.5,.5,.5);
        // sphere.material.emissiveIntensity=1;
        // sphere.material.emissiveMap=sphere.material.map;

        sphere.geometry.verticesNeedUpdate = true
        sphere.geometry.normalsNeedUpdate = true
        scene.add(sphere)

        var pointLight = new THREE.PointLight('#7ca5ff')

        pointLight.position.x = 10
        pointLight.position.y = 50
        pointLight.position.z = 150
        scene.add(pointLight)

        function animate() {
          requestAnimationFrame(animate)
          //画图
          //sphere.rotation.x+=.01;
          sphere.rotation.y += .005//延Y轴旋转
          renderer.render(scene, camera)
        }

        animate()
      },
    }
  }
</script>

<style lang="stylus" scoped>
  #cvsBg
    height: 400px;
    position: absolute;
    top: 100px;
    right: 100px
    opacity: 0.4
    z-index: 0;
</style>
