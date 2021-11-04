### 动态组件

#### 1.动态组件

动态组件指的是**动态切换组件的显示和隐藏**

#### 2.实现动态组件渲染

vue提供了一个内置的**`<component>`**组件，用于**实现动态组件的渲染**

> 作用：组件的占位符

+ is属性的值，表示要渲染的组件的名字
+ is属性的值，是**组件在components节点下的注册名称**

```vue
components: {Left,Right},
data() {
  return { comName:'Left'}
}
<component :is="comName"></component>
```

#### 3.使用keep-alive保持状态

直接使用`component`标签在**切换组件**时会**将原组件销毁**，无法保持组件的状态

vue内置的`<keep-alive>`可以把组件**进行缓存**而不是销毁，保持动态组件的状态

+ keep-alive对应的生命周期函数

  + 当组件**被缓存**时，会自动触发组件的 `deactivated` 生命周期函数
  + 当组件**被激活**时，会自动触发组件的 `activated` 生命周期函数
  + 组件**每次**被缓存/被激活都会触发该生命周期函数

+ `include`属性：指定哪些组件**需要被缓存**

  只有**名称匹配的组件**会被缓存，多个组件名之间使用**英文的逗号**分隔

+ `exclude`属性：指定哪些组件**不需要被缓存**

+ include属性和exclude属性**不可以被同时使用**

> 区别：
>
> `<component>`标签的**is属性**的属性值是在**components节点下注册声明的名称**
>
> `<keep-alive>`标签的**include/exclude属性**的属性值是声明**组件时name属性的属性值**（若没有声明则默认为注册时的名称）

> 对比：
>
> + 组件的**注册名称**主要应用场景：以**标签**的形式，把注册好的组件渲染和使用到页面结构之中
> + 声明组件时**name属性的属性值名称**主要应用场景：结合`<keep-alive>`标签实现组件的**缓存功能**，以及在**调试工具中看到的组件名称**

```vue
<keep-alive include="Left">
    //只缓存Left组件，如果不注明include或exclude属性则缓存所有被切换过的组件
  <component :is="comName"></component>
</keep-alive>
```

### 插槽

**插槽（Slot）**是 vue 为**组件的封装者**提供的能力，允许开发者在封装组件时，把**不确定的、希望由用户指定的部分**定义为插槽

![slot.png](./md_image/slot.png)

> 可以把插槽认为是组件封装期间，为用户预留的**内容的占位符**

#### 1.基础用法

```vue
// 组件Com.vue
<template>
  <h1>这里是Com.vue</h1>
  <!-- 在组件里声明一个插槽区域 -->
  <!-- 官方规定：每一个slot插槽，都要有一个name名称 -->
  <!-- 如果省略了slot的name属性，则有一个默认名称叫default -->
  <slot></slot>
</template>
```

```vue
//在使用组件时，为插槽指定具体的内容
//默认情况下，在使用组件的时候，提供的内容都会被填充到名字为default的插槽之中
<Com>
 <p>-用户自定义内容 </p>
</Com>
```

+ **没有预留插槽的内容会被丢弃**

  如果在封装组件时没有预留任何插槽，则用户提供的任何自定义内容都会被丢弃

+ **后备内容**

  封装组件时，可以为预留的插槽提供**后备内容**（默认内容）

  如果组件的使用者**没有为插槽提供任何内容，则后备内容会生效**

  ```vue
  <slot name="title">这里是插槽的后备内容</slot>
  ```

> 1. 如果要把内容填充到指定名称的插槽中，需要使用`v-slot:`指令，简写为`#`
> 2. `v-slot:`后面要接上插槽的名字，如#title
> 3. `v-slot:`指令不能直接用在元素上，必须用在template标签或组件上
> 4. template这个标签是虚拟标签，只起包裹性质作用，不会被渲染成任何实质性的html元素

#### 2.具名插槽

如果在封装组件时需要**预留多个插槽**节点，则需要为每个插槽指定具体的 **name** 名称，**带有具体名称的插槽叫做“具名插槽”**

```vue
<slot name="title"></slot>
<slot name="content"></slot>
<slot></slot> <!-- 没有指定名称的插槽会被默认叫做default -->
```

+ 为具名插槽提供内容

  ```vue
  <template #title>
    <p>为title插槽提供的内容就是这个p标签，template起包裹作用，无意义</p>
  </template>
  <Com #content></Com>
  <!-- 为插槽提供的内容也可以是一个组件 -->
  
  //必不能直接给标签直接使用v-slot指令！！！！
  <p #title>这种方法是错误的！！</p>
  ```

#### 3.作用域插槽

​    在封装组件的过程中，可以为预留的插槽**绑定 props 数据**，**带有 props 数据的插槽叫做“作用域插槽”**

