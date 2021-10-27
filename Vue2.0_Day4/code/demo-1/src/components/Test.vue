<template>
  <div class="test-container">
      <p id="books-p">books的数量为：{{ books.length }} 【生命周期模块】 </p>
          <p id="msg-p">message的值为：{{ message }} 
              &nbsp;&nbsp;&nbsp; <button @click="message+='~'">修改message的值</button></p>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            message:'vue.js',
            books:[]
            // 定义一个books数组，用来储存请求到的图书的列表数据，默认为空数组
        }
    },
    methods: {
        show() {
            console.log('调用了test.vue的show方法');
        },
        initBookList() {
            // 请求数据
            const xhr = new XMLHttpRequest;
            // 这里的addEventListener里的处理函数用箭头函数，避免this指向出错
            xhr.addEventListener('load',() => {
                const result = JSON.parse(xhr.responseText);
                console.log(result);
                this.books = result.data;
            })
            xhr.open('GET','http://www.liulongbin.top:3006/api/getbooks');
            xhr.send();
        }
    },
    //生命周期
    beforeCreate() {
        // 初始化事件后，组件的props、data、methods等尚未被创建，无法获取到数据
        // console.log(this.message);
        // this.show()
    },
    created() {
        // 组件的props、data、methods等被创建成功
        // 经常在这调用methods方法请求服务器的数据
        // 并且把请求到的数据转存到data中，供template模板渲染时使用（此时还没DOM结构）
        this.initBookList()
    },
    beforeMount() {
        //DOM元素还没被渲染到页面，HTML元素还在内存中
        // const dom = document.querySelector("#books-p");
        // console.log(dom);    //null
    },
    mounted() {
        // 已经把内存中的HTML结构成功渲染到浏览器当中，包含了当前的DOM结构
        // 如果要操作当前组件的DOM，最早只能在mounted执行
        const dom = document.querySelector("#books-p");
        console.log(dom);
    },
    beforeUpdate() {
        // 数据更新了，但DOM结构还没更新
        // console.log(this.message);  //vue.js~ 数据已更新
        // const dom = document.querySelector("#msg-p");
        // console.log(dom.innerHTML);  // message的值为：vue.js  DOM结构未更新
    },
    updated() {
        // 当数据变化后，想要操作最新的DOM结构，要把代码写在updated生命周期中
        // console.log(this.message);    //vue.js~ 数据已更新
        // const dom = document.querySelector("#msg-p");
        // console.log(dom.innerHTML);     // message的值为：vue.js~  DOM结构也已更新
    },
    beforeDestroy() {
        // 将要销毁，尚未销毁
        // console.log(this.message);    //vue.js
        // const dom = document.querySelector("#msg-p");
        // console.log(dom.innerHTML);     // 无输出
    },
    destroyed() {
        //完全销毁
    }
}


</script>

<style>
 .test-container {
     padding: 5px 20px 20px;
     width: 500px;
     height: 60px;
     background-color: pink;
 }
</style>