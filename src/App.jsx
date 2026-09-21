import { useEffect, useState } from 'react';

import heroImage from './assets/storefront.webp';
import chickenShaw from './assets/chickenshawbowl.webp';
import grilledHalf from './assets/grilledhalf.webp';
import kufta from './assets/kufta.webp';
import mixedPlat from './assets/mixedplat.webp';
import storefront from './assets/storefront.webp';
import logoMark from './assets/Firefly_RemoveBackground.png';

const PHONE_HREF = 'tel:+12192279074';
const PHONE_LABEL = '(219) 227-9074';
const ORDER_URL = 'https://squareup.com/online-ordering';
const INSTAGRAM_URL = 'https://www.instagram.com/mtolivegrill/?hl=en';
const FACEBOOK_URL = 'https://www.facebook.com/p/Mt-Olive-Mediterranean-grill-61578146668186/';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=1135%20Joliet%20St%2C%20Dyer%2C%20IN%2046311&output=embed';
const DIRECTIONS_URL = 'https://maps.apple.com/directions?destination=Mt%20Olive%20Mediterranean%20Grill%2C%201135%20Joliet%20St%2C%20Dyer%2C%20IN%20%2046311%2C%20United%20States&destination-place-id=I5EA6115F1014EC06&mode=driving';

const navItems = [
  { label: 'Home', page: 'home' },
  { label: 'Menu', page: 'menu' },
  { label: 'Catering', page: 'catering' },
  { label: 'About', page: 'home', target: 'about' },
  { label: 'Location', page: 'home', target: 'location' },
];

// Monday-first, matching the order shown on the site.
const hours = [
  { day: 'Monday', time: '12:30 PM – 10:00 PM' },
  { day: 'Tuesday', time: '12:00 PM – 9:00 PM' },
  { day: 'Wednesday', time: '10:30 AM – 10:00 PM' },
  { day: 'Thursday', time: '10:30 AM – 10:00 PM' },
  { day: 'Friday', time: '11:00 AM – 12:00 AM', late: true },
  { day: 'Saturday', time: '11:00 AM – 1:00 AM', late: true },
  { day: 'Sunday', time: '11:00 AM – 10:00 PM' },
];

const menuCategories = {
  Starters: [
    { name: 'Hummus', description: 'Classic chickpea dip with warm pita', price: '$7.95' },
    { name: 'Baba Ghanoush', description: 'Roasted eggplant, tahini, lemon and garlic', price: '$8.50' },
    { name: 'Falafel', description: 'Crispy chickpea fritters with tahini sauce', price: '$8.95' },
    { name: 'French Fries', description: 'Golden crispy fries, served hot', price: '$4.95' },
    { name: 'Grape Leaves', description: 'Stuffed rolls with rice and herbs', price: '$5.95' },
  ],
  Wraps: [
    { name: 'Chicken Shawarma Wrap', description: 'Marinated chicken, lettuce, cucumber, pickles and sauce', price: '$12.95' },
    { name: 'Gyro Wrap', description: 'Beef and lamb gyro with tzatziki and tomato', price: '$13.95' },
    { name: 'Falafel Wrap', description: 'Crispy falafel with salad, pickles and tahini', price: '$11.95' },
    { name: 'Steak Shawarma Wrap', description: 'Fire-grilled steak with garlic sauce and onions', price: '$14.95' },
  ],
  Platters: [
    { name: 'Gyro Plate', description: 'Beef & lamb gyro with rice, fries and salad', price: '$16.95' },
    { name: 'Chicken Shawarma Plate', description: 'Tender marinated chicken with rice and salad', price: '$15.95' },
    { name: 'Kufta Plate', description: 'Seasoned beef and lamb skewers with rice', price: '$17.95' },
    { name: 'Mixed Grill Plate', description: 'House mix of grilled meats with rice and salad', price: '$19.95' },
  ],
  Chicken: [
    { name: 'Grilled Half Chicken', description: 'Char-grilled chicken with rice and house salad', price: '$14.95' },
    { name: 'Chicken Tawook Plate', description: 'Lemon garlic chicken with rice and salad', price: '$15.50' },
    { name: 'Chicken Wings', description: 'Hot or mild crispy wings with ranch or sauce', price: '$12.95' },
    { name: 'Chicken Kabob', description: 'Juicy grilled chicken skewers with rice', price: '$16.50' },
  ],
  Desserts: [
    { name: 'Baklava', description: 'Traditional flaky pastry with walnuts and honey', price: '$5.95' },
    { name: 'Rice Pudding', description: 'Creamy and lightly spiced classic dessert', price: '$4.95' },
    { name: 'Cheesecake', description: 'Rich dessert slice with a smooth finish', price: '$5.95' },
  ],
  Drinks: [
    { name: 'Fresh Tea', description: 'Hot or cold tea selection', price: '$2.95' },
    { name: 'Soda', description: 'Regular fountain soda', price: '$2.50' },
    { name: 'Juice', description: 'Fresh orange or apple juice', price: '$3.50' },
    { name: 'Water', description: 'Still or sparkling bottled water', price: '$2.00' },
  ],
};

