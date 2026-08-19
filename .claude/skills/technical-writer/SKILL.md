---
name: technical-writer
description: Rewrite or generate technical prose under Amazon-style writing rules — short sentences, data instead of adjectives, active voice, no weasel words, no filler. Use only when the user explicitly invokes it by name or asks for a technical-writing pass, edit, or draft under these rules.
---

# Technical Writer

Apply to English technical writing: specs, READMEs, design docs, RFCs, incident reports, API docs, release notes, PR descriptions, proposals, status updates.

Two modes:

- **Edit** — the user supplies text. Preserve meaning. Flag ambiguity instead of resolving it.
- **Generate** — the user supplies a brief. Write it correct on the first pass.

Both modes use the same output shape.

## Rules

**1. Short sentences.** Target 30 words or fewer. This is a guideline, not a cap. Break compound clauses into separate sentences. A longer sentence survives if splitting it would break a genuine logical dependency.

**2. Adjectives become data.** Replace vague magnitude with numbers. "Significantly faster" becomes "40% faster" or "p99 latency dropped from 800ms to 210ms". If the number is absent, insert a bracketed placeholder and a flag. Never invent a number, date, name, or measurement.

**3. No weasel words.** Cut hedges and vague attributions: some, many, most, several, various, often, generally, typically, arguably, relatively, fairly, quite, robust, seamless, leverage, utilise, best-in-class, industry-leading, experts say, studies show, it is believed, up to. Replace with a number, a named source, or nothing.

**4. Active voice.** Name the actor so ownership is visible. "The service retries the request" beats "the request is retried". Passive is correct when the actor is genuinely unknown, irrelevant, or deliberately withheld.

**5. The so-what test.** Every sentence must carry new information or drive a decision. If it does neither, delete it. This kills throat-clearing openers, restated headings, and closing summaries that repeat the body.

**6. 8th-grade reading level.** Short common words over long ones. Define every acronym on first use: "Cross-Origin Resource Sharing (CORS)". Reuse the short form after that. Jargon is fine when it is the precise term for the reader's domain, and only then.

**7. Em dashes.** Never write one. Never delete one the author already wrote. Use full stops, commas, or brackets in your own prose.

**8. Banned words.** Never write these, or any inflection of them: delve, tapestry, pivotal, foster, beacon, intricate, vibrant, testament. Inflections include delves/delved/delving, fosters/fostered/fostering, intricately, vibrancy, and so on. Only exceptions: verbatim quotes and proper nouns.

**9. No negative pivot.** Never use "It's not X, it's Y" or its variants: "not just X but Y", "rather than X, Y", "X isn't the point, Y is". State the claim directly.

**10. No forced rule of three.** Do not pad a list to three items for rhythm. Two items is a complete list. So is one. Never invent a third item to balance a sentence.

## Placeholders and flags

Use this convention whenever a claim needs a fact you do not have:

- Inline placeholder in square brackets, describing the missing value and its unit: `[X ms]`, `[N users]`, `[date]`.
- Flag immediately after the sentence: `[Flag: no source for the latency figure — confirm with the perf dashboard.]`

Every placeholder gets a flag. Every flag names what is missing and, where possible, who or what could supply it. Both appear again in the changelog.

## Output shape

Rewritten or generated text first. No preamble, no "here is your text", no restating the rules.

Then a horizontal rule, then the changelog:

```
---

## Changelog

**Placeholders and flags**
- `[X ms]` — replaced "much faster"; needs the measured p99. [Flag: confirm with perf dashboard.]
- [Flag: "the team" is ambiguous — platform or client team?]

**Edits**
- Cut 3 sentences that failed the so-what test (opening paragraph, closing summary).
- Split 4 sentences over 30 words.
- Converted 6 passive constructions to active; named the actor as "the scheduler" in 2 cases where it was implied.
- Removed "robust", "seamless", "leverage".
- Rewrote 1 negative pivot in the Rollback section.

**Ambiguity preserved**
- Left "eventual consistency window" unchanged; the intended bound is unclear.
```

Rules for the changelog:

- List every placeholder and every flag explicitly. Never summarise them as "several placeholders added".
- Group the rest by rule, with counts and locations. One line per group.
- In generate mode, replace the Edits section with **Notable choices**: structural decisions, terms defined, facts deliberately left as placeholders.
- Omit any section with nothing in it.

## Working notes

**Match the document type.** An incident report leads with impact and timeline. A README leads with what the thing does and how to install it. An API doc is reference-shaped, not narrative. Keep the source document's structure unless it actively fails the reader.

**Do not over-edit.** Change what breaks a rule. Leave the author's voice, terminology, and ordering alone otherwise. A sentence that is already clear and specific stays as written, even if you would have phrased it differently.

**Preserve meaning above all.** If a rule and the author's meaning collide, keep the meaning and flag the tension. Never sharpen a hedge into a claim the author did not make: "may cause data loss" does not become "causes data loss".

**Do not touch** code blocks, command output, log excerpts, quoted text, or proper nouns.
