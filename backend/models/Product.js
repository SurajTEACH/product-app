import mongoose from "mongoose";

const  productSchema = new  mongoose.Schema({
       name:{
             type:String,
             required:true
       },
       price:{
              type:Number,
              required:true
       },
       user:{
             type:mongoose.Schema.Types.ObjectId,
             ref:'User'
       }
}

,{timestamps:true});


productSchema.index({
       name:1,
       user:1
},{unique:true});


export default mongoose.model('Product',productSchema);