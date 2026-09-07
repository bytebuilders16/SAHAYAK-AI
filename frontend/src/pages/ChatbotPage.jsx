import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Send,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Info,
  ShieldCheck,
  FileText,
  CornerDownLeft
} from 'lucide-react';

export default function ChatbotPage({ onSelectScheme }) {
  const { t } = useLanguage();
  const { userProfile } = useAuth();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const initialMessages = [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "🇮🇳 **Namaste! I am Sahayak Bot**, your AI-powered government scheme assistant.\n\nI can help you:\n• Check eligibility for 10+ central & state welfare schemes\n• Understand benefits in plain language\n• Provide exact document checklists\n• Guide your application process\n\nYou can ask in **English, हिंदी, or Hinglish**!",
      citations: []
    }
  ];

  const [messages, setMessages] = useState(initialMessages);

  const suggestedQueries = [
    "Which government schemes am I eligible for?",
    "मैं किन सरकारी योजनाओं के लिए पात्र हूँ?",
    "Mujhe scholarship ke liye koi government scheme chahiye.",
    "Ayushman Bharat ₹5 Lakh health card details",
    "PM-KISAN Samman Nidhi application steps"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: text
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          user_profile: userProfile
        })
      });

      if (!res.ok) throw new Error('Chat API error');
      const data = await res.json();

      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.response || "I am processing your scheme inquiry.",
        sourceMode: data.source_mode || 'rag',
        citations: data.citations || []
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        id: 'err-' + Date.now(),
        sender: 'bot',
        text: "I encountered a momentary connection issue. You can still browse our verified scheme directory directly from the navigation bar above.",
        citations: []
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col h-[calc(100vh-140px)] min-h-[580px]">

      {/* Bot Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-display text-slate-900">
                Sahayak Bot
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                RAG Grounded AI
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bilingual Scheme Assistant • English | हिंदी | Hinglish
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages(initialMessages)}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-inner p-4 sm:p-6 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${isBot
                  ? 'bg-slate-50 border border-slate-200 text-slate-800'
                  : 'bg-blue-700 text-white shadow'
                  }`}
              >
                {/* Formatted Markdown-like body */}
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {/* Citations if available */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-blue-600" />
                      Verified Reference Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {msg.citations.map((c, i) => (
                        <a
                          key={i}
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-blue-700 hover:text-blue-900 transition"
                        >
                          <span>{c.name}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Searching verified scheme database & RAG index...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Query Chips */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-[11px]">
        <span className="text-slate-400 font-bold shrink-0">Try asking:</span>
        {suggestedQueries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-full font-medium transition shrink-0 shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-2 bg-white rounded-2xl border border-slate-300 shadow-sm p-2 flex items-center gap-2">
        <textarea
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask in English or हिंदी (e.g. 'Scholarship schemes for 20-year student' or 'मैं किन योजनाओं के लिए पात्र हूँ?')..."
          className="flex-1 resize-none px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Disclaimer under chat */}
      <p className="text-[10px] text-slate-400 text-center mt-2">
        Sahayak Bot responses are grounded in official scheme guidelines. Always cross-verify on the respective government portal before final submission.
      </p>

    </div>
  );
}
