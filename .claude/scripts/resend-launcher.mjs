#!/usr/bin/env node
// Starts the Resend MCP server in live or practice mode.
//
// Live mode: the API key is read from `pass` (entry resend/api-key) and handed
// only to the resend-mcp process. It is never put in Claude Code's own
// environment and never printed.
// Practice mode: if pass isn't installed, the entry is missing or the GPG key
// is locked, the server starts against the local practice server instead.
//
// stdout belongs to the MCP protocol, so this script only writes to stderr.

import { execFileSync, spawn } from "node:child_process";

const RESEND_MCP = "resend-mcp@2.27.1";
const PASS_ENTRY = process.env.RESEND_PASS_ENTRY || "resend/api-key";
const SENDER = process.env.SENDER_EMAIL_ADDRESS || "onboarding@resend.dev";

function keyFromPass() {
  try {
    const output = execFileSync("pass", ["show", PASS_ENTRY], {
      // No stdin, so a locked GPG key fails fast instead of waiting for a passphrase.
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
      timeout: 5000,
    });
    const key = output.split("\n")[0].trim();
    return key || null;
  } catch {
    return null;
  }
}

const key = keyFromPass();
const env = { ...process.env, SENDER_EMAIL_ADDRESS: SENDER };

if (key) {
  env.RESEND_API_KEY = key;
  env.RESEND_BASE_URL = "https://api.resend.com";
  process.stderr.write(`resend launcher: LIVE mode (key from pass ${PASS_ENTRY})\n`);
} else {
  env.RESEND_API_KEY = "re_practice";
  env.RESEND_BASE_URL = process.env.RESEND_PRACTICE_URL || "http://localhost:4000";
  process.stderr.write(
    `resend launcher: practice mode (no key from pass ${PASS_ENTRY}; is pass set up and unlocked?)\n`
  );
}
delete env.RESEND_PASS_ENTRY;

const child = spawn("npx", ["-y", RESEND_MCP], { stdio: "inherit", env });

for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
child.on("error", (error) => {
  process.stderr.write(`resend launcher: could not start ${RESEND_MCP}: ${error.message}\n`);
  process.exit(1);
});
