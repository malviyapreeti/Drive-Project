
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Please login first');
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        console.log('AUTH ERROR:', error.message);
        return res.status(401).send('Invalid or expired token');
    }
}

module.exports = authMiddleware;
