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
 *     summary: Crée un nouveau post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: création du post
 */
router.post('/add', createPost);

/**
 * @swagger
 * /Post/update/1:
 *   put:
 *     summary: Met à jour un post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: post mis à jour
 */
router.put('/update/:id', updatePost);

/**
 * @swagger
 * /Post/delete/1:
 *   delete:
 *     summary: Supprime un post
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: post supprimé
 */
router.delete('/delete/:id', deletePost);

module.exports = router;