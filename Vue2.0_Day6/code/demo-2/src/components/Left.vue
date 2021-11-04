<template>
  <div class="left-container">
    <h1>Left组件</h1>
    <button @click="getInfo">发起get请求</button>
    <button @click="getBooks">获取图书列表</button>
  </div>
</template>

<script>
export default {
  methods: {
    async getInfo() {
      const { data: res } = await this.$http.get('api/get')
      console.log(res)
    },
    async getBooks() {
      const { data: res } = await this.$http.get('api/getBooks')
      console.log(res)
    }
  }
}
</script>

<style lang="less">
.left-container {
  background-color: pink;
  min-height: 200px;
  flex: 1;
}
</style>
