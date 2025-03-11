const cityDb = require('../Models/db');

exports.getCities = (req, res) => {
    cityDb.query('SELECT * FROM cities', (err, results) => {
        if (err) return res.render('index', { cities: [], error: 'ERROR FETCHING CITIES' });

        res.render('index', { cities: results, error: null });
    })
}

exports.addCities = (req, res) => {
    const { name } = req.body;
    console.log(name);

    if (!name || name.trim() === "") {
        console.log('CITY NAME IS REQUIRED');
        return res.status(300).render('index', { cities: [], error: 'City name is required' });
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        return res.status(300).render('index', { cities: [], error: 'City name must contains only alphabets' });
    }
    const query = 'INSERT INTO cities(name) VALUES(?)';
    // console.log(query);
    cityDb.query(query, [name], (err) => {
        if (err) return res.render('index', { cities: [], error: 'City name is already exists' });
        res.status(200).redirect('/');
    });
}