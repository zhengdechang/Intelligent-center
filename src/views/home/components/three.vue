<template>
  <div class="webgl-container" :class="isLock ? 'lock' : ''">
    <h1>1</h1>
    <div class="layout" id="3d_layout"></div>
    <div id="loading-bar-container">
      <div id="loading-bar"></div>
    </div>

  </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'
import { loader, loaderAnimation } from './loader'
import polishinList from './oneList/polishinList' // 1楼
import platformList from './oneList/platformList'
import platformTwoList from './oneList/platformTwoList'
import moldRepair from './oneList/moldRepair'
import beltList3 from './oneList/belt3'
import pressTwo from './oneList/pressTwo'
import beltList6 from './oneList/belt6'
import cleanMachine from './oneList/cleanMachine'
import workspace from './oneList/workspace'
import beltList9 from './oneList/belt9'
import pressOne from './oneList/pressOne'
import robot from './oneList/robot'
import feeding from './oneList/feeding'
import pressThree from './oneList/pressThree'

import secondFloorCncBack from './secondFloorCncBack' // 2楼
import secondFloorCncFront from './secondFloorCncFront'
import secondFloorCncRight from './secondFloorCncRight'
import secondFloorTransmission from './secondFloorTransmission'
import cncList from './fourList/cncList.js' // 4楼
import cncLeft from './fourList/cncLeft.js'
import cncRight from './fourList/cncRight.js'
import cncReverse from './fourList/cncReverse.js'
import markingList from './fourList/markingList.js'
import robotList from './fourList/robotList.js'
import machineList from './fourList/machineList.js'
import workbenchList from './fourList/workbenchList.js'
import { Loading } from 'element-ui'
import TWEEN from '@tweenjs/tween.js'
export default {
  data() {
    return {
      clock: null,
      animationList: [],
      agvList: [],
      loadingService: null,
      floor: null,
      oneShow: true,
      isLock: false,
      modelList: [
        { name: 'platformTwo', fileName: 'platformTwo', clone: true, scale: { x: 0.3, y: 0.3, z: 0.3 }, rotation: { y: (90 * Math.PI) / 180 }, position: platformTwoList }
        // { name: 'transmission', fileName: 'transmission', clone: true, scale: { x: 20, y: 30, z: 26 }, rotation: { y: -(90 * Math.PI) / 180 }, position: platformTwoList }
      ],
      twoList: [{ name: 'twoCnc', fileName: '/second/cnc', clone: true },
      { name: 'clearLine', fileName: 'clearLine', clone: true }
      ]

    }
  },
  props: {

  },
  watch: {
  },
  methods: {
    // 0 twoFloor 1 fourFloor 2 elevatorFloor 3oneFloor 4fiveFloor
    isFloorView(index) {
      if (index === 5) {
        this.floor.children.forEach((child) => (child.visible = true))
        this.createCameraAnimation({ x: 0, y: 1000, z: 1600 })
        this.createShelfAnmation({ y: 0 }, 'oneFloor')
        this.createShelfAnmation({ y: 0 }, 'twoFloor')
        this.createShelfAnmation({ y: 0 }, 'fourFloor')
        this.createShelfAnmation({ y: 0 }, 'fiveFloor')
      } else {
        this.floor.children.forEach((child) => (child.visible = false))
        this.createCameraAnimation({ x: 0, y: 1200, z: 500 })
        // this.floor.children[index].visible = true
        switch (index) {
          case 0:
            this.createShelfAnmation({ y: 200 }, 'oneFloor')
            break
          case 1:
            this.createShelfAnmation({ y: 90 }, 'twoFloor')
            break
          case 2:
            this.createShelfAnmation({ y: -359 }, 'fourFloor')
            break
          case 3:
            this.createShelfAnmation({ y: -608 }, 'fiveFloor')
            break
        }
        // this.floor.children[0].children[0].children[0].children[0].visible = false
      }
    },
    viewLock() {
      this.isLock = !this.isLock
    },
    createShelfAnmation(to, modelName) {
      const shelfGroup = this.scene.getObjectByName(modelName)
      shelfGroup.visible = true
      const position = { y: shelfGroup.position.y }
      const tewen = new TWEEN.Tween(position)
      tewen.to(to, 3000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(obj => {
          const { y } = obj
          shelfGroup.position.y = y
        })
        .start()
      // .onComplete(() => {
      //   onComplete(shelfGroup)
      // })
    },
    createCameraAnimation(params) {
      const position = this.camera.position
      const cameraTewen = new TWEEN.Tween(position)
      cameraTewen.to(params, 2000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(obj => {
          const { x, y, z } = obj
          this.camera.position.set(x, y, z)
        })
        .start()
    },
    createAgv(sence) {
      loader('static/3d/oneModel/AGV.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.scale.set(0.3, 0.3, 0.3)

        cloneBelt.name = 'Box'
        const times = [0, 5, 10, 15, 20, 35, 40, 45, 48, 52, 57, 65, 70, 75, 80, 85, 90, 95, 100, 115, 120] // 时间轴上，设置三个时刻0、3、6秒
        const values =
          [-680, -220, 190,
          -680, -220, 143,
          -555, -220, 143,
          -555, -220, 85,
          -555, -220, 138,
          -10, -220, 138,
          -10, -220, 90,
          -10, -220, 138,
            25, -220, 138,
            25, -220, 180,
            25, -220, 138,
            360, -220, 138,
            360, -220, -77,
            10, -220, -77,
            10, -220, -105,
            390, -220, -105,
            390, -220, -28,
            360, -220, -28,
            360, -220, 143,
          -680, -220, 143,
          -680, -220, 190
          ]
        // 创建关键帧，把模型位置和时间对应起来
        const posKF = new THREE.KeyframeTrack('Box.position', times, values)
        const rotation1 = new THREE.KeyframeTrack('Box.rotation[y]', [5, 5.1, 10, 10.1, 15,
          15.1, 20, 20.1, 35, 35.1, 40, 40.1, 45, 45.1, 48, 48.1, 52,
          52.1, 57, 57.1, 65, 65.1, 70,
          70.1, 75, 75.1, 80, 80.1, 85, 85.1,
          90, 90.1, 95, 95.1, 100, 100.1, 115, 115.1],
          [0, -Math.PI / 2,
            -Math.PI / 2, 0,
            0, -Math.PI,
            -Math.PI, -Math.PI / 2,
            -Math.PI / 2, 0,
            0, -Math.PI,
            -Math.PI, -Math.PI / 2,
            -Math.PI / 2, -Math.PI,
            -Math.PI, 0,
            0, -Math.PI / 2,
            -Math.PI / 2, 0,
            0, Math.PI / 2,
            Math.PI / 2, 0,
            0, -Math.PI / 2,
            -Math.PI / 2, -Math.PI,
            -Math.PI, Math.PI / 2,
            Math.PI / 2, -Math.PI,
            -Math.PI, Math.PI / 2,
            Math.PI / 2, Math.PI
          ])
        const clip = new THREE.AnimationClip('test', 120, [posKF, rotation1])
        // 包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
        const mixer = new THREE.AnimationMixer(cloneBelt)
        // AnimationMixer的`.clipAction()`返回一个AnimationAction对象
        const clipAction = mixer.clipAction(clip)
        // .play()控制动画播放，默认循环播放
        clipAction.play()
        this.agvList.push(mixer)
        clipAction.loop = THREE.LoopOnce
        clipAction.clampWhenFinished = true
        sence.add(cloneBelt)
        mixer.addEventListener('finished', () => {
          this.scene.remove(cloneBelt) // Remove the model from the scene
          mixer.removeEventListener('finished', this.createAgv)
          this.createTwoFloorAgv(sence)
        })
      })
    },
    createTwoFloorAgv(sence) {
      loader('static/3d/oneModel/AGV.glb').then(obj => {
        const cloneBelt = obj.clone()
        // cloneBelt.position.set(-550, -12, 55)
        cloneBelt.scale.set(0.35, 0.35, 0.35)

        cloneBelt.name = 'Box'
        // 给名为Box的模型对象的设置关键帧数据KeyframeTrack
        const times = [0, 2, 40, 42, 47, 52, 57, 60, 70, 73, 76, 79, 82, 90, 92, 94, 96, 98, 100, 103,
          105, 107, 109, 111, 119, 130, 132, 134, 136, 138, 141, 143, 145, 147, 150, 158, 172, 178, 180, 218, 220] // 时间轴上，设置三个时刻0、3、6秒
        // times中三个不同时间点，物体分别对应values中的三个xyz坐标
        const values = [
          -680, 70, 180, // 电梯
          -680, 70, 160, // 出电梯右转点-2s
          565, 70, 160, // 40s
          565, 70, 125, // 物料区门口-42s
          645, 70, 125, // 47s
          645, 70, 80, // 4夾熟料停留-52s
          645, 70, 125, // 4夾熟料返回-57s
          690, 70, 125, // 过道-60s
          690, 70, -10, // 到达4夾点 -70s
          645, 70, -10, // 4夾-73s
          645, 70, 30, // 4夾停留-76s
          645, 70, -10, // 返回-79s
          600, 70, -10, // 4夾尽头-82s
          690, 70, -10, // 4夾返回-90s
          690, 70, -40, // 3夾-92s
          668, 70, -40, // 3夾-94s
          668, 70, -50, // 3夾中间-96s
          668, 70, -50, // 3夾中间停留3秒-98s
          668, 70, -40, // 3夾中间返回-100s
          616, 70, -40, // 2夾-103s
          616, 70, -50, // 2夾中间-105s
          616, 70, -50, // 2夾中间停留3秒-107s
          616, 70, -40, // 2夾中间返回-109s
          600, 70, -40, // 2夾尽头 -111s
          690, 70, -40, // 2夾，3夾返回-119s
          690, 70, -160, // 最后2夾，3夾-130s
          668, 70, -160, // 3夾-132s
          668, 70, -150, // 3夾中间-134s
          668, 70, -150, // 3夾中间停留3秒-136s
          668, 70, -160, // 3夾中间返回-138s
          616, 70, -160, // 2夾-141s
          616, 70, -150, // 2夾中间-143s
          616, 70, -150, // 2夾中间停留3秒-145s
          616, 70, -160, // 2夾中间返回-147s
          600, 70, -160, // 2夾尽头 -150s
          690, 70, -160, // 2夾，3夾返回-158s
          690, 70, 125, // 返回电梯路线过道-172s
          565, 70, 125, // 返回电梯路线过道-178s
          565, 70, 160, // 180s
          -680, 70, 160, // 218
          -680, 70, 180 // 220
        ]
        const posKF = new THREE.KeyframeTrack('Box.position', times, values)
        const rotation1 = new THREE.KeyframeTrack('Box.rotation[y]', [2, 2.1, 40, 40.1, 42, 42.1, 47, 47.1, 52, 52.1, 57, 57.1, 60, 60.1, 70, 70.173, 73, 73.1, 76, 76.1,
          79, 79.1, 82, 82.1, 90, 90.1, 92, 92.1, 94, 94.1, 98, 98.1, 100, 100.1, 103, 103.1, 107, 107.1, 109, 109.1, 111, 111.1,
          119, 119.1, 130, 130.1, 132, 132.1, 136, 136.1, 138, 138.1, 141, 141.1, 147, 147.1, 150, 150.1, 158, 158.1, 172, 172.1, 178, 178.1, 180, 180.1, 218, 218.1], [
          0, -Math.PI / 2,
          -Math.PI / 2, 0,
          0, -Math.PI / 2,
          -Math.PI / 2, 0,
          0, -Math.PI,
          -Math.PI, -Math.PI / 2,
          -Math.PI / 2, 0, // 60
          0, Math.PI / 2, // 70
          Math.PI / 2, -Math.PI, // 73
          -Math.PI, 0,
          0, Math.PI / 2,
          Math.PI / 2, -Math.PI / 2,
          -Math.PI / 2, 0,
          0, Math.PI / 2,
          Math.PI / 2, 0, // 94  3夾中间
          0, -Math.PI,
          -Math.PI, Math.PI / 2,
          Math.PI / 2, 0, // 103
          0, -Math.PI,
          -Math.PI, Math.PI / 2, // 109
          Math.PI / 2, -Math.PI / 2,
          -Math.PI / 2, 0,
          0, Math.PI / 2,
          Math.PI / 2, -Math.PI, // 132
          -Math.PI, 0,
          0, Math.PI / 2,
          Math.PI / 2, -Math.PI, // 141
          -Math.PI, Math.PI / 2, // 147
          Math.PI / 2, -Math.PI / 2,
          -Math.PI / 2, -Math.PI,
          -Math.PI, Math.PI / 2,
          Math.PI / 2, -Math.PI,
          -Math.PI, Math.PI / 2, // 180
          Math.PI / 2, -Math.PI
        ])
        const clip = new THREE.AnimationClip('test', 220, [posKF, rotation1])
        // 包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
        const mixer = new THREE.AnimationMixer(cloneBelt)
        // AnimationMixer的`.clipAction()`返回一个AnimationAction对象
        const clipAction = mixer.clipAction(clip)
        // .play()控制动画播放，默认循环播放
        clipAction.play()
        this.animationList.push(mixer)
        clipAction.loop = THREE.LoopOnce
        clipAction.clampWhenFinished = true
        sence.add(cloneBelt)
        mixer.addEventListener('finished', () => {
          this.scene.remove(cloneBelt) // Remove the model from the scene
          mixer.removeEventListener('finished', this.createTwoFloorAgv)
          this.createFIveAgv(sence)
        })
      })
    },
    createFIveAgv(sence) {
      loader('static/3d/oneModel/AGV.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.scale.set(0.3, 0.3, 0.3)

        cloneBelt.name = 'Box'
        const times = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 53, 55, 60, 65] // 时间轴上，设置三个时刻0、3、6秒
        const values = [
          -680, 590, 190,
          -680, 590, 143,
          -727, 590, 143,
          -727, 590, -106,
          -414, 590, -106,
          -414, 590, -190,
          -414, 590, -106,
          -41, 590, -106,
          -41, 590, -190,
          -41, 590, -106,
          -727, 590, -106,
          -727, 590, 143,
          -680, 590, 143,
          -680, 590, 190
        ]
        // 创建关键帧，把模型位置和时间对应起来
        const posKF = new THREE.KeyframeTrack('Box.position', times, values)
        const rotation1 = new THREE.KeyframeTrack('Box.rotation[y]', [5, 5.1, 10, 10.1,
          15, 15.1, 20, 20.1, 25, 25.1, 30, 30.1, 35, 35.1, 40, 40.1, 45, 45.1, 53, 53.1, 55, 55.1, 60, 60.1],
          [0, Math.PI / 2,
            Math.PI / 2, 0,
            0, -Math.PI / 2,
            -Math.PI / 2, 0,
            0, -Math.PI,
            -Math.PI, -Math.PI / 2,
            -Math.PI / 2, 0,
            0, -Math.PI,
            -Math.PI, Math.PI / 2,
            Math.PI / 2, -Math.PI,
            -Math.PI, -Math.PI / 2,
            -Math.PI / 2, -Math.PI
          ])
        const clip = new THREE.AnimationClip('test', 65, [posKF, rotation1])
        // 包含关键帧动画的模型对象作为AnimationMixer的参数创建一个播放器mixer
        const mixer = new THREE.AnimationMixer(cloneBelt)
        // AnimationMixer的`.clipAction()`返回一个AnimationAction对象
        const clipAction = mixer.clipAction(clip)
        // .play()控制动画播放，默认循环播放
        clipAction.play()
        clipAction.loop = THREE.LoopOnce
        this.agvList.push(mixer)
        sence.add(cloneBelt)
        mixer.addEventListener('finished', () => {
          this.scene.remove(cloneBelt) // Remove the model from the scene
          mixer.removeEventListener('finished', this.createFIveAgv)
          this.createAgv(sence)
        })
      })
    },
    createPolishin(sence) {
      loader('static/3d/oneModel/polishin.glb').then(obj => {
        polishinList.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          sence.add(cloneBelt)
        })
      })
    },
    createPlatform(sence) {
      loader('static/3d/oneModel/platformOne.glb').then(obj => {
        platformList.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          sence.add(cloneBelt)
        })
      })
    },
    createPlatformTwo(sence) {
      loader('static/3d/oneModel/platformTwo.glb').then(obj => {
        platformTwoList.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = (90 * Math.PI) / 180
          sence.add(cloneBelt)
        })
      })
    },
    createRepair(scene) {
      return new Promise((resolve, reject) => {
        loader('static/3d/oneModel/moldRepair.glb')
          .then(obj => {
            moldRepair.forEach(item => {
              const { x, y, z } = item
              const cloneBelt = obj.clone()
              cloneBelt.position.set(x, y, z)
              cloneBelt.scale.set(0.3, 0.3, 0.3)
              cloneBelt.rotation.y = (90 * Math.PI) / 180
              scene.add(cloneBelt)
            })
            resolve() // 确保在加载完成后解决Promise
          })
          .catch(error => {
            reject(error) // 如果加载过程中出现错误，拒绝Promise并传递错误对象
          })
      })
    },

    createTransmission(sence) {
      loader('static/3d/transmission.glb').then(belt => {
        beltList3.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(20, 30, 26)
          cloneBelt.rotation.y = -(90 * Math.PI) / 180
          sence.add(cloneBelt)
        })
      })
    },
    createPress(sence) {
      loader('static/3d/oneModel/pressTwo.glb').then(obj => {
        pressTwo.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          sence.add(cloneBelt)
        })
      })
    },
    createPressOne(sence) {
      loader('static/3d/oneModel/pressOne.glb').then(obj => {
        pressOne.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          if (index >= 3) {
            cloneBelt.rotation.y = -(90 * Math.PI) / 90
          }
          sence.add(cloneBelt)
        })
      })
    },
    createRobot(sence) {
      loader('static/3d/oneModel/robot.glb').then(obj => {
        robot.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 180
          if (index >= 6) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = (90 * Math.PI) / 180
          }
          sence.add(cloneBelt)
        })
      })
    },
    createFeeding(sence) {
      loader('static/3d/oneModel/feeding.glb').then(obj => {
        feeding.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          sence.add(cloneBelt)
        })
      })
    },
    createPressTwo2(sence) {
      loader('static/3d/oneModel/pressThree.glb').then(obj => {
        pressThree.forEach((item, index) => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          cloneBelt.rotation.y = -(90 * Math.PI) / 90
          if (index >= 1) {
            // 反转 X 轴旋转
            cloneBelt.rotation.y = (90 * Math.PI)
          }
          sence.add(cloneBelt)
        })
      })
    },
    createPressTwo3(sence) {
      loader('static/3d/oneModel/pressTwo.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(510, -200, 55)
        cloneBelt.scale.set(30, 30, 30)
        sence.add(cloneBelt)
      })
    },
    createFence(sence) {
      loader('static/3d/oneModel/fence.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(0, -200, 0)
        cloneBelt.scale.set(0.3, 0.3, 0.3)
        sence.add(cloneBelt)
      })
    },
    createMachine(sence) {
      loader('static/3d/machineOne.glb').then(belt => {
        beltList6.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(25, 20, 28)
          cloneBelt.rotation.y = -(90 * Math.PI) / 180
          sence.add(cloneBelt)
        })
      })
    },
    createMachineTwo(sence) {
      loader('static/3d/machineTwo.glb').then(belt => {
        beltList9.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(25, 20, 28)
          cloneBelt.rotation.y = -(90 * Math.PI) / 180
          sence.add(cloneBelt)
        })
      })
    },
    createCleanArea(sence) {
      loader('static/3d/oneModel/cleanArea.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(68, -200, -20)
        cloneBelt.scale.set(0.3, 0.3, 0.3)
        sence.add(cloneBelt)
      })
    },
    createClearLine(sence) {
      loader('static/3d/oneModel/clearLine.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(240, -200, 0)
        cloneBelt.scale.set(0.3, 0.3, 0.3)
        sence.add(cloneBelt)
      })
    },
    createCleanMachine(sence) {
      loader('static/3d/oneModel/cleanMachine.glb').then(obj => {
        cleanMachine.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          sence.add(cloneBelt)
        })
      })
    },
    createTranserBelt(sence) {
      loader('static/3d/oneModel/transerBelt.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(332, -200, -20)
        cloneBelt.scale.set(0.3, 0.3, 0.3)
        sence.add(cloneBelt)
      })
    },
    createWorkspace(sence) {
      loader('static/3d/oneModel/workspace.glb').then(obj => {
        workspace.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = obj.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(30, 30, 30)
          sence.add(cloneBelt)
        })
      })
    },
    createBasic(sence) {
      loader('static/3d/oneModel/oneWall.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 + 200 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
      loader('static/3d/oneModel/text.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 30 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 + 200 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 - 28 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
      loader('static/3d/oneModel/line.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x // 模型长度
        const mdwid = box.max.z - box.min.z // 模型宽度
        const mdhei = 20 // 模型高度
        const x1 = box.min.x + mdlen / 2 - 124 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 + 200 // 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 42 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
      // loader('static/3d/oneModel/oneLift.glb').then(async gltf => {
      //   // 放大盒模型
      //   gltf.scale.set(0.3, 0.3, 0.3)
      //   const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
      //   const mdhei = 20 // 模型高度
      //   const y1 = box.min.y + mdhei / 2 // 模型中心点坐标Y
      //   gltf.position.set(-700, -y1, 180) // 将模型进行偏移
      //   sence.add(gltf)
      // })
    },
    // 电梯
    createElevator(sence) {
      loader('static/3d/twoLift.glb').then(obj => {
        const cloneBelt = obj.clone()
        cloneBelt.position.set(3, -200, -6)
        cloneBelt.scale.set(0.3, 0.3, 0.3)
        sence.add(cloneBelt)
      })
    },
    // 2楼
    // cnc背面
    createTwoFloorRepair(sence) {
      loaderAnimation('static/3d/second/cnc.glb').then(gltf => {
        const belt = gltf.scene
        secondFloorCncBack.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = (90 * Math.PI) / 90

          // const animations = gltf.animations[0]// animations
          // const mixer = new THREE.AnimationMixer(cloneBelt)
          // mixer.timeScale = 0.5
          // mixer.clipAction(animations).loop = THREE.LoopPingPong
          // mixer.clipAction(animations).play()
          // this.animationList.push(mixer)

          sence.add(cloneBelt)
        })
      })
      // cnc 正面
      loaderAnimation('static/3d/second/cnc.glb').then(gltf => {
        const belt = gltf.scene
        secondFloorCncFront.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.3)
          cloneBelt.rotation.y = -(90 * Math.PI) / 1

          // const animations = gltf.animations[0]// animations
          // const mixer = new THREE.AnimationMixer(cloneBelt)
          // mixer.timeScale = 0.5
          // mixer.clipAction(animations).loop = THREE.LoopPingPong
          // mixer.clipAction(animations).play()
          // this.animationList.push(mixer)

          sence.add(cloneBelt)
        })
      })
      // cnc右边
      loaderAnimation('static/3d/second/cncRight.glb').then(gltf => {
        const belt = gltf.scene
        secondFloorCncRight.forEach(item => {
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
    createTwoFloorTransmission(sence) {
      loader('static/3d/second/workbench.glb').then(belt => {
        secondFloorTransmission.forEach(item => {
          const { x, y, z } = item
          const cloneBelt = belt.clone()
          cloneBelt.position.set(x, y, z)
          cloneBelt.scale.set(0.3, 0.3, 0.33)
          cloneBelt.rotation.y = -(90 * Math.PI) / 1
          sence.add(cloneBelt)
        })
      })
    },
    createTwoFloorBasic(sence) {
      // 外壳
      loader('static/3d/second/wall.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 90 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 90// 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 90// 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 90 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 90 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 90// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 5 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        gltf.rotation.y = -(90 * Math.PI) / 1
        sence.add(gltf)
      })
    },

    // 4楼
    createFourFloorBelt(sence) {
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
    createFourFloorCncReverse(sence) {
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
    createFourFloorLeftCnc(sence) {
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
    createFourFloorRightCnc(sence) {
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
    createFourFloorMarking(sence) {
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
    createFourFloorMachine(sence) {
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
    createFourFloorWorkbench(sence) {
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
    createFourFloorRobot(sence) {
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
    createFourFloorStone(sence) {
      // 外壳
      loader('static/3d/fourModel/stone.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-5, 359, -23)
        sence.add(gltf)
      })
    },
    createFourFloorAssurance(sence) {
      // 外壳
      loader('static/3d/fourModel/assurance.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-10, 359, -23) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    createFourFloorGuardrail(sence) {
      // 外壳
      loader('static/3d/fourModel/guardrail.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        gltf.position.set(-5, 359, -20) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    createFourFloorBasic(sence) {
      // 外壳
      loader('static/3d/fourModel/wallFour.glb').then(async gltf => {
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 359 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 359 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 359// 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 359 // 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 359// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 + 13// 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        // gltf.rotation.y = -(90 * Math.PI) / 180
        sence.add(gltf)
      })
    },

    // 5楼
    createFiveFloorBasic(sence) {
      loader('static/3d/fiveModel/fiveWall.glb').then(async gltf => {
        // 放大盒模型
        gltf.scale.set(0.3, 0.3, 0.3)
        const box = new THREE.Box3().setFromObject(gltf) // 获取模型的包围盒
        const mdlen = box.max.x - box.min.x + 10 // 模型长度
        const mdwid = box.max.z - box.min.z + 10 // 模型宽度
        const mdhei = box.max.y - box.min.y + 10 // 模型高度
        const x1 = box.min.x + mdlen / 2 // 模型中心点坐标X
        const y1 = box.min.y + mdhei / 2 - 608// 模型中心点坐标Y
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
        const y1 = box.min.y + mdhei / 2 - 608// 模型中心点坐标Y
        const z1 = box.min.z + mdwid / 2 // 模型中心点坐标Z
        gltf.position.set(-x1, -y1, -z1) // 将模型进行偏移
        sence.add(gltf)
      })
    },
    createLoadingService() {
      return new Promise((resolve, reject) => {
        this.loadingService = Loading.service({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          customClass: 'loading-data',
          onSuccess: resolve,
          onError: reject
        })
      })
    },
    async createWebGL() {
      this.renderer = null
      this.scene = null
      this.camera = null
      const el = document.getElementById('3d_layout')
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
      this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 5000)
      // this.camera.position.set(0, 1700, 1400)
      this.camera.position.set(0, 1000, 1600)
      // this.camera.position.set(0, 1200, 500)

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

      // Group
      this.floor = new THREE.Group()
      const elevatorFloor = new THREE.Group()
      const oneFloorGroup = new THREE.Group()
      const twoFloorGroup = new THREE.Group()
      const fourFloorGroup = new THREE.Group()
      const fiveFloorGroup = new THREE.Group()
      this.createElevatorFloor(elevatorFloor)
      this.creadedOne(oneFloorGroup)
      this.createdTwo(twoFloorGroup)
      this.createdFour(fourFloorGroup)
      this.createdFive(fiveFloorGroup)
      elevatorFloor.name = 'elevatorFloor'
      oneFloorGroup.name = 'oneFloor'
      twoFloorGroup.name = 'twoFloor'
      fourFloorGroup.name = 'fourFloor'
      fiveFloorGroup.name = 'fiveFloor'

      this.floor.add(oneFloorGroup, twoFloorGroup, fourFloorGroup, fiveFloorGroup, elevatorFloor)
      // this.floor.add(oneFloorGroup)

      this.scene.add(this.floor)
      // // AGV路线
      // this.createAgv(this.scene)

      // this.createFIveAgv(this.scene)
      // this.createLoadingService()
      const loaderList = this.modelList.map((item) => loader(`static/3d/oneModel/${item.fileName}.glb`))
      console.log(loaderList)
      Promise.all(loaderList)
        .then((res) => {
          res.forEach((objs, index) => {

          })
          console.log(res)
        })
        .finally(() => {
          // this.createAgv(this.scene)
        })
      // 控制器
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.update()
      const render = () => {
        this.rafId = window.requestAnimationFrame(render)
        this.orbitControls.update()
        this.renderer.render(this.scene, this.camera)
        TWEEN.update()
        // 播放动画
        const animationTime = this.clock.getDelta()
        if (this.animationList.length > 0) {
          this.animationList.forEach(mixerr => {
            mixerr.update(animationTime)
          })
        }
        if (this.agvList.length > 0) {
          this.agvList.forEach(mixerr => {
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
    // 电梯
    createElevatorFloor(scene) {
      this.createElevator(scene)
    },
    // 一楼
    creadedOne(scene) {
      this.createBasic(scene)
      this.createPolishin(scene)
      this.createPlatform(scene)
      this.createPlatformTwo(scene)
      this.createRepair(scene)
      this.createPress(scene)
      this.createFence(scene)
      this.createCleanArea(scene)
      this.createClearLine(scene)
      this.createWorkspace(scene)
      this.createTranserBelt(scene)
      this.createCleanMachine(scene)
      this.createPressOne(scene)
      this.createRobot(scene)
      this.createFeeding(scene)
      this.createPressTwo2(scene)
      this.createPressTwo3(scene)
    },
    // 五楼
    createdFive(scene) {
      this.createFiveFloorBasic(scene)
    },
    // 四楼
    createdFour(scene) {
      this.createFourFloorBelt(scene)
      this.createFourFloorCncReverse(scene)
      this.createFourFloorLeftCnc(scene)
      this.createFourFloorRightCnc(scene)
      this.createFourFloorMarking(scene)
      this.createFourFloorMachine(scene)
      this.createFourFloorWorkbench(scene)
      this.createFourFloorRobot(scene)
      this.createFourFloorStone(scene)
      this.createFourFloorAssurance(scene)
      this.createFourFloorGuardrail(scene)
      this.createFourFloorBasic(scene)
    },
    // 二楼
    createdTwo(scene) {
      this.createTwoFloorBasic(scene)
      this.createTwoFloorRepair(scene)
      this.createTwoFloorTransmission(scene)
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

.lock {
  pointer-events: none;
}

#loading-bar-container {
  width: 100%;
  background: #ccc;
  position: fixed;
  top: 50%;
  left: 0;
}

#loading-bar {
  height: 20px;
  width: 0;
  background: #4caf50;
}
</style>
