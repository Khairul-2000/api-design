import {Router } from 'express'
import { body, validationResult } from 'express-validator';
import { handleInputError } from './modules/middleware';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';


const router = Router(); 

/**
 * Product
 */

router.get('/product',getProducts)
router.get('/product/:id',getOneProduct) // :id router parameter
router.put('/product/:id',body('name').isString(),handleInputError,updateProduct)
router.post('/product',body('name').isString(),handleInputError, createProduct)

router.delete('/product/:id',deleteProduct)

/**
 * Update
 */

router.get('/update',getUpdates)
router.get('/update/:id',getOneUpdate) // :id router parameter
router.put('/update/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['IN_PROGRESS','SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    handleInputError,
    updateUpdate)
router.post('/update',body('title').exists().isString(), body('body').exists().isString(),body('productId').exists().isString(),handleInputError,createUpdate)
router.delete('/update/:id',deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint',()=>{})
router.get('/updatepoint/:id',()=>{}) 
router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').exists().isString(),
    ()=>{})
router.post('/updatepoint',
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    ()=>{})
router.delete('/updatepoint/:id',()=>{})



router.use((err, req, res, next)=>{
    console.log(err)
    res.json({message: "invalid input from router side"})
})






export default router;