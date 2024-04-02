import Joi from "joi";
import { UserModel } from "../../models";
import CustomeErrorHandler from "../../customError/CustomErrorHandler";
import bcrypt from 'bcrypt';
import JwtServices from "../../JWTservices/JwtServices";

const loginController = {
    async login(req, res, next){
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });

        const {error} = loginSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
            
            const user = await UserModel.findOne({ email: req.body.email });

            if(!user){
                return next(CustomeErrorHandler.WrongEmail("Email is not registerd, please create an account first"))
            }
            //console.log(user)
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
            if(!passwordMatch){
                return next(CustomeErrorHandler.WrongPassword("password is wrong"));
            }

            //generating acess token/refresh token for the user now
            const accessToken = JwtServices.sign({_id: user.id, role: user.role});
            //console.log(accessToken)
            res.json({accessToken: accessToken})


        }catch(err){
            return next(err);
        }
    }
}

export default loginController;