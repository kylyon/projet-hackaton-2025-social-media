import { hashPassword } from "../../../utils/getCrypto.js"

const loginAction = async (usernameInput, password) => 
{
    const hashedPassword = await hashPassword(password)

    console.log(hashedPassword)

    const res = await fetch("http://localhost:3000/auth/login", {
    method: "post",
    body: JSON.stringify({
      usernameInput,
      hashedPassword
    }),
    headers:
    {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json"

    }
  })

  const json = await res.json()
  
  if (res.ok) {
    window.cookieStore.set({
        name: "auth_token",
        value: json.user.token.tokenId,
        expires: Date.now() + 3600 * 1000

    })
    return json
  }
  return {res, json}
}

const registerAction = async (registerInfo) =>
{

    const password = await hashPassword(registerInfo.get("password"))
    registerInfo.set("password",password)

    const res = await fetch("http://localhost:3000/auth/register", {
        method: "post",
        body: registerInfo,
        headers:
        {
        "Access-Control-Allow-Origin": "*",

        }
    })

    return res
}

const logoutAction = async () => {
    try {
        const token = await window.cookieStore.get("auth_token")

        if(!token) return;

        const res = await fetch("http://localhost:3000/auth/logout", {
            method: "post",
            headers: 
            {
            "Access-Control-Allow-Origin" : "*",
            "Authorization" : "Bearer " + token.value

            }
        })

        const json = await res.json()
        if(res.ok)
        {
            //console.log(json)

            if(json.user)
            {
                window.cookieStore.delete("auth_token")
            }

            return true;
        }

        //console.error(json);

        return false
    } catch (error) {
        console.error(error)
    }
}

export {
    loginAction, 
    registerAction,
    logoutAction
}