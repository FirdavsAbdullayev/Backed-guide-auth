const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database'); // Fayl yo'li to'g'riligini tekshiring

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

// Test Endpoint
app.get('/', (req, res) => {
  res.send('Backend API muvaffaqiyatli ishlamoqda!');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Bazaga ulanishni tekshirish
    await sequelize.authenticate();
    console.log('PostgreSQL bazasiga muvaffaqiyatli ulanildi!');

    // Jadvallarni sinxronlashtirish
    await sequelize.sync({ alter: false });

    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    // Xatolik sababini Render loglarida to'liq ko'rish uchun:
    console.error('--- POSTGRESQL ULANISH XATOSI ---');
    console.error('Xatoliq matni:', error.message);
    console.error('To\'liq xato obyekti:', error);
    console.error('--------------------------------');
    process.exit(1);
  }
}

startServer();