const express = require('express');
require('./db/connection');
const app = express();
const studentRouter = require('./router/routers')
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(studentRouter);

// app listening on port no.
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});