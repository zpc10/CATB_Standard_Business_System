//创建一个promise实例对象
let promise = new Promise((resolve, reject) => {
    //初始化promise的状态为pending---->初始化状态
    console.log('1111');//同步执行
    //启动异步任务
    setTimeout(function () {
        console.log('3333');
        resolve('atguigu.com');//修改promise的状态pending---->fullfilled（成功状态）
        //reject('xxxx');//修改promise的状态pending----->rejected(失败状态)
    },6000)
});
promise.then((data) => {
    console.log('成功了。。。' + data);
}, (error) => {
    console.log('失败了' + error);
});
console.log('2222');