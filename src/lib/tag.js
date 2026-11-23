/**
 * `t` is String.raw — it lets content files write LaTeX backslashes
 * naturally (t`\frac{a}{b}`) without escaping them.
 *
 * Inside rich text strings:
 *   $...$     inline maths
 *   $$...$$   display maths
 *   **...**   bold
 */
export const t = String.raw;
