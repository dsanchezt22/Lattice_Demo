"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Layers,
  Mic,
  PenTool,
  Keyboard,
  ArrowRight,
  Shield,
  Zap,
  Link2,
  ChevronRight,
  Lock,
  BarChart3,
  CheckCircle2,
  Menu,
  X,
  FileText,
  Calendar,
  Repeat2,
  SlidersHorizontal,
  MessageSquare,
  GitBranch,
  Sparkles,
} from "lucide-react";

/* ── Logo Mark ──────────────────────────────────────────────── */

function LatticeLogoMark({ size = 28 }: { size?: number }) {
  // The logo is a 2-column grid:
  // Left col: top bar (black), middle bar (lavender), bottom bar (black)
  // Right col: top rounded square (black), bottom rounded square (black)
  const s = size;
  const gap = s * 0.07;
  const colW = s * 0.44;
  const rightColX = colW + gap * 2;
  const rightColW = s - rightColX;
  const rowH = (s - gap * 2) / 3;
  const r = s * 0.1;
  const rLg = s * 0.18;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left col — top bar */}
      <rect x={0} y={0} width={colW} height={rowH} rx={r} fill="#F5F5F5" />
      {/* Left col — middle bar (lavender accent) */}
      <rect x={0} y={rowH + gap} width={colW} height={rowH} rx={r} fill="#ddb8e8" />
      {/* Left col — bottom bar */}
      <rect x={0} y={(rowH + gap) * 2} width={colW} height={rowH} rx={r} fill="#F5F5F5" />
      {/* Right col — top block */}
      <rect x={rightColX} y={0} width={rightColW} height={rowH * 1.5 + gap * 0.5} rx={rLg} fill="#F5F5F5" />
      {/* Right col — bottom block */}
      <rect x={rightColX} y={rowH * 1.5 + gap * 1.5} width={rightColW} height={rowH * 1.5 + gap * 0.5} rx={rLg} fill="#F5F5F5" />
    </svg>
  );
}

/* ── Helpers ────────────────────────────────────────────────── */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light tracking-wide">
      {children}
    </span>
  );
}

/* ── Nav ────────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <LatticeLogoMark size={28} />
          Lattice
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted">
          <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
          <a href="#product" className="hover:text-foreground transition-colors">Product</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#team" className="hover:text-foreground transition-colors">Team</a>
          <a href="#security" className="hover:text-foreground transition-colors">Why Lattice</a>
        </div>
        <div className="hidden md:block">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-background hover:bg-accent-hover transition-colors"
          >
            Join Waitlist <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <button className="md:hidden text-muted" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 text-sm">
          <a href="#problem" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Problem</a>
          <a href="#product" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Product</a>
          <a href="#features" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Features</a>
          <a href="#team" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Team</a>
          <a href="#security" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">Security</a>
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 grid-bg overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.06] blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge>Preview mockup live demo now available</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Your workspace,{" "}
          <span className="gradient-text">built as you think.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Lattice is an infinite-canvas workspace that assembles itself from
          what you describe. Speak, type, or sketch your workflow — interconnected
          modules appear instantly, ready to use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-background hover:bg-accent-hover transition-colors"
          >
            Request Early Access <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-8 py-3.5 text-base font-medium text-accent-light hover:bg-accent/10 transition-colors"
          >
            Try the Live Demo <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Input modality icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-8 text-muted/50"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <Mic className="w-4 h-4" /> Voice
          </div>
          <div className="w-px h-4 bg-border/20" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <Keyboard className="w-4 h-4" /> Type
          </div>
          <div className="w-px h-4 bg-border/20" />
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <PenTool className="w-4 h-4" /> Draw
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Problem & Solution ─────────────────────────────────────── */

function ProblemSolution() {
  return (
    <Section id="problem" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>The Setup Cost Problem</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            The tool shouldn&apos;t take longer to build than the work itself.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem */}
          <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.04] p-8 md:p-10">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-red-300">What exists today</h3>
            <p className="text-muted leading-relaxed">
              Flexible tools like Notion are powerful but slow to configure.
              Focused apps are fast to start but hit walls the moment your
              workflow doesn&apos;t fit their structure. Either way, you end up{" "}
              <span className="text-foreground font-medium">
                managing your system instead of using it.
              </span>
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <span className="text-red-400/60 mt-0.5">&#x2717;</span>
                Hours spent building the scaffolding before any real work begins
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400/60 mt-0.5">&#x2717;</span>
                Separate apps for tasks, notes, budgets, and timelines that never talk to each other
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-400/60 mt-0.5">&#x2717;</span>
                Templates that fit someone else&apos;s workflow, not yours
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-8 md:p-10 gradient-border">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Sparkles className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-accent-light">How Lattice works</h3>
            <p className="text-muted leading-relaxed">
              Describe what you&apos;re trying to do — in plain language, by voice, or
              by sketching a rough layout. Lattice&apos;s AI maps your intent to a
              library of{" "}
              <span className="text-foreground font-medium">native, interconnected modules</span>{" "}
              and assembles a working workspace in seconds.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                Start working in seconds — no blank-page configuration
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                Modules share data — a budget updates when a schedule changes
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                Reshape any part at any time with a single instruction
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Product Demo ───────────────────────────────────────────── */

