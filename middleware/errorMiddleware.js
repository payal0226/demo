const notFound = (req, res) => {
  res.status(404).render('partials/error', {
    title: '404 - Not Found',
    message: 'The page you are looking for does not exist.'
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).render('partials/error', {
    title: '500 - Server Error',
    message: err.message || 'Something went wrong.'
  });
};

module.exports = { notFound, globalErrorHandler };
