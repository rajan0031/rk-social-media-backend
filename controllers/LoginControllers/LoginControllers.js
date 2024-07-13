
const userProfile = require("../../models/SignupModel/SignupModel")
// start of the  register routes or signup routes


module.exports.loginRoutes = async (req, res) => {

    try {

        const { email, password } = req.body;

        console.log(email, password);

        const response = await userProfile.find({
            email: email,
        });

        console.log(response[0].password);


        if (response[0].password === password) {
            res.json({
                response: response,
                status: true,
                message: ``
            })
        }
        else {
            res.json({
                message: "login failed password is wrong or email"
            })
        }



    } catch (err) {
        console.log(err)
    }
};


// end of the register routes or signup routes