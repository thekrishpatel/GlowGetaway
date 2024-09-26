// src/data.js
export const states = [
    { name: 'Gujarat', cities: ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot'] },
    { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'] },
    // Add other states and their cities here
  ];
  
  export const defaultCities = states.reduce((acc, state) => {
    state.cities.forEach(city => acc[city] = state.name);
    return acc;
  }, {});
  