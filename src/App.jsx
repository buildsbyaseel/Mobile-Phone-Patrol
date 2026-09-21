import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import heroImage from './assets/storefront.webp';
import chickenWings from './assets/chicken wings.webp';
import chickenShaw from './assets/chickenshawbowl.webp';
import chickenTawook from './assets/chickentawook.webp';
import grilledHalf from './assets/grilledhalf.webp';
import gyroPlatt from './assets/gyroplatt.webp';
import kufta from './assets/kufta.webp';
import mixedPlat from './assets/mixedplat.webp';
import shrimpRice from './assets/shrimprice.webp';
import steakShaw from './assets/steakshaw.webp';
import storefront from './assets/storefront.webp';
import cater1 from './assets/cater1.webp';
import cater2 from './assets/cater2.webp';
import cater3 from './assets/cater3.webp';
import hummu from './assets/hummu.webp';
import logoMark from './assets/Firefly_RemoveBackground.png';

gsap.registerPlugin(ScrollTrigger);

const navLinks = ['HOME', 'MENU', 'CATERING', 'ABOUT', 'LOCATION', 'ORDER'];
const appleMapsLink = 'https://maps.apple.com/directions?destination=Mt%20Olive%20Mediterranean%20Grill%2C%201135%20Joliet%20St%2C%20Dyer%2C%20IN%20%2046311%2C%20United%20States&destination-place-id=I5EA6115F1014EC06&mode=driving';

const menuCategories = {
  STARTERS: [
    { name: 'Hummus', description: 'Classic chickpea dip with warm pita', price: '$7.95', image: hummu },
    { name: 'Baba Ghanoush', description: 'Roasted eggplant, tahini, lemon and garlic', price: '$8.50', image: grilledHalf },
    { name: 'Falafel', description: 'Crispy chickpea fritters with tahini sauce', price: '$8.95', image: shrimpRice },
    { name: 'French Fries', description: 'Golden crispy fries, served hot', price: '$4.95', image: mixedPlat },
    { name: 'Grape Leaves', description: 'Stuffed rolls with rice and herbs', price: '$5.95', image: kufta },
  ],
  WRAPS: [
    { name: 'Chicken Shawarma Wrap', description: 'Marinated chicken, lettuce, cucumber, pickles and sauce', price: '$12.95', image: chickenShaw },
    { name: 'Gyro Wrap', description: 'Beef and lamb gyro with tzatziki and tomato', price: '$13.95', image: gyroPlatt },
    { name: 'Falafel Wrap', description: 'Crispy falafel with salad, pickles and tahini', price: '$11.95', image: kufta },
    { name: 'Steak Shawarma Wrap', description: 'Fire-grilled steak with garlic sauce and onions', price: '$14.95', image: steakShaw },
  ],
  PLATTERS: [
    { name: 'Gyro Plate', description: 'Beef & lamb gyro with rice, fries and salad', price: '$16.95', image: grilledHalf },
    { name: 'Chicken Shawarma Plate', description: 'Tender marinated chicken with rice and salad', price: '$15.95', image: steakShaw },
    { name: 'Kufta Plate', description: 'Seasoned beef and lamb skewers with rice', price: '$17.95', image: kufta },
    { name: 'Mixed Grill Plate', description: 'House mix of grilled meats with rice and salad', price: '$19.95', image: mixedPlat },
  ],
  CHICKEN: [
    { name: 'Grilled Half Chicken', description: 'Char-grilled chicken with rice and house salad', price: '$14.95', image: grilledHalf },
    { name: 'Chicken Tawook Plate', description: 'Lemon garlic chicken with rice and salad', price: '$15.50', image: chickenTawook },
    { name: 'Chicken Wings', description: 'Hot or mild crispy wings with ranch or sauce', price: '$12.95', image: chickenWings },
    { name: 'Chicken Kabob', description: 'Juicy grilled chicken skewers with rice', price: '$16.50', image: chickenShaw },
  ],
  DESSERTS: [
    { name: 'Baklava', description: 'Traditional flaky pastry with walnuts and honey', price: '$5.95', image: chickenTawook },
    { name: 'Rice Pudding', description: 'Creamy and lightly spiced classic dessert', price: '$4.95', image: gyroPlatt },
    { name: 'Cheesecake', description: 'Rich dessert slice with a smooth finish', price: '$5.95', image: mixedPlat },
  ],
  DRINKS: [
    { name: 'Fresh Tea', description: 'Hot or cold tea selection', price: '$2.95', image: shrimpRice },
    { name: 'Soda', description: 'Regular fountain soda', price: '$2.50', image: chickenWings },
    { name: 'Juice', description: 'Fresh orange or apple juice', price: '$3.50', image: grilledHalf },
    { name: 'Water', description: 'Still or sparkling bottled water', price: '$2.00', image: kufta },
  ],
};

