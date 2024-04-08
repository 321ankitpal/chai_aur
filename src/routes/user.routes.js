import {Router} from "express"
import { registeruser } from "../controller/user.controller.js";
import {upload} from "../middleware/multer.js";

const router =Router();


router.route("/register").post(
    upload.fields([
        {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    },
]),
    
    registeruser)
// router.rooute('/login').post(login)






export default router;