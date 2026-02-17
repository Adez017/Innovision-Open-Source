import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Link from "next/link";
import BackToTop from "./BackToTop";

export default function Landing() {
  return (
    <div className="relative flex min-h-screen overflow-x-hidden flex-col scroll-smooth bg-background text-foreground">
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

      <div className="relative z-2 flex flex-col items-center w-full">
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <Testimonials />
        <CTA />

        {/* Contact Section */}
        <section id="contact" className="relative w-screen py-20 md:py-32 bg-background">
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-foreground">
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-lg font-light">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <form className="space-y-5">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-5 py-3.5 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-light"
                    required
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Message"
                    rows="5"
                    className="w-full px-5 py-3.5 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none font-light"
                    required
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-light transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              <div className="flex justify-center text-muted-foreground space-x-6 mt-12">
                <a
                  href="https://github.com/ItsVikasA/InnoVision"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/vikas028/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 rounded transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Sheryians Style */}
        <footer className="w-screen border-t border-border bg-background">
          <div className="container mx-auto px-8 md:px-6 py-12">
            <div className="flex justify-evenly max-md:flex-col gap-8">
              {/* Brand */}
              <div className="space-y-4 md:w-[25%] max-md:w-full">
                <div className="flex items-center gap-2 font-light text-lg">
                  <Image
                    src="/InnoVision_LOGO-removebg-preview.png"
                    alt="logo"
                    width={32}
                    height={32}
                  />
                  <span className="text-foreground">InnoVision</span>
                </div>
                <p className="text-sm text-muted-foreground font-light">
                  AI-powered learning platform that creates personalized courses on any topic.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-light text-foreground">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/features"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/demo"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/premium"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Premium
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/feedback"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Feedback
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h4 className="font-light text-foreground">Legal</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/privacy"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div className="space-y-4">
                <h4 className="font-light text-foreground">Connect</h4>
                <div className="flex gap-4 text-muted-foreground">
                  <a
                    href="https://github.com/ItsVikasA/InnoVision"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vikas028/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:contact@innovision.com"
                    className="hover:text-foreground transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground font-light">
              Made with <span className="text-red-500">❤️</span> for learners everywhere
            </div>
          </div>
        </footer>
        <BackToTop />
      </div>
    </div>
  );
}
