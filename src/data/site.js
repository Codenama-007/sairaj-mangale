/**
 * All editable content for the site.
 *
 * PLACEHOLDER CONTENT: the cafe name, address, phone, prices, hours, game
 * titles and reviews below are invented for this demo. Replace them with the
 * real details before launch. Nothing here is sent anywhere — the booking form
 * is a front-end-only demo.
 */

export const site = {
  contact: {
    // +91 numbers are placeholders; keep the 0000 pattern until the real line exists.
    phone: "+91 80 0000 0000",
    phoneHref: "tel:+918000000000",
    email: "hello@sairaj.example",
    address: "Level 2, 44 Circuit Lane, Indiranagar, Bengaluru 560038",
  },

  hours: [
    { days: "Mon — Thu", time: "10:00 — 00:00" },
    { days: "Fri — Sun", time: "10:00 — 04:00" },
  ],

  nav: [
    { href: "#arena", label: "Arena" },
    { href: "#stations", label: "Rigs" },
    { href: "#games", label: "Games" },
    { href: "#pricing", label: "Rates" },
    { href: "#floor", label: "Floor" },
    { href: "#booking", label: "Book" },
  ],

  socials: [
    { label: "Discord", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Steam group", href: "#" },
  ],

  stations: [
    {
      id: "core",
      name: "Core",
      tag: "Entry tier",
      rigs: 12,
      specs: [
        ["GPU", "RTX 4060"],
        ["CPU", "i5-13400F"],
        ["Display", "165Hz IPS"],
        ["Memory", "16GB DDR5"],
        ["Gear", "Logitech G"],
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tag: "Tournament spec",
      rigs: 8,
      featured: true,
      specs: [
        ["GPU", "RTX 4070 Ti"],
        ["CPU", "i7-14700F"],
        ["Display", "240Hz OLED"],
        ["Memory", "32GB DDR5"],
        ["Gear", "Razer Viper + Huntsman"],
      ],
    },
    {
      id: "apex",
      name: "Apex",
      tag: "Stream / creator",
      rigs: 4,
      specs: [
        ["GPU", "RTX 4090"],
        ["CPU", "i9-14900K"],
        ["Display", "360Hz OLED"],
        ["Memory", "64GB DDR5"],
        ["Gear", "Stream Deck + Shure mic"],
      ],
    },
  ],

  games: [
    { title: "Neon Siege", genre: "fps", mode: "5v5", hue: 186 },
    { title: "Ghost Protocol", genre: "fps", mode: "Squad", hue: 200 },
    { title: "Hardlight", genre: "fps", mode: "1v1", hue: 212 },
    { title: "Circuit Breakers", genre: "moba", mode: "5v5", hue: 268 },
    { title: "Null Point", genre: "moba", mode: "3v3", hue: 280 },
    { title: "Redline 2099", genre: "racing", mode: "12 players", hue: 322 },
    { title: "Hyperdrift", genre: "racing", mode: "Time attack", hue: 338 },
    { title: "Synth Strike", genre: "fighting", mode: "1v1", hue: 300 },
    { title: "Chrome Rift", genre: "fighting", mode: "2v2", hue: 312 },
    { title: "Void Runner", genre: "co-op", mode: "4 players", hue: 164 },
    { title: "Data Jack", genre: "co-op", mode: "3 players", hue: 150 },
    { title: "Overclock", genre: "co-op", mode: "6 players", hue: 178 },
  ],

  passes: [
    {
      id: "core",
      name: "Core",
      tag: "Station rate",
      weekday: 120,
      weekend: 150,
      unit: "/ hour",
      features: ["RTX 4060 · 165Hz IPS", "Any available Core rig", "Per-player pricing"],
    },
    {
      id: "pro",
      name: "Pro",
      tag: "Station rate",
      weekday: 180,
      weekend: 220,
      unit: "/ hour",
      featured: true,
      features: ["RTX 4070 Ti · 240Hz OLED", "Priority queue at peak hours", "Free energy refill"],
    },
    {
      id: "apex",
      name: "Apex",
      tag: "Station rate",
      weekday: 260,
      weekend: 320,
      unit: "/ hour",
      features: ["RTX 4090 · 360Hz OLED", "Streaming pod on request", "Priority queue at peak hours"],
    },
    {
      id: "night",
      name: "Night pass",
      tag: "Flat rate",
      weekday: 699,
      weekend: 899,
      unit: "/ night",
      features: ["22:00 — 06:00, any tier", "Subject to open stations", "Unlimited coffee refills"],
    },
  ],

  gallery: [
    { area: "a", title: "The floor", meta: "24 stations, zero daylight", hue: 188, glyph: "24" },
    { area: "b", title: "Squad pods", meta: "Closed-door rooms, 4 — 6 seats", hue: 280, glyph: "POD" },
    { area: "c", title: "The stage", meta: "Friday night brackets", hue: 322, glyph: "LIVE" },
    { area: "d", title: "The bar", meta: "Coffee at 2AM", hue: 158, glyph: "02:00" },
    { area: "e", title: "After hours", meta: "Open till 4 on weekends", hue: 214, glyph: "04AM" },
  ],

  // Invented quotes — swap in real, permissioned reviews before launch.
  reviews: [
    {
      quote:
        "Booked one hour, stayed five. The 360Hz panel has ruined my setup at home and I'm not even mad.",
      name: "Aditya R.",
      handle: "@adityafps",
    },
    {
      quote:
        "Our college squad rents a pod every Friday. The staff actually know the games, which is rarer than it should be.",
      name: "Meera K.",
      handle: "@meerakills",
    },
    {
      quote:
        "The only place in the city where 'my ping' stops being an excuse. Wired, quiet, and the chairs don't destroy your back.",
      name: "Rohan D.",
      handle: "@rohanxd",
    },
    {
      quote:
        "Coffee at 2AM, a proper kitchen, and nobody shouting at the counter. This is where my salary goes now.",
      name: "Nikhil S.",
      handle: "@nixplays",
    },
  ],

  booking: {
    times: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  },
};
