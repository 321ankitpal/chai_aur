import {Router} from "express"
import { registeruser } from "../controller/user.controller.js";

const router =Router();


router.route("/register").post(registeruser)
// router.rooute('/login').post(login)
export default router;