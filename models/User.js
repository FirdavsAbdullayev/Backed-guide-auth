const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Ismni kiritish majburiy" }
    }
  },
  secondName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Familiyani kiritish majburiy" }
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Bunday username band qilingan" },
    validate: {
      notEmpty: { msg: "Username kiritish majburiy" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "Bunday email bilan ro'yxatdan o'tilgan" },
    validate: {
      isEmail: { msg: "To'g'ri email manzilini kiriting" },
      notEmpty: { msg: "Email kiritish majburiy" }
    }
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Telefon raqamini kiritish majburiy" }
    }
  },
  applicationId: {
    type: DataTypes.STRING,
    unique: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Qabul qilindi"
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "Web Development"
  }
}, {
  timestamps: true // createdAt va updatedAt avtomatik qo'shiladi
});

// Yozuv bazaga saqlanishidan oldin applicationId'ni avtomatik generatsiya qilish
User.beforeCreate((user) => {
  if (!user.applicationId) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    user.applicationId = `REG-2026-${randomDigits}`;
  }
});

module.exports = User;