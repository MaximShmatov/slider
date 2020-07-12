module.exports = function slider(app, server, compiler) {
        app.get('/slider', function (req, res) {
            res.json({custom: 'response'});
        })
        //console.log(typeof app);
    }
