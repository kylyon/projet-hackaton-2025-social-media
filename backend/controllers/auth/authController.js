const { default: AuthToken } = require("../../models/Token");
const { default: User } = require("../../models/Users");
const { default: UsersFactory } = require("../UsersFactory");

const userLogin = async (req, res) => {
    const {usernameInput, hashedPassword} = req.body

    try {
        const userFind = await User.findUser(
            {
                username: usernameInput,
                password: hashedPassword
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
        return res.status(401).json({error, message: "Erreur lors de la connexion de l'utilisateur"})
    }
}

const userLogout = async (req, res) => {
    const token = req.cookies?.auth_token;
    let user = null

    if(token) user = await AuthToken.deleteAuthToken(token);
    res.clearCookie("auth_token");
    res.status(200).json({message: "Déconnecté", user : user, token: token})
}

const userRegister = async (req, res) => 
{
    const { email, fisrtname, lastname, username, avatar, adressesList, password } = req.body

    try {
        const user = await UsersFactory.createUser("user", email, fisrtname, lastname, username, avatar, adressesList, password )

        if(!user) throw new Error("Erreur lors de la création de l'utilisateur")

        return res.status(200).json({user , message: "Utilisateur créé"})
    } catch (error) {
        return res.status(401).json({error, message: "Erreur lors de la création de l'utilisateur"})
    }
}

module.exports = {
  userLogin, 
  userLogout,
  userRegister
};
