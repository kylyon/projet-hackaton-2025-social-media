const { Router } = require('express');
const router = Router();

const {
    getPosts,
    createPost,
    updatePost,
    deletePost } = require("../../controllers/posts/postsControllers");

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Récupère la liste des post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Liste des post
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/add:
 *   post:
 *     summary: Crée un nouveau post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: création du post
 */
router.post('/add', createPost);

/**
 * @swagger
 * /posts/update/1:
 *   put:
 *     summary: Met à jour un post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: post mis à jour
 */
router.put('/update/:id', updatePost);

/**
 * @swagger
 * /posts/delete/1:
 *   delete:
 *     summary: Supprime un post
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: post supprimé
 */
router.delete('/delete/:id', deletePost);

module.exports = router;