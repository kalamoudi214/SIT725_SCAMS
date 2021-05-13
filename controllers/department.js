const department = require('../models/department');


const createDepartment = async(req,res) => {

    try{

        let  data  = req.body;
        let users = await department.find();
        let check = users.find(element => element.name === data.name );
        if(!check)
        {
        let result = await department.create({...data});
        res.render('department.ejs',{data:{success:'Department Created Successfully'}})
       // res.status(200).json({data: result })
        }
       else {
        // res.status(400).json({message: 'Department already exist' })
        res.render('department.ejs',{data:{error:'Department already exist'}})
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({error:'There is an error while creating department'});
    }

}

module.exports = {
    createDepartment
}