const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;
app.use(cors());
// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB Schema and Model
const configurationSchema = new mongoose.Schema({
  configId: String,
  data: [[String]],
  remark: String,
});

const ConfigurationModel = mongoose.model('Configuration', configurationSchema);

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Task 1 Endpoint (GET)

// index.js (backend)
app.get('/api/configurations/:id', async (req, res) => {
  const configId = req.params.id;

  try {
    
    const configuration = await ConfigurationModel.findOne({ configId });

    if (!configuration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    res.json(configuration.data); // Assuming configuration.data contains the 2D array
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Task 2 Endpoint (PUT)
app.put('/api/configurations/:id', async (req, res) => {
  const configId = req.params.id;
  const { remark } = req.body;

  try {
    const configuration = await ConfigurationModel.findOne({ configId });

    if (!configuration) {
      return res.status(404).json({ message: 'Configuration not found' });
    }

    configuration.remark = remark;
    await configuration.save();

    res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
