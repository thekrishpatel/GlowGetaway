# GlowGetaway

GlowGetaway is a travel planning application that allows users to explore various destinations, find hotels, and plan their trips. The app features a user-friendly interface, vibrant visuals, and robust backend support for managing user data and hotel listings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse and discover various travel destinations
- Search for hotels with detailed information
- User accounts for personalized trip planning
- Responsive design for mobile and desktop
- Integration with external APIs for real-time data

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Flask (Python)
- **Database**: MongoDB
- **APIs**: yFinance for stock analysis
- **Libraries**: Pandas, NumPy, Scikit-learn, Matplotlib, etc.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GlowGetaway.git
   cd GlowGetaway
   ```

2. Install the backend dependencies:
   ```bash
   cd src
   pip install -r requirements.txt
   ```

3. Install the frontend dependencies:
   ```bash
   cd ../public
   npm install
   ```

4. Start the backend server:
   ```bash
   python app.py
   ```

5. Start the frontend application:
   ```bash
   npm start
   ```

## Usage

- Open your web browser and navigate to `http://localhost:3000` to access the application.
- Explore the available destinations, and hotels, and create personalized travel itineraries.

## Folder Structure

```
/GlowGetaway
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   └── ...
├── README.md
├── src
│   ├── App.css
│   ├── App.js
│   ├── app.py
│   ├── frontend
│   └── ...
└── ...
```

- **public/**: Contains static files including images and HTML.
- **src/**: Contains source files including frontend components and backend logic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements, bug fixes, or new features.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
