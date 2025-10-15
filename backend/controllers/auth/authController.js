const { default: AuthToken } = require("../../models/Token");
const { default: User } = require("../../models/Users")

const userLogin = async (req, res) => {
    const {usernameInput, passwordInput} = req.body

    try {
        const userFind = await User.findUser(
            {
                username: usernameInput,
                password: passwordInput
            }
        )

        if(!userFind) return res.status(401).json({message: "User not find", status: 401});

        const user = userFind[0]

        const token = await AuthToken.createAuthToken(user.uuid, req.get("User-Agent"))
        user.token = token;

        res.cookie("auth_token", token.tokenId, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 3600 * 1000
        })

        res.status(200).json({message: "User find", status: 200, user: user})
    } catch (error) {
        console.error("[User Error]", error)
    }
}

const userLogout = async (req, res) => {
    const token = req.cookies?.auth_token;
    let user = null

    if(token) user = await AuthToken.deleteAuthToken(token);
    res.clearCookie("auth_token");
    res.status(200).json({message: "Déconnecté", user : user, token: token})
}

module.exports = {
  userLogin, 
  userLogout
};
