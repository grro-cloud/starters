---
sidebar_position: 2
---

# Writing pages

Add a `.md` or `.mdx` file to `docs/` and it appears in the sidebar. Set its place with
`sidebar_position` at the top of the file:

```md
---
sidebar_position: 3
---

# My new page

Some text.
```

Put pages in a folder to group them in the sidebar. MDX files can also use React components.

Code blocks get syntax highlighting:

```ts
export function greet(name: string): string {
  return `Hello ${name}`;
}
```
