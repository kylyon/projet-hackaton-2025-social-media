const { Router } = require('express');
const router = Router();

const { userLogin, userLogout, userRegister } = require("../../controllers/auth/authController")

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connecte l'utilisateur
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Authentifie l'utilisateur
 */
router.post('/login', userLogin);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Déconnecte l'utilisateur
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Déconnecte l'utilisateur
 */
router.post('/logout', userLogout);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: L'utilisateur est créé en base de données
 */
router.post('/register', userRegister);



module.exports = router;