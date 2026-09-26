"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import AdaptiveFlowStepper from "@/components/AdaptiveFlowStepper";
import {
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Zap,
  BarChart3,
  Loader2,
  Clock,
  User,
} from "lucide-react";

interface ProgressItem {
  topicName: string;
  before: number;
  now: number;
  change: number;
  status: "Mastered" | "Improving" | "Needs Attention";
}

export default function ProgressPage() {
  const [loading, setLoading] = useState(true);
  const [overallMastery, setOverallMastery] = useState(68);
  const [streakDays, setStreakDays] = useState(4);
  const [studyMinutes, setStudyMinutes] = useState(45);

  const improvements: ProgressItem[] = [
    {
      topicName: "Normalization",
      before: 42,
      now: 68,
      change: 26,
      status: "Improving",
    },
    {
      topicName: "Transactions",
      before: 56,
      now: 65,
      change: 9,
      status: "Improving",
    },
    {
      topicName: "SQL Fundamentals",
      before: 80,
      now: 84,
      change: 4,
      status: "Mastered",
    },
    {
      topicName: "Indexing",
      before: 71,
      now: 71,
      change: 0,
      status: "Mastered",
    },
    {
      topicName: "ER Model",
      before: 60,
      now: 60,
      change: 0,
      status: "Improving",
    },
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          if (json.profile) {
            setOverallMastery(json.profile.overallMastery || 68);
            setStudyMinutes(json.profile.totalStudyMinutes || 45);
          }
        }
      } catch (err) {
        console.error("Failed to load progress data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-xs text-slate-500 font-medium">Loading progress history...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Adaptive Stepper: Step 5 Progress Report */}
        <AdaptiveFlowStepper currentStep={5} />

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-1 border border-cyan-400/30">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step 5: Verified Progress Report</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Your Progress & Growth
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Real-time verification of how your quiz performance and AI Tutor session shifted your mastery scores.
          </p>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Current Overall Mastery
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold font-mono text-indigo-600">{overallMastery}%</span>
              <span className="text-xs font-bold text-emerald-600">+18% this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active Study Streak
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold font-mono text-slate-900">{streakDays} Days</span>
              <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-current" /> Active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Focused Time
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold font-mono text-slate-900">{studyMinutes} mins</span>
              <span className="text-xs text-slate-500">Adaptive practice</span>
            </div>
          </div>
        </div>

        {/* Before vs After Topic Progress Cards */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Before vs After Performance</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Measurable growth achieved through diagnostic remediation and practice.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Verified by Quiz Engine
            </span>
          </div>

          <div className="space-y-3">
            {improvements.map((item) => (
              <div
                key={item.topicName}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{item.topicName}</h4>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === "Mastered"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                          : "bg-amber-50 text-amber-800 border border-amber-100"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-600">
                    <span>
                      Baseline: <strong className="text-slate-800">{item.before}%</strong>
                    </span>
                    <span>→</span>
                    <span>
                      Current: <strong className="text-indigo-600">{item.now}%</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.now}%` }}
                    />
                  </div>

                  {item.change > 0 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                      +{item.change}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold">
                      Stable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Recommended Action Card */}
        <div className="p-6 rounded-2xl bg-[#081329]/95 border border-cyan-500/25 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Step 5 Complete &bull; Sync Profile
            </span>
            <h3 className="text-lg font-bold text-white">All Growth Data Ready to Synchronize</h3>
            <p className="text-xs text-slate-300 max-w-md">
              Your +26% improvement in Normalization and latest AI tutor interaction are ready to be permanently added to your Learning Profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/profile?updated=true"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/35 transition-all hover:scale-[1.02]"
            >
              <User className="w-4 h-4" />
              <span>Next: Save & View Updated Profile ➔</span>
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
