
import Product from "../models/Product.js";
import { BadRequestError, NotFoundError } from "../erros/customError.js";
import Order from "../models/Order.js";
import { StatusCodes } from "http-status-codes";
import Stripe from "stripe";



export const createOrder =async(req,res)=>{
    
    const { items: cartItems, tax, shippingFee } = req.body;
    if(!cartItems || cartItems.length <1){
    throw new BadRequestError('No cart item provided')
    }

    if(!tax || !shippingFee){
        throw new BadRequestError('please provide tax and shipping fee')
    }

    let orderItems=[]

    let subtotal=0

    for(const item of cartItems){
      const dbProduct=await Product.findById(item.product)
     
      if(!dbProduct){
         throw new NotFoundError(`No product with ${item.product}`)
      }
     
      const{name,price,image,_id}=dbProduct
     const singleProductItem={
        amount:item.amount,
        name,
        price,
        image,
        product:_id
     }
orderItems=[...orderItems,singleProductItem]

subtotal +=item.amount*price

    }
  
    const total=subtotal+shippingFee+tax
   
  

     const order = await Order.create({
        orderItems,
        total,
        subtotal,
        tax,
        shippingFee,
        
        user: req.user.userId,
      }); 
    
     res.status(StatusCodes.OK).json({msg:'order placed',order})
}
     export const getAllOrders =async(req,res)=>{
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      const totalOrders = await Order.countDocuments({})

      const numOfPages = Math.ceil(totalOrders / limit);
   const orders=await Order.find({}).populate("user").skip(skip).limit(limit).sort({createdAt:"-1"});
   res.status(StatusCodes.OK).json({orders,numOfPages,currentPage:page})
}

export const getSingleOrder =async(req,res)=>{
    const{id:orderId}=req.params

    const order=await Order.findById(orderId).populate("user")
    if(!order){
    throw new NotFoundError(`No order with ${orderId}`)
    }
    res.status(StatusCodes.OK).json({order})
}

export const updateOrder =async(req,res)=>{
    const{status}=req.body
    const{id:orderId}=req.params

    const order=await Order.findById({_id:orderId})
    if(!order){
    throw new NotFoundError(`No order with ${orderId}`)
    }
    order.status=status;
    order.save()
    res.status(StatusCodes.OK).json({msg:'order updated!!!!'})
}


export const getCurrentUserOrders=async(req,res)=>{
  const orders=await Order.find({user:req.user.userId})
  res.status(StatusCodes.OK).json({orders})
}