import { getAuthToken } from "@/actions/auth/authToken"

export const authMiddleware = async (to, from, next, cookies) =>
{
    
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

    if(to.meta.requiredAdmin && to.user.role !== "admin")
    {
        return next({
            name: "profile"
        }) 
    }

    //req.user = entry.user;
    return next()
}

export const loggedMiddleware = async (to, from, next, cookies) =>
{
    const token = cookies.get("auth_token")

    if(token)
    {
        return next({
            name: "profile"
        })
    }

    return next()
}

export const adminMiddleware = async (to, from, next, cookies) =>
{

    const token = cookies.get("auth_token")


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

