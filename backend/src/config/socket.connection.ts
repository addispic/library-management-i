import http from 'http'
import express,{Express} from 'express'

// app
const app: Express = express()

// server
const server = http.createServer(app)

// exports
export {server,app}