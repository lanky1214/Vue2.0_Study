### 过滤器Filter

1. 过滤器常用于**文本的格式化**，仅在vue2.x和1.x中支持，在vue3.x版本中剔除了过滤器相关功能

2. 过滤器使用场景
   + 插值表达式`{{}}`
   + 属性绑定指令：`v-bind：`

3. 使用方法

```html
<p>{{ message | capi }}</p>
<!-- 过滤器应该被添加在 JavaScript 表达式的尾部，由“管道符”进行调用 -->
```

4. **私有过滤器**和**全局过滤器**

   在 filters 节点下定义的过滤器，称为**私有过滤器**，因为它只能在当前 vm 实例所控制的 el 区域内使用

   如果希望在**多个 vue 实例之间共享过滤器**，则可以按照如下的格式定义**全局过滤器**：

   ```js
   // Vue.filter接受两个参数，第一个参数是全局过滤器的名字，第二个参数是它的处理函数
   Vue.filter('capi',val => {
               const first = val.charAt(0).toUpperCase();
               return "（这里调用的是全局过滤器）"+first + val.slice(1);
           })
   ```

5. 过滤器注意点

+ 要定义在filters节点下，本质是一个函数
+ 在过滤器函数中，一定要有return值
+ 在过滤器的形参中，直接可以获取到 管道符`|`前面待处理的值
+ 如果全局过滤器和私有过滤器名字一致，此时按照“**就近原则**”，调用的是”私有过滤器“
+ 过滤器可以**链式调用**
+ 可以传参，但是形参中第一位永远都是管道符前面待处理的值

### 侦听器Watch

1. watch侦听器允许开发者监听data节点下的数据变化，从而**针对数据的变化做特定的操作**

2. 侦听哪个数据，就将哪个数据的**属性名作为方法名**

3. 基础用法

   + 方法格式的侦听器

   ```js
   // 侦听器要定义在watch节点之下
         watch: {
           username(newVal,oldVal) {
          // 侦听器的参数分别为数据变化前后的值，新值在前，旧值在后
           console.log("新值："+newVal+"|旧值："+oldVal)
         }
     }
   ```

   + 对象格式的侦听器

     ```js
     watch: {
         username: {
             // 数据发生变化时的处理函数
             handler(newVal,oldVal){
                 console.log(newVal+"---"+oldVal)
             }
         }
     }
     ```

4. immediate选项

   想让 watch 侦听器在加载页面后立即被调用，则需要在**对象格式的侦听器**中使用 **immediate** 选项

   ```js
   watch: {
       username: {
           handler(newVal){
               console.log(newVal)
           },
           immediate:true
           //immediate的作用：控制侦听器是否自动触发一次
           // 默认值为false
       }
   }
   ```

5. deep选项

   如果侦听的是一个**对象**，如果**对象中的属性值发生了变化**，**无法被监听到**，此时需要使用 **deep** 选项

   ```js
    watch: {
       info: {
          handler(newVal) {
            console.log(newVal);
            },
        // 开启深度监听，只要对象中任何一个属性变化了，都会触发对象的侦听器
          deep:true
    }
   ```

6.  侦听器的格式：

   + **方法格式的侦听器**
     + 缺点1：无法在刚进入页面的时候，自动触发
     + 缺点2：如果侦听的是一个对象，如果对象中的属性发生了变化，不会触发侦听器
   + **对象格式的侦听器**
     + 好处1：可以通过 **immediate** 选项，让侦听器自动触发
     + 好处2：可以通过 **deep** 选项，让侦听器深度监听对象中每个属性的变化

   > 实际开发中，**方法格式的侦听器更为常用**，如果需要自动触发或深度监听，再用对象格式的侦听器

7. 监听**对象单个属性**的变化

   监听对象单个属性值的变化，要给该对象属性加上单引号

   ```js
    watch: {
       'infos.username'(newVal) {
             console.log(newVal);
       }
   }
   ```

### 计算属性

计算属性指的是**通过一系列运算**之后，最终得到一个**属性值**

 这个动态计算出来的属性值可以被**模板结构**或 **methods 方法**使用

1. 特点：

   + 定义的时候，要被定义为**方法**
   + 在使用计算属性的时候，当**普通的属性**使用即可

