const express = require("express");
const  router = express.Router();
const userController = require("../controllers/userController");

// ユーザーの一覧を取得
router.get("/all", userController.getAllUser)
// ユーザーを新規登録
router.post("/register", userController.userRegister)
// 登録済みユーザーのログイン
router.post('/login', userController.userLogin);
// token認証
router.get('/auth', userController.userAuth);

module.exports = router;