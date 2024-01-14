import { generateToken } from "../config/generateToken.js";
import { User, userValidator, userValidatorForLogin } from "../models/user.js";
import { hash, compare } from "bcrypt";

export const addUser = async (req, res) => {

    // let { userName, password, tz, email } = req.body;

    // if (!userName || !password || !tz || !email)
    //     return res.status(404).json({ type: "misiing parameters", message: "missing parameters password /username/tz/email" })
    // if (!/[0-9]{1,2}/.test(password))
    //     return res.status(400).json({ type: "invalid password", message: "try again" })

    let validate = userValidator(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });
    let { userName, password, tz, email } = req.body;

    try {
        let sameUser = await User.findOne({ $or: [{ userName: userName }, { tz: tz }] })
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "user with same credentials already exists" })
        let hashedPassword = await hash(password, 15);
        let newUser = new User({ userName, password: hashedPassword, email, tz });
        await newUser.save();
        let token = generateToken(newUser);
        return res.json({ token, userName: newUser.userName, email: newUser.email })

    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}

export const login = async (req, res) => {
    // let { password, userName } = req.body;

    // if (!password || !userName)
    //     return res.status(404).json({ type: "misiing parameters", message: "missing parameters password /username" })

    let validate = userValidatorForLogin(req.body);
    if (validate.error)
        return res.status(400).json({ type: "not valid body ", message: validate.error.details[0].message });

    try {
        let user = await User.findOne({ userName: req.body.userName })
        if (!user || !await compare(req.body.password, user.password))
            res.status(404).json({ type: "no such user", message: "please sign up" })

        let token = generateToken(user);
        // return res.json({ token })
        return res.json({ token, userName: user.userName, email: user.email })
        // user.password = "****";
        // return user;
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {


        const allUsers = await User.find({}, "-password");//אפשר להגביל את השדות שברצוננו לשלוף
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }

}

//authorization --הרשאות
//authentication--אימות