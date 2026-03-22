const ticketForm = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");

let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function renderTickets() {
  ticketList.innerHTML = "";

  if (tickets.length === 0) {
    ticketList.innerHTML = "<p>No open tickets yet.</p>";
    return;
  }

  tickets.forEach((ticket, index) => {
    const ticketCard = document.createElement("div");
    ticketCard.className = "ticket-card";

    ticketCard.innerHTML = `
      <h3>Ticket #${ticket.id} - ${ticket.issueType}</h3>
      <div class="ticket-meta">
        <strong>User:</strong> ${ticket.userName} <br />
        <strong>Status:</strong> 
<span class="${ticket.status === 'Open' ? 'open' : 'closed'}">
  ${ticket.status}
</span>
      </div>
      <p><strong>Description:</strong> ${ticket.description}</p>
      <p><strong>Steps Taken:</strong> ${ticket.stepsTaken || "None yet"}</p>
      <div class="ticket-actions">
        <button class="close-btn" onclick="closeTicket(${index})">Close Ticket</button>
      </div>
    `;

    ticketList.appendChild(ticketCard);
  });
}

function closeTicket(index) {
  tickets[index].status = "Closed";
  saveTickets();
  renderTickets();
}

ticketForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTicket = {
    id: Math.floor(Math.random() * 10000),
    userName: document.getElementById("userName").value,
    issueType: document.getElementById("issueType").value,
    description: document.getElementById("description").value,
    stepsTaken: document.getElementById("stepsTaken").value,
    status: "Open"
  };

  tickets.push(newTicket);
  saveTickets();
  renderTickets();
  ticketForm.reset();
});

renderTickets();