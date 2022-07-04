import express from 'express';
import cors from 'cors';
//import path from 'path';
//import cookieParser from 'cookie-parser';
//import logger from 'morgan';
// import postRouter from './src/routes/post';
import { connect } from 'mongoose';
import { userAuthorizedRouter, userRouter } from './src/routes/userRouter';
import authRouter from './src/routes/authintication/authinticationRoutes';
import authintication from './src/authintication/authintication';
import { projectRouter } from './src/routes/projectRoutes';
import { proposalRouter } from './src/routes/proposalsRoutes';
import { chatRouter } from './src/routes/chatRouter';

require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors())

//#region //////////////////// Routes ///////////////////////

// app.use('/post', postRouter)
app.use('/authintication', authRouter)
app.use('/user', userRouter)
app.use(authintication.authinticate)
app.use('/user', userAuthorizedRouter)
app.use('/project', projectRouter)
app.use('/proposal', proposalRouter)
app.use('/chat', chatRouter)

//#endregion//////////////////////////////////////////////


app.get('/', (req: any, res: any) => res.send('yes aim working on host 4000'))

//#region Connecting to Database ////////////////////////////
const DB_CONECTION: string = process.env.DB_CONECTION ?? 'not Conected';
//using connect method as a promise 
connectMeMongoDB().catch((err) => console.log(err))
// connecting mongoDB with our application with connect method from mongoose
async function connectMeMongoDB(): Promise<void> {
        // 4. Connect to MongoDB
        await connect(DB_CONECTION
                ,
                (err) => err ? console.log(err) : console.log('db is connected you can start storing data : ' + Date.now()))
}
//#endregion

/////////////// making the app listening to port 4000 on localhost///////////////
app.listen(process.env.PORT || 4000)

export default app