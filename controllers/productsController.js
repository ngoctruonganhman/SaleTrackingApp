import Product from '../models/Product.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createProduct = async (req, res) => {
  const { name, manufacturer } = req.body
  const productAlreadyExists = await Product.findOne({name})
  if (productAlreadyExists) {
    throw new BadRequestError('Product already exists')
  }
  if (!name || !manufacturer) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}
const getAllProducts = async (req, res) => {
  const { status, sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = Product.find(queryObject)

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result

  const totalProducts = await Product.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalProducts / limit)

  res.status(StatusCodes.OK).json({ products, totalProducts, numOfPages })
}
const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const { name, manufacturer } = req.body

  if (!manufacturer || !name) {
    throw new BadRequestError('Please provide all values')
  }
  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id :${productId}`)
  }
  // check permissions

  checkPermissions(req.user, product.createdBy)

  const updateProducts = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updateProducts })
}
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params

  const product = await Product.findOne({ _id: productId })

  if (!product) {
    throw new NotFoundError(`No product with id :${productId}`)
  }

  checkPermissions(req.user, product.createdBy)

  await product.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! product removed' })
}
const showStats = async (req, res) => {
  let stats = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  let saleCommission = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
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

  res.status(StatusCodes.OK).json({ defaultStats, saleCommission })
}

export { createProduct, deleteProduct, getAllProducts, updateProduct, showStats }
