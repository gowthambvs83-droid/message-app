export async function onRequestPost({ request }) {
  const body = await request.json();
  return Response.json({ success: true, email: body.email });
}
