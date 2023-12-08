const config = {
  env: process.env.NODE_ENV || 'development', 
  port: process.env.PORT || 3000,
   jwtSecret: process.env.JWT_SECRET || "GROUP_5_KEY", 
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://v0807:mongo1234@cluster0.h2hfq93.mongodb.net/?retryWrites=true&w=majority"
  };
  
  export default config