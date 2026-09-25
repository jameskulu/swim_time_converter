I have initialized a new astrojs project, use astro docs mcp and tailwind-4-docs skill for creating the website. Also use @DESIGN.md file for the website design.

Name:  Swim Time Converter
Domain: onlineswimtimeconverter.com

Website Description:

Build a production-ready **Swim Time Converter web app** with a clean, professional **Linear-inspired design**.

## 1. Product Goal

Create a fast, mobile-first website for swimmers, coaches, parents, and swimming clubs to:

* Convert swimming times between **SCY, SCM, and LCM**
* Compare equivalent times across courses
* Calculate swimming pace and splits
* Understand how swimming time conversions work
* Eventually support additional swimming calculators

The website should feel like a **professional sports utility tool**, not a generic calculator.

Primary SEO target:

**Swim Time Converter**

Secondary keywords to naturally target:

* swimming time converter
* swim time converter
* SCY to LCM converter
* SCY to SCM converter
* SCM to LCM converter
* LCM to SCY converter
* LCM to SCM converter
* swimming time conversion
* swimming time calculator
* swim pace calculator
* swimming split calculator
* swimming calculator

Do NOT keyword-stuff.

---

# 2. Tech Stack

Use:

* Astro
* TypeScript
* Tailwind CSS
* Client-side JavaScript/TypeScript for all calculations
* No database
* No authentication
* No backend/API
* No unnecessary dependencies

The entire calculator should work instantly in the browser.

Prioritize:

* Excellent Core Web Vitals
* Very small JavaScript bundle
* Mobile-first responsive design
* Accessibility
* Semantic HTML
* SEO
* Clean maintainable components

---

# 3. Visual Design

Use **Linear as the primary design inspiration**.

Do NOT copy Linear's branding or website.

Use the design principles:

* Minimal
* Precise
* Professional
* Lots of whitespace
* Excellent typography
* Subtle borders
* Subtle shadows
* Clear hierarchy
* Compact but comfortable UI
* Very little decoration
* Fast-feeling interactions

The website should look like a serious professional tool used by swimmers and coaches.

### Colors

Use:

* White / very light gray background
* Dark navy/near-black text
* Blue as the primary accent
* Very subtle gray borders
* Light blue highlights for selected states

Avoid:

* Neon gradients
* Excessive glassmorphism
* Huge hero illustrations
* Excessive animations
* Dark cyberpunk styling
* Overly playful UI

### Typography

Use a modern sans-serif such as:

* Inter
* Geist

Use strong typography hierarchy but keep everything compact.

---

# 4. Global Layout

Desktop:

```text
------------------------------------------------
Header
------------------------------------------------

        Swim Time Converter

 Convert your swimming time between
 SCY, SCM and LCM.

------------------------------------------------
                 Calculator
------------------------------------------------

                 Results

------------------------------------------------
          Compare All Courses
------------------------------------------------

        Related Swim Calculators

------------------------------------------------
       How Swim Time Conversion Works
------------------------------------------------

                  FAQ

------------------------------------------------
Footer
------------------------------------------------
```

Mobile should stack everything naturally.

Do NOT put a huge SEO text section before the calculator.

The calculator must appear quickly above the fold.

---

# 5. Header

Create a minimal header.

Left:

**Swim Time Converter**

Navigation:

* Converter
* Pace Calculator
* Split Calculator
* Guides

On mobile, use a compact hamburger/menu if necessary.

Header should be:

* sticky or subtly fixed if appropriate
* minimal
* responsive
* accessible

---

# 6. Hero Section

Create a compact hero section.

H1:

**Swim Time Converter**

Subtitle:

**Convert swimming times between SCY, SCM, and LCM courses.**

Supporting text:

**Enter your event and time to see equivalent swimming times across different course lengths.**

Keep this section compact.

Immediately below it, show the calculator.

---

# 7. Main Calculator

This is the most important component.

Create a polished card with:

### Course

Three selectable options:

* SCY
* SCM
* LCM

Clearly show the selected course.

### Distance/Event

Allow selection of common events:

Freestyle:

* 50 Free
* 100 Free
* 200 Free
* 400 Free
* 500 Free
* 800 Free
* 1000 Free
* 1500 Free
* 1650 Free

