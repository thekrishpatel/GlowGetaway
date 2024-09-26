from pymongo import MongoClient
import json

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client.hotels_db
collection = db.hotels

# Hotel data to be inserted
hotels_data = [
    {
        "id": "1",
        "name": "Hotel Pearl",
        "location": "DIU",
        "image": "/images/Hotel/pearl-diu.jpg",
        "reviews": "4.5/5",
        "description": "A beautiful hotel with sea views and excellent amenities."
    },
    {
        "id": "2",
        "name": "Goa Beach Resort",
        "location": "GOA",
        "image": "/images/Hotel/goa-beach-resort.jpg",
        "reviews": "4.7/5",
        "description": "Luxurious resort with beachfront access and vibrant nightlife."
    },
    {
        "id": "3",
        "name": "Kumbalgarh Fort View Hotel",
        "location": "Kumbalgarh",
        "image": "/images/Hotel/kumbalgarh-fort-view.jpg",
        "reviews": "4.6/5",
        "description": "Offers stunning views of the Kumbalgarh Fort and comfortable accommodations."
    },
    {
        "id": "4",
        "name": "Manali Mountain Retreat",
        "location": "Manali",
        "image": "/images/Hotel/manali-mountain-retreat.jpg",
        "reviews": "4.8/5",
        "description": "Perfect for mountain lovers with cozy rooms and excellent service."
    },
    {
        "id": "5",
        "name": "Ladakh Star Hotel",
        "location": "Ladakh",
        "image": "/images/Hotel/ladakh-star-hotel.jpg",
        "reviews": "4.9/5",
        "description": "Offers breathtaking views of the Himalayas and modern amenities."
    },
    {
        "id": "6",
        "name": "Kerala Backwater Haven",
        "location": "Kerala",
        "image": "/images/Hotel/kerala-backwater-haven.jpg",
        "reviews": "4.7/5",
        "description": "Experience the serene backwaters of Kerala in this luxurious hotel."
    },
    {
        "id": "7",
        "name": "Mumbai City View Hotel",
        "location": "Mumbai",
        "image": "/images/Hotel/mumbai-city-view.jpg",
        "reviews": "4.5/5",
        "description": "Located in the heart of Mumbai with spectacular city views."
    },
    {
        "id": "8",
        "name": "Delhi Heritage Inn",
        "location": "Delhi",
        "image": "/images/Hotel/delhi-heritage-inn.jpg",
        "reviews": "4.6/5",
        "description": "A blend of modern comfort and traditional charm in Delhi."
    },
    {
        "id": "9",
        "name": "Ahmedabad Grand Hotel",
        "location": "Ahmedabad",
        "image": "/images/Hotel/ahmedabad-grand.jpg",
        "reviews": "4.7/5",
        "description": "Offers top-notch amenities and comfort in the heart of Ahmedabad."
    },
    {
        "id": "10",
        "name": "Abu Mountain Lodge",
        "location": "Abu",
        "image": "/images/Hotel/abu-mountain-lodge.jpg",
        "reviews": "4.8/5",
        "description": "Cozy lodge with panoramic mountain views and excellent service."
    }
]

# Insert the data into the collection
result = collection.insert_many(hotels_data)
print(f"Inserted {len(result.inserted_ids)} documents.")
