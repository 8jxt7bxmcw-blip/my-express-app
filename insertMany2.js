const { MongoClient } = require("mongodb");

// 新しいパスワードを反映させたURLです
const uri = "mongodb+srv://tomoki:pGA8q3MsBiRWISZM@cluster0.cgsam40.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    console.log("--- データベース操作を開始します ---");
    try {
        await client.connect();
        console.log("✅ MongoDBへの接続に成功しました！");

        const database = client.db('notes');
        const notes = database.collection('notes');

        const query = [
            { name: 'Yasushi', mail: 'osonoi@cu', tel: '1111' },
            { name: 'Koh', mail: 'kojima@cu', tel: '2222' },
            { name: 'Alice', mail: 'alice@example.com', tel: '3333' },
            { name: 'Bob', mail: 'bob@example.com', tel: '4444' },
            { name: 'Charlie', mail: 'charlie@example.com', tel: '5555' },
            { name: 'David', mail: 'david@example.com', tel: '6666' },
            { name: 'Eve', mail: 'eve@example.com', tel: '7777' },
            { name: 'Frank', mail: 'frank@example.com', tel: '8888' },
            { name: 'Grace', mail: 'grace@example.com', tel: '9999' },
            { name: 'Henry', mail: 'henry@example.com', tel: '0000' },  
        ];

        console.log("データを送信中...");
        const result = await notes.insertMany(query);
        
        console.log("🚀 登録完了しました！");
        console.log("登録された数:", result.insertedCount);
        console.log("詳細:", result);

    } catch (err) {
        console.error("❌ エラーが発生しました:", err.message);
    } finally {
        await client.close();
        console.log("--- 接続を閉じました ---");
    }
}

// これを忘れると実行されません
run();