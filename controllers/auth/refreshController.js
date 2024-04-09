import Joi from "joi";
import CustomeErrorHandler from "../../customError/CustomErrorHandler";
import { refreshTokenModel } from "../../models";

const refreshController = {
    async refreshMethod(req, res, next){
        //login validation using Joi
        const refreshSchema = Joi.object({
            Ref_Token_From_Db: Joi.string().required(),
        });

        const { error } = refreshSchema.validate(req.body);

        if(error){
            return next(CustomeErrorHandler.voidToken("Token may be Void or Tempared"));
        }

        let refreshToken;
        try{
            refreshToken = await refreshTokenModel.findOne({ Ref_Token: req.body.Ref_Token_From_Db });
            if(!refreshToken){
                return next(CustomeErrorHandler.voidToken('Token doesnt match with DB token'));
            }
        }catch(err){
            return next(new Error((err.message)));
        }
    }
}

export default refreshController;