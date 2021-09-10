const express = require('express');
const github = require('./app/routes/github.route');
const app = express();

app.use(express.json());
app.use('/github', github);

app.get('/', ((req, res) => {
    res.send('Hi there');
}))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
})