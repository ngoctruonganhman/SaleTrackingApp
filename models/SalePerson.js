import mongoose from 'mongoose'

const SalePersonSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 50,
    },
    lastName: {
      type: String,
      maxlength: 100,
    },
    address: {
      type: String,
      maxlength: 50,
    },
    phone: {
      type: String,
      maxlength: 50,
    },
    startDate: {
      type: String,
      maxlength: 50,
    },
    terminationDate: {
      type: String,
      maxlength: 50,
    },
    manager: {
      type: String,
      enum: ['Stan Hu', 'Olivier Chaine', 'Niti Nguyen'],
      default: 'Stan Hu',
      maxlength: 50,
    },

    
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('SalePerson', SalePersonSchema)
