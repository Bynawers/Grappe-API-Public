/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Documentation de la base de données
 *   version: 1.0.0
 * paths: {}
 * components:
 *   schemas:
 *     # Définition du modèle User
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           description: Identifiant de l'utilisateur
 *         password:
 *           type: string
 *           required: true
 *           description: Mot de passe de l'utilisateur (hashé)
 *       required:
 *         - email
 *         - password
 *     # Définition du modèle Wine
 *     Wine:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nom du vin
 *           required: true
 *         country:
 *           type: string
 *           description: Pays du vin
 *           required: true
 *         region:
 *           type: string
 *           description: Région du vin
 *           required: true
 *         winery:
 *           type: string
 *           description: Domaine du vin
 *           required: true
 *         volume:
 *           type: number
 *           description: Volume du vin en litre
 *         year:
 *           type: integer
 *           description: Année de production du vin
 *           required: true
 *         rating:
 *           type: object
 *           properties:
 *             rate:
 *               type: number
 *               description: Note du vin
 *             count:
 *               type: integer
 *               description: Nombre de notes du vin
 *           description: Informations de notation du vin
 *         natural:
 *           type: boolean
 *           description: Indique si le vin est naturel ou non
 *         type:
 *           type: string
 *           description: Type de vin
 *           required: true
 *         grape:
 *           type: string
 *           description: Cépage du vin
 *         taste:
 *           type: object
 *           properties:
 *             acidity:
 *               type: number
 *               description: Acidité du vin
 *             fizziness:
 *               type: number
 *               description: Effervescence du vin
 *             intensity:
 *               type: number
 *               description: Intensité du vin
 *             sweetness:
 *               type: number
 *               description: Sucrosité du vin
 *             tannin:
 *               type: number
 *               description: Tannins du vin
 *           description: Caractéristiques gustatives du vin
 *         characteristics:
 *           type: array
 *           items:
 *             type: string
 *           description: Caractéristiques du vin
 *         temperature_service:
 *           type: object
 *           properties:
 *             max:
 *               type: number
 *               description: Température maximale de service du vin
 *             min:
 *               type: number
 *               description: Température minimale de service du vin
 *           description: Plage de température de service du vin
 *         image:
 *           type: string
 *           description: URL de l'image du vin
 *         verified:
 *           type: boolean
 *           description: Indique si le vin est vérifié ou non
 *         type_taste:
 *           type: string
 *           description: Type de goût du vin
 *       required:
 *         - name
 *         - country
 *         - region
 *         - winery
 *         - year
 *         - type
 */
