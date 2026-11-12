// Global Error Handling Middleware
export default (err, req, res, next) => {
  console.log(err.message);
  console.log(err.statusCode);

  let error = err.error || "Internal Server Error";
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (statusCode == 404) {
    error = "Not Found";
  } else if (err.statusCode == 400) {
    error = "Bad Request";
  }

  res.status(statusCode).json({
    message: message,
    error: error,
    statusCode: statusCode,
  });
};
