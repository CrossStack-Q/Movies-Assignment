# Movie Assignment Project

Made by Anurag Sharma for Assignment.

## Overview

This project is a complete movie exploration and schedule application built using Next.js 14 (App Router), Tailwind CSS, and fully static JSON-based data for movies, schedules, upcoming releases, and more.

The purpose of the project is to showcase UI development, data management, dynamic routing, and component structuring in a production-like environment while keeping the system simple, readable, and performant.

The application includes:
- Explore page with categorized lists
- Schedule page with date grouping and filters
- Movie detail pages with dynamic routing
- Type-based and mode-based filtering
- Complete movie metadata rendered from movies.json
- Reusable UI components
- Clean folder structure and maintainable code

## Features

### Explore Page
- Displays multiple movie categories such as Talk of the Town, Editor's Picks, Coming Soon, and Popular Now.
- Uses data from explore.json
- Clicking a movie opens its details page

### Schedule Page
- Displays grouped releases by date (Released, Today, Upcoming, Announced)
- Fully scrollable right content section
- Left sidebar is sticky
- Advanced filters using TypeTabs (Movies, Series, OTT, Theatre)
- Movie cards grouped by release date
- Uses schedule.json

### Movie Details Page
- Built dynamically using /content/[slug]
- Displays poster, backdrop, year, metadata, overview
- Vibe chart
- Moctale meter (semi-circle meter)
- Cast, crew, tickets, reviews section support
- Trailer modal with embedded player
- Works with movies.json file containing ~70 entries

### Home Page Movies Listing
- Full searchable grid listing of all movies from movies.json
- Sorting: Newest, Oldest, Alphabetical, Rating
- Filters: Type, Genre, Language
- Click card → navigate to detail page

## Tech Stack

- Next.js 14 (App Router)
- React
- Tailwind CSS
- JavaScript / TypeScript compatible
- Static JSON datasets
- Responsive layout
- Fully client and server mix rendering

## Folder Structure

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
    ScheduleFilters.tsx
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

## Running the Project

### Install dependencies
npm install

### Run development server
npm run dev

### Build for production
npm run build
npm start

## Deployment

This project can be deployed easily using Vercel.

Steps:
1. Push your project to a GitHub repository
2. Open https://vercel.com
3. Import your repository
4. Select framework: Next.js
5. Deploy

## Data Files

- movies.json contains full metadata for every show/movie
- explore.json holds category data
- schedule.json holds released/today/upcoming/announced data

All images are stored inside public/explore_files and public/schedule_files.
