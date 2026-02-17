"use client";
import { Scale, CheckCircle, XCircle, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <Scale className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The rules are simple: be respectful, learn freely, and have fun.
          </p>
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">The Short Version</h2>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>Be respectful to others and don't cheat the system</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>You own your content, but we need permission to host it</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>We own the platform and courses - please don't steal them</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>Use InnoVision for learning, not for anything illegal or harmful</p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What is InnoVision?</h2>
            <p className="text-muted-foreground mb-4">
              InnoVision is a learning platform that helps you master any concept through interactive courses,
              gamification, and hands-on practice. Think of it as your personal learning companion.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <p className="font-semibold m-0">
                By using InnoVision, you agree to these terms. If you don't agree, you can't use the platform.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Account</h2>
            <p className="text-muted-foreground mb-4">
              When you create an account, you agree to:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">Be at least 13 years old</li>
              <li className="text-muted-foreground">Provide accurate and truthful information</li>
              <li className="text-muted-foreground">Keep your password secure and confidential</li>
              <li className="text-muted-foreground">Use one account per person (no sharing or selling accounts)</li>
              <li className="text-muted-foreground">Notify us immediately if your account is compromised</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You're responsible for all activity that happens under your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Can Do</h2>
            <p className="text-muted-foreground mb-4">
              InnoVision is your playground for learning. Feel free to:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Learn Anything</h3>
                <p className="text-sm text-muted-foreground m-0">Access courses and resources across any topic</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Build Projects</h3>
                <p className="text-sm text-muted-foreground m-0">Use our tools to create real projects</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Earn Achievements</h3>
                <p className="text-sm text-muted-foreground m-0">Collect XP, maintain streaks, unlock badges</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Share Your Work</h3>
                <p className="text-sm text-muted-foreground m-0">Showcase projects and collaborate</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What You Can't Do</h2>
            <p className="text-muted-foreground mb-4">
              To keep InnoVision awesome for everyone, please don't:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Cheat or exploit:</strong>
                  <span className="text-muted-foreground"> Gaming the XP system, using bots, or hacking features</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Harass others:</strong>
                  <span className="text-muted-foreground"> No hate speech, bullying, or spam</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Steal content:</strong>
                  <span className="text-muted-foreground"> Don't copy courses or materials and claim them as yours</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Break stuff:</strong>
                  <span className="text-muted-foreground"> No hacking, DDoS attacks, or trying to break our systems</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Scrape data:</strong>
                  <span className="text-muted-foreground"> Don't use bots to extract content or user data</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Content</h2>
            <p className="text-muted-foreground mb-4">
              Anything you create on InnoVision belongs to you. Here's how it works:
            </p>
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">You Own It</h3>
                <p className="text-sm text-muted-foreground m-0">
                  Your code, projects, and notes are your intellectual property. We don't claim ownership.
                </p>
              </div>
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">We Need a License</h3>
                <p className="text-sm text-muted-foreground m-0">
                  By uploading content, you give us permission to store, display, and process it to provide our services.
                </p>
              </div>
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">Public Means Public</h3>
                <p className="text-sm text-muted-foreground m-0">
                  If you share something publicly, anyone can see it. Don't share secrets or sensitive information.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Content</h2>
            <p className="text-muted-foreground mb-4">
              The InnoVision platform, courses, design, and features belong to us or our licensors.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">You can:</strong> Use the platform for personal learning,
              share your progress, and reference what you learned (with attribution).
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">You can't:</strong> Copy our courses, reverse engineer our code,
              or create a competing platform using our content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Disclaimers</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5 mb-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0" />
                <div>
                  <p className="font-semibold mb-2">Use at Your Own Risk</p>
                  <p className="text-sm text-muted-foreground m-0">
                    We work hard to make InnoVision reliable, but we can't guarantee it'll be perfect 100% of the time.
                    The platform is provided "as is."
                  </p>
                </div>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <strong className="text-foreground">No Warranties:</strong> We don't guarantee error-free or uninterrupted service
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Educational Purposes:</strong> We're not responsible if you use what you learn for something illegal
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Third-Party Links:</strong> We're not responsible for external websites we link to
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Termination</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">You Can Leave</h3>
                <p className="text-sm text-muted-foreground m-0">
                  Delete your account anytime from your profile settings. Your data will be removed within 30 days.
                </p>
              </div>
              <div className="border border-border rounded-lg p-5">
                <h3 className="font-semibold mb-2">We Can Remove You</h3>
                <p className="text-sm text-muted-foreground m-0">
                  If you violate these terms, we may suspend or terminate your account. We'll try to warn you first.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Changes to These Terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these terms occasionally. When we do:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">We'll update the "Last updated" date</li>
              <li className="text-muted-foreground">We'll notify you via email for major changes</li>
              <li className="text-muted-foreground">Continuing to use InnoVision means you accept the new terms</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Questions about these terms? We're here to help.
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2">
                <strong>Legal:</strong>{" "}
                <a href="mailto:legal@innovision.com" className="text-primary hover:underline">
                  legal@innovision.com
                </a>
              </p>
              <p className="mb-2">
                <strong>Support:</strong>{" "}
                <a href="mailto:vikas.ambalazari@gmail.com" className="text-primary hover:underline">
                  vikas.ambalazari@gmail.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground m-0">
                We read every email and respond to real humans.
              </p>
            </div>
          </section>

          <div className="text-sm text-muted-foreground mb-12">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-6">
            Want to know how we handle your data?
          </p>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
          >
            Read Our Privacy Policy
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
