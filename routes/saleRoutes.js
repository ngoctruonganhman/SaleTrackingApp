import express from 'express'
const router = express.Router()

import {
  createSale,
  deleteSale,
  getAllSale,
  showStats,
} from '../controllers/saleController.js'

router.route('/').post(createSale).get(getAllSale)
// remember about :id
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteSale)

export default router
