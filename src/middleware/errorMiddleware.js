import AppError from "../model/AppError.js";

function errorMidlaware (err,req,res,next){

    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : 'Erro do Servidor' 

    return res.status(status).json({message: message})

}

export default {
    errorMidlaware
}