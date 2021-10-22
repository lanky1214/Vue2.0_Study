<template>
    <div>
        <p>姓名： {{ username }}</p>
        <button @click="changeName">修改名字</button>
    </div>

</template>

<script>
export default {
    // 在.vue组进中data必须设置为函数，返回一个对象
    data() {
       return { username: 'Lanky'}
    },
    methods : {
        changeName() {
            console.log(this);
            // 在组件里，this就表示当前组件的实例对象
            this.username = 'ilanky'
        }
    }
}
</script>

<style>
* {
    margin: 0;
    padding:0;
    box-sizing: border-box;
}
p {
    height: 30px;
    background-color: aqua;
}
</style>