// import express from 'express';
// const router = express.Router();
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
// import {getProducts,
//     getProductById,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//     createProductReview,getTopProducts} from '../controllers/productController.js';
// import {protect,admin} from '../middleware/authMiddleware.js';

//  router.get('/',asyncHandler(async(req,res)=>{
//     const products=await Product.find({});
//     res.json(products);
//  }));

//  router.get('/:id',asyncHandler(async(req,res)=>{
//    const product=await Product.findById(req.params.id);
//    if(product){
//     return res.json(product);
//    }else{
//   res.status(404);
//   throw new Error('Resource not found');
//    }
//  })
// );

// router.route('/').get(getProducts).post(protect,admin,createProduct);
// router.get('/top',getTopProducts);
// router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
//  router.route('/:id/reviews').post(protect,createProductReview);
//  export default router;

import express from 'express';
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

// ✅ Specific route – must come before '/:id'
router.get('/top', getTopProducts);

// ✅ Main product list and product creation
router.route('/').get(getProducts).post(protect, admin, createProduct);

// ✅ Review route
router.route('/:id/reviews').post(protect, createProductReview);

// ✅ Get, update, delete by ID – keep this LAST
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
