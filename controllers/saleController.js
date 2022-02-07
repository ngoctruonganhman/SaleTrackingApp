import Sale from '../models/Sale.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createSale = async (req, res) => {

  const { product, salePerson } = req.body

  if (!product || !salePerson) {
    throw new BadRequestError('Please provide all values')
  }

  req.body.createdBy = req.user.userId
  const person = await Sale.create(req.body)
  res.status(StatusCodes.CREATED).json({ person })
}
const getAllSale = async (req, res) => {
  const {  sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
//   add stuff based on condition

  if (search) {
    queryObject.product= { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Sale.find(queryObject)

  // chain sort conditions

  if (sort === 'a-z') {
    result = result.sort('product')
  }
  if (sort === 'z-a') {
    result = result.sort('-product')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const saleList = await result

  const totalSale = await Sale.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalSale / limit)

  res.status(StatusCodes.OK).json({ saleList, totalSale, numOfPages })
}
const deleteSale = async (req, res) => {
  const { id } = req.params

  const sale = await Sale.findOne({ _id: id })

  if (!sale) {
    throw new NotFoundError(`No sale with id :${id}`)
  }

  checkPermissions(req.user, sale.createdBy)

  await sale.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Sale person removed' })
}
const showStats = async (req, res) => {
  let stats = await Sale.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$salePerson', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})
  console.log('@@@@ stats: ', stats)
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }
  
  let saleCommission = await Sale.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    // { $sort: { '_id.year': -1, '_id.month': -1 } },

  ])
  saleCommission = saleCommission
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ stats, saleCommission })
}

export { createSale, deleteSale, getAllSale , showStats}
