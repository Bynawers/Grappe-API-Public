const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.use(express.json());

const UserController = require("../controllers/user.js");

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *      - Admin
 *     summary: Créer à un compte grappe
 *     description: Se créer un compte utilisateur grappe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connected successfully
 *       400:
 *         description: Bad request
 *       default:
 *         description: Unexpected error
 */
//router.post("/signup", UserController.signup);

/**
 * @swagger
 * path:
 * /api/auth/login:
 *   post:
 *     tags:
 *      - User
 *     summary: Connection à un compte grappe
 *     description: Se connecter à un compte utilisateur/admin grappe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connected successfully
 *       400:
 *         description: Bad request
 *       default:
 *         description: Unexpected error
 */
router.post("/login", UserController.login);

module.exports = router;
