const Yup = require("yup");

const formSchema = Yup.object({
    email: Yup.string().required("Email required").min(5, "Invalid Email"),
    password: Yup.string().required("Password required").min(1, "Invalid Password")
})

const validateForm = (req,res) => {

        const formData = req.body;
        formSchema.validate(formData).catch(err => {
            res.status(422).send();
            console.log(err.errors);
        }).then(valid => {
            if (valid) {
                res.status(200).send()
                console.log("form is good");
            }
        })

}

module.exports = validateForm;