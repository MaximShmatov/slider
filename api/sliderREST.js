const formidable = require('express-formidable');
const data = {
  minValue: getRandom(10),
  maxValue: getRandom(100),
  valueFrom: getRandom(10),
  valueTo: getRandom(100),
  stepSize: getRandom(10),
  onVertical: Math.round(Math.random()) === 1,
  onRange: Math.round(Math.random()) === 1,
  onTooltip: Math.round(Math.random()) === 1,
  onScale: Math.round(Math.random()) === 1,
  serverURL: 'http://localhost:9000/slider'
};

function slider(app) {
  app.use(formidable());
  app.post('/range-slider', (req, res) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.json(data);
  });
}

function getRandom(num) {
  if (Math.round(Math.random())) {
    num = num * -1;
  }
  return Math.round(Math.random() * num);
}

module.exports = slider;
