const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send({
                success: false,
                message: 'Auth failed: No token provided or improper format'
            });
        }

        const token = authHeader.split(" ")[1];
        JWT.verify(token, 'gmadye13', (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Auth failed: Invalid token'
                });
            } else {
                req.body.userId = decode.userId;
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            error,
            message: 'Auth failed'
        });
    }
};
