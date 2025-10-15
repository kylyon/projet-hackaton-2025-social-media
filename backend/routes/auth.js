const { Router } = require('express');
const router = Router();

const { userLogin } = require("../controllers/auth/authController")
const { authMiddleware } = require("../middleware/authMiddleware")

/**
 * @swagger
 * /auth/users/login:
 *   post:
 *     summary: Connecte l'utilisateur
 *     tags: [User, Login]
 *     responses:
 *       200:
 *         description: Authentifie l'utilisateur
 */
router.post('/users/login', userLogin);

router.get('/users/test', authMiddleware, (req, res) => {
    return res.json(req.user)
})

module.exports = router;