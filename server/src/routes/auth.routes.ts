import express from "express";
import {
	businessSignup,
	checkAuth,
	deleteAllUsers,
	employeeSignup,
	getAllUsers,
	login,
	logout,
} from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints para autenticação e gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BusinessSignup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *         - businessName
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         businessName:
 *           type: string
 *           description: Nome da empresa
 *     
 *     EmployeeSignup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: Email do funcionário
 *         password:
 *           type: string
 *           description: Senha do funcionário
 *         name:
 *           type: string
 *           description: Nome do funcionário
 *     
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 */

/**
 * @swagger
 * /api/auth/busignup:
 *   post:
 *     summary: Cadastro de empresa
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessSignup'
 *     responses:
 *       201:
 *         description: Empresa cadastrada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/emsignup:
 *   post:
 *     summary: Cadastro de funcionário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeSignup'
 *     responses:
 *       201:
 *         description: Funcionário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/check-auth:
 *   get:
 *     summary: Verificar autenticação do usuário
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário autenticado
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout de usuário
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/deleteAllUsers:
 *   post:
 *     summary: Deletar todos os usuários (Apenas para desenvolvimento)
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Todos os usuários foram deletados
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Obter todos os usuários
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   email:
 *                     type: string
 *                   name:
 *                     type: string
 *                   businessName:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/busignup", businessSignup);
router.post("/emsignup", employeeSignup);
router.post("/login", login);
router.get("/check-auth", verifyToken, checkAuth);
router.post("/logout", logout);
router.post("/deleteAllUsers", deleteAllUsers);
router.get("/users", getAllUsers);


export default router;
