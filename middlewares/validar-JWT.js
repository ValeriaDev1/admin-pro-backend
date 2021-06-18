const jwt = require('jsonwebtoken');
const validationJWT = (req, res, next) => {
    // read Token 
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "Error, token vacio"
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Error, token no valido"
        })
    }
}
module.exports = {
    validationJWT
}