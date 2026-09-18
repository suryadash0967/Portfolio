# Surya — Portfolio

### I BUILD THINGS THAT SHOULDN'T BE THIS GOOD.

A personal portfolio built because apparently having a résumé wasn't enough.

## What Is This?

This is my corner of the internet. A slightly over-engineered portfolio where software engineering, questionable levels of attention to detail, and an unreasonable amount of animation meet in one place.

## What's Going On In Here?

- **Interactive atmosphere** — because a static background felt suspiciously reasonable.
- **Scroll-driven animations** — scrolling now has consequences.
- **Interactive tech constellation** — a prettier way of saying "things I know."
- **Custom cursor interactions** — desktop gets the fancy stuff (magnetic pulling, state-based lenses).
- **Responsive design** — because phones exist.
- **Project case studies** — actual things I've built, not lorem ipsum with a gradient.
- **Performance-conscious animations** — pretty doesn't have to mean slow.

## The Machinery

The stack is intentionally lean. No heavy 3D libraries, just well-orchestrated DOM manipulation.

- **React 19** — making components behave.
- **Vite** — because waiting for builds is boring.
- **Vanilla CSS Modules** — avoiding utility class soup.
- **GSAP (ScrollTrigger & quickTo)** — making things move without making them explode.
- **Lucide React** — icons.

## The Work

This portfolio showcases a few things I'm actually proud of:

**01 / MSIL AI Assistant & Analytics** (Taught it to read)  
An internal RAG-based assistant and demand analytics dashboard for Maruti Suzuki Industry Limited, built with Python, FastAPI, NextJS, and FAISS vector search.

**02 / Purfurry** (Dogs, cats & JavaScript)  
A React-based platform heavily optimized for technical SEO and rapid traffic growth, currently hitting ~1.5K monthly views.

**03 / Excel Analytics** (Made Excel do more)  
A 100% in-browser Excel upload and analysis tool featuring JWT-based authentication and Gemini Flash LLM insights.

**04 / Maadhyam** (Money, but nicer)  
A full-stack donation platform connecting donors and recipients, architected in 48 hours with role-based access control.

## Why Does It Look Like This?

Because "developer portfolio with a hero section, three cards and a contact form" has been done approximately 14 billion times.

I wanted something that felt more like an experience than a résumé wearing CSS. That meant utilizing:
- Editorial typography
- Atmospheric, scroll-linked lighting
- Interactive motion (3D tilts, magnetic cursors)
- Subtle technical visual language (coordinate grids, film grain)

## Running It

If you want to spin this up locally, you can. 

```bash
# Clone the repository
git clone https://github.com/suryadash0967/Portfolio.git

# Enter the directory
cd Portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build
```

*(No environment variables required. Just clone and run.)*

## Architecture

The structure is relatively straightforward.

```
src/
├── assets/        # PDFs, SVGs, and images
├── components/    # The building blocks
│   ├── About/     # Asymmetrical editorial grid
│   ├── Contact/   # The climax
│   ├── Cursor/    # The magnetic logic
│   ├── Experience/# Timelines
│   ├── Hero/      # Parallax entry
│   ├── OrbMotif/  # The traveling light
│   ├── Projects/  # 3D cinematic reveals
│   └── Skills/    # The constellation
├── App.jsx        # The orchestrator
├── index.css      # Design tokens & global atmosphere
└── main.jsx       # The entry point
```

## Why So Much Movement?

Because apparently I couldn't leave well enough alone.

But the animations are intentional. Motion supports the hierarchy, and expensive hover interactions (like the custom cursor and 3D tilts) are automatically disabled on touch devices using `window.matchMedia('(pointer: coarse)')`. Performance is maintained by utilizing GSAP's `quickTo` for physics and isolating layout calculations in GSAP Contexts to prevent memory leaks.

Built to look expensive without requiring a GPU rental.

## Found A Bug?

Probably intentional. But if it's not, you can reach me here:

- [GitHub](https://github.com/suryadash0967)
- [LinkedIn](https://linkedin.com/in/surya-narayan-dash-4b396b291)
- [Email](mailto:surya.dash0967@gmail.com)

---

*Made with React, GSAP, questionable amounts of CSS, and the inability to leave things alone.*
