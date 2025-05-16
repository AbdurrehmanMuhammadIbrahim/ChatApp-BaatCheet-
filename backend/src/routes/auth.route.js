import express from 'express';
import { checkAuth, login, logout, signup, userProfile } from '../controllers/auth.controller.js';
import { protectRoute } from "../middleware/auth.middleware.js";



const app = express();

const router = express.Router();
app.use(express.json());

router.post('/signup',signup);

router.post('/login',login);
// router.route("/login").get((req, response) =>{
//     response.send("Login route")
// })

   router.post('/logout', logout);
   router.put("/update-profile", protectRoute, userProfile);

   router.get("/check", protectRoute, checkAuth);


export default router;