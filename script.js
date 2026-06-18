const destinations = Array.from(document.querySelectorAll(".destination"));
const experience = document.querySelector(".experience");
const chooser = document.querySelector(".chooser");
const detail = document.querySelector(".tour-detail");
const backButton = document.querySelector(".back-button");
const tourThumbs = Array.from(document.querySelectorAll(".tour-thumb"));
const selection = document.querySelector(".selection");

const tourContent = {
  langbiang: {
    place: "LangBiang",
    title: "LangBiang",
    image: "assets/ta-nang.png",
    imageAlt: "Núi và cung trekking LangBiang",
    meta: "1 day trek · Moderate · Best for mountain views",
    description:
      "Climb into the highland air of LangBiang, where pine forests, open ridges, and wide mountain views shape a compact adventure made for first-time trekkers and weekend explorers.",
    duration: "1 day",
    level: "Moderate",
    group: "6-12 guests",
    highlights: [
      "Highland mountain trail",
      "Pine forest path",
      "Panoramic viewpoint",
      "Local guide support"
    ]
  },
  "bu-gia-map": {
    place: "Bù Gia Mập",
    title: "Bù Gia Mập",
    image: "assets/bu-gia-map.png",
    imageAlt: "Rừng và thác nước Bù Gia Mập",
    meta: "2 days / 1 night · Forest trail · Best for nature explorers",
    description:
      "Step into deep forest paths, cool streams, and hidden waterfall corners inside Bù Gia Mập National Park. A greener route for travelers who want water, trees, and earth.",
    duration: "2D1N",
    level: "Forest trail",
    group: "6-12 guests",
    highlights: [
      "National park forest",
      "Waterfall stop",
      "Stream crossing",
      "Local guide support"
    ]
  }
};

function renderList(selector, items) {
  const list = document.querySelector(selector);
  list.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

function showTour(tourKey) {
  const tour = tourContent[tourKey];
  if (!tour) return;

  detail.dataset.activeTour = tourKey;
  document.querySelector(".tour-image").src = tour.image;
  document.querySelector(".tour-image").alt = tour.imageAlt;
  document.querySelector(".tour-title").textContent = tour.title;
  document.querySelector(".tour-meta").textContent = tour.meta;
  document.querySelector(".tour-description").textContent = tour.description;
  document.querySelector(".tour-duration").textContent = tour.duration;
  document.querySelector(".tour-level").textContent = tour.level;
  document.querySelector(".tour-group").textContent = tour.group;
  renderList(".tour-highlights", tour.highlights);

  destinations.forEach((card) => {
    const selected = card.dataset.tour === tourKey;
    card.classList.toggle("is-selected", selected);
    card.classList.toggle("is-dimmed", !selected);
    card.setAttribute("aria-pressed", String(selected));
  });

  tourThumbs.forEach((thumb) => {
    const selected = thumb.dataset.tourThumb === tourKey;
    thumb.classList.toggle("is-active", selected);
    thumb.setAttribute("aria-pressed", String(selected));
  });

  experience.classList.add("is-detail-open");
  chooser.setAttribute("aria-hidden", "true");
  detail.setAttribute("aria-hidden", "false");
  selection.textContent = "";
}

function closeTour() {
  experience.classList.remove("is-detail-open");
  chooser.setAttribute("aria-hidden", "false");
  detail.setAttribute("aria-hidden", "true");

  destinations.forEach((destination) => {
    destination.classList.remove("is-selected", "is-dimmed");
    destination.setAttribute("aria-pressed", "false");
  });

  tourThumbs.forEach((thumb) => {
    thumb.classList.remove("is-active");
    thumb.setAttribute("aria-pressed", "false");
  });

  selection.textContent = "";
}

destinations.forEach((destination) => {
  destination.addEventListener("click", () => {
    showTour(destination.dataset.tour);
  });
});

tourThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    showTour(thumb.dataset.tourThumb);
  });
});

backButton.addEventListener("click", closeTour);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTour();
  }
});
