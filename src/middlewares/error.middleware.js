/**
 * TODO: Global error handler
 *
 * Handle different error types:
 *
 * 1. Multer file size error (err.code === 'LIMIT_FILE_SIZE'):
 *    - Return 400 with { error: { message: 'File size exceeds 5MB limit' } }
 *
 * 2. Multer file type error (err.message includes 'Invalid file type'):
 *    - Return 400 with { error: { message: err.message } }
 *
 * 3. Mongoose validation error (err.name === 'ValidationError'):
 *    - Extract messages from err.errors
 *    - Return 400 with { error: { message: 'combined messages' } }
 *
 * 4. Mongoose duplicate key error (err.code === 11000):
 *    - Return 409 with { error: { message: 'Resource already exists' } }
 *
 * 5. Default error:
 *    - Return status from err.status or 500
 *    - { error: { message: err.message || 'Internal server error' } }
 */
export function errorHandler(err, req, res, next) {
  // Multer file size
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: { message: 'File size exceeds 5MB limit' } });
  }

  // Multer invalid file type (we threw Error with message)
  if (err && err.message && /invalid file type/i.test(err.message)) {
    return res.status(400).json({ error: { message: err.message } });
  }

  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ error: { message: messages } });
  }

  // Duplicate key
  if (err && err.code === 11000) {
    return res.status(409).json({ error: { message: 'Resource already exists' } });
  }

  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Internal server error';
  return res.status(status).json({ error: { message } });
}
