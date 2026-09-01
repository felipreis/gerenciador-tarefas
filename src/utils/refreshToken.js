import { v4 }  from 'uuid'
import 'dotenv/config'

//vai ser necessário guardar os tokens refresh(ideal é guardar em db)
const refreshTokens = {};

function generateRefreshToken(userId){

    const token =  v4();
    // guardar o usuário que é dono do token
    refreshTokens[token] = userId;

    //"asdasd":"user_123"

    //limpeza de todos refresh tokens que exista para um mesmo usuário (não pode emitir mais de um para um usuário)
    Object.keys(refreshTokens).forEach(t => {
        //caso tenha dois refresh token distintos com mesmo userId, remove o anterior
        if( t !== token && refreshTokens[t] === userId){
            //limpa outro existente
            delete refreshTokens[t];
        }
    });

    //rotina de limpeza do refresToken
    setTimeout(()=> {delete refreshTokens[token]},parseInt(process.env.REFRESH_EXPIRES_IN))

    return token;
}

function getUserIdByToken(token){
    const userId = refreshTokens[token];
    return userId;
}

export default {
    generateRefreshToken,
    getUserIdByToken
}