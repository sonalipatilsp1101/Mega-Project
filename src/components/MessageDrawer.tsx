import React, { useState } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import { useAmbulance } from '../context/AmbulanceContext';

interface ChatMessage {
  id: string;
  sender: 'Doctor' | 'Paramedic';
  text: string;
  time: string;
}

export const MessageDrawer: React.FC = () => {
  const { showMessageDrawer, setShowMessageDrawer } = useAmbulance();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'Paramedic', text: 'Patient oxygen saturation stabilized at 94%.', time: '10:20 AM' },
    { id: '2', sender: 'Doctor', text: 'Good. Keep O2 flow at 4L/min. Prepare IV line.', time: '10:22 AM' },
    { id: '3', sender: 'Paramedic', text: 'IV Line set. Administering Pain Management.', time: '10:24 AM' },
  ]);

  if (!showMessageDrawer) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'Doctor', text: input.trim(), time: timeStr },
    ]);
    setInput('');
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-[#0f172a] border-l border-slate-800 z-50 flex flex-col justify-between shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-bold text-white uppercase">Ambulance Tele-Chat</h3>
        </div>
        <button
          onClick={() => setShowMessageDrawer(false)}
          className="text-slate-400 hover:text-white p-1 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Message History */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m) => {
          const isDoc = m.sender === 'Doctor';
          return (
            <div key={m.id} className={`flex flex-col ${isDoc ? 'items-end' : 'items-start'}`}>
              <div className="text-[10px] text-slate-400 mb-1 px-1">{m.sender} • {m.time}</div>
              <div
                className={`p-3 rounded-xl text-xs max-w-[80%] leading-relaxed ${
                  isDoc
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send guidance to ambulance team..."
          className="flex-1 bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white p-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
