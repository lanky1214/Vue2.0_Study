<template>
  <div class="right-container">
    <h3>自定义属性props复用组件</h3>
    <MyCount :init="6"></MyCount>
  </div>
</template>

<script>
export default {
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
