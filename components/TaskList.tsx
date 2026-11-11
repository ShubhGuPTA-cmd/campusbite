"use client";

import { useEffect, useState } from "react";

type Task = { id: number; title: string; due_date: string | null; status: string };

/*
 * EXAMPLE data view: reads GET /api/tasks.
 * YOUR JOB: copy this pattern for your own data (orders, tickets, claims, ...).
 */
export default function TaskList({ refreshKey }: { refreshKey: number }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not load tasks");
        setTasks(data.tasks);
        setError("");
      })
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="font-semibold">Tasks</h2>
        <p className="text-xs text-slate-500">Live from Supabase. Updates when the agent changes data.</p>
      </div>
      <ul className="divide-y divide-slate-100">
        {error && <li className="p-4 text-sm text-red-600">{error}</li>}
        {!error && tasks.length === 0 && <li className="p-4 text-sm text-slate-500">No tasks yet.</li>}
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-2 px-4 py-2.5 text-sm">
            <div>
              <p className={t.status === "done" ? "text-slate-400 line-through" : ""}>{t.title}</p>
              <p className="text-xs text-slate-500">#{t.id} · Due: {t.due_date ?? "no date"}</p>
            </div>
            <span
              className={
                t.status === "done"
                  ? "rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700"
                  : "rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
              }
            >
              {t.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
