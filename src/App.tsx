import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Mail, MessageSquare, Shield, Heart, ChevronDown, Send, Check, Sparkles, DollarSign, Eye, ToggleRight, Users, Building, Bot, Home, ShoppingBag } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// Animation variants with proper typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContributing, setIsContributing] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Model');
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [activePage, setActivePage] = useState(window.location.pathname);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const models = [
    'Zamani Pro',
    'GPT-5',
    'Claude Opus 4.6',
    'Claude Sonnet 4.5',
    'GPT-4o',
    'Gemini 2.0 Flash',
    'Gemini 2.0 Pro',
    'DeepSeek V3',
    'Llama 4'
  ];
  const backgroundImages = ['/hero-bg.jpg', '/hero-bg-2.jpg'];

  const placeholderExamples = [
    "Let's chat about my schedule today",
    "Generate an image of a sunset over mountains",
    "Help me write a professional email",
    "Explain quantum computing in simple terms",
    "Create a workout plan for beginners",
    "Summarize this article for me",
    "Write a poem about artificial intelligence",
    "Plan a 3-day trip to Tokyo",
  ];

  // Cycle through placeholder examples
  useEffect(() => {
    if (chatInput === '') {
      const interval = setInterval(() => {
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [chatInput, placeholderExamples.length]);

  // Cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false);
      }
    };

    if (modelDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modelDropdownOpen]);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([...messages, { role: 'user', content: chatInput }]);
      setChatInput('');

      // Simulate AI response after a short delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `This is a demo response from ${selectedModel}. In the full ZamaniChat app, you'll get real AI responses with full consent controls.`,
          },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] pb-20 md:pb-0">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-xl font-medium tracking-tight text-white">Zamani Labs</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="/chat" className="text-sm text-[#888] hover:text-white transition-colors">ZamaniChat</a>
            <a href="/marketplace" className="text-sm text-[#888] hover:text-white transition-colors">Marketplace</a>
            <a href="/api" className="text-sm text-[#888] hover:text-white transition-colors">API</a>
            <a href="/pricing" className="text-sm text-[#888] hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="/login" className="text-sm text-[#888] hover:text-white transition-colors px-4 py-2">
              Login
            </a>
            <a href="/chat" className="text-sm px-5 py-2.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
              Try ZamaniChat
            </a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-[#888]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/10 pt-4"
          >
            <a href="/chat" className="block py-2 text-[#888]">ZamaniChat</a>
            <a href="/marketplace" className="block py-2 text-[#888]">Marketplace</a>
            <a href="/api" className="block py-2 text-[#888]">API</a>
            <a href="/pricing" className="block py-2 text-[#888]">Pricing</a>
            <a href="/chat" className="block text-center py-2.5 rounded-full bg-white text-black font-medium mt-4">
              Try ZamaniChat
            </a>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section with ZamaniChat Interface */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0 z-0">
          {backgroundImages.map((bg, index) => (
            <div
              key={bg}
              className={`absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000 ${
                index === 0 ? 'scale-110' : 'scale-135 scale-x-[-1]'
              }`}
              style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: index === 0 ? 'center 40%' : 'center 33%',
                filter: index === 0 ? 'brightness(0.75) contrast(1.1)' : 'brightness(0.75) contrast(1.3)',
                opacity: currentBgIndex === index ? 1 : 0
              }}
            />
          ))}
          {/* Lighter gradient overlay for more image visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/60 to-[#0a0a0a]/80" />
          {/* Subtle radial gradient for focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a_90%)]" />
        </div>

        <div className="max-w-4xl mx-auto w-full relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400" />
              <span className="text-lg text-[#888]">ZamaniChat</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              The consent layer for AI.
            </h1>
          </motion.div>

          {/* Chat Input Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            {/* Messages Display */}
            {messages.length > 0 && (
              <div className="mb-4 rounded-2xl bg-[#1a1a1a] border border-white/10 p-4 max-h-64 overflow-y-auto space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-xl ${
                        message.role === 'user'
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#252525] text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main Input Container */}
            <div className="rounded-2xl bg-[#1a1a1a] border border-white/10 p-4 md:p-5">
              {/* Input Field */}
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholderExamples[currentPlaceholderIndex]}
                  className="flex-1 bg-transparent text-white text-lg placeholder:text-[#666] outline-none transition-all"
                />
              </div>

              {/* Bottom Controls */}
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className={`p-2.5 rounded-xl transition-colors ${
                      chatInput.trim()
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                        : 'bg-[#252525] text-[#666] cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-2.5 rounded-xl bg-[#252525] text-[#888] hover:text-white hover:bg-[#2a2a2a] transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button type="button" className="p-2.5 rounded-xl bg-[#252525] text-[#888] hover:text-white hover:bg-[#2a2a2a] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                  {/* Consent Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsContributing(!isContributing)}
                    className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                      isContributing
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-[#252525] border border-white/10'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isContributing ? 'text-emerald-400' : 'text-[#888]'}`} />
                    <span className={`text-xs font-medium ${isContributing ? 'text-emerald-400' : 'text-[#888]'}`}>
                      {isContributing ? 'Contributing' : 'Private'}
                    </span>
                    <div className={`w-7 h-4 rounded-full relative transition-colors ${
                      isContributing ? 'bg-emerald-500' : 'bg-[#444]'
                    }`}>
                      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                        isContributing ? 'right-0.5' : 'left-0.5'
                      }`} />
                    </div>
                  </button>

                  {/* Model Selector */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#252525] border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <span className="text-xs text-white font-medium">{selectedModel}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#888] transition-transform ${modelDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {modelDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-xl overflow-hidden z-10"
                      >
                        {models.map((model) => (
                          <button
                            key={model}
                            type="button"
                            onClick={() => {
                              setSelectedModel(model);
                              setModelDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                              selectedModel === model
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'text-[#888] hover:text-white hover:bg-[#252525]'
                            }`}
                          >
                            {model}
                            {selectedModel === model && (
                              <Check className="w-3 h-3 inline-block ml-2" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-6"
            >
              {[
                { icon: MessageSquare, label: 'Chat' },
                { icon: Eye, label: 'Research' },
                { icon: Sparkles, label: 'Create' },
                { icon: Check, label: 'Analyze' },
                { icon: Users, label: 'Collaborate' },
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a1a1a] border border-white/10 text-[#888] hover:text-white hover:border-white/20 transition-colors"
                >
                  <chip.icon className="w-4 h-4" />
                  <span className="text-sm">{chip.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center text-sm text-[#666] mt-6"
            >
              Contribute to AI improvement voluntarily. Get transparent attribution and fair compensation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* AI Meets You Where You Are Section */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-6 leading-[1.1]">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block"
              >
                AI will meet you
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="inline-block text-emerald-400"
              >
                where you are,
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="inline-block"
              >
                where you are
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="inline-block text-emerald-400"
              >
                at all times.
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg text-[#888] max-w-2xl mx-auto mb-4"
            >
              ChatGPT? Gemini? Veo? Sora?
            </motion.p>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-xl text-white font-medium"
            >
              No, it's Zamani. It's everything.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Ecosystem Section - Explore the Zamani ecosystem */}
      <section className="pt-10 md:pt-16 pb-20 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-6">
              Explore the Zamani ecosystem.
            </h2>
            <p className="text-lg text-[#888] max-w-2xl mx-auto">
              Three tools to fit your unique workflow. Interface, distribution, and infrastructure—the complete stack
              for consented human-AI interaction data.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* ZamaniChat */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">ZamaniChat</h3>
              <p className="text-sm text-[#888] mb-4">
                <span className="text-emerald-400 font-medium">Interface layer.</span> The AI chat interface where users interact naturally with frontier models while maintaining full consent control.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <a href="/chat" className="text-sm text-white flex items-center gap-1 hover:opacity-80">
                  Open in browser <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Product Screenshot Mockup */}
              <div className="rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="p-2 border-b border-white/5 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-[#666]">ZamaniChat</span>
                </div>
                <div className="p-3 h-32 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-3/4 h-2 rounded bg-[#1a1a1a]" />
                    <div className="w-1/2 h-2 rounded bg-[#1a1a1a]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-8 rounded-lg bg-[#1a1a1a] flex items-center px-3">
                      <span className="text-[10px] text-[#666]">Message...</span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Send className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Marketplace */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Zamani Marketplace</h3>
              <p className="text-sm text-[#888] mb-4">
                <span className="text-emerald-400 font-medium">Distribution layer.</span> Connect contributors with AI companies that need high-quality RLHF data for model improvement. Track earnings and maximize value with Agent Ryan—your personal AI assistant that negotiates on your behalf and finds the best opportunities for your contribution style.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-[#666]">Coming soon</span>
              </div>

              {/* Product Screenshot Mockup */}
              <div className="rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="p-2 border-b border-white/5 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-[#666]">Marketplace</span>
                </div>
                <div className="p-3 h-32 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-white">Earnings</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">$127.40</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Agent Ryan</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <Building className="w-3 h-3 text-[#888]" />
                      <span className="text-[10px] text-white">Partners</span>
                    </div>
                    <span className="text-[10px] text-[#888]">48</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* API */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Zamani API</h3>
              <p className="text-sm text-[#888] mb-4">
                <span className="text-emerald-400 font-medium">Infrastructure layer.</span> Enterprise access to consented, structured human-AI interaction data at scale for RLHF and model improvement.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm text-[#666]">Coming soon</span>
              </div>

              {/* Product Screenshot Mockup */}
              <div className="rounded-lg bg-[#0a0a0a] border border-white/10 overflow-hidden font-mono">
                <div className="p-2 border-b border-white/5 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[10px] text-[#666]">Terminal</span>
                </div>
                <div className="p-3 h-32 space-y-1 text-[10px]">
                  <p><span className="text-[#888]">$</span> <span className="text-emerald-400">curl</span> <span className="text-white">api.zamani.ai/v1/consent</span></p>
                  <p className="text-[#888]">{"{"}</p>
                  <p className="text-[#888] pl-2">"status": <span className="text-emerald-400">"active"</span>,</p>
                  <p className="text-[#888] pl-2">"contributions": <span className="text-white">847</span>,</p>
                  <p className="text-[#888] pl-2">"earnings": <span className="text-emerald-400">"$127.40"</span></p>
                  <p className="text-[#888]">{"}"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Two Column Feature Cards - Like Muse's "Bring Your Ideas" / "Export Anywhere" */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Contribute Your Data Card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-8 bg-[#141414] border border-white/5"
            >
              <h3 className="text-2xl font-medium text-white mb-3">Voluntary Participation</h3>
              <p className="text-[#888] mb-8">
                <span className="text-emerald-400 font-medium">Contribution layer.</span> Your natural interactions help train AI through RLHF—with full consent, transparent tracking, and fair compensation. When you contribute, you earn Contribution Points that convert into real cash, funded by AI companies that pay Zamani Labs for transparent, consented model-improvement data.
              </p>

              {/* UI Mockup - Consent Toggle Interface */}
              <div className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-white font-medium">Contribution Settings</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white">Contribution Mode</span>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-emerald-500 relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                    <span className="text-sm text-[#888]">Contribution Points</span>
                    <span className="text-sm text-white font-medium">847 pts</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-sm text-emerald-400">Cash value</span>
                    <span className="text-sm text-emerald-400 font-medium">$127.50</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Track Everything Card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-8 bg-[#141414] border border-white/5"
            >
              <h3 className="text-2xl font-medium text-white mb-3">Your Built-in Wallet</h3>
              <p className="text-[#888] mb-8">
                Every user gets a wallet to receive earnings. Your Contribution Points automatically convert to real cash (USDC), funded by AI companies paying for your consented data. Track your balance and upcoming Zamani tokens.
              </p>

              {/* UI Mockup - Wallet */}
              <div className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-white font-medium">Zamani Wallet</span>
                  </div>
                  <span className="text-xs text-emerald-400">Active</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white">USDC Balance</span>
                    </div>
                    <span className="text-sm text-emerald-400 font-medium">$127.40</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-medium">Zamani Tokens</span>
                    </div>
                    <span className="text-sm text-emerald-400">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-4 h-4 text-[#888]" />
                      <span className="text-sm text-white">Total Earned</span>
                    </div>
                    <span className="text-sm text-[#888] font-medium">$1,247.80</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Three Feature Cards - Like Muse's "Creativity on Demand" section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Explicit Consent Card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Explicit Consent</h3>
              <p className="text-sm text-[#888] mb-6">
                Choose exactly when your conversations contribute to AI improvement. Toggle on or off at any time.
              </p>

              {/* UI Mockup - Toggle options */}
              <div className="rounded-xl bg-[#0a0a0a] p-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs text-white">Always ask</span>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-400">Auto-contribute</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs text-white">Never share</span>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a]">
                    <div className="w-8 h-5 rounded-full bg-emerald-500 relative">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                    </div>
                    <span className="text-xs text-emerald-400">Contributing</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Multiple AI Models Card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Powered by Frontier Models</h3>
              <p className="text-sm text-[#888] mb-6">
                Choose from the latest models, each integrated with our consent and attribution infrastructure.
              </p>

              {/* UI Mockup - Model Selector */}
              <div className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="divide-y divide-white/5">
                  {[
                    { id: 'zamani', name: 'Zamani Pro', provider: 'Zamani Labs', selected: true },
                    { id: 'gpt5', name: 'GPT-5', provider: 'OpenAI', selected: false },
                    { id: 'claude-opus', name: 'Claude Opus 4.6', provider: 'Anthropic', selected: false },
                    { id: 'gemini2', name: 'Gemini 2.0 Pro', provider: 'Google', selected: false },
                    { id: 'deepseek', name: 'DeepSeek V3', provider: 'DeepSeek', selected: false },
                  ].map((model) => (
                    <div key={model.id} className={`p-3 flex items-center justify-between ${model.selected ? 'bg-[#1a1a1a]' : ''}`}>
                      <div>
                        <p className="text-sm text-white">{model.name}</p>
                        <p className="text-xs text-[#666]">{model.provider}</p>
                      </div>
                      {model.selected && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Chat with Context Card */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Chat with Attribution</h3>
              <p className="text-sm text-[#888] mb-6">
                Get context-aware AI responses while earning transparent credit for your contributions.
              </p>

              {/* UI Mockup - Chat Interface */}
              <div className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
                <div className="p-3 space-y-3">
                  <div className="p-3 rounded-lg bg-[#1a1a1a]">
                    <p className="text-xs text-white">How can I improve my code review process?</p>
                  </div>
                  <div className="text-xs text-[#666]">{">"} Thinking...</div>
                  <div className="p-3 rounded-lg bg-[#1a1a1a] space-y-2">
                    <p className="text-xs text-[#888]">Here are three strategies:</p>
                    <p className="text-xs text-white">1. Use structured checklists</p>
                    <p className="text-xs text-white">2. Limit review size to 400 LOC</p>
                    <p className="text-xs text-white">3. Focus on logic, not style</p>
                  </div>
                </div>
                <div className="p-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                    <Heart className="w-3 h-3 text-emerald-400" />
                    <span>+0.02 earned from this exchange</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Deep Understanding Section - Like Muse's split layout */}
      <section id="how-it-works" className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Left - Text Content */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-white mb-6">
                The infrastructure for RLHF.
              </h2>
              <p className="text-lg text-[#888] leading-relaxed mb-6">
                Reinforcement Learning from Human Feedback requires humans interacting naturally with models,
                correcting outputs, and choosing better answers. Today this happens in closed platforms with
                paid contractors and non-transparent pipelines.
              </p>
              <p className="text-lg text-white leading-relaxed">
                Zamani provides consented, structured human-AI interaction data at scale—with voluntary
                participation, built-in consent, and transparent compensation. We're not competing with AI
                companies. We're upstream from all of them.
              </p>
            </motion.div>

            {/* Right - Complex UI Mockup */}
            <motion.div variants={fadeInUp} className="space-y-4">
              {/* Chat Messages UI */}
              <div className="rounded-xl bg-[#141414] border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white font-medium">ZamaniChat</p>
                      <p className="text-xs text-[#666]">Zamani Pro</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs text-emerald-400">Contributing</span>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] p-3 rounded-lg bg-[#1a1a1a]">
                      <p className="text-sm text-white">Can you explain how consent tracking works?</p>
                    </div>
                  </div>

                  {/* AI thinking */}
                  <div className="text-xs text-[#666]">{">"} Analyzing consent preferences...</div>

                  {/* AI response */}
                  <div className="max-w-[90%] p-3 rounded-lg bg-[#0a0a0a] border border-white/5">
                    <p className="text-sm text-[#ccc] leading-relaxed">
                      Every message you send while in contributing mode is:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-white">
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-emerald-400" />
                        Logged with a unique attribution ID
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-emerald-400" />
                        Tracked for AI training usage
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-emerald-400" />
                        Compensated based on value
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Contribution indicator */}
                <div className="p-3 border-t border-white/5 flex items-center justify-between bg-emerald-500/5">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-400">Contribution recorded</span>
                  </div>
                  <span className="text-xs text-white font-medium">+3 pts ($0.03)</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#141414] border border-white/5 text-center">
                  <p className="text-lg font-medium text-white">847 pts</p>
                  <p className="text-xs text-[#666]">Points Earned</p>
                </div>
                <div className="p-3 rounded-lg bg-[#141414] border border-white/5 text-center">
                  <p className="text-lg font-medium text-emerald-400">$127.40</p>
                  <p className="text-xs text-[#666]">Cash Value</p>
                </div>
                <div className="p-3 rounded-lg bg-[#141414] border border-white/5 text-center">
                  <p className="text-lg font-medium text-white">100%</p>
                  <p className="text-xs text-[#666]">Verified</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Zamani Token & Meaning Section */}
      <section className="py-20 md:py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          {/* Zamani Token */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Zamani Token</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
              Powering rewards and incentives.
            </h2>
            <p className="text-lg text-[#888] max-w-2xl mx-auto mb-2">
              The Zamani token will launch on Base, designed to reward contributors
              and incentivize participation in the consent-first AI ecosystem.
            </p>
            <p className="text-sm text-[#666] max-w-xl mx-auto">
              Coming soon.
            </p>
          </motion.div>

          {/* Meaning of Zamani */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-6">
              The meaning of Zamani.
            </h2>
            <p className="text-lg text-[#888] max-w-2xl mx-auto">
              A beautiful fusion of languages—drawing from Arabic, Swahili, and Hausa.
              It represents time, heritage, and the collective wisdom that connects us all.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Arabic</h3>
              <p className="text-sm text-[#888]">زمان (Zaman) - Time, era, epoch</p>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Swahili</h3>
              <p className="text-sm text-[#888]">Zamani - The distant past, heritage</p>
            </motion.div>
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Hausa</h3>
              <p className="text-sm text-[#888]">Zamani - Ancient times, tradition</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-medium text-white mb-6">
              Choose your plan.
            </h2>
            <p className="text-lg text-[#888] max-w-2xl mx-auto">
              Start free, upgrade when you're ready. All plans include explicit consent controls.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Free Tier */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Free</h3>
              <p className="text-sm text-[#888] mb-6">
                Get started with ZamaniChat. Perfect for trying out consent-first AI.
              </p>

              {/* Pricing Display */}
              <div className="rounded-xl bg-[#0a0a0a] p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-medium text-white">$0</span>
                  <span className="text-sm text-[#666]">/forever</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>20 messages/day</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Private & Contributing modes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                    <X className="w-3 h-3" />
                    <span>No rewards</span>
                  </div>
                </div>
              </div>

              <a
                href="/chat"
                className="block w-full px-4 py-2.5 text-center text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
              >
                Start Free
              </a>
            </motion.div>

            {/* Plus Tier */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5 relative"
            >
              <div className="absolute -top-2 right-4 px-2 py-0.5 bg-emerald-500 text-black text-[10px] font-semibold rounded">
                POPULAR
              </div>

              <h3 className="text-xl font-medium text-white mb-2">Plus</h3>
              <p className="text-sm text-[#888] mb-6">
                Earn rewards for your contributions. Join the marketplace.
              </p>

              {/* Pricing Display */}
              <div className="rounded-xl bg-[#0a0a0a] p-4 mb-6 border border-emerald-500/20">
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-medium text-white">$12</span>
                  <span className="text-sm text-[#666]">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>100 messages/day</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <Check className="w-3 h-3" />
                    <span className="font-medium">Earn rewards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Marketplace access</span>
                  </div>
                </div>
              </div>

              <a
                href="/chat"
                className="block w-full px-4 py-2.5 text-center text-sm font-medium rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
              >
                Get Plus
              </a>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-6 bg-[#141414] border border-white/5"
            >
              <h3 className="text-xl font-medium text-white mb-2">Pro</h3>
              <p className="text-sm text-[#888] mb-6">
                Maximum rewards, unlimited usage, and priority access to new features.
              </p>

              {/* Pricing Display */}
              <div className="rounded-xl bg-[#0a0a0a] p-4 mb-6">
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-medium text-white">$29</span>
                  <span className="text-sm text-[#666]">/month</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Unlimited messages</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <Check className="w-3 h-3" />
                    <span className="font-medium">Maximum rewards</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Agent Ryan access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#888]">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Priority features</span>
                  </div>
                </div>
              </div>

              <a
                href="/chat"
                className="block w-full px-4 py-2.5 text-center text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
              >
                Get Pro
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-20 md:py-32 px-6 bg-[#0f0f0f]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-medium text-white mb-6">
            Try ZamaniChat now.
          </h2>
          <p className="text-lg text-[#888] mb-10">
            Free to use. Your choice, always.
          </p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          >
            Start chatting
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-12 px-6 border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-white" />
                <span className="text-lg font-medium text-white">Zamani Labs</span>
              </div>
              <p className="text-sm text-[#666] mb-2">Contact</p>
              <a href="mailto:hello@zamanilabs.com" className="text-sm text-white flex items-center gap-2 hover:opacity-80">
                hello@zamanilabs.com <Mail className="w-3 h-3" />
              </a>
              <p className="mt-6 text-xs text-[#666]">
                2026 Zamani Labs Inc. All rights reserved.
              </p>
            </div>

            <div>
              <p className="font-medium text-sm text-white mb-4">Product</p>
              <ul className="space-y-2">
                <li><a href="/chat" className="text-sm text-[#666] hover:text-white transition-colors">ZamaniChat</a></li>
                <li><a href="/marketplace" className="text-sm text-[#666] hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="/api" className="text-sm text-[#666] hover:text-white transition-colors">API</a></li>
                <li><a href="/pricing" className="text-sm text-[#666] hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-sm text-white mb-4">Company</p>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-sm text-[#666] hover:text-white transition-colors">Blog</a></li>
                <li><a href="/about" className="text-sm text-[#666] hover:text-white transition-colors">About</a></li>
                <li><a href="/terms" className="text-sm text-[#666] hover:text-white transition-colors">Terms</a></li>
                <li><a href="/privacy" className="text-sm text-[#666] hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <p className="font-medium text-sm text-white mb-4">Stay updated</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-[#1a1a1a] border border-white/10 text-white placeholder:text-[#666] outline-none focus:border-white/20"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-sm rounded-r-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* PWA Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around px-4 py-3">
          <a
            href="/"
            onClick={() => setActivePage('/')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activePage === '/' ? 'text-emerald-400' : 'text-[#888] hover:text-white'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </a>
          <a
            href="/marketplace"
            onClick={() => setActivePage('/marketplace')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activePage === '/marketplace' ? 'text-emerald-400' : 'text-[#888] hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs">Marketplace</span>
          </a>
          <a
            href="/chat"
            onClick={() => setActivePage('/chat')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activePage === '/chat' ? 'text-emerald-400' : 'text-[#888] hover:text-white'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Zamani Chat</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default App;
