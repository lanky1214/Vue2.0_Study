<template>
  <div class="left-container">
    <h3>样式冲突scoped、组件复用</h3>
    <MyCount :init="9"></MyCount>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
  // 用scoped属性解决样式冲突问题
.left-container {
  padding: 0 20px 20px;
  background-color: orange;
  min-height: 250px;
  flex: 1;
}
h3 {
  // scoped为当前组件的标签添加了一个自定义属性，防止样式冲突，不会影响其他组件的样式
  color:red;
}
// p {
// //   p标签是属于子组件Count.vue的标签
// //   如果给当前组件的 style 节点添加了 scoped 属性，则当前组件的样式对其子组件是不生效的
// //   相当于p[data-v-xxx]
//   color: blue;
// }
/deep/ p {
  // 如果想让某些样式对子组件生效，可以使用 /deep/ 深度选择器
  // 相当于[data-v-xxx] p
  color: blue;
}
</style>
