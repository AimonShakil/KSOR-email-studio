# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this studio is for

This is an email marketing studio for a small business. We plan email campaigns and write the emails here. Our brand is **Lexisource HR**, the Knowledge System of Record (KSoR) for enterprise policy intelligence. The lab's sample brand, Kettlebird Tea, is not used.

@brand/voice.md

## Folders

- `brand/`: how the brand sounds, including its voice, the words it uses and the claims it must never make.
- `leads/`: practice customer lists. Everyone in them is made up.
- `campaigns/`: one folder per campaign, holding its plan and its emails.
- `notes/`: research, drafts and working notes.

## Rules

- Write in plain English.
- Never send email to real people.
- Ask me before deleting anything.

## About this lab

This studio is built step by step from `Email Studio Lab Assignment.md`, a 15-step Claude Code course for the CCAR-F exam. That file is the source of truth for every step. Don't build ahead of the step the user is on.

- **Build** prompts create files and usually end with a commit. When a prompt gives exact content (front matter, `.mcp.json`, footers, CSV columns), copy it exactly.
- **Check** prompts run in a fresh session and say "Don't change any files." Follow that strictly. Measure with commands instead of eyeballing, report in the table format asked for, then ask the quiz questions one at a time.

The marketing plugin (`marketing@knowledge-work-plugins`) is installed for this project only, through `.claude/settings.json`. `.claude/settings.local.json` holds personal values and is never committed.

## Git

Remote: https://github.com/AimonShakil/KSOR-email-studio (private). This is a solo project, so commit straight to `main`. The user pushes at the end of each day.
