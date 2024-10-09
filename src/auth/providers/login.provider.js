const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);
  try {
    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    errorLogger("Error while trying to login: ", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
