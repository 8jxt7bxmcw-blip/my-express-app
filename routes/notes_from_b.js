var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

// 修正ポイント1：成功したパスワード入りのURLをここに貼る
const uri = "mongodb+srv://tomoki:pGA8q3MsBiRWISZM@cluster0.cgsam40.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

router.get('/', async function(req, res, next) {
    try {
        await client.connect();
        // 修正ポイント2：データベース名とコレクション名を合わせる
        const database = client.db('notes');
        const notes = database.collection('notes');

        // データベースからすべてのデータを取得する
        const query = {};
        const noteList = await notes.find(query).toArray();

        // ブラウザ（Vue）にデータを返す
        res.json(noteList);

    } catch (err) {
        console.error(err);
        res.status(500).send("DB接続エラー");
    } finally {
        // ここでは接続を閉じない（閉じると次のアクセスでエラーになるため、通常Expressでは繋ぎっぱなしにします）
    }
});

module.exports = router;