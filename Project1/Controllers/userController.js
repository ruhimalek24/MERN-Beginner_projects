const { default: axios } = require('axios');
const db = require('../Models/db');

exports.getUsers = (req, res) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, result) => {
        if (err) return req.status(300).render('users', { users: [], err: 'FError in Fetching users' });

        res.status(200).render('users', { users: result, error: null });
    });
};


exports.addUser = async (req, res) => {
    const { name, city, mobile, media_url } = req.body;

    // console.log(name, name.trim(), /^[A-Za-z\s]+$/.test(name.trim()));

    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        return res.status(300).render('users', { users: [], error: 'Invalid name! Only alphabets is allowed' });
    }

    if (!city || !/^[A-Za-z\s]+$/.test(city)) {
        return res.status(300).render('users', { users: [], error: 'Invalid City! Only alphabets is allowed' });
    }

    const cleanMobile = mobile ? mobile.trim() : "";
    if (mobile && !/^\d+$/.test(mobile.trim())) {
        return res.status(300).render('users', { users: [], error: 'Invalid Mobile! Only digits allowed' });
    }

    const cleanMedia = media_url ? media_url.trim() : "";
    if (cleanMedia && !cleanMedia.startsWith('https://')) {
        return res.status(300).render('users', { users: [], error: 'Invalid Media URL! Only starts with https://' });
    }
    try {
        const { data } = await axios.get('https://api.binance.com/api/v1/time');
        const serverTime = data.serverTime;

        const checkCity = 'SELECT * FROM cities WHERE name = ?';
        db.query(checkCity, [city], (err, result) => {
            if (err) {
                return res.render('users', { users: [], error: 'Database error while checking city' });
                // return res.status(500).json({ error: 'Database error while checking city', err });
            }
            if (result.length === 0) {
                return res.status(400).json({ error: 'City Does not Exist!' });
            }

            const insertQuery = 'INSERT INTO `user`(id , name , city , mobile , media_url) VALUES(?,?,?,?,?)';
            console.log(serverTime, name, city, mobile, media_url);

            db.query(insertQuery, [serverTime, name, city, cleanMobile || null, cleanMedia || null], (err) => {

                if (err) {
                    console.log('Error inn fetching users', err);
                    return res.render('users', { users: [], error: 'Error inn fetching users' });
                }
                console.log('USER ADDED SUCCESSfullY');

                // res.json({ code: 200, msg: 'User Inserted Successfully!', user: { id: serverTime, name, city, mobile, media_url } });
                db.query('SELECT * FROM `user`', (err, users) => {
                    if (err) {
                        return res.render('users', { users: [], error: 'Error in Fetching inserted user' });
                    }
                    res.status(200).render('users', { users, error: null, success: 'User added successfully' });
                })
            }

            )
        })

    }
    catch (error) {
        return res.render('users', { users: [], error: 'Failed to fetch server time' });
    }
}

exports.modifyuser = (req, res) => {
    const { id, name, city, mobile, media_url } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const updateQuery = 'UPDATE user SET name=? , city=? , mobile=? , media_url=? WHERE id=?';
    db.query(updateQuery, [name, city, mobile, media_url, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error modifying user' });

        res.status(200).redirect('/users');
    })
}