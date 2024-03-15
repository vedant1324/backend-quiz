const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import quiz routes
const quizRoutes = require('./routes/quizzes'); // Ensure this path matches your project structure
const auth= require('./routes/auth')
const quizResult= require ('./routes/quizResult');
const userscore= require('./routes/uizScoreRoutes');
const leaderboard= require('./routes/leaderboardRoutes');
const deleteQuizRoute = require('./routes/deleteQuizRoute');
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Setup routes
app.use('/api/quizzes', quizRoutes);
app.use('/api',quizResult);
app.use("/api",userscore);
app.use('/api',auth)
app.use('/',leaderboard);
app.use('/api/quizzes/delete', deleteQuizRoute);
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
