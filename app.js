import express from "express";
import cors from 'cors'
import db from "./database/db.js"
import bookRouter from './routes/bookRouter.js'

export const app = express()
app.get('/', (_req, res) =>{
	res.send('Books of the World Unite')
})

app.use(cors())
app.use(express.json())
app.use('/books', bookRouter)

try{
	await db.authenticate()
		console.log('conected to database')
	}catch (error){
		console.log(`error:' ${error}`)
	}

//👀 importante este paso para poder parar el servidor dentro de los test
export const server = app.listen(8000,() =>{
console.log('🚀server up in http://localhost:8000/')
} )
