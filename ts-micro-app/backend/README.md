yarn init -y
mkdir src
yarn add --dev typescript
yarn add express
yarn add --dev @types/express @types/node ts-node
yarn add --dev config nodemon cors @types/cors @types/config
touch nodemon.json
mkdir config 
touch default.json
```json
{
    "db": {
        "host": "localhost",
        "port": 5984,
        "dbName": "mern-micro"
    }
}
```

touch tsconfig.json
```json
{
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "outDir": "dist/",
      "sourceMap": true
    },
    "files": [
      "./node_modules/@types/node/index.d.ts",
      "./node_modules/@types/express/index.d.ts"
      "./node_modules/@types/config/index.d.ts"
    ],
    "include": [
      "src/**/*.ts"
    ],
    "exclude": [
      "node_modules"
    ]
  }
  ```

touch src/server.ts
```js
import config from "config"
import app from "./app"

const port = config.get('port')

app.listen(port, () => console.log(`Listening on port ${port}.`))
```
touch src/app.ts
```js
import express, { Express } from "express"
import cors from "cors"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});


export default app
```

Add scripts to package.json
```json
"scripts": {
    "dev": "nodemon ./src/server.ts"
  },
```

mkdir providers
Move app.ts to providers and update to App.ts

mkdir routes
touch Routes.ts
Routes.ts
```js
import { Router } from 'express';
import DataController from '../controllers/Data';


const router = Router();

router.get('/', DataController.get);

export default router;
```

Update App.js
```js
import routes from "../routes/Routes"
.
.
app.use('/data', routes);
```

```js
import express, { Express } from "express"
import routes from "../routes/Routes"
import cors from "cors"

const app: Express = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

app.use('/data', routes);


export default app
```

mkdir controllers
touch Data.ts

Data.ts
```js
class Data {
	public static get(req, res, next): any {
		return res.json({
			message: "Data Get API"
		});
	}
}

export default Data;
```

CRUD

```js
class Data {
	public static getAll(req, res, next): any {
		return res.json({
			message: "Data Get API"
		});
	}
	public static create(req, res, next): any {
		return res.json({
			message: "Create A New Record API"
		});
	}public static getByID(req, res, next): any {
		return res.json({
			message: "Get by ID"
		});
	}public static updateByID(req, res, next): any {
		return res.json({
			message: "Update by ID"
		});
	}public static deleteByID(req, res, next): any {
		return res.json({
			message: "Delete By ID"
		});
	}
}

export default Data;
```

```js
import { Router } from 'express';
import DataController from '../controllers/Data';


const router = Router();

router.get('/', DataController.getAll);
router.post('/', DataController.create);
router.get('/:dataID', DataController.getByID);
router.put('/:dataID', DataController.updateByID);
router.delete('/:dataID', DataController.deleteByID);

export default router;
```

```bash
curl -X POST --location 'http://localhost:8080/data' --header 'Content-Type: application/json'
curl --location 'http://localhost:8080/data'
curl --location 'http://localhost:8080/data/1'
curl --location --request PUT 'http://localhost:8080/data/1'
curl --location --request DELETE 'http://localhost:8080/data/1'
```

yarn add mongoose @types/mongoose
touch providers/Database.ts
providers/Database.ts
```js
import mongoose from 'mongoose';
import config from "config";

const dbURI = 'mongodb://'
                .concat(config.get("db.user"))
                .concat(`:${config.get("db.pass")}@`)
                .concat(config.get("db.host"))
                .concat(`:${config.get("db.port")}`);

async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to database.");
  } catch (error) {
    console.log("Cannot connect to database.", error);
    process.exit(1);
  }
}
  
  export default connectDB

```
config/default.json
```json
{
    "port": "8080",
    "db": {
        "host": "localhost",
        "port": 27017,
        "user": "root",
        "pass": "example"
    }
}
```
mkdir models
models/Data.ts
```js
import mongoose, { Schema, InferSchemaType } from "mongoose";

const dataSchema = new Schema({
  title: { type: String, trim: true, required: true, unique: true },
  assigned: { type: String, trim: true, required: true, unique: true }
});

export type dataSchema = InferSchemaType<typeof dataSchema>;
export const Data = mongoose.model("Data", dataSchema);
```
update controller/Data.ts
```js
import {Data as DataModel} from "../models/Data"

class Data {
	public static getAll(req, res, next): any {
		DataModel.find()
			.then(data => {
				res.send(data);
			})
			.catch(err => {
				res.status(500).send({
					message: err.message || "Some error occured while retrieving data"
				})
			});
	};
	public static create(req, res, next): any {
		const message = new DataModel({
			title: req.body.title,
			assigned: req.body.assigned
		});
		message
			.save()
			.then((data) => {
				res.send(data);
			})
			.catch((err) => {
				res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Message.",
				});
			});
	}
	public static getByID(req, res, next): any {
		DataModel.findById(req.params.dataID)
			.then(data => {
				if (!data) {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				res.send(data);
			})
			.catch(err => {
				if (err.kind === "ObjectId") {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				return res.status(500).send({
					message: "Error retrieving message with id " + req.params.dataID,
				});
			
			});
	};
	public static updateByID(req, res, next): any {
		DataModel.findByIdAndUpdate(
			req.params.dataID,
			{
				title: req.body.title,
				assigned: req.body.assigned
			},
			{ new: true })
			.then(data => {
				if (!data) {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				res.send(data);
			})
			.catch(err => {
				if (err.kind === "ObjectId") {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				return res.status(500).send({
					message: "Error retrieving message with id " + req.params.dataID,
				});
			
			});
	}
	public static deleteByID(req, res, next): any {
		DataModel.findByIdAndRemove(req.params.dataID)
			.then(data => {
				if (!data) {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				res.send({ message: "Message deleted successfully!" });
			})
			.catch(err => {
				if (err.kind === "ObjectId" || err.name === "NotFound") {
					return res.status(404).send({
						message: "Message not found with id " + req.params.dataID,
					});
				}
				return res.status(500).send({
					message: "Error retrieving message with id " + req.params.dataID,
				});
			
			});
	}
}

export default Data;
```
Referecens:
- https://geekyants.github.io/express-typescript/
- https://dev.to/maithanhdanh/create-express-typescript-boilerplate-3gf
- https://github.com/br4adam/ticket-management
- https://dev.to/suhailkakar/building-a-restful-crud-api-with-node-js-express-and-mongodb-1541