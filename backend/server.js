//const app =require('./app')
import express from 'express';
import connectDatabase from './config/database.js';
import {config}  from 'dotenv';
import path from 'path';
import   userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

const app =express();

app.use(express.json());
app.use(express.urlencoded({extended :true}));
//Settiing up config file
config({path:'backend/config/config.env'})

//Connecting Databe

connectDatabase();

app.use('/api/upload',uploadRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal', (req,res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
const __dirname = path.resolve();
 app.use('/upload', express.static(path.join(__dirname, '/upload')));

app.get('/',(req,res) =>{
    res.send('Server is running');
});
const PORT =process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Server at http://localhost:${PORT}`)

})

app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message})
})