# Multi-Agent Intelligence Matrix

A sophisticated multi-agent system designed to provide intelligent travel planning and recommendations through coordinated autonomous agents. This application combines AI-powered weather analysis, route optimization, budget planning, and travel summarization.

## Features

- **Weather Agent**: Real-time weather data analysis and forecasting
- **Route Agent**: Intelligent route optimization and navigation planning
- **Budget Agent**: Smart budget tracking and financial recommendations
- **Summary Agent**: Comprehensive travel itinerary summarization
- **Interactive Dashboard**: Beautiful, responsive UI for real-time agent operation tracking
- **Agent Logs**: Detailed logging and visualization of agent activities

## Project Structure

```
├── backend/                    # Python backend with multi-agent orchestration
│   ├── main.py                # Application entry point
│   ├── orchestrator.py        # Agent coordination and management
│   ├── requirements.txt       # Python dependencies
│   └── agents/                # Individual agent implementations
│       ├── budget_agent.py
│       ├── route_agent.py
│       ├── summary_agent.py
│       └── weather_agent.py
├── frontend/                  # React/Vite frontend
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── main.jsx          # Entry point
│   │   └── components/       # React components
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── app.js                     # Root application file
├── index.html                 # Root HTML
├── package.json               # Root dependencies
└── style.css                  # Global styles
```

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Backend

```bash
cd backend
python main.py
```

The backend server will start and be ready to handle agent orchestration requests.

### Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default).

## Usage

1. Open the frontend in your browser
2. Use the InputForm to provide travel parameters
3. Monitor agent activities in real-time through the Agent Logs panel
4. View recommendations from individual agents:
   - Hotel recommendations
   - Route maps and navigation
   - Budget analysis and suggestions
   - Travel summary and itinerary

## Components

### Frontend Components
- **InputForm**: Collects user travel requirements
- **AgentLogs**: Displays real-time agent operation logs
- **MapView/RouteMap/AnimatedRouteMap**: Interactive route visualization
- **BudgetCard**: Budget recommendations and analysis
- **HotelRecommendations**: Accommodation suggestions
- **ItineraryPanel**: Structured travel itinerary
- **SummaryCards**: Overview of agent recommendations
- **ExploreNearby**: Nearby attractions and points of interest

### Backend Agents
- **BudgetAgent**: Analyzes expenses and provides financial recommendations
- **RouteAgent**: Optimizes travel routes and provides navigation
- **SummaryAgent**: Generates comprehensive travel summaries
- **WeatherAgent**: Provides weather forecasts and analysis

## Technologies Used

**Frontend:**
- React
- Vite
- Tailwind CSS
- PostCSS

**Backend:**
- Python
- Multi-agent orchestration system

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the repository.

