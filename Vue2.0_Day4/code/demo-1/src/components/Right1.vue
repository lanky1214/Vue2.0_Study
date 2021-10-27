<template>
  <div class="right-container">
    <h3>组件之间的数据共享（兄弟）</h3>
    <hr>
    <p>{{ broStr }}</p>
  </div>
</template>

<script>
import bus from './EventBus'
export default {
  data() {
    return {
      broStr:''
    }
  },
  created() {
    bus.$on('share',val => {
      this.broStr = val
    })
  }
}
</script>

<style lang="less">
.right-container {
  padding: 0 20px 20px;
  background-color: lightskyblue;
  min-height: 250px;
  flex: 1;
}
</style>
