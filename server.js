require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eventsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Middleware
app.use(express.urlencoded({ extended: true })); // replaces bodyParser
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Set up EJS views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const eventRoutes = require('./routes/events');
app.use('/', eventRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
