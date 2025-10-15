const { Router } = require('express');
const router = Router();

const {
  getRoles,
  createRoles,
  updateRoles,
  deleteRoles } = require("../../controllers/roles/rolesControllers");

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

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: création du rôle
 */
router.post('/', createRoles);

/**
 * @swagger
 * /roles:
 *   put:
 *     summary: Met à jour un rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: rôle mis à jour
 */
router.put('/:id', updateRoles);

/**
 * @swagger
 * /roles:
 *   delete:
 *     summary: Supprime un rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: rôle supprimé
 */
router.delete('/:id', deleteRoles);

module.exports = router;