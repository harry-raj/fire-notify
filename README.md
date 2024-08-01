# Firebase React Notification Demo

## Description

This is a simple Single Page Application built with React, TypeScript, and Vite. The application demonstrates the usage of Firebase for notifications, utilizing Firebase emulators for development. Users can click on one of three buttons to receive a notification corresponding to the button they pushed. When a user views a notification, it is marked as "read".

## Features

- React + TypeScript + Vite
- Firebase for notifications
- Firebase emulators for local development
- Tailwind CSS for styling
- Simple notification system
  - Three buttons for triggering notifications
  - Notifications are marked as "read" when viewed

## Installation

### Prerequisites

- Node.js and npm installed
- Firebase CLI installed
- Vite installed

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/harry-raj/fire-notify.git
    cd fire-notify
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Set up the Firebase emulators by running:
      ```bash
      firebase init emulators
      ```

4. **Configure Firebase**:
    - Copy your Firebase config from the Firebase Console and replace the placeholders in `.env`:
      ```typescript
      VITE_APP_FIREBASE_API_KEY= {API key}
      VITE_APP_FIREBASE_AUTH_DOMAIN= {Domain Name}
      VITE_APP_FIREBASE_PROJECT_ID= {Project Id}
      VITE_APP_FIREBASE_STORAGE_BUCKET= {Storage Bucket}
      VITE_APP_FIREBASE_MESSAGING_SENDER_ID= {Messaging Sender Id}
      VITE_APP_FIREBASE_APP_ID= {App Id}
      VITE_APP_FIREBASE_MEASUREMENT_ID= {Measurement ID}
      ```

5. **Run the Firebase emulators**:
    ```bash
    firebase emulators:start
    ```

6. **Start the development server**:
    ```bash
    npm run dev
    ```

## Usage

- Open the application in your browser.
- Click on any of the three buttons to trigger a notification.
- View the notifications. When viewed, the notifications will be marked as "read".

## Project Structure

```
├── public
│  
├── src
│   ├── @core
│   │   ├── interfaces
│   ├── components
│   │   ├── layout
|   |   |    ├── navbar.tsx
│   │   ├── notfication
|   |   |    ├── dropdown.tsx
|   |   |    ├── buttons.tsx
|   ├── contexts
│   │   ├── notification-context.ts
|   ├── lib
│   │   ├── firebase.ts
│   ├── main.tsx
│   ├── App.tsx
│   └── index.css
├── .gitignore
├── firebase.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Code Overview

### `src/lib/firebase.ts`

This file contains the Firebase configuration for the project.

### `src/components/notification/button.tsx`

This component renders a buttons which triggers a notification when clicked.

### `src/components/notification/dropdown.tsx`

This component displays the dropdown which has list of notifications.

### `src/components/layout/navbar.tsx`

This component renders a simple navbar.

### `src/main.tsx`

This is the entry point of the application. It initializes Firebase and renders the `App` component.

### `src/App.tsx`

This component is the main application component that includes the notification buttons and notification list.

## Styling

Tailwind CSS is used for styling the components. You can customize the styles by editing the `src/index.css` file and the `tailwind.config.ts` file.