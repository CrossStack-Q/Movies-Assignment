# 🎬 Movie Directory Project
**Made by Anurag Sharma** for RaftLabs SDE Intern Assignment.

---

## 📌 Overview
This project is a complete movie & show exploration website built using **Next.js 14 (App Router)** and **Tailwind CSS**.  
All datasets used in this project are **fully created manually** (no external APIs), including:

- `movies.json`
- `explore.json`
- `schedule.json`

Images used in the app were manually gathered from the web and stored in the `public/` folder.  
Some home‑page movies also include YouTube trailer links.

The goal of this assignment is to demonstrate:
- Clean UI/UX design  
- Dynamic routing with Next.js App Router  
- Programmatic page generation  
- Good component structure  
- Filters, sorting, search & detail pages  
- Deployment on Vercel  

---

## 📦 Features

### 🔍 Explore Page
- Multiple custom categories: Talk of the Town, Editor’s Picks, Coming Soon, Popular Now.
- Powered by `explore.json`
- Clicking any movie → detail page

### 🗓️ Schedule Page
- Grouped by **Released / Today / Upcoming / Announced**
- Left sidebar is sticky
- Right side is scrollable
- Advanced type filters: **Movie / Series / Theatre / OTT**
- Uses `schedule.json`

### 🎥 Movie Detail Page (`/content/[slug]`)
- Dynamic routing
- Poster, backdrop, metadata, overview
- Vibe chart + custom meter component
- Trailer modal (YouTube)
- Fully powered by `movies.json`

### 🏠 Home Page Listing
- Search, Sort (A–Z, Newest, Oldest, Rating)
- Filters: Genre, Type, Language
- Fully responsive

---

## 🗂 Dataset Details (Created Manually)

### **1. movies.json**
Contains:
- title  
- slug  
- year  
- rating  
- type  
- genre  
- language  
- poster  
- backdrop  
- overview  
- trailer (for some movies via YouTube link)

### **2. explore.json**
Categorised lists for explore section.

### **3. schedule.json**
Pre‑grouped schedule data for different release statuses.

### **Images Source**
All posters / backdrops were manually collected and stored inside:
```
public/explore_files/
public/schedule_files/
public/posters/
```

---

## 🔧 How Data Was Created
- All datasets were written manually from scratch.
- Images manually saved from public websites.
- Added trailer links for 3–4 movies (YouTube).
- Ensured consistent JSON structure across all datasets.

_No API scraping or external automation used._

---

## 🔨 Tech Stack
- **Next.js 14 (App Router)**
- **React**
- **Tailwind CSS**
- **Static JSON datasets**
- **Fully responsive**
- **Client + Server rendering**

---

## 📁 Folder Structure
```
src/
  app/
    explore/
    schedule/
    content/[slug]/
    page.tsx
    layout.tsx
    globals.css

  components/
    Navbar.tsx
    TypeTabs.tsx
    MovieCard.tsx
    ReleaseSection.tsx
    VibeChart.tsx
    Meter.tsx

  data/
    movies.json
    explore.json
    schedule.json

public/
  explore_files/
  schedule_files/
  posters/
```

---

## ▶️ Running the Project
```
npm install
npm run dev
```

Build:
```
npm run build
npm start
```

---

## 🚀 Deployment on Vercel
1. Push repo to GitHub  
2. Import repo into Vercel  
3. Select **Next.js** preset  
4. Deploy  

---

## 🤖 Example AI Prompts Used
Even though dataset was created manually, AI tools were used for formatting and scaffolding.

### Prompt 1 – Folder Structure
```
Suggest a clean Next.js App Router project structure for a movie website using static JSON files.
```

### Prompt 2 – UI Styling
```
Generate Tailwind CSS code for a modern movie card with hover animation and dark-mode support.
```

### Prompt 3 – Dynamic Page Logic
```
How to generate dynamic movie pages using [slug] route in Next.js App Router?
```

---

## ⏭️ What I Would Improve With 2 More Days
1. Add YouTube trailer link to every movie inside JSON dataset.  
2. Make dataset more structured and backend‑friendly (more movies, more metadata).  
3. Add a categories section with hover icons and micro‑interactions.  
4. Add Framer Motion animations for smoother transitions.  
5. Improve SEO metadata (OpenGraph, sitemap).  
6. Add user reviews or ratings page.  

---

## 📌 Dynamic Routing
This project uses:
```
/content/[slug]
```
with `generateStaticParams()` for fully static SSG pages.  
Each movie detail page is generated from `movies.json`.

---

## 🙌 Closing Note
This project was built with a focus on:
- clean UI  
- custom datasets  
- solid component structure  
- fast execution  

