import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling

const teamMembers = [
    {
        name: 'Krish Patel',
        linkedin: 'https://www.linkedin.com/in/thekrishpatel/',
        phone: '+91 7778071999',
    },
    {
        name: 'Pranay Patel',
        linkedin: 'https://www.linkedin.com/in/pranay-patel/',
        phone: '+91098-765-4321',
    },
    {
        name: 'Hemang Patel',
        linkedin: 'https://www.linkedin.com/in/hemang-patel/',
        phone: '+91-112-233-4455',
    },
];

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <p>
                Welcome to our project! We are a dedicated team of professionals committed to delivering exceptional services and creating innovative solutions.
            </p>
            <p>
                Our project aims to revolutionize the industry by providing a unique platform that offers value and convenience to our users.
            </p>
            <h2>Meet the Team</h2>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <h3>{member.name}</h3>
                        <p>
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </p>
                        <p>Phone: {member.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
