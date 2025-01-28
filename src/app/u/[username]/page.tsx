


// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from "@/hooks/use-toast";
// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { MessageSchema } from '@/schemas/messageSchema';


// export default function SendMessage() {

//   const { toast } = useToast();

//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const [responses, setResponses] = useState<string[]>([]);
//   const [isSendingMessage, setIsSendingMessage] = useState(false);  // Added state for "Send Message"
//   const [isFetchingSuggestedMessages, setIsFetchingSuggestedMessages] = useState(false);  // Added state for "Suggest Message"
//   const [topic, setTopic] = useState("");

//   const form = useForm<z.infer<typeof MessageSchema>>({
//     resolver: zodResolver(MessageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const fetchSuggestedMessages = async () => {
//     setIsFetchingSuggestedMessages(true); // Set loading for "Suggest Message"
//     setResponses([]);

//     try {
//       const response = await fetch(`/api/suggest-messages?topic=${encodeURIComponent(topic)}`, { method: 'GET' });
//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();

//       if (reader) {
//         let result = '';
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           const chunk = decoder.decode(value, { stream: true });
//           result += chunk;
//           const jsonResponse = JSON.parse(result);
//           const message = jsonResponse.message;
//           const splitResponses = message.split('||').map((res: string) => res.trim());

//           for (const res of splitResponses) {
//             if (res) {
//               setResponses((prev) => [...prev, res]);
//               await new Promise((resolve) => setTimeout(resolve, 500));
//             }
//           }
//         }
//       }

//       toast({
//         title: 'Success',
//         description: 'Responses received successfully!',
//       });
//     } catch (error) {
//       console.log(error)
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch responses.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsFetchingSuggestedMessages(false); // Reset loading state for "Suggest Message"
//     }
//   };

//   const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
//     setIsSendingMessage(true); // Set loading for "Send Message"
//     try {
//       const response = await axios.post<ApiResponse>('/api/send-message', {
//         ...data,
//         username,
//       });

//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//       form.reset({ ...form.getValues(), content: '' });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ?? 'Failed to send message',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsSendingMessage(false); // Reset loading state for "Send Message"
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
//       <h1 className="text-4xl font-bold mb-6 text-center">
//         Public Profile Link
//       </h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Send Anonymous Message to @{username}</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Write your anonymous message here"
//                     className="resize-none"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="flex justify-center">
//             {isSendingMessage ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isSendingMessage || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//         {isFetchingSuggestedMessages ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button
//               onClick={fetchSuggestedMessages}
//               className="my-4"
//               disabled={isFetchingSuggestedMessages}
//             >
//               Get AI Suggested Messages
//             </Button>
//             )}
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-4">
//             {responses.length === 0 && !isFetchingSuggestedMessages ? (
//               <p className="text-gray-500">No suggestions yet.</p>
//             ) : (
//               responses.map((response, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className="mb-2"
//                   onClick={() => handleMessageClick(response)}
//                 >
//                   {response}
//                 </Button>
//               ))
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       <Separator className="my-6" />
//       <div className="text-center">
//         <div className="mb-4">Get Your Message Board</div>
//         <Link href={'/sign-up'}>
//           <Button>Create Your Account</Button>
//         </Link> 
//       </div>
//     </div>
//   );
// }




// "use client";

// import React, { useState } from "react";
// import { useParams } from "next/navigation";
// import { useForm, FormProvider } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import { useToast } from "@/hooks/use-toast";
// import {

//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { MessageSchema } from "@/schemas/messageSchema";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { ModeToggle } from "@/components/ThemeIcon";

// type SendMessageForm = z.infer<typeof MessageSchema>;

// export default function ProfilePage() {
//   const [responses, setResponses] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [topic, setTopic] = useState<string>("");
//   const { toast } = useToast();

//   const params = useParams();
//   const { userName } = params;

//   const form = useForm<SendMessageForm>({
//     resolver: zodResolver(MessageSchema),
//     defaultValues: {
//       content: "",
//     },
//   });

//   const onSubmit = async (data: SendMessageForm) => {
//     try {
//       const response = await axios.post("/api/send-message", {
//         userName,
//         content: data.content,
//       });

//       if (response.data.success) {
//         toast({
//           title: "Success",
//           description: "Message sent successfully!",
//         });
//         form.reset();
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to send the message.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.log(error)
//       toast({
//         title: "Error",
//         description: "An error occurred while sending the message.",
//         variant: "destructive",
//       });
//     }
//   };

//   const fetchStreamingResponse = async () => {
//     setLoading(true);
//     setResponses([]);

//     try {
//       const response = await fetch(`/api/suggest-messages?topic=${encodeURIComponent(topic)}`, { method: "GET" });
//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();

//       if (reader) {
//         let result = "";
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           const chunk = decoder.decode(value, { stream: true });
//           result += chunk;
//           const jsonResponse = JSON.parse(result);
//           const message = jsonResponse.message;
//           const splitResponses = message.split("||").map((res: string) => res.trim());
//           for (const res of splitResponses) {
//             if (res) {
//               setResponses((prev) => [...prev, res]);
//               await new Promise((resolve) => setTimeout(resolve, 500));
//             }
//           }
//         }
//       }

