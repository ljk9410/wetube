import express from "express";

const app = express();

const PORT = 4000;


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.end();
}

app.use(logger);
app.get("/", handleHome);


const handleListening = () => console.log(`Server listening on http://localhost:${PORT}!!`);
app.listen(PORT, handleListening);
