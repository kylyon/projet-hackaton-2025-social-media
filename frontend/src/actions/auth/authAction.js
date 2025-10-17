import { hashPassword } from "@/utils/getCrypto.js"

const loginAction = async (usernameInput, password) => 
{
    const hashedPassword = await hashPassword(password)

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
  //console.log(json)
  if (res.ok) {
    window.cookieStore.set({
        name: "auth_token",
        value: json.user.token.tokenId,
        expires: Date.now() + 3600 * 1000

    })
    return json
  }
  return false
}

const registerAction = async (registerInfo) =>
{

    registerInfo.password = await hashPassword(registerInfo.password)

    const res = await fetch("http://localhost:3000/auth/register", {
        method: "post",
        body: JSON.stringify(registerInfo),
        headers:
        {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json"

        }
    })

    return res
}

const logoutAction = async () => {
    const res = await fetch("http://localhost:3000/auth/logout", {
        method: "post",
        headers: 
        {
        "Access-Control-Allow-Origin" : "*",
        "Authorization" : "Bearer " + (await window.cookieStore.get("auth_token")).value

        }
    })

    const json = await res.json()
    if(res.ok)
    {
        console.log(json)

        if(json.user)
        {
            window.cookieStore.delete("auth_token")
        }

        return true;
    }

    console.error(json);

    return false
}

export {
    loginAction, 
    registerAction,
    logoutAction
}