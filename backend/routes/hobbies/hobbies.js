const { Router } = require('express');
const router = Router();

const {
   getHobbies,
   getHobbiesById,
    createHobby,
    updateHobby,
    deleteHobby } = require("../../controllers/hobbies/hobbiesControllers");

/**
 * @swagger
 * /hobbies/:
 *   get:
 *     summary: Récupère la liste des hobbies
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: Liste des hobbies
 */
router.get('/', getHobbies);

/**
 * @swagger
 * /hobbies/id:
 *   get:
 *     summary: Récupère un Hobby par son ID
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: Récupère un Hobby par son ID
 */

router.get('/:id', getHobbiesById);

/**
 * @swagger
 * /hobbies/add:
 *   post:
 *     summary: Crée un nouveau hobby
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: création du hobby
 */
router.post('/add', createHobby);

/**
 * @swagger
 * /hobbies/update/1:
 *   put:
 *     summary: Met à jour un hobby
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: hobby mis à jour
 */
router.put('/update/:id', updateHobby);

/**
 * @swagger
 * /hobbies/delete/1:
 *   delete:
 *     summary: Supprime un hobby
 *     tags: [Hobbies]
 *     responses:
 *       200:
 *         description: hobby supprimé
 */
router.delete('/delete/:id', deleteHobby);

module.exports = router;