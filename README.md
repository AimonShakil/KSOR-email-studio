# Lexisource HR Email Studio

An email marketing studio built with [Claude Code](https://claude.com/claude-code). It's where we plan email campaigns for **Lexisource HR**, the Knowledge System of Record (KSoR) for enterprise policy intelligence, and write the emails.

The studio is built step by step from `Email Studio Lab Assignment.md`, a 15-step Claude Code course.

> **Practice only.** Every lead in `leads/` is made up. Email can only go to Resend test addresses (ending in `@resend.dev`) or to the owner's own address. A hook enforces this.

## What's inside

| Path | What it holds |
|---|---|
| `CLAUDE.md` | Project instructions for Claude Code. It loads the brand voice and sets the rules. |
| `brand/voice.md` | Our voice (authoritative, reassuring, clear), the words we use and avoid, the claims we must never make, and the sign-off |
| `leads/leads.csv` | 24 made-up leads in three groups: `mid-market-hr`, `enterprise-chro` and `it-compliance` |
| `campaigns/lexisource-launch/plan.md` | Plan for the four-week waitlist launch campaign, "One Authoritative Record" |
| `campaigns/lexisource-launch/emails/` | The four main launch emails |
| `campaigns/lexisource-launch/groups/<group>/emails/` | A version of each email for each lead group |
| `notes/` | Research and working notes |
| `.claude/rules/emails.md` | Rules every email file must follow: subject and preview length, greeting, one link, sign-off and footer |
| `.claude/skills/personalize/` | The `/personalize` skill, which writes one version of each campaign email for every lead group |
| `.claude/hooks/send-guard.mjs` | The send guard: a `PreToolUse` hook that checks Resend tool calls before they run |
| `.mcp.json` | Connects the Resend MCP server (practice mode by default) |

## How sending is kept safe

There are two layers:

1. **A rule in `CLAUDE.md`.** It tells Claude never to send email to real people. This is guidance for Claude, so it isn't enforced.
2. **The send guard hook.** Claude Code runs `.claude/hooks/send-guard.mjs` before every `mcp__resend__*` tool call.
   - `send-email` and `send-batch-emails` go through only if every `to`, `cc` and `bcc` address ends in `@resend.dev` or matches `MY_EMAIL`.
   - `send-broadcast`, `create-automation`, `send-inbox-draft` and `send-new-inbox-email` are always blocked, because they can reach whole lists of people.
   - When a call is blocked, the hook exits with code 2 and Claude Code shows Claude the reason.

## Setup

1. Install [Claude Code](https://claude.com/claude-code) and Node.js.
2. Clone the repo and open it in Claude Code:

   ```bash
   git clone https://github.com/AimonShakil/KSOR-email-studio.git
   ```

3. Create `.claude/settings.local.json` with your own email address. Git ignores this file, so your address isn't committed.

   ```json
   {
     "env": {
       "MY_EMAIL": "you@example.com"
     }
   }
   ```

4. Resend runs in practice mode by default. `.mcp.json` points at `http://localhost:4000` and uses the key `re_practice`. To use a real Resend account instead, set `RESEND_API_KEY`, `RESEND_BASE_URL` and `SENDER_EMAIL_ADDRESS` in your environment.

The marketing plugin (`marketing@knowledge-work-plugins`) is turned on for this project in `.claude/settings.json`.

## Common tasks

- **Personalize a campaign:** `/personalize campaigns/lexisource-launch`
- **Review a draft against the brand:** `/marketing:brand-review`
- **Practice send:** ask Claude to send a group's email to `delivered@resend.dev`
