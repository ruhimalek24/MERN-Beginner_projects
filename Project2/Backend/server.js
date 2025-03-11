const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
