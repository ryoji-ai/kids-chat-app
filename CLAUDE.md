# CLAUDE.md

## Project: Cute Chat for Kids (Elementary School)

### 1. Overview
A web-based chat application designed for an elementary school girl and her friends.
**Key Philosophy**: Safe, Simple, Cute ("Kawaii"), and Fun.

### 2. Tech Stack & Environment
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with a custom "kawaii" preset for pastel colors)
- **Backend/DB**: Firebase v9+ (Authentication, Firestore, Storage)
- **Deployment**: Vercel (recommended)

### 3. Core Features & Requirements

#### A. Authentication (Simplified for Kids)
- **No Email/Password**: Kids should not need emails.
- **Method**: "Select User" + "Passphrase".
- **Flow**:
  1. User picks their name/icon from a list (e.g., "Hanako", "Pap", "Mama").
  2. User enters the shared secret passphrase: **`やまて`** (Yamate).
  3. If correct, session starts.

#### B. Safety Controls (Parental)
- **Invite Only**: Users are pre-registered in the database (no public sign-up).
- **Curfew System (IMPORTANT)**:
  - **Rule**: Messaging is disabled between **20:00 (8 PM)** and **06:00 (6 AM)**.
  - **Behavior**: If a user tries to type or send after 20:00, show a cute "It's bedtime! Goodnight" overlay. The input field should be disabled.
- **Monitoring**: Parents have a view to see all messages.

#### C. Communication
- **Text**: Simple text messaging.
- **Stamps**: One-click sending of preset cute images/emojis.
- **Photos**: Ability to upload photos (via Firebase Storage).

### 4. UI/Design Guidelines ("Kawaii")
- **Color Palette**:
  - Primary: Soft Pink (`#FFB7B2`)
  - Secondary: Mint Green (`#E2F0CB`)
  - Accent: Lavender (`#C7CEEA`)
  - Text: Dark Grey (not pure black) for softness.
- **Typography**:
  - Use rounded fonts (e.g., Zen Maru Gothic or M PLUS Rounded 1c from Google Fonts).
- **Components**:
  - **Buttons**: Very rounded (pill shape), bouncy hover effects.
  - **Chat Bubbles**: Pastel colored backgrounds, rounded corners.
  - **Background**: Maybe a subtle pattern (dots, stripes) or soft gradient.

### 5. Data Structure (Firestore Schema)

#### `users`
- `id`: string
- `displayName`: string (e.g. "Hanako")
- `avatarUrl`: string
- `role`: 'kid' | 'parent'

#### `messages`
- `id`: string
- `senderId`: string
- `content`: string (text)
- `type`: 'text' | 'image' | 'stamp'
- `mediaUrl`: string (optional, for images/stamps)
- `createdAt`: serverTimestamp
