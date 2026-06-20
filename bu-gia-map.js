const menuWrap = document.querySelector(".menu-wrap");
const menuToggle = document.querySelector(".menu-toggle");
const routeDropdown = document.querySelector(".route-dropdown");
const routeToggle = document.querySelector(".route-toggle");

const packageData = {
  "one-day": {
    duration: "1 ngày",
    level: "Rừng nhẹ",
    price: "1.590.000 VND",
    itinerary: [
      "06:00 - Đón khách tại điểm hẹn, briefing nhanh về rừng, suối và quy tắc an toàn.",
      "08:30 - Bắt đầu trekking vào tuyến rừng, làm quen địa hình ẩm và đường mòn.",
      "11:30 - Nghỉ trưa picnic gần điểm suối, bổ sung nước và năng lượng.",
      "13:30 - Tiếp tục khám phá các đoạn rừng mát, check-in thác/suối theo điều kiện cung.",
      "16:30 - Kết thúc trekking, vệ sinh cá nhân nhanh và quay về điểm hẹn."
    ],
    guest: ["Giày trekking", "Áo mưa nhẹ", "Túi chống nước", "Thuốc cá nhân", "Vớ dự phòng", "Đèn pin nhỏ"],
    nexa: ["Leader", "First-aid kit", "Snack năng lượng", "Nước bổ sung", "Bữa trưa", "Bao rác"],
    priceNote: "Giá demo 1.590.000 VND/khách. Bao gồm leader, ăn trưa picnic, nước bổ sung, snack, first-aid kit và hỗ trợ điều phối."
  },
  "two-day": {
    duration: "2 ngày 1 đêm",
    level: "Rừng sâu",
    price: "2.890.000 VND",
    itinerary: [
      "Ngày 1 - Đón khách, di chuyển vào khu vực Bù Gia Mập và briefing an toàn rừng.",
      "Ngày 1 - Trekking qua đường rừng, suối và các đoạn địa hình ẩm đặc trưng.",
      "Ngày 1 - Dựng trại demo, ăn tối cùng đoàn và sinh hoạt nhẹ giữa rừng.",
      "Ngày 2 - Dậy sớm, ăn sáng, thu trại và tiếp tục cung đường quay ra.",
      "Ngày 2 - Ăn trưa nhẹ, kết thúc hành trình và quay về điểm hẹn."
    ],
    guest: ["Giày trekking", "Áo dài tay", "Đèn pin", "Đồ cá nhân", "Bình nước", "Túi chống nước"],
    nexa: ["Leader", "Lều trại", "Bữa tối", "Bữa sáng", "First-aid kit", "Dụng cụ bếp"],
    priceNote: "Giá demo 2.890.000 VND/khách. Bao gồm leader, lều trại, bữa tối, bữa sáng, snack, nước bổ sung và first-aid kit."
  }
};

const tabs = Array.from(document.querySelectorAll(".day-tab"));
const fields = Array.from(document.querySelectorAll("[data-package-field]"));

function renderPackage(packageKey) {
  const data = packageData[packageKey];
  if (!data) return;

  tabs.forEach((tab) => {
    const active = tab.dataset.package === packageKey;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  fields.forEach((field) => {
    field.textContent = data[field.dataset.packageField];
  });

  document.querySelector('[data-content-list="itinerary"]').innerHTML = data.itinerary
    .map((item) => `<li>${item}</li>`)
    .join("");

  document.querySelector('[data-content-list="guest"]').innerHTML = data.guest
    .map((item) => `<span class="kit-item"><i>${item.charAt(0)}</i>${item}</span>`)
    .join("");

  document.querySelector('[data-content-list="nexa"]').innerHTML = data.nexa
    .map((item) => `<span class="kit-item"><i>${item.charAt(0)}</i>${item}</span>`)
    .join("");

  document.querySelector('[data-content-list="price"]').innerHTML = `<strong>${data.price}</strong><p>${data.priceNote}</p>`;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => renderPackage(tab.dataset.package));
});

document.querySelectorAll(".accordion-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    const open = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(open));
  });
});

renderPackage("one-day");

if (menuWrap && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuWrap.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!menuWrap.contains(event.target)) {
      menuWrap.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuWrap.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (routeDropdown && routeToggle) {
  routeToggle.addEventListener("click", () => {
    const isOpen = routeDropdown.classList.toggle("is-open");
    routeToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!routeDropdown.contains(event.target)) {
      routeDropdown.classList.remove("is-open");
      routeToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      routeDropdown.classList.remove("is-open");
      routeToggle.setAttribute("aria-expanded", "false");
    }
  });
}
