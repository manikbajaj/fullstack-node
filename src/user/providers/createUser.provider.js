const User = require("../user.schema.js");
const bcrypt = require("bcrypt");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function createUserProvider(req, res) {
  const validatedData = matchedData(req);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(validatedData.password, salt);

  console.log(hashedPassword);

  try {
    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
    });
    await user.save();
    delete user.password;
    return res.status(StatusCodes.OK).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger("Error while creating user: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createUserProvider;
