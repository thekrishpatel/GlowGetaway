import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './HotelInfo.css';

const HotelInfo = () => {
    const [hotel, setHotel] = useState(null);
    const { id } = useParams(); // Get the hotel ID from the URL

    useEffect(() => {
        fetch(`http://localhost:5000/api/hotels/${id}`) // Fetch data for a specific hotel
            .then(response => response.json())
            .then(data => setHotel(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

    const contactHotel = () => {
        // Replace this with the actual contact URL or function
        alert(`Contacting ${hotel.name}...`);
    };

    const bookHotel = () => {
        // Replace with the actual booking URL, e.g., MakeMyTrip or other booking sites
        window.open(`https://www.makemytrip.com/hotels/${hotel.name.replace(/\s+/g, '-').toLowerCase()}`, '_blank');
    };

    return (
        <div className="hotel-info-container">
            <div className="hotel-info-card">
                <h1>{hotel.name}</h1>
                <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                <p><strong>Location:</strong> {hotel.location}</p>
                <p><strong>Reviews:</strong> {hotel.reviews}</p>
                <p>{hotel.description}</p>
                <div className="hotel-buttons">
                    <button onClick={contactHotel} className="contact-button">Contact Hotel</button>
                    <button onClick={bookHotel} className="book-button">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default HotelInfo;
