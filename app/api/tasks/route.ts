import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { createTaskSchema } from "@/lib/schemas";

export const runtime = "nodejs";

/*
 * EXAMPLE REST API for the "tasks" table.
 * GET  /api/tasks        -> list tasks
 * POST /api/tasks        -> create a task  body: { title, due_date? }
 * Copy this pattern for your own tables (orders, tickets, claims, ...).
 */

export async function GET() {
  const { data, error } = await getSupabase()
    .from("tasks")
    .select("id, title, due_date, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("[GET /api/tasks]", error.message); // shows the reason in the terminal
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ tasks: data });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = createTaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid task", details: parsed.error.issues }, { status: 400 });
  }
  const { data, error } = await getSupabase().from("tasks").insert(parsed.data).select().single();
  if (error) {
    console.error("[POST /api/tasks]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ task: data }, { status: 201 });
}
