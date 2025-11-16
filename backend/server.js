const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----------------------
// SUPABASE CLIENT
// ----------------------
const supabase = createClient(
  "https://fzwvxesrtdilljgcrntpw.supabase.co",
  "YOUR_SERVICE_ROLE_KEY_HERE" // service role !!! not anon
);

// ---------------------------
// 1. LOGIN (just email no password)
// ---------------------------
app.post("/login", async (req, res) => {
  const { email } = req.body;
  res.json({ success: true, email });
});

// ---------------------------
// 2. SEND MESSAGE
// ---------------------------
app.post("/send", async (req, res) => {
  const { sender, receiver, message } = req.body;

  const { data, error } = await supabase
    .from("messages")
    .insert([{ sender, receiver, message }]);

  if (error) return res.json({ success: false, error });

  res.json({ success: true });
});

// ---------------------------
// 3. GET MESSAGES FOR USER
// ---------------------------
app.get("/messages/:email", async (req, res) => {
  const email = req.params.email;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("receiver", email)
    .order("created_at", { ascending: false });

  if (error) return res.json({ success: false, error });

  res.json({ success: true, messages: data });
});

// ---------------------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
