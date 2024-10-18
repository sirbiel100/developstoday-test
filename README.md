# Country Info App

This is a Country Info Application built using **Next.js** as the frontend framework, with **MIUI X-Charts** used for rendering population charts. The app allows users to view detailed information about countries, including population data, and explore neighboring countries through a clickable interface.

## Tech Stack

- **React.js**
- **Next.js** (preferred framework)
- **MIUI X-Charts** (for population chart visualization)
- **SCSS** for styling

## Features

1. **Country List Page**
   - Displays a list of countries fetched from an API endpoint.
   - Each country name is clickable, navigating the user to the **Country Info Page** for that country.

2. **Country Info Page**
   - Displays detailed information about a selected country.
     - **Country Name**: Displayed prominently at the top.
     - **Country Flag**: Displayed alongside the country name using the URL fetched from the backend.
   - **Border Countries Widget**:
     - Displays a list of countries that share a border with the selected country.
     - Each border country name is clickable and navigates the user to the corresponding **Country Info Page**.
   - **Population Chart**:
     - Shows a chart displaying the country’s population over time.
     - The X-axis represents the years, and the Y-axis represents the population.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v12.x or above)
- npm or yarn package manager

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-repo/developstoday-test.git
    cd developstoday-test
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. Create a `.env.local` file in the root directory of the project and add any necessary environment variables such as API endpoints.

### Running the Application

1. To start the development server, run:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

2. Open your browser and go to `http://localhost:3000` to view the app.

### Building for Production

To create a production build, run:

```bash
npm run build
```