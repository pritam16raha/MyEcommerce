import Joi from "joi";
import { UserModel } from "../../models";
import CustomeErrorHandler from "../../customError/CustomErrorHandler";
import bcrypt from 'bcrypt';

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
            const user = await UserModel.exists({ email: req.body.email });

            if(!user){
                return next(CustomeErrorHandler.WrongEmail("Email is not valid"))
            }

            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if(!passwordMatch){
                return next(CustomeErrorHandler.WrongPassword("password is wrong"));
            }
        }catch(err){
            return next(err);
        }
    }
}

export default loginController;