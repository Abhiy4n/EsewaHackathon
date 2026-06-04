import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import logo from "../assets/logo.png";
import banner1 from "../assets/banner1.webp";
import banner2 from "../assets/banner2.webp";
import businessQr from "../assets/Business Qr Request.webp";
import ieltsRegistration from "../assets/IELTS Registration.webp";
import alfaHealth from "../assets/Alfa heath care & Diagnostic center.webp";
import oppl from "../assets/Oppl.jpg";
import eglinesStore from "../assets/EglinesStore.webp";
import aasaLuxe from "../assets/aasaLuxe.webp";
import tsArmoire from "../assets/tsArmoire.jpg";
import nameHeath from "../assets/NAME heath.webp";
import colourNepal from "../assets/colorNepal.webp";
import user from "../assets/user.png";
import lock from "../assets/padlock.png";
import search from "../assets/searchIcon.png";

const styles = `
  * { font-family: 'Roboto', sans-serif; box-sizing: border-box;}
body{background: #f5f6fb;}

  /* ── HEADER ── */
  .hp-header {
    background: #1c252e; color: #fff; display: flex;
    justify-content: center; align-items: center;
    position: sticky; height: 70px; top: 0; z-index: 50;
  }
  .hp-header-inner {
    width: 1170px; padding: 0 15px; height: 60px;
    display: flex; align-items: center; justify-content: space-between; gap: 30px;
  }
  .hp-header-left { display: flex; gap: 58px; flex: 1; align-items: center; }
  .hp-logo { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }
  .hp-logo img { height: 30px; width: auto; display: block; }
  .hp-search-wrap { flex: 1; max-width: 470px; position: relative; }
  .hp-sch-icon { position: absolute; height: 16px; width: 16px; top: 10px; left: 10px; color: #888; }
  .hp-search-wrap input {
    width: 100%; background: #28323c; border: none; color: white;
    padding: 7px 14px 7px 34px; font-size: 13px; outline: none; border-radius: 6px;
  }
  .hp-search-wrap input::placeholder { color: #888; }
  .hp-search-wrap input:focus { background: white; color: black; }
  .hp-header-right {
    display: flex; flex-direction: column; align-items: center;
    padding-top: 15px; gap: 1px; flex-shrink: 0;
  }
  .hp-forgot { font-size: 0.7rem; color: #ccc; text-decoration: none; }
  .hp-forgot:hover { color: #60bb46; }
  .hp-header-right-top { display: flex; gap: 5px; align-items: center; }
  .hp-user-auth { display: flex; gap: 5px; }
  .hp-user-id-container, .hp-user-pass-container { position: relative; }
  .hp-auth-icon { position: absolute; height: 15px; width: 13px; top: 10px; left: 8px; color: #888; }
  .hp-user-auth input {
    width: 155px; background: #28323c; border: none; color: white;
    padding: 7px 14px 7px 28px; font-size: 13px; outline: none; border-radius: 2px;
  }
  .hp-user-auth input:focus { background: white; color: black; }
  .hp-user-auth input::placeholder { color: #888; }
  .hp-buttons { display: flex; gap: 5px; }
  .hp-btn-login, .hp-btn-register {
    padding: 5px 20px; border-radius: 2px; cursor: pointer; border: none; font-size: 0.8rem;
  }
  .hp-btn-login { background: #60bb46; color: white; }
  .hp-btn-register { border: 2px solid #60bb46; background: transparent; color: #60bb46; }
  .hp-btn-register:hover { background: #60bb46; color: white; }

  /* ── NAVBAR ── */
  .hp-nav {
    background: #60bb46; height: 38px;
    display: flex; align-items: center; justify-content: center;
  }
  .hp-nav-inner { width: 1170px; padding: 0 15px; }
  .hp-nav-list { display: flex; gap: 30px; list-style: none; margin: 0; padding: 0; }
  .hp-nav-list li { font-size: .85rem; }
  .hp-nav-list li a { color: white; text-decoration: none; }
  .hp-nav-list li a:hover { color: #d4f0cb; }

  /* ── FEATURES ── */
  .hp-features-wrap { display: flex; justify-content: center; background: #f2f4f7; }
  .hp-features {
    width: 1170px; margin-top: 15px; padding: 0 15px;
    display: flex; gap: 20px; height: 343px;
  }
  .hp-sidebar {
    background: white; width: 220px; padding: 15px 0;
    box-shadow: 0 1px 6px 1px #e6eaf8; border-radius: 5px; flex-shrink: 0;
  }
  .hp-feature-list { display: flex; flex-direction: column; list-style: none; margin: 0; padding: 0; font-size: 0.8rem; }
  .hp-feature-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 14px; cursor: pointer; color: #1a1a1a;
  }
  .hp-feature-item:hover { background: #f5f5f5; color: #60bb46; }
  .hp-slideshow {
    flex: 1; height: 100%; border-radius: 5px;
    box-shadow: 0 1px 6px 1px #e6eaf8; overflow: hidden; position: relative;
  }
  .hp-slide-track { display: flex; height: 100%; transition: transform 3s ease; }
  .hp-slide {
    width: 100%; height: 100%; display: flex; align-items: center;
    justify-content: center; flex: 0 0 50%;
  }

  /* ── CAROUSEL CARDS ── */
  .hp-service-container { width: 1150px; margin: 20px auto; padding: 10px; }
  .hp-service-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
  }
  .hp-section-title { font-weight: 550; font-size: 14px; color: #3f3f3f; margin: 0; }
  .hp-view-more-btn {
    font-size: 13px; color: #4e9a39; background: #dff1da; border-radius: 6px;
    padding: 5px 14px; text-decoration: none; cursor: pointer; white-space: nowrap;
    transition: background 0.18s, color 0.18s;
  }
  .hp-view-more-btn:hover { background: #60bb46; color: #fff; }
  .hp-card-container {
    background: #ffffff; padding: 16px; border-radius: 12px;
    display: flex; gap: 20px; position: relative;
    box-shadow: 0 1px 6px rgba(0,0,0,0.07);
  }
  .hp-card {
    position: relative; display: flex; flex-direction: column; width: 20%;
    gap: 10px;
    border-radius: 5px; overflow: hidden; border: 1px solid #ebebeb; background: #f5f6fb;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06); transition: box-shadow 0.2s, transform 0.2s;
  }
  .hp-card:hover { box-shadow: 0 4px 16px rgba(61,187,110,0.13); transform: translateY(-2px); }
  .hp-card-overlay { position: absolute; top: 0; left: 0; z-index: 2; }
  .hp-card-overlay p {
    margin: 0; font-size: 11px; color: #4e9a39; background: #dff1da;
    border: 1px solid #b6e8ca; padding: 2px 9px; font-weight: 550;
    white-space: nowrap; line-height: 1.6;
  }
  .hp-card-image {
    background: #ffffff; display: flex; align-items: center; justify-content: center;
    padding: 24px 16px 20px; margin: 17px auto 0; width: 80px; height: 67px;
    border-radius: 63% 37% 30% 70% / 50% 45% 55% 50%;
  }
  .hp-card-img-placeholder { width: 50px; height: 50px; background: #d0e8ff; border-radius: 50%; }
  .hp-card-image img { width: 80px; height: 80px; object-fit: contain; display: block; }
  .hp-card-bottom {
    background: #ffffff; display: flex; flex-direction: column;
    justify-content: space-between; align-items: center;
    height: 100px; gap: 20px; padding: 10px; width: 100%;
  }
  .hp-card-title { margin: 5px 0 0 0; font-size: 11px; font-weight: 550; color: #4d4d4d; text-align: center; line-height: 1.35; }
  .hp-card-link { font-size: 12px; color: #60bb46; font-weight: 550; text-decoration: none; }
  .hp-card-link:hover { text-decoration: underline; }
  .hp-carousel-arrow {
    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; background: #ddffd9;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.10); z-index: 10;
    transition: background 0.30s; color: #29920f;
  }
  .hp-carousel-arrow:hover { background: #60bb44; color: white; }
`;

