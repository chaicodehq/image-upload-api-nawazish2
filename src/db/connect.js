import mongoose from 'mongoose';

/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  if (!uri || typeof uri !== 'string' || uri.trim() === '') {
    throw new Error('MongoDB URI is required');
  }

  // mongoose.connect returns a promise
  await mongoose.connect(uri, {
    // use new URL parser and unified topology are default in newer mongoose,
    // but include nothing special here to keep compatibility with tests.
  });

  return mongoose.connection;
}
