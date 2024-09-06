import express from 'express'
import mongoose from 'mongoose';

const router = express.Router();

export default router;


import Product from '../model/product.model.js';
import {getProducts,createProduct,updateProduct,deleteProduct} from '../controllers/product.controllers.js';

router.get("/", getProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);




