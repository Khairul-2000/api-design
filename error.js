setTimeout(()=>{
    throw new Error('ooops')

}, 300)


process.on('uncaughtException', (err)=>{
    console.log('uncaughtException', err.message)
   
})

process.on('unhandledRejection', (err)=>{
    console.log('unhandledRejection', err.message)  
})