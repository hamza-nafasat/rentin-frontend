// 'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
// import { LiaHomeSolid } from 'react-icons/lia';
// import { useState, useEffect, useRef } from 'react';
// import { PiLinkSimpleBold } from 'react-icons/pi';
// import Image from 'next/image';
// import { IoClose } from 'react-icons/io5';
// import { useSelector } from 'react-redux';
// import socketService from '@/utils/socket';
// import { useGetMessagesByChatIdQuery } from '@/features/message/messageApi';
// import { useDispatch } from 'react-redux';

// // Helper function to generate chat ID from two user IDs
// const generateChatId = (userId1, userId2) => {
//   return [userId1, userId2].sort().join('_');
// };

// // Helper function to get role-based tabs
// const getRoleTabs = currentUserRole => {
//   switch (currentUserRole) {
//     case 'owner':
//       return ['Agents', 'Tenants'];
//     case 'tenant':
//       return ['Agents', 'Owners'];
//     case 'agent':
//       return ['Owners', 'Tenants'];
//     default:
//       return ['Users'];
//   }
// };

// // Mock users based on role - replace with actual API calls
// const getMockUsersByRole = (role, currentUserRole) => {
//   const baseUsers = {
//     agents: [
//       {
//         _id: '676d123456789abcdef01234',
//         name: 'Zilan',
//         role: 'agent',
//         avatar: '/images/default/avatar.jpeg',
//         status: 'offline',
//         location: '123 Sukhumvit Rd, Bangkok, Thailand',
//         time: '12:34 PM',
//       },
//       {
//         _id: '676d123456789abcdef01235',
//         name: 'Zyan',
//         role: 'agent',
//         avatar: '/images/default/avatar-1.jpeg',
//         status: 'online',
//         location: '123 Sukhumvit Rd, Bangkok, Thailand',
//         time: '12:34 PM',
//       },
//     ],
//     tenants: [
//       {
//         _id: '676d123456789abcdef01236',
//         name: 'Sarah',
//         role: 'tenant',
//         avatar: '/images/default/avatar-2.jpeg',
//         status: 'offline',
//         location: '123 Sukhumvit Rd, Bangkok, Thailand',
//         time: '12:34 PM',
//       },
//       {
//         _id: '676d123456789abcdef01237',
//         name: 'Alex',
//         role: 'tenant',
//         avatar: '/images/default/avatar.jpeg',
//         status: 'online',
//         location: '456 Main St, Bangkok, Thailand',
//         time: '1:15 PM',
//       },
//     ],
//     owners: [
//       {
//         _id: '676d123456789abcdef01238',
//         name: 'Asif',
//         role: 'owner',
//         avatar: '/images/default/avatar.jpeg',
//         status: 'online',
//         location: '123 Sukhumvit Rd, Bangkok, Thailand',
//         time: '12:34 PM',
//       },
//       {
//         _id: '676d123456789abcdef01239',
//         name: 'Nora',
//         role: 'owner',
//         avatar: '/images/default/avatar-2.jpeg',
//         status: 'offline',
//         location: '789 Business Ave, Bangkok, Thailand',
//         time: '11:20 AM',
//       },
//     ],
//   };

//   const roleKey = role.toLowerCase().replace('s', '') + 's'; // Convert "Agents" to "agents"
//   return baseUsers[roleKey] || [];
// };

// export default function ChatPage({ userId: propUserId }) {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   // Get role-based tabs
//   const roleTabs = getRoleTabs(user?.role || 'owner');
//   const [tab, setTab] = useState(roleTabs[0]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [input, setInput] = useState('');
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Refs
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // Get users based on current tab
//   const currentUsers = getMockUsersByRole(tab, user?.role);

//   // API query for messages
//   const {
//     data: messagesData,
//     error: messagesError,
//     isLoading: messagesLoading,
//     refetch: refetchMessages,
//   } = useGetMessagesByChatIdQuery(currentChatId, {
//     skip: !currentChatId,
//   });

//   // Initialize socket connection
//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       socketRef.current = socketService.connect();

//       socketRef.current.on('connect', () => {
//         console.log('Socket connected');
//         setIsConnected(true);
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Socket disconnected');
//         setIsConnected(false);
//       });

//       socketRef.current.on('receiveMessage', messageData => {
//         console.log('Received message:', messageData);

//         // Only add message if it's for the current chat
//         if (messageData.chatId === currentChatId) {
//           const formattedMessage = {
//             role: messageData.senderId === user._id ? 'user' : 'agent',
//             type: 'text',
//             content: messageData.message,
//             time: new Date(messageData.createdAt).toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             }),
//             _id: messageData.id,
//             senderId: messageData.senderId,
//             receiverId: messageData.receiverId,
//           };

//           setMessages(prev => [...prev, formattedMessage]);
//         }

//         // Invalidate and refetch chats to update last message
//         dispatch(messageApi.util.invalidateTags(['Message']));
//       });

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.off('connect');
//           socketRef.current.off('disconnect');
//           socketRef.current.off('receiveMessage');
//           socketService.disconnect();
//         }
//       };
//     }
//   }, [isAuthenticated, user?._id, currentChatId, dispatch]);

//   // Handle prop userId for initial chat setup
//   useEffect(() => {
//     if (propUserId && user?._id && currentUsers.length > 0) {
//       // Find user in current users or create a mock user
//       let targetUser = currentUsers.find(u => u._id === propUserId);

//       if (!targetUser) {
//         // Create a mock user for the provided ID
//         targetUser = {
//           _id: propUserId,
//           name: 'User',
//           role: 'tenant', // As specified in requirements
//           avatar: '/images/default/avatar.jpeg',
//           status: 'offline',
//           location: 'Unknown Location',
//           time: new Date().toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           }),
//         };
//       }

//       setSelectedUser(targetUser);
//       const chatId = generateChatId(user._id, propUserId);
//       setCurrentChatId(chatId);
//     }
//   }, [propUserId, user?._id, currentUsers]);

//   // Load messages when chat changes
//   useEffect(() => {
//     if (messagesData?.data) {
//       const formattedMessages = messagesData.data.map(msg => ({
//         role: msg.sender === user._id ? 'user' : 'agent',
//         type: 'text',
//         content: msg.message,
//         time: new Date(msg.createdAt).toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//         }),
//         _id: msg._id,
//         senderId: msg.sender,
//         receiverId: msg.receiver,
//       }));
//       setMessages(formattedMessages);
//     }
//   }, [messagesData, user?._id]);

//   // Join/leave socket rooms
//   useEffect(() => {
//     if (currentChatId && socketRef.current && isConnected) {
//       socketRef.current.emit('joinRoom', currentChatId);
//       console.log('Joined room:', currentChatId);

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.emit('leaveRoom', currentChatId);
//           console.log('Left room:', currentChatId);
//         }
//       };
//     }
//   }, [currentChatId, isConnected]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle user selection
//   const handleUserSelect = selectedUserData => {
//     setSelectedUser(selectedUserData);
//     setIsSidebarVisible(false);

//     if (user?._id) {
//       const chatId = generateChatId(user._id, selectedUserData._id);
//       setCurrentChatId(chatId);
//       setMessages([]); // Clear previous messages
//     }
//   };

//   // Simple helper to detect URLs (for link preview, if needed)
//   const urlRegex = /(https?:\/\/[^\s]+)/g;

//   const handleSendMessage = e => {
//     e.preventDefault();

//     // Handle file upload message first if a file is attached
//     if (attachedFile && selectedUser) {
//       const currentTime = new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       });
//       const fileMessage = {
//         role: 'user',
//         type: 'file',
//         file: attachedFile,
//         fileName: attachedFile.name || 'Uploaded file',
//         time: currentTime,
//       };

//       setMessages(prev => [...prev, fileMessage]);
//       setAttachedFile(null);
//     }

//     if (!input.trim() || !selectedUser || !currentChatId || !socketRef.current) return;

//     const messageData = {
//       roomId: currentChatId,
//       senderId: user._id,
//       receiverId: selectedUser._id,
//       message: input.trim(),
//     };

//     // Send message via socket
//     socketRef.current.emit('sendMessage', messageData);

//     // Clear input
//     setInput('');
//   };

