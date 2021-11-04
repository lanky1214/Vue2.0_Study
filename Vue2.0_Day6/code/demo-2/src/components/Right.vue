<template>
  <div class="right-container">
    <h1>Right组件</h1>
    <button @click="postInfo">发起post请求</button>
    <button @click="getBooks">获取图书列表</button>
  </div>
</template>

<script>
export default {
  methods: {
    async postInfo() {
      const { data: res } = await this.$http.post('api/post', { name: 'zs', age: 18 })
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
.right-container {
  background-color: skyblue;
  min-height: 200px;
  flex: 1;
}
</style>
