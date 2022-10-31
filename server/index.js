import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Post from './models/post.js';
import postRoutes from './routes/posts.js';
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

app.use('/posts', postRoutes);

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
