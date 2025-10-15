const { Router } = require('express');
const router = Router();

const {
  getUsers,
  createUsers,
  getUsersById,
  updatesUsers,
  deleteUsers
} = require("../../controllers/users/usersControllers.js");


const { authMiddleware } = require("../../middleware/authMiddleware")

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.post('/', createUsers);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 */

router.get('/:id', authMiddleware, getUsersById);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Met à jour un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Mise à jour de l'utilisateur
 */
router.put('/:id', updatesUsers);


/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/:id', deleteUsers);

module.exports = router;