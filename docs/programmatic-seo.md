# Programmatic SEO — Reference for OpenNow City Pages

Distilled from multiple sources (Jake Ward/Byword, Ahrefs, BrandClickX, others). Filtered for relevance to our "Open now in [city]" pages.

---

## Core Principle: Build Pages, Don't Fake Them

Google penalizes doorway pages — mass-produced location pages where only the city name changes. Our pages are inherently safe because they show **live, real-time data** (which places are open right now) that differs per city and changes throughout the day.

The test: "Would this page still be useful if search engines didn't exist?" If someone bookmarks an OpenNow city page and comes back tomorrow, it shows fresh live hours. Yes.

## URL Structure

- Use clean, lowercase slugs: `/open-now/philadelphia`, not `/open-now/Philadelphia%20PA`
- If scaling to services later, location as parent: `/open-now/[city]/[cuisine]`
- Keep URLs one level deep for now — flat is fine at small scale

## Title Tags & Meta Descriptions

Lead with the keyword the user is searching for, follow with differentiation.

**Formula:** `[Intent keyword] in [City] | OpenNow`

Examples:
- Title: `Restaurants Open Now in Philadelphia | OpenNow`
- Description: `See what's open right now in Philadelphia. Live hours for 24 places — updated every visit.`

Keep titles 50–60 chars, descriptions 150–160 chars.

## Page Content That Ranks

Each city page must have **genuinely unique content**, not template filler:

- **Live status data** — open/closed/closing soon, real hours, time remaining
- **Place count + city name** in the visible heading
- **Last-updated signal** — show that data is live/fresh
- **Internal links** to individual shared lists in that city
- **CTA** — "Make your own list" signup prompt

### What NOT to do:
- Don't add filler "about [city]" paragraphs copied from Wikipedia
- Don't create pages for cities with zero data
- Don't swap city names into identical templates

## Structured Data (Schema Markup)

Use `ItemList` schema wrapping individual place entries. Each place can use `LocalBusiness` or `Restaurant` schema with:

- name
- address
- openingHoursSpecification
- geo (lat/lng)

This enables rich results in Google (e.g., showing hours directly in search).

## Internal Linking

Critical for crawlability and authority distribution:

- **Homepage** → links to popular city pages (footer or dedicated section)
- **Shared list pages** → link to the parent city page ("See more places in Philadelphia")
- **City pages** → link to individual shared lists ("Shared by OpenNow users")
- **City pages** → link to other city pages ("Also check out: Chicago, NYC")

Every orphan page is a wasted page. Google can't rank what it can't find.

## Minimum Content Threshold

Only create a city page when there's enough data to be useful:

- At least 3–5 public places with hours in that city
- If a city has 1 place, don't generate a page — it looks thin

## Mobile-First

- 50%+ of local searches are mobile
- Large tap targets for place names / directions
- Fast load times (under 3 seconds)
- Responsive grid that works on small screens

## Indexing Strategy

- Add city pages to `sitemap.xml` dynamically
- Use `changeFrequency: 'hourly'` or `'daily'` since data is live
- Roll out progressively — monitor indexing in Google Search Console before scaling
- Pages with `destination_place_id` links to Google Maps are higher quality signals

## What Makes This Different From Typical pSEO

Traditional programmatic SEO fails because it's just variable substitution. Our city pages work because:

1. **Data is real and live** — not AI-generated filler
2. **Content changes every hour** — Google sees freshness
3. **Each city is genuinely different** — different places, different hours
4. **Pages are functional** — users can tap to get directions, see live status
5. **User-generated foundation** — data comes from real users sharing real lists
