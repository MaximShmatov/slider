const data = require('./sliderREST.json');
const formidable = require('express-formidable');

function slider(app) {
    app.use(formidable());
    app.post('/slider', (req, res) => {
        res.append('Access-Control-Allow-Origin', '*');
        res.json(data[req.fields.variant]);
    });

}

module.exports = slider;
