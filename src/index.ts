import express from 'express';
import categoryRoute from "./routes/category/category.route";
import postRoute from "./routes/post/post.route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/categories", categoryRoute);

app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
});