Backstroke:

* 50 Back
* 100 Back
* 200 Back

Breaststroke:

* 50 Breast
* 100 Breast
* 200 Breast

Butterfly:

* 50 Fly
* 100 Fly
* 200 Fly

Individual Medley:

* 100 IM
* 200 IM
* 400 IM

Structure the event selector logically.

### Gender

Options:

* Men's
* Women's

### Time

Allow:

```text
MM:SS.ss
```

Examples:

```text
52.43
1:52.37
4:32.15
```

Support both short and long times.

Validate invalid input.

### Convert button

Large primary button:

**Convert Time**

The button should be visually prominent but still fit the minimal Linear-inspired design.

---

# 8. Results

After conversion, display a beautiful result card.

Example:

```text
Equivalent Time

59.82
100 Free · LCM

Converted from
52.43 · SCY
```

Then show:

```text
SCY     52.43
SCM     58.91
LCM     59.82
```

Use a clean comparison table/card.

Include:

* Copy button
* Share button
* Reset button

Copy should copy the result to clipboard.

Share should use the Web Share API where supported and gracefully fall back where unsupported.

---

# 9. Important Conversion Disclaimer

Swimming conversions are estimates and can vary depending on the conversion methodology.

Display a subtle note:

**Conversion results are estimates. Different swimming organizations and conversion models may produce different results.**

Do not claim that your conversion is officially sanctioned unless the data/model is actually sourced from an official organization.

---

# 10. Conversion Methodology

Architect the calculation system so multiple conversion models can be added later.

For example:

```text
Conversion Method

○ Standard
○ NCAA
○ Performance-based
```

For the first version, implement one clearly documented conversion methodology using properly sourced conversion data/formulas.

IMPORTANT:

Do not invent conversion coefficients.

Create the conversion engine so conversion tables/formulas can easily be replaced or expanded later.

Example architecture:

```ts
convertTime({
  courseFrom,
  courseTo,
  event,
  gender,
  time,
  method
})
```

Keep conversion logic separate from UI components.

---

# 11. Compare All Courses

Below the main result, show:

## Compare Swimming Courses

Example:

| Course | Equivalent Time |
| ------ | --------------: |
| SCY    |           52.43 |
| SCM    |           58.91 |
| LCM    |           59.82 |

Highlight the original course.

Make the comparison visually easy to scan.

---

# 12. Pace Calculator

Create a separate page:

```text
/pace-calculator/
```

H1:

**Swim Pace Calculator**

Allow users to enter:

* Total distance
* Total time
* Desired pace distance

Calculate:

* Pace per 25
* Pace per 50
* Pace per 100
* Pace per selected distance

Make it completely client-side.

---

# 13. Split Calculator

Create:

```text
/split-calculator/
```

Allow users to enter:

* Race distance
* Total race time
* Number of splits

Generate estimated split times.

Also support common swimming distances.

---

# 14. SEO Landing Pages

Create dedicated pages for important conversion searches.

Examples:

```text
/scy-to-lcm/
/scy-to-scm/
/scm-to-lcm/
/lcm-to-scy/
/lcm-to-scm/
/scm-to-scy/
```

Each page should:

* Have a unique title
* Have a unique H1
* Preconfigure the calculator for that conversion
* Explain the conversion
* Include examples
* Explain SCY/SCM/LCM
* Include FAQs
* Link naturally to related conversion pages

Example:

### H1

**SCY to LCM Converter**

Intro:

**Convert swimming times from short-course yards (SCY) to long-course meters (LCM). Enter your event and time to calculate an estimated equivalent LCM swimming time.**

The calculator should already have:

```text
From: SCY
To: LCM
```

selected.

---

# 15. Event-Specific SEO Pages

Eventually support pages such as:

```text
/100-free-time-converter/
/200-free-time-converter/
/500-free-time-converter/
/100-back-time-converter/
/100-breast-time-converter/
/100-fly-time-converter/
/200-im-time-converter/
```

Do not create hundreds of thin pages.

Only create pages where there is meaningful search intent and genuinely useful content.

---

# 16. Educational Content

After the calculator, create a useful explanation section.

H2:

**How Does a Swim Time Converter Work?**

