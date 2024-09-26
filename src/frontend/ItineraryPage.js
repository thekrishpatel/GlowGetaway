import React, { useState } from 'react';
import './ItineraryPage.css'; // Optional for styling

const ItineraryPage = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [days, setDays] = useState(1);
    const [itinerary, setItinerary] = useState([]);
    const [error, setError] = useState('');

    const places = ["DIU", "GOA", "Kumbalgarh", "Manali", "Ladakh", "Kerala", "Mumbai", "Delhi", "Ahmedabad", "Abu"];

    // Fetch itinerary based on input
    const fetchItinerary = (event) => {
        event.preventDefault();

        if (source === destination) {
            setError("Source and destination cannot be the same.");
            return;
        }
        setError(''); // Reset error

        fetch('http://localhost:5000/api/itinerary', { // Your API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ source, destination, days: parseInt(days) })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Debugging log to see the actual response
                // Check if the response data has the expected structure
                if (data && Array.isArray(data.itinerary)) {
                    setItinerary(data.itinerary);
                } else {
                    setError("No itinerary found for the selected route.");
                    setItinerary([]); // Set itinerary to an empty array if not found
                }
            })
            .catch(error => {
                console.error('Error fetching itinerary:', error);
                setError("There was an error fetching the itinerary.");
                setItinerary([]); // Clear the itinerary on error
            });
    };

    // Function to download the itinerary PDF
    const downloadPDF = () => {
        fetch('http://localhost:5000/api/download-itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                itinerary,
                source,
                destination,
                days,
            }),
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                // Set the filename format as desired
                a.download = `itinerary_from_${source.replace(/ /g, '_')}_to_${destination.replace(/ /g, '_')}.pdf`;

                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => console.error('Error downloading PDF:', error));
    };


    return (
        <div className="itinerary-page">
            <h1>Travel Itinerary Planner</h1>

            <form onSubmit={fetchItinerary}>
                <div className="form-group">
                    <label htmlFor="source">Source:</label>
                    <select id="source" value={source} onChange={e => setSource(e.target.value)} required>
                        <option value="">Select Source</option>
                        {places.map(place => <option key={place} value={place}>{place}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="destination">Destination:</label>
                    <select id="destination" value={destination} onChange={e => setDestination(e.target.value)} required>
                        <option value="">Select Destination</option>
                        {places.map(place => <option key={place} value={place}>{place}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="days">Number of Days:</label>
                    <input
                        type="number"
                        id="days"
                        value={days}
                        onChange={e => setDays(e.target.value)}
                        min="1"
                        max="10"
                        required
                    />
                </div>

                <button type="submit">Get Itinerary</button>
            </form>

            {error && <p className="error">{error}</p>}

            {itinerary.length > 0 && ( // Check if itinerary exists and has content
                <div className="itinerary-result">
                    <h2>Your Itinerary</h2>
                    {itinerary.map((day, index) => {
                        // Split the day string into a title and the rest of the activities
                        const [dayTitle, ...activities] = day.split(':');
                        return (
                            <div key={index} className="day-entry">
                                {/* Display the first part of the day as the main title */}
                                <div key={0} className="activity">
                                    {dayTitle.trim()}
                                </div>
                                {/* Map through the rest of the activities after the first part */}
                                {activities.join(':') // Rejoin the remaining activities as a string
                                    .split(',')
                                    .map((activity, i) => (
                                        <div key={i + 1} className="activity">
                                            {activity.trim()}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                    {/* Button to download itinerary as PDF */}
                    <button onClick={downloadPDF} className="download-button">
                        Download Itinerary as PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItineraryPage;
