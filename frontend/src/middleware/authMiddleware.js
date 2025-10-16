import { getAuthToken } from "@/actions/auth/authToken"

export const authMiddleware = async (to, from, next, cookies) =>
{

    /*console.log(to, from, cookies)
    return next()*/
    const token = cookies.get("auth_token")

    if(!token)
    {
        console.log({message: "Token manquant"})
        //res.status(400).json({message: "Token manquant"});
        return next({
            name: "login"
        })
    }

    const entry = await getAuthToken(token);
    if(!entry)
    { 
        console.log({message: "Token invalide"})
        //res.status(400).json({message: "Token invalide"});
        return next({
            name: "login"
        })
    }

    if(Date.now() > entry.expiresAt)
    {
        console.log({message: "Token expiré"})
        //await AuthToken.deleteAuthToken(token);
        //res.status(400).json({message: "Token expiré"});
        return next({
            name: "login"
        })
    }

    //req.user = entry.user;
    return next()
}

