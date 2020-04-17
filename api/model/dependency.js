/**
 * @swagger
 * tags:
 *   name: dependencies
 *   description: Manipulation des dependencies
 */

/**
 * @swagger
 * paths:
 *   '/dependencies':
 *     get:
 *       tags:
 *         - dependencies
 *       summary: "Récupération de tous les dependencies"
 *       description: "Récupération de tous les dependencies de la base"
 *       responses:
 *         '200':
 *           description: OK
 *   '/dependency/{idJob}':
 *     get:
 *       tags:
 *         - dependencies
 *       summary: "Affichage des jobs dont dépend un job choisi"
 *       description: "Affichage des jobs dont dépend un job choisi"
 *       parameters:
 *         - in: path
 *           name: idJob
 *           description: l'identifiant du job dont on veut récupérer les jobs dont il dépend
 *           required: true
 *           schema:
 *             type: integer                 
 *       responses:
 *         '200':
 *           description: OK
 *   '/dependency':
 *     put:
 *       tags:
 *         - dependencies
 *       summary: "Ajout d'une dependency"
 *       description: "Permet de rajouter une dépendance entre 2 jobs"
 *       requestBody:
 *         description: id des jobs concernés
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 from_id:
 *                   type: integer
 *                 to_id:
 *                   type: integer
 *                 
 *       responses:
 *         '200':
 *           description: OK
 */
