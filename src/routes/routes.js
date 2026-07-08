import express from 'express'
import UserController from '../controller/UserController.js'
import AuthController from  '../controller/AuthController.js'
import authToken from '../middleware/authToken.js';
import ProjectController from '../controller/ProjectController.js';
import TaskController from '../controller/TaskController.js'
import DashboardController from '../controller/DashboardController.js';

const router = express.Router();

router.get('/health',(req,res) => {
    res.status(200).json({message: "API online"})
})

// AUTH

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: felipe@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso — retorna o token JWT
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/auth/login', AuthController.login)

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário logado
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/auth/me', authToken, AuthController.me)

// USERS 

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Felipe
 *               email:
 *                 type: string
 *                 example: felipe@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/users', UserController.create)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/users', authToken, UserController.getAll)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/users/:id', authToken, UserController.getById)

/**
 * @swagger
 * /users/email:
 *   post:
 *     summary: Busca um usuário pelo email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: felipe@email.com
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Token inválido ou ausente
 */
router.post('/users/email', authToken, UserController.getByEmail)

// PROJECTS 

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gerenciador de Tarefas
 *               description:
 *                 type: string
 *                 example: Aplicação para gerenciar tarefas por projeto
 *     responses:
 *       200:
 *         description: Projeto criado com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/projects', authToken, ProjectController.create)

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Lista todos os projetos do usuário autenticado
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/projects', authToken, ProjectController.getAllProjects)

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Busca um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do projeto
 *     responses:
 *       200:
 *         description: Projeto encontrado
 *       404:
 *         description: Projeto não encontrado
 *       403:
 *         description: Sem permissão para acessar este projeto
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/projects/:id', authToken, ProjectController.getProjectById)

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Atualiza um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Novo nome do projeto
 *               description:
 *                 type: string
 *                 example: Nova descrição do projeto
 *     responses:
 *       200:
 *         description: Projeto atualizado com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       403:
 *         description: Sem permissão para atualizar este projeto
 *       401:
 *         description: Token inválido ou ausente
 */
router.put('/projects/:id', authToken, ProjectController.updateProject)

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Exclui um projeto pelo ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do projeto
 *     responses:
 *       200:
 *         description: Projeto excluído com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       403:
 *         description: Sem permissão para excluir este projeto
 *       401:
 *         description: Token inválido ou ausente
 */
router.delete('/projects/:id', authToken, ProjectController.deleteProjects)

// TASKS 

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - priority
 *               - dueDate
 *               - projectId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Implementar autenticação
 *               description:
 *                 type: string
 *                 example: Criar fluxo de login com JWT
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *                 example: high
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-01"
 *               projectId:
 *                 type: string
 *                 example: "bf5ff8b5-ae3b-44f4-961a-20c62b122d0d"
 *     responses:
 *       200:
 *         description: Tarefa criada com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       403:
 *         description: Sem permissão para criar tarefa neste projeto
 *       401:
 *         description: Token inválido ou ausente
 */
router.post('/tasks', authToken, TaskController.create)

/**
 * @swagger
 * /tasks/project/{projectId}:
 *   get:
 *     summary: Lista todas as tarefas de um projeto
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID do projeto
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       403:
 *         description: Sem permissão para acessar este projeto
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/tasks/project/:projectId', authToken, TaskController.getAllTask)

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Busca uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 *       403:
 *         description: Sem permissão para acessar esta tarefa
 *       401:
 *         description: Token inválido ou ausente
 */
router.get('/tasks/:taskId', authToken, TaskController.getTaskById)

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Atualiza uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Novo título da tarefa
 *               description:
 *                 type: string
 *                 example: Nova descrição
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, completed, canceled]
 *                 example: in_progress
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high, urgent]
 *                 example: medium
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-12-31"
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       403:
 *         description: Sem permissão para atualizar esta tarefa
 *       401:
 *         description: Token inválido ou ausente
 */
router.put('/tasks/:taskId', authToken, TaskController.updateTask)

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Exclui uma tarefa pelo ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 *       403:
 *         description: Sem permissão para excluir esta tarefa
 *       401:
 *         description: Token inválido ou ausente
 */
router.delete('/tasks/:taskId', authToken, TaskController.deleteTask)

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: informações para dashboard
 *     tags: [Dash]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados para dashboard encontrados
 *       500:
 *         description: Problema no servidor
 */
router.get('/dashboard',authToken, DashboardController.dashView)

export default router;