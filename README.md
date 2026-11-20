
# Coy Discover

A mobile-first dating discovery application inspired by modern swipe-based platforms.

## Features

- Discover profiles one at a time.
- Like or pass profiles using buttons or drag gestures.
- Smooth swipe card animations.
- 30 mock user profiles.
- Mutual likes create a match.
- Matches are displayed in a separate Matches tab.
- Swiped profiles do not appear again after page reload.
- Responsive mobile-first interface.

## Tech Stack

- Next.js
- React.js
- JavaScript
- CSS
- Node.js
- Next.js Route Handlers
- SQLite
- Prisma ORM

## Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/aurabhsing-hue/coy-discover.git
   ```

2. Open the project directory:

   ```bash
   cd coy-discover
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and configure the database URL:

   ```env
   DATABASE_URL="file:./dev.db"
   ```

5. Run database migration:

   ```bash
   npx prisma migrate dev
   ```

6. Seed mock profiles:

   ```bash
   npx prisma db seed
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

8. Open http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/feed` | Fetch profiles not yet swiped |
| POST | `/api/swipe` | Save a Like or Pass and check for a match |
| GET | `/api/matches` | Fetch mutual matches |

### POST /api/swipe

Request body:

```json
{
  "profileId": "1",
  "action": "like"
}
```

Possible actions: `like`, `pass`.

## Matching Logic

A match is created only when the current user likes a profile that has already liked the current user.

Profiles that have liked the current user are not exposed through the feed API.

## Demo

This project uses mock profile data and assumes a single logged-in user, as specified in the assignment.

## Author

Saurabh Singh

