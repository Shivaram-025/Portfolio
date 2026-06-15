import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);


const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    if (!section || !heading || !form || !info) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(heading.children, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Form animation
      gsap.from(form.children, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Info animation
      gsap.from(info.children, {
        x: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: info,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/shivaramplg@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: 'New Project Inquiry from Portfolio',
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (response.ok && result.success === "true") {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', budget: '', message: '' });

        // Reset success state after 4 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
      } else {
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'shivaramplg@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9148672650' },
    { icon: MapPin, label: 'Location', value: 'Bengaluru, KA' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 lg:py-32 bg-[#050505]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0a1a] to-[#050505] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Heading & Info */}
          <div>
            <div ref={headingRef} className="mb-12">
              <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
                Get in Touch
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
                Start a Project
              </h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-md">
                Have an idea? Let's turn it into reality. I'm always excited to
                work on new projects and collaborate with creative minds.
              </p>
            </div>

            {/* Contact Info */}
            <div ref={infoRef} className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#4A6FFF]/20 group-hover:border-[#4A6FFF]/30 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-[#4A6FFF]" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60">I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  {/* Name */}
                  <div className="mb-6">
                    <label className="block text-white/60 text-sm mb-2">Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder-white/30 focus:outline-none transition-colors duration-300"
                        placeholder="Your name"
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#4A6FFF] transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-white/60 text-sm mb-2">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder-white/30 focus:outline-none transition-colors duration-300"
                        placeholder="your@email.com"
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#4A6FFF] transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-6">
                    <label className="block text-white/60 text-sm mb-2">Budget</label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('budget')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white focus:outline-none transition-colors duration-300 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#121212]">Select budget range</option>
                        <option value="5k-10k" className="bg-[#121212]">$5,000 - $10,000</option>
                        <option value="10k-25k" className="bg-[#121212]">$10,000 - $25,000</option>
                        <option value="25k-50k" className="bg-[#121212]">$25,000 - $50,000</option>
                        <option value="50k+" className="bg-[#121212]">$50,000+</option>
                      </select>
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#4A6FFF] transition-all duration-300 ${focusedField === 'budget' ? 'w-full' : 'w-0'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className="block text-white/60 text-sm mb-2">Message</label>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white placeholder-white/30 focus:outline-none transition-colors duration-300 resize-none"
                        placeholder="Tell me about your project..."
                      />
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-[#4A6FFF] transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'
                          }`}
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="relative z-50 mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden group w-full h-14 flex items-center justify-center gap-2 rounded-2xl bg-[#4A6FFF] hover:bg-[#5A7FFF] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,111,255,0.45)] active:scale-[0.98] border border-[#6B86FF]/30"
                      data-magnetic
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4A6FFF]/20 to-[#8EA6FF]/20 blur-xl" />

                      {isSubmitting ? (
                        <>
                          <div className="flex items-center relative z-10">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 relative z-10">
                            <span>Send Message</span>
                            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#4A6FFF]/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
