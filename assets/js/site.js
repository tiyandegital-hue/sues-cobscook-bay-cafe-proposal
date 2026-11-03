/* Sue's Cobscook Bay Cafe — concept demo.
   ONE swappable constant: change the business details here and every
   [data-site] element, phone link and the footer update together. */
const SITE = {
  name: "Sue's Cobscook Bay Cafe",
  shortName: "Sue's",
  tagline: "Breakfast & lunch on US Route 1",
  phone: "(207) 726-4404",
  phoneHref: "tel:+12077264404",
  address: "2730 US-1, Edmunds Township, ME 04628",
  facebook: "https://www.facebook.com/105497534768402",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sue%27s+Cobscook+Bay+Cafe+2730+US-1+Edmunds+Township+ME+04628",
  // SAMPLE hours — clearly labeled wherever shown.
  hours: [
    ["Monday – Friday", "6:30 AM – 2:00 PM"],
    ["Saturday", "7:00 AM – 2:00 PM"],
    ["Sunday", "7:00 AM – 1:00 PM"]
  ],
  openMinutes: [390, 840] // 6:30a–2:00p, sample
};

(function () {
  "use strict";

  /* ---- inject SITE constant into the page ---- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var key = el.getAttribute("data-site");
    if (SITE[key] == null) return;
    if (el.tagName === "A" && (key === "phoneHref" || key === "facebook" || key === "mapsUrl")) {
      el.setAttribute("href", SITE[key]);
      if (key === "facebook") { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
      return;
    }
    el.textContent = SITE[key];
  });
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- sample hours table (visit page) ---- */
  var hoursBody = document.getElementById("hours-body");
  if (hoursBody) {
    SITE.hours.forEach(function (row) {
      var tr = document.createElement("tr");
      var a = document.createElement("td"); a.textContent = row[0];
      var b = document.createElement("td"); b.textContent = row[1];
      tr.appendChild(a); tr.appendChild(b); hoursBody.appendChild(tr);
    });
  }

  /* ---- entrance animation (opt-in; content visible without JS) ---- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  /* ---- mobile nav: a small state machine (closed <-> open) ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { var f = nav.querySelector("a"); if (f) f.focus(); }
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setNav(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setNav(false); toggle.focus(); }
    });
  }

  /* ---- Day Clock (home): breakfast / lunch toggle, time-aware default ---- */
  var seg = document.querySelector("[data-dayclock]");
  if (seg) {
    var photo = document.getElementById("dc-photo");
    var photoCap = document.getElementById("dc-cap");
    var dishes = document.getElementById("dc-dishes");
    var openLine = document.getElementById("dc-open");
    var DATA = {
      breakfast: {
        img: "assets/img/hero-breakfast.jpg",
        alt: "Stack of blueberry pancakes with maple syrup on a wooden table",
        cap: "Blueberry pancakes, this morning",
        items: [
          ["Blueberry Pancakes", "Maine berries, real maple syrup", "$9.50"],
          ["The Downeast Breakfast", "Two eggs, bacon, home fries, toast", "$11.00"],
          ["Sue's Breakfast Sandwich", "Egg & cheese on a toasted roll", "$6.75"]
        ]
      },
      lunch: {
        img: "assets/img/hero-lunch.jpg",
        alt: "Maine lobster roll with fries on a ceramic plate",
        cap: "Lobster roll, midday",
        items: [
          ["Maine Lobster Roll", "Split-top bun, drawn butter, fries", "$16.50"],
          ["Route 1 Club", "Turkey, bacon, lettuce, tomato", "$10.25"],
          ["Clam Chowder & Grilled Cheese", "The cold-day combo", "$11.75"]
        ]
      }
    };
    function renderClock(which) {
      var d = DATA[which];
      seg.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.slot === which));
      });
      if (photo) { photo.src = d.img; photo.alt = d.alt; }
      if (photoCap) photoCap.textContent = d.cap + " — sample menu";
      if (dishes) {
        dishes.innerHTML = "";
        d.items.forEach(function (it) {
          var div = document.createElement("div");
          div.className = "dish";
          var nm = document.createElement("span"); nm.className = "dish-name";
          nm.textContent = it[0];
          var tag = document.createElement("span"); tag.className = "sample-tag"; tag.textContent = "Sample";
          nm.appendChild(tag);
          var lead = document.createElement("span"); lead.className = "dish-leader"; lead.setAttribute("aria-hidden", "true");
          var pr = document.createElement("span"); pr.className = "dish-price"; pr.textContent = it[1] ? it[2] : "";
          var wrap = document.createElement("div"); wrap.style.flex = "1";
          var note = document.createElement("span"); note.className = "dish-note"; note.textContent = it[1];
          wrap.appendChild(nm); wrap.appendChild(note);
          div.appendChild(wrap); div.appendChild(lead); div.appendChild(pr);
          dishes.appendChild(div);
        });
      }
    }
    function openStatus() {
      var now = new Date();
      var mins = now.getHours() * 60 + now.getMinutes();
      var o = SITE.openMinutes[0], c = SITE.openMinutes[1];
      var open = mins >= o && mins < c;
      function fmt(m) { var h = Math.floor(m / 60), mm = m % 60, ap = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; return h + ":" + String(mm).padStart(2, "0") + " " + ap; }
      return { open: open, text: open ? "Open now · till " + fmt(c) + " (sample hours)" : "Now closed · opens " + fmt(o) + " (sample hours)" };
    }
    seg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { renderClock(b.dataset.slot); });
    });
    var h = new Date().getHours();
    renderClock(h < 11 ? "breakfast" : "lunch");
    if (openLine) {
      var st = openStatus();
      openLine.querySelector(".dot").classList.toggle("closed", !st.open);
      openLine.querySelector("span:last-child").textContent = st.text;
    }
  }

  /* ---- menu tabs ---- */
  var tabs = document.querySelector("[data-tabs]");
  if (tabs) {
    var btns = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));
    function select(btn, focus) {
      btns.forEach(function (b) {
        var on = b === btn;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) btn.focus();
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b, false); });
      b.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = btns[(i + 1) % btns.length];
        if (e.key === "ArrowLeft") n = btns[(i - 1 + btns.length) % btns.length];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  /* ---- visit: day-trip itinerary builder ---- */
  var plans = document.querySelector("[data-plans]");
  if (plans) {
    var out = document.getElementById("plan-out");
    var PLANS = {
      park: {
        label: "Park trails first",
        steps: [
          ["8:00 AM", "Breakfast at " + SITE.shortName, "Fuel up before the trails — pancakes travel well."],
          ["9:15 AM", "Cobscook Bay State Park", "Trails, tidal views, and some of the highest tides in the world."],
          ["12:30 PM", "Lunch back on US-1", "Back to the cafe for a lobster roll before the drive home."]
        ]
      },
      breakfast: {
        label: "Breakfast first, slow day",
        steps: [
          ["8:30 AM", "Breakfast at " + SITE.shortName, "The unhurried option — coffee refills included in the spirit."],
          ["10:00 AM", "Wander Edmunds Township", "Back roads, blueberry barrens, and the bay shoreline."],
          ["12:00 PM", "Picnic or lunch stop", "Grab lunch at the cafe or take it to the park."]
        ]
      },
      lunch: {
        label: "Lunch after the park",
        steps: [
          ["9:00 AM", "Cobscook Bay State Park", "Morning on the trails while the light is good."],
          ["12:00 PM", "Lunch at " + SITE.shortName, "The reward: something hot, right on Route 1."],
          ["1:30 PM", "Back on the road", "An easy afternoon drive down the coast."]
        ]
      }
    };
    function renderPlan(key) {
      plans.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.plan === key));
      });
      var p = PLANS[key];
      out.innerHTML = "";
      var note = document.createElement("p");
      note.className = "small muted";
      note.textContent = "A suggested day — times are illustrative, the cafe stop is the point.";
      out.appendChild(note);
      var ol = document.createElement("ol");
      ol.className = "timeline";
      p.steps.forEach(function (s) {
        var li = document.createElement("li");
        var t = document.createElement("time"); t.textContent = s[0];
        var st = document.createElement("strong"); st.textContent = s[1];
        var d = document.createElement("p"); d.textContent = s[2];
        li.appendChild(t); li.appendChild(st); li.appendChild(d);
        ol.appendChild(li);
      });
      out.appendChild(ol);
    }
    plans.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { renderPlan(b.dataset.plan); });
    });
    renderPlan("park");
  }

  /* ---- catering: headcount estimator ---- */
  var slider = document.getElementById("headcount");
  if (slider) {
    var val = document.getElementById("headcount-val");
    var trays = document.getElementById("tray-list");
    function renderEst() {
      var n = parseInt(slider.value, 10);
      val.textContent = n + (n >= 200 ? "+" : "");
      var coffee = Math.ceil(n / 12);
      var trays_n = Math.ceil(n / 12);
      var items = [
        ["Coffee to go", coffee + " box" + (coffee > 1 ? "es" : "") + " of fresh-brewed coffee"],
        ["Breakfast trays", trays_n + " tray" + (trays_n > 1 ? "s" : "") + " of sandwiches or muffins"],
        ["Something sweet", Math.ceil(n / 24) + " dozen pastries to finish"]
      ];
      trays.innerHTML = "";
      items.forEach(function (it) {
        var li = document.createElement("li");
        var s = document.createElement("strong"); s.textContent = it[0];
        var tag = document.createElement("span"); tag.className = "sample-tag"; tag.textContent = "Sample";
        s.appendChild(tag);
        var p = document.createElement("span"); p.textContent = it[1];
        li.appendChild(s); li.appendChild(p);
        trays.appendChild(li);
      });
    }
    slider.addEventListener("input", renderEst);
    renderEst();
  }

  /* ---- contact form: honest demo state ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["cf-name", "cf-contact", "cf-msg"].forEach(function (id) {
        var input = document.getElementById(id);
        var field = input.closest(".field");
        var bad = !input.value.trim() || (id === "cf-contact" && input.value.trim().length < 5);
        field.classList.toggle("invalid", bad);
        input.setAttribute("aria-invalid", String(bad));
        if (bad) ok = false;
      });
      var consent = document.getElementById("cf-consent");
      var consentBad = !consent.checked;
      consent.closest(".consent").style.outline = consentBad ? "3px solid var(--accent)" : "";
      consent.closest(".consent").style.borderRadius = "4px";
      if (consentBad) ok = false;
      if (!ok) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }
      form.style.display = "none";
      var done = document.getElementById("form-done");
      done.classList.add("show");
      done.querySelector("strong").textContent = document.getElementById("cf-name").value.trim().split(" ")[0];
      done.focus();
    });
    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        input.closest(".field").classList.remove("invalid");
      });
    });
  }
})();
