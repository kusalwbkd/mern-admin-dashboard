import { UnauthorizedError } from "../erros/customError.js";

export const checkPermissions=(requestUser, resourceUserId)=>{
    if (requestUser.role === 'admin') return;
    if (requestUser.userId === resourceUserId.toString()) return;
    throw new UnauthorizedError(
      'Not authorized to access this route'
    );
  };
  
