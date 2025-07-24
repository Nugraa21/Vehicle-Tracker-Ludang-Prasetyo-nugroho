# Vehicle Tracker Dashboard

A frontend dashboard built with React, TypeScript, TailwindCSS, Zustand, and ShadCN UI components to display vehicle telemetry data, developed for a frontend take-home assignment.

## Features
- **Vehicle List Page**: Displays vehicles in animated cards with name, status (as green/red badges), speed, and updated time. Includes toggle-button filters (All, Active, Inactive) and sorting by name or speed.
- **Vehicle Detail Page**: Shows detailed vehicle information (ID, odometer, fuel level, speed, timestamp) and an interactive map (using react-leaflet) for location visualization, with a refresh button.
- **Conditional Navbar**: "Back to List" button appears only on the vehicle detail page for intuitive navigation.
- **API Integration**: Uses JSON Server for mock API endpoints (`GET /vehicles`, `GET /vehicleDetails/:id`). Ready for real API integration if provided.
- **Responsive Design**: Modern UI with TailwindCSS, featuring gradient backgrounds, animations, and layouts optimized for mobile, tablet, and desktop.
- **Error Handling**: Displays loading states with a spinner and error notifications using Sonner.

## Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: TailwindCSS, ShadCN UI, tailwindcss-animate
- **State Management**: Zustand
- **Routing**: React Router
- **Map**: React Leaflet
- **Notifications**: Sonner
- **Mock API**: JSON Server

## Prerequisites
- Node.js v16 or higher
- npm v8 or higher

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vehicle-tracker-dashboard


Install dependencies:npm install


Install JSON Server globally (for mock API):npm install -g json-server


Run JSON Server in a separate terminal:json-server --watch db.json --port 3001


Run the development server:npm run dev


Open http://localhost:5173 in your browser.

Build Instructions
To create a production build:
npm run build

Preview the production build:
npm run preview

API Endpoints

GET http://localhost:3001/vehicles: Fetches the list of vehicles.
GET http://localhost:3001/vehicleDetails/:id: Fetches details for a specific vehicle by ID.
To integrate a real API, update fetchVehicles and fetchVehicleDetail in src/store.ts with the provided endpoint URLs.

Testing API Endpoints
The mock API has been tested successfully using:

Browser: http://localhost:3001/vehicles and http://localhost:3001/vehicleDetails/1 return expected JSON data.
cURL:curl http://localhost:3001/vehicles
curl http://localhost:3001/vehicleDetails/1


Postman: GET requests to the above URLs return correct responses.To test locally:


Ensure JSON Server is running (json-server --watch db.json --port 3001).
Use a browser, cURL, or Postman to verify endpoints.

Project Structure
vehicle-tracker-dashboard/
├── src/
│   ├── components/
│   │   ├── ui/              # ShadCN UI components (button, card, badge, sonner)
│   │   ├── VehicleList.tsx   # Vehicle list page with toggle-button filter and sort
│   │   └── VehicleDetail.tsx # Vehicle detail page with interactive map
│   ├── lib/
│   │   └── utils.ts         # Utility functions for TailwindCSS
│   ├── App.tsx              # Main layout with conditional navbar
│   ├── main.tsx             # Entry point
│   ├── store.ts             # Zustand store with API integration
│   └── index.css            # TailwindCSS and Leaflet styles
├── db.json                  # Mock API data for JSON Server
├── tailwind.config.js       # TailwindCSS configuration
├── components.json          # ShadCN UI configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation

Deployment
To deploy to Vercel for a live demo (optional):

Install Vercel CLI:npm install -g vercel


Login and deploy:vercel login
vercel


For a public mock API, host db.json on MockAPI.io or Render and update store.ts with the public URLs.

Notes

The interactive map in VehicleDetail.tsx uses react-leaflet to enhance UX by visualizing vehicle location, exceeding the minimum requirement of displaying coordinates.
The project is ready for real API integration. Provide endpoint URLs to replace the mock API in store.ts.

Future Improvements

Integrate real API endpoints if provided.
Add filters for speed or updated time.
Implement dark mode with TailwindCSS.
Enhance map with custom vehicle icons.

License
MIT License```
