import { site } from "./data/site.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const fmt = new Intl.NumberFormat("en-IN");

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

const pad = (value) => String(value).padStart(2, "0");

/* ---------- Rendering ---------- */

function renderStations() {
  const grid = $("[data-stations]");
  if (!grid) return;

  grid.innerHTML = site.stations
    .map(
      (station, index) => `
      <article class="station panel${station.featured ? " station--featured" : ""}" data-reveal style="--reveal-delay: ${index * 70}ms">
        <div class="station__top">
          <span class="station__index">${pad(index + 1)}</span>
          ${station.featured ? '<span class="badge">Most booked</span>' : ""}
        </div>
        <div class="station__head">
          <h3 class="station__name">${escapeHtml(station.name)}</h3>
          <p class="station__tag">${escapeHtml(station.tag)}</p>
        </div>
        <dl class="station__specs">
          ${station.specs
            .map(
              ([key, value]) =>
                `<div class="station__spec"><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`,
            )
            .join("")}
        </dl>
        <div class="station__foot">
          <span class="station__rigs">${station.rigs} stations</span>
          <button class="link-arrow" type="button" data-book-station="${station.id}">
            Book ${escapeHtml(station.name)} <span aria-hidden="true">→</span>
          </button>
        </div>
      </article>`,
    )
    .join("");
}

function renderGames() {
  const grid = $("[data-games]");
  if (!grid) return;

  grid.innerHTML = site.games
    .map(
      (game, index) => `
      <article class="game" data-genre="${game.genre}" data-reveal style="--reveal-delay: ${(index % 4) * 55}ms">
        <div class="game__thumb" style="--h: ${game.hue}">
          <span class="game__index" aria-hidden="true">${pad(index + 1)}</span>
          <span class="game__genre">${escapeHtml(game.genre)}</span>
        </div>
        <div class="game__body">
          <h3 class="game__title">${escapeHtml(game.title)}</h3>
          <p class="game__meta">${escapeHtml(game.mode)}</p>
        </div>
      </article>`,
    )
    .join("");
}

function renderPasses() {
  const grid = $("[data-passes]");
  if (!grid) return;

  grid.innerHTML = site.passes
    .map(
      (pass, index) => `
      <article class="pass panel${pass.featured ? " pass--featured" : ""}" data-reveal="scale" style="--reveal-delay: ${index * 70}ms">
        <div class="pass__top">
          <p class="pass__tag">${escapeHtml(pass.tag)}</p>
          ${pass.featured ? '<span class="badge badge--solid">Popular</span>' : ""}
        </div>
        <h3 class="pass__name">${escapeHtml(pass.name)}</h3>
        <p class="pass__price">
          <span class="pass__currency" aria-hidden="true">₹</span>
          <span data-price="${pass.id}">${fmt.format(pass.weekday)}</span>
          <span class="pass__unit">${escapeHtml(pass.unit)}</span>
        </p>
        <ul class="pass__features">
          ${pass.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
        </ul>
        <a class="btn ${pass.featured ? "btn--primary" : "btn--ghost"} pass__cta" href="#booking" data-book-tier="${pass.id}">
          Choose ${escapeHtml(pass.name)}
        </a>
      </article>`,
    )
    .join("");
}

function renderGallery() {
  const grid = $("[data-gallery]");
  if (!grid) return;

  grid.innerHTML = site.gallery
    .map(
      (item, index) => `
      <figure class="gallery__item gallery__item--${item.area}" data-reveal="scale" style="--reveal-delay: ${index * 60}ms">
        <div class="gallery__art" style="--h: ${item.hue}" aria-hidden="true"></div>
        <figcaption class="gallery__cap">
          <span class="gallery__num">${pad(index + 1)}</span>
          <span class="gallery__title">${escapeHtml(item.title)}</span>
          <span class="gallery__meta">${escapeHtml(item.meta)}</span>
        </figcaption>
      </figure>`,
    )
    .join("");
}

