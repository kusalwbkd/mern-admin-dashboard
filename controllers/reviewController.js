import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../erros/customError.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import { checkPermissions } from "../utils/checkPermissions.js";

export const createReview =async(req,res)=>{
   
      req.body.user = req.user.userId;
      const review = await Review.create(req.body);
      res.status(StatusCodes.CREATED).json({ review });
}

export const getAllReviews   =async(req,res)=>{
   const reviews=await Review.find({ }).populate({path:'product',select:'name company price'})

   res.status(StatusCodes.OK).json({reviews,count:reviews.count})
}

export const getSingleReview =async(req,res)=>{
   const{id:reviewId}=req.params
   
   const review=await Review.findById(reviewId)

  
 
   res.status(StatusCodes.OK).json({review})
}

export const updateReview =async(req,res)=>{
    const{id:reviewId}=req.params
   const{rating,title,comment}=req.body
    const review=await Review.findById(reviewId)
 
   
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save()
 
    res.status(StatusCodes.OK).json({review})
}

export const deleteReview=async(req,res)=>{
    const{id:reviewId}=req.params

   await Review.findOneAndDelete({_id:reviewId})
  
   res.status(StatusCodes.OK).json({msg:'review deleted'})
}

export const getSingleProductReview=async(req,res)=>{
    const{id:productId}=req.params

    const reviews=await Review.find({product:productId})

    res.status(StatusCodes.OK).json({reviews})
}