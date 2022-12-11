import {Router} from 'express';

const api = Router();
import mongoose from "mongoose";
import seyahatlar from "../models/seyahatlar";
import { msg } from "./responseMsgs";
const uri =
  "mongodb+srv://nour:nour@cluster0.bhwsyqn.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
const seyahatlarModel = mongoose.model("seyahatlar", seyahatlar);

api.post("/", (req, res) => {
  seyahatlarModel.find({ fromTo: req.body.fromTo }, function (err, docs) {
    if (err) return res.json({ msg: msg.error });
    res.json({ results: docs, msg: msg.ok });
  });
});

export default api;