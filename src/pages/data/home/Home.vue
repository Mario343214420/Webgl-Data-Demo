<template>
  <div class="home">
    Home<br>
    <router-link to="/overview">to overview</router-link>
    <br>
    <router-link to="/summary">to summary</router-link>
    <br>
    <router-link to="/public">to public</router-link>
    <br>
    <router-link to="/union">to union</router-link>
    <br>
    <router-link to="/map">to map</router-link>
    <br>
    <div id="three"></div>
  </div>
</template>
<script>
  import * as THREE from 'three'
  import * as dat from 'three/examples/js/libs/dat.gui.min'
  const OrbitControls = require('three-orbitcontrols')
  /* eslint-disable */
  export default {
    name: 'Home',
    methods:{
      render3dText(){
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);
        let renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        let dom = document.getElementById('three')
        renderer.setSize(dom.clientWidth, dom.clientHeight);
        dom.appendChild(renderer.domElement);
        var geometry;
        var loader = new THREE.FontLoader();
        loader.load( './typeface.json',
          //加载好字体后创建三维文字
          ( font )=> {
            //获取字体数据转换为font
            geometry = new THREE.TextBufferGeometry( 'Hello three.js!', {
              font: font,
              size: 120,
              height: 20,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 10,
              bevelSize: 8,
              bevelSegments: 5
            } );
            //创建文字对象

            var meshMaterial = new THREE.MeshBasicMaterial({
              color:"#60a0a0"
            });
            //创建基本材质
            var mesh = new THREE.Mesh(geometry, meshMaterial);
            scene.add(mesh);
            camera.position.set( 0, 0, 1000 );
            camera.lookAt(new THREE.Vector3(10, 0, 0))
            //定位相机的朝向
            renderer.render(scene, camera);
          }
        );
      },
      renderBackground(){
        class App {

          constructor() {

            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.DELTA_TIME = 0;
            this.LAST_TIME = Date.now();

            this.scene = new Scene(this.width, this.height);
            this.plane = new Plane();

            this.scene.add(this.plane.mesh);

            const root = document.body.querySelector('.app');
            root.appendChild(this.scene.renderer.domElement);

            this.update = this.update.bind(this)

            this.addListeners();

            requestAnimationFrame(this.update);

          }

          onResize() {

            this.width = window.innerWidth;
            this.height = window.innerHeight;

            this.scene.resize(this.width, this.height);

          }

          addListeners() {

            window.addEventListener('resize', this.onResize.bind(this));

          }

          update() {

            this.DELTA_TIME = Date.now() - this.LAST_TIME;
            this.LAST_TIME = Date.now();

            this.plane.update(this.DELTA_TIME);
            this.scene.render();

            requestAnimationFrame(this.update);

          }

        }

        class Plane {

          constructor() {

            this.size = 3000;
            this.segments = 200;

            this.options = new Options();
            this.options.initGUI();

            this.uniforms = {
              u_amplitude: { value: this.options.amplitude },
              u_frequency: { value: this.options.frequency },
              u_time: { value: 0.0 },
              fogColor: { type: "c", value: "#002135" },
              fogNear: { type: "f", value: 1 },
              fogFar: { type: "f", value: 1000 },
              light: { type: "v3", value: new THREE.Color( 0xffffff) },
              light_pos: { type: "v3", value: new THREE.Vector3( 0, 10, 10 ) }
            }

            this.geometry = new THREE.PlaneBufferGeometry(this.size, this.size, this.segments, this.segments);
            this.material = new THREE.ShaderMaterial({
              uniforms: this.uniforms,
              vertexShader: document.getElementById('planeVS').innerHTML,
              fragmentShader: document.getElementById('planeFS').innerHTML,
              side: THREE.DoubleSide,
              wireframe: true,
              fog: true,
              lights: false

            });

            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.mesh.position.x = 0;
            this.mesh.position.y = -100;
            this.mesh.position.z = 0;
            this.mesh.rotation.x = 360;

          }

          //dt - DELTA_TIME
          update(dt) {

            this.uniforms.u_amplitude.value = this.options.amplitude;
            this.uniforms.u_frequency.value = this.options.frequency;
            this.uniforms.u_time.value += dt / 5500;

          }

        }

        class Scene extends THREE.Scene {

          constructor(width, height) {

            super();

            this.renderer = new THREE.WebGLRenderer({ antialias: true,
              alpha: true });
            this.background = "#002135";
            this.renderer.setSize(width, height);
            this.renderer.setClearColor(this.background, 0);

            // should add BLUR!!

            this.fog = new THREE.Fog(this.background, 1, 1000);

            this.camera = new THREE.PerspectiveCamera(55, width / height, 1, 100000);
            this.camera.position.x = 0;
            this.camera.position.y = -100;
            this.camera.position.z = 250;

            this.pointLight = new THREE.PointLight(0xffffff, 5);
            this.pointLight.position.x = 0;
            this.pointLight.position.y = 10;
            this.pointLight.position.z = 10;
            this.add(this.pointLight);

            this.sphereSize = 10;
            this.pointLightHelper = new THREE.PointLightHelper( this.pointLight, this.sphereSize );
            this.add( this.pointLightHelper );


            this.controls = new OrbitControls(this.camera);
            this.controls.enabled = true;

          }


          render() {

            this.renderer.autoClearColor = true;
            this.renderer.render(this, this.camera);

          }

          resize(newWidth, newHeight) {

            this.camera.aspect = newWidth / newHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(newWidth, newHeight);

          }

        }

        class Options {

          constructor() {

            this.amplitude = 20.0;
            this.frequency = 0.015;
            const {GUI} = data
            this.gui = new GUI();
          }

          initGUI() {

            this.gui.close();

            this.gui.add(this, 'amplitude', 1.0, 15.0);
            this.gui.add(this, 'frequency', 0.01, 0.1);

          }

        }

        new App();
      }
    },
    mounted(){
      this.render3dText()
      this.renderBackground()
    }
  }
</script>

<style lang="stylus" scoped>
  #three
    height: 200px
    width: 600px
</style>
