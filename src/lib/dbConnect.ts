
// import mongoose from "mongoose";

// type connectionObject = {
//   isConnected?: number
// }

// const connection: connectionObject = {};

// async function dbConnect(): Promise<void> {

//   console.log("MongoDB URI:", process.env.MONGODB_URI); 

//   if (connection.isConnected) {
//     console.log("Already connected to database");
//     return;

//   }


//   try {

//     const db = await mongoose.connect(process.env.MONGODB_URI || '', {})


//     connection.isConnected = db.connections[0].readyState;

//     console.log("DB Connected Successfully");

//   } catch (error) {

//     console.log("Database connection is failed", error);

//     process.exit(1);
//   }


// }

// export default dbConnect;





import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {

    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;