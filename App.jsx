import React, { useState } from "react";
import {
  MapPin, Phone, Mail, Menu, X, ChevronRight, AlertTriangle, FileText,
  CalendarClock, Search, Bell, MessageSquareWarning, ClipboardList,
  Megaphone, CalendarDays, Building2, ShieldAlert, ArrowRight, Clock,
  CheckCircle2, Facebook, Globe, ChevronDown
} from "lucide-react";

const COLORS = {
  primary: "#0F4C81",
  primaryDark: "#0A3B66",
  primaryDeeper: "#082C4D",
  bg: "#FFFFFF",
  accent: "#D4AF37",
  accentDeep: "#9C7F22",
  ink: "#122336",
  subink: "#4C5C6E",
  hairline: "#E3E9EF",
  tint: "#F0F5FA",
  alert: "#B23A2E",
  alertTint: "#FBEAE7",
  success: "#1E7A46",
  successTint: "#E9F5EE",
};

const OFFICES = [
  { name: "Municipal Engineering Office", tag: "Infrastructure & roads", services: 12, icon: Building2 },
  { name: "Municipal Health Office", tag: "Health & sanitation", services: 9, icon: Building2 },
  { name: "MDRRMO", tag: "Disaster & emergency response", services: 6, icon: ShieldAlert },
  { name: "Business Permits & Licensing", tag: "Permits & licenses", services: 8, icon: Building2 },
  { name: "Municipal Civil Registrar", tag: "Civil registry documents", services: 10, icon: Building2 },
  { name: "Municipal Social Welfare Office", tag: "Social welfare programs", services: 7, icon: Building2 },
];

const ANNOUNCEMENTS = [
  { office: "Office of the Mayor", priority: "High", title: "Public consultation on the 2027 municipal development plan", date: "Aug 22, 2026" },
  { office: "Municipal Health Office", priority: "Normal", title: "Free anti-rabies vaccination for household pets, all barangays", date: "Aug 20, 2026" },
  { office: "MDRRMO", priority: "High", title: "Heightened alert for possible flooding in low-lying barangays", date: "Aug 16, 2026" },
];

const EVENTS = [
  { month: "AUG", day: "24", title: "Barangay health workers' skills training", office: "Municipal Health Office" },
  { month: "AUG", day: "29", title: "Livelihood and job fair, municipal gymnasium", office: "PESO" },
  { month: "SEP", day: "05", title: "Quarterly public consultation, Sangguniang Bayan", office: "Sangguniang Bayan" },
];

function Badge({ children, tone = "accent" }) {
  const map = {
    accent: { bg: "#FBF3DD", fg: COLORS.accentDeep },
    alert: { bg: COLORS.alertTint, fg: COLORS.alert },
    success: { bg: COLORS.successTint, fg: COLORS.success },
    primary: { bg: COLORS.tint, fg: COLORS.primary },
  };
  const c = map[tone];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: c.bg, color: c.fg }}
    >
      {children}
    </span>
  );
}

function SealMark({ size = 44, ring = COLORS.accent, fg = "#FFFFFF" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="none" stroke={ring} strokeWidth="2" />
      <circle cx="32" cy="32" r="25" fill={COLORS.primaryDark} />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8;
        return (
          <rect
            key={i}
            x="30.6"
            y="8"
            width="2.8"
            height="10"
            fill={ring}
            transform={`rotate(${angle} 32 32)`}
          />
        );
      })}
      <circle cx="32" cy="32" r="11" fill="none" stroke={fg} strokeWidth="1.5" />
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="700" fill={fg} fontFamily="Fraunces, serif">
        MB
      </text>
    </svg>
  );
}