function ProductDemo() {
  return (
    <Section id="product" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Live Example</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            One prompt. A complete workspace.
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto text-lg">
            A user planning a trip says what they need — Lattice generates
            three linked modules, pre-populated and ready to edit.
          </p>
        </div>

        {/* Demo mockup */}
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/20 bg-surface overflow-hidden glow">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-surface">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background rounded-md px-4 py-1 text-xs text-muted">
                  lattice.app
                </div>
              </div>
            </div>

            {/* Canvas area */}
            <div className="relative p-8 md:p-12 min-h-[400px] grid-bg">
              {/* Voice prompt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-8 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Mic className="w-4 h-4 text-accent-light" />
                </div>
                <div className="bg-surface border border-border/20 rounded-xl rounded-tl-none px-4 py-3 text-sm text-muted max-w-md">
                  &ldquo;I&apos;m planning a trip to Japan next month. I need to
                  track my budget, create a day-by-day itinerary, and keep a
                  packing checklist.&rdquo;
                </div>
              </motion.div>

              {/* AI processing indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mb-6 flex items-center gap-2 text-xs text-accent-light/70 pl-11"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Generating workspace…
              </motion.div>

              {/* Generated modules */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="rounded-xl border border-border/20 bg-background p-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                    <BarChart3 className="w-4 h-4 text-accent-light" />
                    Budget Tracker
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted">
                      <span>Flights</span><span className="text-foreground">$840</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <div className="h-full w-3/5 rounded-full bg-accent" />
                    </div>
                    <div className="flex justify-between text-xs text-muted">
                      <span>Hotels</span><span className="text-foreground">$1,200</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <div className="h-full w-4/5 rounded-full bg-accent-light" />
                    </div>
                    <div className="flex justify-between text-xs text-muted">
                      <span>Activities</span><span className="text-foreground">$350</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface overflow-hidden">
                      <div className="h-full w-1/4 rounded-full bg-accent-dim" />
                    </div>
                    <div className="pt-2 mt-2 border-t border-border/20 flex justify-between text-xs">
                      <span className="text-muted">Total</span>
                      <span className="text-accent-light font-semibold">$2,390 / $3,000</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                  className="rounded-xl border border-border/20 bg-background p-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                    <Layers className="w-4 h-4 text-accent-light" />
                    Itinerary
                  </div>
                  <div className="space-y-2 text-xs text-muted">
                    <div className="rounded-lg bg-surface px-3 py-2 border border-border/20">
                      <span className="text-accent-light font-medium">Day 1</span> — Tokyo: Shibuya, Meiji Shrine
                    </div>
                    <div className="rounded-lg bg-surface px-3 py-2 border border-border/20">
                      <span className="text-accent-light font-medium">Day 2</span> — Tokyo: Akihabara, TeamLab
                    </div>
                    <div className="rounded-lg bg-surface px-3 py-2 border border-border/20">
                      <span className="text-accent-light font-medium">Day 3</span> — Kyoto: Fushimi Inari
                    </div>
                    <div className="rounded-lg bg-surface/50 px-3 py-2 border border-dashed border-border/20 text-muted/50">
                      + Add day…
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="rounded-xl border border-border/20 bg-background p-4"
                >
                  <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent-light" />
                    Packing List
                  </div>
                  <div className="space-y-2 text-xs text-muted">
                    {["Passport & visa docs", "Power adapter (Type A)", "Rain jacket", "Comfortable walking shoes", "Yen cash reserve"].map(
                      (item, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-3.5 h-3.5 rounded border ${i < 2 ? "bg-accent border-accent" : "border-muted/30"} flex items-center justify-center`}>
                            {i < 2 && (
                              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span className={i < 2 ? "line-through text-muted/40" : ""}>{item}</span>
                        </label>
                      )
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Connection lines indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-6 flex items-center justify-center gap-2 text-xs text-accent-light/60"
              >
                <Link2 className="w-3.5 h-3.5" />
                All three modules share data — spending updates the budget total in real-time
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Features Deep-Dive ─────────────────────────────────────── */

function Features() {
  return (
    <Section id="features" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Badge>Platform Capabilities</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            Every use case. One surface.
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto text-lg">
            Lattice handles the full range of personal and professional workflows
            through the same simple interaction model — describe it, and it exists.
          </p>
        </div>

        {/* Feature 1: Multi-modal Input */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24 max-w-5xl mx-auto">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Mic className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Three ways to express a single idea</h3>
            <p className="text-muted leading-relaxed mb-6">
              Voice, text, and freehand drawing all feed into the same understanding
              layer. Dictate a project brief during a commute, sketch a rough
              database schema on a tablet, or type a structured specification at your
              desk — the result is the same functional workspace.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <Mic className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                <span><span className="text-foreground font-medium">Voice:</span> "Set up a client project tracker for three active contracts with status, next step, and invoice columns."</span>
              </div>
              <div className="flex items-start gap-3">
                <Keyboard className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                <span><span className="text-foreground font-medium">Text:</span> Typed instructions with precise field names, data types, or formatting rules.</span>
              </div>
              <div className="flex items-start gap-3">
                <PenTool className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                <span><span className="text-foreground font-medium">Sketch:</span> Draw boxes and arrows to indicate layout — Lattice converts the rough structure into live modules.</span>
              </div>
            </div>
          </div>
          {/* Visual */}
          <div className="rounded-2xl border border-border/20 bg-surface p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-background border border-border/20 px-4 py-3">
                <Mic className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted">"Track my three client projects with weekly check-ins…"</span>
                <div className="ml-auto flex gap-1">
                  <div className="w-1 h-3 rounded-full bg-accent animate-pulse" />
                  <div className="w-1 h-5 rounded-full bg-accent/70 animate-pulse [animation-delay:100ms]" />
                  <div className="w-1 h-2 rounded-full bg-accent/50 animate-pulse [animation-delay:200ms]" />
                  <div className="w-1 h-4 rounded-full bg-accent/70 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
              <div className="text-xs text-accent-light/60 pl-2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Parsing intent…
              </div>
              <div className="rounded-xl bg-background border border-accent/20 p-4">
                <div className="text-xs font-medium text-accent-light mb-3">Generated: Client Project Tracker</div>
                <div className="space-y-2 text-xs text-muted">
                  <div className="grid grid-cols-4 gap-2 font-medium text-foreground/60 border-b border-border/20 pb-2">
                    <span>Client</span><span>Status</span><span>Next Step</span><span>Invoice</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span>Acme Co.</span><span className="text-accent-light">Active</span><span>Design review</span><span>$4,200</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span>Vertex Inc.</span><span className="text-accent">Review</span><span>Final approval</span><span>$7,800</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <span>Nova LLC</span><span className="text-accent-light">Starting</span><span>Kickoff call</span><span>—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Interconnected Modules */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24 max-w-5xl mx-auto md:flex-row-reverse">
          {/* Visual first on desktop */}
          <div className="order-2 md:order-1 rounded-2xl border border-border/20 bg-surface p-6">
            <div className="text-xs font-medium text-muted mb-4">Fitness & Nutrition Workspace</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-background border border-border/20 p-3">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-medium">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-accent-light" />
                  Today&apos;s Log
                </div>
                <div className="space-y-1.5 text-xs text-muted">
                  <div className="flex justify-between"><span>Breakfast</span><span>480 kcal</span></div>
                  <div className="flex justify-between"><span>Lunch</span><span>620 kcal</span></div>
                  <div className="flex justify-between"><span>Dinner</span><span>—</span></div>
                  <div className="pt-1.5 border-t border-border/20 flex justify-between text-accent-light font-medium">
                    <span>Total</span><span>1,100 / 2,200</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-background border border-border/20 p-3">
                <div className="flex items-center gap-1.5 mb-2 text-xs font-medium">
                  <Repeat2 className="w-3.5 h-3.5 text-accent-light" />
                  Weekly Workouts
                </div>
                <div className="space-y-1.5 text-xs text-muted">
                  {["Mon — Run 5k", "Tue — Upper body", "Wed — Rest"].map((d, i) => (
                    <div key={i} className={`flex items-center gap-1.5 ${i < 2 ? "" : "text-muted/40"}`}>
                      <div className={`w-2 h-2 rounded-full ${i < 2 ? "bg-accent" : "bg-border/40"}`} />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 rounded-xl bg-background border border-accent/15 p-3">
                <div className="flex items-center gap-1.5 mb-1 text-xs font-medium text-accent-light">
                  <Link2 className="w-3.5 h-3.5" />
                  Live Connection
                </div>
                <p className="text-xs text-muted">Calorie target auto-adjusts when a workout is logged. Meal suggestions update based on remaining macros.</p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <Link2 className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Modules that know about each other</h3>
            <p className="text-muted leading-relaxed mb-6">
              Individual modules aren&apos;t isolated widgets — they share an underlying
              data graph. A calorie counter pulls from your meal log. A project budget
              reflects your time tracker. An itinerary feeds your packing list.
            </p>
            <p className="text-muted leading-relaxed">
              When you add, edit, or remove something in one module, every connected
              module updates immediately. No copy-paste, no manual syncing.
            </p>
          </div>
        </div>

        {/* Feature 3: Infinite Canvas & Nesting */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24 max-w-5xl mx-auto">
          <div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <GitBranch className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Infinite depth, no page limits</h3>
            <p className="text-muted leading-relaxed mb-6">
              The canvas has no fixed boundaries. Zoom out to see your entire project
              landscape — multiple workspaces arranged spatially. Zoom into any module
              to reveal sub-pages, nested trackers, or embedded documents that live
              inside it.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                A &ldquo;Product Roadmap&rdquo; module contains individual feature pages, each with their own tasks and notes
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                A &ldquo;Finance&rdquo; workspace embeds monthly sub-trackers that roll up into an annual summary
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-light/60 mt-0.5 shrink-0" />
                Navigate with pinch-to-zoom, keyboard shortcuts, or voice: &ldquo;Open Q3 planning&rdquo;
              </div>
            </div>
          </div>
          {/* Visual */}
          <div className="rounded-2xl border border-border/20 bg-surface p-6 overflow-hidden">
            <div className="text-xs text-muted mb-3 flex items-center gap-2">
              <span className="text-accent-light font-medium">Canvas</span>
              <ChevronRight className="w-3 h-3" />
              <span>Q3 Planning</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">Feature: Auth</span>
            </div>
            <div className="rounded-xl bg-background border border-border/20 p-4 mb-3">
              <div className="text-xs font-medium mb-3 text-accent-light">Q3 Roadmap (top-level)</div>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted">
                {["Auth Redesign", "Dashboard v2", "API v3"].map((f, i) => (
                  <div key={i} className={`rounded-lg px-3 py-2 border ${i === 0 ? "border-accent/40 bg-accent/5 text-accent-light" : "border-border/20 bg-surface"}`}>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-background border border-accent/20 p-4">
              <div className="text-xs font-medium mb-3 text-accent-light">↳ Auth Redesign (nested)</div>
              <div className="space-y-2 text-xs text-muted">
                {[
                  { label: "Spec doc", icon: <FileText className="w-3 h-3" /> },
                  { label: "Task list (12 items)", icon: <CheckCircle2 className="w-3 h-3" /> },
                  { label: "Timeline", icon: <Calendar className="w-3 h-3" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent-light/50">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Real-time AI Refinement */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Visual */}
          <div className="order-2 md:order-1 rounded-2xl border border-border/20 bg-surface p-6">
            <div className="space-y-3">
              <div className="text-xs text-muted mb-2">Conversation thread — active workspace</div>
              {[
                { role: "user", text: "Add a priority column to the task list and sort by it." },
                { role: "ai", text: "Done — Priority column added. Tasks re-sorted: 3 high, 5 medium, 4 low. Want me to color-code the rows?" },
                { role: "user", text: "Yes, and also link the high-priority tasks to the sprint goal at the top." },
                { role: "ai", text: "Linked. The sprint goal now shows a live count of completed high-priority items." },
              ].map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-xl px-3 py-2 text-xs max-w-xs ${msg.role === "user" ? "bg-accent text-background rounded-tr-none" : "bg-background border border-border/20 text-muted rounded-tl-none"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <MessageSquare className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Refine anything through conversation</h3>
            <p className="text-muted leading-relaxed mb-6">
              Every workspace stays editable through the same natural language interface
              that created it. Ask to add a column, reorder a view, link two modules,
              or recalculate a formula — the AI makes the change directly in the live
              workspace, no settings menu required.
            </p>
            <p className="text-muted leading-relaxed">
              Structural changes to one area cascade intelligently — linked modules
              adjust automatically, and the AI tells you what it changed and why.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── How the Engine Works ───────────────────────────────────── */

function HowItWorks() {
  const items = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Intent becomes structure",
      desc: "Describe what you need by text, voice, drawing, or files, and Lattice translates it into a usable system instead of leaving you with a blank page.",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Composable native modules",
      desc: "Every interface is built from a robust library of reusable components, giving you flexibility without the latency, inconsistency, or fragility of raw generation.",
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      title: "One connected workspace",
      desc: "Trackers, notes, plans, logs, and dashboards can all work from the same underlying information, making your workspace adaptive instead of siloed.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Cloud reasoning, local handling",
      desc: "Complex creation uses stronger model reasoning, while lightweight recurring tasks can be processed on-device for better responsiveness and privacy.",
    },
  ];

  return (
    <Section className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Under the Hood</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            Simple on the surface. Powerful in structure.
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto text-lg">
            Lattice makes complex organization feel effortless by turning natural input into modular, intelligent systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-border/20 bg-surface hover:bg-surface-light transition-colors p-8"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4 text-accent-light group-hover:bg-accent/20 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── Team ───────────────────────────────────────────────────── */

function Team() {
  return (
    <Section id="team" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Team</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight">
            Built by,
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-border/20 bg-surface p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 logo-glow">
                <span className="text-2xl font-bold gradient-text">DS</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Diego Sanchez Tirado</h3>
                <p className="text-accent-light text-sm font-medium mt-1">Founder</p>
                <div className="mt-4 space-y-3 text-sm text-muted leading-relaxed">
                  <p>
                    Electrical Engineering at{" "}
                    <span className="text-foreground font-medium">Stanford University</span>.
                    Deep background in both hardware and software architecture,
                    with research experience in chip design at Stanford and
                    engineering experience at{" "}
                    <span className="text-foreground font-medium">Amazon</span>.
                  </p>
                  <p>
                    Previously founded{" "}
                    <span className="text-foreground font-medium">YC-backed Code Four</span>
                    {" "}(an AI platform for law enforcement). Research background in the{" "}
                    <span className="text-foreground font-medium">RSG Lab at Stanford</span>
                    {" "}and the{" "}
                    <span className="text-foreground font-medium">ECE Department at Duke</span>.
                    Uniquely positioned to execute Lattice&apos;s computationally
                    complex, low-latency infrastructure and navigate the startup
                    growth lifecycle.
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Stanford RSG Lab", "Duke ECE", "Amazon", "Y Combinator", "AI/ML"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-background border border-border/20 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Security ───────────────────────────────────────────────── */

function Security() {
  return (
    <Section id="security" className="py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge>Why Lattice is different</Badge>
          <h2 className="mt-6 text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
            Built around your work, not around a template.
          </h2>
          <p className="mt-6 text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            Most tools give you a fixed structure and ask you to fit your work into it. Lattice reverses that — it starts from what you describe and assembles the right system for the task, so the workspace matches the work from day one instead of the other way around.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/20 bg-surface p-8">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Built from intent</h3>
            <p className="text-sm text-muted leading-relaxed">
              Describe what you need through text, voice, sketches, or files. Lattice interprets the goal and assembles a working structure instead of forcing you to build one from scratch.
            </p>
          </div>
          <div className="rounded-2xl border border-border/20 bg-surface p-8">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-accent-light" />
            </div>
            <h3 className="text-lg font-semibold mb-3">Designed to evolve</h3>
            <p className="text-sm text-muted leading-relaxed">
              As the task changes, the system changes with it. Users can reshape workflows, add modules, and refine structure without rebuilding the entire workspace.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Waitlist CTA ───────────────────────────────────────────── */

function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="waitlist" className="py-28 md:py-36">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Stop configuring.{" "}
          <span className="gradient-text">Start working.</span>
        </h2>
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
          Join the waitlist for early access. Be among the first to use a
          workspace that takes shape around your work — not around a template
          someone else designed.
        </p>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full sm:flex-1 rounded-full border border-border/20 bg-surface px-5 py-3 text-sm text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background hover:bg-accent-hover transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 rounded-2xl border border-accent/20 bg-accent/[0.05] p-6 max-w-md mx-auto"
          >
            <CheckCircle2 className="w-8 h-8 text-accent-light mx-auto mb-3" />
            <p className="font-medium">You&apos;re on the list.</p>
            <p className="text-sm text-muted mt-1">
              We&apos;ll reach out when early access opens.
            </p>
          </motion.div>
        )}
      </div>
    </Section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-border/20 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div className="flex items-center gap-2">
          <LatticeLogoMark size={20} />
          <span className="font-medium text-foreground">Lattice</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Lattice. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <ProblemSolution />
      <ProductDemo />
      <Features />
      <HowItWorks />
      <Team />
      <Security />
      <WaitlistCTA />
      <Footer />
    </main>
  );
}
