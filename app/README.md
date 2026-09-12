# Ivy Homes Property API — Pune Audit & Web Application

**Candidate**: Amit Kumar (`@mnnit.ac.in`)  
**Assigned City**: Pune  
**Assigned Locality**: Hadapsar  
**Repository**: [github.com/amitkumar/ivy-homes-assignment](https://github.com/amitkumar/ivy-homes-assignment)  
**Live Demo**: [ivy-homes-pune.vercel.app](https://ivy-homes-pune.vercel.app)  

---

## 🚀 How to Run the Web Application

### Prerequisites
- Node.js (v18+) & npm

### Local Setup & Development
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite React development server
npm run dev
```
The web app will open locally at `http://localhost:3000`.

---

## 🔍 How I Identified What Documentation to Distrust & What I Did About It

When auditing the API, I approached every response as unverified external data and systematically formed hypotheses across every category (Auth, Pagination, Units, Filters, Sorting, Data Quality, Fraud, Timestamps).

### Key Discoveries & Engineering Fixes:

1. **Authentication Headers & Bearer Token Enforcement**:
   - *Documented*: API key passed via query string `?api_key=...` and Bearer token only for end-user session operations.
   - *Reality*: Server returns `401` requiring `X-API-Key` in request header for all requests. Furthermore, general collection endpoints (`/v1/listings`, `/v1/rentals`, `/v1/projects`) return `401 missing bearer token` without an `Authorization: Bearer <token>` header!
   - *Fix*: Created a central HTTP client in `src/services/api.js` that automatically attaches both `X-API-Key` and `Authorization: Bearer <token>` headers to every API call.

2. **Session Token Expiration & Refresh Flow**:
   - *Documented*: Claims `token` lasts 24 hours (`expires_in: 86400`) and explicitly states "no refresh flow".
   - *Reality*: Login returns `access_token` with `expires_in: 900` (15 minutes), `refresh_token`, and `refresh_url: /auth/refresh`.
   - *Fix*: Built local session management with token countdown timers in the UI navigation bar and token refresh handlers.

3. **Units Anomaly 1 — MagicHomes Carpet Area in Square Meters**:
   - *Documented*: Area is in integer square feet everywhere.
   - *Reality*: Listings from scraper `magichomes` report `carpet_area` in **square meters** (yielding absurd values like 110 sq ft for 3 BHK).
   - *Fix*: Implemented an automatic unit conversion layer (`carpet_area * 10.7639`) in `api.js` to normalize all areas to square feet before rendering UI cards or computing price/sqft.

4. **Units Anomaly 2 — Project Prices in Lakhs/Crores**:
   - *Documented*: Money is in integer Indian Rupees everywhere.
   - *Reality*: `price_min` and `price_max` in project records are float values in Lakhs (e.g., `40.9` = 40.9 Lakhs) or Crores (e.g., `3.34` = 3.34 Crores).
   - *Fix*: Implemented a smart magnitude-based price normalizer (`price_max < 10` → Crores, `price_max < 1000` → Lakhs) to standardize all project price metrics to INR integers.

5. **Pagination Cap & Endless Looping Duplication**:
   - *Documented*: Collection endpoints support `limit` up to 200, returning unique listings.
   - *Reality*: Server caps page size at 50 records per request. Furthermore, the dataset consists of 50 unique physical listings; when paging past page 1, the server loops through these 50 items 74 times to reach 3700 total records!
   - *Fix*: Implemented deduplication by `listing_id` in `api.js` and added a toggle switch in the UI ("Cleaned Data" vs "Raw API") so humans can inspect both un-deduplicated raw responses and cleaned data.

6. **Missing Endpoints (`404 Not Found`)**:
   - *Documented*: `/v1/analytics/summary`, `/v1/favourites`, `/v1/listings/{id}/similar`, `/v1/listing/{id}` (singular).
   - *Reality*: All 4 endpoints return `404 Not Found` (and singular path `/v1/listing/{id}` is a typo for `/v1/listings/{id}`).
   - *Fix*: Managed saved listings in `localStorage` per user session, computed analytics metrics on the frontend, and built client-side similar listings matching locality & bedroom count.

7. **Quietly Ignored Query Filters & Sorting Corruption**:
   - *Documented*: `project_id` filters listings; `sort_by=price` sorts listings.
   - *Reality*: `project_id` parameter is quietly ignored server-side. Sorting by price returns corrupted negative price values (`-15890000`).
   - *Fix*: Performed all filtering (locality, BHK, price, project) and sorting client-side in React `useMemo` hooks.

---

## 🧪 What I Checked That Turned Out to Be Fine (Unconfirmed Hypotheses)

The hypotheses that did not pan out tell us just as much about system behavior as the ones that did:

1. **Hypothesis: Coordinates (Lat/Lon) Out of Pune Bounds**
   - *Test*: Checked whether listings or projects reported lat/lon outside Pune (approx `18.2` to `18.7` N, `73.6` to `74.1` E).
   - *Result*: All coordinates fell strictly inside Pune city bounds (e.g., `18.54624, 73.70896`). Coordinate data quality was 100% accurate.

2. **Hypothesis: Floor > Total Floors Corruption**
   - *Test*: Checked if any listing had `floor > total_floors` (e.g. floor 25 in a 10-floor tower).
   - *Result*: Zero listings violated `floor <= total_floors`. Floor numbers across all 3,700 records were physically valid.

3. **Hypothesis: Negative or Zero Prices in Raw Listings**
   - *Test*: Checked for negative price values or zero price listings in unsorted `/v1/listings`.
   - *Result*: All price fields in default unsorted responses were positive, valid integers. Negative values only appeared when explicitly requesting `sort_by=price`.

4. **Hypothesis: Missing or Malformed ISO Timestamps**
   - *Test*: Checked `posted_at` fields for invalid date strings or non-ISO formats.
   - *Result*: All `posted_at` timestamps were valid ISO 8601 strings (e.g. `2026-06-14T09:20:00Z`).

5. **Hypothesis: Rentals Rent vs Deposit Currency Scaling**
   - *Test*: Checked if monthly rent in `/v1/rentals` was reported in thousands or yearly rent instead of monthly.
   - *Result*: Rental prices were exact monthly rents in INR (e.g. ₹ 42,000/mo in Hadapsar) and security deposit was consistently ~2x-5x monthly rent.

---

## ⏱️ What I Would Do With Another Two Days

1. **Automated E2E Test Suite for API Regression**:
   - Write an automated Playwright / Vitest suite that runs every 6 hours against `https://solve.ivy.homes`, automatically detecting when documented endpoints ship or when documentation discrepancies get patched.

2. **Mapbox / Leaflet Interactive Property Map**:
   - Integrate an interactive map view showing property pins in Hadapsar, Kharadi, Hinjewadi, and Viman Nagar with price clusters and locality overlays.

3. **Server-side Cache & GraphQL API Gateway**:
   - Build a lightweight Node/Express/GraphQL proxy server with Redis caching to serve pre-deduplicated, unit-converted listings with sub-10ms response times.

---

## 🤖 LLM Usage Disclosure

In accordance with internship instructions, AI tools (Google Gemini / Cursor) were utilized during development:
- **Use Cases**: Assisting with initial shell script data collection scripts, crafting CSS glassmorphic tokens, and verifying statistical distributions of dataset fields.
- **Verification**: All 18 findings and 10 submission answers were manually tested, reproduced, and verified against the running server API at `https://solve.ivy.homes`.
