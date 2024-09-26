import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { useFirebase } from '../context/firebase';

function SignupPage() {
  const navigate = useNavigate();

  const { signupUserWithEmailAndPassword, putData } = useFirebase();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
    state: '',
    city: '',
    postalcode: ''
  });

  const stateCityMap = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Mangalore', 'Hubli', 'Belgaum'],
    TamilNadu: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'],
    UttarPradesh: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Noida'],
    Kerala: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur'],
    Punjab: ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Bathinda'],
    Delhi: ['New Delhi', 'Dwarka', 'Saket', 'Karol Bagh', 'Rohini']
    // Add more states and cities as needed
  };

  const [cities, setCities] = useState([]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value })

    // When state is selected, update the cities dropdown
    if (id === 'state') {
      const selectedCities = stateCityMap[value] || [];
      setCities(selectedCities);
      setFormData({ ...formData, state: value, city: '' }); // Clear city when state changes
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, username, mobile, state, city, postalcode } = formData;

    try {
      const user = await signupUserWithEmailAndPassword(email, password);
      const uid = user.uid;
      // Save additional user data in Firebase Realtime Database
      await putData(`/users/${ uid }`, { username, email, mobile, state, city, postalcode });
      navigate('/');
    } catch (err) {
      console.error("Signup error:", err);
    }
  };


  return (
    <div className="signup-container">
      <form className="signup-box" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <div className="input-group">
          <input type="text" id="username" placeholder=" " value={formData.username} onChange={handleInputChange} required />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-group">
          <input type="email" id="email" placeholder=" " value={formData.email} onChange={handleInputChange} required />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-group">
          <input type="password" id="password" placeholder=" " value={formData.password} onChange={handleInputChange} required />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-group">
          <input type="text" id="mobile" placeholder=" " value={formData.mobile} onChange={handleInputChange} required />
          <label htmlFor="mobile">Mobile Number</label>
        </div>
        <div className="input-group">
          <select id="state" value={formData.state} onChange={handleInputChange} required>
            <option value=""></option>
            {Object.keys(stateCityMap).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <label htmlFor="state">State</label>
        </div>

        <div className="input-group">
          <select id="city" value={formData.city} onChange={handleInputChange} required disabled={!formData.state}>
            <option value=""></option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <label htmlFor="city">City</label>
        </div>

        <div className="input-group">
          <input type="text" id="postalcode" placeholder=" " value={formData.postalcode} onChange={handleInputChange} required />
          <label htmlFor="postalcode">Postal Code</label>
        </div>
        <button className="btn btn-signup" type="submit">Sign Up</button>
        <button className="btn btn-login" onClick={handleLoginRedirect}>Already have an account? Login</button>
      </form>
    </div>
  );
}

export default SignupPage;
