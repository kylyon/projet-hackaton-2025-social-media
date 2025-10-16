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
 * /users/add:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.post('/add', createUsers);

/**
 * @swagger
 * /users/1:
 *   get:
 *     summary: Récupère un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 */

router.get('/:id', getUsersById);

/**
 * @swagger
 * /users/update/1:
 *   put:
 *     summary: Met à jour un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Mise à jour de l'utilisateur
 */
router.put('/update/:id', updatesUsers);


/**
 * @swagger
 * /users/delete/1:
 *   delete:
 *     summary: Supprime un utilisateur par ID
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete('/delete/:id', deleteUsers);

module.exports = router;