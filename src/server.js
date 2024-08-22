import express from 'express'
import router from './routes/router.js'
import morgan from 'morgan'
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url';

const app = express()
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

// app.get("/raw", express.raw(), async (req, res) => {
//     console.log(req.body);

//     if(req.headers['content-type'] === "applicatuion/json")

//     const chunks = [];

//     for await(let chunk of req) {
//         chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
//     }

//     const buffer = Buffer.concat(chunks);

//     console.log(buffer);

//     console.log(buffer.toString("utf8"));
//     console.log(JSON.parse(buffer.toString("utf-8")).username)
//     return res.status(200).end()
// })

app.use(morgan('dev'))
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads/banners', express.static(path.join(__dirname, "../uploads/banners")))
app.use('/uploads/images', express.static(path.join(__dirname, "../uploads/images")))


app.use('/api', router)

export default app