<template>
<div>
    <hr>
    <p>当前的count数值为：{{ count }}</p>
    <button @click="count++">+1</button>
</div>
  

</template>

<script>
export default {
    props: {
        init:{
            default:0,
            type:Number,
            required:true
        }
    },
    data() {
        return {
            count:this.init
        }
    }

}
</script>

<style>

</style>