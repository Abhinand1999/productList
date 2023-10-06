const express = require('express');
const router = express.Router();
import Category from "./categoriesController";

router.post('/create',Category.createCatogery)
router.get('/viewAll',Category.list) //list of all catogory without condition
router.get('/view',Category.listAll) //list of all catogory without condition
export default router