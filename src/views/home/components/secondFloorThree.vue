<template>
  <div class="webgl-container">
    <div class="layout" id="3d_layout_second"></div>
  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import cncBack from './secondFloorCncBack'
import cncFront from './secondFloorCncFront'
import cncRight from './secondFloorCncRight'
import transmission from './secondFloorTransmission'
import { loader, loaderAnimation } from './loader'
export default {
  data() {
    return {
      clock: null,
      animationList: []
    }
  },
  methods: {
    resetView() {
      this.orbitControls.reset()
      this.orbitControls.target.set(-5093, 3, 2682)
    },
    // cnc背面
    createRepair(sence) {
      loaderAnimation('static/3d/second/cnc.glb').then(gltf => {
        const belt = gltf.scene
        cncBack.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = (90 * Math.PI) / 90

          const animations = gltf.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)

          sence.add(cloneBelt)
        })
      })
      // cnc 正面
      loaderAnimation('static/3d/second/cnc.glb').then(gltf => {
        const belt = gltf.scene
        cncFront.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 1

          const animations = gltf.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)

          sence.add(cloneBelt)
        })
      })
      // cnc右边
      loaderAnimation('static/3d/second/cncRight.glb').then(gltf => {
        const belt = gltf.scene
        cncRight.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 90

          const animations = gltf.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)

          sence.add(cloneBelt)
        })
      })
    },
    // 工作台
    createTransmission(sence) {
      loader('static/3d/second/workbench.glb').then(belt => {
        transmission.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.33)
          cloneBelt.rotation.y = -(90 * Math.PI) / 1
          sence.add(cloneBelt)
        })
      })
    },
    createAgv(sence) {
      loader('static/3d/oneModel/AGV.glb').then(obj => {
        const cloneBelt = obj.clone()
        // cloneBelt.position.set(-550, -12, 55)
        cloneBelt.scale.set(0.35, 0.35, 0.35)

        cloneBelt.name = "Box";
        // 给名为Box的模型对象的设置关键帧数据KeyframeTrack
        const times = [0, 5, 60, 70, 80, 90, 100, 110, 130, 140, 150, 160, 170, 190, 200, 210, 220, 223, 230, 240
          , 250, 253, 260, 270, 290]; //时间轴上，设置三个时刻0、3、6秒
        // times中三个不同时间点，物体分别对应values中的三个xyz坐标
        const values = [
          -680, -12, 180, // 电梯
          -680, -12, 150, //出电梯右转点-5s
          565, -12, 150,  // 60s
          565, -12, 125,  //物料区门口-70s
          645, -12, 125, //80s
          645, -12, 80,  //4夾熟料停留-90s
          645, -12, 125,  //4夾熟料返回-100s
          690, -12, 125,  //过道-110s
          690, -12, -10,
          645, -12, -10,  //4夾-140s
          645, -12, 30,  //4夾停留-150s
          645, -12, -10,  //返回-160s
          600, -12, -10,  //4夾尽头-170s
          690, -12, -10,   //4夾返回-190s
          690, -12, -40,   //3夾-200s
          670, -12, -40,   //3夾-210s
          670, -12, -50,   //3夾中间-220s
          670, -12, -50,   //3夾中间停留3秒
          670, -12, -40,    //3夾中间返回-230s  
          620, -12, -40,   //2夾-240s
          620, -12, -50,   //2夾中间-250s
          620, -12, -50,   //2夾中间停留3秒-253
          620, -12, -40,    //2夾中间返回-260s  
          600, -12, -40,    //2夾尽头 -270s
          690, -12, -40,   //2夾，3夾返回-290s
        ];
        // 创建关键帧，把模型位置和时间对应起来
        // 0~3秒，物体从(0,0,0)逐渐移动到(100,0,0),3~6秒逐渐从(100,0,0)移动到(0,0,100)
        const posKF = new THREE.KeyframeTrack('Box.position', times, values);
        // 从2秒到5秒，物体从红色逐渐变化为蓝色
        // const colorKF = new THREE.KeyframeTrack('Box.material.color', [12, 25], [1, 0, 0, 0, 0, 1]);
        // 1.3 AnimationClip表示一个关键帧动画，可以基于关键帧数据产生动画效果
        // 创建一个clip关键帧动画对象，命名"test"，动画持续时间6s
        // AnimationClip包含的所有关键帧数据都放到参数3数组中即可
        const rotation1 = new THREE.KeyframeTrack('Box.rotation[y]', [5, 5.1, 60, 60.1, 70, 70.1, 80, 80.1, 90, 90.1, 100, 100.1, 110, 110.1], [
          0, -(90 * Math.PI) / 180,
          -(90 * Math.PI) / 180, 0,
          0, -(90 * Math.PI) / 180,
          -(90 * Math.PI) / 180, 0,
          0, -(90 * Math.PI) / 90,
          -(90 * Math.PI) / 90, -(90 * Math.PI) / 180,
          -(90 * Math.PI) / 180, 0
        ]);
        const clip = new THREE.AnimationClip("test", 290, [posKF, rotation1]);
        //包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
        const mixer = new THREE.AnimationMixer(cloneBelt);
        //AnimationMixer的`.clipAction()`返回一个AnimationAction对象
        const clipAction = mixer.clipAction(clip);
        //.play()控制动画播放，默认循环播放
        clipAction.play();
        this.animationList.push(mixer)

        sence.add(cloneBelt)
      })
    },
    createBasic(sence) {
      // 外壳
      loader('static/3d/second/wall.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = (90 * Math.PI) / 1
        sence.add(gltf)
      })
      // 文字
      loader('static/3d/second/text.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 13 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
      // 虚线
      loader('static/3d/second/line.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 160 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 47 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
      // 警戒线及识别码
      loader('static/3d/second/lineAndCode.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.295, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        const mdhei = box.max.y - box.min.y // 模型高度
        const x1 = box.min.x + mdlen / 2 + 80// 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 8 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
      // 地面标识
      loader('static/3d/second/remark.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.295, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        const mdhei = box.max.y - box.min.y // 模型高度
        const x1 = box.min.x + mdlen / 2 + 110 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 10 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
      // 室内石柱
      loader('static/3d/second/interiorPillar.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.295, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        const mdhei = box.max.y - box.min.y // 模型高度
        const x1 = box.min.x + mdlen / 2 - 3 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 300 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 5 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
    },
    async createWebGL() {
      this.renderer = null
      this.scene = null
      this.camera = null
      const el = document.getElementById('3d_layout_second')
      const { clientWidth, clientHeight } = el

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.toneMapping = THREE.LinearToneMapping
      this.renderer.outputColorSpace = THREE.SRGBColorSpace

      this.renderer.setClearColor('#FFFFFF', 0)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(clientWidth, clientHeight)
      el.appendChild(this.renderer.domElement)
      // 相机
      this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 4500)
      this.camera.position.set(0, 1700, 1400)
      // 场景
      this.scene = new THREE.Scene()
      this.scene.add(this.camera)
      this.clock = new THREE.Clock()

      const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
      pmremGenerator.compileEquirectangularShader()
      const neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture
      neutralEnvironment.colorSpace = THREE.SRGBColorSpace
      neutralEnvironment.flipY = false
      neutralEnvironment.dispose()
      pmremGenerator.dispose()
      this.scene.environment = neutralEnvironment
      // 环境光
      const ambient = new THREE.AmbientLight(0xffffff, 1)
      this.scene.add(ambient)

      this.createBasic(this.scene)
      // this.createRepair(this.scene)
      this.createTransmission(this.scene)

      this.createAgv(this.scene)

      // 控制器
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.update()
      const render = () => {
        this.rafId = window.requestAnimationFrame(render)
        this.orbitControls.update()
        this.renderer.render(this.scene, this.camera)
        // 播放动画
        const animationTime = this.clock.getDelta()
        if (this.animationList.length > 0) {
          this.animationList.forEach(mixerr => {
            mixerr.update(animationTime)
          })
        }
      }
      render()
      this.resizeEvent = () => {
        this.camera.aspect = el.clientWidth / el.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(el.clientWidth, el.clientHeight)
      }
      window.addEventListener('resize', this.resizeEvent)
    },
    clearCache() {
      cancelAnimationFrame(this.rafId)
      // 优化清除
      this.renderer.dispose()
      this.renderer.forceContextLoss()
      this.renderer = null
      this.scene.dispose()
      THREE.Cache.clear()
      this.scene = null
      this.camera = null
      this.orbitControls.dispose()
      this.orbitControls = null
      window.addEventListener('resize', () => { })
    }
  },
  mounted() {
    this.createWebGL()
  },
  beforeDestroy() {
    this.clearCache()
  }
}
</script>

<style lang="scss" scoped>
.webgl-container {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;

  .layout {
    width: 100%;
    height: 100%;
  }
}
</style>
