import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"
import { checkPermissions } from "../utils/checkPermissions.js"
import { BadRequestError } from "../erros/customError.js"
import { hashPassword } from "../utils/passwordUtils.js"

export const getAllUsers=async(req,res)=>{
    const totalUsers=await User.countDocuments({role:"user"})
   
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const numOfPages = Math.ceil(totalUsers / limit);
    const users=await User.find({role:"user"}).skip(skip).limit(limit).sort({createdAt:"-1"}).populate("orders").select("-password")

    res.status(StatusCodes.OK).json({users,numOfPages,currenPage:page,totalUsers})
}


export const getSingleUser=async(req,res)=>{
    const user=await User.findById(req.params.id).populate('reviews').select("-password")
    res.status(StatusCodes.OK).json({user})
}

export const showMe=async(req,res)=>{
    const user=await User.findById(req.user.userId).select("-password").populate('reviews')
    res.status(StatusCodes.OK).json({user})
}

export const updateUser=async(req,res)=>{
    const{email,newpassword,oldPassword,location,lastName}=req.body
    const user=await User.findById(req.user.userId)
    checkPermissions(req.user,user.user)

    if(newpassword && !oldPassword){
    throw new BadRequestError('please provide the old password')
    }

    if(!newpassword && oldPassword){
        throw new BadRequestError('please provide the new password')
    }

    if(newpassword){
        const hashedPassword=await hashPassword(newpassword)
     
        user.password=hashedPassword;
        await user.save()
        res.status(StatusCodes.OK).json({msg:'Password changed !!!'})
    }
    user.location = location || user.location;
		user.email = email || user.email;
		user.lastName = lastName || user.lastName;
		await user.save()

        user.password=null
        res.status(StatusCodes.OK).json({user})
}