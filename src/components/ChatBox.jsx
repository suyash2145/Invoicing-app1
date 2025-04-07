// 'use client';

// import React, { useState } from "react";
// import { X } from 'lucide-react';

// export default function ChatBox() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   async function sendMessage() {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, `You: ${input}`]);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       body: JSON.stringify({ question: input }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();
//     setMessages((prev) => [...prev, `Bot: ${data.reply}`]);
//     setInput("");
//   }

//   return (
//     <>
//       {/* Floating Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
//         >
//           Chat
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
//           <div className="flex justify-between items-center mb-2">
//             <strong>AI Chat</strong>
//             <button onClick={() => setIsOpen(false)}>
//               <X />
//             </button>
//           </div>
//           <div className="h-48 overflow-y-auto mb-2 text-sm">
//             {messages.map((msg, i) => (
//               <p key={i}>{msg}</p>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="border border-gray-300 p-1 flex-1 text-sm"
//               placeholder="Ask something..."
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// 'use client';

// import React, { useState } from "react";
// import { X } from 'lucide-react';

// export default function ChatBox({ invoiceId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   async function sendMessage() {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, `You: ${input}`]);

//     const res = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         question: input,
//         invoiceId: invoiceId, // ✅ Send invoiceId here
//       }),
//     });

//     const data = await res.json();
//     setMessages((prev) => [...prev, `Bot: ${data.reply}`]);
//     setInput("");
//   }

//   return (
//     <>
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
//         >
//           Chat
//         </button>
//       )}

//       {isOpen && (
//         <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
//           <div className="flex justify-between items-center mb-2">
//             <strong>AI Chat</strong>
//             <button onClick={() => setIsOpen(false)}>
//               <X />
//             </button>
//           </div>
//           <div className="h-48 overflow-y-auto mb-2 text-sm">
//             {messages.map((msg, i) => (
//               <p key={i}>{msg}</p>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="border border-gray-300 p-1 flex-1 text-sm"
//               placeholder="Ask something..."
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



// 'use client';

// import React, { useState } from "react";
// import { X } from 'lucide-react';

// export default function ChatBox({ invoiceId }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   async function sendMessage() {
//     if (!input.trim()) return;

//     setMessages((prev) => [...prev, `You: ${input}`]);

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         body: JSON.stringify({ question: input, invoiceId }), // ✅ pass invoiceId
//         headers: { "Content-Type": "application/json" },
//       });

//       const text = await res.text(); // read raw response safely
//       const data = text ? JSON.parse(text) : { reply: "Sorry, no response from the assistant." };

//       setMessages((prev) => [...prev, `Bot: ${data.reply}`]);
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setMessages((prev) => [...prev, "Bot: Something went wrong."]);
//     }

//     setInput("");
//   }

//   return (
//     <>
//       {/* Floating Button */}
//       {!isOpen && (
//         <button
//           onClick={() => setIsOpen(true)}
//           className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
//         >
//           Chat
//         </button>
//       )}

//       {/* Chat Window */}
//       {isOpen && (
//         <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
//           <div className="flex justify-between items-center mb-2">
//             <strong>AI Chat</strong>
//             <button onClick={() => setIsOpen(false)}>
//               <X />
//             </button>
//           </div>
//           <div className="h-48 overflow-y-auto mb-2 text-sm">
//             {messages.map((msg, i) => (
//               <p key={i}>{msg}</p>
//             ))}
//           </div>
//           <div className="flex">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="border border-gray-300 p-1 flex-1 text-sm"
//               placeholder="Ask something..."
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


'use client';

import React, { useState } from "react";
import { X } from 'lucide-react';

export default function ChatBox({ invoiceId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `You: ${input}`]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ question: input, invoiceId }), // ✅ pass invoiceId
        headers: { "Content-Type": "application/json" },
      });

      const text = await res.text(); // read raw response safely
      const data = text ? JSON.parse(text) : { reply: "Sorry, no response from the assistant." };

      setMessages((prev) => [...prev, `Bot: ${data.reply}`]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [...prev, "Bot: Something went wrong."]);
    }

    setInput("");
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        >
          Chat
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 bg-white border border-gray-300 rounded-lg shadow-lg w-80 p-4">
          <div className="flex justify-between items-center mb-2">
            <strong>AI Chat</strong>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>
          <div className="h-48 overflow-y-auto mb-2 text-sm">
            {messages.map((msg, i) => (
              <p key={i}>{msg}</p>
            ))}
          </div>
          <div className="flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="border border-gray-300 p-1 flex-1 text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
