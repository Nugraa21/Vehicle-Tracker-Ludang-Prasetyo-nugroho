     # Vehicle Tracker Dashboard

     A web-based dashboard for tracking vehicles, built for an internship task. Displays a list of vehicles and their details with a modern, responsive UI using React, TypeScript, TailwindCSS, and ShadCN UI.

     ## Features
     - **Vehicle List Page**: Displays vehicles in animated cards with name, status (as badges), speed, and updated time. Features a modern toggle-button filter for status (All, Active, Inactive) and sorting by name or speed.
     - **Vehicle Detail Page**: Shows detailed vehicle information (ID, odometer, fuel level, speed, timestamp, and location) with a refresh button. Location is visualized on a map (or as coordinates, depending on requirements).
     - **Conditional Navbar**: "Back to List" button appears only on the vehicle detail page for intuitive navigation.
     - **State Management**: Uses Zustand for managing vehicle data with mock API integration.
     - **Responsive Design**: Modern UI with TailwindCSS, featuring gradients, animations, and responsive layouts.
     - **Error Handling**: Displays loading states and error notifications using Sonner.

     ## Tech Stack
     - **Frontend**: React, TypeScript, Vite
     - **Styling**: TailwindCSS, ShadCN UI, tailwindcss-animate
     - **State Management**: Zustand
     - **Routing**: React Router
     - **Map (Optional)**: React Leaflet
     - **Notifications**: Sonner

     ## Prerequisites
     - Node.js v16 or higher
     - npm v8 or higher

     ## Setup Instructions
     1. Clone the repository:
        ```bash
        git clone <repository-url>
        cd vehicle-tracker-dashboard
        ```
     2. Install dependencies:
        ```bash
        npm install
        ```
     3. Run the development server:
        ```bash
        npm run dev
        ```
     4. Open `http://localhost:5173` in your browser.

     ## Build Instructions
     To create a production build:
     ```bash
     npm run build
     ```
     Preview the production build:
     ```bash
     npm run preview
     ```

     ## Project Structure
     ```
     vehicle-tracker-dashboard/
     ├── src/
     │   ├── components/
     │   │   ├── ui/              # ShadCN UI components (button, card, badge, sonner)
     │   │   ├── VehicleList.tsx   # Vehicle list page with toggle-button filter and sort
     │   │   └── VehicleDetail.tsx # Vehicle detail page with map or coordinates
     │   ├── lib/
     │   │   └── utils.ts         # Utility functions for TailwindCSS
     │   ├── App.tsx              # Main layout with conditional navbar
     │   ├── main.tsx             # Entry point
     │   ├── store.ts             # Zustand store with mock data
     │   └── index.css            # TailwindCSS and Leaflet styles
     ├── tailwind.config.js       # TailwindCSS configuration
     ├── components.json          # ShadCN UI configuration
     ├── tsconfig.json            # TypeScript configuration
     ├── vite.config.ts           # Vite configuration
     ├── package.json             # Dependencies and scripts
     └── README.md                # Project documentation
     ```

     ## Mock Data
     The app currently uses mock data in `store.ts`. To integrate with a real API, update the `fetchVehicles` and `fetchVehicleDetail` functions in `store.ts` with your API endpoints.

     ## Future Improvements
     - Integrate real API endpoints.
     - Add more filters (e.g., by speed or updated time).
     - Implement dark mode using TailwindCSS.
     - Deploy to Vercel for a live demo.

     ## License
     MIT License
     ```