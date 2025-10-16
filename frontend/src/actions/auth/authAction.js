import { hashPassword } from "@/utils/getCrypto.js"

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
    window.cookieStore.set("auth_token", json.user.token.tokenId)
    return true
  }
  console.log(json)
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

    const json = await res.json()
    if (res.ok) {
        return true
    }
    console.log(json)
    console.log(res)
    return false
}

export {
    loginAction, 
    registerAction
}