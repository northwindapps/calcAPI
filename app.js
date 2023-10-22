const express = require('express');
const app = express();
const port = 3000; // Port on which the server will listen
const {Service} = require('./service');
const service = new Service();
const {Defferentiate} = require('./derivatives');
const defferentiate = new Defferentiate();

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define a route
app.get('/api/v1', (req, res) => {
    res.send('Welcome to calcAPI. If you encounter an error, please let us know it for future improvement. https://northwindsoftware.com');
});

app.get('/api/defferntiate', (req, res) => {
    let result = defferentiate.execute();
    res.status(200).json({ result: result });
});


// POST route
app.post('/api/v1/execute', (req, res) => {
    const data = req.body;
    console.log(data);
    let result = service.excecute(data.exp);
    res.status(200).json({ result: result });
});

// GET route
app.get('/api/v1/execute', (req, res) => {
    const data = req.query.exp;
    console.log(data);
    try {
        let result = service.excecute(data);
        res.status(200).json({ result: result });
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// GET route
app.get('/api/v1/runge_kutta4', (req, res) => {
    const fx = req.query.fx;
    const x0 = req.query.x0;
    const y0 = req.query.y0;
    const h = req.query.h;
    const l = req.query.l;

    try {
        let result2 = null;
        if (l === null) {
            result2 = service.runge_kutta_method(fx,x0,y0,h,null);
        }else{
            result2 = service.runge_kutta_method(fx,x0,y0,h,l);
        }
        const data = {
            x: result2[0],
            y: result2[1]
        };
        res.status(200).json(data);
      } catch (error) {
        // Handle errors here
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
      }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
