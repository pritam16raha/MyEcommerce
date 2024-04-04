import JwtServices from "../JWTservices/JwtServices";
import CustomeErrorHandler from "../customError/CustomErrorHandler";

const userAuth = async (req, res, next) => {
    let getAuth = req.headers.authorization;
    console.log(getAuth);

    if(!getAuth){
        return next(CustomeErrorHandler.unauthorisedToken("Access token is invalid"));
    }

    const accessToken = getAuth.split(' ')[1];
    //console.log(accessToken);
    
    //now verifing the token
    try{
        const { _id, role } = await JwtServices.verify(accessToken);
        
        const verifiedUser = {
            _id ,
            role
        }

        req.userInDB = verifiedUser;
        next();


    } catch(err){
        return next(CustomeErrorHandler.unauthorisedToken("Access Token must be tampered"));
    }

}

export default userAuth;