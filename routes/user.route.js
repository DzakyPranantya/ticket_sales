const { midOne } = require("../middlewares/simple-middleware");
const express = require('express');
const app = express();
app.use(express.json());
const userController = require('../controllers/user.controller');
const { validateUser, validateRegister } = require("../middlewares/user-validation");
const { authenticate, authorize } = require('../controllers/auth.controller');
const { IsUser, IsAdmin } = require('../middlewares/role.validation');


// app.post("/", validateUser, userController.addUser)
// app.put("/:id", validateUser, userController.updateUser)
app.get("/",[midOne], authorize, [IsAdmin], userController.getAllUser)




// app.get("/", userController.getAllUser)
// app.get("/:key", userController.findUser)
// app.post("/", userController.addUser)
// app.put("/:id", userController.updateUser) 
// app.delete("/:id", userController.deleteUser)


app.get("/", authorize, IsAdmin, userController.getAllUser)
app.get("/:key", authorize, IsAdmin, userController.findUser)
app.post("/", authorize, IsAdmin, validateUser, userController.addUser)
app.post("/register", validateRegister, userController.register)
app.put("/:id", authorize, IsUser, validateUser,userController.updateUser)
app.put("/reset/:id", userController.resetPwd)
app.delete("/:id", authorize, IsAdmin, userController.deleteUser)


module.exports = app;