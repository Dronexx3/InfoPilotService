var userModel = require('./userModel');
var key = '123456789trytryrtyr';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = async (userDetails) => {
    try {
        const userModelData = new userModel({
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email,
            password: encryptor.encrypt(userDetails.password)
        });

        await userModelData.save();
        return true;
    } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
    }
};

module.exports.loginuserDBService = async (userDetails) => {
    try {
        const result = await userModel.findOne({ email: userDetails.email });
        if (result) {
            const decrypted = encryptor.decrypt(result.password);
            if (decrypted === userDetails.password) {
                return { status: true, msg: "User Validated Successfully" };
            } else {
                return { status: false, msg: "User Validation Failed" };
            }
        } else {
            return { status: false, msg: "User Not Found" };
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        return { status: false, msg: "Invalid Data" };
    }
};
