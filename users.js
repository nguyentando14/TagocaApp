
var userProduct = require("../models/user");
var express = require("express");
var router = express.Router();

//http://localhost:3000/user/login
router.get("/", async function (req, res, next) {
  var data = await userProduct.find();
  res.json(data);
});

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(req.body); // In ra xem dữ liệu gửi từ Postman có đúng không
  const user = await userProduct.findOne({
    email: email, 
    password: password,
  });
  console.log(user); // In ra để kiểm tra các giá trị username và password đã lấy từ req.body
  if (user) {
     res.json({ statusCode: res.statusCode, data: user });
    //res.send("Đăng nhập thành công"); //test
  } else {
    res.send("Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.");
  }
});

module.exports = router;
