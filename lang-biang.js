const menuWrap = document.querySelector(".menu-wrap");
const menuToggle = document.querySelector(".menu-toggle");
const routeDropdown = document.querySelector(".route-dropdown");
const routeToggle = document.querySelector(".route-toggle");

const packageData = {
  "one-day": {
    duration: "1 ngày",
    level: "Vừa phải",
    price: "1.290.000 VND",
    itinerary: [
      "06:00 - Đón khách tại điểm hẹn, briefing nhanh về cung đường và an toàn.",
      "08:00 - Bắt đầu trekking qua rừng thông, các đoạn dốc nhẹ và điểm nghỉ ngắm cảnh.",
      "11:30 - Picnic lunch trên cung, nghỉ phục hồi và chụp hình.",
      "14:00 - Chinh phục điểm view chính của Lang Biang, check-in cùng leader.",
      "16:30 - Kết thúc trekking, về lại điểm hẹn và tổng kết chuyến đi."
    ],
    guest: ["Giày trekking", "Áo mưa nhẹ", "Nước cá nhân", "Nón/kính", "Kem chống nắng", "Thuốc cá nhân"],
    nexa: ["Leader", "First-aid kit", "Snack năng lượng", "Nước bổ sung", "Bao rác", "Ảnh demo"],
    priceNote: "Giá demo 1.290.000 VND/khách. Bao gồm leader, ăn trưa picnic, nước bổ sung, snack, first-aid kit và hỗ trợ điều phối."
  },
  "two-day": {
    duration: "2 ngày 1 đêm",
    level: "Vừa phải+",
    price: "2.490.000 VND",
    itinerary: [
      "Ngày 1 - Đón khách, di chuyển tới chân núi và trekking qua rừng thông.",
      "Ngày 1 - Dựng trại demo, ăn tối cùng đoàn và sinh hoạt nhẹ buổi đêm.",
      "Ngày 2 - Dậy sớm đón bình minh, tiếp tục cung view cao nguyên.",
      "Ngày 2 - Ăn trưa nhẹ, quay về điểm hẹn và kết thúc hành trình.",
      "Lịch trình sẽ được tinh chỉnh theo thời tiết và thể lực đoàn."
    ],
    guest: ["Giày trekking", "Áo khoác ấm", "Đèn pin", "Đồ cá nhân", "Bình nước", "Túi ngủ cá nhân"],
    nexa: ["Leader", "Lều trại", "Bữa tối", "Bữa sáng", "First-aid kit", "Dụng cụ bếp"],
    priceNote: "Giá demo 2.490.000 VND/khách. Bao gồm leader, lều trại, bữa tối, bữa sáng, snack, nước bổ sung và first-aid kit."
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
