exports.statusCode = (statusCode, error) => {
  console.log("Caught error", error);
  return {
    statusCode,
    error: error && error.message ? error.message : "Unknow error.",
  };
};
