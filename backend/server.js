import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import chatrouter from "./routes/chatRoutes.js"
import customChatRoute from "./routes/customChatRoute.js";

//import aiChatRouter from "./routes/aiChatRoute.js"; // 👈 NEW: AI Chatbot route

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())

// --- IMPORTANT: CORS Configuration Update ---
// Define allowed origins for production, but include localhost for development
const allowedOrigins = [
  "http://localhost:5173", // Your frontend development server
  "http://localhost:5174",
  "https://cywala.com",
  "https://www.cywala.com"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or direct file access)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  // Ensure PATCH and OPTIONS are included in the allowed methods
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // Allow Content-Type and Authorization headers, which are commonly used
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// --- End CORS Configuration Update ---

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use('/api/chats', chatrouter);
app.use("/api", customChatRoute);
//app.use("/api/ai", aiChatRouter); // 👈 NEW endpoint for Hugging Face chatbot

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))


// import express from "express"
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from "./config/mongodb.js"
// import connectCloudinary from "./config/cloudinary.js"
// import userRouter from "./routes/userRoute.js"
// import doctorRouter from "./routes/doctorRoute.js"
// import adminRouter from "./routes/adminRoute.js"
// import chatrouter from "./routes/chatRoutes.js"

// // app config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// const allowedOrigins = [
//   "https://cywala.com",
//   "https://www.cywala.com"
// ];

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// // api endpoints
// app.use("/api/user", userRouter)
// app.use("/api/admin", adminRouter)
// app.use("/api/doctor", doctorRouter)
// app.use('/api/chats', chatrouter);

// app.get("/", (req, res) => {
//   res.send("API Working")
// });

// app.listen(port, () => console.log(`Server started on PORT:${port}`))