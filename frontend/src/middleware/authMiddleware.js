import { getAuthToken } from "@/actions/auth/authToken"

export const authMiddleware = async (to, from, next, cookies) =>
{

    /*console.log(to, from, cookies)
    return next()*/
    const token = cookies.get("auth_token")

    if(!token)
    {
        console.log({message: "Token manquant"})
        
        return next({
            name: "login"
        })
    }

    const entry = await getAuthToken();
    if(!entry)
    { 
        console.log({message: "Token invalide"})

        return next({
            name: "login"
        })
    }

    if(Date.now() > entry.expiresAt)
    {
        console.log({message: "Token expiré"})
        
        await logoutAction();

        return next({
            name: "login"
        })
    }

    to.user = entry.token.user

    //req.user = entry.user;
    return next()
}

export const isLogged = async () =>
{
    const token = await getAuthToken()

    console.log(token)

    //return token ? token.token.user : false
}

