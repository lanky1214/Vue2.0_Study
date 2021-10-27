<template>
  <div class="left-container">
    <h3>组件之间的数据共享（父子、兄弟）</h3>
    <hr>
    <h4>组件共享数据（父->子）</h4>
    <p>str:{{ str }}  </p>
    <p>user:{{ user }}</p>
    <hr>
    <h4>组件共享数据（子->父）</h4>
    <button @click="send">将数据传给父亲</button>
    <hr>
    <h4>组件共享数据（兄弟）</h4>
    <button @click="sendToBro">将数据传给兄弟</button>
  </div>
</template>

<script>
import bus from './EventBus'
export default {
    props:['str','user'],
    data() {
        return {
            dataToFather:'子向父共享的数据',
            dataToBro:'兄弟共享的数据'
        }
    },
    methods: {
      //子向父共享数据的方法：自定义事件
        send() {
            this.$emit('getSon',this.dataToFather)
        },
        // 兄弟组件之间共享数据的方法：EventBus
        sendToBro() {
            bus.$emit('share',this.dataToBro)
        }
    }
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
  color:red;
}
/deep/ p {
  color: blue;
}
</style>