import { motion } from "motion/react";

export default function TermsOfService() {
  return (
    <div className="px-6 md:px-12 pt-32 pb-20 space-y-20 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-display tracking-tighter">TERMS.</h1>
        <p className="text-white/40 font-mono uppercase tracking-widest text-xs">Effective date: April 2024</p>
      </div>

      <div className="space-y-12 text-white/60 leading-relaxed font-sans">
        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">1. Agreement to Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">2. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality are and will remain the exclusive property of our studio and its licensors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-white font-display">3. Limitations</h2>
          <p>
            In no event shall the studio be liable for any damages arising out of the use or inability to use the materials on our website.
          </p>
        </section>

        <section className="space-y-4 border-t border-white/10 pt-8">
          <h2 className="text-2xl text-white font-display">Governing Law</h2>
          <p>
            These terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
}