2. 好处

   + 实现了**代码的复用**
   + 只要计算属性中依赖的**数据源变化**了，则计算属性会**自动重新求值**

3. 所有的计算属性，都要定义到`computed`节点之下

   ```js
   <p> {{ rgb }}</p>
   // 定义的时候是方法，使用的时候当属性使用
   const vm = new Vue({
       computed: {
       //所有的计算属性，都要定义到computed节点之下
       rgb() {
           return `rgb(${this.r},${this.g},${this.b}`);
           //`` 是模板字符串
       }
   },
    methods: {
           // 在方法中，也可以当作属性来用
           show() {
             console.log(this.rgb)
           }
         }
   })
   
   ```

4. 计算属性会**缓存计算的结果**，只有计算属性**依赖的数据变化**时，才会**重新进行运算**

### axios

> axios是一个专注于**网络请求**的库
>
> 在vue、react中都会用到**axios来请求数据**

1. 发起GET请求

   ```js
   axios( {
       //请求方式
       method:"GET",
       //请求的地址
       url:"http://www.liulongbin.top:3006/api/getbooks",
       //URL中的查询参数
       params: {
           id:1
       }
   }).then(result => {
       console.log(result)
   })
   ```

2. 发起POST请求

   ```js
   document.querySelector('#btnPost').addEventListener('click', async function () {
     // 如果调用某个方法的返回值是 Promise 实例，则前面可以添加 await
     // await 只能用在被 async “修饰”的方法中
     const { data: res } = await axios({
       method: 'POST', 
       url: 'http://www.liulongbin.top:3006/api/post',
       data: {
         name: 'zs',
         age: 20
       }
     })
   
     console.log(res)
   })
   ```

3. `$axios.get()`

   ```js
   // 解构赋值的时候，使用 : 进行重命名
   // 1. 调用 axios 之后，使用 async/await 进行简化
   // 2. 使用解构赋值，从 axios 封装的大对象中，把 data 属性解构出来
   // 3. 把解构出来的 data 属性，使用 冒号 进行重命名，一般都重命名为 { data: res }
   document.querySelector("#btnGET").addEventListener('click',async function() {
               // axios.get(参数1，参数2)
               // 参数1：请求的url地址
               // 参数2：get参数对象，{ params: { xxx }}的方式
               const { data:res } = await axios.get(
                   'http://www.liulongbin.top:3006/api/getbooks',
                   {params: { id:1}}
               );
               console.log(res);
           })
   ```

4. `$axios.post()`

   ```js
   // axios.post(参数1，参数2)
           // 参数1：请求的url地址
           // 参数2：post参数对象，{ xxxxxx } 的方式，不用加data
           document.querySelector("#btnPOST").addEventListener('click',async function() {
               const { data:res } = await axios.post(
                   'http://www.liulongbin.top:3006/api/post', 
                   { name: 'zs', gender: '女' }
               )
               console.log(res);
           })
   ```

### vue-cli的使用

1. **单页面应用程序**（Single Page Application简称 SPA：一个 Web 网站中只有**唯一的一个 HTML 页面**，所有的功能与交互都在这唯一的一个页面内完成
2. `vue-cli`: Vue.js 开发的**标准工具**，它简化了程序员基于 webpack 创建工程化的 Vue 项目的过程

3. 安装与使用

   + 安装

     ```js
     npm install -g @vue/cli     
     //npm 上的一个全局包 -g
     ```

   + 使用：在终端下运行如下的命令，创建指定名称的项目

     ```js
     vue cerate 项目的名称
     ```

4. 在工程化的项目中，vue 要做的就是**通过 main.js 把 App.vue 渲染到 index.html 的指定区域中**

+ vue 项目中 src 目录的构成：

  ```js
  assets 文件夹：存放项目中用到的静态资源文件，例如：css 样式表、图片资源
  components 文件夹：程序员封装的、可复用的组件，都要放到 components 目录下
  main.js 是项目的入口文件。整个项目的运行，要先执行 main.js
  App.vue 是项目的根组件
  ```

5. `main.js` 里的vue实例的`$mount()`方法，作用和`el`属性完全一样，即

   ```js
   const vm1 = new Vue( {
       el:"#app"
   })
   //等价于
   const vm2 = new Vue( {
       ...
   })
       vm2.$mount("#app")
   ```

   