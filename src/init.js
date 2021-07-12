import regeneratorRuntime from "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video"
import "./models/User"
import "./models/Comments"
import app from "./server"

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`Server listening on http://localhost:${PORT}!!`);
app.listen(PORT, handleListening);