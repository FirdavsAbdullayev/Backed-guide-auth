const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const sequelize = require('./config/database');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send("Musobaqa Portali API (PostgreSQL + Sequelize) ishlamoqda... Hujjatlar: /api-docs");
});

// Serverni va PostgreSQL bazani ishga tushirish
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("PostgreSQL bazasi bilan aloqa o'rnatildi");
    app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishlamoqda`);
      console.log(`Swagger hujjatlari: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL ulanishda xatolik:", err.message);
  });