"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mic,
  Keyboard,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Table2,
  Calendar,
  Loader2,
  X,
  ChevronLeft,
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";

/* ── Logo Mark ──────────────────────────────────────────────── */

function LatticeLogoMark({ size = 28 }: { size?: number }) {
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
      <rect x={0} y={0} width={colW} height={rowH} rx={r} fill="#F5F5F5" />
      <rect x={0} y={rowH + gap} width={colW} height={rowH} rx={r} fill="#ddb8e8" />
      <rect x={0} y={(rowH + gap) * 2} width={colW} height={rowH} rx={r} fill="#F5F5F5" />
      <rect x={rightColX} y={0} width={rightColW} height={rowH * 1.5 + gap * 0.5} rx={rLg} fill="#F5F5F5" />
      <rect x={rightColX} y={rowH * 1.5 + gap * 1.5} width={rightColW} height={rowH * 1.5 + gap * 0.5} rx={rLg} fill="#F5F5F5" />
    </svg>
  );
}

/* ── Types ──────────────────────────────────────────────────── */

type TableModule    = { id: string; type: "table";     title: string; data: { columns: string[]; rows: string[][] } };
type ChecklistModule = { id: string; type: "checklist"; title: string; data: { items: { label: string; checked: boolean }[] } };
type BudgetModule   = { id: string; type: "budget";    title: string; data: { items: { label: string; amount: number; max: number }[]; currency: string } };
type NotesModule    = { id: string; type: "notes";     title: string; data: { content: string } };
type CalendarModule = { id: string; type: "calendar";  title: string; data: { events: { day: string; title: string }[] } };
type WorkspaceModule = TableModule | ChecklistModule | BudgetModule | NotesModule | CalendarModule;

/* ── Inline editable text ───────────────────────────────────── */

function EditableText({
  value,
  onChange,
  className = "",
  placeholder = "Edit…",
  multiline = false,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => { if (editing) ref.current?.focus(); }, [editing]);

  function commit() { setEditing(false); onChange(draft.trim() || value); }

  if (!editing) {
    return (
      <span
        className={`cursor-text hover:bg-white/5 rounded px-0.5 -mx-0.5 transition-colors group inline-flex items-center gap-1 ${className}`}
        onClick={() => { setDraft(value); setEditing(true); }}
      >
        {value}
        <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-40 transition-opacity shrink-0" />
      </span>
    );
  }

  const sharedClass = "bg-white/10 rounded px-1 focus:outline-none focus:ring-1 focus:ring-accent/50 text-foreground " + className;

  return multiline ? (
    <textarea
      ref={ref as React.RefObject<HTMLTextAreaElement>}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => { if (e.key === "Escape") commit(); }}
      placeholder={placeholder}
      rows={3}
      className={sharedClass + " w-full resize-none"}
    />
  ) : (
    <input
      ref={ref as React.RefObject<HTMLInputElement>}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") commit(); }}
      placeholder={placeholder}
      className={sharedClass}
    />
  );
}

/* ── Checklist renderer ─────────────────────────────────────── */

