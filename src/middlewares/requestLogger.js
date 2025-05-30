const requestLogger = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    // eslint-disable-next-line no-console
    console.log(
      `${req.method} ${req.originalUrl} [${res.statusCode}] - ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  res.on('error', (err) => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    // eslint-disable-next-line no-console
    console.error(
      `${req.method} ${req.originalUrl} [${res.statusCode || 'ERROR'}] - ${durationInMilliseconds.toLocaleString()} ms - Error: ${err.message}`
    );
  });

  next();
};

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9; //  Nanoseconds per second
  const NS_TO_MS = 1e-6; // Nanoseconds to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) * NS_TO_MS;
};

module.exports = requestLogger;
