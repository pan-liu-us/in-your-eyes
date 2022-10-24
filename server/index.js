import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Post from './models/index.js';
import dotenv from 'dotenv'
dotenv.config()

const PW = process.env.MONGODB_PW

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.get('/inures/posts', async(req, res) => {
  try {
    const getPosts = await Post.find({})
    res.status(200).json(getPosts);
  } catch (err) {
    res.status(400).send(err);
  }
})

mongoose.connect(`mongodb+srv://pan:${PW}@mvp.ha141ti.mongodb.net/inures?retryWrites=true&w=majority`,
                 {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
          console.log('MANGO CONNECTION OPEN!!')
        })
        .catch((err) => {
          console.log('OH ERROR ABOUT MANGO CONNECTION!!');
          console.log(err)
        })

app.listen(PORT, () => console.log(`Listening on port ${PORT} :)`));
