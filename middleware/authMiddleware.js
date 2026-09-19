const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Header'dan token'ni ajratib olish ("Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Token'ni tekshirish
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Request obyektiga foydalanuvchi ID'sini biriktirish
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Yaroqsiz token, ruxsat berilmadi" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi, avtorizatsiyadan o'ting" });
  }
};

module.exports = protect;   