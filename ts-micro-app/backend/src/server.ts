import config from "config";
import app from "./providers/App";
import connectDB from "./providers/Database";

const port = config.get('port');

connectDB();
app.listen(port, () => console.log(`Listening on port ${port}.`));