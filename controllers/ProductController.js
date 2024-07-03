import { StatusCodes } from "http-status-codes"
import Product from "../models/Product.js"
import { formatImage } from "../middleware/multerMiddleware.js"
import cloudinary from 'cloudinary';
import { NotFoundError } from "../erros/customError.js";
import Review from "../models/Review.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.js";
import customFetch from "../client/src/utils/customFetch.js";

export const createProduct=async(req,res)=>{
   req.body.featured==='on'? req.body.featured=true :  req.body.featured=false
   req.body.freeShipping==='on'? req.body.freeShipping=true :  req.body.freeShipping=false
req.body.user=req.user.userId
const colorString = req.body.colors; 
const colorArray = colorString.split(',');
    console.log(colorString);
     const file = formatImage(req.file);
        const response = await cloudinary.v2.uploader.upload(file);
        req.body.image = response.secure_url;
        req.body.imagePublicId = response.public_id; 
      req.body.colors=colorArray
   const product=await Product.create(req.body)
   res.status(StatusCodes.OK).json({product})
}


export const getAllProducts = async (req, res) => {
   try {
      const { search, category, company, freeShipping, sort, price, featured } = req.query;
      console.log(req.query.price);

      const userIdString = '664397dd5059a25a98080c1c';
      const userId = new mongoose.Types.ObjectId(userIdString);

      const queryObject = {
         user: userId,
      };

      if (search) {
         queryObject.$or = [{ name: { $regex: search, $options: 'i' } }];
      }

      if (price) {
         queryObject.price = { $gte: 0, $lte: price };
      }

      if (category && category !== 'all') {
         queryObject.category = category;
      }

      if (company && company !== 'all') {
         queryObject.company = company;
      }

      const freeShippingValue = freeShipping === 'on';

      if (freeShippingValue) {
         queryObject.freeShipping = true;
      }

      const featuredValue = featured === 'on';
      if (featuredValue) {
         queryObject.featured = true;
      }

      const sortOptions = {
         'a-z': 'name',
         'z-a': '-name',
         highest: '-price',
         lowest: 'price',
      };

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const sortKey = sortOptions[sort] || sortOptions['a-z'];
      const products = await Product.find(queryObject).sort(sortKey).skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments(queryObject);

      const numOfPages = Math.ceil(totalProducts / limit);
      const categories = await Product.distinct('category');
      const companies = await Product.distinct('company');

     
      res.status(StatusCodes.OK).json({
         products,
         totalProducts,
         numOfPages,
         currentPage: page,
         categories,
         companies,
      });
   } catch (error) {
      console.error('Error fetching products:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
   }
};

export const getSingleProduct=async(req,res)=>{
   const{id:productId}=req.params

   const product=await Product.findById(productId).populate('reviews')

   if(!product){
    throw new NotFoundError(`No product with ${productId}`)
   }

   res.status(StatusCodes.OK).json({product})
}
export const updateProduct=async(req,res)=>{
   const{id:productId}=req.params

   if(req.file){
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    req.body.image = response.secure_url;
    req.body.imagePublicId = response.public_id;
   }

   req.body.featured==='on'? req.body.featured=true :  req.body.featured=false
   req.body.freeShipping==='on'? req.body.freeShipping=true :  req.body.freeShipping=false
req.body.user=req.user.userId
const colorString = req.body.colors; 
const colorArray = colorString.split(',');
req.body.colors=colorArray
   const product=await Product.findOneAndUpdate({_id:productId},req.body,{
     new:true,
    
   })
   if (req.file && product.imagePublicId) {
    await cloudinary.v2.uploader.destroy(product.imagePublicId);
  }


   res.status(StatusCodes.OK).json({msg:'product updated!'})
}





export const deleteProduct=async(req,res)=>{
   const{id:productId}=req.params
   await Review.find({product:productId}).deleteMany()
    await Product.findById(productId).deleteOne()
   res.status(StatusCodes.OK).json({msg:'product removed!!'})
}

