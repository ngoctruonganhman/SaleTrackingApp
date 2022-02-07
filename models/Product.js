import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    manufacturer: {
      type: String,
      required: [true, 'Please provide manufacturer'],
      maxlength: 50,
    },
    name: {
      type: String,
      required: [true, 'Please provide productName'],
      maxlength: 100,
    },
    purchasePrice: {
      type: String,
      required: [true, 'Please provide purchasePrice'],
      maxlength: 100,
    },
    
    salePrice: {
      type: String,
      required: [true, 'Please provide salePrice'],
      maxlength: 100,
    },

    quantity: {
      type: String,
      required: [true, 'Please provide quantity'],
      required: true,
    },
    style: {
      type: String,
      required: [true, 'Please provide salePrice'],
      required: true,
    },
    
    commissionRate: {
      type: String,
      enum: ['5%', '10%', '15%', '20%', '30%'],
      default: '5%',
    },
   
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)
