"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-cyan-50 selection:bg-cyan-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#040814]/85 backdrop-blur-xl border-b border-cyan-500/20 z-50 shadow-lg shadow-black/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              SkillSync{" "}
              <span className="text-[10px] bg-cyan-500/15 text-cyan-400 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
                AI
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-cyan-500/10 rounded-xl transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all shadow-md shadow-cyan-500/30 hover:scale-[1.02]"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 text-cyan-300 text-xs font-semibold mb-6 border border-cyan-500/30 shadow-[0_0_20px_-3px_rgba(6,182,212,0.3)]">
            <Zap className="w-3.5 h-3.5 fill-current text-cyan-400" />
            <span>AI-Powered Adaptive Education Engine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Learn what you need.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 drop-shadow-[0_0_35px_rgba(6,182,212,0.45)]">
              Not what everyone else gets.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            SkillSync AI adapts your learning path to what you actually understand. Take a fast diagnostic,
            get an AI learning analysis, study with a context-aware tutor, and watch your mastery update in real time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-xl transition-all shadow-lg shadow-cyan-500/35 hover:scale-[1.02]"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-cyan-200 bg-[#081226]/90 hover:bg-[#0d1a36] border border-cyan-500/30 rounded-xl transition-all shadow-md shadow-cyan-950/40 hover:border-cyan-500/60"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Instant Demo Mode (Alex Rivera)</span>
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold text-cyan-300 hover:text-white border border-cyan-500/20 bg-cyan-950/20 hover:bg-cyan-950/40 rounded-xl transition-colors"
            >
              See How It Works
            </a>
          </div>

          {/* Product Preview / Adaptive Loop Visual */}
          <div className="max-w-4xl mx-auto bg-[#070e20]/90 backdrop-blur-2xl rounded-3xl border border-cyan-500/25 shadow-2xl shadow-black/80 overflow-hidden p-6 sm:p-8 text-left relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-cyan-500/15 pb-4 mb-6 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-cyan-300/50 ml-2">skillsync.ai/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Adaptive Loop Active
              </div>
            </div>

            {/* Loop Visual Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              <div className="p-4 rounded-2xl bg-[#0a142c]/80 border border-cyan-500/20 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400/80 block">
                  1. Diagnostic Assessment
                </span>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-100">Normalization</span>
                  <span className="font-mono font-bold text-rose-400">42% (Weak)</span>
                </div>
                <div className="w-full bg-[#071329] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[42%] shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                </div>
                <p className="text-[11px] text-slate-300/70">Missed 2NF vs 3NF transitive dependencies.</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-500/30 space-y-2 shadow-inner">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  2. AI Tutor & Plan
                </span>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  Targeted Decomposition
                </div>
                <p className="text-[11px] text-slate-200/80 leading-snug">
                  &ldquo;Let&apos;s break down why functional dependency X &rarr; Y violates 3NF with a schema diagram.&rdquo;
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a142c]/80 border border-emerald-500/25 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  3. Practice & Updated Mastery
                </span>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-100">Normalization</span>
                  <span className="font-mono font-bold text-emerald-400">68% (+26%)</span>
                </div>
                <div className="w-full bg-[#071329] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[68%] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </div>
                <p className="text-[11px] text-emerald-300/90 font-medium">Next priority unlocked: Transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#040916]/80 border-y border-cyan-500/15 px-6 backdrop-blur-md">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              The 5-Step Continuous Adaptive Loop
            </h2>
            <p className="text-xs sm:text-sm text-cyan-300/70">
              Not a static course. An intelligent cycle that calibrates every time you answer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                icon: Target,
                title: "Assess",
                desc: "10-minute diagnostic reveals what you know and pinpoint hidden gaps.",
              },
              {
                step: "02",
                icon: Brain,
                title: "AI Analysis",
                desc: "AI explains why you missed questions and builds your mastery profile.",
              },
              {
                step: "03",
                icon: BookOpen,
                title: "Daily Plan",
                desc: "High-yield topics prioritized so you study what matters most.",
              },
              {
                step: "04",
                icon: MessageSquare,
                title: "AI Tutor",
                desc: "Context-aware explanations tailored specifically to your mistakes.",
              },
              {
                step: "05",
                icon: TrendingUp,
                title: "Adaptive Practice",
                desc: "Score changes in real time, updating your learning profile and next steps.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-[#091226]/80 p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 text-left space-y-3 transition-all hover:scale-[1.02] shadow-lg shadow-black/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">{s.step}</span>
                  <s.icon className="w-4 h-4 text-cyan-400/80" />
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-300/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#061d36] via-[#08152b] to-[#030612] text-white rounded-3xl p-10 sm:p-14 shadow-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 text-white">
            Ready to experience adaptive learning?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-8 max-w-md mx-auto">
            Take your diagnostic assessment now or explore the full interactive demo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-[1.02]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c1833] text-cyan-200 hover:text-white border border-cyan-500/30 text-xs font-semibold transition-all hover:border-cyan-500/60"
            >
              <span>Launch Demo Mode</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/15 py-8 px-6 text-center text-xs text-cyan-300/40">
        SkillSync AI • Built for AI × Education Hackathon • Adaptive Learning MVP
      </footer>
    </div>
  );
}
