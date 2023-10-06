const express = require('express');
const router = express.Router();
import Product from "./productController"

router.post('/create',Product.createProduct)
router.get('/viewAll',Product.viewproduct)
export default router