// ── ICONS ──────────────────────────────────────────────────────────────────
function ArrowRight({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    );
}

// ── HEADER ─────────────────────────────────────────────────────────────────
function Header({ onRegister, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <header className="hp-header">
            <div className="hp-header-inner">
                <div className="hp-header-left">
                    <div className="hp-logo">
                        <img src={logo} alt="eSewa Logo" />
                    </div>
                    <div className="hp-search-wrap">
                        <img src={search} className="hp-sch-icon" />
                        <input type="text" placeholder="Search services/merchant by tags (e.g. adsl)" />
                    </div>
                </div>
                <div className="hp-header-right">
                    <form onSubmit={handleLogin} className="hp-header-right-top">
                        <div className="hp-user-auth">
                            <div className="hp-user-id-container">
                                <img src={user} className="hp-auth-icon" />
                                <input 
                                    type="text" 
                                    placeholder="eSewa ID" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="hp-user-pass-container">
                                <img src={lock} className="hp-auth-icon" />
                                
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="hp-buttons">
                            <button type="submit" className="hp-btn-login">Login</button>
                            <button type="button" className="hp-btn-register" onClick={onRegister}>Register</button>
                        </div>
                    </form>
                    <a href="#" className="hp-forgot">Forgot password?</a>
                </div>
            </div>
        </header>
    );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────
function NavBar() {
    return (
        <nav className="hp-nav">
            <div className="hp-nav-inner">
                <ul className="hp-nav-list">
                    <li><a href="#">Top Up</a></li>
                    <li><a href="#">Airlines</a></li>
                    <li><a href="#">Internet Bill</a></li>
                    <li><a href="#">Load Fund</a></li>
                </ul>
            </div>
        </nav>
    );
}

// ── FEATURES ───────────────────────────────────────────────────────────────
const featureItems = [
    "Topup & recharge",
    "Electricity & Water",
    "TV Payment",
    "Bus Ticket/Tours and Travels",
    "Education Payment",
    "DOFE/Insurance Payment",
    "Financial Services",
    "Movies & Entertainment",
];

// Swap these with your actual imported image paths e.g. import banner1 from "../assets/banner1.webp"
const slides = [
    banner1,
    banner2
];

function Features() {
    // Duplicate slides so we can move left-only and reset instantly when reaching the duplicate
    const trackSlides = slides.concat(slides);
    const slideCount = slides.length;
    const total = trackSlides.length; // slideCount * 2

    const [current, setCurrent] = useState(0);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => Math.min(prev + 1, slideCount));
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Use transitionend to reliably detect end of slide animation and reset instantly
    const trackRef = useRef(null);

    function handleTransitionEnd(e) {
        if (e.propertyName !== 'transform') return;
        if (current === slideCount) {
            setIsResetting(true);
            setCurrent(0);
            requestAnimationFrame(() => requestAnimationFrame(() => setIsResetting(false)));
        }
    }

    const slidePercent = 100 / total;

    const trackStyle = {
        width: `${total * 100}%`,
        transform: `translateX(-${current * slidePercent}%)`,
        transition: isResetting ? 'none' : 'transform 3s ease',
    };

    const slideStyle = { flex: `0 0 ${slidePercent}%` };

    return (
        <aside className="hp-features-wrap">
            <div className="hp-features">
                <div className="hp-sidebar">
                    <ul className="hp-feature-list">
                        {featureItems.map((item) => (
                            <li key={item} className="hp-feature-item">
                                <span>{item}</span>
                                <ArrowRight />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="hp-slideshow">
                    <div className="hp-slide-track" style={trackStyle} ref={trackRef} onTransitionEnd={handleTransitionEnd}>
                        {trackSlides.map((s, idx) => (
                            <div className="hp-slide" key={idx} style={slideStyle}>
                                <img
                                    src={s}
                                    alt={`Banner ${ (idx % slideCount) + 1 }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

// ── CAROUSEL LIST ──────────────────────────────────────────────────────────
function CarouselList({ data, mainTitle }) {
    return (
        <section className="hp-service-container">
            <div className="hp-service-header">
                <p className="hp-section-title">{mainTitle}</p>
                <a href="#" className="hp-view-more-btn">View more</a>
            </div>
            <div className="hp-card-container">
                {data.map((item, i) => (
                    <div className="hp-card" key={i}>
                        <div className="hp-card-overlay"><p>{item.overlay}</p></div>
                        <div className="hp-card-image">
                            {item.image ? (
                                <img src={item.image} alt={item.title} />
                            ) : (
                                <div className="hp-card-img-placeholder" />
                            )}
                        </div>
                        <div className="hp-card-bottom">
                            <p className="hp-card-title">{item.title}</p>
                            <a href="#" className="hp-card-link">View Details</a>
                        </div>
                    </div>
                ))}
                <button className="hp-carousel-arrow" aria-label="Next">
                    <ArrowRight size={20} />
                </button>
            </div>
        </section>
    );
}

// ── DATA ───────────────────────────────────────────────────────────────────
const featuredServices = [
    { overlay: "Request QR", title: "Business QR Request", image: businessQr },
    { overlay: "eSpeaker Request", title: "eSpeaker Request", image: oppl },
    { overlay: "IELTS", title: "IELTS Registration", image: ieltsRegistration },
    { overlay: "3% Discount", title: "Name Health", image: nameHeath },
    { overlay: "Up to 50% Cashback", title: "Alfa Health Care & Diagnostic Center", image: alfaHealth },
];

const merchantSpotlight = [
    { overlay: "10% Discount", title: "Colour Nepal", image: colourNepal },
    { overlay: "10% Discount", title: "Eglines Store", image: eglinesStore },
    { overlay: "10% Discount", title: "Tsarmoire Online Store Pvt. Ltd.", image: tsArmoire },
    { overlay: "10% Discount", title: "Aasa Luxe", image: aasaLuxe },
    { overlay: "3% Discount", title: "Name Health", image: nameHeath },
];

// ── HOME PAGE ──────────────────────────────────────────────────────────────
export default function HomePage() {
    useEffect(() => {
        const tag = document.createElement("style");
        tag.setAttribute("data-homepage", "true");
        tag.textContent = styles;
        document.head.appendChild(tag);
        return () => tag.remove();
    }, []);

    const handleLogin = ({ email, password }) => {
        if (!email || !password) {
            return;
        }

        router.get(route('dashboard'));
    };

    const handleRegister = () => {
        router.get(route('register'));
    };

    return (
        <>
            <Header onRegister={handleRegister} onLogin={handleLogin} />
            <NavBar />
            <Features />
            <CarouselList data={featuredServices} mainTitle="Featured Services" />
            <CarouselList data={merchantSpotlight} mainTitle="Merchant Spotlight" />
        </>
    );
}