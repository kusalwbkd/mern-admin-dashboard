import { Router } from "express";
import { getNotifications, updateNotification } from "../controllers/notificationController.js";
import { authorizePermissons } from "../middleware/authMiddleware.js";

const router=Router()

router.route('/').get(authorizePermissons,getNotifications)
router.route('/:id').patch(authorizePermissons,updateNotification)

export default router