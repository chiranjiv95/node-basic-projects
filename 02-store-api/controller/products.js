const Product=require('../model/Product');


const getAllProducts=async(req, res)=>{
    
    const {featured, company, name, sort, fields, limit}=req.query;
    const queryObject={};

    if(featured){
        queryObject.featured=featured==='true'?true:false
    }
    if(company){
        queryObject.company=company
    }
    if(name){
        queryObject.name={$regex:name, $options:'i'}
    }

    try {
        let result=Product.find(queryObject);

        // sort
        if(sort){
            const sortList=sort.split(',').join(' ');
            result=result.sort(sortList)
        }

        // fields
        if(fields){
            const fieldList=fields.split(',').join(' ');
            result=result.select(fieldList);
        }

        // limit
        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit) || 10;
        const skip=(page-1)*limit;

        result=result.skip(skip).limit(limit)

        const products=await result;
        res.status(200).json({products, nbHits:products.length})
    } catch (error) {
        res.status(500).json({msg:'Server Error'})
    }
}

// testing purpose
const getAllProductsStatic=async(req, res)=>{
    try {
        const products=await Product.find({}).sort('-name');
        res.status(200).json({products, nbHits:products.length});
    } catch (error) {
        res.status(500).json({msg:'Server Error'})
    }
}


module.exports={getAllProductsStatic, getAllProducts}