function renderReviews() {
  const track = $("[data-reviews]");
  if (!track) return;

  const card = (review) => `
    <figure class="review panel">
      <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
      <blockquote class="review__quote">${escapeHtml(review.quote)}</blockquote>
      <figcaption class="review__by">
        <span class="review__name">${escapeHtml(review.name)}</span>
        <span class="review__handle">${escapeHtml(review.handle)}</span>
      </figcaption>
    </figure>`;

  const group = `<div class="reviews__group">${site.reviews.map(card).join("")}</div>`;
  track.innerHTML = group + `<div class="reviews__group" aria-hidden="true">${site.reviews.map(card).join("")}</div>`;
}

function renderSiteChrome() {
  $$("[data-contact-address]").forEach((el) => {
    el.textContent = site.contact.address;
  });

  $$("[data-contact-phone]").forEach((el) => {
    el.textContent = site.contact.phone;
    el.setAttribute("href", site.contact.phoneHref);
  });

  $$("[data-contact-email]").forEach((el) => {
    el.textContent = site.contact.email;
    el.setAttribute("href", `mailto:${site.contact.email}`);
  });

  $$("[data-hours]").forEach((el) => {
    el.innerHTML = site.hours
      .map((entry) => `<div><dt>${escapeHtml(entry.days)}</dt><dd>${escapeHtml(entry.time)}</dd></div>`)
      .join("");
  });

  const footerNav = $("[data-footer-nav]");
  if (footerNav) {
    footerNav.innerHTML = site.nav
      .map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}</a></li>`)
      .join("");
  }

  const footerSocials = $("[data-footer-socials]");
  if (footerSocials) {
    footerSocials.innerHTML = site.socials
      .map(
        (item) =>
          `<li><a href="${item.href}" rel="noopener">${escapeHtml(item.label)}</a></li>`,
      )
      .join("");
  }

  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

function renderBookingOptions() {
  const timeSelect = $('select[name="time"]');
  if (timeSelect) {
    timeSelect.insertAdjacentHTML(
      "beforeend",
      site.booking.times.map((time) => `<option value="${time}">${time}</option>`).join(""),
    );
  }

  const stationSelect = $('select[name="station"]');
  if (stationSelect) {
    stationSelect.insertAdjacentHTML(
      "beforeend",
      site.stations
        .map(
          (station) =>
            `<option value="${station.id}">${escapeHtml(station.name)} — ${escapeHtml(station.tag)}</option>`,
        )
        .join(""),
    );
  }
}

/* ---------- Behaviour ---------- */

function initNav() {
  const header = $("[data-header]");
  const toggle = $("[data-nav-toggle]");
  const menu = $("#nav-menu");
  if (!header || !toggle || !menu) return;

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("is-locked", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 1025px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });

  const progress = $("[data-progress]");
  let ticking = false;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      progress.style.width = `${(ratio * 100).toFixed(2)}%`;
    }
    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScroll);
  };

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);
  onScroll();

  const links = $$("[data-nav-link]");
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  links.forEach((link) => link.setAttribute("aria-current", "false"));

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.setAttribute("aria-current", String(link.getAttribute("href") === id));
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  const items = $$("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  const animate = (el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    const decimals = Number(el.dataset.decimals || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1300;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        el.classList.add("is-complete");
      }
    };

    window.requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        instance.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  counters.forEach((el) => {
    const decimals = Number(el.dataset.decimals || 0);
    el.textContent = `${(0).toFixed(decimals)}${el.dataset.suffix || ""}`;
    observer.observe(el);
  });
}

function initGames() {
  const grid = $("[data-games]");
  const buttons = $$("[data-filter]");
  const count = $("[data-games-count]");
  if (!grid || !buttons.length) return;

  const cards = $$(".game", grid);

  const updateCount = (shown, label) => {
    if (!count) return;
    const suffix = label === "All" ? "" : ` · ${label}`;
    count.textContent = `${shown} of ${cards.length} titles${suffix}`;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((candidate) => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });

      let shown = 0;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.genre === filter;
        card.hidden = !match;
        if (match) shown += 1;
      });

      updateCount(shown, button.textContent.trim());
    });
  });

  updateCount(cards.length, "All");
}

function initPricing() {
  const buttons = $$("[data-rate]");
  const note = $("[data-rate-note]");
  if (!buttons.length) return;

  const labels = {
    weekday: "Mon — Thu rates",
    weekend: "Fri — Sun rates",
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.rate;
      if (!Object.hasOwn(labels, mode)) return;

      buttons.forEach((candidate) => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });

      site.passes.forEach((pass) => {
        const value = document.querySelector(`[data-price="${pass.id}"]`);
        if (!value) return;

        const next = fmt.format(pass[mode]);
        if (value.textContent === next) return;

        value.textContent = next;
        const price = value.closest(".pass__price");
        if (price) {
          price.classList.remove("is-updating");
          void price.offsetWidth;
          price.classList.add("is-updating");
        }
      });

      if (note) {
        note.textContent = `${labels[mode]} · Prices in INR, inclusive of taxes · Demo pricing, not a live menu.`;
      }
    });
  });
}

function initBooking() {
  const form = $("[data-booking-form]");
  if (!form) return;

  const status = $("[data-form-status]", form);
  const dateInput = form.elements.namedItem("date");
  const now = new Date();
  const isoToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  if (dateInput) dateInput.min = isoToday;

  const rules = {
    name: (value) => value.trim().length >= 2 || "Enter your name or gamertag.",
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) || "Enter a valid email address.",
    date: (value) => Boolean(value) || "Pick a date.",
    time: (value) => Boolean(value) || "Pick a start time.",
    station: (value) => Boolean(value) || "Pick a station.",
    players: (value) => Boolean(value) || "Pick a party size.",
  };

  const setError = (name, message) => {
    const field = form.elements.namedItem(name);
    const output = $(`[data-error-for="${name}"]`, form);
    if (output) output.textContent = message || "";
    if (!field) return;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  };

  Object.keys(rules).forEach((name) => setError(name, ""));

  form.addEventListener("input", (event) => {
    const name = event.target.name;
    if (name && rules[name]) setError(name, "");
  });

  form.addEventListener("change", (event) => {
    const name = event.target.name;
    if (name && rules[name]) setError(name, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    const errors = {};

    Object.entries(rules).forEach(([name, validate]) => {
      const result = validate(String(data[name] ?? ""));
      if (result !== true) errors[name] = result;
    });

    if (!errors.date && data.date && data.date < isoToday) {
      errors.date = "Pick a date from today onward.";
    }

    Object.keys(rules).forEach((name) => setError(name, errors[name] || ""));

    const firstInvalid = Object.keys(rules).find((name) => errors[name]);
    if (firstInvalid) {
      const field = form.elements.namedItem(firstInvalid);
      if (field) field.focus();
      return;
    }

    const station = site.stations.find((entry) => entry.id === data.station);
    const rows = [
      ["Name", data.name],
      ["When", `${data.date} · ${data.time}`],
      ["Station", station ? `${station.name} (${station.tag})` : data.station],
      ["Players", data.players],
    ];

    if (status) {
      status.innerHTML = `
        <p class="form-status__kicker">Request logged — demo only</p>
        <p class="form-status__title">See you at ${escapeHtml(data.time)}, ${escapeHtml(data.name)}.</p>
        <ul class="form-status__list">
          ${rows
            .map(
              ([label, value]) =>
                `<li><span>${escapeHtml(label)}</span>${escapeHtml(value)}</li>`,
            )
            .join("")}
        </ul>
        <p class="form-status__note">
          This is a front-end demo. Nothing was sent, stored, or charged. Call
          ${escapeHtml(site.contact.phone)} to confirm a real booking.
        </p>`;
      status.hidden = false;
      status.focus({ preventScroll: true });
      status.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }

    form.reset();
    if (dateInput) dateInput.min = isoToday;
  });
}

function initPrefill() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-book-station], [data-book-tier]");
    if (!trigger) return;

    const id = trigger.dataset.bookStation || trigger.dataset.bookTier;
    const select = document.querySelector('select[name="station"]');
    if (!select || !id) return;

    const hasOption = Array.from(select.options).some((option) => option.value === id);
    if (hasOption) select.value = id;
  });
}

function initTilt() {
  const cards = $$(".station");
  if (!cards.length) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const max = 5;

  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* ---------- Boot ---------- */

function boot() {
  renderStations();
  renderGames();
  renderPasses();
  renderGallery();
  renderReviews();
  renderSiteChrome();
  renderBookingOptions();

  initNav();
  initGames();
  initPricing();
  initReveal();
  initCounters();
  initBooking();
  initPrefill();
  initTilt();
}

boot();