+ 使用作用域插槽

  ```vue
  <slot name="default" msg="hello vue.js"></slot>
  //为插槽绑定props数据
  
  <template #default="scope">
      <p>{{ scope.msg }}</p>
      <!--接收到的scope是一个对象，默认为空对象，包含插槽中绑定的所有数据 -->
  </template>
  ```

+ **解构插槽**

  作用域插槽对外提供的数据对象，可以使用解构赋值简化数据的接收过程

  ```vue
  data() { return { userinfo: { name:'Lanky', age:23}}}
  
  <slot name="default" :user="userinfo"></slot>
  
  <template #default="{user}">
      <p>{{ user.name }}</p>
      <p>{{ user.age }}</p>
  </template>
  ```

### 自定义指令

#### 1.私有自定义指令

在每个vue组件中，可以在`directives`节点下声明**私有自定义指令**

```vue
directives: {
  color:{
    bind(el,binding) {
    el.style.color = binding.value
      },
    update(el,binding) {
    el.style.color = binding.value
      }
   }
},
data() { return { color :'blue'}}

//使用
<h1 v-color="color">使用自定义指令</h1>
```

> + 使用自定义指令时，需要加上`v-`前缀
> + bind()函数是绑定这个指令**第一次**也是**唯一一次**会默认执行的函数
> + 参数**el**表示绑定这个指令的元素
> + 参数**binding**表示指令绑定的参数值对象，真正参数值为它的**value**属性值，即`binding.value`
> + 指令绑定的参数值可以是静态值，如v-color="'red'"(要用单引号包裹)，也可以是动态值，如v-color="color"
> + update()函数会在**每次DOM更新时**被调用，但不会默认触发（即bind函数不能省略）

**注意**：bind 函数只调用 **1** 次。当指令第一次绑定到元素时调用，当 DOM 更新时 bind 函数不会被触发， update 函数会在每次 DOM 更新时被调用

如果**bind**和**update**函数中的**逻辑完全相同**，则**对象格式**的自定义指令可以简写成**函数格式**

```vue
directives: {
  color(el,binding) {
     el.style.color = binding.value
  }
}
```

+ 私有自定义指令只能在声明该指令的**当前组件中使用**，不能在其他组件甚至子组件中使用

#### 2. 全局自定义指令

全局自定义指令可以在**所有组件中被使用**，全局共享的自定义指令需要通过`Vue.directive()`进行声明

```vue
Vue.directive('color',(el,binding) => {
   el.style.color = binding.value
})
```

### ESLint

> 提供一个可组装的、插件化的Javascript代码检测工具

为了让开发者**专注于业务功能的开发**，可以在 vscode 中安装并配置 **ESLint** 插件

它可以在保存文件的时候，遵循 ESLint 的语法规则，自动对代码进行格式化

ESLint 提供了许多**校验代码格式**的语法规则，常见的语法规则列表如下

| 序号 | 规则名称                    | 规则约束/默认约束                            |
| ---- | --------------------------- | -------------------------------------------- |
| 1    | quotes                      | 默认：字符串需要使用单引号包裹               |
| 2    | key-spacing                 | 默认：对象的属性和值之间，需要有一个空格分割 |
| 3    | comma-dangle                | 默认：对象或数组的末尾，不允许出现多余的逗号 |
| 4    | no-multiple-empty-lines     | 不允许出现多个空行                           |
| 5    | no-trailing-spaces          | 不允许在行尾出现多余的空格                   |
| 6    | eol-last                    | 默认：文件的末尾必须保留一个空行             |
| 7    | spaced-comment              | 在注释中的`//`或`/*`后强制使用一致的间距     |
| 8    | indent                      | 强制一致的缩进                               |
| 9    | import/first                | `import` 导入模块的语句必须声明在文件的顶部  |
| 10   | space-before-function-paren | 方法的形参之前是否需要保留一个空格           |

如果希望**修改** ESLint 默认的校验规则，可以在 `.eslintrc.js` 文件的 `rules` 节点下进行自定义

```js

  rules: {
    // 默认情况下，ESLint 规定：方法的形参之前必须保留一个空格
    // 'space-before-function-paren': ['error', 'always']

    // 如果指定了规则的值为 never，则不允许在方法的形参之前保留任何空格
    'space-before-function-paren': ['error', 'never']
  }
```

#### 在vue中挂载axios

```js
// main.js
// 全局配置axios的请求根路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3006'
// 把axios挂载到Vue.prototype上，供每个.vue组件的实例直接使用
// '$http'不一定要是这个名称，也可以叫axios、http
Vue.prototype.$http = axios
```

```vue
<!-- xxx.vue -->
methods: {
   async getInfo() {
     const { data:res } = await this.$http.get('api/get')
     console.log(res)
    }
}
```

+ 优点：在每个.vue组件中要发起请求，可以直接调用this.$http.xxx
+ 缺点：把axios挂载到vue原型上，不利于API接口的复用