const popularDishes = [
  { name: 'Grilled Half Chicken', tag: 'Chef favorite', image: grilledHalf },
  { name: 'Mixed Grill Plate', tag: 'Popular plate', image: mixedPlat },
  { name: 'Kufta & Rice', tag: 'Classic flavor', image: kufta },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fades sections in as they scroll into view; re-runs whenever the page changes.
function useReveal(page) {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page]);
}

function Header({ page, scrolled, onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const go = (page, target) => {
    setOpen(false);
    onNavigate(page, target);
  };

  return (
    <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
      <div className="header-inner">
        <button type="button" className="brand" onClick={() => go('home')} aria-label="Mt Olive Mediterranean Grill — home">
          <img src={logoMark} alt="Mt Olive Mediterranean Grill" />
        </button>

        <nav id="primary-nav" className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = !item.target && item.page === page;
            return (
              <button
                key={item.label}
                type="button"
                className={`nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => go(item.page, item.target)}
              >
                {item.label}
              </button>
            );
          })}
          <button type="button" className="btn btn-primary nav-cta" onClick={() => go('home', 'order')}>
            Order online
          </button>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function SiteFooter({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={logoMark} alt="Mt Olive Mediterranean Grill" />
          <p>1135 Joliet St<br />Dyer, IN 46311</p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          <button type="button" onClick={() => onNavigate('menu')}>Menu</button>
          <button type="button" onClick={() => onNavigate('catering')}>Catering</button>
          <button type="button" onClick={() => onNavigate('home', 'about')}>About</button>
          <button type="button" onClick={() => onNavigate('home', 'location')}>Location &amp; hours</button>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Mt Olive Mediterranean Grill</span>
        <span>Dyer, Indiana</span>
      </div>
    </footer>
  );
}

function HomePage({ onNavigate }) {
  const [today] = useState(() => (new Date().getDay() + 6) % 7);

  return (
    <main>
      <section className="hero" id="home">
        <img className="hero-image" src={heroImage} alt="" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">Dyer, Indiana</p>
          <h1>Mount Olive<br />Mediterranean Grill</h1>
          <p className="hero-lede">
            Shawarma, gyros, grilled plates and late-night comfort food — made to feel welcoming, generous and full of character.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('home', 'order')}>Order online</button>
            <button type="button" className="btn btn-ghost" onClick={() => onNavigate('menu')}>View menu</button>
          </div>
        </div>
      </section>

      <section className="info-strip" aria-label="Restaurant details">
        <div className="container info-grid">
          <div>
            <span className="info-label">Address</span>
            <span className="info-value">1135 Joliet St, Dyer, IN 46311</span>
          </div>
          <div>
            <span className="info-label">Hours</span>
            <span className="info-value">Open late Friday &amp; Saturday</span>
          </div>
          <div>
            <span className="info-label">Phone</span>
            <a className="info-value" href={PHONE_HREF}>{PHONE_LABEL}</a>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="popular-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">From the grill</p>
            <h2 id="popular-title">Popular dishes</h2>
          </div>
          <div className="dish-grid">
            {popularDishes.map((dish, index) => (
              <article key={dish.name} className="dish-card" data-reveal style={{ '--delay': `${index * 90}ms` }}>
                <div className="dish-photo">
                  <img src={dish.image} alt={dish.name} loading="lazy" />
                </div>
                <div className="dish-meta">
                  <h3>{dish.name}</h3>
                  <span>{dish.tag}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="section-cta" data-reveal>
            <button type="button" className="btn btn-outline" onClick={() => onNavigate('menu')}>See the full menu</button>
          </div>
        </div>
      </section>

      <section className="section order-band" id="order" aria-labelledby="order-title">
        <div className="container order-inner" data-reveal>
          <div>
            <p className="eyebrow">Pickup</p>
            <h2 id="order-title">Order online</h2>
            <p className="lede">Fresh Mediterranean favorites, prepared for pickup at our Dyer location.</p>
          </div>
          <div className="order-actions">
            <a className="btn btn-primary" href={ORDER_URL} target="_blank" rel="noopener noreferrer">Order online</a>
            <a className="btn btn-outline" href={PHONE_HREF}>Call {PHONE_LABEL}</a>
          </div>
        </div>
      </section>

      <section className="section" id="catering" aria-labelledby="catering-title">
        <div className="container split">
          <div className="split-copy" data-reveal>
            <p className="eyebrow">Catering</p>
            <h2 id="catering-title">Bring the flavor of Mount Olive to your event</h2>
            <p className="lede">
              From family celebrations and office lunches to intimate dinners and community events, we build a menu that feels generous, memorable and crafted for the table.
            </p>
            <button type="button" className="btn btn-outline" onClick={() => onNavigate('catering')}>Plan your event</button>
          </div>
          <div className="split-media" data-reveal style={{ '--delay': '120ms' }}>
            <img src={mixedPlat} alt="Mixed grill catering spread" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section-alt" id="about" aria-labelledby="about-title">
        <div className="container split split-reverse">
          <div className="split-media" data-reveal>
            <img src={storefront} alt="Mount Olive storefront on Joliet Street" loading="lazy" />
          </div>
          <div className="split-copy" data-reveal style={{ '--delay': '120ms' }}>
            <p className="eyebrow">About us</p>
            <h2 id="about-title">Authentic Middle Eastern flavor</h2>
            <p className="lede">
              Mount Olive Mediterranean Grill brings together bold, comforting flavors with the warmth of a neighborhood favorite. From shawarma and grilled plates to fresh salads, family-style favorites and late-night comfort food, every dish is made to feel welcoming and generous.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="location" aria-labelledby="location-title">
        <div className="container split">
          <div className="split-copy" data-reveal>
            <p className="eyebrow">Visit us</p>
            <h2 id="location-title">Location &amp; hours</h2>
            <p className="address">1135 Joliet St<br />Dyer, IN 46311</p>

            <dl className="hours">
              {hours.map((row, index) => (
                <div key={row.day} className={`hours-row${index === today ? ' is-today' : ''}`}>
                  <dt>
                    {row.day}
                    {row.late && <span className="badge">Open late</span>}
                  </dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>

            <div className="location-actions">
              <a className="btn btn-primary" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Get directions</a>
              <a className="btn btn-outline" href={PHONE_HREF}>{PHONE_LABEL}</a>
            </div>
          </div>

          <div className="map-frame" data-reveal style={{ '--delay': '120ms' }}>
            <iframe
              title="Map showing Mount Olive in Dyer, Indiana"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function MenuPage() {
  const categories = Object.keys(menuCategories);
  const [selected, setSelected] = useState(categories[0]);

  return (
    <main className="page">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Mount Olive Mediterranean Grill</p>
          <h1>Our menu</h1>
          <p className="lede">Grilled to order and served fresh. Prices are subject to change.</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Menu categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={category === selected}
              className={`tab${category === selected ? ' is-active' : ''}`}
              onClick={() => setSelected(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="menu-list" key={selected}>
          {menuCategories[selected].map((item, index) => (
            <li key={item.name} className="menu-item" style={{ '--delay': `${index * 50}ms` }}>
              <div className="menu-item-row">
                <h3>{item.name}</h3>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function CateringPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="page">
      <div className="container">
        <section className="page-head catering-head">
          <div>
            <p className="eyebrow">Catering</p>
            <h1>Let us feed the table</h1>
            <p className="lede">
              Share a few details and we’ll help plan a Mediterranean spread that fits your event, guest count and timing.
            </p>
            <ul className="check-list">
              <li>Private events &amp; family gatherings</li>
              <li>Office lunches &amp; corporate events</li>
              <li>Drop-off, pickup or full service</li>
            </ul>
          </div>
          <div className="split-media">
            <img src={chickenShaw} alt="Catering spread" />
          </div>
        </section>

        <form className="form-card" onSubmit={handleSubmit}>
          <h2>Request a quote</h2>
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" name="phone" placeholder="(219) 555-0123" autoComplete="tel" />
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
              <textarea name="notes" rows="5" placeholder="Tell us about your event, preferred dishes, dietary needs, timing or any special requests." />
            </label>
          </div>

          <div className="form-footer">
            <button type="submit" className="btn btn-primary">Request catering</button>
            {submitted && (
              <p className="form-success" role="status">Thanks! We’ll reach out to confirm your event details.</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function App() {
  const [nav, setNav] = useState({ page: 'home', target: null, count: 0 });
  const [scrolled, setScrolled] = useState(false);
  const { page } = nav;

  const navigate = (nextPage, target = null) => {
    setNav((current) => ({ page: nextPage, target, count: current.count + 1 }));
  };

  useReveal(page);

  // After each navigation, scroll to the requested section or back to the top.
  useEffect(() => {
    const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
    const element = nav.target ? document.getElementById(nav.target) : null;
    if (element) {
      element.scrollIntoView({ behavior, block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [nav]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      <Header page={page} scrolled={scrolled} onNavigate={navigate} />
      {page === 'menu' && <MenuPage />}
      {page === 'catering' && <CateringPage />}
      {page === 'home' && <HomePage onNavigate={navigate} />}
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}

export default App;
