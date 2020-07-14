const data = require('./sliderREST.json');
const formidable = require('express-formidable');

function slider(app) {
    app.use(formidable());
    app.post('/slider', (req, res) => {
        res.headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Version, Authorization, Content-Type"
        }
        res.json(data[req.fields.variant]);
        console.log('REQUEST', req.headers);
        console.log('RESPONCE', res.headers);
    });

}

module.exports = slider;
