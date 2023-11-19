<template>
  <div class="webgl-container">
    <div class="layout" id="3d_layout"></div>

  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { loader, loaderAnimation } from './loader'
import cncList from './fourList/cncList.js'
import cncLeft from './fourList/cncLeft.js'
import cncRight from './fourList/cncRight.js'
import cncReverse from './fourList/cncReverse.js'
import markingList from './fourList/markingList.js'
import robotList from './fourList/robotList.js'
import machineList from './fourList/machineList.js'
import workbenchList from './fourList/workbenchList.js'
export default {
  data () {
    return {
      animationList: []
    }
  },
  props: {

  },
  watch: {
  },
  computed: {
    functionList () {
      return {
      }
    }
  },
  methods: {
    resetView () {
      this.orbitControls.reset()
      this.orbitControls.target.set(-5093, 3, 2682)
    },
    createBelt (sence) {
      loaderAnimation('static/3d/fourModel/cnc.glb').then(obj => {
        const cnc = obj.scene
        cncList.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = cnc.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.2, 0.3)
          const animations = obj.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)
          sence.add(cloneBelt)
        })
      })
    },
    createCncReverse (sence) {
      loaderAnimation('static/3d/fourModel/cnc.glb').then(obj => {
        const cnc = obj.scene
        cncReverse.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = cnc.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.2, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 90
          const animations = obj.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)
          sence.add(cloneBelt)
        })
      })
    },
    createLeftCnc (sence) {
      loaderAnimation('static/3d/fourModel/cncLeft.glb').then(obj => {
        const cnc = obj.scene
        cncLeft.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = cnc.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.2, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 90
          if (index >= 5) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = -(90 * Math.PI) / 45
          }
          const animations = obj.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)
          sence.add(cloneBelt)
        })
      })
    },
    createRightCnc (sence) {
      loaderAnimation('static/3d/fourModel/cncRight.glb').then(obj => {
        const cnc = obj.scene
        cncRight.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = cnc.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.2, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 90
          if (index >= 5) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = -(90 * Math.PI) / 45
          }
          const animations = obj.animations[0]// animations
          const mixer = new THREE.AnimationMixer(cloneBelt)
          mixer.timeScale = 0.5
          mixer.clipAction(animations).loop = THREE.LoopPingPong
          mixer.clipAction(animations).play()
          this.animationList.push(mixer)
          sence.add(cloneBelt)
        })
      })
    },
    createMarking (sence) {
      loader('static/3d/fourModel/marking.glb').then(belt => {
        markingList.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          if (index >= 4) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = -(90 * Math.PI) / 90
          }
          if (index >= 8) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = (45 * Math.PI) / 90
          }
          sence.add(cloneBelt)
        })
      })
    },
    createMachine (sence) {
      loader('static/3d/fourModel/machine.glb').then(belt => {
        machineList.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          if (index >= 3) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = -(90 * Math.PI) / 90
          }
          sence.add(cloneBelt)
        })
      })
    },
    createWorkbench (sence) {
      loader('static/3d/fourModel/workbench.glb').then(belt => {
        workbenchList.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          sence.add(cloneBelt)
        })
      })
    },
    createRobot (sence) {
      loader('static/3d/fourModel/robot.glb').then(belt => {
        robotList.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          if (index >= 3) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = -(90 * Math.PI) / 90
          }
          if (index >= 5) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = (45 * Math.PI) / 90
          }
          sence.add(cloneBelt)
        })
      })
    },
    createStone (sence) {
      // 外壳
      loader('static/3d/fourModel/stone.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-5, -12, -23)
        sence.add(gltf)
      })
    },
    createAssurance (sence) {
      // 外壳
      loader('static/3d/fourModel/assurance.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-10, -12, -23) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    createGuardrail (sence) {
      // 外壳
      loader('static/3d/fourModel/guardrail.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-5, -12, -20) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    createBasic (sence) {
      // 外壳
      loader('static/3d/fourModel/wallFour.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
      // 文字
      loader('static/3d/fourModel/waring.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = 20 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 92 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 10 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
      // 黄色线
      loader('static/3d/fourModel/text.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        // const mdhei = box.max.y - box.min.y // 模型高度
        const mdhei = 20 // 模型高度
        const x1 = box.min.x + mdlen / 2 + 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 5 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
      loader('static/3d/fourModel/textLine.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        // const mdhei = box.max.y - box.min.y // 模型高度
        const mdhei = 20 // 模型高度
        const x1 = box.min.x + mdlen / 2 + 30 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 25 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
      // 标识线
      loader('static/3d/fourModel/signage.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        const mdhei = 20 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 75// 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 13// 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
    },
    async createWebGL () {
      this.renderer = null
      this.scene = null
      this.camera = null
      const el = document.getElementById('3d_layout')
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
      // this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 2500)
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
      this.createBelt(this.scene)
      this.createLeftCnc(this.scene)
      this.createRightCnc(this.scene)
      this.createStone(this.scene)
      this.createCncReverse(this.scene)
      this.createAssurance(this.scene)
      this.createGuardrail(this.scene)
      this.createMarking(this.scene)
      this.createRobot(this.scene)
      this.createMachine(this.scene)
      this.createWorkbench(this.scene)
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
    clearCache () {
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
  mounted () {
    this.createWebGL()
  },
  beforeDestroy () {
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
