import mongoose from 'mongoose';

const connectDatabase = async() =>{
    await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    }).then(con =>{
        console.log(`Mongo DB Dabatase connect with  ${con.connection.host}`)
    })
}

export default connectDatabase