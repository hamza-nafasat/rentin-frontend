'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Send, UploadCloud } from 'lucide-react';
import { LiaHomeSolid } from 'react-icons/lia';
import { useState } from 'react';
import { useEffect } from 'react';
import { PiLinkSimpleBold } from 'react-icons/pi';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

const agents = [
  {
    name: 'Zilan',
    role: 'Admin1',
    avatar: '/images/default/avatar.jpeg',
    status: 'offline',
    location: '123 Sukhumvit Rd, Bangkok, Thailand',
    time: '12:34 PM',
  },
  {
    name: 'Zyan',
    role: 'Admin2',
    avatar: '/images/default/avatar-1.jpeg',
    status: 'online',
    location: '123 Sukhumvit Rd, Bangkok, Thailand',
    time: '12:34 PM',
  },
  {
    name: 'Sarah',
    role: 'Student',
    avatar: '/images/default/avatar-2.jpeg',
    status: 'offline',
    location: '123 Sukhumvit Rd, Bangkok, Thailand',
    time: '12:34 PM',
  },
];

const tenants = [
  {
    name: 'Asif',
    role: 'Admin1',
    avatar: '/images/default/avatar.jpeg',
    status: 'online',
    location: '123 Sukhumvit Rd, Bangkok, Thailand',
    time: '12:34 PM',
  },
  {
    name: 'Nora',
    role: 'Admin2',
    avatar: '/images/default/avatar-2.jpeg',
    status: 'offline',
    location: '123 Sukhumvit Rd, Bangkok, Thailand',
    time: '12:34 PM',
  },
];

