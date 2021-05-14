const category = require('../models/category');


const createCategory = async(req,res) => {

    try{

        let  data  = req.body;
        let initialCategory = await category.find();
        let check = initialCategory.find(element => element.name === data.name );
        if(!check)
        {
        let result = await category.create({...data});
        //res.status(200).json({data: result })
        let cat = await category.find().lean();
        res.render('category.ejs',{data:{success:'Category Created Successfully',category:cat}})
        }
       else {
        //res.status(400).json({message: 'Category already exist' })
        res.render('category.ejs',{data:{error:'Category already exist',category:initialCategory}})
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({error:'There is an error while creating category'});
    }

}

module.exports = {
    createCategory
}