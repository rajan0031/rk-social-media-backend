const userProfile = require("../../Models/SignupModel/SignupModel");



// start of the  register routes or signup routes


module.exports.registerRoute = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        console.log(name, email, password);

        const response = await userProfile.create(req.body);


        if (response) {
            res.json({
                response: response,
                status: true,
                message: `hello your profile is updated successfully `
            })
        }



    } catch (err) {
        console.log(err)
    }
};


// end of the register routes or signup routes