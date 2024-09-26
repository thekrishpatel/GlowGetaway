import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  useEffect(() => {
    const scrollItems = document.querySelectorAll('.scroll-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          if (index % 2 === 0) {
            entry.target.classList.add('fade-in-left');
          } else {
            entry.target.classList.add('fade-in-right');
          }
          observer.unobserve(entry.target);
        }
      });
    });

    scrollItems.forEach(item => observer.observe(item));

    return () => {
      scrollItems.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero">
        <div className="">
          <h1>Discover Your Next Adventure</h1>
          <p>
            Find the best places to visit, stay, and enjoy around the world.
          </p>
          <button className="cta-btn">
            <Link
              style={{ textDecoration: "none" }}
              to="/login"
              className="cta-btn"
            >
              Get Started
            </Link>
          </button>
        </div>
      </section>

      {/* Popular Links Section */}
      <section className="links-section scroll-item">
        <div className="container">
          <h2 className="section-title">Explore Fetures</h2>
          <div className="row link-grid">
            <div className="col-3">
              <Link className="link-item" to="/destinations">
                Travel Planner
              </Link>
            </div>
            <div className="col-3">
              <Link className="link-item" to="/hotels">
                Top Rated Hotels
              </Link>
            </div>
            <div className="col-3">
              <Link className="link-item" to="/hotels">
                Location wise Hotel search
              </Link>
            </div>
            <div className="col-3">
              <Link className="link-item" to="/hotels">
                Reviews wise Hotel search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cards Section */}
      <section className="cards-section">
        <div className="container">
          <h2 className="section-title scroll-item">Featured Locations</h2>
          <div className="row">
            <div className="col-md-6 scroll-item">
              <div className="card">
                <img src='/images/img1.jpg' className="card-img-top" alt="Card 1" />
                <div className="card-body">
                  <h5 className="card-title">Diu</h5>
                  <p className="card-text">
                    Enjoy the serene beauty of white sandy beaches.
                  </p>
                  <Link className="btn btn-primary" to="/hotels/66e6945aaed6c8062c52247f">
                    Find best Hotel
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 scroll-item">
              <div className="card">
                <img src='/images/img2.jpg' className="card-img-top" alt="Card 2" />
                <div className="card-body">
                  <h5 className="card-title">Ladakh</h5>
                  <p className="card-text">
                    Find peace and adventure in the mountains.
                  </p>
                  <Link className="btn btn-primary" to="/hotels/66e6945aaed6c8062c522483">
                    Find best Hotel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="carousel-section mt-5">
        <div id="carouselExampleIndicators" data-bs-ride="carosel" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src='/images/paris.jpg' className="d-block w-100" alt="Paris" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Paris</h5>
                <p>Explore the city of lights and love.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src='/images/newyork.jpg' className="d-block w-100" alt="New York" />
              <div className="carousel-caption d-none d-md-block">
                <h5>New York</h5>
                <p>Feel the energy of the Big Apple.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src='/images/Tokyo.jpg' className="d-block w-100" alt="Tokyo" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Tokyo</h5>
                <p>Experience the perfect blend of tradition and technology.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src='/images/India.jpg' className="d-block w-100" alt="India" />
              <div className="carousel-caption d-none d-md-block">
                <h5>India</h5>
                <p>Discover the diversity of cultures and landscapes.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img src='/images/London.jpg' className="d-block w-100" alt="London" />
              <div className="carousel-caption d-none d-md-block">
                <h5>London</h5>
                <p>
                  Experience the rich history and modern elegance of the British
                  capital.
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img src='/images/Germany.jpg' className="d-block w-100" alt="Germany" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Germany</h5>
                <p>Explore the vibrant culture and scenic beauty of Germany.</p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
