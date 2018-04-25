const jwt = require('jsonwebtoken');
const secret = 'aaa'; //撒盐：加密的时候混淆

//jwt生成token
const token = jwt.sign({
      name: 123
}, secret, {
    expiresIn:  60 //秒到期时间
});
console.log(token);
//解密token
jwt.verify("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkFudGhvbnkgVmFsaWQgVXNlciIsImlhdCI6MTQyNTQ3MzUzNX0.KA68l60mjiC8EXaC2odnjFwdIDxE__iDu5RwLdN1F2A", 'NeverShareYourSecret', function (err, decoded) {
    if (!err){
        console.log(decoded.name);  //会输出123，如果过了60秒，则有错误。
    }
})
