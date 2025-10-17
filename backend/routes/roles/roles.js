const { Router } = require('express');
const router = Router();

const {
  getRoles,
  getRoleById,
  createRoles,
  updateRoles,
  deleteRoles } = require("../../controllers/roles/rolesControllers");

/**
 * @swagger
 * /roles/:
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
 * /roles/id:
 *   get:
 *     summary: Récupère un role par son ID
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Récupère un role par son ID
 */
router.get('/:id', getRoleById);

/**
 * @swagger
 * /roles/add:
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: création du rôle
 */
router.post('/add', createRoles);

/**
 * @swagger
 * /roles/update/1:
 *   put:
 *     summary: Met à jour un rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: rôle mis à jour
 */
router.put('/update/:id', updateRoles);

/**
 * @swagger
 * /roles/delete/1:
 *   delete:
 *     summary: Supprime un rôle
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: rôle supprimé
 */
router.delete('/delete/:id', deleteRoles);

module.exports = router;