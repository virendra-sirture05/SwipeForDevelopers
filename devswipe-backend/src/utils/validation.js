const validator = require('validator')
const validateSignupData = (req) =>{
    const {firstName , lastName, email, password} = req.body;
    if(!firstName || !lastName){
        throw new Error('Name is not valid')
    }
    else if(!validator.isEmail(email)){
        throw new Error("email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }
}

const validateEditProfileData = (req)=>{
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "About",
        "gender",
    ]
    const isEditAllowed = Object.keys(req.body).every((field)=>
        allowedEditFields.includes(field)
    )
    return isEditAllowed;
}

module.exports = {validateSignupData, validateEditProfileData}