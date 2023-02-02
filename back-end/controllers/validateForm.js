const e = require("express");
const Yup = require("yup");

// const formSchema = Yup.object({
//     email: Yup.string().required("Email required").min(5, "Invalid Email"),
//     password: Yup.string().required("Password required").min(1, "Invalid Password")
// })

// const validateForm = async(req,res, next) => {

//     const formData = req.body;
//     let valid;
//     try {
//         valid = await formSchema.validate(formData);
//     } catch(err) {
//         res.status(422).send();
//         console.log(err.errors);
//     }
//     if (valid) {
//         console.log("form is good");
//         next();
//     }
// }

const validateForm = (obj) => async(req,res, next) => {
    const formSchema = Yup.object(obj);
    const formData = req.body;
    let valid;
    try {
        valid = await formSchema.validate(formData);
    } catch(err) {
        res.status(422).send();
        console.log(err.errors);
    }
    if (valid) {
        console.log("form is good");
        next();
    }
}

module.exports = validateForm;