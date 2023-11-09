<template>
  <div class="webgl-container">
    <div class="layout" ref="layout"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { loader } from './loader'
import beltList1 from './belt1'
import beltList2 from './belt2'

export default {
  data () {
    return {
      renderer: null,
      camera: null,
      scene: null,
      orbitControls: null,
      rafId: null,
      resizeEvent: null
    }
  },

  mounted () {
    this.createWebGL()
  },

  beforeDestroy () {
    this.clearCache()
  },

  methods: {
    async createWebGL () {
      const el = this.$refs.layout
      const { clientWidth, clientHeight } = el

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, logarithmicDepthBuffer: true })
      this.renderer.setClearColor('#FFFFFF', 0)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(clientWidth, clientHeight)
      el.appendChild(this.renderer.domElement)

      // 创建相机
      this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 4500)
      this.camera.position.set(0, 1700, 1400)

      // 创建场景
      this.scene = new THREE.Scene()
      this.scene.add(this.camera)

      // 添加环境光
      const ambient = new THREE.AmbientLight(0xffffff, 0.5)
      this.scene.add(ambient)

      // 创建CSS3D渲染器
      this.css3DRenderer = new CSS3DRenderer()
      this.css3DRenderer.setSize(el.clientWidth, el.clientHeight)
      this.css3DRenderer.domElement.style.position = 'absolute'
      this.css3DRenderer.domElement.style.top = 0
      el.appendChild(this.css3DRenderer.domElement)

      // 创建控制器
      this.orbitControls = new OrbitControls(this.camera, this.css3DRenderer.domElement)
      this.orbitControls.update()
      this.css3DRenderer.domElement.removeAttribute('tabindex')

      // 渲染循环
      const render = () => {
        this.rafId = window.requestAnimationFrame(render)
        this.orbitControls.update()
        this.renderer.render(this.scene, this.camera)
        this.css3DRenderer.render(this.scene, this.camera)
      }
      render()

      // 窗口大小变化事件
      this.resizeEvent = () => {
        this.camera.aspect = el.clientWidth / el.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(el.clientWidth, el.clientHeight)
        this.css3DRenderer.setSize(el.clientWidth, el.clientHeight)
      }
      window.addEventListener('resize', this.resizeEvent)
    },

    async loadModel (url, list, { scale = 1, x = 0, y = 0, z = 0 }) {
      const model = await loader(url)
      list.forEach(item => {
        const cloneModel = model.clone()
        cloneModel.traverse(child => {
          if (child.isMesh) {
            child.material.ambient = new THREE.Color(0x555555)
            child.material.diffuse = new THREE.Color(0x555555)
          }
        })
        const { x: posX, y: posY, z: posZ, scale: itemScale = 1 } = item
        cloneModel.position.set(posX, posY, posZ)
        cloneModel.scale.set(scale * itemScale, scale, scale)
        this.scene.add(cloneModel)
      })
    },

    clearCache () {
      cancelAnimationFrame(this.rafId)
      this.renderer.dispose()
      this.renderer.forceContextLoss()
      this.renderer = null
      this.scene.dispose()
      this.scene = null
      this.camera = null
      this.css3DRenderer = null
      this.orbitControls.dispose()
      this.orbitControls = null
      window.removeEventListener('resize', this.resizeEvent)
    }
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
