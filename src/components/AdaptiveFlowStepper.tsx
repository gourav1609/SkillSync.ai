"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Zap, BarChart2, BookOpen, MessageSquare, TrendingUp, User } from "lucide-react";

export interface StepperProps {
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function AdaptiveFlowStepper({ currentStep }: StepperProps) {
  const steps = [
    { number: 1, name: "Quiz", href: "/practice", icon: Zap },
    { number: 2, name: "Result", href: "/assessment/results", icon: BarChart2 },
    { number: 3, name: "Learning Plan", href: "/plan", icon: BookOpen },
    { number: 4, name: "AI Tutor", href: "/tutor?topic=Normalization&fromPlan=true", icon: MessageSquare },
    { number: 5, name: "Progress Report", href: "/progress", icon: TrendingUp },
    { number: 6, name: "Profile Updated", href: "/profile?updated=true", icon: User },
  ];

  return (
    <div className="w-full bg-[#071126]/90 backdrop-blur-md rounded-2xl border border-cyan-500/25 p-3.5 sm:p-4 mb-6 shadow-xl shadow-black/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-cyan-500/15">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
            Active Adaptive Cycle
          </span>
        </div>
        <span className="text-[11px] text-slate-300/80 font-medium">
          Step <strong className="text-cyan-400">{currentStep}</strong> of 6 &bull;{" "}
          <span className="text-white font-semibold">{steps[currentStep - 1].name}</span>
        </span>
      </div>

      {/* Stepper Steps Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {steps.map((s) => {
          const isPassed = s.number < currentStep;
          const isCurrent = s.number === currentStep;
          const isFuture = s.number > currentStep;

          return (
            <Link
              key={s.number}
              href={s.href}
              className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                isCurrent
                  ? "bg-gradient-to-b from-cyan-500/25 to-blue-600/25 border border-cyan-400 text-white shadow-md shadow-cyan-500/25 scale-[1.03]"
                  : isPassed
                  ? "bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 hover:border-emerald-500/60"
                  : "bg-[#091530]/60 border border-cyan-500/10 text-slate-400 hover:text-slate-200 hover:border-cyan-500/30"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isCurrent
                    ? "bg-cyan-500 text-white shadow-sm shadow-cyan-400"
                    : isPassed
                    ? "bg-emerald-500/80 text-white"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : s.number}
              </div>
              <span className="text-[10px] font-bold truncate max-w-full">{s.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
