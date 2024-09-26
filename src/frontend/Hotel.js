import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hotel.css';

const Hotel = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterReviews, setFilterReviews] = useState('');
  const places = ["DIU", "GOA", "Kumbalgarh", "Manali", "Ladakh", "Kerala", "Mumbai", "Delhi", "Ahmedabad", "Abu"];

  useEffect(() => {
    fetch('http://localhost:5000/api/hotels')
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
        setFilteredHotels(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Filter hotels based on location and reviews
  const handleFilter = () => {
    let filtered = hotels;

    if (filterLocation) {
      filtered = filtered.filter((hotel) =>
        hotel.location?.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    if (filterReviews) {
      filtered = filtered.filter((hotel) => {
        const reviewValue = parseFloat(hotel.reviews.split('/')[0]);
        return reviewValue >= parseFloat(filterReviews);
      });
    }

    setFilteredHotels(filtered);
  };

  // Clear all filters and show all hotels
  const handleClearFilter = () => {
    setFilterLocation('');
    setFilterReviews('');
    setFilteredHotels(hotels);
  };

  return (
    <div className="hotel-container">
      {/* Filter Section */}
      <div className="filter-section">
        <h2>Filter Hotels</h2>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {places.map((place, index) => (
            <option key={index} value={place}>
              {place}
            </option>
          ))}
        </select>
        <select
          value={filterReviews}
          onChange={(e) => setFilterReviews(e.target.value)}
        >
          <option value="">Filter by Reviews</option>
          <option value="4">4 Stars & Up</option>
          <option value="3">3 Stars & Up</option>
          <option value="2">2 Stars & Up</option>
          <option value="1">1 Star & Up</option>
        </select>
        <button onClick={handleFilter} className="filter-button">
          Apply Filters
        </button>
        <button onClick={handleClearFilter} className="clear-button">
          Clear Filters
        </button>
      </div>

      {/* Hotel Listings */}
      <div className="hotel-listings">
        <h2>Travellers' Choice: Top hotels</h2>
        <div className="hotel-cards">
          {filteredHotels.map((hotel) => (
            <Link to={`/hotels/${hotel.id}`} key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>{hotel.reviews} Stars</p>
              <p>{hotel.location}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
