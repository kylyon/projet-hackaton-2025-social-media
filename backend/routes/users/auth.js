const { Router } = require('express');
const router = Router();

const { userLogin, userLogout } = require("../../controllers/auth/authController")

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connecte l'utilisateur
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Authentifie l'utilisateur
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Déconnecte l'utilisateur
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Déconnecte l'utilisateur
 */
router.post('/logout', userLogout);



module.exports = router;