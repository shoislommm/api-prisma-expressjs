import * as dotenv from 'dotenv'
import app from './server.js'

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log('server started on http://localhost:4001')
})