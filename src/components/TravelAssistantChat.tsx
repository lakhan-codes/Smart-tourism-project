import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, Send, X, Bot, User, RefreshCw, ChevronDown } from 'lucide-react';

interface TravelAssistantChatProps {
  currentDestination?: string;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
}

export const TravelAssistantChat: React.FC<TravelAssistantChatProps> = ({
  currentDestination = 'Shimla & Himachal Pradesh',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Namaste! I am your Smart Tourism AI Travel Concierge. Ask me anything about ${currentDestination}, local road conditions, weather, permits, hotels, or authentic cuisine!`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    `Best time to visit ${currentDestination}?`,
    `What should I pack for high altitude?`,
    `Is river rafting open right now?`,
    `Best local food dishes to try?`,
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage: Message = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          destination: currentDestination,
          history: messages.slice(-4),
        }),
      });

      if (!response.ok) {
        throw new Error('Assistant unavailable');
      }

      const data = await response.json();
      setMessages([...updatedMessages, { sender: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        {
          sender: 'assistant',
          text: `I'm having a brief connection delay, but here's a quick tip: Always carry warm layers and check mountain pass permits before travelling! How else can I assist?`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 flex items-center gap-2.5 font-bold text-sm transition-all transform hover:scale-105"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
          </div>
          <span className="hidden sm:inline">Ask AI Guide</span>
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Smart AI Concierge</span>
                  <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded-full font-bold">
                    ONLINE
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300">Instant answers for Indian travels</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, index) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isAssistant
                        ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                        : 'bg-orange-500 text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400 pl-9">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span>AI Concierge is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 border border-slate-200 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about weather, hotels, rafting..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 outline-none text-slate-800"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