//       toast({
//         title: "Success",
//         description: "Responses received successfully!",
//       });
//     } catch (error) {
//       console.log(error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch responses.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     form.setValue("content", suggestion);
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h1 className="text-3xl font-bold text-center text-black">
//         Welcome, send messages to {userName}
//       </h1>

//       {/* Write Message Section */}
//       <div className="mt-8">
//         <FormProvider {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               name="content"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Write a Message</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Type your message here..."
//                       disabled={form.formState.isSubmitting}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               type="submit"
//               className="bg-black text-white hover:bg-gray-800 mt-4"
//               disabled={form.formState.isSubmitting}
//             >
//               {form.formState.isSubmitting ? (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               ) : (
//                 "Send"
//               )}
//             </Button>
//           </form>
//         </FormProvider>

//         {/* Topic Input Section */}
//         <div className="mt-8">
//           <FormProvider {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
//               <FormField
//                 name="content"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Enter a Topic</FormLabel>
//                     <FormControl>
//                       <Input
//                         {...field}
//                         placeholder="Type a topic here..."
//                         value={topic}
//                         onChange={(e) => setTopic(e.target.value)}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </form>
//           </FormProvider>
//         </div>
//       </div>

//       {/* Suggested Messages Section */}
//       <div className="mt-8">
//         <div className="flex justify-between items-center">
//           <h2 className="text-xl font-semibold">Get AI Suggested Messages</h2>
//           <Button
//             onClick={fetchStreamingResponse}
//             className="bg-black text-white hover:bg-gray-800"
//             disabled={loading}
//           >
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Suggestions"}
//           </Button>
//         </div>
//         <div className="mt-4 space-y-4">
//           {responses.length === 0 && !loading && (
//             <p className="text-gray-500 text-center">No suggestions yet.</p>
//           )}
//           {responses.map((response, index) => (
//             <Card key={index} className="p-4 bg-gray-100">
//               <CardHeader className="font-semibold">{response}</CardHeader>
//               <CardContent>
//                 <Button
//                   onClick={() => handleSuggestionClick(response)}
//                   className="w-full text-left bg-white text-black border border-gray-300 hover:bg-gray-200"
//                 >
//                   Use this suggestion
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//         <div className="absolute bottom-4 right-4">
//           <ModeToggle />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import {

  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { MessageSchema } from "@/schemas/messageSchema";
import  { ModeToggle } from "@/components/ThemeIcon";


type SendMessageForm = z.infer<typeof MessageSchema>;

export default function ProfilePage() {
  const [responses, setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const { toast } = useToast();
 
  const params = useParams();
  const { userName } = params;

  const form = useForm<SendMessageForm>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      content: "",
    },
  });

 

  const onSubmit = async (data: SendMessageForm) => {
    try {
      const response = await axios.post("/api/send-message", {
        userName,
        content: data.content,
      });

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Message sent successfully!",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to send the message.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "An error occurred while sending the message.",
        variant: "destructive",
      });
    }
  };

  const fetchStreamingResponse = async () => {
    setLoading(true);
    setResponses([]);

    try {
      const response = await fetch(`/api/suggest-messages?topic=${encodeURIComponent(topic)}`, { method: "GET" });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let result = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          const jsonResponse = JSON.parse(result);
          const message = jsonResponse.message;
          const splitResponses = message.split("||").map((res: string) => res.trim());
          for (const res of splitResponses) {
            if (res) {
              setResponses((prev) => [...prev, res]);
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        }
      }

      toast({
        title: "Success",
        description: "Responses received successfully!",
      });
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to fetch responses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("content", suggestion);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center text-black">
          Welcome, send messages to {userName}
        </h1>

       

        {/* Write Message Section */}
        <div className="mt-8">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Write a Message</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type your message here..."
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800 mt-4"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </FormProvider>
              {/* Topic Input Section */}
       
              <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
              <FormField
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter a Topic</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Type a topic here..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
            </form>
          </FormProvider>
      
        </div>

        {/* Suggested Messages Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Get AI Suggested Messages</h2>
         
            <Button
              onClick={fetchStreamingResponse}
              className="bg-black text-white hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Suggestions"}
            </Button>
          </div>
          <div className="suggestions-container mt-4">
            {responses.length === 0 && !loading && (
              <p className="text-gray-500 text-center">No suggestions yet.</p>
            )}
            {responses.map((response, index) => (
              <Button
                key={index}
                className="mt-2 w-full text-left bg-white text-black border-spacing-1 border-black hover:bg-gray-200"
                onClick={() => handleSuggestionClick(response)}
              >
                {response}
              </Button>
            ))}
            <div className="absolute bottom-4 right-4">
        <ModeToggle/>
      </div>
          </div>
        </div>
      </div>
      
    </>
  );
}