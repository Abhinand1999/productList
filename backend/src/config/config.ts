import  mongoose  from "mongoose";
const url="mongodb://0.0.0.0:27017/ecommerce"
mongoose.connect(url, {
    
  });
  export const db = mongoose.connection;

  