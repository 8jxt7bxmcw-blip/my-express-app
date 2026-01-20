var express = require('express');
var router = express.Router();

// MongoDBライブラリを読み込む
const { MongoClient } = require("mongodb");

// 接続URIを設定（★自分のものに書き換えてください）
const uri = "mongodb+srv://tomoki:Ookawa0729@cluster0.cgsam40.mongodb.net/?appName=Cluster0"; 
const client = new MongoClient(uri);

// GETリクエスト（ブラウザでアクセスした時）の処理
router.get('/', async (req, res) => {
  try {
    const database = client.db('notes');
    const notes = database.collection('notes');

    // idが1のデータを1件取得
    const query = { id: 1 };
    const note = await notes.findOne(query);

    // 取得したデータの「title」をブラウザに返す
    // ※もしデータがなければ "データが見つかりません" と表示
    res.json(note ? note.title : "データが見つかりません");
    
  } catch (error) {
    res.status(500).send("エラーが発生しました: " + error.message);
  }
});

module.exports = router;
