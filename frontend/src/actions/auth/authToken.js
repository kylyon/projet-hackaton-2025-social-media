//DEPRECIER

/*const generateToken = (userId, userAgent) => {
    const salt = crypto.randomBytes(16)
    const hash = crypto.createHmac("sha512", salt).update(userId+userAgent).digest("hex");
    return {salt: salt.toString("hex"), hash}
}

export const createAuthToken = async (userId, userAgent, ttl = 3600) =>
{
    const tokenId = generateToken(userId, userAgent).hash;
    const expiresAt = Date.now() * 1000 * ttl

    try
    {
        return {tokenId, expiresAt}
    }catch(error)
    {
        console.error("Error", error)
    }
    
}*/

export const getAuthToken = async () => 
{
    const res = await fetch("https://hackaton-backend-api.vercel.app/auth/get_token", {
        method: "post",
        body: JSON.stringify({
            tokenId : (await window.cookieStore.get("auth_token")).value
        }),
        headers: 
        {
        "Access-Control-Allow-Origin" : "*",
        "Content-type" : "application/json"

        }
    })

    if(res.ok)
    {
        return res.json()
    }

    return false
}