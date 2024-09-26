import json
import random

# Define the list of places of interest
places_of_interest = {
    "DIU": [
        "Diu Fort", "Nagoa Beach", "Gangeshwar Temple", "St. Paul Church", "Naida Caves",
        "Jallandhar Beach", "Diu Museum", "Zampa Gateway", "Diu City Mall", "Sujangadh",
        "Diu Wildlife Sanctuary", "Devka Beach", "Jampore Beach", "Diu Lighthouse", "Panikota Fort",
        "Moti Daman Fort", "Chakratirth Beach", "Ghoghla Beach", "St. Thomas Church", "Vallabhi Archaeological Site",
        "Diu's Cathedral"
    ],
    "GOA": [
        "Baga Beach", "Fort Aguada", "Calangute Beach", "Dudhsagar Waterfalls", "Basilica of Bom Jesus",
        "Anjuna Beach", "Chapora Fort", "Arambol Beach", "Goa State Museum", "Se Cathedral",
        "Vasco da Gama", "Palolem Beach", "Tito's Lane", "Mangeshi Temple", "Shree Bhagwati Temple",
        "Sangolda Lake", "Cortalim Bridge", "Margao Market", "Casino Royale", "Benaulim Beach",
        "Don Bosco Museum"
    ],
    "Kumbalgarh": [
        "Kumbalgarh Fort", "Vedi Temple", "Mammadev Temple", "Parsvanath Temple", "Kumbalgarh Wildlife Sanctuary",
        "Badal Mahal", "Jain Temples", "Lakhota Fort", "Kumbhalgarh Archaeological Museum", "Brahma Kumari's Peace Park",
        "Ranakpur Jain Temple", "Haldighati", "Srinathji Temple", "Sas Bahu Temple", "Ratan Singh Palace",
        "Kumbalgarh Fort Wall", "Vedi Temple", "Tordi Sagar Lake", "Narlai Village", "Kumbhalgarh Viewpoint",
        "Desuri Village"
    ],
    "Manali": [
        "Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali", "Manu Temple",
        "Naggar Castle", "Tibetan Monastery", "Van Vihar", "Great Himalayan National Park", "Rahala Falls",
        "Jogini Waterfalls", "Mall Road", "Hidimba Devi Temple", "Rohtang Pass", "Kothi", "Bhrigu Lake",
        "Beas River", "Old Manali", "Pandoh Dam", "Hatu Peak", "Atal Tunnel"
    ],
    "Ladakh": [
        "Pangong Lake", "Nubra Valley", "Leh Palace", "Magnetic Hill", "Thiksey Monastery",
        "Hemis Monastery", "Zanskar Valley", "Shanti Stupa", "Lamayuru Monastery", "Tso Moriri Lake",
        "Khardung La", "Sangam Point", "Alchi Monastery", "Diskit Monastery", "Likir Monastery",
        "Changtang Wildlife Sanctuary", "Pangong Tso", "Yumthang Valley", "Stok Palace", "Moore Plains",
        "Zangla"
    ],
    "Kerala": [
        "Backwaters of Alleppey", "Munnar Tea Gardens", "Periyar National Park", "Kumarakom", "Fort Kochi",
        "Wayanad", "Athirappilly Falls", "Varkala Beach", "Kovalam Beach", "Nelliyampathy",
        "Thekkady", "Bekal Fort", "Eravikulam National Park", "Kochi", "Palakkad", "Kottayam",
        "Alleppey Houseboats", "Sabarimala Temple", "Sree Padmanabhaswamy Temple", "Chilika Lake",
        "Vypin Island"
    ],
    "Mumbai": [
        "Gateway of India", "Marine Drive", "Elephanta Caves", "Chor Bazaar", "Mumbai Zoo",
        "Colaba Causeway", "Haji Ali Dargah", "Juhu Beach", "Sanjay Gandhi National Park", "Prince of Wales Museum",
        "Bandra-Worli Sea Link", "Mahim Beach", "Nehrun Museum", "Mumbai High Court", "Taj Mahal Palace Hotel",
        "Siddhivinayak Temple", "Kanheri Caves", "Flora Fountain", "Dhobi Ghat", "Hanging Gardens",
        "Bandra Fort"
    ],
    "Delhi": [
        "Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb", "Lotus Temple",
        "Raj Ghat", "Jama Masjid", "Akshardham Temple", "Rashtrapati Bhavan", "Lal Qila",
        "National Museum", "Jantar Mantar", "Gandhi Smriti", "Delhi Zoo", "Purana Qila",
        "Agrasen ki Baoli", "Hauz Khas Village", "Delhi Metro Museum", "Chandni Chowk", "Lotus Temple",
        "Delhi Haat"
    ],
    "Ahmedabad": [
        "Sabarmati Ashram", "Jama Masjid", "Sidi Saiyyed Mosque", "Kankaria Lake", "Law Garden",
        "Ahmedabad Museum", "Bhadra Fort", "Calico Museum of Textiles", "Hathisingh Jain Temple", "Sardar Patel Museum",
        "Vikram Sarabhai Space Centre", "Sardar Patel National Memorial", "Manek Chowk", "Shree Swaminarayan Temple",
        "Rani Sipri Mosque", "Vastrapur Lake", "Sun Temple", "Teen Darwaza", "Chor Bazaar", "Mahatma Mandir",
        "Kankaria Zoo"
    ],
    "Abu": [
        "Mount Abu Wildlife Sanctuary", "Dilwara Temples", "Nakki Lake", "Sunset Point", "Guru Shikhar",
        "Achalgarh Fort", "Mount Abu Museum", "Toad Rock", "Raghunath Temple", "Ratan Da Caves",
        "Shri Mahavirji Temple", "Adhar Devi Temple", "Mataji Temple", "Om Shanti Bhawan", "Rani Sati Temple",
        "Doodh Baori", "Luna Vedi", "Tonga Ride", "Rajmahal", "Brahma Kumaris Headquarters",
        "Kumbhalgarh Fort"
    ]
}

