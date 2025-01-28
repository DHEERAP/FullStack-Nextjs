// 'use client'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import Link from "next/link"

// import { signIn } from 'next-auth/react';
// import { useToast } from "@/hooks/use-toast"
// import { useRouter } from "next/navigation"

//   import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// import { signInSchema } from "@/schemas/signInSchema"




// const signingIn = () => {



//   const { toast } = useToast()

//   const router = useRouter();


//   //// zod implementation

//   const form = useForm<z.infer<typeof signInSchema>>({
//     resolver: zodResolver(signInSchema),
//     defaultValues: {
//       identifier  : '',
//       password: ''
//     }
//   })




//   const onSubmit = async (data: z.infer<typeof signInSchema>) => {

//     const result = await signIn('credentials', {
//       redirect: false,
//       identifier: data.identifier,
//       password: data.password
//     })

//       if(result?.error){
//         if(result.error === 'CredentialsSignin'){
//           toast({
//             title: "Login  failed",
//             description: "Inco  rrect username or password",
//             variant: "destructive"
//           })
//         }
//         else{
//           toast({
//             title: "Error",
//             description: result.error,
//             variant: "destructive"
//           })
//         }
//       }

//       if(result?.url){
//         router.replace('/dashboard');
//       }

//   }


//   return (

//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//     <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//       <div className="text-center">
//         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//           Welcome Back to True Feedback
//         </h1>
//         <p className="mb-4">Sign in to continue your secret conversations</p>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             name="identifier"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email/Username</FormLabel>
//                 <Input {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="password"
//             control={form.control}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <Input type="password" {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button className='w-full' type="submit">Sign In</Button>
//         </form>
//       </Form>
//       <div className="text-center mt-4">
//         <p>
//           Not a member yet?{' '}
//           <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default signingIn


'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"

import { signIn } from 'next-auth/react';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { signInSchema } from "@/schemas/signInSchema"

const SigningIn = () => {  // Change the function name to start with an uppercase letter

  const { toast } = useToast()

  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })

    if(result?.error){
      if(result.error === 'CredentialsSignin'){
        toast({
          title: "Login failed",
          description: "Incorrect username or password",
          variant: "destructive"
        })
      }
      else{
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    }

    if(result?.url){
      router.replace('/dashboard');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SigningIn
