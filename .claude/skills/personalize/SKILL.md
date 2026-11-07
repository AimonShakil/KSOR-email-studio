---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize a campaign for each lead group

Campaign folder: $ARGUMENTS

## 1. Check the input

If no campaign folder was given, or the folder has no `emails/` folder, stop. Don't write any files. Use Glob on `campaigns/*/plan.md` and reply with only a list of the campaign folders that exist, plus one line: "Run /personalize <campaign folder> with one of these."

## 2. Read what you need

1. **The lead groups.** Read `leads/leads.csv` and collect the distinct values in the `group` column. These are the groups. Don't hard-code group names. Read `leads/CLAUDE.md` for what each group means.
2. **The emails.** Use Glob on `<campaign folder>/emails/*.md`. Only top-level email files count, never files already under `groups/`.
3. **The voice and rules.** Read `brand/voice.md`, `.claude/rules/emails.md` and `<campaign folder>/plan.md`. Use the plan's audience table and "Tone by group" notes to decide what each group cares about.

## 3. Write one version per email per group

For each email and each group, write `<campaign folder>/groups/<group>/emails/<same file name>`.

Change exactly two things:
- **The opening line:** the first paragraph after `Hi {{first_name}},`. Rewrite it so it speaks to this group's main pain.
- **One example:** pick one example, bullet or illustration in the body and change it to a situation this group would recognize. Keep it the same length or close to it.

Keep everything else word for word:
- The `Subject:` and `Preview:` lines
- The greeting, the headings, the order of sections and the bold lead-ins
- The single link: the same button text and the same address
- The sign-off and the two-line footer, with nothing after the footer

## 4. Check every file before you finish

Every new file must still follow `.claude/rules/emails.md` and `brand/voice.md`:
- It has exactly one link, and it's the same as in the original.
- None of the words we avoid and none of the claims we must never make appear. In particular: no certifications, no "guarantees compliance", no "100% accurate", no "zero risk" and no "legal advice".
- It follows the Style section in `brand/voice.md`: US spelling and contractions.
- The new example claims nothing the original email didn't already claim.

Fix any file that fails, then check it again.

## 5. Reply

Reply with a short summary only, in this shape:

Wrote <N> files (<emails> emails × <groups> groups) in <campaign folder>/groups/.

- <group>: "<opening line from the first email>"
- <group>: "<opening line from the first email>"
- <group>: "<opening line from the first email>"

Nothing else. Don't include the full emails, any notes or any next steps.
