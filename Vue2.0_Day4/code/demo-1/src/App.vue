<template>
  <div class="app-container">
    <h1>App 根组件  <button @click="flag= !flag">flag取反</button></h1>
    <!-- 模拟vue实例的消除 -->
    <Test v-if="flag"></Test>  
    <p>{{ strFromSon}}</p>
   
    
    <hr />

    <div class="box">
      <!-- 渲染 Left 组件和 Right 组件 -->
      <Left></Left>
      <!-- <Middle></Middle> -->
      <Right></Right>
      <Left1 :str="str" :user="info" @getSon="getSonVal"></Left1>
      <Right1></Right1>
    </div>
    
  </div>
</template>

<script>
import Left from '@/components/Left.vue'
import Left1 from '@/components/Left1.vue'
import Right from '@/components//Right.vue'
import Right1 from '@/components/Right1.vue'
import Test from '@/components/Test'
export default {
  components: {
    Left,
    Left1,
    Right,
    Right1,
    Test
  },
  data() {
    return {
      //模拟组件销毁
      flag:true,
      // 组件之间共享数据-----父传子：自定义属性
      str:'父传子',
      info:{ name:'Lanky' , age:23},
      strFromSon:''
    }
  },
  methods: {
    getSonVal(val) {
        this.strFromSon=val
    }
  }
}
</script>

<style lang="less">
.app-container {
  padding: 1px 20px 20px;
  background-color: #efefef;
}
.box {
  display: flex;
}
</style>
