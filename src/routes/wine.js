const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.use(express.json());

const WineController = require("../controllers/wine.js");

/**
 * @swagger
 * /api/wine:
 *   get:
 *     tags:
 *      - Wine
 *     summary: Liste tous les vins disponibles
 *     description: Récupère la liste complète des vins enregistrés dans notre base de données.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtrer les vins par nom
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtrer les vins par type (Rouge, Blanc, Rosé, etc.)
 *       - in: query
 *         name: winery
 *         schema:
 *           type: string
 *         description: Filtrer les vins par viticole
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Filtrer les vins par pays
 *       - in: query
 *         name: region
 *         schema:
 *           type: string
 *         description: Filtrer les vins par région
 *       - in: query
 *         name: yearMin
 *         schema:
 *           type: string
 *         description: Filtrer les vins par année (minimale)
 *       - in: query
 *         name: yearMax
 *         schema:
 *           type: string
 *         description: Filtrer les vins par année (maximale)
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Nombre de page récupéré
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Nombre de vin récupéré par page
 *     responses:
 *       200:
 *         description: Wines data
 *       default:
 *         description: Unexpected error
 */
router.get("/", WineController.getAllWines);

/**
 * @swagger
 * /api/wine/{id}:
 *   get:
 *     tags:
 *      - Wine
 *     summary: Récupère le vin correspondant à l'id
 *     description: Récupère le vin possédant l'id dans la base de données
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'id de du vin à récupérer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wine data
 *       404:
 *         description: Unknow ID
 *       default:
 *         description: Unexpected error
 */
router.get("/:id", WineController.getWine);

/**
 * @swagger
 * /api/wine/:
 *   post:
 *     tags:
 *      - Wine
 *     summary: Créer un vin
 *     description: Créer un vin à partir des données envoyées
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du vin
 *                 required: true
 *               country:
 *                 type: string
 *                 description: Pays du vin
 *                 required: true
 *               region:
 *                 type: string
 *                 description: Région du vin
 *                 required: true
 *               winery:
 *                 type: string
 *                 description: Domaine du vin
 *                 required: true
 *               volume:
 *                 type: number
 *                 description: Volume du vin en litre
 *               year:
 *                 type: integer
 *                 description: Année de production du vin
 *                 required: true
 *               rating:
 *                 type: object
 *                 properties:
 *                   rate:
 *                     type: number
 *                     description: Note du vin
 *                   count:
 *                     type: integer
 *                     description: Nombre de notes du vin
 *                 description: Informations de notation du vin
 *               natural:
 *                 type: boolean
 *                 description: Indique si le vin est naturel ou non
 *               type:
 *                 type: string
 *                 description: Type de vin
 *                 required: true
 *               grape:
 *                 type: string
 *                 description: Cépage du vin
 *               taste:
 *                 type: object
 *                 properties:
 *                   acidity:
 *                     type: number
 *                     description: Acidité du vin
 *                   fizziness:
 *                     type: number
 *                     description: Effervescence du vin
 *                   intensity:
 *                     type: number
 *                     description: Intensité du vin
 *                   sweetness:
 *                     type: number
 *                     description: Sucrosité du vin
 *                   tannin:
 *                     type: number
 *                     description: Tannins du vin
 *                 description: Caractéristiques gustatives du vin
 *               characteristics:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: Caractéristiques du vin
 *               temperature_service:
 *                 type: object
 *                 properties:
 *                   max:
 *                     type: number
 *                     description: Température maximale de service du vin
 *                   min:
 *                     type: number
 *                     description: Température minimale de service du vin
 *                 description: Plage de température de service du vin
 *               image:
 *                 type: string
 *                 description: URL de l'image du vin
 *               verified:
 *                 type: boolean
 *                 description: Indique si le vin est vérifié ou non
 *               type_taste:
 *                 type: string
 *                 description: Type de goût du vin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wine successfully created
 *       401:
 *         description: Unauthorized
 *       default:
 *         description: Unexpected error
 */
router.post("/", auth, multer, WineController.createWine);

/**
 * @swagger
 * /api/wine/:
 *   put:
 *     tags:
 *      - Wine
 *     summary: Créer ou remplace un vin
 *     description: Créer ou remplace un vin à partir des données envoyées
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du vin
 *                 required: true
 *               country:
 *                 type: string
 *                 description: Pays du vin
 *                 required: true
 *               region:
 *                 type: string
 *                 description: Région du vin
 *                 required: true
 *               winery:
 *                 type: string
 *                 description: Domaine du vin
 *                 required: true
 *               volume:
 *                 type: number
 *                 description: Volume du vin en litre
 *               year:
 *                 type: integer
 *                 description: Année de production du vin
 *                 required: true
 *               rating:
 *                 type: object
 *                 properties:
 *                   rate:
 *                     type: number
 *                     description: Note du vin
 *                   count:
 *                     type: integer
 *                     description: Nombre de notes du vin
 *                 description: Informations de notation du vin
 *               natural:
 *                 type: boolean
 *                 description: Indique si le vin est naturel ou non
 *               type:
 *                 type: string
 *                 description: Type de vin
 *                 required: true
 *               grape:
 *                 type: string
 *                 description: Cépage du vin
 *               taste:
 *                 type: object
 *                 properties:
 *                   acidity:
 *                     type: number
 *                     description: Acidité du vin
 *                   fizziness:
 *                     type: number
 *                     description: Effervescence du vin
 *                   intensity:
 *                     type: number
 *                     description: Intensité du vin
 *                   sweetness:
 *                     type: number
 *                     description: Sucrosité du vin
 *                   tannin:
 *                     type: number
 *                     description: Tannins du vin
 *                 description: Caractéristiques gustatives du vin
 *               characteristics:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: Caractéristiques du vin
 *               temperature_service:
 *                 type: object
 *                 properties:
 *                   max:
 *                     type: number
 *                     description: Température maximale de service du vin
 *                   min:
 *                     type: number
 *                     description: Température minimale de service du vin
 *                 description: Plage de température de service du vin
 *               image:
 *                 type: string
 *                 description: URL de l'image du vin
 *               verified:
 *                 type: boolean
 *                 description: Indique si le vin est vérifié ou non
 *               type_taste:
 *                 type: string
 *                 description: Type de goût du vin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wine successfully created
 *       401:
 *         description: Unauthorized
 *       default:
 *         description: Unexpected error
 */
router.put("/:id", auth, multer, WineController.updateWine);

/**
 * @swagger
 * /api/wine/{id}:
 *   delete:
 *     tags:
 *      - Wine
 *     summary: Supprime le vin correspondant à l'id
 *     description: Supprime le vin possédant l'id dans la base de données
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'id de du vin à supprimer
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wine successfully deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Unknow ID
 *       default:
 *         description: Unexpected error
 */
router.delete("/:id", auth, WineController.deleteWine);

module.exports = router;