Explain:

* SCY = Short Course Yards
* SCM = Short Course Meters
* LCM = Long Course Meters
* Why the same swimmer can have different times in each course
* How turns affect short-course swimming
* Why conversions are estimates
* Why different conversion systems can produce different results

Keep the content genuinely useful.

---

# 17. SCY vs SCM vs LCM

Create a comparison section.

Example:

| Course |    Length | Common Usage                            |
| ------ | --------: | --------------------------------------- |
| SCY    |  25 yards | Primarily U.S. short-course competition |
| SCM    | 25 meters | Short-course metric competition         |
| LCM    | 50 meters | Long-course competition                 |

Explain the practical differences.

---

# 18. FAQ

Create a useful FAQ section.

Questions such as:

* What is a swim time converter?
* What is SCY in swimming?
* What is SCM in swimming?
* What is LCM in swimming?
* How do I convert SCY to LCM?
* Why are SCY and LCM times different?
* Are swimming time conversions exact?
* Which swimming conversion method should I use?

Use FAQ structured data only where appropriate and where the visible FAQ content matches the structured data.

---

# 19. Internal Linking

Create a strong internal linking system.

Example:

Swim Time Converter

↓

SCY to LCM

SCY to SCM

SCM to LCM

↓

100 Free Time Converter

200 Free Time Converter

500 Free Time Converter

↓

Pace Calculator

Split Calculator

Swimming Guides

Avoid excessive exact-match anchor text.

---

# 20. Metadata

Create unique metadata for every important page.

Example homepage title:

**Swim Time Converter – SCY, SCM & LCM**

Description:

**Convert swimming times between SCY, SCM, and LCM. Compare equivalent swim times across courses with our free swimming time converter.**

Use proper:

* canonical URLs
* Open Graph metadata
* Twitter/X metadata
* robots.txt
* sitemap.xml
* favicon
* Web App Manifest if useful

---

# 21. Structured Data

Use appropriate JSON-LD.

Potential schemas:

* WebApplication
* BreadcrumbList
* FAQPage where appropriate

Do not add fake ratings, reviews, prices, or unsupported claims.

Make sure JSON-LD is valid.

---

# 22. Accessibility

Follow WCAG-friendly practices.

Ensure:

* keyboard navigation
* visible focus states
* proper labels
* sufficient contrast
* semantic buttons
* accessible select controls
* screen-reader-friendly error messages
* no color-only indicators

---

# 23. Mobile UX

This is extremely important.

The calculator must work comfortably on a phone.

Use:

* large touch targets
* large time input
* easy course selection
* no horizontal scrolling
* sticky result only if it genuinely improves UX
* compact navigation

Test widths around:

```text
320px
375px
390px
430px
768px
1024px
1440px
```

---

# 24. Performance

Target:

* Lighthouse Performance 95+
* Lighthouse SEO 95+
* Lighthouse Accessibility 95+
* Lighthouse Best Practices 95+

Avoid:

* unnecessary JavaScript
* heavy animation libraries
* large image assets
* unnecessary third-party scripts
* huge icon libraries

The calculator should load extremely quickly.

---

# 25. Analytics

Prepare the site for Google Analytics.

Track useful events:

```text
calculator_used
conversion_completed
copy_result
share_result
pace_calculator_used
split_calculator_used
```

Do not track unnecessary personal information.

---

# 26. AdSense Placement

Design the site so advertisements can eventually be added without ruining the UX.

Possible placements:

1. Between hero and calculator
2. Between calculator/results and educational content
3. Between content sections
4. One desktop sidebar placement if appropriate

Do NOT put ads inside the main calculator controls.

The calculator should remain the primary experience.

---

# 27. Footer

Create a simple footer containing:

* Swim Time Converter
* Converter
* Pace Calculator
* Split Calculator
* Guides
* About
* Contact
* Privacy Policy
* Terms

Add:

**Free swimming calculators and tools for swimmers and coaches.**

---

# 28. Code Architecture

Use a clean structure similar to:

