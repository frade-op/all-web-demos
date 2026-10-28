const student = {
  payments: [
    { reference: "Outubro 2026", date: "05 out 2026", amount: "R$ 119,90" },
    { reference: "Setembro 2026", date: "05 set 2026", amount: "R$ 119,90" },
    { reference: "Agosto 2026", date: "05 ago 2026", amount: "R$ 119,90" },
    { reference: "Julho 2026", date: "05 jul 2026", amount: "R$ 119,90" },
    { reference: "Junho 2026", date: "05 jun 2026", amount: "R$ 119,90" },
  ],
  checkins: [
    { day: "28", month: "OUT", date: "Quarta-feira, 28 de outubro", time: "18:42", unit: "Nestor" },
    { day: "26", month: "OUT", date: "Segunda-feira, 26 de outubro", time: "19:08", unit: "Nestor" },
    { day: "24", month: "OUT", date: "Sábado, 24 de outubro", time: "10:16", unit: "Jardim dos Lagos" },
    { day: "22", month: "OUT", date: "Quinta-feira, 22 de outubro", time: "18:35", unit: "Nestor" },
    { day: "20", month: "OUT", date: "Terça-feira, 20 de outubro", time: "18:51", unit: "Nestor" },
    { day: "17", month: "OUT", date: "Sábado, 17 de outubro", time: "09:44", unit: "Ermo" },
    { day: "15", month: "OUT", date: "Quinta-feira, 15 de outubro", time: "18:39", unit: "Nestor" },
    { day: "13", month: "OUT", date: "Terça-feira, 13 de outubro", time: "19:02", unit: "Nestor" },
    { day: "10", month: "OUT", date: "Sábado, 10 de outubro", time: "10:08", unit: "Jardim dos Lagos" },
    { day: "08", month: "OUT", date: "Quinta-feira, 8 de outubro", time: "18:47", unit: "Nestor" },
    { day: "06", month: "OUT", date: "Terça-feira, 6 de outubro", time: "18:31", unit: "Nestor" },
    { day: "03", month: "OUT", date: "Sábado, 3 de outubro", time: "09:58", unit: "Ermo" },
  ],
};

const screens = {
  overview: document.querySelector("#screen-overview"),
  payments: document.querySelector("#screen-payments"),
  attendance: document.querySelector("#screen-attendance"),
};

function renderPayments() {
  const rows = student.payments
    .map(
      (payment) => `
        <tr>
          <td>${payment.reference}</td>
          <td>${payment.date}</td>
          <td>${payment.amount}</td>
          <td><span class="paid-status">Pago</span></td>
        </tr>
      `,
    )
    .join("");

  document.querySelector("#payment-history").innerHTML = rows;
}

function renderCheckins(target, checkins) {
  target.innerHTML = checkins
    .map(
      (checkin) => `
        <article class="checkin-row">
          <div class="date-tile" aria-label="${checkin.day} de ${checkin.month}">
            <strong>${checkin.day}</strong>
            <span>${checkin.month}</span>
          </div>
          <div class="checkin-main">
            <strong>${checkin.date}</strong>
            <span>Entrada registrada</span>
          </div>
          <div class="checkin-place">
            <strong>${checkin.unit}</strong>
            <span>Unidade</span>
          </div>
          <span class="checkin-time">${checkin.time}</span>
        </article>
      `,
    )
    .join("");
}

function showScreen(screenName) {
  if (!screens[screenName]) return;

  Object.entries(screens).forEach(([name, screen]) => {
    const isActive = name === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle("is-visible", isActive);
  });

  document.querySelectorAll("[data-screen]").forEach((button) => {
    const isActive = button.dataset.screen === screenName;
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filterCheckins() {
  const selectedUnit = document.querySelector("#unit-filter").value;
  const checkins =
    selectedUnit === "all"
      ? student.checkins
      : student.checkins.filter((checkin) => checkin.unit === selectedUnit);

  renderCheckins(document.querySelector("#attendance-checkins"), checkins);
  document.querySelector("#empty-checkins").hidden = checkins.length > 0;
}

document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.screen));
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.querySelector("#unit-filter").addEventListener("change", filterCheckins);

renderPayments();
renderCheckins(document.querySelector("#overview-checkins"), student.checkins.slice(0, 3));
filterCheckins();
