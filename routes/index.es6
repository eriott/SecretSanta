let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POST home page.
router.post('/', function (req, res, next) {
    console.log(req.body);
});

module.exports = router;