function QuickAction({ icon: Icon, title, desc }) {
  return (
    <button
      className="text-left rounded-xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-0.5"
      style={{
        background: "#FFFFFF",
        border: `1px solid ${COLORS.hairline}`,
        boxShadow: "0 1px 2px rgba(15,76,129,0.06)",
      }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center"
        style={{ background: COLORS.tint }}
      >
        <Icon size={22} color={COLORS.primary} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-semibold text-[15px]" style={{ color: COLORS.ink, fontFamily: "Fraunces, serif" }}>
          {title}
        </p>
        <p className="text-[13px] mt-1 leading-snug" style={{ color: COLORS.subink }}>
          {desc}
        </p>
      </div>
      <span className="text-[13px] font-semibold inline-flex items-center gap-1 mt-1" style={{ color: COLORS.accentDeep }}>
        Get started <ArrowRight size={14} />
      </span>
    </button>
  );
}

export default function MunicipalPortal() {
  const [navOpen, setNavOpen] = useState(false);
  const [refInput, setRefInput] = useState("");

  const navLinks = ["Home", "Services", "Report a Concern", "Appointments", "Announcements", "Events", "Emergency / MDRRMO", "About"];

  return (
    <div style={{ background: COLORS.bg, fontFamily: "'Public Sans', system-ui, sans-serif", color: COLORS.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap');
      `}</style>

      {/* Gov strip */}
      <div style={{ background: COLORS.primaryDeeper }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between text-[12px]">
          <span className="hidden sm:inline" style={{ color: "#AEC4DA" }}>
            Official Website · Republic of the Philippines
          </span>
          <div className="flex items-center gap-4" style={{ color: "#D8E4EF" }}>
            <span className="flex items-center gap-1"><Phone size={12} /> (044) 555-0100</span>
            <span className="hidden sm:flex items-center gap-1"><Mail size={12} /> info@municipality.gov.ph</span>
            <span>Filipino | English</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30" style={{ background: "#FFFFFF", borderBottom: `1px solid ${COLORS.hairline}` }}>
        <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SealMark />
            <div className="leading-tight">
              <p className="font-bold text-[15px]" style={{ color: COLORS.primary, fontFamily: "Fraunces, serif" }}>
                Municipality of San Isidro
              </p>
              <p className="text-[12px]" style={{ color: COLORS.subink }}>Province of Nueva Vizcaya · Demo Portal</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.slice(0, 6).map((l) => (
              <a key={l} href="#" className="text-[13.5px] font-medium hover:opacity-80" style={{ color: COLORS.ink }}>
                {l}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button className="text-[13.5px] font-semibold px-4 py-2 rounded-lg" style={{ color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>
              Log in
            </button>
            <button className="text-[13.5px] font-semibold px-4 py-2 rounded-lg text-white" style={{ background: COLORS.primary }}>
              Register
            </button>
          </div>

          <button className="lg:hidden" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden px-4 pb-4 flex flex-col gap-3" style={{ borderTop: `1px solid ${COLORS.hairline}` }}>
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-[14px] font-medium pt-3" style={{ color: COLORS.ink }}>{l}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 text-[13.5px] font-semibold px-4 py-2 rounded-lg" style={{ color: COLORS.primary, border: `1px solid ${COLORS.primary}` }}>Log in</button>
              <button className="flex-1 text-[13.5px] font-semibold px-4 py-2 rounded-lg text-white" style={{ background: COLORS.primary }}>Register</button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)` }} className="relative overflow-hidden">
        <div className="absolute -right-16 -top-16 opacity-[0.10]">
          <SealMark size={340} ring="#FFFFFF" fg="#FFFFFF" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 relative">
          <Badge tone="accent">Demo data · not an official government record</Badge>
          <h1 className="text-white font-bold text-3xl md:text-[42px] leading-tight mt-4 max-w-2xl" style={{ fontFamily: "Fraunces, serif" }}>
            Your municipality, connected to you.
          </h1>
          <p className="text-[16px] mt-4 max-w-xl leading-relaxed" style={{ color: "#D8E4EF" }}>
            Report concerns, request services, and book appointments with municipal offices online —
            no need to line up or wait on Facebook for a reply.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <button className="px-5 py-3 rounded-lg font-semibold text-[14px] inline-flex items-center gap-2" style={{ background: COLORS.accent, color: COLORS.primaryDeeper }}>
              <MessageSquareWarning size={17} /> Report a Concern
            </button>
            <button className="px-5 py-3 rounded-lg font-semibold text-[14px] text-white inline-flex items-center gap-2" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
              <ClipboardList size={17} /> Request a Service
            </button>
            <button className="px-5 py-3 rounded-lg font-semibold text-[14px] text-white inline-flex items-center gap-2" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>
              <CalendarClock size={17} /> Book an Appointment
            </button>
          </div>

          {/* Track request */}
          <div className="mt-9 max-w-md rounded-xl p-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <p className="text-[12.5px] font-semibold mb-2" style={{ color: "#EFE3B8" }}>Track my request</p>
            <div className="flex gap-2">
              <input
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. MUN-2026-001245"
                className="flex-1 px-3 py-2 rounded-lg text-[13.5px] outline-none"
                style={{ background: "#FFFFFF", color: COLORS.ink }}
              />
              <button className="px-4 rounded-lg font-semibold text-[13.5px]" style={{ background: COLORS.accent, color: COLORS.primaryDeeper }}>
                Track
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency banner */}
      <div style={{ background: COLORS.alertTint, borderBottom: `1px solid #F0CFC7` }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="inline-flex items-center gap-2 font-semibold text-[13.5px]" style={{ color: COLORS.alert }}>
            <AlertTriangle size={17} /> MDRRMO advisory
          </span>
          <p className="text-[13.5px] flex-1" style={{ color: "#7A2A20" }}>
            Demo alert: heightened flood watch for barangays along Rio Chico as of Aug 16, 2026, 6:00 AM.
          </p>
          <a href="#" className="text-[13px] font-semibold inline-flex items-center gap-1 whitespace-nowrap" style={{ color: COLORS.alert }}>
            View emergency info <ChevronRight size={14} />
          </a>
        </div>
      </div>

      {/* Quick actions */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: COLORS.accentDeep }}>Start here</p>
            <h2 className="text-[24px] font-bold mt-1" style={{ fontFamily: "Fraunces, serif" }}>What do you need today?</h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction icon={MessageSquareWarning} title="Report a concern" desc="Roads, drainage, garbage, streetlights, and more." />
          <QuickAction icon={ClipboardList} title="Request a service" desc="Apply for documents and municipal services online." />
          <QuickAction icon={CalendarClock} title="Book an appointment" desc="Schedule a visit with a municipal office." />
          <QuickAction icon={ShieldAlert} title="Report an emergency" desc="Flooding, fire, accidents — routed to MDRRMO first." />
        </div>
      </section>

      {/* Services by office */}
      <section style={{ background: COLORS.tint }} className="py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: COLORS.accentDeep }}>Municipal offices</p>
              <h2 className="text-[24px] font-bold mt-1" style={{ fontFamily: "Fraunces, serif" }}>Services by office</h2>
            </div>
            <a href="#" className="text-[13.5px] font-semibold inline-flex items-center gap-1" style={{ color: COLORS.primary }}>
              View all offices <ChevronRight size={15} />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICES.map((o) => {
              const Icon = o.icon;
              const isMdrrmo = o.name === "MDRRMO";
              return (
                <div
                  key={o.name}
                  className="rounded-xl p-5 bg-white flex items-start gap-4"
                  style={{ border: isMdrrmo ? `1.5px solid ${COLORS.accent}` : `1px solid ${COLORS.hairline}` }}
                >
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: isMdrrmo ? "#FBF3DD" : COLORS.tint }}>
                    <Icon size={20} color={isMdrrmo ? COLORS.accentDeep : COLORS.primary} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="font-semibold text-[14.5px]" style={{ color: COLORS.ink }}>{o.name}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: COLORS.subink }}>{o.tag}</p>
                    <p className="text-[12px] mt-2 font-medium" style={{ color: COLORS.primary }}>{o.services} services listed</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Announcements + Events */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-[22px] font-bold inline-flex items-center gap-2" style={{ fontFamily: "Fraunces, serif" }}>
              <Megaphone size={20} color={COLORS.primary} /> Announcements
            </h2>
            <a href="#" className="text-[13px] font-semibold" style={{ color: COLORS.primary }}>See all</a>
          </div>
          <div className="flex flex-col gap-3">
            {ANNOUNCEMENTS.map((a, i) => (
              <div key={i} className="rounded-xl p-4 flex items-start gap-4" style={{ border: `1px solid ${COLORS.hairline}` }}>
                <div className="w-1.5 self-stretch rounded-full shrink-0" style={{ background: a.priority === "High" ? COLORS.accent : COLORS.hairline }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge tone="primary">{a.office}</Badge>
                    {a.priority === "High" && <Badge tone="accent">Priority</Badge>}
                  </div>
                  <p className="font-semibold text-[14.5px] mt-2" style={{ color: COLORS.ink }}>{a.title}</p>
                  <p className="text-[12.5px] mt-1 inline-flex items-center gap-1" style={{ color: COLORS.subink }}>
                    <Clock size={12} /> Posted {a.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-[22px] font-bold inline-flex items-center gap-2" style={{ fontFamily: "Fraunces, serif" }}>
              <CalendarDays size={20} color={COLORS.primary} /> Events
            </h2>
            <a href="#" className="text-[13px] font-semibold" style={{ color: COLORS.primary }}>Calendar</a>
          </div>
          <div className="flex flex-col gap-3">
            {EVENTS.map((e, i) => (
              <div key={i} className="rounded-xl p-3.5 flex items-center gap-4" style={{ border: `1px solid ${COLORS.hairline}` }}>
                <div className="w-14 h-14 rounded-lg flex flex-col items-center justify-center shrink-0" style={{ background: COLORS.primary }}>
                  <span className="text-white text-[10px] font-semibold">{e.month}</span>
                  <span className="text-white text-[18px] font-bold leading-none" style={{ fontFamily: "Fraunces, serif" }}>{e.day}</span>
                </div>
                <div>
                  <p className="font-semibold text-[13.5px]" style={{ color: COLORS.ink }}>{e.title}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: COLORS.subink }}>{e.office}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track / status strip */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="rounded-2xl p-7 md:p-9 grid md:grid-cols-3 gap-8 items-center" style={{ background: COLORS.primaryDeeper }}>
          <div className="md:col-span-2">
            <h3 className="text-white text-[20px] font-bold" style={{ fontFamily: "Fraunces, serif" }}>Every request, tracked from submission to resolution.</h3>
            <p className="mt-2 text-[14px]" style={{ color: "#B9CCDE" }}>
              Demo figures shown below for illustration only.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[24px] font-bold text-white">1,284</p>
              <p className="text-[11.5px]" style={{ color: "#AEC4DA" }}>Requests this year</p>
            </div>
            <div>
              <p className="text-[24px] font-bold" style={{ color: COLORS.accent }}>92%</p>
              <p className="text-[11.5px]" style={{ color: "#AEC4DA" }}>Resolved</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-white">3.2 days</p>
              <p className="text-[11.5px]" style={{ color: "#AEC4DA" }}>Avg. response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: COLORS.primaryDeeper }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <SealMark size={36} />
              <p className="font-bold text-[14.5px]" style={{ fontFamily: "Fraunces, serif" }}>Municipality of San Isidro</p>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: "#AEC4DA" }}>
              Municipal Hall, Poblacion, San Isidro<br />Nueva Vizcaya, Philippines
            </p>
          </div>
          <div>
            <p className="font-semibold text-[13px] mb-3" style={{ color: COLORS.accent }}>Contact</p>
            <ul className="space-y-2 text-[13px]" style={{ color: "#D8E4EF" }}>
              <li className="flex items-center gap-2"><Phone size={13} /> (044) 555-0100</li>
              <li className="flex items-center gap-2"><Mail size={13} /> info@municipality.gov.ph</li>
              <li className="flex items-center gap-2"><ShieldAlert size={13} /> MDRRMO hotline: 0917-555-0199</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[13px] mb-3" style={{ color: COLORS.accent }}>Quick links</p>
            <ul className="space-y-2 text-[13px]" style={{ color: "#D8E4EF" }}>
              <li>Municipal offices</li>
              <li>Services directory</li>
              <li>Announcements</li>
              <li>Transparency dashboard</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[13px] mb-3" style={{ color: COLORS.accent }}>Legal & access</p>
            <ul className="space-y-2 text-[13px]" style={{ color: "#D8E4EF" }}>
              <li>Privacy policy</li>
              <li>Terms of service</li>
              <li>Accessibility statement</li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-[12px]" style={{ color: "#8FA9C2" }}>
            <span>© 2026 Municipality of San Isidro. Demo platform — placeholder data only.</span>
            <span className="flex items-center gap-3"><Globe size={13} /> <Facebook size={13} /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
