const path = require('path')
// 导入html-webpack-plugin这个插件，得到它的构造函数
const HtmlPlugin = require('html-webpack-plugin')
// new 这个构造函数，创建HtmlPlugin实例对象
const htmlPlugin = new HtmlPlugin({
    // 指定复制哪个文件
    template:'./src/index.html',
    // 指定复制的文件放在哪个路径以及文件名
    filename:'./index.html'
})
// 左侧的花括号是解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 使用node.js中的导出语法，向外导出一个webpack的配置对象
module.exports = {
    // 代表webpack运行的模式，可选值有development和production
    mode:'development',
    // 在开发调试阶段，建议大家都把devtool的值改成'eval-source-map'
    //在发布阶段，建议大家把devtool值设置为'nosources-source-map'或者直接关闭sourceMap
    devtool: 'nosources-source-map',
    // entry指定要处理哪个文件，默认为src下的index.js
    entry:path.join(__dirname,'./src/index1.js'),
    // output指定生成的文件要放到哪里，path目录，filename文件名
    output: {
        path:path.join(__dirname,'./dist'),
        filename:'js/bundle.js'
        // 明确告诉webpack把生成的bundle.js文件存放到dist目录下的js子目录中
    },
    // 插件的数组，将来webpack在运行时会加载并用到这些插件
    plugins:[htmlPlugin,new CleanWebpackPlugin()],
    devServer: {
        // 第一次打包成功后，自动打开浏览器
        open:true,
        // 指定运行时的主机地址
        host:'127.0.0.1',
        // 在http协议中，如果端口号是80，则可以被省略
        port:80
    },
    module: {
        rules: [
            //数组中定义了不同模块中对应的loader
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            // 处理图片文件的loader，如果需要调用的loader只有一个，只传递一个字符串也行，如果有多个loader就用数组
            {test:/\.jpg|png|gif$/,use:'url-loader?limit=1800&outputPath=images'},
            // 在配置url-loader的时候，多个参数之间使用&符号进行分割
            // 使用babel-loader处理js高级语法
            // 在配置babel-loader的时候，程序员只需要把自己的代码进行转换即可，一定要排除node_modules目录中的js文件
            // 因为第三方包中的JS兼容性，不需要程序员关心
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
        ] 
    },
    resolve: {
        alias: {
            // 告诉webpack程序员写的代码中@符号表示src这一层目录
            "@":path.join(__dirname,'./src/')
        }
    }
}
