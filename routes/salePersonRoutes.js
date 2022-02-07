import express from 'express'
const router = express.Router()

import {
  createSalePerson,
  deleteSalePerson,
  getAllSalePerson,
  updateSalePerson,
} from '../controllers/salePersonController.js'

router.route('/').post(createSalePerson).get(getAllSalePerson)
// remember about :id
router.route('/:id').delete(deleteSalePerson).patch(updateSalePerson)

export default router
