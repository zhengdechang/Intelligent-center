<template>
  <div class="agv-tips-wrap">
    <span class="agv-name">{{ props.name }}</span>
    <span class="agv-status">{{ props.status }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
  status: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  status: "",
});
</script>

<style lang="scss" scoped>
.agv-tips-wrap {
  width: 212.8px;
  height: 56.7px;
  background: url(../../../assets/images/agv_tips.png) no-repeat;
  background-size: 50% auto;
  background-position-x: right;
  background-position-y: top;

  .agv-name {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-style: italic;
    color: #ffffff;
    padding: 0 15px 0 126px;
    position: relative;
    top: -1px;
  }

  .agv-status {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-style: italic;
    color: #00ffa2;
    position: relative;
    top: -1px;
  }
}
</style>
