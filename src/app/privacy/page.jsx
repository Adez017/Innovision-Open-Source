"use client";
import { Shield, Lock, Users, Eye, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, transparent, and honest about how we handle your data.
          </p>
        </div>

        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4">The Short Version</h2>
          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>We collect only what's needed to provide you with a great learning experience</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>We never sell your personal data to third parties</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>You have full control over your data - access, export, or delete anytime</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
              <p>We use industry-standard encryption and security practices</p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold m-0">What We Collect</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We keep it simple. Here's what we collect when you use InnoVision:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Account Information:</strong> Your name, email address, and encrypted password
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Learning Data:</strong> Course progress, XP earned, streaks, and achievements
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Your Content:</strong> Code you write, projects you build, and notes you take
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Usage Information:</strong> How you interact with the platform to help us improve
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold m-0">How We Use Your Data</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Your data powers your personalized learning experience:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">Personalize your learning path and recommend relevant courses</li>
              <li className="text-muted-foreground">Track your progress, XP, and achievements</li>
              <li className="text-muted-foreground">Send important updates about your courses and account</li>
              <li className="text-muted-foreground">Improve our platform based on usage patterns</li>
              <li className="text-muted-foreground">Keep your account secure and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold m-0">Data Sharing</h2>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5 mb-4">
              <p className="font-semibold text-primary m-0">
                We don't sell your data. Period.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              We only share your information in these limited circumstances:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <strong className="text-foreground">With your consent:</strong> When you choose to share projects publicly
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Service providers:</strong> Trusted partners who help us operate (hosting, email, analytics)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Legal requirements:</strong> When required by law or to protect our rights
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold m-0">Security</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We take security seriously and implement multiple layers of protection:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">End-to-end encryption for data in transit and at rest</li>
              <li className="text-muted-foreground">Regular security audits and penetration testing</li>
              <li className="text-muted-foreground">Strict access controls - only essential team members can access user data</li>
              <li className="text-muted-foreground">Secure password hashing - we can't see your password</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have complete control over your personal data:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Access</h3>
                <p className="text-sm text-muted-foreground m-0">Request a copy of all your data</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Correction</h3>
                <p className="text-sm text-muted-foreground m-0">Update any inaccurate information</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Deletion</h3>
                <p className="text-sm text-muted-foreground m-0">Delete your account and data</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Export</h3>
                <p className="text-sm text-muted-foreground m-0">Download your data in a portable format</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies to improve your experience:
            </p>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                <strong className="text-foreground">Essential:</strong> Keep you logged in and remember preferences
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Analytics:</strong> Understand how you use the platform (anonymous data)
              </li>
              <li className="text-muted-foreground">
                <strong className="text-foreground">Performance:</strong> Make the platform faster and more responsive
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Age Requirements</h2>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
              <p className="text-muted-foreground m-0">
                <strong className="text-foreground">You must be at least 13 years old</strong> to use InnoVision.
                If you're a parent and believe your child under 13 has created an account, please contact us
                immediately at <a href="mailto:privacy@innovision.com" className="text-primary hover:underline">privacy@innovision.com</a>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              Have questions about this privacy policy? We're here to help.
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:privacy@innovision.com" className="text-primary hover:underline">
                  privacy@innovision.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground m-0">
                We read every email and respond to real humans (not bots).
              </p>
            </div>
          </section>

          <div className="text-sm text-muted-foreground mb-12">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-6">
            Want to know the rules of using InnoVision?
          </p>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-lg"
          >
            Read Our Terms of Service
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
