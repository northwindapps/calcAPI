const express = require('express');
const app = express();
const port = 3000; // Port on which the server will listen
const {Service} = require('./service');
const service = new Service();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define a route
app.get('/api/v1', (req, res) => {
    res.send('Welcome to calcAPI. If you encounter an error, please let us know it for future improvement. https://northwindsoftware.com');
});


// POST route
app.post('/api/v1/execute', (req, res) => {
    const data = req.body;
    console.log(data);
    let result = service.excecute(data.exp);
    res.status(200).json({ result: result });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
