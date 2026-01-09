var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
    // YesNo APIのURL
    const url = 'https://yesno.wtf/api';
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            // 結果をブラウザに表示
            res.send(`
                <h1>Result: ${data.answer}</h1>
                <img src="${data.image}" width="400">
            `);
        } else {
            res.status(500).send('API Error');
        }
    });
});

module.exports = router;