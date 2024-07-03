import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";
import Sale from "../models/Sales.js";
import { NotFoundError } from "../erros/customError.js";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import day from 'dayjs';
import User from "../models/User.js";


export const getTotalSale=async(req,res)=>{
    

    const totalProducts=await Product.countDocuments({})
    const numOfUsers = await User.countDocuments({ role: "user" });
    const numOfOrders=await Order.countDocuments({})
    const outOfInventoryItems=await Product.countDocuments({inventory:0})
   
    const totalItemsSales=await Sale.aggregate([
       
        {$group:{
            _id:null,
            total_Sale_items:{$sum:"$numOfItems"}
        }},
    
       ])
    
       const totalItemsSalesCost=await Sale.aggregate([
       
        {$group:{
            _id:null,
            total_Sale_items_cost:{$sum:"$total"}
        }},
    
       ])
    
    
        let monthlyItemSales=await Sale.aggregate([
           
            {$group:{
                _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
                count:{$sum:"$numOfItems"}
            }},
            {
                $sort:{'_id.year':-1,'_id.month':-1}
            },
            {
                $limit:6
            }
        ])
    
        monthlyItemSales=monthlyItemSales.map((item)=>{
            const{_id:{year,month},count}=item
            const date=day().month(month-1).year(year).format('MMM YY')
            return{date,count}
        }).reverse()
    
    
        let monthlySalesCost=await Sale.aggregate([
          
            {$group:{
                _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
                sales:{$sum:"$total"}
            }},
            {
                $sort:{'_id.year':-1,'_id.month':-1}
            },{
                $limit:6
            }
        ])
    
        monthlySalesCost=monthlySalesCost.map((item)=>{
            const{_id:{year,month},sales}=item
            const date=day().month(month-1).year(year).format('MMM YY')
            return{date,sales}
        }).reverse()

    res.status(StatusCodes.OK).json({totalItemsSales,totalItemsSalesCost,monthlyItemSales,monthlySalesCost,outOfInventoryItems,totalProducts,numOfUsers,numOfOrders})
}

export const getSingleProductSale=async(req,res)=>{
    const productId=req.params.id 

    const product=await Product.findById({_id:productId})
    const inventory=product.inventory
    const productName=product.name
    const reviewsCount=product.numOfReviews
  
    if(!product){
        throw new NotFoundError(`No item with productid ${productId}`)
    }
   
   const totalItemsSales=await Sale.aggregate([
    {$match:{ sales_item: new mongoose.Types.ObjectId(productId) }},
    {$group:{
        _id:null,
        total_Sale_items:{$sum:"$numOfItems"}
    }},

   ])

   const totalItemsSalesCost=await Sale.aggregate([
    {$match:{ sales_item: new mongoose.Types.ObjectId(productId) }},
    {$group:{
        _id:null,
        total_Sale_items_cost:{$sum:"$total"}
    }},

   ])


    let monthlyItemSales=await Sale.aggregate([
        {$match:{ sales_item: new mongoose.Types.ObjectId(productId) }},
        {$group:{
            _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
            count:{$sum:"$numOfItems"}
        }},
        {
            $sort:{'_id.year':-1,'_id.month':-1}
        },
        {
            $limit:6
        }
    ])

    monthlyItemSales=monthlyItemSales.map((item)=>{
        const{_id:{year,month},count}=item
        const date=day().month(month-1).year(year).format('MMM YY')
        return{date,count}
    }).reverse()


    let monthlySalesCost=await Sale.aggregate([
        {$match:{ sales_item: new mongoose.Types.ObjectId(productId) }},
        {$group:{
            _id:{year:{$year:'$createdAt'},month:{$month:'$createdAt'}},
            sales:{$sum:"$total"}
        }},
        {
            $sort:{'_id.year':-1,'_id.month':-1}
        },{
            $limit:6
        }
    ])

    monthlySalesCost=monthlySalesCost.map((item)=>{
        const{_id:{year,month},sales}=item
        const date=day().month(month-1).year(year).format('MMM YY')
        return{date,sales}
    }).reverse()

    res.status(StatusCodes.OK).json({monthlyItemSales,monthlySalesCost,totalItemsSales,totalItemsSalesCost,inventory,productName,reviewsCount})
}