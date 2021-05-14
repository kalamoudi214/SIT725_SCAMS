const user = require('../models/user');


const createUser = async(req,res) => {

    try{

        let  data  = req.body;

        let users = await user.find().lean();
        let check = users.find(element => element.email === data.email );
        if(!check)
        {

        let result = await user.create({...data});
        
        res.redirect('/')
        }
        else{
            res.status(400).json({message: 'Email already exist' })
        }
    }
    catch(e)
    {
        console.log(e);
        res.json({error:'There is an error while creating user'});
    }

}

const loginUser  = async (req, res)=>{

    let result = await user.findOne({email: req.body.email}).lean();
    if( result && Object.keys(result).length)
    {
        if(req.body.password == result.password)
        {
            //res.redirect('/dashboard')
            res.render('login.ejs',{data:{success:'login successfully'}})
        }
        else{
            res.render('login.ejs',{data:{error:'incorrect password'}})
        }
    }
    else{
        res.render('login.ejs',{data:{error:'incorrect Email'}})
    }
}

module.exports = {
    createUser,
    loginUser
}