/*
  CẤU HÌNH THÔNG TIN SỰ KIỆN:
*/
const INVITATION = {
  name: "Trần Phạm Thanh Phong",
  // Tên khách mời mặc định (nếu link không có ?to=...)
  defaultGuest: "Bạn & Người thương",
  date: "Thứ Sáu, 04/12/2026",
  time: "08:00 – 11:00",
  // Mốc thời gian đếm ngược chuẩn ISO (Ngày 04/12/2026 lúc 08:00 sáng giờ Việt Nam +07:00)
  targetDateISO: "2026-12-04T08:00:00+07:00",
  venue: "Trường Đại học Công nghệ Sài Gòn (STU)",
  address: "180 Cao Lỗ, Phường Chánh Hưng, TP.HCM",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Công+nghệ+Sài+Gòn+180+Cao+Lỗ",
  contactUrl: "https://web.facebook.com/Yuta.Gios/",
  contactText: "Liên hệ xác nhận"
};

// Lấy tên khách mời từ tham số URL ?to=... (ví dụ: index.html?to=Minh)
const urlParams = new URLSearchParams(window.location.search);
const guestParam = urlParams.get("to");
const guestName = (guestParam && guestParam.trim()) ? guestParam.trim() : INVITATION.defaultGuest;

// Cập nhật thông tin lên giao diện
document.title = `Thiệp mời tốt nghiệp | ${INVITATION.name}`;
document.getElementById("guestName").textContent = guestName;
document.getElementById("graduateName").textContent = INVITATION.name;
document.querySelector(".signature").textContent = INVITATION.name;
document.getElementById("eventDate").textContent = INVITATION.date;
document.getElementById("eventTime").textContent = INVITATION.time;
document.getElementById("eventVenue").textContent = INVITATION.venue;
document.getElementById("eventAddress").textContent = INVITATION.address;
document.getElementById("mapLink").href = INVITATION.mapUrl;
document.getElementById("contactLink").href = INVITATION.contactUrl;
document.getElementById("contactLabel").textContent = INVITATION.contactText;

// Xử lý sự kiện mở phong bì mượt mà
const opening = document.getElementById("opening");
const invitation = document.getElementById("invitation");
const openSealBtn = document.getElementById("openSeal");

if (openSealBtn) {
  openSealBtn.addEventListener("click", () => {
    if (opening.classList.contains("opened")) return;
    opening.classList.add("opened");

    window.setTimeout(() => {
      opening.classList.add("fade-out");
    }, 1000);

    window.setTimeout(() => {
      opening.style.display = "none";
      invitation.classList.add("show");
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 2000);
  });
}

// Bộ đếm ngược thời gian thực (cập nhật mỗi giây)
const targetTime = new Date(INVITATION.targetDateISO).getTime();
const elDays = document.getElementById("cdDays");
const elHours = document.getElementById("cdHours");
const elMinutes = document.getElementById("cdMinutes");
const elSeconds = document.getElementById("cdSeconds");

function updateCountdown() {
  const now = Date.now();
  const distance = targetTime - now;

  if (distance <= 0) {
    elDays.textContent = "00";
    elHours.textContent = "00";
    elMinutes.textContent = "00";
    elSeconds.textContent = "00";
    document.querySelector(".countdown-title").textContent = "Buổi lễ tốt nghiệp đã bắt đầu!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  elDays.textContent = String(days).padStart(2, "0");
  elHours.textContent = String(hours).padStart(2, "0");
  elMinutes.textContent = String(minutes).padStart(2, "0");
  elSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);