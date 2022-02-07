import mongoose from 'mongoose'

const SaleSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: [true, 'Please provide product'],
      maxlength: 50,
    },
    salePerson: {
      type: String,
      required: [true, 'Please provide sale person'],
      maxlength: 100,
    },
    customerFirstName: {
      type: String,
      maxlength: 50,
    },
    customerLastName: {
      type: String,
      maxlength: 50,
    },
    customerAddress: {
      type: String,
      maxlength: 50,
    },
    customerPhone: {
      type: String,
      maxlength: 50,
    },
    customerStartDate: {
      type: String,
      maxlength: 50,
    },
    commissionRate: {
      type: String,
      enum: ['5%', '10%', '15%', '20%', '30%'],
      default: '5%',
    },
    salesDate: {
      type: String,
      maxlength: 100,
    },
    
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Sale', SaleSchema)
