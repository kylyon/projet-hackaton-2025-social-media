const { Router } = require('express');
const upload = require('../../middleware/multerMiddleware')
const router = Router();

const { userLogin, userLogout, userRegister, getAuthToken } = require("../../controllers/auth/authController")

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
router.post('/register', upload.single("avatar"), userRegister);


/**
 * @swagger
 * /auth/get_token:
 *   post:
 *     summary: Récupere le token d'authentification
 *     tags: [Authentification]
 *     responses:
 *       200:
 *         description: Le token est récuperer
 */
router.post('/get_token', getAuthToken);



module.exports = router;