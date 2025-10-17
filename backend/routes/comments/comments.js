const { Router } = require('express');
const router = Router();

const {
  getComments,
  getCommentById,
    createComment,
    updateComment,
    deleteComment } = require("../../controllers/comments/commentsControllers");

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupère la liste des commentaires
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Liste des commentaires
 */
router.get('/', getComments);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Récupère un commentaire par son ID
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Récupère un commentaire par son ID
 */
router.get('/:id', getCommentById);

/**
 * @swagger
 * /comments/add:
 *   post:
 *     summary: Crée un nouveau commentaire
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: création du commentaire
 */
router.post('/add', createComment);

/**
 * @swagger
 * /comments/update/1:
 *   put:
 *     summary: Met à jour un commentaire
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: commentaire mis à jour
 */
router.put('/update/:id', updateComment);

/**
 * @swagger
 * /comments/delete/1:
 *   delete:
 *     summary: Supprime un commentaire
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: commentaire supprimé
 */
router.delete('/delete/:id', deleteComment);

module.exports = router;