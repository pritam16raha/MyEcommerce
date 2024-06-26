import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomeErrorHandler from "../customError/CustomErrorHandler";

const errorHandler = (err, req, res, next ) => {
    let statusCode = 500;
    let errorData = {
        message: 'Internal Server Error',
        ...(DEBUG_MODE==="true" && {originalError: err.message})
    }

    if(err instanceof ValidationError){
        statusCode = 422;
        errorData={
            message: err.message,
        }
    }

    if(err instanceof CustomeErrorHandler){
        statusCode= err.status;
        errorData = {
            message: err.message
        }
    }

    return res.status(statusCode).json(errorData);
}

export default errorHandler;