import json
import math

# Generate itineraries with time slots divided by the number of places
def generate_itinerary_with_divided_time(source, destination, days):
    itinerary = []
    destination_interests = places_of_interest.get(destination, [])

    # Use only places from the destination
    total_places = len(destination_interests)

    # Calculate how many places to visit per day
    places_per_day = total_places // days if days > 0 else 1  # Ensure at least 1 place per day
    leftover_places = total_places % days  # In case of uneven division

    index = 0
    for day in range(1, days + 1):
        day_places = destination_interests[index: index + places_per_day]
        index += places_per_day

        # If there are leftover places, distribute them one by one to the first few days
        if leftover_places > 0:
            day_places.append(destination_interests[index])
            index += 1
            leftover_places -= 1

        if day_places:
            # Calculate time slots
            start_hour = 8  # Start at 8 AM
            end_hour = 19  # End at 7 PM
            total_hours = end_hour - start_hour
            num_places = len(day_places)
            time_per_place = total_hours / num_places

            time_slots = []
            for i, place in enumerate(day_places):
                start_time = start_hour + i * time_per_place
                end_time = start_hour + (i + 1) * time_per_place
                start_am_pm = 'AM' if start_time < 12 else 'PM'
                end_am_pm = 'AM' if end_time < 12 else 'PM'

                start_time_formatted = f"{int(start_time % 12 or 12)}:00 {start_am_pm}"
                end_time_formatted = f"{int(end_time % 12 or 12)}:00 {end_am_pm}"

                time_slots.append(f"Visit {place} from {start_time_formatted} to {end_time_formatted}")

            # Add return to hotel time
            time_slots.append("Return to hotel by 7:00 PM.")

            itinerary.append(f"Day {day}: " + ", ".join(time_slots))

    return itinerary

# Generate data with the updated itinerary
data = []

for source in places_of_interest.keys():
    for destination in places_of_interest.keys():
        if source != destination:
            for days in range(1, 11):  # 1 to 10 days
                itinerary = generate_itinerary_with_divided_time(source, destination, days)
                data.append({
                    "source": source,
                    "destination": destination,
                    "days": days,
                    "itinerary": itinerary
                })

# Save data to JSON file
with open('trip_plans_fixed.json', 'w') as f:
    json.dump(data, f, indent=4)

print("Data has been successfully saved to 'trip_plans_fixed.json'.")