function ChecklistRenderer({
  data,
  onChange,
}: {
  data: ChecklistModule["data"];
  onChange: (d: ChecklistModule["data"]) => void;
}) {
  function toggle(i: number) {
    const items = data.items.map((item, ii) => ii === i ? { ...item, checked: !item.checked } : item);
    onChange({ items });
  }
  function rename(i: number, label: string) {
    const items = data.items.map((item, ii) => ii === i ? { ...item, label } : item);
    onChange({ items });
  }
  function remove(i: number) {
    onChange({ items: data.items.filter((_, ii) => ii !== i) });
  }
  function add() {
    onChange({ items: [...data.items, { label: "New item", checked: false }] });
  }

  return (
    <div className="space-y-1.5">
      {data.items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 group">
          <div
            onClick={() => toggle(i)}
            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
              item.checked ? "bg-accent border-accent" : "border-muted/40 hover:border-accent/50"
            }`}
          >
            {item.checked && (
              <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <EditableText
            value={item.label}
            onChange={(v) => rename(i, v)}
            className={`text-xs flex-1 ${item.checked ? "line-through text-muted/40" : "text-foreground/80"}`}
          />
          <button onClick={() => remove(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted/40 hover:text-red-400">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="mt-1 flex items-center gap-1.5 text-xs text-muted/40 hover:text-accent-light transition-colors"
      >
        <Plus className="w-3 h-3" /> Add item
      </button>
    </div>
  );
}

/* ── Table renderer ─────────────────────────────────────────── */

function TableRenderer({
  data,
  onChange,
}: {
  data: TableModule["data"];
  onChange: (d: TableModule["data"]) => void;
}) {
  function updateCell(row: number, col: number, val: string) {
    const rows = data.rows.map((r, ri) => r.map((c, ci) => ri === row && ci === col ? val : c));
    onChange({ ...data, rows });
  }
  function updateCol(col: number, val: string) {
    const columns = data.columns.map((c, ci) => ci === col ? val : c);
    onChange({ ...data, columns });
  }
  function addRow() {
    onChange({ ...data, rows: [...data.rows, data.columns.map(() => "—")] });
  }
  function removeRow(i: number) {
    onChange({ ...data, rows: data.rows.filter((_, ri) => ri !== i) });
  }

  return (
    <div className="overflow-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border/20">
            {data.columns.map((col, i) => (
              <th key={i} className="text-left py-2 pr-4 text-muted font-medium whitespace-nowrap">
                <EditableText value={col} onChange={(v) => updateCol(i, v)} className="font-medium text-muted" />
              </th>
            ))}
            <th className="w-6" />
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri} className="border-b border-border/10 last:border-0 group">
              {row.map((cell, ci) => (
                <td key={ci} className="py-2 pr-4 text-foreground/80 whitespace-nowrap">
                  <EditableText value={cell} onChange={(v) => updateCell(ri, ci, v)} className="text-foreground/80" />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(ri)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted/40 hover:text-red-400">
                  <X className="w-3 h-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-2 flex items-center gap-1.5 text-xs text-muted/40 hover:text-accent-light transition-colors"
      >
        <Plus className="w-3 h-3" /> Add row
      </button>
    </div>
  );
}

/* ── Budget renderer ────────────────────────────────────────── */

function BudgetRenderer({
  data,
  onChange,
}: {
  data: BudgetModule["data"];
  onChange: (d: BudgetModule["data"]) => void;
}) {
  const total = data.items.reduce((s, i) => s + i.amount, 0);
  const maxTotal = data.items.reduce((s, i) => s + i.max, 0);

  function updateItem(i: number, field: "label" | "amount" | "max", val: string) {
    const items = data.items.map((item, ii) => {
      if (ii !== i) return item;
      if (field === "label") return { ...item, label: val };
      const num = parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
      return { ...item, [field]: num };
    });
    onChange({ ...data, items });
  }
  function removeItem(i: number) {
    onChange({ ...data, items: data.items.filter((_, ii) => ii !== i) });
  }
  function addItem() {
    onChange({ ...data, items: [...data.items, { label: "New category", amount: 0, max: 100 }] });
  }

  return (
    <div className="space-y-3">
      {data.items.map((item, i) => (
        <div key={i} className="group">
          <div className="flex justify-between text-xs mb-1 items-center">
            <EditableText value={item.label} onChange={(v) => updateItem(i, "label", v)} className="text-muted" />
            <div className="flex items-center gap-1 text-foreground font-medium">
              {data.currency}
              <EditableText value={String(item.amount)} onChange={(v) => updateItem(i, "amount", v)} className="w-12 text-right" />
              <span className="text-muted font-normal">/ {data.currency}</span>
              <EditableText value={String(item.max)} onChange={(v) => updateItem(i, "max", v)} className="w-12" />
              <button onClick={() => removeItem(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted/40 hover:text-red-400 ml-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-background overflow-hidden">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${Math.min((item.amount / (item.max || 1)) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-2 mt-1 border-t border-border/20 flex justify-between text-xs">
        <span className="text-muted">Total</span>
        <span className="text-accent-light font-semibold">{data.currency}{total.toLocaleString()} / {data.currency}{maxTotal.toLocaleString()}</span>
      </div>
      <button onClick={addItem} className="flex items-center gap-1.5 text-xs text-muted/40 hover:text-accent-light transition-colors">
        <Plus className="w-3 h-3" /> Add category
      </button>
    </div>
  );
}

/* ── Notes renderer ─────────────────────────────────────────── */

function NotesRenderer({
  data,
  onChange,
}: {
  data: NotesModule["data"];
  onChange: (d: NotesModule["data"]) => void;
}) {
  return (
    <EditableText
      value={data.content}
      onChange={(v) => onChange({ content: v })}
      className="text-xs text-foreground/70 leading-relaxed w-full block"
      multiline
    />
  );
}

/* ── Calendar renderer ──────────────────────────────────────── */

function CalendarRenderer({
  data,
  onChange,
}: {
  data: CalendarModule["data"];
  onChange: (d: CalendarModule["data"]) => void;
}) {
  function updateEvent(i: number, field: "day" | "title", val: string) {
    const events = data.events.map((ev, ei) => ei === i ? { ...ev, [field]: val } : ev);
    onChange({ events });
  }
  function removeEvent(i: number) {
    onChange({ events: data.events.filter((_, ei) => ei !== i) });
  }
  function addEvent() {
    onChange({ events: [...data.events, { day: "TBD", title: "New event" }] });
  }

  return (
    <div className="space-y-2">
      {data.events.map((event, i) => (
        <div key={i} className="flex items-start gap-3 rounded-lg bg-background px-3 py-2 group">
          <EditableText
            value={event.day}
            onChange={(v) => updateEvent(i, "day", v)}
            className="text-accent-light font-semibold text-xs shrink-0"
          />
          <EditableText
            value={event.title}
            onChange={(v) => updateEvent(i, "title", v)}
            className="text-xs text-foreground/80 flex-1"
          />
          <button onClick={() => removeEvent(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted/40 hover:text-red-400 shrink-0">
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      <button onClick={addEvent} className="flex items-center gap-1.5 text-xs text-muted/40 hover:text-accent-light transition-colors pl-1">
        <Plus className="w-3 h-3" /> Add event
      </button>
    </div>
  );
}

/* ── Module icon ────────────────────────────────────────────── */

function ModuleIcon({ type }: { type: WorkspaceModule["type"] }) {
  const cls = "w-4 h-4 text-accent-light";
  switch (type) {
    case "table":     return <Table2 className={cls} />;
    case "checklist": return <CheckCircle2 className={cls} />;
    case "budget":    return <BarChart3 className={cls} />;
    case "notes":     return <FileText className={cls} />;
    case "calendar":  return <Calendar className={cls} />;
  }
}

/* ── Module Card ────────────────────────────────────────────── */

function ModuleCard({
  mod,
  index,
  onUpdate,
  onDelete,
}: {
  mod: WorkspaceModule;
  index: number;
  onUpdate: (id: string, updated: WorkspaceModule) => void;
  onDelete: (id: string) => void;
}) {
  function updateTitle(title: string) { onUpdate(mod.id, { ...mod, title }); }

  function updateData(data: WorkspaceModule["data"]) {
    // @ts-expect-error data type matches mod type by construction
    onUpdate(mod.id, { ...mod, data });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
      className="rounded-2xl border border-border/20 bg-surface p-5 flex flex-col gap-4 group/card"
    >
      <div className="flex items-center gap-2">
        <ModuleIcon type={mod.type} />
        <EditableText
          value={mod.title}
          onChange={updateTitle}
          className="text-sm font-semibold flex-1"
        />
        <button
          onClick={() => onDelete(mod.id)}
          className="opacity-0 group-hover/card:opacity-100 transition-opacity text-muted/30 hover:text-red-400 ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {mod.type === "checklist" && (
        <ChecklistRenderer data={mod.data} onChange={(d) => updateData(d)} />
      )}
      {mod.type === "table" && (
        <TableRenderer data={mod.data} onChange={(d) => updateData(d)} />
      )}
      {mod.type === "budget" && (
        <BudgetRenderer data={mod.data} onChange={(d) => updateData(d)} />
      )}
      {mod.type === "notes" && (
        <NotesRenderer data={mod.data} onChange={(d) => updateData(d)} />
      )}
      {mod.type === "calendar" && (
        <CalendarRenderer data={mod.data} onChange={(d) => updateData(d)} />
      )}
    </motion.div>
  );
}

/* ── Example prompts ────────────────────────────────────────── */

const EXAMPLES = [
  "I'm launching a product next month — track tasks, budget, and launch checklist",
  "Plan a week-long hiking trip with gear list and daily schedule",
  "Manage three freelance clients with status, deliverables, and invoices",
  "Track my monthly personal budget across categories",
];

/* ── Main Demo Page ─────────────────────────────────────────── */

export default function DemoPage() {
  const [prompt, setPrompt] = useState("");
  const [modules, setModules] = useState<WorkspaceModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingMore, setAddingMore] = useState(false);
  const [error, setError] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  function attachIds(rawModules: Omit<WorkspaceModule, "id">[]): WorkspaceModule[] {
    return rawModules.map((m) => ({ ...m, id: Math.random().toString(36).slice(2) } as WorkspaceModule));
  }

  async function generate(text: string) {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setModules([]);
    setHasGenerated(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setModules(attachIds(json.modules || []));
      setHasGenerated(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function addMoreModules() {
    setAddingMore(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `${prompt} — I already have modules for: ${modules.map(m => m.title).join(", ")}. Add 1-2 additional complementary modules that don't overlap.`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setModules((prev) => [...prev, ...attachIds(json.modules?.slice(0, 2) || [])]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setAddingMore(false);
    }
  }

  function updateModule(id: string, updated: WorkspaceModule) {
    setModules((prev) => prev.map((m) => m.id === id ? updated : m));
  }

  function deleteModule(id: string) {
    setModules((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/20 h-14 flex items-center px-6 gap-4">
        <a href="/" className="flex items-center gap-1.5 text-muted hover:text-foreground transition-colors text-sm">
          <ChevronLeft className="w-4 h-4" /> Back
        </a>
        <div className="w-px h-4 bg-border/20" />
        <div className="flex items-center gap-2 text-sm font-semibold">
          <LatticeLogoMark size={20} />
          Lattice <span className="text-muted font-normal ml-1">— Live Demo</span>
        </div>
      </div>

      <div className="pt-14">
        {/* Prompt area */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Describe your workspace.
            </h1>
            <p className="text-muted text-lg">
              Type what you need to organize — Lattice builds it instantly.
            </p>
          </div>

          <div className="relative rounded-2xl border border-border/20 bg-surface overflow-hidden focus-within:border-accent/50 transition-colors">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) generate(prompt); }}
              placeholder="e.g. I'm launching a product next month — I need to track tasks, budget, and a launch checklist"
              rows={3}
              className="w-full bg-transparent px-5 pt-5 pb-4 text-sm text-foreground placeholder:text-muted/40 focus:outline-none resize-none"
            />
            <div className="flex items-center justify-between px-5 pb-4">
              <div className="flex items-center gap-4 text-xs text-muted/50">
                <span className="flex items-center gap-1.5"><Keyboard className="w-3.5 h-3.5" /> ⌘↵ to generate</span>
                <span className="flex items-center gap-1.5"><Mic className="w-3.5 h-3.5" /> Voice coming soon</span>
              </div>
              <button
                onClick={() => generate(prompt)}
                disabled={loading || !prompt.trim()}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>

          {!hasGenerated && !loading && (
            <div className="mt-6">
              <p className="text-xs text-muted/50 mb-3 text-center uppercase tracking-widest">Try an example</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => { setPrompt(ex); generate(ex); }}
                    className="rounded-full border border-border/20 bg-surface px-4 py-1.5 text-xs text-muted hover:text-foreground hover:border-accent/40 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 flex items-center gap-3 text-sm text-red-400"
              >
                <X className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="max-w-5xl mx-auto px-6 pb-24">
            <div className="flex items-center justify-center gap-2 text-sm text-accent-light/70 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Building your workspace…
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border/20 bg-surface p-5 animate-pulse">
                  <div className="h-4 w-1/3 bg-border/20 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-border/10 rounded" />
                    <div className="h-3 w-4/5 bg-border/10 rounded" />
                    <div className="h-3 w-3/5 bg-border/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Generated modules */}
        <AnimatePresence>
          {hasGenerated && modules.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-5xl mx-auto px-6 pb-24"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted">
                  <span className="text-accent-light font-medium">{modules.length} module{modules.length !== 1 ? "s" : ""}</span> — click any text to edit
                </p>
                <button
                  onClick={() => { setModules([]); setHasGenerated(false); setPrompt(""); }}
                  className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Start over
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence>
                  {modules.map((mod, i) => (
                    <ModuleCard
                      key={mod.id}
                      mod={mod}
                      index={i}
                      onUpdate={updateModule}
                      onDelete={deleteModule}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Add more modules */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={addMoreModules}
                  disabled={addingMore}
                  className="inline-flex items-center gap-2 rounded-full border border-border/20 bg-surface px-5 py-2.5 text-sm text-muted hover:text-foreground hover:border-accent/40 transition-colors disabled:opacity-40"
                >
                  {addingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {addingMore ? "Adding…" : "Add more modules"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
