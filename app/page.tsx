"use client";

import { useState } from "react";
import AgentChat from "@/components/AgentChat";
import TaskList from "@/components/TaskList";

/*
 * HOME PAGE
 * Left: the agent chat. Right: the data the agent works on (here: tasks).
 * YOUR JOB: replace TaskList with your own data view (orders, tickets, claims, ...)
 * and add more pages under app/ (for example app/orders/page.tsx).
 */
export default function HomePage() {
  // Changes every time the agent writes data, so the list on the right reloads.
  const [refreshKey, setRefreshKey] = useState(0);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <main className="mx-auto max-w-6xl p-4 md:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Hackathon Starter</h1>
          <p className="text-sm text-slate-500">Replace this with your app name and problem statement.</p>
        </div>
        <button onClick={logout} className="text-sm text-slate-500 hover:text-slate-900">
          Log out
        </button>
      </header>
      <div className="grid gap-4 md:grid-cols-5">
        <section className="md:col-span-3">
          <AgentChat onDataChanged={() => setRefreshKey((k) => k + 1)} />
        </section>
        <section className="md:col-span-2">
          <TaskList refreshKey={refreshKey} />
        </section>
      </div>
    </main>
  );
}
