// Smoke test for /api/enquiry. Run against a dev server: `npm run dev` then `npm run smoke`.
// Uses distinct x-forwarded-for values so the rate limiter doesn't interfere, except in the last check.
import assert from "node:assert/strict";

const base = process.env.BASE_URL || "http://localhost:3003";
const post = (body, ip = String(Math.random())) =>
  fetch(`${base}/api/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  }).then(async (r) => ({ status: r.status, body: await r.json() }));

const ok = { name: "Test Person", phone: "+91 98716 63624", service: "portraits", email: "", date: "", venue: "Noida", message: "Smoke test" };

let r = await post(ok);
assert.equal(r.status, 200, JSON.stringify(r.body));

r = await post({ ...ok, phone: "12345" });
assert.equal(r.status, 400);
assert.ok(r.body.errors.phone);

r = await post({ ...ok, phone: "098716 63624", email: "nope" });
assert.equal(r.status, 400);
assert.ok(r.body.errors.email && !r.body.errors.phone, "leading 0 phone is valid, bad email is not");

r = await post({ ...ok, date: "2000-01-01", service: "weddings" });
assert.ok(r.body.errors.date && r.body.errors.service);

r = await post({ ...ok, website: "http://spam" });
assert.equal(r.status, 200, "honeypot pretends success");

const ip = "203.0.113.9";
const codes = [];
for (let i = 0; i < 7; i++) codes.push((await post(ok, ip)).status);
assert.deepEqual(codes.slice(-2), [429, 429], `rate limit: ${codes}`);

console.log("smoke: all enquiry API checks passed");
