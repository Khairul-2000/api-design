import { connect } from "http2";
import prisma from "../db";

// get update
export const getUpdates = async(req, res)=>{

    const products = await prisma.product.findMany({
        where:{
            belongsToID: req.user.id
        },

        include:{
            update:true
        }
    })
    const updates = products.reduce((allUpdates, product)=>{
        return [...allUpdates, ...product.update]
    }, [])
    res.json({data: updates})

    
}

// get one update
export const getOneUpdate = async(req, res)=>{
    const id = req.params.id;

    const update = await prisma.update.findFirst({
        where:{
            id: id
           

        }
    })

    res.json({data: update})

}



// create update
export const createUpdate = async(req, res)=>{
    const product = await prisma.product.findUnique({
        where:{

            id: req.body.productId
        }
    })
    
    if(!product){
        return res.json({error: 'Product not found'})
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })

    res.json({data: update})
}

// update update
export const updateUpdate = async(req, res)=>{ 

    const products = await prisma.product.findMany({
        where: {
            belongsToID: req.user.id
        },
        include:{
            update: true
        }
    })

    const updates = products.reduce((allUpdates, product)=>{
        return [...allUpdates, ...product.update]
    }, [])


    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        return res.json({error: 'Update not found'})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body

        
        
    })

    res.json({data: updatedUpdate})

}

// delete update

export const deleteUpdate = async(req, res)=>{

    const products = await prisma.product.findMany({
        where:{
            belongsToID: req.user.id
        },

        include:{
            update:true
        }
    })


    const updates = products.reduce((allUpdates,product)=>{
        return [...allUpdates, ...product.update]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match){
        return res.json({error: 'Update not found'})
    }

    const deleteUpdate = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })


    res.json({data: deleteUpdate})

}
