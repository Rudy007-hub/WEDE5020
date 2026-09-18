# Bright Beginnings Learning Foundation

## Part 2 – CSS Styling and Responsive Design

### Organisation

Bright Beginnings Learning Foundation is a community-based educational foundation located in Lebowakgomo, Limpopo.

The organisation provides free after-school tutoring and homework support to Grade 4–12 learners.

---

# Website Purpose

The purpose of the website is to provide Bright Beginnings Learning Foundation with a professional online presence.

The website allows visitors to:

- Learn about the foundation.
- View available tutoring programmes.
- Enquire about learner enrolment.
- Apply to become a volunteer tutor.
- Learn how to support the organisation.
- Find contact information and the organisation's location.

---

# Part 2 Design Implementation

## External CSS Stylesheet

An external stylesheet named `style.css` was created and linked to the HTML page.

The stylesheet contains the main visual styling for the website.

The external stylesheet was used to ensure consistency and to separate the website's content from its presentation.

---

# CSS Reset

A CSS reset was implemented using the universal selector.

The reset removes default browser margins and padding and applies `box-sizing: border-box`.

This provides a consistent starting point across different browsers.

---

# Base Styling

The website uses a consistent visual identity based on:

- Deep blue
- Warm yellow
- White
- Light grey

The main CSS variables were created using the `:root` selector.

This allows colours, spacing, shadows and border-radius values to be reused throughout the website.

---

# Typography

Typography was implemented using CSS properties including:

- `font-family`
- `font-size`
- `font-weight`
- `line-height`
- `letter-spacing`

Responsive typography was also implemented using `clamp()` for major headings.

This allows headings to resize according to the screen width.

---

# Layout

CSS Grid and Flexbox were used to structure the website.

Examples include:

- Header navigation using Flexbox.
- Hero section using CSS Grid.
- Feature cards using CSS Grid.
- Programme cards using CSS Grid.
- Contact cards using CSS Grid.
- Footer columns using CSS Grid.
- Responsive forms and content sections.

---

# Decorative Styling

The website uses:

- Background colours
- Borders
- Border radius
- Box shadows
- Icons
- Hover effects
- Focus states
- Active states

These styles help improve the visual hierarchy and user experience.

---

# Interactive States

Pseudo-classes were used throughout the stylesheet.

Examples include:

```css
:hover
:focus
:active