const galleryImages = [
  { src: mixedPlat, className: 'photo tall' },
  { src: kufta, className: 'photo wide' },
  { src: chickenTawook, className: 'photo medium' },
  { src: chickenShaw, className: 'photo tall alt' },
  { src: grilledHalf, className: 'photo wide alt' },
  { src: shrimpRice, className: 'photo medium alt' },
];

const signatureCards = [
  { name: 'Grilled Half Chicken', price: 'Chef Favorite', image: grilledHalf },
  { name: 'Mixed Grill Plate', price: 'Popular Plate', image: mixedPlat },
  { name: 'Kufta & Rice', price: 'Classic Flavor', image: kufta },
];

const menuHeaderImages = [
  { src: chickenShaw, className: 'menu-header-photo tall', rotation: '-10deg', delay: '0s', x: '0px', y: '0px' },
  { src: mixedPlat, className: 'menu-header-photo wide', rotation: '2deg', delay: '1s', x: '-50%', y: '0px' },
  { src: grilledHalf, className: 'menu-header-photo medium', rotation: '10deg', delay: '2s', x: '0px', y: '0px' },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand" aria-label="Mt Olive logo">
          <img src={logoMark} alt="Mt Olive Mediterranean Grill logo" className="footer-brand-logo" />
        </div>
        <div className="footer-links" aria-label="Social and contact links">
          <a className="social-link" href="https://www.instagram.com/mtolivegrill/?hl=en" target="_blank" rel="noreferrer">Instagram</a>
          <a className="social-link" href="https://www.facebook.com/p/Mt-Olive-Mediterranean-grill-61578146668186/" target="_blank" rel="noreferrer">Facebook</a>
          <a className="social-link phone-link" href="tel:+12192279074">Call Now</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Mt Olive</span>
      </div>
    </footer>
  );
}

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('STARTERS');

  return (
    <>
      <main className="menu-page-shell">
        <section className="menu-page-header reveal">
          <div className="menu-page-heading">
            <h1>Full Menu</h1>
          </div>

          <div className="menu-page-header-collage" aria-label="Featured menu dishes">
            {menuHeaderImages.map((photo, index) => (
              <div
                key={`${photo.src}-${index}`}
                className={`menu-header-photo-frame ${photo.className}`}
                style={{
                  zIndex: 3 - index,
                  '--card-tilt': photo.rotation,
                  '--card-delay': photo.delay,
                  '--card-x': photo.x,
                  '--card-y': photo.y,
                }}
              >
                <img src={photo.src} alt="Featured Mount Olive dish" />
              </div>
            ))}
            <span className="menu-header-badge">Open Late</span>
          </div>
        </section>

        <section className="menu-page-content reveal">
          <div className="menu-page-tabs" aria-label="Menu categories">
            {Object.keys(menuCategories).map((category) => (
              <button
                key={category}
                type="button"
                className={category === selectedCategory ? 'tab active' : 'tab'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="menu-page-grid">
            {menuCategories[selectedCategory].map((item, index) => (
              <article
                key={`${selectedCategory}-${item.name}`}
                className="menu-page-card reveal"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="menu-page-card-body">
                  <div className="menu-page-card-row">
                    <h3>{item.name}</h3>
                    <span>{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function CateringPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <main className="catering-page-shell">
        <section className="catering-page-hero reveal">
          <div className="catering-page-copy">
            <p className="section-label">Catering</p>
            <h1>Let us feed the table.</h1>
            <p>
              Share a few details and we’ll help plan a Mediterranean spread that fits your event, guest count, and timing.
            </p>
          </div>

          <div className="catering-page-card">
            <div className="catering-page-card-top">
              <span>Event type</span>
              <strong>Private · Office · Family</strong>
            </div>
            <img src={mixedPlat} alt="Catering spread" />
          </div>
        </section>

        <section className="catering-form-wrap reveal">
          <form className="catering-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" />
              </label>

              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" />
              </label>

              <label>
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="(219) 555-0123" />
              </label>

              <label>
                <span>Event date</span>
                <input type="date" name="date" />
              </label>

              <label>
                <span>Guest count</span>
                <input type="number" name="guests" min="10" placeholder="60" />
              </label>

              <label>
                <span>Occasion</span>
                <select name="occasion" defaultValue="">
                  <option value="" disabled>Select an occasion</option>
                  <option>Birthday</option>
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Family gathering</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="full-width">
                <span>Service type</span>
                <select name="service" defaultValue="">
                  <option value="" disabled>Choose your service style</option>
                  <option>Drop-off</option>
                  <option>Pickup</option>
                  <option>Full service</option>
                  <option>Needs planning help</option>
                </select>
              </label>

              <label className="full-width">
                <span>Menu notes</span>
                <textarea name="notes" rows="5" placeholder="Tell us about your event, preferred dishes, dietary needs, timing, or any special requests." />
              </label>
            </div>

            <div className="form-footer">
              <button type="submit" className="catering-submit">Request catering</button>
              {submitted && <p className="success-message">Thanks! We’ll reach out to confirm your event details.</p>}
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function App() {
  const rootRef = useRef(null);
  const navbarRef = useRef(null);
  const cursorRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('STARTERS');
  const [navActive, setNavActive] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const goToSlide = (direction) => {
    setActiveSlide((current) => {
      const next = current + direction;
      if (next < 0) return signatureCards.length - 1;
      if (next >= signatureCards.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    const autoRotate = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % signatureCards.length);
    }, 4600);

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      lerp: 0.08,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frame = requestAnimationFrame(raf);

    gsap.utils.toArray('.reveal').forEach((element) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
          },
        }
      );
    });

    gsap.utils.toArray('.story-strip p, .menu-panel, .about-section, .gallery-frame, .location-section, .reservation-inner, .site-footer').forEach((element, index) => {
      gsap.fromTo(
        element,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
          },
        }
      );
    });

    gsap.utils.toArray('.parallax').forEach((element) => {
      gsap.to(element, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    gsap.utils.toArray('.hero-title, .hero-subtitle, .hero-scroll').forEach((element) => {
      gsap.fromTo(
        element,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );
    });

    gsap.to('.hero-bg img', {
      scale: 1.06,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: '#about',
      start: 'top center',
      onEnter: () => setNavActive(true),
      onLeaveBack: () => setNavActive(false),
    });

    ScrollTrigger.create({
      trigger: '#order',
      start: 'top center',
      onEnter: () => setNavActive(true),
      onLeaveBack: () => setNavActive(false),
    });

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursorRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.querySelectorAll('a, button, .menu-card, img, .reservation-button').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursorRef.current.classList.add('active');
      });
      element.addEventListener('mouseleave', () => {
        cursorRef.current.classList.remove('active');
      });
    });

    return () => {
      window.clearInterval(autoRotate);
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.removeEventListener('pointermove', handlePointerMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const onCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleNavClick = (link) => {
    if (link === 'MENU') {
      setCurrentPage('menu');
      return;
    }

    if (link === 'CATERING') {
      setCurrentPage('catering');
      return;
    }

    setCurrentPage('home');
    window.requestAnimationFrame(() => {
      const sectionId = link.toLowerCase();
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  if (currentPage === 'menu') {
    return (
      <div className="page-shell" ref={rootRef}>
        <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

        <header className={`topbar ${navActive ? 'scrolled' : ''}`} ref={navbarRef}>
          <div className="brand-block" aria-label="Mount Olive logo">
            <img
              className="brand-logo-image"
              src={logoMark}
              alt="Mount Olive Mediterranean Grill logo"
            />
          </div>

          <div className="header-tools">
            <div className="header-contact" aria-label="Phone contact">
              <a href="tel:+12192279074" className="header-call-pill">Call</a>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  className={link === 'ORDER' ? 'nav-link nav-order-link' : 'nav-link'}
                  onClick={() => {
                    if (link === 'HOME') {
                      setCurrentPage('home');
                      return;
                    }
                    if (link === 'MENU') {
                      setCurrentPage('menu');
                      return;
                    }
                    if (link === 'CATERING') {
                      setCurrentPage('catering');
                      return;
                    }
                    if (link === 'ORDER') {
                      setCurrentPage('home');
                      window.requestAnimationFrame(() => {
                        const target = document.getElementById('order');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      });
                      return;
                    }
                    handleNavClick(link);
                  }}
                  data-cursor="VIEW"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <MenuPage />
      </div>
    );
  }

  if (currentPage === 'catering') {
    return (
      <div className="page-shell" ref={rootRef}>
        <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

        <header className={`topbar ${navActive ? 'scrolled' : ''}`} ref={navbarRef}>
          <div className="brand-block" aria-label="Mount Olive logo">
            <img
              className="brand-logo-image"
              src={logoMark}
              alt="Mount Olive Mediterranean Grill logo"
            />
          </div>

          <div className="header-tools">
            <div className="header-contact" aria-label="Phone contact">
              <a href="tel:+12192279074" className="header-call-pill">Call</a>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              {navLinks.map((link) => (
                <button
                  key={link}
                  type="button"
                  className={link === 'ORDER' ? 'nav-link nav-order-link' : 'nav-link'}
                  onClick={() => {
                    if (link === 'HOME') {
                      setCurrentPage('home');
                      return;
                    }
                    if (link === 'MENU') {
                      setCurrentPage('menu');
                      return;
                    }
                    if (link === 'CATERING') {
                      setCurrentPage('catering');
                      return;
                    }
                    if (link === 'ORDER') {
                      setCurrentPage('home');
                      window.requestAnimationFrame(() => {
                        const target = document.getElementById('order');
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      });
                      return;
                    }
                    handleNavClick(link);
                  }}
                  data-cursor="VIEW"
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <CateringPage />
      </div>
    );
  }

  return (
    <div className="page-shell" ref={rootRef}>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

      <header className={`topbar ${navActive ? 'scrolled' : ''}`} ref={navbarRef}>
        <div className="brand-block" aria-label="Mount Olive logo">
          <img
            className="brand-logo-image"
            src={logoMark}
            alt="Mount Olive Mediterranean Grill logo"
          />
        </div>

        <div className="header-tools">
          <div className="header-contact" aria-label="Phone contact">
            <a href="tel:+12192279074" className="header-call-pill">Call</a>
          </div>

          <nav className="main-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link}
                type="button"
                className={link === 'ORDER' ? 'nav-link nav-order-link' : 'nav-link'}
                onClick={() => {
                  if (link === 'HOME') {
                    setCurrentPage('home');
                    return;
                  }
                  if (link === 'MENU') {
                    setCurrentPage('menu');
                    return;
                  }
                  if (link === 'CATERING') {
                    setCurrentPage('catering');
                    return;
                  }
                  if (link === 'ORDER') {
                    setCurrentPage('home');
                    window.requestAnimationFrame(() => {
                      const target = document.getElementById('order');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    });
                    return;
                  }
                  handleNavClick(link);
                }}
                data-cursor="VIEW"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg parallax">
            <img src={heroImage} alt="Mount Olive dining room" />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content">
            <div className="hero-scroll reveal">Explore <span>↓</span></div>
          </div>
        </section>

        <section className="order-section reveal" id="order">
          <div className="order-inner">
            <h2>ORDER NOW</h2>
            <p className="order-subtitle">Mount Olive Dyer</p>
            <p className="order-copy">Fresh Mediterranean favorites prepared for pickup at our Dyer location.</p>
            <div className="order-actions">
              <button
                type="button"
                className="location-pill"
                data-cursor="ORDER"
                onClick={() => {
                  window.open('https://squareup.com/online-ordering', '_blank', 'noopener,noreferrer');
                }}
              >
                Order Online
              </button>
            </div>
          </div>
        </section>

        <section className="catering-section reveal" id="catering">
          <div className="catering-panel">
            <div className="catering-copy">
              <h2>CATERING</h2>
              <p className="catering-lead">Bring the flavor of Mount Olive to your event</p>
              <p>
                Let Mount Olive bring warm hospitality and authentic Mediterranean flavor to your next gathering. From family celebrations and office lunches to intimate dinners and community events, we create a menu that feels generous, memorable, and crafted for the table.
              </p>
              <button type="button" className="catering-button" data-cursor="ORDER" onClick={() => setCurrentPage('catering')}>CATERING</button>
            </div>
            <div className="catering-visual">
              <img src={mixedPlat} alt="Catering feast spread" />
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-visual reveal parallax">
            <img src={storefront} alt="Mount Olive storefront" />
          </div>
          <div className="about-copy reveal">
            <h2>ABOUT US</h2>
            <p className="about-lead">Authentic Middle Eastern flavor</p>
            <p>
              Mount Olive Mediterranean Grill brings together bold, comforting flavors with the warmth of a neighborhood favorite. From shawarma and grilled plates to fresh salads, family-style favorites, and late-night comfort food, every dish is made to feel welcoming, generous, and full of character.
            </p>
          </div>
        </section>

        <section className="location-section" id="location">
          <div className="map-wrap reveal map-panel" aria-label="Map showing Mount Olive in Dyer, Indiana">
            <iframe
              title="Mount Olive location map"
              className="map-embed"
              src="https://www.google.com/maps?q=1135%20Joliet%20St%2C%20Dyer%2C%20IN%2046311&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="location-copy reveal">
            <h2>Mount Olive</h2>
            <p>1135 Joliet St<br />Dyer, IN 46311</p>
            <div className="hours-row">
              <span>Monday</span>
              <span>12:30 PM — 10:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Tuesday</span>
              <span>12:00 PM — 9:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Wednesday</span>
              <span>10:30 AM — 10:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Thursday</span>
              <span>10:30 AM — 10:00 PM</span>
            </div>
            <div className="hours-row late-night-row">
              <span>
                Friday
                <em className="late-badge">Open Late</em>
              </span>
              <span>11:00 AM — 12:00 AM</span>
            </div>
            <div className="hours-row late-night-row">
              <span>
                Saturday
                <em className="late-badge">Open Late</em>
              </span>
              <span>11:00 AM — 1:00 AM</span>
            </div>
            <div className="hours-row">
              <span>Sunday</span>
              <span>11:00 AM — 10:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Phone</span>
              <a href="tel:+12192279074">(219) 227-9074</a>
            </div>
            <a href={appleMapsLink} target="_blank" rel="noreferrer" className="map-link">Get directions →</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default App;
