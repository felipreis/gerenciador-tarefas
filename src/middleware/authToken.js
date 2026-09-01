import jwt from "jsonwebtoken";
import 'dotenv/config'


function authToken(req,res,next){

    //captando token do header e retirando espaço e Bearer
    const headerToken = req.headers['authorization']
    const auth = headerToken?.split(' ')[1];

    if(!auth){return res.status(401).json({message: 'Não autorizado'})}

    // verificando token jwt
    jwt.verify(auth,process.env.JWT_SECRET, (err,user) => {
        if(err){ return res.sendStatus(401) }
        req.user = user
        // passando para próxima rota
        next();
    })

}

export default authToken;