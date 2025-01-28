import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";


export async function POST(request: Request) {
    await dbConnect();

    try {
     const {username, email, password} = await request.json()
   
        const existingUserVerifiedByUsername = await
        UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {status: 400})
        }



        const exsitingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 100000).toString();

        if(exsitingUserByEmail) {

         if(exsitingUserByEmail.isVerified) {       
            return Response.json({
                success: false,
                message: "User already exsist with this email"
            }, {status: 400})

         }
           else {

            const hashedPassword = await bcrypt.hash(password, 10)

              exsitingUserByEmail.password = hashedPassword;
              exsitingUserByEmail.verifyCode = verifyCode;
              exsitingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

              await exsitingUserByEmail.save()


           }

        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10)


             const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);

               const newUser =  new UserModel({
                     
                        username,
                        email,
                        password: hashedPassword,
                        verifyCode,
                        verifyCodeExpiry: expiryDate,
                        isVerified: false,
                        isAcceptingMessage: true,
                        messages: []
                }) 


                await newUser.save();

                

        }
       
        ///// send verifiacation email

        const emailResponse = await sendVerificationEmail(
                 email,
                 username,
                 verifyCode
        )

        if(!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, {status: 500})
        }


        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, {status: 201})



    } catch (error) {

        console.error("Error registering user", error)

        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }

        )

    }

}