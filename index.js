import express from 'express';
import path from 'path';
const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname +'/BiMiSheets-webpage/dist')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/BiMiSheets - webpage/dist/index.html'));
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
