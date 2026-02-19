import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGODB_URI) {
    console.warn("[DB] MONGODB_URI not configured — database features disabled");
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

// ---- Schemas ----

const PremiumAccessSchema = new mongoose.Schema({
  templateId: { type: String, required: true },
  templateType: { type: String, enum: ["biodata", "resume"], required: true },
  paymentId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  accessToken: { type: String, required: true, unique: true },
  userEmail: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

const DownloadLogSchema = new mongoose.Schema({
  type: { type: String, enum: ["biodata", "resume"], required: true },
  template: String,
  createdAt: { type: Date, default: Date.now },
  userAgent: String,
  ip: String,
});

const BlogPostSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  content: String,
  category: String,
  tags: [String],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: Date,
  author: String,
  readTime: Number,
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
});

export const PremiumAccess = 
  mongoose.models.PremiumAccess || mongoose.model("PremiumAccess", PremiumAccessSchema);

export const DownloadLog = 
  mongoose.models.DownloadLog || mongoose.model("DownloadLog", DownloadLogSchema);

export const BlogPostModel = 
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
