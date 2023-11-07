<template>
  <div class="home-container">
    <div class="home-header">
      <h3 class="page-title">智能制造可视化中控台</h3>
    </div>
    <div class="home-content">
      <div class="home-content-left flex-column">
        <div class="ability-wrap">
          <div class="content-title one">车间产能分析</div>
          <div class="content-content">
            <div class="ability-data">
              <div class="ability-data-item">
                <p class="ability-data-item_label">计划数量</p>
                <p class="ability-data-item_value">1800</p>
              </div>
              <div class="ability-data-item">
                <p class="ability-data-item_label">实际数量</p>
                <p class="ability-data-item_value">1710</p>
              </div>
              <div class="ability-data-item">
                <p class="ability-data-item_label">实时差异</p>
                <p class="ability-data-item_value primary">-90</p>
              </div>
              <div class="ability-data-item">
                <p class="ability-data-item_label">达成率</p>
                <p class="ability-data-item_value success">95%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="qlty-wrap flex-column">
          <div class="content-title two">车间品质分析</div>
          <div class="content-content qlty-content flex-column">
            <div class="qlty-top flex-row">
              <ul class="qlty-data">
                <li class="qlty-data-item">
                  <div class="qlty-data-item_icon">
                    <img class="img-responsive" src="../../assets/images/qlty_blp.png" />
                  </div>
                  <div class="qlty-data-item_wrap">
                    <p class="value primary">0050</p>
                    <p class="label">不良品数量</p>
                  </div>
                </li>
                <li class="qlty-data-item">
                  <div class="qlty-data-item_icon">
                    <img class="img-responsive" src="../../assets/images/qlty_lp.png" />
                  </div>
                  <div class="qlty-data-item_wrap">
                    <p class="value success">1660</p>
                    <p class="label">良品数量</p>
                  </div>
                </li>
              </ul>
              <div class="qlty-rate">
                <QltyChart :value="97" />
              </div>
            </div>
            <ul class="qlty-poor-wrap flex-column">
              <li class="qlty-poor-item" v-for="(item, index) in poorList" :key="index">
                <div class="bad-item-data">
                  <div class="data-label">
                    <span class="top">TOP{{ index + 1 }}</span>
                    <span class="text">{{ item.name }}</span>
                  </div>
                  <p class="data-value">
                    <span class="value">{{ item.rate }}</span>
                    <span class="uom">%</span>
                  </p>
                </div>
                <div class="bad-item-progress">
                  <p class="progress_content" :style="{ width: `${item.rate}%` }"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="shipment-wrap">
          <div class="content-title one">成品出货分析</div>
          <div class="shipment-content">
            <div class="shipment-chart flex-column">
              <div class="shipment-chart-data flex-column">
                <div class="data-value">
                  <span class="value">{{ shipmentObj.rate }}</span>
                  <span class="uom">%</span>
                </div>
                <p class="data-label">出货率</p>
                <div class="fireworks-wrap left">
                  <div class="fireworks-wrap-item"></div>
                  <div class="fireworks-wrap-item"></div>
                  <div class="fireworks-wrap-item"></div>
                </div>
                <div class="fireworks-wrap right">
                  <div class="fireworks-wrap-item"></div>
                  <div class="fireworks-wrap-item"></div>
                  <div class="fireworks-wrap-item"></div>
                </div>
              </div>
              <div class="shipment-chart-progress">
                <div class="progress-tick flex-row">
                  <span>0</span>
                  <span>100</span>
                </div>
                <div class="progress-wrap">
                  <p class="progress-content" :style="{ width: `${shipmentObj.rate}%` }"></p>
                </div>
              </div>
            </div>
            <ul class="shipment-data">
              <li class="shipment-data-item">
                <div class="shipment-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/shipment_plan.png" />
                </div>
                <div class="shipment-data-item_wrap">
                  <p class="value primary">{{ shipmentObj.plan }}</p>
                  <p class="label">当日计划出货</p>
                </div>
              </li>
              <li class="shipment-data-item">
                <div class="shipment-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/shipment_actual.png" />
                </div>
                <div class="shipment-data-item_wrap">
                  <p class="value success">{{ shipmentObj.actual }}</p>
                  <p class="label">当日实际出货</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-right flex-column">
        <div class="eqp-wrap">
          <h3 class="content-title three">设备监控</h3>
          <ul class="eqp-content">
            <li class="eqp-item">
              <p class="eqp-item-label success">运行</p>
              <p class="eqp-item-value">80</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label warnig">待机</p>
              <p class="eqp-item-value">10</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label danger">故障</p>
              <p class="eqp-item-value-danger">3</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label info">停机</p>
              <p class="eqp-item-value">7</p>
            </li>
          </ul>
        </div>
        <div class="eqp-wrap">
          <h3 class="content-title three">AGV监控</h3>
          <ul class="eqp-content">
            <li class="eqp-item">
              <p class="eqp-item-label success">运行</p>
              <p class="eqp-item-value">2</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label warnig">待机</p>
              <p class="eqp-item-value">0</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label danger">故障</p>
              <p class="eqp-item-value-danger">0</p>
            </li>
            <li class="eqp-item">
              <p class="eqp-item-label info">停机</p>
              <p class="eqp-item-value">0</p>
            </li>
          </ul>
        </div>
        <div class="human-wrap">
          <h3 class="content-title one">当日人力分析</h3>
          <div class="human-content">
            <ul class="human-data">
              <li class="human-data-item">
                <div class="human-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/manpower_yzg.png" />
                </div>
                <div class="human-data-item_wrap">
                  <p class="value primary">1700</p>
                  <p class="label">应在岗人数</p>
                </div>
              </li>
              <li class="human-data-item">
                <div class="human-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/manpower_zg.png" />
                </div>
                <div class="human-data-item_wrap">
                  <p class="value success">1683</p>
                  <p class="label">在岗人数</p>
                </div>
              </li>
            </ul>
            <div class="human-chart">
              <HumanChart :value="99" />
            </div>
          </div>
        </div>
        <div class="energy-wrap flex-column">
          <h3 class="content-title one">能源分析</h3>
          <div class="energy-content flex-column">
            <ul class="energy-data flex-row">
              <li class="energy-data-item">
                <div class="energy-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/energy_1.png" />
                </div>
                <div class="energy-data-item_wrap">
                  <p class="value primary">987</p>
                  <p class="label">
                    <span>当月电量</span>
                    <sub>KW·h</sub>
                  </p>
                </div>
              </li>
              <li class="energy-data-item">
                <div class="energy-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/energy_2.png" />
                </div>
                <div class="energy-data-item_wrap">
                  <p class="value success">78</p>
                  <p class="label">
                    <span>当月水量</span>
                    <sub>t</sub>
                  </p>
                </div>
              </li>
              <li class="energy-data-item">
                <div class="energy-data-item_icon">
                  <img class="img-responsive" src="../../assets/images/energy_3.png" />
                </div>
                <div class="energy-data-item_wrap">
                  <p class="value primary">156</p>
                  <p class="label">
                    <span>当月气量</span>
                    <sub>m³</sub>
                  </p>
                </div>
              </li>
            </ul>
            <div class="energy-chart">
              <EsChart />
            </div>
          </div>
        </div>
      </div>
      <div class="rate-chart-wrap">
        <div class="kpi-chart-item" v-for="(rate, index) in rateList" :key="index">
          <RateChart :label="rate.label" :value="rate.value" />
        </div>
      </div>
      <div class="model-content">

        <three ref="webgl" />
        <div class="bulding-3d-handle">
          <div class="handle-btn reset-btn">
            <span v-for="(item, index) in floorlist" :key="index" @click="isFloorView(item.index)"
              :class="activeClass(item.index)">{{ item.floor }}</span>
            <span @click="viewLock">{{ lock ? '解锁' : '锁定' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QltyChart from './components/QltyChart'
import RateChart from './components/RateChart'
import HumanChart from './components/HumanChart'
import EsChart from './components/EsChart'
import three from './components/three'
export default {
  data() {
    return {
      poorList: [
        { name: '显示不良', rate: 40 },
        { name: '外观不良', rate: 30 },
        { name: 'G线缺陷', rate: 24 },
        { name: 'LC内异物', rate: 16 },
        { name: 'LL漏光', rate: 10 }
      ],
      shipmentObj: {
        plan: 2000,
        actual: 1900,
        rate: 95
      },
      rateList: [
        { label: '运行率', value: 98 },
        { label: '故障率', value: 33 },
        { label: '时间稼动率', value: 33 },
        { label: '性能稼动率', value: 100 },
        { label: '良率', value: 98 },
        { label: '设备OEE', value: 98 }
      ],
      floorlist: [
        { index: 5, floor: '整体楼层' },
        { index: 0, floor: '一楼' },
        { index: 1, floor: '二楼' },
        { index: 2, floor: '四楼' },
        { index: 3, floor: '五楼' }
      ],
      activeFloor: 5,
      lock: false
    }
  },
  methods: {
    isFloorView(index) {
      this.activeFloor = index
      this.$refs.webgl.isFloorView(index)
    },
    activeClass(value) {
      return this.activeFloor === value ? 'floor_active' : ''
    },
    viewLock() {
      this.lock = !this.lock
      this.$refs.webgl.viewLock()
    }
  },
  created() {

  },
  components: {
    QltyChart,
    RateChart,
    HumanChart,
    EsChart,
    three
  }
}
</script>

<style lang="scss" scoped>
$side-wdith: 21vw;

$bottom: 7vh;

.home-container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: url(../../assets/images/bg-inner.png) no-repeat center;
  background-size: cover;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: url(../../assets/images/bg-out.png) no-repeat center;
    background-size: 100% 100%;
    z-index: 1;
  }

  .home-header,
  .home-content {
    position: relative;
    z-index: 2;
  }

  .buliding-3d-content {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
  }

  .home-header {
    height: 7.96vh;

    .page-title {
      text-align: center;
      color: #fff;
      font-size: 1.4vw;
      font-weight: bold;
      letter-spacing: 0.15vw;
      padding-top: 3.5vh;
    }
  }

  .home-content {
    position: absolute;
    top: 7.96vh;
    left: 1vw;
    right: 1vw;
    bottom: $bottom;
    overflow: hidden;

    .content-title {
      font-weight: bold;
      font-style: italic;
      color: #ffffff;
      font-size: 0.93vw;
      letter-spacing: 2px;
      padding: 1vh 0 1vh 1vw;

      &.one {
        background: url(../../assets/images/title-bg-1.png) no-repeat;
        background-size: 90% auto;
        background-position-x: -0.9vw;
        background-position-y: 0.4vh;
        padding-left: 1.7vw;
      }

      &.two {
        background: url(../../assets/images/title-bg-2.png) no-repeat;
        background-size: 90% auto;
        background-position-x: -0.4vw;
        background-position-y: 0.5vh;
        padding-left: 1.7vw;
      }

      &.three {
        background: url(../../assets/images/title-bg-3.png) no-repeat;
        background-size: 100% auto;
        padding-left: 1.5vw;
      }
    }

    .home-content-left {
      position: absolute;
      left: 0;
      top: -1vh;
      bottom: 0;
      width: $side-wdith;
      padding-left: 1vw;
      z-index: 10;

      .ability-wrap {
        .content-content {
          padding: 2vh 0;

          .ability-data {
            display: flex;
            padding: 1vh 0;
            background: url(../../assets/images/ability_bg.png) no-repeat center;
            background-size: 100% 100%;

            .ability-data-item {
              flex: 1;
              text-align: center;

              .ability-data-item_label {
                font-size: 0.73vw;
                font-weight: 400;
                font-style: italic;
                color: #c0f4ff;
                padding-bottom: 1.5vh;
              }

              .ability-data-item_value {
                font-family: Fontquan-XinYiGuanHeiTi-Regular;
                font-size: 1.05vw;
                font-weight: 400;
                font-style: italic;
                color: #ffffff;

                &.primary {
                  color: #217efd;
                }

                &.success {
                  color: #6bfaac;
                }
              }
            }
          }
        }
      }

      .qlty-wrap {
        flex: 1;

        .qlty-content {
          flex: 1;

          .qlty-top {
            .qlty-data {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;

              .qlty-data-item {
                display: flex;
                padding: 1vh 1vw;

                .qlty-data-item_icon {
                  width: 3vw;
                  margin-right: 0.8vw;
                }

                .qlty-data-item_wrap {
                  .value {
                    font-family: Fontquan-XinYiGuanHeiTi-Regular;
                    font-size: 1.05vw;
                    font-weight: 400;
                    font-style: italic;
                    color: #ffffff;
                    padding-bottom: 0.5vh;
                    padding-left: 0.5vw;

                    &.primary {
                      background: linear-gradient(0deg,
                          #63b0ff 30.2001953125%,
                          #fdfeff 100%);
                      background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }

                    &.success {
                      background: linear-gradient(0deg,
                          #4acd9a 30.2001953125%,
                          #fdfeff 100%);
                      background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                  }

                  .label {
                    font-size: 0.68vw;
                    font-weight: 400;
                    font-style: italic;
                    color: #e7fbff;
                  }
                }
              }
            }

            .qlty-rate {
              width: 50%;
              height: 16vh;
              position: relative;

              &::before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background: url(../../assets/images/qlty_chart.png) no-repeat center;
                background-size: auto 75%;
              }
            }
          }

          .qlty-poor-wrap {
            flex: 1;
            width: 90%;
            margin: 0 auto;

            .qlty-poor-item {
              flex: 1;

              .bad-item-data {
                display: flex;
                justify-content: space-between;
                padding-bottom: 1vh;

                .data-label {
                  display: flex;
                  font-family: Microsoft YaHei;
                  align-items: center;

                  .top {
                    display: flex;
                    font-size: 0.78vw;
                    font-weight: 400;
                    font-style: italic;
                    color: #dbf6fb;
                    align-items: center;
                    padding-right: 0.5vw;

                    &::before {
                      content: "";
                      display: block;
                      margin-right: 0.3vw;
                      width: 0.2vw;
                      height: 0.2vw;
                      border-radius: 50%;
                      background-color: #7ccef8;
                      box-shadow: 0 0 8px 1px #7ccef8;
                    }
                  }

                  .text {
                    font-size: 0.78vw;
                    font-weight: 400;
                    font-style: italic;
                    color: #3794ff;
                    line-height: 15px;
                    background: linear-gradient(0deg,
                        #63b0ff 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }

                .data-value {
                  font-family: Fontquan-XinYiGuanHeiTi-Regular;
                  font-weight: 400;
                  font-style: italic;
                  color: #e6fbff;
                  letter-spacing: 3px;

                  .value {
                    font-size: 1.05vw;
                  }

                  .uom {
                    font-size: 0.78vw;
                  }
                }
              }

              .bad-item-progress {
                position: relative;
                height: 0.5vh;
                background-color: rgba(104, 240, 166, 0.13);

                .progress_content {
                  position: absolute;
                  display: block;
                  left: 0;
                  height: 100%;
                  background: linear-gradient(90deg,
                      rgba(104, 241, 166, 0) 0%,
                      #69f3a7 61%);
                }
              }
            }
          }
        }
      }

      .shipment-wrap {
        .shipment-content {
          display: flex;

          .shipment-chart {
            flex: 1;
            padding-left: 1vw;
            padding-right: 0.5vw;

            .shipment-chart-data {
              flex: 1;
              justify-content: center;
              align-items: center;
              background: url(../../assets/images/shipment_bg.png) no-repeat;
              background-size: 100% auto;
              background-position-y: bottom;
              position: relative;

              .data-value {
                font-size: 1.15vw;
                font-family: Fontquan-XinYiGuanHeiTi-Regular;
                font-weight: 400;
                color: #6bfaac;

                .uom {
                  font-size: 0.73vw;
                  padding-left: 0.15vw;
                }
              }

              .data-label {
                font-size: 0.68vw;
                font-weight: 400;
                font-style: italic;
                color: #dbf6fb;
                padding: 0.5vh 0 2.5vh;
              }

              .fireworks-wrap {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 50%;
                overflow: hidden;

                &.left {
                  left: 0.5vw;

                  .fireworks-wrap-item {
                    &:nth-child(1) {
                      bottom: 25%;
                      left: 5%;
                    }

                    &:nth-child(2) {
                      top: 20%;
                      left: 20%;
                    }

                    &:nth-child(3) {
                      bottom: 35%;
                      left: 35%;
                    }
                  }
                }

                &.right {
                  right: 0.5vw;

                  .fireworks-wrap-item {
                    &:nth-child(1) {
                      bottom: 25%;
                      right: 5%;
                    }

                    &:nth-child(2) {
                      top: 20%;
                      right: 15%;
                    }

                    &:nth-child(3) {
                      bottom: 35%;
                      right: 35%;
                    }
                  }
                }

                .fireworks-wrap-item {
                  width: 3px;
                  height: 25px;
                  border-radius: 1px;
                  position: absolute;

                  &:nth-child(1) {
                    background: linear-gradient(180deg,
                        #1086ec 0%,
                        rgba(16, 134, 236, 0) 100%);
                  }

                  &:nth-child(2) {
                    background: linear-gradient(180deg,
                        #00eeff 0%,
                        rgba(0, 238, 255, 0) 100%);
                  }

                  &:nth-child(3) {
                    background: linear-gradient(180deg,
                        #fff999 0%,
                        rgba(255, 249, 153, 0.01) 99%);
                  }
                }
              }
            }

            .shipment-chart-progress {
              padding-bottom: 2vh;

              .progress-tick {
                justify-content: space-between;
                font-size: 0.65vw;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #7297c0;
                padding-bottom: 0.5vh;

                span {
                  transform: scale(0.9);

                  &:last-child {
                    position: relative;
                    left: 0.25vw;
                  }
                }
              }

              .progress-wrap {
                position: relative;
                height: 0.5vh;
                background-color: rgba(104, 240, 166, 0.13);

                .progress-content {
                  position: absolute;
                  display: block;
                  left: 0;
                  height: 100%;
                  background: linear-gradient(90deg,
                      rgba(0, 255, 216, 0) 0%,
                      #00ffd8 61%);
                }
              }
            }
          }

          .shipment-data {
            padding: 1vh 0;

            .shipment-data-item {
              display: flex;
              padding: 1vh 1vw;
              align-items: center;

              .shipment-data-item_icon {
                width: 2.5vw;
                margin-right: 0.8vw;
              }

              .shipment-data-item_wrap {
                .value {
                  font-family: Fontquan-XinYiGuanHeiTi-Regular;
                  font-size: 1.05vw;
                  font-weight: 400;
                  font-style: italic;
                  color: #ffffff;
                  padding-bottom: 0.5vh;
                  padding-left: 0.5vw;

                  &.primary {
                    background: linear-gradient(0deg,
                        #63b0ff 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }

                  &.success {
                    background: linear-gradient(0deg,
                        #4acd9a 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }

                .label {
                  font-size: 0.68vw;
                  font-weight: 400;
                  font-style: italic;
                  color: #e7fbff;
                }
              }
            }
          }
        }
      }
    }

    .content-right {
      position: absolute;
      right: 1vw;
      top: -1vh;
      bottom: 0;
      width: $side-wdith;
      z-index: 10;

      .eqp-wrap {
        .eqp-content {
          display: flex;
          flex-wrap: nowrap;
          padding: 1.5vh 0;

          .eqp-item {
            flex: 1;
            text-align: center;

            .eqp-item-label {
              font-size: 0.73vw;
              font-family: Microsoft YaHei;
              font-weight: 400;
              font-style: italic;
              color: #c0f4ff;
              padding-bottom: 1vh;
              display: flex;
              align-items: center;
              justify-content: center;

              &::before {
                content: "";
                display: block;
                margin-right: 0.3vw;
                width: 0.26vw;
                height: 0.26vw;
                border-radius: 50%;
              }

              &.success {
                @keyframes scale {
                  0% {
                    transform: scale(1);
                  }

                  50%,
                  75% {
                    transform: scale(3);
                  }

                  78%,
                  100% {
                    opacity: 0.6;
                  }
                }

                &::before {
                  background-color: #00ff00;
                  box-shadow: 0 0 8px 1px #00ff00;
                  display: block;
                  border-radius: 50%;
                  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.00);
                  animation-delay: 200ms;
                }
              }

              &.warnig {
                &::before {
                  background-color: #f6ff00;
                  box-shadow: 0 0 8px 1px #f6ff00;
                  display: block;
                  border-radius: 50%;
                  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.00);
                  animation-delay: 200ms;
                }
              }

              &.danger {
                &::before {
                  background-color: #ff2400;
                  box-shadow: 0 0 8px 1px #ff2400;
                  display: block;
                  border-radius: 50%;
                  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.00);
                  animation-delay: 500ms;
                }
              }

              &.info {
                &::before {
                  background-color: #ebfffe;
                  box-shadow: 0 0 8px 1px #ebfffe;
                  display: block;
                  border-radius: 50%;
                  animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.00);
                  animation-delay: 200ms;
                }
              }
            }

            .eqp-item-value {
              font-size: 1.2vw;
              font-family: Fontquan-XinYiGuanHeiTi-Regular;
              font-weight: 400;
              font-style: italic;
              color: #e7fbff;
              line-height: 15px;
            }

            .eqp-item-value-danger {
              font-size: 1.2vw;
              font-family: Fontquan-XinYiGuanHeiTi-Regular;
              font-weight: 400;
              font-style: italic;
              color: #ff2400;
              line-height: 15px;
            }
          }
        }
      }

      .human-wrap {
        .human-content {
          display: flex;

          .human-data {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .human-data-item {
              display: flex;
              padding: 1vh 1vw;

              .human-data-item_icon {
                width: 3vw;
                margin-right: 0.8vw;
              }

              .human-data-item_wrap {
                .value {
                  font-family: Fontquan-XinYiGuanHeiTi-Regular;
                  font-size: 1.05vw;
                  font-weight: 400;
                  font-style: italic;
                  color: #ffffff;
                  padding-bottom: 0.5vh;
                  padding-left: 0.5vw;

                  &.primary {
                    background: linear-gradient(0deg,
                        #63b0ff 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }

                  &.success {
                    background: linear-gradient(0deg,
                        #4acd9a 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }

                .label {
                  font-size: 0.68vw;
                  font-weight: 400;
                  font-style: italic;
                  color: #e7fbff;
                }
              }
            }
          }

          .human-chart {
            width: 50%;
            height: 16vh;
            position: relative;

            &::before {
              content: "";
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: url(../../assets/images/manpower_chart.png) no-repeat center;
              background-size: auto 100%;
            }
          }
        }
      }

      .energy-wrap {
        flex: 1;
        display: flex;

        .energy-content {
          flex: 1;

          .energy-data {
            display: flex;
            padding: 2vh 0;

            .energy-data-item {
              flex: 1;
              display: flex;
              align-items: center;

              .energy-data-item_icon {
                width: 0.8vw;
                margin-right: 0.3vw;
              }

              .energy-data-item_wrap {
                .value {
                  font-family: Fontquan-XinYiGuanHeiTi-Regular;
                  font-size: 1.05vw;
                  font-weight: 400;
                  font-style: italic;
                  color: #ffffff;
                  padding-bottom: 0.5vh;
                  padding-left: 1vw;

                  &.primary {
                    background: linear-gradient(0deg,
                        #63b0ff 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }

                  &.success {
                    background: linear-gradient(0deg,
                        #4acd9a 30.2001953125%,
                        #fdfeff 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                }

                .label {
                  font-family: Microsoft YaHei;
                  font-weight: 400;
                  font-style: italic;
                  color: #e7fbff;
                  display: flex;
                  font-size: 0.68vw;
                  align-items: flex-end;

                  sub {
                    position: relative;
                    top: 0.2vh;
                    left: 0.1vw;
                    font-size: 0.5vw;
                    transform: scale(0.85);
                  }
                }
              }
            }
          }

          .energy-chart {
            flex: 1;
          }
        }
      }
    }

    .rate-chart-wrap {
      position: absolute;
      left: 22vw;
      right: 22vw;
      bottom: -2.5vh;
      height: 13vh;
      display: flex;
      z-index: 10;

      .kpi-chart-item {
        flex: 1;
        box-sizing: border-box;
      }
    }

    .model-content {
      width: 100%;
      height: 105%;
      position: relative;
      z-index: 9;
      // background: url(../../assets/images/bg.jpg) no-repeat center;
      background-size: auto 85%;

      :deep(.webgl-wrap) {
        width: 100%;
        height: 100%;
      }

      .bulding-3d-handle {
        width: 50%;
        margin: 0 auto;
        position: relative;
        text-align: center;
        padding-top: 3vh;

        .handle-btn {
          display: inline-block;
          border-radius: 6px;
        }

        .reset-btn {
          border: none;

          span {
            display: inline-block;
            padding: 1vh 1vw;
            text-align: center;
            background: linear-gradient(360deg,
                rgba(24, 65, 108, 1) 0%,
                rgba(25, 50, 81, 1) 100%);
            color: white;
            cursor: pointer;
            font-size: 1vw;
            font-weight: 600;
          }

          .floor_active {
            background: #152246;
            color: white;
            border-bottom: 3px solid #00c0fe;
          }
        }
      }
    }
  }
}
</style>
