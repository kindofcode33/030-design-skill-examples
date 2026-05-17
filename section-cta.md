# ASU Section with CTA Buttons
> Source: ASU Unity Design System (UDS) — Section with CTA Buttons (Parallax Image)
> Load this file when building a full-width parallax background image section with an overlaid content card containing a heading, body copy, inline links, and multiple CTA buttons.

---

## Overview

A Section CTA is a full-width, full-bleed parallax background image with a white content card positioned on the left side. The card contains an H2 heading, body copy (optionally with inline bold links), and a row of multiple CTA buttons (maroon and gold). Used for high-impact conversion sections that invite users to take action.

---

## Anatomy

| Element | Required | Description |
|---|---|---|
| Background image | Yes | Full-width parallax image covering the section |
| Content card | Yes | White card positioned left, overlaid on image |
| Heading | Yes | H2 scale, bold, sentence case |
| Body text | Yes | 1-2 paragraphs with optional inline bold links |
| CTA buttons | Yes | Row of 2 buttons (maroon default, gold for primary) |

---

## Specifications

| Property | Token / Value |
|---|---|
| Section | Full-width, `relative overflow-hidden rounded-none` |
| Section padding | `py-16` (64px top and bottom) |
| Background image | `<img>` element with `absolute inset-0 w-full h-full object-cover will-change-transform` |
| Parallax effect | Scroll-driven translateY (300px travel) + scale(1.3) via JS |
| Card background | `bg-white` |
| Card padding | `p-asu-4` |
| Card border radius | `rounded-none` (always) |
| Card width | `lg:w-1/2` (50% on desktop, full on mobile) |
| Card position | Left-aligned within a `max-w-asu-content mx-auto` container |

### Heading
- `text-asu-h2 font-bold text-asu-gray-1`
- Sentence case, no dashes

### Body Copy
- `text-asu-body text-asu-gray-2 mt-asu-2`
- 1-2 paragraphs max
- Inline links: `font-bold text-asu-maroon underline hover:no-underline`

### CTA Buttons
- Displayed in a flex-wrap row: `flex flex-wrap gap-asu-2 mt-asu-3`
- Maroon buttons (default): `bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2`
- Gold button (primary/apply): `bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2`
- Hover: `hover:scale-105 transition-transform`
- Disabled: `disabled:opacity-50`
- Specific, descriptive labels (never "Learn more" or "Click here")
- Gold button reserved for the single most important action (e.g., "Apply now")

---

## Parallax Behavior

The background uses a scroll-driven parallax effect via a `useEffect` scroll listener. The image translates vertically and scales as the user scrolls past the section, creating a smooth depth effect.

**Parameters:**
- Travel distance: `scrollProgress * 300` (300px total vertical movement)
- Scale: `1.3` (30% oversized to prevent edge gaps during translation)
- Scroll progress formula: `-rect.top / (rect.height + window.innerHeight)`

**Performance:**
- Uses `will-change-transform` on the image for GPU compositing
- Scroll listener registered with `{ passive: true }` for smooth scrolling
- Uses `useRef` to avoid React re-renders on every scroll frame

**Mobile:**
- The same JS-based parallax works on all devices including iOS (unlike `background-attachment: fixed`)

---

## Reference Implementation

```tsx
import { useEffect, useRef } from 'react'

interface SectionCtaButton {
  label: string
  href: string
  variant?: "maroon" | "gold"
}

interface SectionCtaProps {
  imageSrc?: string
  imageAlt: string
  heading: string
  body: React.ReactNode
  buttons: SectionCtaButton[]
}

export default function SectionCta({
  imageSrc,
  imageAlt,
  heading,
  body,
  buttons,
}: SectionCtaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current || !imgRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -rect.top / (rect.height + window.innerHeight)
      const translateY = scrollProgress * 300
      imgRef.current.style.transform = `translateY(${translateY}px) scale(1.3)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-16 rounded-none">
      {imageSrc ? (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
      ) : (
        <div className="absolute inset-0 bg-asu-gray-6 flex items-center justify-center">
          <span className="text-asu-gray-3 text-asu-body font-bold">Image</span>
        </div>
      )}
      <div className="relative max-w-asu-content mx-auto px-asu-3">
        <div className="bg-white rounded-none p-asu-4 lg:w-1/2">
          <h2 className="text-asu-h2 font-bold text-asu-gray-1">
            {heading}
          </h2>
          <div className="text-asu-body text-asu-gray-2 mt-asu-2">
            {body}
          </div>
          <div className="flex flex-wrap gap-asu-2 mt-asu-3">
            {buttons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className={`inline-block font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2 ${
                  btn.variant === "gold"
                    ? "bg-asu-gold text-asu-gray-1"
                    : "bg-asu-maroon text-white"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## Usage

```tsx
<SectionCta
  imageSrc="/path/to/field-research.jpg"
  imageAlt="Students conducting field research in the Sonoran Desert"
  heading="Experience biology in the field"
  body={
    <p>
      Our students access 2,400 acres of dedicated research stations across
      Arizona. Field courses let you collect real data alongside faculty
      mentors and contribute to{" "}
      <a href="/conservation" className="font-bold text-asu-maroon underline hover:no-underline">
        active conservation projects
      </a>{" "}
      that protect threatened species and ecosystems.
    </p>
  }
  buttons={[
    { label: "Browse field courses", href: "/courses/field" },
    { label: "Apply now", href: "/apply", variant: "gold" },
  ]}
/>

{/* Without a real image (placeholder) */}
<SectionCta
  imageAlt="Placeholder"
  heading="Start your journey"
  body={<p>Discover how ASU can help you reach your goals with programs designed for every learner.</p>}
  buttons={[
    { label: "Explore programs", href: "/programs" },
    { label: "Apply now", href: "/apply", variant: "gold" },
  ]}
/>
/>
```

---

## Hard Rules

- ❌ Never use rounded corners on the card or section (`rounded-none` always)
- ❌ Never omit the background image (use grey placeholder if no real image)
- ❌ Never use generic CTA labels ("Learn more", "Click here", "Read more")
- ❌ Never use dashes in heading or body copy
- ❌ Never use more than one gold button (gold = single most important action)
- ❌ Never exceed 2 CTA buttons total
- ❌ Never make the card wider than 50% on desktop
- ❌ Never omit alt text on the background image
- ❌ Never use `background-attachment: fixed` (breaks on iOS, use JS parallax instead)
- ❌ Never reduce parallax travel below 300px or scale below 1.3 (produces a static feel)

---

## What This File Does Not Cover

- Card and Image (gradient overlay, no parallax) → load `card-and-image.md`
- Hero sections (full-bleed, above the fold) → load `heroes.md`
- Feature blocks (image + text side by side) → load `feature-block.md`
- Button styling details → load `buttons.md`
