const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cityController = require('./Controllers/cityController');
const userController = require('./Controllers/userController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', cityController.getCities);
app.post('/addCity', cityController.addCities);

app.get('/users', userController.getUsers);
app.post('/addUser', userController.addUser);
app.post('/updateUser', userController.modifyuser);

app.get('/getServerTime', async (req, res) => {
    try {
        const response = await axios.get('https://api.binance.com/api/v1/time');
        console.log('Binance API response : ', JSON.stringify(response.data));
        res.json(response.data);
    }
    catch {
        console('Error in handling server time');
        res.status(500).json({ error: 'Failed to fetch server time' });
    }
})

app.listen(3000, (err) => {
    if (err) throw err;
    console.log('SERVER LISTENS');
});


