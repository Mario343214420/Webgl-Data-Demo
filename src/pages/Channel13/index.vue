<template>
  <div class="channel" ref="channel">
    <canvas ref="cvs" width="w" height="h"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
export default {
  name: 'Channel13',
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      deg: 0,
      w: 0,
      h: 0,
      pipe: null,
      pipeList: [],
      copyPipe: null,
      group: null,
      group1: null,
      boxes: null,
      mX: null,
      mY: null,
      flag: false,
      windmill: null,
      info: {
        name: '',
        safe: '安全',
        coordinate: '模拟坐标{x: 100, y: 200}',
        v: '',
        a: '',
        count: 100
      },
      floatPos: {
        x: 0,
        y: 0
      },
      boxesList: [],
      addData: {
        x: '',
        y: '',
        z: '',
        name: '',
        type: '',
        a: '',
        v: '',
      },
      mixer: null,
      clock: null
    }
  },
  watch: {
    mX(n) {
      console.log(n)
    },
    mY(n) {
      console.log(n)
    }
  },
  mounted() {
    const baseDom = this.$refs.channel
    this.w = baseDom.clientWidth
    this.h = baseDom.clientHeight
    this.$nextTick(()=> {
      this.init();
    })
  },
  methods: {
    init() {
      var baseCanvas = this.$refs.cvs
      var Boxes = (function(THREE) {
        'use strict';
        function Box(pos, texture) {
          this.vector = pos;
          this.texture = texture;
          this.radius = {
            x: 20,
            y: 30,
            z: 20
          };
          this.counter = 0;
          this.axis = new THREE.Vector3();
          this.up = new THREE.Vector3(0, 1, 0);
          this.speed = 0.0005 + Math.random() * 0.0005;
          this.mesh = null;
        }
        Box.prototype.init = function(scene) {
          this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(this.radius.x, this.radius.y, this.radius.z, 2, 2, 2),
            new THREE.MeshPhongMaterial({
              map: texture
            })
          );
          this.mesh.position.set(this.vector.x, this.vector.y, this.vector.z);
          scene.add(this.mesh);
        }

        function Point(pos) {
          this.vector = new THREE.Vector3(pos.x, pos.y, pos.z);
        }

        function Spline(points) {
          this.points = points;
          this.box = null
          this.curve = null;
        }
        Spline.prototype.init = function(scene, texture) {
          var curve = new THREE.CatmullRomCurve3();
          this.points.forEach(function(point) {
            curve.points.push(point.vector);
          });
          var geometry = new THREE.Geometry();
          geometry.vertices = curve.getPoints(50);
          var material = new THREE.LineBasicMaterial({
            color: 0x3a3a3a
          });
          var splineObject = new THREE.Line(geometry, material);
          scene.add(splineObject);

          this.box = new Box(this.points[0].vector, texture);
          this.box.init(scene);
          this.curve = curve;
        };
        Spline.prototype.update = function() {
          var box = this.box;
          if (box.counter < 1) {
            box.mesh.position.copy(this.curve.getPointAt(box.counter));
            var tangent = this.curve.getTangentAt(box.counter).normalize();
            box.axis.crossVectors(box.up, tangent).normalize();
            var radians = Math.acos(box.up.dot(tangent));
            box.mesh.quaternion.setFromAxisAngle(box.axis, radians);
            box.texture.needsUpdate = true;
            box.counter += box.speed;
          } else {
            box.counter = 0;
          }
        };

        //
        var width = window.innerWidth;
        var height = window.innerHeight;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer({canvas: baseCanvas, antialias: true, alpha: false});
        var light = new THREE.DirectionalLight(0xFFFFFF, 1);
        //var controls = new THREE.OrbitControls(camera);

        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        var splines;
        var texture;

        function setUpWorld() {
          camera.position.set(0, -150, 120);
          camera.lookAt(scene.position);
          scene.add(camera);
          renderer.setSize(width, height);
          renderer.setClearColor(0x111111);
          scene.add(light);
          light.position.set(0, -300, 30);
        }

        function generateSplines(splinesNum, range, spacing) {
          splines = [];
          for (var i = 0; i < splinesNum; i += 1) {
            var points = [];
            for (var x = -range / 2; x <= range / 2; x += spacing) {
              var offset = -50 + Math.random() * 100;
              var point = new Point({
                x: x - offset,
                y: offset,
                z: (-offset / 2) * 10 + (Math.random() * offset / 2) * 10
              });
              points.push(point);
            }
            var spline = new Spline(points);
            spline.init(scene, texture);
            splines.push(spline);
          }
        }

        function makeTexture(str) {
          var width = 512;
          var height = 512;
          canvas.width = width;
          canvas.height = height;
          ctx.translate(0, 0);
          ctx.fillStyle = '#202020';
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = '#fff';
          ctx.translate(width / 2, height / 2);
          ctx.rotate(270 * Math.PI / 180);
          ctx.font = 'bold 130px Arial';
          ctx.fillText(str, -ctx.measureText(str).width / 2, 30);
          //document.body.appendChild(canvas);
          texture = new THREE.Texture(canvas);
        }

        function updateClock() {
          var date = new Date();

          var hours = date.getHours();
          var minutes = date.getMinutes();
          var seconds = date.getSeconds();

          if (hours.toString().length === 1) hours = '0' + hours;
          if (minutes.toString().length === 1) minutes = '0' + minutes;
          if (seconds.toString().length === 1) seconds = '0' + seconds;

          return hours + ':' + minutes + ':' + seconds;

        }

        function setUpTimer() {
          setInterval(function() {
            makeTexture(updateClock());
          }, 1000);
        }

        function renderFrame() {
          window.requestAnimationFrame(renderFrame);
          //controls.update();
          renderer.render(scene, camera);
          splines.forEach(updateSpline);
        }

        function updateSpline(spline) {
          spline.update();
        }

        function init() {
          setUpWorld();
          makeTexture(updateClock());
          setUpTimer();
          generateSplines(25, 400, 60);
          renderFrame();
        }

        return {
          init: init
        };

      })(THREE);

      Boxes.init();
    }
  }
}
</script>

<style lang="stylus" scoped>
.channel {
  display block
  width: 100%
  height: 100%
  position: relative
  .float {
    position: absolute
    opacity: 0
    z-index 100
    background-color: #fff
    border: 1px solid #000
    -webkit-border-radius: 6px
    -moz-border-radius: 6px
    border-radius: 6px
    padding: 20px
  }
  .handle-group {
    position: absolute;
    right: 20px;
    top: 20px;
    .row {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin: 8px 0
      input {
        margin-left: 10px
      }
    }
  }
}
</style>
