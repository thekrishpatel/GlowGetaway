import React, { useState, useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import './Profile.css';

const Profile = () => {
    const { user, getUserData, logoutUser } = useFirebase();
    const [userData, setUserData] = useState(null);

    // get profile data
    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const data = await getUserData(user.uid);
                setUserData(data);
            } else {
                console.log('User is not authenticated or UID is missing');
            }
        };
        fetchUserData();
    }, [user, getUserData])

    // Handle logout
    const handleLogout = () => {
        logoutUser().then(() => {
            window.location.href = '/';
        });
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {userData ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.mobile}</p>
                    <p><strong>State:</strong> {userData.state}</p>
                    <p><strong>City:</strong> {userData.city}</p>
                    <p><strong>Pincode:</strong> {userData.postalcode}</p>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default Profile;