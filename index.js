var express = require('express');
var router = express.Router();
const userController = require('../routes/Users/UserController')
const jwt = require('jsonwebtoken');
//const {checkTokenCpanel} = require('../../middle/Authen');

/* GET home page. */
// http://localhost:3000
router.get('/',function(req, res, next){
  //hiển thị trang chủ
  res.render('index');
});
router.get('/login',function(req, res, next){
  //hiển thị trang đăng nhập

  res.render('users/login');
});
// http://localhost:3000/login
router.post('/login', async function(req, res, next){
  //xử lý đăng nhập  
  //Nếu đăng nhập thành công thì chuyển qua trang chủ
  //Thất bại chuyển trang login
  const {email, password} = req.body;
  const result = await userController.login(email, password);
  if(result){
    //tao token
    //luu token vao trong session
    const token = jwt.sign({_id: result._id, role: result.role}, 'secret',{expiresIn: '1h'});
    req.session.token = token;
    return res.redirect('/');
  }else{
    return res.redirect('/login');
  }
});

// http://localhost:3000/logout
router.get('/logout', async(req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
})
module.exports = router;
