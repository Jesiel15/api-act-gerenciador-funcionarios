const { Router } = require("express");

const router = Router();

const authenticateToken = require("./middleware/jwt-auth");

const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");

/*
 * =============ENDPOINTS=============
 */
router.post("/login", LoginController.login);
router.post("/logout", LoginController.logout);

router.get("/user-list/:profile?", authenticateToken, UserController.listUsers);
router.get("/user/:id", authenticateToken, UserController.findUser);
router.post("/user", authenticateToken, UserController.createUser);
router.put("/user/:id", authenticateToken, UserController.updateUser);
router.delete("/user/:id", authenticateToken, UserController.deleteUser);
router.put("/user/change-password/:id", authenticateToken, UserController.changePassword);

router.get("/", (req, res) => {
  res.json({ arrayRoutesEndpoints, message: "API ONLINE!" });
});

module.exports = router;

// LIST ROUTES URL BASE API
let arrayRoutesEndpoints = [];

router.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    let method = r.route.stack[0].method.toUpperCase();
    let path = r.route.path;
    arrayRoutesEndpoints.push({ method, path });
  }
});
