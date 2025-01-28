// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import { useCompletion } from 'ai/react';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Textarea } from '@/components/ui/textarea';
// // import { toast } from '@/components/ui/use-toast';

// import { useToast } from "@/hooks/use-toast";

// import * as z from 'zod';
// import { ApiResponse } from '@/types/ApiResponse';
// import Link from 'next/link';
// import { useParams } from 'next/navigation';
// import { MessageSchema } from '@/schemas/messageSchema';

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// export default function SendMessage() {

//   const {toast} = useToast();

//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const {
//     complete,
//     completion,
//     isLoading: isSuggestLoading,
//     error,
//   } = useCompletion({
//     api: '/api/suggest-messages',
//     initialCompletion: initialMessageString,
//   });

//   const form = useForm<z.infer<typeof MessageSchema>>({
//     resolver: zodResolver(MessageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const [isLoading, setIsLoading] = useState(false);

//   const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
//     setIsLoading(true);
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
//           axiosError.response?.data.message ?? 'Failed to sent message',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };



//   const fetchSuggestedMessages = async () => {
//     try {
//       complete('');
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//       // Handle error appropriately
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
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//           <Button
//             onClick={fetchSuggestedMessages}
//             className="my-4"
//             disabled={isSuggestLoading}
//           >
//             Suggest Messages
//           </Button>
//           <p>Click on any message below to select it.</p>
//         </div>
//         <Card>
//           <CardHeader>
//             <h3 className="text-xl font-semibold">Messages</h3>
//           </CardHeader>
//           <CardContent className="flex flex-col space-y-4">
//             {error ? (
//               <p className="text-red-500">{error.message}</p>
//             ) : (
//               parseStringMessages(completion).map((message, index) => (
//                 <Button
//                   key={index}
//                   variant="outline"
//                   className="mb-2"
//                   onClick={() => handleMessageClick(message)}
//                 >
//                   {message}
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








// 'use client';

// import React, { useState } from 'react';
// import axios, { AxiosError } from 'axios';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Loader2 } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Separator } from '@/components/ui/separator';
// import { CardHeader, CardContent, Card } from '@/components/ui/card';
// import { useCompletion } from 'ai/react';
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

// const specialChar = '||';

// const parseStringMessages = (messageString: string): string[] => {
//   return messageString.split(specialChar);
// };

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// export default function SendMessage() {

//   const { toast } = useToast();

//   const params = useParams<{ username: string }>();
//   const username = params.username;

//   const [responses, setResponses] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [topic, setTopic] = useState("");

//   const form = useForm<z.infer<typeof MessageSchema>>({
//     resolver: zodResolver(MessageSchema),
//   });

//   const messageContent = form.watch('content');

//   const handleMessageClick = (message: string) => {
//     form.setValue('content', message);
//   };

//   const fetchSuggestedMessages = async () => {
//     setIsLoading(true);
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
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch responses.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
//     setIsLoading(true);
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
//       setIsLoading(false);
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
//             {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button type="submit" disabled={isLoading || !messageContent}>
//                 Send It
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>

//       <div className="space-y-4 my-8">
//         <div className="space-y-2">
//         {isLoading ? (
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//             ) : (
//               <Button
//               onClick={fetchSuggestedMessages}
//               className="my-4"
//               disabled={isLoading}
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
//             {responses.length === 0 && !isLoading ? (
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



'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MessageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {

  const { toast } = useToast();

  const params = useParams<{ username: string }>();
  const username = params.username;

  const [responses, setResponses] = useState<string[]>([]);
  const [isSendingMessage, setIsSendingMessage] = useState(false);  // Added state for "Send Message"
  const [isFetchingSuggestedMessages, setIsFetchingSuggestedMessages] = useState(false);  // Added state for "Suggest Message"
  const [topic, setTopic] = useState("");

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
  });

  const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const fetchSuggestedMessages = async () => {
    setIsFetchingSuggestedMessages(true); // Set loading for "Suggest Message"
    setResponses([]);

    try {
      const response = await fetch(`/api/suggest-messages?topic=${encodeURIComponent(topic)}`, { method: 'GET' });
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let result = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          const jsonResponse = JSON.parse(result);
          const message = jsonResponse.message;
          const splitResponses = message.split('||').map((res: string) => res.trim());

          for (const res of splitResponses) {
            if (res) {
              setResponses((prev) => [...prev, res]);
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
          }
        }
      }

      toast({
        title: 'Success',
        description: 'Responses received successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch responses.',
        variant: 'destructive',
      });
    } finally {
      setIsFetchingSuggestedMessages(false); // Reset loading state for "Suggest Message"
    }
  };

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsSendingMessage(true); // Set loading for "Send Message"
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsSendingMessage(false); // Reset loading state for "Send Message"
    }
  };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isSendingMessage ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isSendingMessage || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
        {isFetchingSuggestedMessages ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
              onClick={fetchSuggestedMessages}
              className="my-4"
              disabled={isFetchingSuggestedMessages}
            >
              Get AI Suggested Messages
            </Button>
            )}
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {responses.length === 0 && !isFetchingSuggestedMessages ? (
              <p className="text-gray-500">No suggestions yet.</p>
            ) : (
              responses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2"
                  onClick={() => handleMessageClick(response)}
                >
                  {response}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link> 
      </div>
    </div>
  );
}
