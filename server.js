const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Eslatma: Papka yo'li va fayl nomi mosligini tekshiring (kichik harflar bilan)
const sequelize = require('./config/database'); 

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Test marshrut
app.get('/', (req, res) => {
  res.send('API muvaffaqiyatli ishlamoqda!');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Bazaga ulanishni tekshirish
    await sequelize.authenticate();
    console.log('PostgreSQL bazasiga muvaffaqiyatli ulanildi!');

    // Jadvallarni sinxronlash
    await sequelize.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.error('--- SERVER ISHGA TUSHISHDA XATOLIK ---');
    console.error('Xatoliq xabari:', error.message);
    console.error('To\'liq xato obyekti:', error);
    console.error('-------------------------------------');
    process.exit(1);
  }
}

startServer();