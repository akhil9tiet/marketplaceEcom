# WhatsApp Gallery Showcase

A scrollytelling gallery for WhatsApp images with an admin portal.

## Features

- **Public Gallery**: A vertical scroll experience with reveal animations and a sticky details overlay.
- **Admin Portal**: A hidden dashboard (`/starDelta`) to manage listings.
- **Responsive Design**: Optimized for mobile and desktop.
- **Local Storage**: Data is persisted in the browser's local storage.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

-   `src/components`: Reusable UI components.
    -   `ScrollGallery`: Components for the public gallery.
    -   `Admin`: Components for the admin dashboard.
    -   `Shared`: Common UI elements (Button, Input, etc.).
-   `src/hooks`: Custom hooks (`useActiveSection`, `useLocalDataStore`).
-   `src/pages`: Page components (`Home`, `Admin`).
-   `src/data`: Initial seed data.

## Adding a Real Backend

Currently, the app uses `localStorage` to persist data. To add a real backend (e.g., Firebase, Supabase, or a custom API):

1.  **Create an API Service**: Replace `useLocalDataStore` with a service that fetches data from your API.
2.  **Update Hooks**: Modify `useLocalDataStore` to use `useEffect` for fetching data and `mutation` functions for updates.
3.  **Image Storage**: Instead of storing base64 strings, upload images to a storage bucket (e.g., AWS S3, Firebase Storage) and store the URL in the database.

## Admin Access

Access the admin portal at `/starDelta`. In a real application, you should add authentication (e.g., login screen) to protect this route.
