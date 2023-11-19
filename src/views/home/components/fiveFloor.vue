<template>
  <div class="webgl-container">
    <div class="layout" id="five_layout"></div>

  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { loader } from './loader'
export default {
  data () {
    return {
      // renderer: null,
      // camera: null,
      // scene: null,
      // orbitControls: null,
      // rafId: null,
      // resizeEvent: null

    }
  },
  props: {

  },
  watch: {
  },
  methods: {
    resetView () {
      this.orbitControls.reset()
      this.orbitControls.target.set(-5093, 3, 2682)
    },
    createBasic (sence) {
      loader('static/3d/fiveModel/fiveWall.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 + 10 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
      loader('static/3d/fiveModel/fiveText.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 + 10// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    async createWebGL () {
      this.renderer = null
      this.scene = null
      this.camera = null
      const el = document.getElementById('five_layout')
      const { clientWidth, clientHeight } = el
      // this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
      // this.renderer.outputEncoding = new THREE.sRGBEncoding

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true })
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.toneMapping = THREE.LinearToneMapping
      this.renderer.outputColorSpace = THREE.SRGBColorSpace
      // this.renderer.toneMappingExposure = 0

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
      // 控制器
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.update()
      const render = () => {
        this.rafId = window.requestAnimationFrame(render)
        this.orbitControls.update()
        this.renderer.render(this.scene, this.camera)
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