export default function ChatPage() {
  const [tab, setTab] = useState('Agents');
  const [selectedUser, setSelectedUser] = useState(agents[0]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [input, setInput] = useState('');
  // State for file upload preview (file stored with object URL)
  const [attachedFile, setAttachedFile] = useState(null);

  const [conversations, setConversations] = useState({
    Zilan: [
      {
        role: 'agent',
        type: 'text',
        content: 'Hi, how can I help you today?',
        time: '10:00 AM',
      },
      {
        role: 'user',
        type: 'text',
        content: "Hey, I'm having trouble with my account.",
        time: '10:02 AM',
      },
    ],
    Zyan: [],
    Sarah: [],
  });

  // Simple helper to detect URLs (for link preview, if needed)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const handleSendMessage = e => {
    e.preventDefault();

    // Handle file upload message first if a file is attached
    if (attachedFile && selectedUser) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const fileMessage = {
        role: 'user',
        type: 'file',
        file: attachedFile, // URL created via URL.createObjectURL(file)
        fileName: attachedFile.name || 'Uploaded file',
        time: currentTime,
      };

      setConversations(prev => ({
        ...prev,
        [selectedUser.name]: [...prev[selectedUser.name], fileMessage],
      }));
      setAttachedFile(null);
    }

    if (!input.trim() || !selectedUser) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Add the user's text message
    const updatedMessages = [
      ...conversations[selectedUser.name],
      { role: 'user', type: 'text', content: input, time: currentTime },
    ];

    setConversations({
      ...conversations,
      [selectedUser.name]: updatedMessages,
    });
    setInput('');

    // Simulate agent reply (for text messages only)
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [selectedUser.name]: [
          ...prev[selectedUser.name],
          {
            role: 'agent',
            type: 'text',
            content: 'Let me check that for you.',
            time: currentTime,
          },
        ],
      }));
    }, 1000);
  };

  // File input change handler
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      // Create an object URL for preview.
      file.preview = URL.createObjectURL(file);
      setAttachedFile(file);
    }
  };

  const options = [
    { id: 1, name: 'Zayn' },
    { id: 2, name: 'John' },
    { id: 3, name: 'Dillon' },
    { id: 4, name: 'Farhan' },
    { id: 5, name: 'Rasheed' },
  ];

  const handleSearch = query => {
    console.log('Selected:', query);
  };

  return (
    <>
      <h3 className="text-textColor mb-4 text-lg font-semibold md:text-[22px]">Chat</h3>
      <div className="flex h-full flex-col gap-4 sm:flex-row md:gap-6">
        {/* Sidebar */}
        <Card
          className={`w-full overflow-y-hidden rounded-lg py-0 shadow-none sm:block sm:w-1/3 ${isSidebarVisible ? 'block' : 'hidden'}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Conversation</h2>
              <div className="flex items-center gap-[6px]">
                {['Tenants', 'Agents'].map((item, i) => (
                  <button
                    key={i}
                    className={`bg-primary cursor-pointer rounded-sm px-[5px] py-2 text-[10px] font-semibold text-white ${tab === item ? 'opacity-100' : 'opacity-50'}`}
                    onClick={() => setTab(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <ul className="scroll-0 mt-4 max-h-[100vh] space-y-4 overflow-y-auto">
              {tab === 'Agents' &&
                agents.map(agent => (
                  <li
                    key={agent.name}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
                      selectedUser?.name === agent.name
                        ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
                        : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
                    }`}
                    onClick={() => {
                      setSelectedUser(agent);
                      setIsSidebarVisible(false);
                    }}
                  >
                    <Avatar className="size-[60px]">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#1F242F]">{agent.name}</p>
                        <span className="text-textColor text-xs">{agent.time}</span>
                      </div>
                      <p className="text-textColor flex items-center gap-1 truncate text-sm font-medium">
                        <LiaHomeSolid className="text-textColor" />
                        {agent.location}
                      </p>
                    </div>
                  </li>
                ))}
              {tab === 'Tenants' &&
                tenants.map(tenant => (
                  <li
                    key={tenant.name}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-4 ${
                      selectedUser?.name === tenant.name
                        ? 'border-[0.2px] border-[#EDF5FF] bg-[#EDF5FF]'
                        : 'border-[0.2px] border-[#D5E0F6] shadow-xs hover:bg-[#EDF5FF]'
                    }`}
                    onClick={() => {
                      setSelectedUser(tenant);
                      setIsSidebarVisible(false);
                    }}
                  >
                    <Avatar className="size-[60px]">
                      <AvatarImage src={tenant.avatar} alt={tenant.name} />
                      <AvatarFallback>{tenant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#1F242F]">{tenant.name}</p>
                        <span className="text-textColor text-xs">{tenant.time}</span>
                      </div>
                      <p className="text-textColor flex items-center gap-1 truncate text-sm font-medium">
                        <LiaHomeSolid className="text-textColor" />
                        {tenant.location}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="flex flex-1 flex-col rounded-lg py-0 shadow-none">
          {/* Chat Header */}
          <CardHeader className="flex flex-row items-center space-x-4 border-b p-4">
            <Button
              size="icon"
              variant="ghost"
              className="sm:hidden"
              onClick={() => setIsSidebarVisible(true)}
            >
              <ChevronLeft />
            </Button>
            <Avatar>
              <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
              <AvatarFallback>{selectedUser?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p
                className={`text-sm font-medium capitalize ${
                  selectedUser?.status === 'online' ? 'text-[#36CE00]' : 'text-red-600'
                }`}
              >
                {selectedUser?.status}
              </p>
            </div>
          </CardHeader>

          {/* Chat Content */}
          <CardContent className="custom-scroll flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {selectedUser &&
                conversations[selectedUser.name]?.map((message, index) => (
                  <div key={index}>
                    {/* Message container */}
                    <div
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-white' : 'text-textColor bg-[#F4F4F5]'}`}
                      >
                        {/* Render different content based on message type */}
                        {message.type === 'text' && (
                          <>
                            <p>{message.content}</p>
                            {/* Simple link preview if message contains a URL */}
                            {urlRegex.test(message.content) && (
                              <a
                                href={message.content.match(urlRegex)[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 block rounded border p-2 text-xs text-white"
                              >
                                Link Preview: {message.content.match(urlRegex)[0]}
                              </a>
                            )}
                          </>
                        )}
                        {message.type === 'file' && (
                          <div className="flex flex-col gap-2">
                            {message.file?.type?.startsWith('image') ? (
                              <img
                                src={message.file.preview}
                                alt={message.fileName}
                                className="max-w-[200px] rounded"
                              />
                            ) : (
                              <div className="flex items-center gap-2">
                                <UploadCloud className="text-textColor h-5 w-5" />
                                <span className="text-xs">{message.fileName}</span>
                              </div>
                            )}
                          </div>
                        )}
                        <div
                          className={`mt-1 text-xs font-light ${message.role === 'user' ? 'text-white' : 'text-[#09090BCC]'}`}
                        >
                          {message.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <PiLinkSimpleBold className="text-textColor h-6 w-6" />
              </label>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary cursor-pointer text-white outline-none focus:outline-none"
                type="submit"
                disabled={!input.trim() && !attachedFile}
              >
                <Send />
              </Button>
            </form>
            {/* Optionally, show a preview for the selected file above the input */}
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
                      className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-red-600 shadow-md"
                      title="Remove image"
                    >
                      <IoClose className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UploadCloud className="text-textColor h-6 w-6" />
                    <span className="text-sm">{attachedFile.name}</span>
                    <button
                      onClick={() => setAttachedFile(null)}
                      className="ml-2 text-xs text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
