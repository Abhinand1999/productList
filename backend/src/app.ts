import express  from "express";
import {db }from './config/config'
import Category from "./module/categories/categoriesRouter";
import Product from "./module/product/productRouter";
import bodyparser from "body-parser"
const cors = require('cors'); 

const app=express();

app.use(cors());
const port=3000;
app.get('/',(req:any,res:any)=>{
res.send("")
});

app.use(bodyparser.json())


db.once('open', () => {
    console.log('Database connection successfully');
  });
  
  db.on('error', (err: Error) => {
    console.error('Database connection error: ' + err);
  });




app.use('/category',Category)
app.use('/product',Product)

app.use((req, res, next) => {
    res.status(404).send({
    status: 404,
    error: 'api not found'
    })
   })


   
app.listen(port,()=>{
    console.log(`connected successfuly on port ${port}`)
})
