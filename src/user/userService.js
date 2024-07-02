var userModel = require("./userModel");
var key = "123456789trytryrtyr";
var encryptor = require("simple-encryptor")(key);
const jwt = require("jsonwebtoken");

/*
// AWS
var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
//
*/

module.exports.createUserDBService = async (userDetails) => {
  // Guardar en MongoDB
  try {
    const userModelData = new userModel({
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      email: userDetails.email,
      password: encryptor.encrypt(userDetails.password),
    });

    await userModelData.save();

    /*
    // Guardar en DynamoDB
    const params = {
      TableName: "Users",
      Item: {
        email: userDetails.email,
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        password: encryptor.encrypt(userDetails.password),
      },
    };

    try {
      await dynamoDB.put(params).promise();
      console.log("User guardado en DynamoDB");
    } catch (error) {
      console.error("Error al guardar usuario en DynamoDB:", error);
    }
*/
    console.log("User guardado en MongoDB");

    return true;
  } catch (error) {
    console.error("Error al guardar el usuario en la base de datos MongoDB:", error);
    return false;
  }
};

module.exports.loginuserDBService = async (userDetails) => {
  try {
    const result = await userModel.findOne({ email: userDetails.email });
    if (result) {
      const decrypted = encryptor.decrypt(result.password);
      if (decrypted === userDetails.password) {
        const token = createToken(result);
        return {
          status: true,
          msg: "User Validated Successfully",
          token: token,
        };
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

function createToken(user) {
  const payload = {
    user_name: user.firstname,
  };
  return jwt.sign(payload, "infopilot");
}
