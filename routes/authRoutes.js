const express = require('express');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validate = require('../middleware/validateMiddleware');
const { registerSchema } = require('../validations/authValidation');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yangi ishtirokchini ro'yxatdan o'tkazish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - secondName
 *               - username
 *               - email
 *               - phoneNumber
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Dilshodbek
 *               secondName:
 *                 type: string
 *                 example: Niyazov
 *               username:
 *                 type: string
 *                 example: dilshod2026
 *               email:
 *                 type: string
 *                 example: dilshod@example.com
 *               phoneNumber:
 *                 type: string
 *                 example: "+998901234567"
 *               category:
 *                 type: string
 *                 example: Web Development
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli ro'yxatdan o'tildi
 *       400:
 *         description: Validation xatosi yoki username/email band
 *       500:
 *         description: Server xatosi
 */
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { firstName, secondName, username, email, phoneNumber, category } = req.body;

    const lowerUsername = username.toLowerCase();
    const lowerEmail = email.toLowerCase();

    // Username va Email unikal ekanini tekshirish
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: lowerUsername },
          { email: lowerEmail }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.username === lowerUsername) {
        return res.status(400).json({ message: "Bunday username band qilingan" });
      }
      if (existingUser.email === lowerEmail) {
        return res.status(400).json({ message: "Bunday email bilan ro'yxatdan o'tilgan" });
      }
    }

    const user = await User.create({
      firstName,
      secondName,
      username: lowerUsername,
      email: lowerEmail,
      phoneNumber,
      category: category || "Web Development"
    });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "Muvaffaqiyatli ro'yxatdan o'tildi",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        applicationId: user.applicationId,
        status: user.status,
        category: user.category,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Serverda xatolik yuz berdi",
      error: error.message
    });
  }
});

module.exports = router;