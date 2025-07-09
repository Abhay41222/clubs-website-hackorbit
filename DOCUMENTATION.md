# Campus Connect - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Technical Architecture](#technical-architecture)
3. [Features & Functionality](#features--functionality)
4. [User Flow](#user-flow)
5. [Route Structure](#route-structure)
6. [API Documentation](#api-documentation)
7. [Setup & Installation](#setup--installation)
8. [Team](#team)

---

## Overview

Campus Connect is a comprehensive student platform designed to solve the discovery problem in college life. It provides a centralized hub for students to find clubs, events, and communities that match their interests and vibe.

### Mission
Making it dead simple for students to discover and connect with clubs, events, and communities on campus, eliminating the frustration of scattered information across multiple platforms.

### Key Problems Solved
- **Information Fragmentation**: No more searching through endless WhatsApp groups or buried emails
- **Discovery Challenges**: Easy exploration of clubs and events based on interests
- **Community Building**: Seamless connection between students with similar interests
- **Event Management**: Centralized platform for event discovery and RSVP management

---

## Technical Architecture

### Frontend Stack
- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.0
- **Styling**: Tailwind CSS 4.1.11
- **Animations**: Framer Motion 12.23.0
- **Routing**: React Router DOM 7.6.3
- **Data Fetching**: SWR 2.3.4
- **Icons**: Lucide React 0.525.0
- **Type Effects**: Typed.js 2.1.0

### Backend Stack
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Storage**: Supabase Storage

### Project Structure
```
campus-connect/
├── src/
│   ├── public/          # Public routes (no auth required)
│   ├── protected/       # Protected routes (auth required)
│   ├── private/         # Private routes (club admin/moderator)
│   ├── admin/           # Admin-only routes
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── services/        # API services
│   ├── routes/          # Route protection components
│   ├── widgets/         # Layout components
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── cc-api/              # API functions
└── public/              # Static assets
```

---



---

## User Flow

### New User Journey
1. **Landing**: Visit homepage and explore features
2. **Sign Up**: Create account with email verification
3. **Profile Setup**: Complete profile information
4. **Discovery**: Browse clubs and events
5. **Engagement**: Follow clubs and RSVP to events
6. **Community**: Connect with other students

### Returning User Journey
1. **Sign In**: Quick authentication
2. **Dashboard**: View personalized content
3. **Browse**: Explore new clubs and events
4. **Manage**: Update profile and preferences
5. **Participate**: Engage with community

---

## Route Structure

### Public Routes (No Authentication Required)
- `/` - Home page
- `/clubs` - Browse all clubs
- `/clubs/:clubId` - Individual club page
- `/events` - Browse all events
- `/events/:eventId` - Individual event page
- `/about` - About the platform
- `/confirm` - Email confirmation page

### Authentication Routes
- `/sign-in` - Sign in/Sign up page

### Protected Routes (Authentication Required)
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/fill-details` - Complete profile setup

### Admin Routes (Admin Access Only)
- `/admin` - Admin dashboard

---

### ByteBenders Team
Building the platform we wish we had when we started college.

#### Team Members

**Harsh Rajpal** 
**Krishna Kant** 
**Arpit Gupta**
**Abhay Bhadoriya** 

---

## Development Notes

### Current Status
- **Frontend**: Fully functional with responsive design
- **Authentication**: Complete sign-up/sign-in flow
- **Data Layer**: Supabase integration with real-time capabilities
- **UI/UX**: Modern, clean interface with smooth animations

### Future Enhancements
- **Interview Scheduling and Results 
- **Certificate Generation and Verification Using BlockChain
- **Push Notifications**: Real-time event and club updates
- **Advanced Search**: AI-powered recommendation system
- **Social Features**: Direct messaging and group chats
- **Analytics Dashboard**: Detailed insights for club administrators



*Documentation last updated: July 2025*
*Team: ByteBenders - Campus Connect*
