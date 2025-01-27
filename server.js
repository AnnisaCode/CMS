const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files

let contents = [];

app.get('/api/contents', (req, res) => {
    res.json(contents);
});

app.post('/api/contents', (req, res) => {
    const { title, content } = req.body;
    contents.push({ title, content });
    res.status(201).json({ message: 'Content added!' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve the HTML file
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
