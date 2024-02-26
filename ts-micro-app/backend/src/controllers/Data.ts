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