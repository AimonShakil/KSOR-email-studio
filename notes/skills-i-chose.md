# Skills I chose

These are from searches on skills.sh on 2026-11-06. I searched for "email marketing", "email sequence", "campaign plan" and "resend". Install counts come from skills.sh. GitHub stars come from each publisher's repository.

## Use these

**1. Anthropic's marketing plugin, for planning and writing campaigns**
- Source: `anthropics/knowledge-work-plugins`, which has 34,900 GitHub stars and is published by Anthropic, the company that makes Claude.
- Skills: `campaign-plan` (3.4K installs) and `email-sequence` (3K installs). They came up at or near the top of the "campaign plan" and "email sequence" searches.
- Why: it's an official publisher, it's widely trusted and actively updated (changed today). It also gives us both campaign planning and email writing in one plugin, and it's what the rest of this lab uses.

**2. Resend's own skills, for sending email**
- Source: `resend/resend-skills`, with 212 GitHub stars. Resend also publishes `resend/email-best-practices`, which has 147 stars.
- Skills: `resend` (24.3K installs), `resend-cli` (13.9K) and `email-best-practices` (8.2K).
- Why: these are made by Resend, the email service we'll actually send through. Nobody knows its tools better. The star count is modest, but the GitHub owner is Resend's official organization, and that matters more here than popularity.
- Consider: `email-best-practices` is safe to install because it is guides only and can't send anything. `resend` is fine as a read-only API reference, but never give it a real `RESEND_API_KEY`.
- Totally avoid: `resend-cli`, because it sends through the terminal and goes around our send-guard hook, which only watches `mcp__resend__.*`. Also don't install `resend/resend-skills` as a whole plugin. Its `mcp.json` adds a server called `resend` that points at the real `https://mcp.resend.com/mcp`, not our practice server.

Runner-up: `coreyhaines31/marketingskills` (58.8K stars, with skills like `email-sequence` at 55.1K installs and `emails` at 84.4K) is popular and well regarded. But it's one person's account, not an official company, so I'd keep it as a second choice.

## Avoid these

**1. `caffeinelabs/skills@extension-email-marketing`**
It has 30.1K installs, the most in the "email marketing" search, but its GitHub repository has only 2 stars. That many installs with almost no stars is a warning sign that the install count may be inflated or automated.

**2. `samber/dev-event-organizer-skills@event-attendee-email-sequences`**
It has 6.5K installs but only 4 GitHub stars, which is the same mismatch again. It's also built for event attendees, not product launches, so it doesn't fit our need anyway.

## How I decided

Before installing any skill, check these three things:

1. **Who publishes it.** Prefer the official company behind the tool, like `anthropics` or `resend`. Check that the GitHub owner is that company's real organization and not a lookalike name.
2. **Whether stars back up the installs.** Install counts can be faked. GitHub stars and real activity in the repository are harder to fake. Lots of installs with very few stars is a red flag.
3. **What it actually does.** Open the skill's SKILL.md and read it before installing. Check that it fits our task, that it was updated recently, and that it doesn't run scripts or ask for tools it doesn't need.