```text
src/
  components/
    Header.astro
    Footer.astro
    SwimCalculator.tsx
    CourseSelector.tsx
    EventSelector.tsx
    TimeInput.tsx
    ResultCard.tsx
    CourseComparison.tsx
    FAQ.astro

  lib/
    conversions/
      index.ts
      types.ts
      standard.ts

    swimming/
      events.ts
      time.ts

  pages/
    index.astro
    pace-calculator/
      index.astro
    split-calculator/
      index.astro
    scy-to-lcm/
      index.astro
    scy-to-scm/
      index.astro
    scm-to-lcm/
      index.astro
    lcm-to-scy/
      index.astro
    lcm-to-scm/
      index.astro
    scm-to-scy/
      index.astro

  layouts/
    Layout.astro
```

Keep calculation logic completely separate from presentation.

---

# 29. Error Handling

Handle:

* empty time
* malformed time
* negative values
* impossible times
* unsupported event/course combinations
* invalid conversion
* extremely large values

Show friendly inline errors.

Never allow the UI to crash.

---

# 30. Important Product Principle

Do NOT build this as a generic calculator template.

It should feel like a specialized **swimming tool**.

The user should immediately understand:

1. What the website does
2. Where to enter their swimming time
3. What course they are converting from
4. What the resulting equivalent time is

The calculator should take priority over everything else.

---

# 31. Final Acceptance Criteria

Before considering the project complete:

* Calculator works correctly
* SCY/SCM/LCM supported
* Common events supported
* Gender supported where conversion methodology requires it
* Time parsing works
* Invalid input handled
* Results are clearly displayed
* Compare-all-courses works
* Copy works
* Share works
* Mobile layout works
* SEO metadata exists
* Sitemap exists
* Robots.txt exists
* Structured data validates
* No console errors
* No broken links
* No fake conversion data
* No unsupported claims
* Lighthouse scores are strong
* Site loads quickly

## Most Important

Build **the actual working product**, not just a visual mockup.

Start with the core calculator and make it fully functional first.

Then build the supporting pages and SEO structure.

The final result should look like a polished, modern, trustworthy swimming utility website inspired by **Linear's design philosophy**, with the calculator as the central product.


also add dark mode and make it mobile responsive and it should work in all the mobile devices







Do the On Page SEO of this Website for

Main Keyword: Swim Time Converter
Supporting Keywords:
swim time converter 25 yards to meters
swim time converter meters to yards
swim time converter 25 meters to yards
swim time converter yards to meters
swim time converter 50 yards to meters
swim time converter 25 yards to meters usa
swim time converter tool
swim time converter swimming world
scy to lcm swim time converter
swimswam swim time converter
swim time converter calculator
meters to yards swim time converter
usa swim time converter
short course to long course swim time converter
swim time converter 100 im
swim time converter
yards to meters swim time converter
swim time converter uk
swim swim time converter
swim time difference calculator

swim time converter 100 im
best swim time converter
swim time calculator

these above keywords, also use proper og meta tags for SEO
on home page write 800 - 1200 words about the tool for SEO




add seo friendly FAQ section for these below questions:

which direction am i facing compass online
online compass where is north
hat direction am i facing compass online
how to know direction without compass online
what way am i facing compass online
how to use compass online
Can I use my phone as a compass?
Where is my compass in Google?
Can my phone tell me what direction I'm facing?
How to see compass on mobile?
Which is my north direction?
Where is the compass on my phone?
Which mobile phones have a compass sensor?


NOTE: Use JSON-LD for FAQ SEO
example: ```
 <script type="application/ld+json">
 {
 "@context": "<https://schema.org>",
 "@type": "FAQPage",
 "mainEntity": [{
 "@type": "Question",
 "name": "How to find an apprenticeship?",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "<p>We provide an official service to search through available apprenticeships. To get started, create an account here, specify the desired region, and your preferences. You will be able to search through all officially registered open apprenticeships.</p>"
 }
 }, {
 "@type": "Question",
 "name": "Whom to contact?",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "You can contact the apprenticeship office through our official phone hotline above, or with the web-form below. We generally respond to written requests within 7-10 days."
 }
 }]
 }
 </script>


 
https://docs.astro.build/en/recipes/i18n/  use this to provide multi lang support to this website so that it ranks on other languages keywords.

provide support for:
Español
日本語
Français
Portugues
Deutsch
한국어
Italiano

note: Add hreflang markup for each language.

