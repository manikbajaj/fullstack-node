const { StatusCodes, getReasonPhrase } = require("http-status-codes");

function responseFormatter(req, res, next) {
  // Store the original res.json function to a variable
  const originalJson = res.json;

  // Redefine res.json method
  res.json = (data) => {
    // Check if the status code has been set, use 200 OK if not set
    const statusCode = res.statusCode !== 200 ? res.statusCode : StatusCodes.OK;

    // Construct the standardized response structure
    const response = {
      status: statusCode >= 200 && statusCode < 300 ? "success" : "error",
      statusCode: statusCode,
      message: getReasonPhrase(res.statusCode),
      data: statusCode >= 200 && statusCode < 300 ? data : null,
      error: statusCode >= 200 && statusCode < 300 ? null : data,
    };

    // Call the original response with a new object
    originalJson.call(res, response);
  };

  next();
}

module.exports = responseFormatter;
