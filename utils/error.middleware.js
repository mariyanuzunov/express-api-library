export const errorHandler = (err, req, res, next) => {
  const code = res.statusCode ? res.statusCode : 500;
  let message = err.message;

  if (code === 500) {
    message = "Internal Server Error";
    console.error(err.message);
  }

  res.status(code).json({ message });
};
