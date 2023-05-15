var express = require('express');
var router = express.Router();
var path = require('path');
const mainController = require("../controllers/mainController");
const userController = require("../controllers/userController");
const itemController = require("../controllers/itemController");
const userLoginController = require("../controllers/userLoginController");
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get("/", mainController.init);

router.get("/users/:id", userController.find_User);

router.get("/users/:id/lists", userController.users_list);

router.get("/users/:id/library", userController.library_list);

router.get("/users/:id/following", userController.following_list);

router.get("/users/:id/followers", userController.followers_list);

router.get("/items/:name", itemController.find_match_items);

router.get("/itemsdetail/:id", itemController.find_Item);

router.get("/_itemsdetail/:id", itemController._find_Item);

router.get("/login/:name/:password", loginController.try_login);

router.post("/signup", userLoginController.userlogin);

router.post("/cart", userController.updateCart);

router.get("/users/:id/cart", userController.cart);

router.put("/users/:id", userController.editUser);

module.exports = router;
