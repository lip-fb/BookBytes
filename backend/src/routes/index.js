const Router = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const tradeController = require('../controller/tradeController')
const transactionHistoryController = require('../controller/transactionHistoryController')
const reviewController = require('../controller/reviewController')
const chatController = require('../controller/chatController')
const loginController = require('../controller/loginController')

const router = Router()


// Login route
router.post('/login', loginController.login);

// Para operações relacionadas ao usuário
router.get(("/usuarios"), userController.getAllUsers) 
router.post(("/usuarios"), userController.createUser)
router.put(("/usuarios/:id"), userController.updateUser)
router.delete(("/usuarios/:id"), userController.deleteUser)

// Para operações relacionadas a livros
router.get(("/livros"), bookController.getAllBooks) 
router.post(("/livros"), bookController.createBook)
router.put(("/livros/:id"), bookController.updateBook)
router.delete(("/livros/:id"), bookController.deleteBook)

// Para operações relacionadas a trocas
router.get(("/trocas"), tradeController.getAllTrades)
router.post(("/trocas"), tradeController.createTrade)
router.put(("/trocas/:id"), tradeController.updateTrade)
router.delete(("/trocas/:id"), tradeController.deleteTrade)

// Para operações relacionadas ao histórico de transações
router.get(("/historicoTransacoes"), transactionHistoryController.getAllTransactions)
router.post(("/historicoTransacoes"), transactionHistoryController.createTransaction)
router.put(("/historicoTransacoes/:id"), transactionHistoryController.updateTransaction)
router.delete(("/historicoTransacoes/:id"), transactionHistoryController.deleteTransaction)

// Para operações relacionadas a avaliações
router.get(("/avaliacoes"), reviewController.getAllReviews)
router.post(("/avaliacoes"), reviewController.createReview)
router.put(("/avaliacoes/:id"), reviewController.updateReview)
router.delete(("/avaliacoes/:id"), reviewController.deleteReview)

// Para operações relacionadas a mensagens de chat
router.get(("/mensagenschat"), chatController.getAllMessages)
router.post(("/mensagenschat"), chatController.createMessage)

module.exports = router