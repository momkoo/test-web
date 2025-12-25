import Link from "next/link";
import Container from "@/components/ui/Container";
import EventCard from "@/components/EventCard";
import NewsSection from "@/components/NewsSection";
import MagazineSection from "@/components/MagazineSection";

const EVENTS_BNM = [
  {
    id: 1,
    date: "14 JAN 2026",
    type: "RÉPÉTITIONS",
    title: "OUVERTURE PUBLIQUE",
    location: "STUDIO, MARSEILLE",
  },
  {
    id: 2,
    date: "02 FEB 2026",
    type: "WORKSHOP",
    title: "DANSE CONTEMPORAINE",
    location: "AUDITORIUM",
  },
  {
    id: 3,
    date: "15 MAR 2026",
    type: "EXTRA",
    title: "RENCONTRE ARTISTES",
    location: "LOBBY",
  },
];

const EVENTS_TOUR = [
  {
    id: 4,
    date: "20 APR 2026",
    type: "SPECTACLE",
    title: "AGE OF CONTENT",
    location: "PARIS, FRANCE",
  },
  {
    id: 5,
    date: "10 MAY 2026",
    type: "SPECTACLE",
    title: "MOOD",
    location: "BERLIN, GERMANY",
  },
  {
    id: 6,
    date: "12 JUN 2026",
    type: "SPECTACLE",
    title: "ROOM WITH A VIEW",
    location: "LONDON, UK",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="dashed-border-b bg-white relative overflow-hidden">
        <Container className="pt-20 pb-32">
          <div className="border border-black inline-block px-3 py-1 mb-6 dashed-border rounded-none">
            <span className="font-bold">02.12.2025</span>
          </div>
          <h1 className="text-jumbo font-bold uppercase leading-[0.85] font-headline break-words">
            Audition<br />
            Apprenti.e.s<br />
            Saison 26/27
          </h1>
          <div className="mt-12">
            <a href="#" className="btn">En Savoir Plus</a>
          </div>
        </Container>
      </section>

      {/* Calendar Section - Horizontal Scroll like BnM */}
      <section className="calendar-section">

        {/* AU BNM Row */}
        <div className="calendar-row">
          <div className="calendar-row-title">Au BnM</div>
          <div className="calendar-scroll">
            {EVENTS_BNM.map((event) => (
              <div key={event.id} className="calendar-card">
                <div className="calendar-card-date">{event.date}</div>
                <div className="calendar-card-type">• {event.type}</div>
                <div className="calendar-card-title">{event.title}</div>
                <div className="calendar-card-location">{event.location}</div>
              </div>
            ))}
          </div>
        </div>

        {/* EN TOURNÉE Row */}
        <div className="calendar-row">
          <div className="calendar-row-title">En Tournée</div>
          <div className="calendar-scroll">
            {EVENTS_TOUR.map((event) => (
              <div key={event.id} className="calendar-card">
                <div className="calendar-card-date">{event.date}</div>
                <div className="calendar-card-type">• {event.type}</div>
                <div className="calendar-card-title">{event.title}</div>
                <div className="calendar-card-location">{event.location}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* News Section with Parallax Effect */}
      <NewsSection />

      {/* Magazine Extended Layouts */}
      <MagazineSection />

      {/* Footer */}
      <footer style={{ background: "#000", color: "#fff", padding: "80px 0" }}>
        <Container>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "32px" }}>Ballet National de Marseille</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", fontSize: "0.875rem" }}>
            <div>
              <p>20 Bd de Gabès, 13008 Marseille</p>
              <p>T +33 (0)4 91 32 72 72</p>
            </div>
            <div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#fff" }}>Facebook</a></li>
                <li style={{ marginBottom: "8px" }}><a href="#" style={{ color: "#fff" }}>Instagram</a></li>
                <li><a href="#" style={{ color: "#fff" }}>Newsletter</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
