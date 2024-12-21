const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const getUserByEmail = require("../../user/providers/getUserByEmail.provider.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const generateTokenProvider = require("./generateToken.provider.js");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    // Get the user from the database
    const user = await getUserByEmail(validatedData.email);

    // Compare password to hash
    const result = await bcrypt.compare(validatedData.password, user.password);

    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please check your credentials." });
    }

    // Generate Access token
    const token = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger("Error while trying to login: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
