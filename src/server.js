import express from 'express'
import router from './routes/router.js'
import morgan from 'morgan'

const app = express()

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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

export default app