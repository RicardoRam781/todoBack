const userService = require('../services/userServices');

const addUser = async (req,res) => {
   
    const result = await userService.addUser(req.body.uid, req.body.email)
    if(result){
        res.status(201).json(result)
    } else {
        res.status(500)
    }
}

module.exports = {
    addUser
}

