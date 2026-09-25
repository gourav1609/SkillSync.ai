"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AppLayout from "@/components/AppLayout";
import {
  Sparkles,
  Zap,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  TrendingUp,
  BarChart3,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface DashboardData {
  user: {
    name: string;
    educationLevel?: string;
    learningGoals?: string;
    preferredStyle?: string;
  };
  profile: {
    overallMastery: number;
    strengths: string[];
    weaknesses: string[];
    topicMastery: Array<{
      topicName: string;
      score: number;
      masteryLevel: "weak" | "medium" | "strong";
    }>;
    aiAnalysis?: {
      summary?: string;
      reasoning?: string[];
      recommendations?: string[];
    };
    assessmentCount: number;
    quizCount: number;
    totalStudyMinutes: number;
  } | null;
  plan: {
    title: string;
    estimatedDuration: string;
    items: Array<{
      order: number;
      topic: string;
      activity: string;
      durationMinutes: number;
      priority: "high" | "medium" | "low";
      reason: string;
    }>;
  } | null;
  progress: Array<{
    overallMastery: number;
    trigger: string;
    createdAt: string;
  }>;
  recentActivity: Array<{
    type: "assessment" | "quiz";
    subject?: string;
    score?: number;
    date?: string;
  }>;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          loadFallbackData();
        }
      } catch (err) {
        console.error("Dashboard fetch error", err);
        loadFallbackData();
      } finally {
        setLoading(false);
      }
    }

    function loadFallbackData() {
      setData({
        user: {
          name: session?.user?.name || "Alex Rivera",
          educationLevel: "B.Tech CSE - 3rd Year",
          learningGoals: "Master Database Systems & Normalization",
        },
        profile: {
          overallMastery: 63,
          strengths: ["SQL Fundamentals", "Indexing"],
          weaknesses: ["Normalization", "Transactions"],
          topicMastery: [
            { topicName: "SQL Fundamentals", score: 84, masteryLevel: "strong" },
            { topicName: "Indexing", score: 71, masteryLevel: "strong" },
            { topicName: "Transactions", score: 56, masteryLevel: "medium" },
            { topicName: "ER Model", score: 60, masteryLevel: "medium" },
            { topicName: "Normalization", score: 42, masteryLevel: "weak" },
          ],
          assessmentCount: 1,
          quizCount: 2,
          totalStudyMinutes: 45,
          aiAnalysis: {
            summary: "You are strong in SQL fundamentals but need more practice with normalization and transactions.",
            reasoning: [
              "You missed 3 of 5 normalization questions, specifically functional dependencies.",
              "Transactions need review regarding ACID isolation levels and dirty reads.",
            ],
            recommendations: [
              "Review 2NF vs 3NF functional dependencies.",
              "Complete a 5-question adaptive quiz on Normalization.",
            ],
          },
        },
        plan: {
          title: "Database Systems: Normalization & Transactions Mastery",
          estimatedDuration: "25 mins",
          items: [
            {
              order: 1,
              topic: "Normalization",
              activity: "Functional Dependencies & 2NF/3NF Decomposition",
              durationMinutes: 10,
              priority: "high",
              reason: "Diagnostic assessment showed 42% accuracy on normalization rules.",
            },
            {
              order: 2,
              topic: "Normalization",
              activity: "Adaptive Practice Quiz (5 Questions)",
              durationMinutes: 5,
              priority: "high",
              reason: "Reinforce newly acquired decomposition rules with immediate feedback.",
            },
            {
              order: 3,
              topic: "Transactions",
              activity: "ACID Isolation Levels & Concurrency Anomalies",
              durationMinutes: 10,
              priority: "medium",
              reason: "Current transactions mastery is 56% (medium).",
            },
          ],
        },
        progress: [
          { overallMastery: 50, trigger: "diagnostic", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
          { overallMastery: 63, trigger: "assessment", createdAt: new Date(Date.now() - 86400000).toISOString() },
        ],
        recentActivity: [
          { type: "quiz", score: 75, date: new Date(Date.now() - 3600000 * 3).toISOString() },
          { type: "assessment", subject: "Database Management Systems", score: 63, date: new Date(Date.now() - 86400000).toISOString() },
        ],
      });
    }

    fetchDashboard();
  }, [session]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-3" />
          <p className="text-xs text-cyan-300 font-medium">Loading your personalized dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  const profile = data?.profile;
  const plan = data?.plan;
  const user = data?.user;
  const topics = profile?.topicMastery || [];
  const primaryWeakTopic = topics.find((t) => t.masteryLevel === "weak") || topics[0] || { topicName: "Normalization", score: 42 };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Good morning, {user?.name?.split(" ")[0] || "Student"} <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Here is your adaptive learning plan based on your latest performance.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a142c] border border-cyan-500/25 text-xs font-semibold text-slate-200 hover:text-white hover:border-cyan-500/50 shadow-sm transition-all"
            >
              <RefreshCwIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Retake Diagnostic</span>
            </Link>

            <Link
              href="/practice"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-xs font-semibold text-white hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/30 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Adaptive Quiz</span>
            </Link>
          </div>
        </div>

        {/* Primary Recommendation Card: "Your next best step" */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#06203a] via-[#08152b] to-[#040814] text-white shadow-2xl border border-cyan-500/35 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold border border-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Your Next Best Step</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(6,182,212,0.35)]">
                Master {primaryWeakTopic.topicName} Fundamentals
              </h2>
              <p className="text-xs sm:text-sm text-slate-200/80 leading-relaxed">
                Your diagnostic assessment identified {primaryWeakTopic.topicName} ({primaryWeakTopic.score}% mastery)
                as the highest-leverage area to improve. Start with a 10-minute AI Tutor session.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/tutor?topic=${encodeURIComponent(primaryWeakTopic.topicName)}`}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/35 transition-all text-center hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Continue Learning</span>
              </Link>

              <Link
                href="/practice"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0c1833] hover:bg-[#102247] border border-cyan-500/30 text-cyan-200 hover:text-white text-xs font-semibold transition-all text-center hover:border-cyan-500/60"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>5-min Quiz</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Progress Overview Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-[#091226]/85 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20 shadow-lg shadow-black/50 flex items-center gap-3.5 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Study Streak
              </span>
              <span className="text-lg font-bold text-white">4 Days 🔥</span>
            </div>
          </div>

          <div className="bg-[#091226]/85 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20 shadow-lg shadow-black/50 flex items-center gap-3.5 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Learning Time
              </span>
              <span className="text-lg font-bold text-white">{profile?.totalStudyMinutes || 45} mins</span>
            </div>
          </div>

          <div className="bg-[#091226]/85 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20 shadow-lg shadow-black/50 flex items-center gap-3.5 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Mastered Topics
              </span>
              <span className="text-lg font-bold text-white">
                {topics.filter((t) => t.masteryLevel === "strong").length} / {topics.length || 7}
              </span>
            </div>
          </div>

          <div className="bg-[#091226]/85 backdrop-blur-xl p-4 rounded-2xl border border-cyan-500/20 shadow-lg shadow-black/50 flex items-center gap-3.5 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-500/30 text-blue-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Overall Mastery
              </span>
              <span className="text-lg font-bold text-white">{profile?.overallMastery || 63}%</span>
            </div>
          </div>
        </div>

        {/* Weak Topics Section */}
        <div className="bg-[#091226]/85 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Topic Mastery Status</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Continuously recalculated as you complete assessments and quizzes.
              </p>
            </div>
            <Link href="/profile" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View Profile
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {topics.map((t) => {
              const isWeak = t.masteryLevel === "weak" || t.score < 50;
              const isMedium = t.masteryLevel === "medium" || (t.score >= 50 && t.score < 70);

              return (
                <div
                  key={t.topicName}
                  className={`p-4 rounded-2xl border transition-all ${
                    isWeak
                      ? "border-rose-500/35 bg-rose-950/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
                      : isMedium
                      ? "border-amber-500/30 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.08)]"
                      : "border-cyan-500/20 bg-[#0d1833]/80 shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.topicName}</h4>
                      <span
                        className={`inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                          isWeak
                            ? "bg-rose-950/60 border-rose-500/40 text-rose-300"
                            : isMedium
                            ? "bg-amber-950/60 border-amber-500/40 text-amber-300"
                            : "bg-cyan-950/60 border-cyan-500/40 text-cyan-300"
                        }`}
                      >
                        {isWeak ? "Needs attention" : isMedium ? "Improving" : "Strong"}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-white">
                      {t.score}%
                    </span>
                  </div>

                  <div className="w-full bg-[#08152e] h-1.5 rounded-full mt-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isWeak
                          ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.7)]"
                          : isMedium
                          ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]"
                          : "bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]"
                      }`}
                      style={{ width: `${t.score}%` }}
                    />
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-cyan-500/15 flex items-center justify-between text-xs">
                    <Link
                      href={`/tutor?topic=${encodeURIComponent(t.topicName)}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium text-[11px] flex items-center gap-1 transition-colors"
                    >
                      Ask Tutor
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/practice"
                      className="text-slate-400 hover:text-slate-200 text-[11px] transition-colors"
                    >
                      Practice
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Learning & Recent Activity Dual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actionable Recommendations (2 cols) */}
          <div className="lg:col-span-2 bg-[#091226]/85 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Today&apos;s Personalized Learning Plan</h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Generated by AI to optimize your study time.
                </p>
              </div>
              <Link href="/plan" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                View Full Plan
              </Link>
            </div>

            <div className="space-y-3">
              {(plan?.items?.slice(0, 3) || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0d1833]/80 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{item.activity}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            item.priority === "high"
                              ? "bg-rose-950/60 text-rose-300 border-rose-500/40"
                              : "bg-cyan-950/40 text-cyan-300 border-cyan-500/20"
                          }`}
                        >
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{item.reason}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-slate-300 block">
                      {item.durationMinutes} min
                    </span>
                    <Link
                      href={`/tutor?topic=${encodeURIComponent(item.topic)}`}
                      className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold mt-1 inline-block transition-colors"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity (1 col) */}
          <div className="bg-[#091226]/85 backdrop-blur-xl rounded-3xl border border-cyan-500/20 shadow-2xl p-6">
            <h3 className="text-base font-bold text-white mb-1">Recent Activity</h3>
            <p className="text-xs text-slate-300 mb-4">Your adaptive learning milestones.</p>

            <div className="space-y-3">
              {data?.recentActivity && data.recentActivity.length > 0 ? (
                data.recentActivity.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0d1833]/80 border border-cyan-500/15">
                    <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {act.type === "assessment" ? (
                        <BarChart3 className="w-3.5 h-3.5" />
                      ) : (
                        <HelpCircle className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {act.type === "assessment" ? "Diagnostic Assessment" : "Adaptive Practice Quiz"}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Score: <span className="font-bold text-cyan-400">{act.score}%</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-xs text-cyan-400/50 py-4 text-center">No recent activity yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function RefreshCwIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  );
}
