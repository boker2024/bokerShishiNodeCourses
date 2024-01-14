import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    let jwtSecretKey = process.env.JWT_STRING;
    let data = {
        userName: user.userName,
        _id: user._id,
        role: user.role
    }

    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '2m',
    });

    return token;
}