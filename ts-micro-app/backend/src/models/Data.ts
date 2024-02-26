import mongoose, { Schema, InferSchemaType } from "mongoose";

const dataSchema = new Schema({
  title: { type: String, trim: true, required: true, unique: true },
  assigned: { type: String, trim: true, required: true, unique: true }
});

export type dataSchema = InferSchemaType<typeof dataSchema>;
export const Data = mongoose.model("Data", dataSchema);