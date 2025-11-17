import { createClient } from "@supabase/supabase-js";

export async function onRequestPost({ env, request }) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE);

  const { sender, receiver, message } = await request.json();

  const { error } = await supabase
    .from("messages")
    .insert([{ sender, receiver, message }]);

  if (error)
    return Response.json({ success: false, error }, { status: 400 });

  return Response.json({ success: true });
}
