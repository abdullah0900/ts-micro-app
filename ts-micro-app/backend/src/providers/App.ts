import express, { Express } from "express";
import routes from "../routes/Routes";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

app.use('/data', routes);


export default app;