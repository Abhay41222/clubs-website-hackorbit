# Campus Connect

A modern web app to discover, join, and participate in campus clubs and events.

## Features

- Browse and search for clubs and events
- RSVP to events and follow clubs
- User authentication and profile management
- Admin and moderator dashboards
- Built with React, TypeScript, Vite, Tailwind CSS, and Supabase

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Supabase project (for backend/database)

## Getting Started

1. Clone the Repository

    git clone <repository-url>
    cd campus-connect

2. Install Dependencies

    npm install
    # or
    yarn install

3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Start the Development Server

    npm run dev
    # or
    yarn dev

The app will be available at http://localhost:5173 (or as shown in your terminal).

5. Build for Production

    npm run build
    # or
    yarn build

6. Preview Production Build

    npm run preview
    # or
    yarn preview

## Project Structure

- src/ — Main source code (components, pages, hooks, services, etc.)
- public/ — Static assets
- mock_data/ — Mock data for development/testing
- contexts/ — React context providers (e.g., Auth)
- widgets/ — UI widgets like Navbar, Footer

## Environment Variables

- VITE_SUPABASE_URL — Your Supabase project URL
- VITE_SUPABASE_ANON_KEY — Your Supabase anon/public API key

---

For backend/serverless API setup, see the backend folder and its README.






