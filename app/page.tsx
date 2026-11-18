"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, CalendarDays, Check, Clock3, Heart, MapPin, Menu, Music2, Pause, Play, X } from "lucide-react";

const EVENT_DATE = new Date("2026-12-13T18:00:00+05:30");
const MAP_URL = "https://maps.app.goo.gl/RRjBkYcWc6pVd2x18";
const RSVP_NUMBER = process.env.NEXT_PUBLIC_RSVP_WHATSAPP || "";

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, EVENT_DATE.getTime() - now);
  const units = [
    { label: "Days", value: Math.floor(remaining / 86400000) },
    { label: "Hours", value: Math.floor((remaining / 3600000) % 24) },
    { label: "Minutes", value: Math.floor((remaining / 60000) % 60) },
    { label: "Seconds", value: Math.floor((remaining / 1000) % 60) }
  ];
  return <div className="countdown" aria-label="Countdown to the reception">
    {units.map((unit) => <div className="countdown-unit" key={unit.label}>
      <span className="count-number">{String(unit.value).padStart(2, "0")}</span>
      <span className="count-label">{unit.label}</span>
    </div>)}
  </div>;
}

function MusicControl() {
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const player = new Audio("/music.mp3");
    player.loop = true;
    player.volume = 0.35;
    setAudio(player);
    return () => { player.pause(); player.src = ""; };
  }, []);

  async function toggle() {
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        alert("Add your music file as public/music.mp3, then tap play again.");
      }
    }
  }
  return <button className="music-button" onClick={toggle} aria-label={playing ? "Pause background music" : "Play background music"}>
    {playing ? <Pause size={16}/> : <Play size={16}/>} <span>{playing ? "Pause music" : "Play music"}</span>
  </button>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState("Joyfully accepts");

  const navItems = useMemo(() => [
    ["Our story", "#story"], ["The celebration", "#details"], ["Gallery", "#gallery"], ["RSVP", "#rsvp"]
  ], []);

  function submitRsvp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = `Hello! ${guestName} — ${attendance} the wedding reception of Naveen & Dharshini. Guests: ${guestCount}.`;
    if (RSVP_NUMBER) {
      window.open(`https://wa.me/${RSVP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:?subject=${encodeURIComponent("RSVP - Naveen & Dharshini")}&body=${encodeURIComponent(message)}`;
    }
    setRsvpOpen(false);
  }

  return (
    <main>
      <div className="topbar">
        <a className="brand" href="#home">G <span>&</span> I</a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="top-actions"><MusicControl/><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button></div>
      </div>

      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content reveal">
          <p className="eyebrow light">A NEW CHAPTER BEGINS</p>
          <p className="hero-intro">Together with our families</p>
          <h1>Gokul <i>&</i><br/>Indhuja</h1>
          <div className="ornament"><span/> <Heart size={14} fill="currentColor"/> <span/></div>
          <p className="hero-date">13 · 12 · 2026</p>
          <p className="hero-venue">Sri Vaasavi Mahal · Rasipuram</p>
          <a className="outline-button" href="#details">Discover the celebration <ArrowDown size={15}/></a>
        </div>
        <div className="hero-side-note">A DAY TO REMEMBER · A LOVE TO CELEBRATE</div>
      </section>

      <section className="welcome section-pad" id="story">
        <div className="section-kicker">WITH LOVE & GRATITUDE</div>
        <div className="welcome-mark">“</div>
        <h2>Two hearts.<br/><em>One beautiful</em> forever.</h2>
        <p className="body-copy">Some moments become memories. Some people become home. We are beginning our forever, and it would mean the world to have you with us as we celebrate this special chapter.</p>
        <div className="couple-names"><span>G.G. Gokul</span><Heart size={18}/><span>S. Indhuja</span></div>
      </section>

      <section className="details-section section-pad" id="details">
        <div className="section-kicker">SAVE THE DATE</div>
        <h2>The <em>celebration</em></h2>
        <p className="body-copy">An evening filled with warmth, laughter and the people we love.</p>
        <div className="event-card">
          <div className="event-card-top"><span>THE WEDDING RECEPTION</span><span>13 / XII / MMXXVI</span></div>
          <div className="event-main">
            <div className="event-date"><span>DECEMBER</span><strong>13</strong><span>SUNDAY · 2026</span></div>
            <div className="event-divider"/>
            <div className="event-info">
              <div><CalendarDays/><span><b>Sunday, 13 December 2026</b><small>Save this date</small></span></div>
              <div><Clock3/><span><b>6:00 PM – 9:00 PM</b><small>An evening celebration</small></span></div>
              <div><MapPin/><span><b>Sri Vaasavi Mahal</b><small>Rasipuram Tamil Nadu, India</small></span></div>
              <a className="text-link" href={MAP_URL} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={14}/></a>
            </div>
          </div>
          <div className="event-card-bottom">YOUR PRESENCE IS OUR GREATEST GIFT</div>
        </div>
        <div className="countdown-heading">COUNTING THE MOMENTS</div>
        <Countdown/>
      </section>

      <section className="quote-band">
        <div className="quote-overlay"/>
        <div className="quote-content"><span className="quote-mark">“</span><p>Where there is love,<br/>there is <em>always</em> a reason to celebrate.</p><span className="quote-sign">G & I</span></div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-kicker">A LITTLE INSPIRATION</div>
        <h2>Moments of <em>romance</em></h2>
        <p className="body-copy">A glimpse of the timeless beauty and joy we hope to share.</p>
        <div className="gallery-grid">
          <div className="gallery-photo photo-one"><span>01 / TOGETHER</span></div>
          <div className="gallery-photo photo-two"><span>02 / FOREVER</span></div>
          <div className="gallery-photo photo-three"><span>03 / ALWAYS</span></div>
        </div>
        <p className="gallery-note">Replace these sample photographs with your own favourite memories.</p>
      </section>

      <section className="rsvp-section section-pad" id="rsvp">
        <div className="section-kicker light">WE HOPE YOU CAN JOIN US</div>
        <h2>Your presence<br/>is our <em>present.</em></h2>
        <p>Kindly let us know if you can celebrate with us.</p>
        <div className="rsvp-date">13 DECEMBER 2026 · 6 PM – 9 PM · RASIPURAM</div>
      </section>

      <footer className="footer">
        <div className="footer-monogram">G <span>&</span> I</div>
        <p>With love, Gokul & Indhuja</p>
        <span>MADE WITH LOVE · 2026</span>
        <a href="#home" className="back-top">BACK TO TOP ↑</a>
      </footer>

      {rsvpOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setRsvpOpen(false); }}>
        <div className="rsvp-modal" role="dialog" aria-modal="true" aria-labelledby="rsvp-title">
          <button className="modal-close" onClick={() => setRsvpOpen(false)} aria-label="Close"><X/></button>
          <div className="section-kicker">KINDLY REPLY</div>
          <h2 id="rsvp-title">Will you <em>join us?</em></h2>
          <form onSubmit={submitRsvp}>
            <label>Your name<input required value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Enter your name"/></label>
            <label>Response<select value={attendance} onChange={e => setAttendance(e.target.value)}><option>Joyfully accepts</option><option>Regretfully declines</option></select></label>
            <label>Number of guests<select value={guestCount} onChange={e => setGuestCount(e.target.value)}>{[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}</select></label>
            <button className="gold-button full" type="submit">Send RSVP <ArrowUpRight size={15}/></button>
          </form>
          <p className="modal-footnote">Your response will open WhatsApp if configured, otherwise your email app.</p>
        </div>
      </div>}
    </main>
  );
}
