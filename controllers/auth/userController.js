import { UserModel } from "../../models";

const userController = {
    async getUser(req, res, next){
        try{
            const user = await UserModel.findOne({ _id: req.body._id })
        }catch(err){
            return next(err);
        }
    }
}

export default userController;