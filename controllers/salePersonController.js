import SalePerson from '../models/SalePerson.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createSalePerson = async (req, res) => {
  const { firstName, lastName } = req.body
  const salePersonAlreadyExists = await SalePerson.findOne({firstName, lastName})
  if (salePersonAlreadyExists) {
    throw new BadRequestError('Sale person already exists')
  }
  if (!firstName || !lastName) {
    throw new BadRequestError('Please provide all values')
  }

  req.body.createdBy = req.user.userId
  const person = await SalePerson.create(req.body)
  res.status(StatusCodes.CREATED).json({ person })
}
const getAllSalePerson = async (req, res) => {
  const {  sort, search } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
//   add stuff based on condition

  if (search) {
    queryObject.firstName = { $regex: search, $options: 'i' }
  }
  // NO AWAIT

  let result = SalePerson.find(queryObject)

  // chain sort conditions

  if (sort === 'a-z') {
    result = result.sort('firstName')
  }
  if (sort === 'z-a') {
    result = result.sort('-firstName')
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const salePersonList = await result

  const totalSalePerson = await SalePerson.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalSalePerson / limit)

  res.status(StatusCodes.OK).json({ salePersonList, totalSalePerson, numOfPages })
}
const updateSalePerson = async (req, res) => {
  const { id } = req.params
  const { lastName, firstName } = req.body

  if (!firstName || !lastName) {
    throw new BadRequestError('Please provide all values')
  }
  const salePerson = await SalePerson.findOne({ _id: id })

  if (!salePerson) {
    throw new NotFoundError(`No salePerson with id :${id}`)
  }
  // check permissions

  checkPermissions(req.user, salePerson.createdBy)

  const updatedSalePerson = await SalePerson.findOneAndUpdate({ _id : id }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedSalePerson })
}
const deleteSalePerson = async (req, res) => {
  const { id } = req.params

  const salePerson = await SalePerson.findOne({ _id: id })

  if (!salePerson) {
    throw new NotFoundError(`No salePerson with id :${id}`)
  }

  checkPermissions(req.user, salePerson.createdBy)

  await salePerson.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Sale person removed' })
}

export { createSalePerson, deleteSalePerson, getAllSalePerson, updateSalePerson }
