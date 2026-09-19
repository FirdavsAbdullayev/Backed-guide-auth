const Joi = require('joi');

const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': "Ismni kiritish majburiy",
    'string.min': "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
    'any.required': "Ismni kiritish majburiy"
  }),
  secondName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': "Familiyani kiritish majburiy",
    'string.min': "Familiya kamida 2 ta belgidan iborat bo'lishi kerak",
    'any.required': "Familiyani kiritish majburiy"
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': "Username kiritish majburiy",
    'string.alphanum': "Username faqat harf va raqamlardan iborat bo'lishi kerak",
    'string.min': "Username kamida 3 ta belgidan iborat bo'lishi kerak",
    'any.required': "Username kiritish majburiy"
  }),
  email: Joi.string().email().required().messages({
    'string.empty': "Email kiritish majburiy",
    'string.email': "To'g'ri email manzilini kiriting",
    'any.required': "Email kiritish majburiy"
  }),
  phoneNumber: Joi.string().pattern(/^\+?[0-9]{9,15}$/).required().messages({
    'string.empty': "Telefon raqamini kiritish majburiy",
    'string.pattern.base': "To'g'ri telefon raqami kiriting (masalan: +998901234567)",
    'any.required': "Telefon raqamini kiritish majburiy"
  }),
  category: Joi.string().default("Web Development")
});

module.exports = { registerSchema };