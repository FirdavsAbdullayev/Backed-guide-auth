const express = require('express');
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Foydalanuvchi profil ma'lumotlarini olish
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil ma'lumotlari
 *       401:
 *         description: Yaroqsiz yoki topilmagan token
 *       404:
 *         description: Foydalanuvchi topilmadi
 */
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Serverda xatolik yuz berdi",
      error: error.message
    });
  }
});

module.exports = router;