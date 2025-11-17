import { createClient } from "@supabase/supabase-js";

export async function onRequest({ params, env }) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE);

  const { email } = params;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("receiver", email)
    .order("created_at", { ascending: false });

  if (error)
    return Response.json({ success: false, error }, { status: 400 });

  return Response.json({ success: true, messages: data });
}
