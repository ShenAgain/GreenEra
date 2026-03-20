require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const issueRoutes = require('./routes/issueRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const reportRoutes = require('./routes/reportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();



console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verify the secret is loaded



// MongoDB Atlas connection string
//const uri = 'mongodb+srv://Shen:v3TPnU1pTPvs9tP3@cluster0.wmd10.mongodb.net/myDatabase?retryWrites=true&w=majority';

const uri = "mongodb://Shen:v3TPnU1pTPvs9tP3@cluster0-shard-00-00.wmd10.mongodb.net:27017,cluster0-shard-00-01.wmd10.mongodb.net:27017,cluster0-shard-00-02.wmd10.mongodb.net:27017/myDatabase?ssl=true&replicaSet=atlas-5ewaqz-shard-0&authSource=admin&retryWrites=true&w=majority";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Root route to test server
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});




// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);


// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
