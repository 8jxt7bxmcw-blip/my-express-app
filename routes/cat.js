var express = require('express');
var router = express.Router();
const cors = require('cors'); // ←これが必要
router.use(cors());          // ←これが必要（すべてのアクセスを許可）

router.get('/', function(req, res, next) {
  const cats = [
    { "name": "タマ", "image": "https://r78.p-cat.com/main/wp-content/uploads/2016/11/DSC_0150.jpg" },
    { "name": "ミケ", "image": "https://www.aeonpet.com/column/cat/img/cat_column_001_mv.jpg" }
  ];
  res.json(cats);
});

module.exports = router;