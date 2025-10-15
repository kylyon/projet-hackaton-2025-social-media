const { Router } = require('express');
const router = Router();

const { getRoles } = require("../../controllers/users/rolesControllers");

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupère la liste des rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Liste des rôles
 */
router.get('/', getRoles);

module.exports = router;