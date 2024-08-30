const query = require('../database/dbquerys')


const addUser = async (uid, email) =>{
    console.log("adduser service", uid, email)

    const result = await query.addUser(uid,email)
    if(result > 0){
        return result
    } else{
        return 0
    }
}

module.exports = {
    addUser
}