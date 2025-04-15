
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ChatDash({ orgId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, `You: ${input}`]);

    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, OrganizationId: orgId }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : { reply: 'Sorry, no response from the assistant.' };

      setMessages((prev) => [...prev, `Bot: ${data.reply}`]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [...prev, 'Bot: Something went wrong.']);
    }

    setInput('');
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-2xl w-80 max-w-sm p-4">
          <div className="flex justify-between items-center mb-2">
            <strong className="text-gray-800 dark:text-white">Dashboard Assistant</strong>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <X />
            </button>
          </div>

          <div className="h-48 overflow-y-auto mb-3 space-y-1 text-sm text-gray-800 dark:text-gray-100">
            {messages.map((msg, i) => (
              <p
                key={i}
                className={`whitespace-pre-wrap ${
                  msg.startsWith('You:') ? 'text-right text-blue-400' : 'text-left text-green-400'
                }`}
              >
                {msg}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask analytics..."
            />
            <button
              onClick={sendMessage}
              className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
