import { motion } from "motion/react";

export default function PrivacyPolicy() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-20 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display tracking-tighter">PRIVACY.</h1>
        <p className="text-white/40 font-mono uppercase tracking-widest text-xs">Last updated: April 2024</p>
      </div>

      <div className="space-y-12 text-white/60 leading-relaxed font-sans">
        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">Data Collection</h2>
          <p>
            Our studio respects your privacy. We minimize data collection to the absolute essentials required to provide our services and maintain the technical integrity of our digital platforms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">Information Usage</h2>
          <p>
            Any information collected is used solely for the purpose of improving user experience, processing inquiries, and ensuring the security of our systems. We do not sell or lease user data to third parties.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">Cookies</h2>
          <p>
            We use minimal technical cookies to ensure the website functions correctly. These do not track personal behavior across the web.
          </p>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-8">
          <h2 className="text-2xl text-white font-display">Contact</h2>
          <p className="font-mono text-sm">privacy@studio.com</p>
        </section>
      </div>
    </div>
  );
}
