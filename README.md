# Rick & Morty Character Dashboard

Rick & Morty characters with advanced filtering, favorites management, and character information.

## Features

- **Character Table**: View all characters 
- **Advanced Filtering**: Filter by name, status, and gender
- **Character Details**: Character pages with episode information
- **Favorites Management**: Add/remove characters from favorites
- **Pagination**: Nivigate easiliy

## Tech Stack

- **React** with TypeScript
- **TanStack Router** file-based routing
- **TanStack Query** for state management and caching
- **TanStack Table**  table features
- **Zustand** client-side state management (favorites)
- **Shadcn/ui** for UI 
- **Tailwind CSS** for styling
- **date-fns** for date formatting

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`


## API

This application uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data.

## Build

To build the application for production:

```bash
npm run build
```

## Features Implemented

- ✅ Character listing with pagination
- ✅ Filtering (name, status, gender)
- ✅ Character detail pages
- ✅ Favorites management with Zustand
- ✅ Error handling and loading states
- ✅ TypeScript throughout
- ✅ Controlled form components