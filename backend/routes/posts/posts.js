const { Router } = require('express');
const router = Router();

const {
    getPosts,
    createPost,
    updatePost,
    deletePost } = require("../../controllers/posts/postsControllers");

/**
 * @swagger
 * /Post/:
 *   get:
 *     summary: Récupère la liste des post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Liste des post
 */
router.get('/', getPosts);

/**
 * @swagger
 * /Post/add:
 *   post:
 *     summary: Crée un nouveau rôle
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: création du rôle
 */
router.post('/add', createPost);

/**
 * @swagger
 * /Post/update/1:
 *   put:
 *     summary: Met à jour un rôle
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: rôle mis à jour
 */
router.put('/update/:id', updatePost);

/**
 * @swagger
 * /Post/delete/1:
 *   delete:
 *     summary: Supprime un rôle
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: rôle supprimé
 */
router.delete('/delete/:id', deletePost);

module.exports = router;