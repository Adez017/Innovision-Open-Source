"use client";

import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube, FaGithub } from "react-icons/fa6";
import { ToastContainer } from 'react-toastify';
import { toast } from "sonner";
import { PageBackground, GridPattern, ScrollReveal } from "@/components/ui/PageWrapper";
import { Mail, Send } from "lucide-react";


export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null)

  function sendEmail(formData) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      console.error("EmailJS configuration missing");
      toast.error("Email service not configured. Please contact support.");
      formRef.current.removeAttribute("disabled");
      return;
    }

    emailjs.send(serviceId, templateId, formData, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        toast.success("Message sent successfully!");
        formRef.current.removeAttribute("disabled");
      })
      .catch((error) => {
        console.error("Failed to send email.", error);

        // Specific error handling for Gmail API issues
        if (error.text && error.text.includes("Gmail_API")) {
          toast.error("Email service temporarily unavailable. Please try again later or contact us directly.");
        } else if (error.status === 412) {
          toast.error("Email service needs reconnection. Please contact support.");
        } else {
          toast.error("Failed to send message. Please try again.");
        }

        formRef.current.removeAttribute("disabled");
      });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.setAttribute("disabled", "true");

    // Only clear form and show success after email is actually sent
    const formData = { email, message };
    sendEmail(formData);

    // Clear form fields immediately for better UX
    setEmail("");
    setMessage("");
    toast.success("Message sent successfully!", { type: "success" });
    setTimeout(() => {
      formRef.current.removeAttribute("disabled");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background relative transition-colors duration-300">
      {/* Animated dots background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="dot absolute w-1 h-1 bg-foreground/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col relative z-10 pt-24">
        <ToastContainer />
        <div className="bg-transparent py-12 px-4">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-border rounded-full mb-6">
                <Mail className="h-7 w-7 text-blue-500" />
              </div>
              <h1 className="text-foreground text-4xl md:text-5xl font-light mb-4">Get in Touch</h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto font-light">
                Have questions? The quickest way to get in touch with us is using the contact information below.
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="flex-1 py-8 px-4">
          <ScrollReveal delay={100}>
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-5 py-3.5 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message"
                    rows="5"
                    className="w-full px-5 py-3.5 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none font-light"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    ref={formRef}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>

              <div className="flex justify-center text-muted-foreground space-x-6 mt-12">
                <a href="https://www.instagram.com/hands_on_coding_028/#" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <FaInstagram />
                </a>
                <a href="https://wa.me/7019003366" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <IoLogoWhatsapp />
                </a>
                <a href="https://github.com/ItsVikasA" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/vikas028/" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <FaLinkedin />
                </a>
                <a href="https://www.youtube.com/@hands_on_coding_028" className="text-2xl hover:text-foreground hover:scale-110 transition-all duration-300">
                  <FaYoutube />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}