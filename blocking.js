const fs = require('fs/promises');
const path = require('path');



const read = async ()=>{
    console.log('start');

    const result =   await fs.readFile(path.join(__dirname,'package.json'), 'utf-8');
    console.log(result);
    return result;
}


read().then((result)=>{
    console.log('result', result);
}).catch((err)=>{
    console.log('err', err);
})
console.log('after read');