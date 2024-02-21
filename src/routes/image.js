const express = require("express");
const router = express.Router();

router.use(express.json());

const ImageController = require("../controllers/image.js");

/**
 * @swagger
 * path:
 * /images/{name}:
 *   get:
 *     tags:
 *      - Image
 *     summary: Récupère l'image correspondant au nom du vin
 *     description: Récupère l'image correspondant au nom du vin
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Le nom de du vin à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image get successfully
 *       404:
 *         description: Wine not found
 *       default:
 *         description: Unexpected error
 */
router.get("/:name", ImageController.load);

module.exports = router;
