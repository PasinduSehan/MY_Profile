
# MY Profile

A modern, interactive personal portfolio website for Pasindu Weerathunga built with React, TypeScript, Vite, Tailwind CSS, and Node.js. The project showcases professional experience, education, skills, services, featured projects, certificates, and contact information in a visually rich experience with animated sections, 3D background effects, and a built-in CV viewer.

## Overview

This portfolio is designed to act as both a personal brand page and a professional showcase. It includes:

- A polished landing experience with animated sections and a custom cursor
- An interactive command palette for fast navigation
- A dark/light theme switcher
- A downloadable CV and transcript viewer
- An AI-powered assistant experience powered by Gemini
- Project cards and GitHub-inspired stats sections

## Key Features

- Responsive single-page portfolio experience
- Smooth motion-based transitions and section animations
- 3D animated background using Three.js
- Command palette navigation with keyboard shortcuts
- CV modal with PDF preview and download options
- Transcript preview and download support
- Contact section with professional information
- Express server with API endpoints for chat and GitHub data
- Environment-based configuration for AI integration

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Motion (animation library)
- Lucide React icons
- Three.js / React Three Fiber

### Backend / Server
- Node.js
- Express
- dotenv
- Google GenAI SDK

## Project Structure

- [src](src) - Main React application source files
- [src/components](src/components) - Reusable UI components
- [src/data.ts](src/data.ts) - Portfolio content and project data
- [public](public) - Static assets including CV and transcript PDFs
- [server.ts](server.ts) - Express server for API and production serving
- [generate-pdf.js](generate-pdf.js) - PDF generation script used during build

## Prerequisites

- Node.js 18+ recommended
- npm

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a environment file named `.env` in the project root and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm start` - Start the production server
- `npm run lint` - Run TypeScript validation
- `npm run clean` - Remove build output

## Build and Run Production

```bash
npm run build
npm start
```

## Deployment Notes

This project is ready for deployment on platforms that support Node.js applications.

Example deployment settings:
- Build Command: `npm run build`
- Start Command: `npm start`

If you deploy on a platform like Railway or Render, make sure the environment variable `GEMINI_API_KEY` is configured.

## Environment Variables

| Variable | Description |
| --- | --- |
| `GEMINI_API_KEY` | API key for the Gemini-powered AI assistant |
| `PORT` | Optional port override for the Express server |

## Notes

- The app includes a fallback experience for the AI assistant if the Gemini API is unavailable.
- CV and transcript PDF files are stored in [public](public) and opened directly through the UI.
- The project is designed to be easily extended with more sections, projects, or integrations.

## Contact

For inquiries or collaboration, you can reach out through the contact information shown in the portfolio or via the links included in the project content.
 