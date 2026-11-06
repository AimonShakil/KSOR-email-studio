---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for every email file

These rules apply to every email file in any campaign. Each email file must follow all of them.

1. **Subject and preview first.** The first line is `Subject: ...` and must be 50 characters or fewer. The second line is `Preview: ...` and must be 90 characters or fewer. Count the whole line, including the `Subject: ` or `Preview: ` label.
2. **Greet by name.** Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},".
3. **Exactly one main link.** Each email has one link and no more, written as:
   `[Button text](https://lexisource.example/launch)`
   Change the button text to suit the email, but always use this address.
4. **Sign-off, then footer.** End with our sign-off from `brand/voice.md`, then this two-line footer. Write the footer as plain text, never inside a code block:

You're getting this because you joined the Lexisource HR waitlist.
Lexisource HR, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing comes after the footer: no notes, no alternative subject lines, no extra sections.
