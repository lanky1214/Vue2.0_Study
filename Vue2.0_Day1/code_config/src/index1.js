// 使用es6导入语法，导入jquery
import $ from 'jquery'
// 导入样式,在webpack中，一切皆模块，都可以通过ES6导入语法进行导入和使用
// 如果某个模块中，使用from接收到的成员为undefined，则没有必要进行接收（就是不用from）
import '@/css/index.css'
import '@/css/index.less'
// 1.导入图片，得到图片文件
import logo from '@/images/logo.png'
// 2.给img标签的src动态赋值
$('.box').attr('src',logo);
$(function () {
    $('li:odd').css('background-color','yellow')
    $('li:even').css('background-color','cyan');
})
//测试高级函数
// 定义装饰器函数（未来学习React高级会学到）
function info(target) {
    target.info = 'Person info';
}
// 定义一个普通的类
@info
class Person {}
//不是报错，是警告，一般代表该用法不稳定将来可能会变动
console.log(Person.info)
consol.log(Person.info)// Source Map测试