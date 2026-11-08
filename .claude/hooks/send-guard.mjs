#!/usr/bin/env node
// PreToolUse guard for the Resend MCP server.
// Exit 0 allows the tool call. Exit 2 blocks it, and the message on stderr
// is shown to Claude as the reason.

import { readFileSync } from "node:fs";

const TEST_DOMAIN = "@resend.dev";
const CHECKED_TOOLS = new Set(["send-email", "send-batch-emails"]);
const BLOCKED_TOOLS = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);

function block(reason) {
  process.stderr.write(`Send guard: ${reason}\n`);
  process.exit(2);
}

let call;
try {
  call = JSON.parse(readFileSync(0, "utf8"));
} catch {
  block("could not read the tool call, so it was blocked to be safe.");
}

const toolName = String(call.tool_name ?? "");
const shortName = toolName.split("__").pop();
const input = call.tool_input ?? {};

if (BLOCKED_TOOLS.has(shortName)) {
  block(`${shortName} is always blocked because it can reach whole lists of people.`);
}

if (!CHECKED_TOOLS.has(shortName)) {
  process.exit(0);
}

const myEmail = (process.env.MY_EMAIL ?? "").trim().toLowerCase();

// Collect every to, cc and bcc value, at any depth, so batch sends are covered too.
function collectAddresses(value, found = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectAddresses(item, found));
  } else if (value && typeof value === "object") {
    for (const [key, field] of Object.entries(value)) {
      if (["to", "cc", "bcc"].includes(key)) {
        [field].flat().forEach((address) => found.push(String(address)));
      } else {
        collectAddresses(field, found);
      }
    }
  }
  return found;
}

// Accept "Name <someone@example.com>" as well as a bare address.
function bareAddress(address) {
  const match = address.match(/<([^>]+)>/);
  return (match ? match[1] : address).trim().toLowerCase();
}

const addresses = collectAddresses(input);
if (addresses.length === 0) {
  block(`${shortName} has no recipients the guard can check, so it was blocked.`);
}

for (const address of addresses) {
  const bare = bareAddress(address);
  const allowed = bare.endsWith(TEST_DOMAIN) || (myEmail !== "" && bare === myEmail);
  if (!allowed) {
    block(
      `${address} is not allowed. Only addresses ending in ${TEST_DOMAIN}` +
        (myEmail ? ` or your own address (${myEmail})` : "") +
        " can receive email from this studio."
    );
  }
}

process.exit(0);