//   // File input change handler
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     if (file) {
//       file.preview = URL.createObjectURL(file);
//       setAttachedFile(file);
//     }
//   };

//   if (!isAuthenticated) {
//     return <div>Please log in to access messages.</div>;
//   }

//   return (
//     <>
//       <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
//       <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
//         {/* Sidebar */}
//         <Card
//           className={`shadow-card w-full overflow-y-hidden rounded-lg py-0 sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold">Conversation</h2>
//               <div className="flex items-center gap-[6px]">
//                 {roleTabs.map((item, i) => (
//                   <button
//                     key={i}
//                     className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${tab === item ? 'opacity-100' : 'opacity-20'}`}
//                     onClick={() => setTab(item)}
//                   >
//                     {item}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Connection Status */}
//             <div className="mt-2 text-xs">
//               <span
//                 className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
//               ></span>
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </div>

//             <ul className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
//               {currentUsers.map(userData => (
//                 <li
//                   key={userData._id}
//                   className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
//                     selectedUser?._id === userData._id
//                       ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
//                       : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
//                   }`}
//                   onClick={() => handleUserSelect(userData)}
//                 >
//                   <Avatar className="size-[60px]">
//                     <AvatarImage src={userData.avatar} alt={userData.name} />
//                     <AvatarFallback>{userData.name[0]}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-[#1F242F]">{userData.name}</p>
//                       <span className="text-textPrimary text-xs">{userData.time}</span>
//                     </div>
//                     <p className="text-textPrimary flex items-center gap-1 truncate text-sm font-medium">
//                       <LiaHomeSolid className="text-textPrimary" />
//                       {userData.location}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">{userData.role}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </Card>

//         {/* Chat Window */}
//         <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
//           {/* Chat Header */}
//           <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
//             <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setIsSidebarVisible(true)}>
//               <ChevronLeft />
//             </Button>
//             <Avatar>
//               <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
//               <AvatarFallback>{selectedUser?.name?.[0] || 'U'}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{selectedUser?.name || 'Select a user'}</p>
//               <p
//                 className={`text-sm font-medium capitalize ${
//                   selectedUser?.status === 'online' ? 'text-[#36CE00]' : 'text-red-600'
//                 }`}
//               >
//                 {selectedUser?.status || 'offline'}
//               </p>
//             </div>
//           </CardHeader>

//           {/* Chat Content */}
//           <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
//             {messagesLoading && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-gray-500">Loading messages...</div>
//               </div>
//             )}

//             {messagesError && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-red-500">Error loading messages</div>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message, index) => (
//                 <div key={message._id || index}>
//                   {/* Message container */}
//                   <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     <div
//                       className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-white' : 'text-textPrimary bg-[#F4F4F5]'}`}
//                     >
//                       {/* Render different content based on message type */}
//                       {message.type === 'text' && (
//                         <>
//                           <p>{message.content}</p>
//                           {/* Simple link preview if message contains a URL */}
//                           {urlRegex.test(message.content) && (
//                             <a
//                               href={message.content.match(urlRegex)[0]}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="mt-2 block rounded border p-2 text-xs text-white"
//                             >
//                               Link Preview: {message.content.match(urlRegex)[0]}
//                             </a>
//                           )}
//                         </>
//                       )}
//                       {message.type === 'file' && (
//                         <div className="flex flex-col gap-2">
//                           {message.file?.type?.startsWith('image') ? (
//                             <img src={message.file.preview} alt={message.fileName} className="max-w-[200px] rounded" />
//                           ) : (
//                             <div className="flex items-center gap-2">
//                               <UploadCloud className="text-textPrimary h-5 w-5" />
//                               <span className="text-xs">{message.fileName}</span>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                       <div
//                         className={`mt-1 text-xs font-light ${message.role === 'user' ? 'text-white' : 'text-[#09090BCC]'}`}
//                       >
//                         {message.time}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           </CardContent>

//           {/* Chat Input */}
//           <CardFooter className="border-t p-4">
//             <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
//               {/* Hidden File Input */}
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//               <Input
//                 shadow
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder={selectedUser ? 'Type your message...' : 'Select a user to start chatting'}
//                 className="flex-1"
//                 disabled={!selectedUser || !isConnected}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className={`cursor-pointer ${!selectedUser ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 <PiLinkSimpleBold className="text-textPrimary h-6 w-6" />
//               </label>
//               <Button
//                 size="icon"
//                 className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
//                 type="submit"
//                 disabled={(!input.trim() && !attachedFile) || !selectedUser || !isConnected}
//               >
//                 <Send />
//               </Button>
//             </form>

//             {/* File Preview */}
//             {attachedFile && (
//               <div className="ml-2 flex items-center gap-2 rounded border p-2">
//                 {attachedFile.type.startsWith('image') ? (
//                   <div className="relative h-5 w-5 shrink-0">
//                     <Image
//                       src={attachedFile.preview}
//                       alt={attachedFile.name}
//                       width={20}
//                       height={20}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                     <button
//                       onClick={() => setAttachedFile(null)}
//                       className="shadow-card absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600"
//                       title="Remove image"
//                     >
//                       <IoClose className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <UploadCloud className="text-textPrimary h-6 w-6" />
//                     <span className="text-sm">{attachedFile.name}</span>
//                     <button onClick={() => setAttachedFile(null)} className="ml-2 text-xs text-red-600">
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// }

// 'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
// import { LiaHomeSolid } from 'react-icons/lia';
// import { useState, useEffect, useRef } from 'react';
// import { PiLinkSimpleBold } from 'react-icons/pi';
// import Image from 'next/image';
// import { IoClose } from 'react-icons/io5';
// import { useSelector } from 'react-redux';
// import socketService from '@/utils/socket';
// import { useGetMessagesByChatIdQuery, useGetChatsByRoleQuery, messageApi } from '@/features/message/messageApi';
// import { useDispatch } from 'react-redux';

// // Helper function to generate chat ID from two user IDs
// const generateChatId = (userId1, userId2) => {
//   return [userId1, userId2].sort().join('_');
// };

// // Helper function to get role-based tabs
// const getRoleTabs = currentUserRole => {
//   switch (currentUserRole) {
//     case 'owner':
//       return ['agents', 'tenants'];
//     case 'tenant':
//       return ['agents', 'owners'];
//     case 'agent':
//       return ['owners', 'tenants'];
//     default:
//       return ['users'];
//   }
// };

// // Helper function to format time
// const formatTime = dateString => {
//   return new Date(dateString).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// // Helper function to format message time
// const formatMessageTime = dateString => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//   if (messageDate.getTime() === today.getTime()) {
//     return formatTime(dateString);
//   } else {
//     return `${date.getMonth() + 1}/${date.getDate()}`;
//   }
// };

// export default function ChatPage({ userId: propUserId }) {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   // Get role-based tabs
//   const roleTabs = getRoleTabs(user?.role || 'owner');
//   const [tab, setTab] = useState(roleTabs[0]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [input, setInput] = useState('');
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Refs
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // API queries
//   const {
//     data: chatsData,
//     error: chatsError,
//     isLoading: chatsLoading,
//     refetch: refetchChats,
//   } = useGetChatsByRoleQuery(tab, {
//     skip: !isAuthenticated || !user?._id,
//   });

//   const {
//     data: messagesData,
//     error: messagesError,
//     isLoading: messagesLoading,
//     refetch: refetchMessages,
//   } = useGetMessagesByChatIdQuery(currentChatId, {
//     skip: !currentChatId,
//   });

//   // Get current chats based on API response
//   const currentChats = chatsData?.data || [];

//   // Initialize socket connection
//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       socketRef.current = socketService.connect();

//       socketRef.current.on('connect', () => {
//         console.log('Socket connected');
//         setIsConnected(true);
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Socket disconnected');
//         setIsConnected(false);
//       });

//       socketRef.current.on('receiveMessage', messageData => {
//         console.log('Received message:', messageData);

//         // Only add message if it's for the current chat
//         if (messageData.chatId === currentChatId) {
//           const formattedMessage = {
//             _id: messageData._id || messageData.id,
//             sender: messageData.senderId,
//             receiver: messageData.receiverId,
//             message: messageData.message,
//             file: messageData.file,
//             createdAt: messageData.createdAt || new Date().toISOString(),
//             isRead: messageData.isRead || false,
//           };

//           setMessages(prev => {
//             // Check if message already exists to avoid duplicates
//             const exists = prev.find(msg => msg._id === formattedMessage._id);
//             if (exists) return prev;
//             return [...prev, formattedMessage];
//           });
//         }

//         // Invalidate chats to update last message and time
//         dispatch(messageApi.util.invalidateTags(['Message']));
//       });

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.off('connect');
//           socketRef.current.off('disconnect');
//           socketRef.current.off('receiveMessage');
//           socketService.disconnect();
//         }
//       };
//     }
//   }, [isAuthenticated, user?._id, currentChatId, dispatch]);

//   // Handle prop userId for initial chat setup
//   useEffect(() => {
//     if (propUserId && user?._id && currentChats.length > 0) {
//       // Find user in current chats
//       const targetChat = currentChats.find(chat => chat.otherUser._id === propUserId);

//       if (targetChat) {
//         setSelectedUser(targetChat.otherUser);
//         const chatId = generateChatId(user._id, propUserId);
//         setCurrentChatId(chatId);
//       } else {
//         // Create a mock user for the provided ID if not found in chats
//         const mockUser = {
//           _id: propUserId,
//           name: 'User',
//           role: 'tenant',
//           avatar: '/images/default/avatar.jpeg',
//           profilePicture: '/images/default/avatar.jpeg',
//         };
//         setSelectedUser(mockUser);
//         const chatId = generateChatId(user._id, propUserId);
//         setCurrentChatId(chatId);
//       }
//     }
//   }, [propUserId, user?._id, currentChats]);

//   // Load messages when chat changes
//   useEffect(() => {
//     if (messagesData?.data) {
//       const formattedMessages = messagesData.data.map(msg => ({
//         _id: msg._id,
//         sender: msg.sender,
//         receiver: msg.receiver,
//         message: msg.message,
//         file: msg.file,
//         createdAt: msg.createdAt,
//         isRead: msg.isRead,
//       }));
//       setMessages(formattedMessages);
//     } else if (currentChatId && !messagesLoading) {
//       // Clear messages if no data
//       setMessages([]);
//     }
//   }, [messagesData, currentChatId, messagesLoading]);

//   // Join/leave socket rooms
//   useEffect(() => {
//     if (currentChatId && socketRef.current && isConnected) {
//       socketRef.current.emit('joinRoom', currentChatId);
//       console.log('Joined room:', currentChatId);

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.emit('leaveRoom', currentChatId);
//           console.log('Left room:', currentChatId);
//         }
//       };
//     }
//   }, [currentChatId, isConnected]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle user selection from chat list
//   const handleUserSelect = selectedChat => {
//     setSelectedUser(selectedChat.otherUser);
//     setIsSidebarVisible(false);

//     if (user?._id) {
//       const chatId = generateChatId(user._id, selectedChat.otherUser._id);
//       setCurrentChatId(chatId);
//     }
//   };

//   // Simple helper to detect URLs (for link preview, if needed)
//   const urlRegex = /(https?:\/\/[^\s]+)/g;

//   const handleSendMessage = e => {
//     e.preventDefault();

//     // Handle file upload message first if a file is attached
//     if (attachedFile && selectedUser) {
//       const fileMessage = {
//         _id: Date.now().toString() + '_file',
//         sender: user._id,
//         receiver: selectedUser._id,
//         message: '',
//         file: {
//           url: attachedFile.preview,
//           type: attachedFile.type,
//           name: attachedFile.name,
//         },
//         createdAt: new Date().toISOString(),
//         isRead: false,
//       };

//       setMessages(prev => [...prev, fileMessage]);

//       // Send file message via socket
//       if (socketRef.current && currentChatId) {
//         socketRef.current.emit('sendMessage', {
//           roomId: currentChatId,
//           senderId: user._id,
//           receiverId: selectedUser._id,
//           message: '',
//           file: {
//             url: attachedFile.preview,
//             type: attachedFile.type,
//             name: attachedFile.name,
//           },
//         });
//       }

//       setAttachedFile(null);
//     }

//     if (!input.trim() || !selectedUser || !currentChatId || !socketRef.current) return;

//     // Create optimistic message
//     const optimisticMessage = {
//       _id: Date.now().toString(),
//       sender: user._id,
//       receiver: selectedUser._id,
//       message: input.trim(),
//       file: null,
//       createdAt: new Date().toISOString(),
//       isRead: false,
//     };

//     // Add to local state immediately
//     setMessages(prev => [...prev, optimisticMessage]);

//     const messageData = {
//       roomId: currentChatId,
//       senderId: user._id,
//       receiverId: selectedUser._id,
//       message: input.trim(),
//     };

//     // Send message via socket
//     socketRef.current.emit('sendMessage', messageData);

//     // Clear input
//     setInput('');
//   };

//   // File input change handler
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     if (file) {
//       file.preview = URL.createObjectURL(file);
//       setAttachedFile(file);
//     }
//   };

//   if (!isAuthenticated) {
//     return <div>Please log in to access messages.</div>;
//   }

//   return (
//     <>
//       <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
//       <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
//         {/* Sidebar */}
//         <Card
//           className={`shadow-card w-full overflow-y-hidden rounded-lg py-0 sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold">Conversation</h2>
//               <div className="flex items-center gap-[6px]">
//                 {roleTabs.map((item, i) => (
//                   <button
//                     key={i}
//                     className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${tab === item ? 'opacity-100' : 'opacity-20'}`}
//                     onClick={() => setTab(item)}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Connection Status */}
//             <div className="mt-2 text-xs">
//               <span
//                 className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
//               ></span>
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </div>

//             {/* Chat List */}
//             <div className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
//               {chatsLoading && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">Loading chats...</div>
//                 </div>
//               )}

//               {chatsError && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-red-500">Error loading chats</div>
//                 </div>
//               )}

//               {!chatsLoading && !chatsError && currentChats.length === 0 && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">No chats found</div>
//                 </div>
//               )}

//               {currentChats.map(chatData => (
//                 <div
//                   key={chatData._id}
//                   className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
//                     selectedUser?._id === chatData.otherUser._id
//                       ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
//                       : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
//                   }`}
//                   onClick={() => handleUserSelect(chatData)}
//                 >
//                   <Avatar className="size-[60px]">
//                     <AvatarImage
//                       src={
//                         chatData.otherUser.profilePicture || chatData.otherUser.avatar || '/images/default/avatar.jpeg'
//                       }
//                       alt={chatData.otherUser.name}
//                     />
//                     <AvatarFallback>{chatData.otherUser.name?.[0] || 'U'}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-[#1F242F]">{chatData.otherUser.name}</p>
//                       <span className="text-textPrimary text-xs">
//                         {chatData.lastMessageTime ? formatMessageTime(chatData.lastMessageTime) : ''}
//                       </span>
//                     </div>
//                     <p className="text-textPrimary flex items-center gap-1 truncate text-sm font-medium">
//                       <LiaHomeSolid className="text-textPrimary" />
//                       {chatData.otherUser.location || 'Location not available'}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">{chatData.otherUser.role}</p>
//                     {chatData.lastMessage && (
//                       <p className="mt-1 truncate text-xs text-gray-400">
//                         {chatData.lastMessage.length > 30
//                           ? `${chatData.lastMessage.substring(0, 30)}...`
//                           : chatData.lastMessage}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Chat Window */}
//         <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
//           {/* Chat Header */}
//           <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
//             <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setIsSidebarVisible(true)}>
//               <ChevronLeft />
//             </Button>
//             <Avatar>
//               <AvatarImage
//                 src={selectedUser?.profilePicture || selectedUser?.avatar || '/images/default/avatar.jpeg'}
//                 alt={selectedUser?.name}
//               />
//               <AvatarFallback>{selectedUser?.name?.[0] || 'U'}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{selectedUser?.name || 'Select a user'}</p>
//               <p className="text-sm text-gray-500 capitalize">{selectedUser?.role || ''}</p>
//             </div>
//           </CardHeader>

//           {/* Chat Content */}
//           <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
//             {messagesLoading && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-gray-500">Loading messages...</div>
//               </div>
//             )}

//             {messagesError && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-red-500">Error loading messages</div>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message, index) => {
//                 const isUserMessage = message.sender === user._id;

//                 return (
//                   <div key={message._id || index}>
//                     {/* Message container */}
//                     <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
//                       <div
//                         className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
//                           isUserMessage ? 'bg-primary text-white' : 'text-textPrimary bg-[#F4F4F5]'
//                         }`}
//                       >
//                         {/* Render text message */}
//                         {message.message && (
//                           <>
//                             <p>{message.message}</p>
//                             {/* Simple link preview if message contains a URL */}
//                             {urlRegex.test(message.message) && (
//                               <a
//                                 href={message.message.match(urlRegex)[0]}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="mt-2 block rounded border p-2 text-xs text-white"
//                               >
//                                 Link Preview: {message.message.match(urlRegex)[0]}
//                               </a>
//                             )}
//                           </>
//                         )}

//                         {/* Render file message */}
//                         {message.file && (
//                           <div className="flex flex-col gap-2">
//                             {message.file.type?.startsWith('image') ? (
//                               <img src={message.file.url} alt={message.file.name} className="max-w-[200px] rounded" />
//                             ) : (
//                               <div className="flex items-center gap-2">
//                                 <UploadCloud className="text-textPrimary h-5 w-5" />
//                                 <span className="text-xs">{message.file.name}</span>
//                               </div>
//                             )}
//                           </div>
//                         )}

//                         <div className={`mt-1 text-xs font-light ${isUserMessage ? 'text-white' : 'text-[#09090BCC]'}`}>
//                           {formatTime(message.createdAt)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </div>
//           </CardContent>

//           {/* Chat Input */}
//           <CardFooter className="border-t p-4">
//             <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
//               {/* Hidden File Input */}
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//               <Input
//                 shadow
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder={selectedUser ? 'Type your message...' : 'Select a user to start chatting'}
//                 className="flex-1"
//                 disabled={!selectedUser || !isConnected}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className={`cursor-pointer ${!selectedUser ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 <PiLinkSimpleBold className="text-textPrimary h-6 w-6" />
//               </label>
//               <Button
//                 size="icon"
//                 className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
//                 type="submit"
//                 disabled={(!input.trim() && !attachedFile) || !selectedUser || !isConnected}
//               >
//                 <Send />
//               </Button>
//             </form>

//             {/* File Preview */}
//             {attachedFile && (
//               <div className="ml-2 flex items-center gap-2 rounded border p-2">
//                 {attachedFile.type.startsWith('image') ? (
//                   <div className="relative h-5 w-5 shrink-0">
//                     <Image
//                       src={attachedFile.preview}
//                       alt={attachedFile.name}
//                       width={20}
//                       height={20}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                     <button
//                       onClick={() => setAttachedFile(null)}
//                       className="shadow-card absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600"
//                       title="Remove image"
//                     >
//                       <IoClose className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <UploadCloud className="text-textPrimary h-6 w-6" />
//                     <span className="text-sm">{attachedFile.name}</span>
//                     <button onClick={() => setAttachedFile(null)} className="ml-2 text-xs text-red-600">
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// }

//// this is original file
// 'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import SendButton from '@/components/shared/small/Button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
// import { LiaHomeSolid } from 'react-icons/lia';
// import { useState, useEffect, useRef } from 'react';
// import { PiLinkSimpleBold } from 'react-icons/pi';
// import Image from 'next/image';
// import { IoClose } from 'react-icons/io5';
// import Modal from '@/components/shared/small/Modal';
// import Content8 from '@/components/tenant/popups/Content8';
// import { useSelector } from 'react-redux';
// import socketService from '@/utils/socket';
// import { useGetMessagesByChatIdQuery, useGetChatsByRoleQuery, messageApi } from '@/features/message/messageApi';
// import { useDispatch } from 'react-redux';

// // Helper function to generate chat ID from two user IDs
// const generateChatId = (userId1, userId2) => {
//   return [userId1, userId2].sort().join('_');
// };

// // Helper function to get role-based tabs
// const getRoleTabs = currentUserRole => {
//   switch (currentUserRole) {
//     case 'owner':
//       return ['agent', 'tenant'];
//     case 'tenant':
//       return ['agent', 'owner'];
//     case 'agent':
//       return ['owner', 'tenant'];
//     default:
//       return ['users'];
//   }
// };

// // Helper function to format time
// const formatTime = dateString => {
//   return new Date(dateString).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// // Helper function to format message time
// const formatMessageTime = dateString => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//   if (messageDate.getTime() === today.getTime()) {
//     return formatTime(dateString);
//   } else {
//     return `${date.getMonth() + 1}/${date.getDate()}`;
//   }
// };

// export default function ChatPage({ userId: propUserId }) {
//   const dispatch = useDispatch();
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   // Get role-based tabs
//   const roleTabs = getRoleTabs(user?.role || 'owner');
//   const [tab, setTab] = useState(roleTabs[0]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [input, setInput] = useState('');
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);

//   // Refs
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // API queries
//   const {
//     data: chatsData,
//     error: chatsError,
//     isLoading: chatsLoading,
//     refetch: refetchChats,
//   } = useGetChatsByRoleQuery(tab, {
//     skip: !isAuthenticated || !user?._id,
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const {
//     data: messagesData,
//     error: messagesError,
//     isLoading: messagesLoading,
//     refetch: refetchMessages,
//   } = useGetMessagesByChatIdQuery(currentChatId, {
//     skip: !currentChatId,
//   });

//   // Get current chats based on API response
//   const currentChats = chatsData?.chats || [];

//   // Initialize socket connection
//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       socketRef.current = socketService.connect();

//       socketRef.current.on('connect', () => {
//         console.log('Socket connected');
//         setIsConnected(true);
//       });

//       socketRef.current.on('disconnect', () => {
//         console.log('Socket disconnected');
//         setIsConnected(false);
//       });

//       socketRef.current.on('receiveMessage', messageData => {
//         console.log('Received message:', messageData);

//         // Only add message if it's for the current chat
//         if (messageData.chatId === currentChatId) {
//           const formattedMessage = {
//             _id: messageData._id || messageData.id,
//             sender: messageData.senderId,
//             receiver: messageData.receiverId,
//             message: messageData.message,
//             file: messageData.file,
//             createdAt: messageData.createdAt || new Date().toISOString(),
//             isRead: messageData.isRead || false,
//           };

//           setMessages(prev => {
//             // Check if message already exists to avoid duplicates
//             const exists = prev.find(msg => msg._id === formattedMessage._id);
//             if (exists) return prev;
//             return [...prev, formattedMessage];
//           });
//         }

//         // Invalidate chats to update last message and time
//         dispatch(messageApi.util.invalidateTags(['Message']));
//       });

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.off('connect');
//           socketRef.current.off('disconnect');
//           socketRef.current.off('receiveMessage');
//           socketService.disconnect();
//         }
//       };
//     }
//   }, [isAuthenticated, user?._id, currentChatId, dispatch]);

//   // Handle prop userId for initial chat setup
//   useEffect(() => {
//     if (propUserId && user?._id && currentChats.length > 0) {
//       // Find user in current chats
//       const targetChat = currentChats.find(chat => chat.withUser._id === propUserId);

//       if (targetChat) {
//         setSelectedUser(targetChat.withUser);
//         setCurrentChatId(targetChat.chatId);
//       } else {
//         // Create a mock user for the provided ID if not found in chats
//         const mockUser = {
//           _id: propUserId,
//           name: 'User',
//           role: 'tenant',
//           avatar: '/images/default/avatar.jpeg',
//           profilePicture: '/images/default/avatar.jpeg',
//         };
//         setSelectedUser(mockUser);
//         const chatId = generateChatId(user._id, propUserId);
//         setCurrentChatId(chatId);
//       }
//     }
//   }, [propUserId, user?._id, currentChats]);

//   // Load messages when chat changes
//   useEffect(() => {
//     if (messagesData?.data) {
//       const formattedMessages = messagesData.data.map(msg => ({
//         _id: msg._id,
//         sender: msg.sender,
//         receiver: msg.receiver,
//         message: msg.message,
//         file: msg.file,
//         createdAt: msg.createdAt,
//         isRead: msg.isRead,
//       }));
//       setMessages(formattedMessages);
//     } else if (currentChatId && !messagesLoading) {
//       // Clear messages if no data
//       setMessages([]);
//     }
//   }, [messagesData, currentChatId, messagesLoading]);

//   // Join/leave socket rooms
//   useEffect(() => {
//     if (currentChatId && socketRef.current && isConnected) {
//       socketRef.current.emit('joinRoom', currentChatId);
//       console.log('Joined room:', currentChatId);

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.emit('leaveRoom', currentChatId);
//           console.log('Left room:', currentChatId);
//         }
//       };
//     }
//   }, [currentChatId, isConnected]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle user selection from chat list
//   const handleUserSelect = selectedChat => {
//     setSelectedUser(selectedChat.withUser);
//     setIsSidebarVisible(false);

//     if (user?._id) {
//       setCurrentChatId(selectedChat.chatId);
//     }
//   };

//   // Simple helper to detect URLs (for link preview, if needed)
//   const urlRegex = /(https?:\/\/[^\s]+)/g;

//   const handleSendMessage = e => {
//     e.preventDefault();

//     // Handle file upload message first if a file is attached
//     if (attachedFile && selectedUser) {
//       const fileMessage = {
//         _id: Date.now().toString() + '_file',
//         sender: user._id,
//         receiver: selectedUser._id,
//         message: '',
//         file: {
//           url: attachedFile.preview,
//           type: attachedFile.type,
//           name: attachedFile.name,
//         },
//         createdAt: new Date().toISOString(),
//         isRead: false,
//       };

//       setMessages(prev => [...prev, fileMessage]);

//       // Send file message via socket
//       if (socketRef.current && currentChatId) {
//         socketRef.current.emit('sendMessage', {
//           roomId: currentChatId,
//           senderId: user._id,
//           receiverId: selectedUser._id,
//           message: '',
//           file: {
//             url: attachedFile.preview,
//             type: attachedFile.type,
//             name: attachedFile.name,
//           },
//         });
//       }

//       setAttachedFile(null);
//     }

//     if (!input.trim() || !selectedUser || !currentChatId || !socketRef.current) return;

//     // Create optimistic message
//     const optimisticMessage = {
//       _id: Date.now().toString(),
//       sender: user._id,
//       receiver: selectedUser._id,
//       message: input.trim(),
//       file: null,
//       createdAt: new Date().toISOString(),
//       isRead: false,
//     };

//     // Add to local state immediately
//     setMessages(prev => [...prev, optimisticMessage]);

//     const messageData = {
//       roomId: currentChatId,
//       senderId: user._id,
//       receiverId: selectedUser._id,
//       message: input.trim(),
//     };

//     // Send message via socket
//     socketRef.current.emit('sendMessage', messageData);

//     // Clear input
//     setInput('');
//   };

//   // File input change handler
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     if (file) {
//       file.preview = URL.createObjectURL(file);
//       setAttachedFile(file);
//     }
//   };

//   if (!isAuthenticated) {
//     return <div>Please log in to access messages.</div>;
//   }

//   return (
//     <>
//       <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
//       <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
//         {/* Sidebar */}
//         <Card
//           className={`shadow-card w-full overflow-y-hidden rounded-lg py-0 sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold">Conversation</h2>
//               <div className="flex items-center gap-[6px]">
//                 {roleTabs.map((item, i) => (
//                   <button
//                     key={i}
//                     className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${tab === item ? 'opacity-100' : 'opacity-20'}`}
//                     onClick={() => setTab(item)}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Connection Status */}
//             <div className="mt-2 text-xs">
//               <span
//                 className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
//               ></span>
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </div>

//             {/* Chat List */}
//             <div className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
//               {chatsLoading && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">Loading chats...</div>
//                 </div>
//               )}

//               {chatsError && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-red-500">Error loading chats</div>
//                 </div>
//               )}

//               {!chatsLoading && !chatsError && currentChats.length === 0 && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">No chats found</div>
//                 </div>
//               )}

//               {currentChats.map(chatData => (
//                 <div
//                   key={chatData.chatId}
//                   className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
//                     selectedUser?._id === chatData.withUser._id
//                       ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
//                       : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
//                   }`}
//                   onClick={() => handleUserSelect(chatData)}
//                 >
//                   <Avatar className="size-[60px]">
//                     <AvatarImage
//                       src={
//                         chatData.withUser.profilePicture || chatData.withUser.avatar || '/images/default/avatar.jpeg'
//                       }
//                       alt={chatData.withUser.name}
//                     />
//                     <AvatarFallback>{chatData.withUser.name?.[0] || 'U'}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-[#1F242F]">{chatData.withUser.name}</p>
//                       <span className="text-textPrimary text-xs">
//                         {chatData.lastMessage?.sentAt ? formatMessageTime(chatData.lastMessage.sentAt) : ''}
//                       </span>
//                     </div>
//                     <p className="text-textPrimary flex items-center gap-1 truncate text-sm font-medium">
//                       <LiaHomeSolid className="text-textPrimary" />
//                       {chatData.withUser.location || 'Location not available'}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">{chatData.withUser.role}</p>
//                     {chatData.lastMessage?.text && (
//                       <p className="mt-1 truncate text-xs text-gray-400">
//                         {chatData.lastMessage.text.length > 30
//                           ? `${chatData.lastMessage.text.substring(0, 30)}...`
//                           : chatData.lastMessage.text}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Chat Window */}
//         <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
//           {/* Chat Header */}
//           <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
//             <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setIsSidebarVisible(true)}>
//               <ChevronLeft />
//             </Button>
//             <Avatar>
//               <AvatarImage
//                 src={selectedUser?.profilePicture || selectedUser?.avatar || '/images/default/avatar.jpeg'}
//                 alt={selectedUser?.name}
//               />
//               <AvatarFallback>{selectedUser?.name?.[0] || 'U'}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{selectedUser?.name || 'Select a user'}</p>
//               <p className="text-sm text-gray-500 capitalize">{selectedUser?.role || ''}</p>
//             </div>
//             <SendButton text={'Send Contract'} onClick={() => setIsModalOpen(true)} />
//           </CardHeader>

//           {/* Chat Content */}
//           <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
//             {messagesLoading && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-gray-500">Loading messages...</div>
//               </div>
//             )}

//             {messagesError && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-red-500">Error loading messages</div>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message, index) => {
//                 const isUserMessage = message.sender === user._id;

//                 return (
//                   <div key={message._id || index}>
//                     {/* Message container */}
//                     <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
//                       <div
//                         className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
//                           isUserMessage ? 'bg-primary text-white' : 'text-textPrimary bg-[#F4F4F5]'
//                         }`}
//                       >
//                         {/* Render text message */}
//                         {message.message && (
//                           <>
//                             <p>{message.message}</p>
//                             {/* Simple link preview if message contains a URL */}
//                             {urlRegex.test(message.message) && (
//                               <a
//                                 href={message.message.match(urlRegex)[0]}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="mt-2 block rounded border p-2 text-xs text-white"
//                               >
//                                 Link Preview: {message.message.match(urlRegex)[0]}
//                               </a>
//                             )}
//                           </>
//                         )}

//                         {/* Render file message */}
//                         {message.file && (
//                           <div className="flex flex-col gap-2">
//                             {message.file.type?.startsWith('image') ? (
//                               <img src={message.file.url} alt={message.file.name} className="max-w-[200px] rounded" />
//                             ) : (
//                               <div className="flex items-center gap-2">
//                                 <UploadCloud className="text-textPrimary h-5 w-5" />
//                                 <span className="text-xs">{message.file.name}</span>
//                               </div>
//                             )}
//                           </div>
//                         )}

//                         <div className={`mt-1 text-xs font-light ${isUserMessage ? 'text-white' : 'text-[#09090BCC]'}`}>
//                           {formatTime(message.createdAt)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </div>
//           </CardContent>

//           {/* Chat Input */}
//           <CardFooter className="border-t p-4">
//             <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
//               {/* Hidden File Input */}
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//               <Input
//                 shadow
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder={selectedUser ? 'Type your message...' : 'Select a user to start chatting'}
//                 className="flex-1"
//                 disabled={!selectedUser || !isConnected}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className={`cursor-pointer ${!selectedUser ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 <PiLinkSimpleBold className="text-textPrimary h-6 w-6" />
//               </label>
//               <Button
//                 size="icon"
//                 className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
//                 type="submit"
//                 disabled={(!input.trim() && !attachedFile) || !selectedUser || !isConnected}
//               >
//                 <Send />
//               </Button>
//             </form>

//             {/* File Preview */}
//             {attachedFile && (
//               <div className="ml-2 flex items-center gap-2 rounded border p-2">
//                 {attachedFile.type.startsWith('image') ? (
//                   <div className="relative h-5 w-5 shrink-0">
//                     <Image
//                       src={attachedFile.preview}
//                       alt={attachedFile.name}
//                       width={20}
//                       height={20}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                     <button
//                       onClick={() => setAttachedFile(null)}
//                       className="shadow-card absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600"
//                       title="Remove image"
//                     >
//                       <IoClose className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <UploadCloud className="text-textPrimary h-6 w-6" />
//                     <span className="text-sm">{attachedFile.name}</span>
//                     <button onClick={() => setAttachedFile(null)} className="ml-2 text-xs text-red-600">
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </CardFooter>
//         </Card>
//         <div>
//           {isModalOpen && (
//             <Modal width={500} onClose={() => setIsModalOpen(false)} title="Confirm Your Viewing Request">
//               <Content8 />
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

/////currentttt
// 'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import SendButton from '@/components/shared/small/Button';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
// import { LiaHomeSolid } from 'react-icons/lia';
// import { useState, useEffect, useRef } from 'react';
// import { PiLinkSimpleBold } from 'react-icons/pi';
// import Image from 'next/image';
// import { IoClose } from 'react-icons/io5';
// import Modal from '@/components/shared/small/Modal';
// import Content8 from '@/components/tenant/popups/Content8';
// import { useSelector } from 'react-redux';
// import socketService from '@/utils/socket';
// import { useGetMessagesByChatIdQuery, useGetChatsByRoleQuery } from '@/features/message/messageApi';

// // Helper function to generate chat ID from two user IDs
// const generateChatId = (userId1, userId2) => {
//   return [userId1, userId2].sort().join('_');
// };

// // Helper function to get role-based tabs
// const getRoleTabs = currentUserRole => {
//   switch (currentUserRole) {
//     case 'owner':
//       return ['agent', 'tenant'];
//     case 'tenant':
//       return ['agent', 'owner'];
//     case 'agent':
//       return ['owner', 'tenant'];
//     default:
//       return ['users'];
//   }
// };

// // Helper function to format time
// const formatTime = dateString => {
//   return new Date(dateString).toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// // Helper function to format message time
// const formatMessageTime = dateString => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//   const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

//   if (messageDate.getTime() === today.getTime()) {
//     return formatTime(dateString);
//   } else {
//     return `${date.getMonth() + 1}/${date.getDate()}`;
//   }
// };

// export default function ChatPage({ userId: propUserId }) {
//   const { user, isAuthenticated } = useSelector(state => state.auth);

//   // Get role-based tabs
//   const roleTabs = getRoleTabs(user?.role || 'owner');
//   const [tab, setTab] = useState(roleTabs[0]);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const [input, setInput] = useState('');
//   const [attachedFile, setAttachedFile] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Refs
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null);

//   // API queries - only called when needed
//   const {
//     data: chatsData,
//     error: chatsError,
//     isLoading: chatsLoading,
//   } = useGetChatsByRoleQuery(tab, {
//     skip: !isAuthenticated || !user?._id,
//   });

//   const {
//     data: messagesData,
//     error: messagesError,
//     isLoading: messagesLoading,
//   } = useGetMessagesByChatIdQuery(currentChatId, {
//     skip: !currentChatId,
//   });

//   // Get current chats based on API response
//   const currentChats = chatsData?.chats || [];

//   // Initialize socket connection
//   useEffect(() => {
//     if (isAuthenticated && user?._id) {
//       console.log('Initializing socket connection...');
//       socketRef.current = socketService.connect();

//       const handleConnect = () => {
//         console.log('Socket connected successfully');
//         setIsConnected(true);
//       };

//       const handleDisconnect = () => {
//         console.log('Socket disconnected');
//         setIsConnected(false);
//       };

//       const handleReceiveMessage = messageData => {
//         console.log('Received message:', messageData);

//         // Only add message if it's for the current chat
//         if (messageData.chatId === currentChatId) {
//           const formattedMessage = {
//             _id: messageData.id || messageData._id,
//             sender: messageData.senderId,
//             receiver: messageData.receiverId,
//             message: messageData.message,
//             file: messageData.file,
//             createdAt: messageData.createdAt || new Date().toISOString(),
//             isRead: messageData.isRead || false,
//           };

//           setMessages(prev => {
//             // Check if message already exists to avoid duplicates
//             const exists = prev.find(msg => msg._id === formattedMessage._id);
//             if (exists) return prev;
//             return [...prev, formattedMessage];
//           });
//         }
//       };

//       // Set up socket event listeners
//       socketRef.current.on('connect', handleConnect);
//       socketRef.current.on('disconnect', handleDisconnect);
//       socketRef.current.on('receiveMessage', handleReceiveMessage);

//       // Check if already connected
//       if (socketRef.current.connected) {
//         setIsConnected(true);
//       }

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.off('connect', handleConnect);
//           socketRef.current.off('disconnect', handleDisconnect);
//           socketRef.current.off('receiveMessage', handleReceiveMessage);
//         }
//       };
//     }
//   }, [isAuthenticated, user?._id, currentChatId]);

//   // Handle prop userId for initial chat setup
//   useEffect(() => {
//     if (propUserId && user?._id && currentChats.length > 0) {
//       // Find user in current chats
//       const targetChat = currentChats.find(chat => chat.withUser._id === propUserId);

//       if (targetChat) {
//         setSelectedUser(targetChat.withUser);
//         setCurrentChatId(targetChat.chatId);
//       } else {
//         // Create a mock user for the provided ID if not found in chats
//         const mockUser = {
//           _id: propUserId,
//           name: 'User',
//           role: 'tenant',
//           avatar: '/images/default/avatar.jpeg',
//           profilePicture: '/images/default/avatar.jpeg',
//         };
//         setSelectedUser(mockUser);
//         const chatId = generateChatId(user._id, propUserId);
//         setCurrentChatId(chatId);
//       }
//     }
//   }, [propUserId, user?._id, currentChats]);

//   // Load messages when chat changes
//   useEffect(() => {
//     if (messagesData?.data) {
//       const formattedMessages = messagesData.data.map(msg => ({
//         _id: msg._id,
//         sender: msg.sender,
//         receiver: msg.receiver,
//         message: msg.message,
//         file: msg.file,
//         createdAt: msg.createdAt,
//         isRead: msg.isRead,
//       }));
//       setMessages(formattedMessages);
//     } else if (currentChatId && !messagesLoading) {
//       // Clear messages if no data
//       setMessages([]);
//     }
//   }, [messagesData, currentChatId, messagesLoading]);

//   // Join/leave socket rooms
//   useEffect(() => {
//     if (currentChatId && socketRef.current && isConnected) {
//       console.log('Joining room:', currentChatId);
//       socketRef.current.emit('joinRoom', currentChatId);

//       return () => {
//         if (socketRef.current && currentChatId) {
//           console.log('Leaving room:', currentChatId);
//           socketRef.current.emit('leaveRoom', currentChatId);
//         }
//       };
//     }
//   }, [currentChatId, isConnected]);

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Handle user selection from chat list
//   const handleUserSelect = selectedChat => {
//     setSelectedUser(selectedChat.withUser);
//     setIsSidebarVisible(false);

//     if (user?._id) {
//       setCurrentChatId(selectedChat.chatId);
//     }
//   };

//   // Simple helper to detect URLs (for link preview, if needed)
//   const urlRegex = /(https?:\/\/[^\s]+)/g;

//   const handleSendMessage = e => {
//     e.preventDefault();

//     if (!selectedUser || !currentChatId || !socketRef.current || !isConnected) {
//       console.log('Cannot send message - missing requirements');
//       return;
//     }

//     // Handle file upload message first if a file is attached
//     if (attachedFile) {
//       const fileMessage = {
//         _id: Date.now().toString() + '_file',
//         sender: user._id,
//         receiver: selectedUser._id,
//         message: '',
//         file: {
//           url: attachedFile.preview,
//           type: attachedFile.type,
//           name: attachedFile.name,
//         },
//         createdAt: new Date().toISOString(),
//         isRead: false,
//       };

//       setMessages(prev => [...prev, fileMessage]);

//       // Send file message via socket
//       socketRef.current.emit('sendMessage', {
//         roomId: currentChatId,
//         senderId: user._id,
//         receiverId: selectedUser._id,
//         message: '',
//         file: {
//           url: attachedFile.preview,
//           type: attachedFile.type,
//           name: attachedFile.name,
//         },
//       });

//       setAttachedFile(null);
//     }

//     if (!input.trim()) return;

//     // Create optimistic message
//     const optimisticMessage = {
//       _id: Date.now().toString(),
//       sender: user._id,
//       receiver: selectedUser._id,
//       message: input.trim(),
//       file: null,
//       createdAt: new Date().toISOString(),
//       isRead: false,
//     };

//     // Add to local state immediately
//     setMessages(prev => [...prev, optimisticMessage]);

//     const messageData = {
//       roomId: currentChatId,
//       senderId: user._id,
//       receiverId: selectedUser._id,
//       message: input.trim(),
//     };

//     // Send message via socket
//     console.log('Sending message:', messageData);
//     socketRef.current.emit('sendMessage', messageData);

//     // Clear input
//     setInput('');
//   };

//   // File input change handler
//   const handleFileUpload = e => {
//     const file = e.target.files[0];
//     if (file) {
//       file.preview = URL.createObjectURL(file);
//       setAttachedFile(file);
//     }
//   };

//   if (!isAuthenticated) {
//     return <div>Please log in to access messages.</div>;
//   }

//   return (
//     <>
//       <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
//       <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
//         {/* Sidebar */}
//         <Card
//           className={`shadow-card w-full overflow-y-hidden rounded-lg py-0 sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
//         >
//           <div className="p-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-bold">Conversation</h2>
//               <div className="flex items-center gap-[6px]">
//                 {roleTabs.map((item, i) => (
//                   <button
//                     key={i}
//                     className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${tab === item ? 'opacity-100' : 'opacity-20'}`}
//                     onClick={() => setTab(item)}
//                   >
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Connection Status */}
//             <div className="mt-2 text-xs">
//               <span
//                 className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
//               ></span>
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </div>

//             {/* Chat List */}
//             <div className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
//               {chatsLoading && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">Loading chats...</div>
//                 </div>
//               )}

//               {chatsError && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-red-500">Error loading chats</div>
//                 </div>
//               )}

//               {!chatsLoading && !chatsError && currentChats.length === 0 && (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="text-gray-500">No chats found</div>
//                 </div>
//               )}

//               {currentChats.map(chatData => (
//                 <div
//                   key={chatData.chatId}
//                   className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
//                     selectedUser?._id === chatData.withUser._id
//                       ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
//                       : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
//                   }`}
//                   onClick={() => handleUserSelect(chatData)}
//                 >
//                   <Avatar className="size-[60px]">
//                     <AvatarImage
//                       src={
//                         chatData.withUser.profilePicture || chatData.withUser.avatar || '/images/default/avatar.jpeg'
//                       }
//                       alt={chatData.withUser.name}
//                     />
//                     <AvatarFallback>{chatData.withUser.name?.[0] || 'U'}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm font-semibold text-[#1F242F]">{chatData.withUser.name}</p>
//                       <span className="text-textPrimary text-xs">
//                         {chatData.lastMessage?.sentAt ? formatMessageTime(chatData.lastMessage.sentAt) : ''}
//                       </span>
//                     </div>
//                     <p className="text-textPrimary flex items-center gap-1 truncate text-sm font-medium">
//                       <LiaHomeSolid className="text-textPrimary" />
//                       {chatData.withUser.location || 'Location not available'}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">{chatData.withUser.role}</p>
//                     {chatData.lastMessage?.text && (
//                       <p className="mt-1 truncate text-xs text-gray-400">
//                         {chatData.lastMessage.text.length > 30
//                           ? `${chatData.lastMessage.text.substring(0, 30)}...`
//                           : chatData.lastMessage.text}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         {/* Chat Window */}
//         <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
//           {/* Chat Header */}
//           <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
//             <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setIsSidebarVisible(true)}>
//               <ChevronLeft />
//             </Button>
//             <Avatar>
//               <AvatarImage
//                 src={selectedUser?.profilePicture || selectedUser?.avatar || '/images/default/avatar.jpeg'}
//                 alt={selectedUser?.name}
//               />
//               <AvatarFallback>{selectedUser?.name?.[0] || 'U'}</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">{selectedUser?.name || 'Select a user'}</p>
//               <p className="text-sm text-gray-500 capitalize">{selectedUser?.role || ''}</p>
//             </div>
//             <SendButton text={'Send Contract'} onClick={() => setIsModalOpen(true)} />
//           </CardHeader>

//           {/* Chat Content */}
//           <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
//             {messagesLoading && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-gray-500">Loading messages...</div>
//               </div>
//             )}

//             {messagesError && (
//               <div className="flex h-32 items-center justify-center">
//                 <div className="text-red-500">Error loading messages</div>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message, index) => {
//                 const isUserMessage = message.sender === user._id;

//                 return (
//                   <div key={message._id || index}>
//                     {/* Message container */}
//                     <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
//                       <div
//                         className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
//                           isUserMessage ? 'bg-primary text-white' : 'text-textPrimary bg-[#F4F4F5]'
//                         }`}
//                       >
//                         {/* Render text message */}
//                         {message.message && (
//                           <>
//                             <p>{message.message}</p>
//                             {/* Simple link preview if message contains a URL */}
//                             {urlRegex.test(message.message) && (
//                               <a
//                                 href={message.message.match(urlRegex)[0]}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="mt-2 block rounded border p-2 text-xs text-white"
//                               >
//                                 Link Preview: {message.message.match(urlRegex)[0]}
//                               </a>
//                             )}
//                           </>
//                         )}

//                         {/* Render file message */}
//                         {message.file && (
//                           <div className="flex flex-col gap-2">
//                             {message.file.type?.startsWith('image') ? (
//                               <img src={message.file.url} alt={message.file.name} className="max-w-[200px] rounded" />
//                             ) : (
//                               <div className="flex items-center gap-2">
//                                 <UploadCloud className="text-textPrimary h-5 w-5" />
//                                 <span className="text-xs">{message.file.name}</span>
//                               </div>
//                             )}
//                           </div>
//                         )}

//                         <div className={`mt-1 text-xs font-light ${isUserMessage ? 'text-white' : 'text-[#09090BCC]'}`}>
//                           {formatTime(message.createdAt)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </div>
//           </CardContent>

//           {/* Chat Input */}
//           <CardFooter className="border-t p-4">
//             <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
//               {/* Hidden File Input */}
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*,application/pdf"
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//               <Input
//                 shadow
//                 value={input}
//                 onChange={e => setInput(e.target.value)}
//                 placeholder={selectedUser ? 'Type your message...' : 'Select a user to start chatting'}
//                 className="flex-1"
//                 disabled={!selectedUser || !isConnected}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className={`cursor-pointer ${!selectedUser ? 'cursor-not-allowed opacity-50' : ''}`}
//               >
//                 <PiLinkSimpleBold className="text-textPrimary h-6 w-6" />
//               </label>
//               <Button
//                 size="icon"
//                 className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
//                 type="submit"
//                 disabled={(!input.trim() && !attachedFile) || !selectedUser || !isConnected}
//               >
//                 <Send />
//               </Button>
//             </form>

//             {/* File Preview */}
//             {attachedFile && (
//               <div className="ml-2 flex items-center gap-2 rounded border p-2">
//                 {attachedFile.type.startsWith('image') ? (
//                   <div className="relative h-5 w-5 shrink-0">
//                     <Image
//                       src={attachedFile.preview}
//                       alt={attachedFile.name}
//                       width={20}
//                       height={20}
//                       className="h-5 w-5 rounded-full object-cover"
//                     />
//                     <button
//                       onClick={() => setAttachedFile(null)}
//                       className="shadow-card absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600"
//                       title="Remove image"
//                     >
//                       <IoClose className="h-4 w-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <UploadCloud className="text-textPrimary h-6 w-6" />
//                     <span className="text-sm">{attachedFile.name}</span>
//                     <button onClick={() => setAttachedFile(null)} className="ml-2 text-xs text-red-600">
//                       Remove
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </CardFooter>
//         </Card>
//         <div>
//           {isModalOpen && (
//             <Modal width={500} onClose={() => setIsModalOpen(false)} title="Confirm Your Viewing Request">
//               <Content8 />
//             </Modal>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import SendButton from '@/components/shared/small/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
import { LiaHomeSolid } from 'react-icons/lia';
import { useState, useEffect, useRef } from 'react';
import { PiLinkSimpleBold } from 'react-icons/pi';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import Modal from '@/components/shared/small/Modal';
import Content8 from '@/components/tenant/popups/Content8';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import socketService from '@/utils/socket';
<<<<<<< Updated upstream
import {
  useGetMessagesByChatIdQuery,
  useGetChatsByRoleQuery,
  useGetUserByIdQuery,
  useCreateChatMutation,
} from '@/features/message/messageApi';
=======
import { useGetMessagesByChatIdQuery, useGetChatsByRoleQuery } from '@/features/message/messageApi';
import PropertiesView from '../properties/PropertiesView';
import ShowPropertyCards from '../properties/ShowPropertyCards';
>>>>>>> Stashed changes

// Helper function to generate chat ID from two user IDs
const generateChatId = (userId1, userId2) => {
  return [userId1, userId2].sort().join('_');
};

// Helper function to get role-based tabs
const getRoleTabs = currentUserRole => {
  switch (currentUserRole) {
    case 'owner':
      return ['agent', 'tenant'];
    case 'tenant':
      return ['agent', 'owner'];
    case 'agent':
      return ['owner', 'tenant'];
    default:
      return ['users'];
  }
};

// Helper function to format time
const formatTime = dateString => {
  return new Date(dateString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to format message time
const formatMessageTime = dateString => {
  const date = new Date(dateString);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (messageDate.getTime() === today.getTime()) {
    return formatTime(dateString);
  } else {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }
};

export default function ChatPage({ userId: propUserId }) {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const searchParams = useSearchParams();

  // Get user ID from query parameters
  const queryUserId = searchParams.get('agent') || searchParams.get('tenant') || searchParams.get('owner');
  const targetUserId = propUserId || queryUserId;

  // Get role-based tabs
  const roleTabs = getRoleTabs(user?.role || 'owner');
  const [tab, setTab] = useState(roleTabs[0]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [input, setInput] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewChat, setIsNewChat] = useState(false);

  // Refs
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // API queries
  const {
    data: chatsData,
    error: chatsError,
    isLoading: chatsLoading,
  } = useGetChatsByRoleQuery(tab, {
    skip: !isAuthenticated || !user?._id,
  });

  const {
    data: messagesData,
    error: messagesError,
    isLoading: messagesLoading,
  } = useGetMessagesByChatIdQuery(currentChatId, {
    skip: !currentChatId || isNewChat,
  });

  // Query user details if we have a target user ID
  const {
    data: targetUserData,
    error: targetUserError,
    isLoading: targetUserLoading,
  } = useGetUserByIdQuery(targetUserId, {
    skip: !targetUserId || !isAuthenticated,
  });

  // Create chat mutation
  const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();

  // Get current chats based on API response
  const currentChats = chatsData?.chats || [];

  // Initialize socket connection
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      console.log('Initializing socket connection...');
      socketRef.current = socketService.connect();

      const handleConnect = () => {
        console.log('Socket connected successfully');
        setIsConnected(true);
      };

      const handleDisconnect = () => {
        console.log('Socket disconnected');
        setIsConnected(false);
      };

      const handleReceiveMessage = messageData => {
        console.log('Received message:', messageData);

        // Only add message if it's for the current chat
        if (messageData.chatId === currentChatId) {
          const formattedMessage = {
            _id: messageData.id || messageData._id,
            sender: messageData.senderId,
            receiver: messageData.receiverId,
            message: messageData.message,
            file: messageData.file,
            createdAt: messageData.createdAt || new Date().toISOString(),
            isRead: messageData.isRead || false,
          };

          setMessages(prev => {
            // Check if message already exists to avoid duplicates
            const exists = prev.find(msg => msg._id === formattedMessage._id);
            if (exists) return prev;
            return [...prev, formattedMessage];
          });
        }
      };

      // Set up socket event listeners
      socketRef.current.on('connect', handleConnect);
      socketRef.current.on('disconnect', handleDisconnect);
      socketRef.current.on('receiveMessage', handleReceiveMessage);

      // Check if already connected
      if (socketRef.current.connected) {
        setIsConnected(true);
      }

      return () => {
        if (socketRef.current) {
          socketRef.current.off('connect', handleConnect);
          socketRef.current.off('disconnect', handleDisconnect);
          socketRef.current.off('receiveMessage', handleReceiveMessage);
        }
      };
    }
  }, [isAuthenticated, user?._id, currentChatId]);

  // Handle query parameter user setup
  useEffect(() => {
    if (targetUserId && user?._id && isAuthenticated) {
      // Check if user already has a chat with the target user
      const existingChat = currentChats.find(chat => chat.withUser._id === targetUserId);

      if (existingChat) {
        // Chat exists, set it up
        setSelectedUser(existingChat.withUser);
        setCurrentChatId(existingChat.chatId);
        setIsNewChat(false);
        console.log('Existing chat found:', existingChat.chatId);
      } else if (targetUserData?.success && targetUserData.user) {
        // No existing chat, but we have user data - set up for new chat
        const userData = targetUserData.user;
        setSelectedUser({
          _id: userData._id,
          name: userData.name,
          role: userData.role,
          activeRole: userData.activeRole,
          profilePicture: userData.profilePicture,
          avatar: userData.avatar,
          location: userData.location,
        });

        // Generate chat ID but don't set it yet (will be set when first message is sent)
        const potentialChatId = generateChatId(user._id, targetUserId);
        setCurrentChatId(potentialChatId);
        setIsNewChat(true);
        setMessages([]); // Clear messages for new chat
        console.log('New chat setup for user:', userData.name);
      }
    }
  }, [targetUserId, user?._id, currentChats, targetUserData, isAuthenticated]);

  // Load messages when chat changes (only for existing chats)
  useEffect(() => {
    if (messagesData?.data && !isNewChat) {
      const formattedMessages = messagesData.data.map(msg => ({
        _id: msg._id,
        sender: msg.sender,
        receiver: msg.receiver,
        message: msg.message,
        file: msg.file,
        createdAt: msg.createdAt,
        isRead: msg.isRead,
      }));
      setMessages(formattedMessages);
    } else if (currentChatId && !messagesLoading && !isNewChat) {
      // Clear messages if no data for existing chat
      setMessages([]);
    }
  }, [messagesData, currentChatId, messagesLoading, isNewChat]);

  // Join/leave socket rooms
  useEffect(() => {
    if (currentChatId && socketRef.current && isConnected) {
      console.log('Joining room:', currentChatId);
      socketRef.current.emit('joinRoom', currentChatId);

      return () => {
        if (socketRef.current && currentChatId) {
          console.log('Leaving room:', currentChatId);
          socketRef.current.emit('leaveRoom', currentChatId);
        }
      };
    }
  }, [currentChatId, isConnected]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle user selection from chat list
  const handleUserSelect = selectedChat => {
    setSelectedUser(selectedChat.withUser);
    setIsSidebarVisible(false);
    setIsNewChat(false);

    if (user?._id) {
      setCurrentChatId(selectedChat.chatId);
    }
  };

  // Simple helper to detect URLs (for link preview, if needed)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const handleSendMessage = async e => {
    e.preventDefault();

    if (!selectedUser || !currentChatId || !socketRef.current || !isConnected) {
      console.log('Cannot send message - missing requirements');
      return;
    }

    // Handle file upload message first if a file is attached
    if (attachedFile) {
      const fileMessage = {
        _id: Date.now().toString() + '_file',
        sender: user._id,
        receiver: selectedUser._id,
        message: '',
        file: {
          url: attachedFile.preview,
          type: attachedFile.type,
          name: attachedFile.name,
        },
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      setMessages(prev => [...prev, fileMessage]);

      // Send file message via socket
      socketRef.current.emit('sendMessage', {
        roomId: currentChatId,
        senderId: user._id,
        receiverId: selectedUser._id,
        message: '',
        file: {
          url: attachedFile.preview,
          type: attachedFile.type,
          name: attachedFile.name,
        },
      });

      setAttachedFile(null);
    }

    if (!input.trim()) return;

    // If this is a new chat, create the chat first
    if (isNewChat) {
      try {
        const result = await createChat({
          receiverId: selectedUser._id,
          message: input.trim(),
        });

        if (result.data?.success) {
          // Chat created successfully
          setIsNewChat(false);
          console.log('Chat created successfully:', result.data.chatId);

          // The message is already saved on the backend,
          // so we don't need to send it via socket again
          // Just add it to local state
          const newMessage = {
            _id: result.data.data._id,
            sender: user._id,
            receiver: selectedUser._id,
            message: input.trim(),
            file: null,
            createdAt: result.data.data.createdAt,
            isRead: false,
          };

          setMessages(prev => [...prev, newMessage]);
          setInput('');
          return;
        }
      } catch (error) {
        console.error('Error creating chat:', error);
        return;
      }
    }

    // Create optimistic message for existing chats
    const optimisticMessage = {
      _id: Date.now().toString(),
      sender: user._id,
      receiver: selectedUser._id,
      message: input.trim(),
      file: null,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    // Add to local state immediately
    setMessages(prev => [...prev, optimisticMessage]);

    const messageData = {
      roomId: currentChatId,
      senderId: user._id,
      receiverId: selectedUser._id,
      message: input.trim(),
    };

    // Send message via socket
    console.log('Sending message:', messageData);
    socketRef.current.emit('sendMessage', messageData);

    // Clear input
    setInput('');
  };

  // File input change handler
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      setAttachedFile(file);
    }
  };

  if (!isAuthenticated) {
    return <div>Please log in to access messages.</div>;
  }

  // Show loading state while fetching target user
  if (targetUserId && targetUserLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-gray-500">Loading user details...</div>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-textPrimary mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
      <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
        {/* Sidebar */}
        <Card
          className={`shadow-card w-full overflow-y-hidden rounded-lg py-0 sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Conversation</h2>
              <div className="flex items-center gap-[6px]">
                {roleTabs.map((item, i) => (
                  <button
                    key={i}
                    className={`bg-primary cursor-pointer place-items-center rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-[#01367f] ${tab === item ? 'opacity-100' : 'opacity-20'}`}
                    onClick={() => setTab(item)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Connection Status */}
            <div className="mt-2 text-xs">
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
              ></span>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>

            {/* Chat List */}
            <div className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
              {chatsLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-500">Loading chats...</div>
                </div>
              )}

              {chatsError && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-red-500">Error loading chats</div>
                </div>
              )}

              {!chatsLoading && !chatsError && currentChats.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-gray-500">No chats found</div>
                </div>
              )}

              {currentChats.map(chatData => (
                <div
                  key={chatData.chatId}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
                    selectedUser?._id === chatData.withUser._id
                      ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
                      : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
                  }`}
                  onClick={() => handleUserSelect(chatData)}
                >
                  <Avatar className="size-[60px]">
                    <AvatarImage
                      src={
                        chatData.withUser.profilePicture || chatData.withUser.avatar || '/images/default/avatar.jpeg'
                      }
                      alt={chatData.withUser.name}
                    />
                    <AvatarFallback>{chatData.withUser.name?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1F242F]">{chatData.withUser.name}</p>
                      <span className="text-textPrimary text-xs">
                        {chatData.lastMessage?.sentAt ? formatMessageTime(chatData.lastMessage.sentAt) : ''}
                      </span>
                    </div>
                    <p className="text-textPrimary flex items-center gap-1 truncate text-sm font-medium">
                      <LiaHomeSolid className="text-textPrimary" />
                      {chatData.withUser.location || 'Location not available'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{chatData.withUser.role}</p>
                    {chatData.lastMessage?.text && (
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {chatData.lastMessage.text.length > 30
                          ? `${chatData.lastMessage.text.substring(0, 30)}...`
                          : chatData.lastMessage.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
          {/* Chat Header */}
          <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
            <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setIsSidebarVisible(true)}>
              <ChevronLeft />
            </Button>
            <Avatar>
              <AvatarImage
                src={selectedUser?.profilePicture || selectedUser?.avatar || '/images/default/avatar.jpeg'}
                alt={selectedUser?.name}
              />
              <AvatarFallback>{selectedUser?.name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name || 'Select a user'}</p>
              <p className="text-sm text-gray-500 capitalize">{selectedUser?.role || ''}</p>
              {isNewChat && <p className="text-xs text-blue-500">New conversation</p>}
            </div>
            <SendButton text={'Send Contract'} onClick={() => setIsModalOpen(true)} />
          </CardHeader>

          {/* Chat Content */}
          <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
            {messagesLoading && !isNewChat && (
              <div className="flex h-32 items-center justify-center">
                <div className="text-gray-500">Loading messages...</div>
              </div>
            )}

            {messagesError && (
              <div className="flex h-32 items-center justify-center">
                <div className="text-red-500">Error loading messages</div>
              </div>
            )}

            {isNewChat && messages.length === 0 && (
              <div className="flex h-32 items-center justify-center">
                <div className="text-gray-500">Start a new conversation with {selectedUser?.name}</div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((message, index) => {
                const isUserMessage = message.sender === user._id;

                return (
                  <div key={message._id || index}>
                    {/* Message container */}
                    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${
                          isUserMessage ? 'bg-primary text-white' : 'text-textPrimary bg-[#F4F4F5]'
                        }`}
                      >
                        {/* Render text message */}
                        {message.message && (
                          <>
                            <p>{message.message}</p>
                            {/* Simple link preview if message contains a URL */}
                            {urlRegex.test(message.message) && (
                              <a
                                href={message.message.match(urlRegex)[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 block rounded border p-2 text-xs text-white"
                              >
                                Link Preview: {message.message.match(urlRegex)[0]}
                              </a>
                            )}
                          </>
                        )}

                        {/* Render file message */}
                        {message.file && (
                          <div className="flex flex-col gap-2">
                            {message.file.type?.startsWith('image') ? (
                              <img src={message.file.url} alt={message.file.name} className="max-w-[200px] rounded" />
                            ) : (
                              <div className="flex items-center gap-2">
                                <UploadCloud className="text-textPrimary h-5 w-5" />
                                <span className="text-xs">{message.file.name}</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={`mt-1 text-xs font-light ${isUserMessage ? 'text-white' : 'text-[#09090BCC]'}`}>
                          {formatTime(message.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Chat Input */}
          <CardFooter className="border-t p-4">
            <form className="flex w-full items-center space-x-2" onSubmit={handleSendMessage}>
              {/* Hidden File Input */}
              <input
                id="file-upload"
                type="file"
                accept="image/*,application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Input
                shadow
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={selectedUser ? 'Type your message...' : 'Select a user to start chatting'}
                className="flex-1"
                disabled={!selectedUser || !isConnected || isCreatingChat}
              />
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${!selectedUser ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <PiLinkSimpleBold className="text-textPrimary h-6 w-6" />
              </label>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
                type="submit"
                disabled={(!input.trim() && !attachedFile) || !selectedUser || !isConnected || isCreatingChat}
              >
                <Send />
              </Button>
            </form>

            {/* File Preview */}
            {attachedFile && (
              <div className="ml-2 flex items-center gap-2 rounded border p-2">
                {attachedFile.type.startsWith('image') ? (
                  <div className="relative h-5 w-5 shrink-0">
                    <Image
                      src={attachedFile.preview}
                      alt={attachedFile.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    <button
                      onClick={() => setAttachedFile(null)}
                      className="shadow-card absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600"
                      title="Remove image"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UploadCloud className="text-textPrimary h-6 w-6" />
                    <span className="text-sm">{attachedFile.name}</span>
                    <button onClick={() => setAttachedFile(null)} className="ml-2 text-xs text-red-600">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
        <div>
          {isModalOpen && (
            <Modal
              width={'w-[300px] md:w-[400px] lg:w-[700px] xl:w-[400px]'}
              onClose={() => setIsModalOpen(false)}
              title="Confirm Your Viewing Request"
            >
              {/* <Content8 /> */}
              <ShowPropertyCards />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
