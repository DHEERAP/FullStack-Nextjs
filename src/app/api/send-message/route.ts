// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/User";
// import { Message } from "@/model/User";

// export async function POST(request: Request) {

//     dbConnect();

//     const { username, content } = await request.json();


//     try {
//         const user = await UserModel.findOne({ username });

//         if (!user) {

//             return Response.json(
//                 {
//                     success: false,
//                     message: "User Not found "
//                 },
//                 { status: 404 }
//             )
//         }


//         ///   is user accepting the messages?

//         if (!user.isAcceptingMessage) {
//             return Response.json(
//                 {
//                     success: false,
//                     message: "User not acepting messages"
//                 },
//                 { status: 403 }
//             )

//         }

//         const newMessage = { content, createdAt: new Date() }

//         user.messages.push(newMessage as Message)

//         await user.save();


//         return Response.json(
//             {
//                 success: true,
//                 message: "Message sent successfully"
//             },
//             { status: 200 }
//         )

//     } catch (error) {

//         console.log("Error adding messages ", error);


//         return Response.json(
//             {
//                 success: false,
//                 message: "Internal server error"
//             },
//             { status: 500 }
//         )

//     }

// }


import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
// import { getServerSession, User } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req:Request) {
    await dbConnect();
     const {userName,content}= await req.json();

     try {
        const user = await UserModel.findOne({userName});
        if(!user){
            return Response.json({
                success: false,
                message: " user not found"
            }, { status: 404})
        }
        if (!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "user is not accepting messages"
            }, { status: 403})
        }

        const newMessage = {content,createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json({
            success: true,
            message: "messages sent successfully"
        }, { status: 200})

     } catch (error) {
        console.log("error sending messages ", error)
        return Response.json({
            success: false,
            message: "error sending messages"
        }, { status: 500 })
     }

    }