const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const getUserByEmail = require("../../user/providers/getUserByEmail.provider.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");

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

    // ! Just sending this at the moment we will send JWT instead
    return res.status(StatusCodes.OK).json({ login: true });
  } catch (error) {
    errorLogger("Error while trying to login: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
