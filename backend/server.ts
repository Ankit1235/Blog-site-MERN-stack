import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/UserRoutes';
import mongoose from 'mongoose';
import blogRoutes from './routes/Blog';
import dontenv from 'dotenv';
dontenv.config();

interface customErrors {
    statusCode : number,
    status : string,
    message : string
}

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes
app.use("/home", routes);
app.use("/home/auth", routes)
app.use("/home/auth", blogRoutes);

mongoose.connect(process.env.MONGO_CONNECTION_STRING as string)
.then(() =>  console.log("mongodb is connected successfully"))
.catch((err : any) => console.error(err));

//Global Error handler middleware

app.use((err : customErrors, req : Request, res : Response, next : NextFunction) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json (
        {
            status : err.status,
            message : err.message 
        }
    ); 
    next();
});
   
app.listen(process.env.PORT, () => {
    console.log("Server is listening at port", process.env.PORT);
});

