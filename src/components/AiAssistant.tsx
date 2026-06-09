"use client";

import { useState } from "react";
import { Send, MessageSquare, RotateCcw, BookOpen } from "lucide-react";

export default function AiAssistant() {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "NBRF Research Assistant initialized." },
    { role: "assistant", content: "Welcome to the NBRF Research Assistant. Ask me about Bihar&apos;s development, our policy research, or any initiatives we are working on." }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);
    setQuery("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "Thank you for your query. Our research team is working on comprehensive studies in this area. Please check our latest publications for detailed insights.";
      
      if (newMessages[newMessages.length - 1].content.toLowerCase().includes("policy")) {
        response = "NBRF is actively working on policy recommendations across governance, economy, and social development sectors in Bihar. Our latest policy briefs are available in the Publications section.";
      }
      if (newMessages[newMessages.length - 1].content.toLowerCase().includes("bihar")) {
        response = "Bihar has a rich historical legacy and immense potential. NBRF is dedicated to bridging developmental gaps through research, advocacy, and strategic partnerships with government and institutions.";
      }

      setMessages([...newMessages, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="assistant" className="py-24 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-mono text-[10px] uppercase tracking-widest mb-4">
              AI // RESEARCH ASSISTANT
            </div>
            <h2 className="text-3xl md:text-5xl font-mono font-bold text-white mb-6 glow-text">
              ASK NBRF
            </h2>
            <p className="text-muted text-lg font-sans mb-8">
              Get instant insights on Bihar&apos;s development, our research findings, and ongoing policy initiatives.
            </p>
            
            <div className="space-y-3">
              <p className="text-xs font-mono text-brand-secondary uppercase tracking-widest">Suggested Questions:</p>
              {[
                "What is NBRF&apos;s mission?",
                "Explain Bihar&apos;s development challenges",
                "What are NBRF&apos;s key research areas?",
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(suggestion)}
                  className="w-full text-left px-4 py-3 bg-surface border border-border text-sm font-mono text-white hover:border-brand-primary hover:text-brand-primary transition-colors flex items-center gap-3 group rounded"
                >
                  <MessageSquare className="w-4 h-4 text-muted group-hover:text-brand-primary" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="tech-card border border-border overflow-hidden flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="bg-[#0A0A0A] border-b border-border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/50 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-sm text-white font-bold">NBRF Research Assistant</div>
                    <div className="font-mono text-[10px] text-brand-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse inline-block"></span>
                      Online
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setMessages(messages.slice(0, 2))}
                  className="text-muted hover:text-brand-primary transition-colors"
                  aria-label="Clear Chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Output */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#050505]">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.role !== "user" && (
                      <div className="w-7 h-7 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0 mt-1">
                        <BookOpen className="w-3 h-3 text-brand-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] px-4 py-3 rounded-lg text-sm font-sans leading-relaxed ${
                      msg.role === "user" 
                        ? "bg-brand-primary/20 border border-brand-primary/30 text-white ml-auto"
                        : msg.role === "system"
                        ? "text-muted text-xs font-mono"
                        : "bg-surface border border-border text-white"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center shrink-0">
                      <BookOpen className="w-3 h-3 text-brand-primary" />
                    </div>
                    <div className="bg-surface border border-border px-4 py-3 rounded-lg flex gap-1 items-center">
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                      <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="bg-[#0A0A0A] border-t border-border p-3">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about NBRF research, Bihar policy..."
                    className="flex-1 bg-surface border border-border rounded text-white text-sm py-2 px-4 outline-none focus:border-brand-primary transition-colors font-sans"
                    spellCheck={false}
                  />
                  <button
                    type="submit"
                    disabled={!query.trim() || isTyping}
                    className="p-2 text-muted hover:text-brand-primary disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
