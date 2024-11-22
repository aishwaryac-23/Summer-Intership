// Using jsPDF to generate a centered PDF ticket
const { jsPDF } = window.jspdf;

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Check if username and password are not null or empty
    if (username === "" || password === "") {
        alert("Username and password cannot be empty!");
        return; // Prevent proceeding if validation fails
    }
    
    // Handle login here, then show the booking page
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('booking-page').style.display = 'block';
});

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // After booking, display the ticket
    const train = document.getElementById('train').value;
    const user = document.getElementById('username').value; // Assume username from login form
    const date = document.getElementById('date').value;
    const seatType = document.getElementById('seat-type').value;

    document.getElementById('ticket-details').innerHTML = `
        <p><strong>Train:</strong> ${train}</p>
        <p><strong>User:</strong> ${user}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Seat Type:</strong> ${seatType}</p>
    `;
    document.getElementById('ticket-section').style.display = 'block';
});

// Generate and download PDF ticket with centered content
document.getElementById('download-ticket').addEventListener('click', function() {
    const train = document.getElementById('train').value;
    const user = document.getElementById('username').value; // Assume username from login form
    const date = document.getElementById('date').value;
    const seatType = document.getElementById('seat-type').value;

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set font styles for title and content
    doc.setFont('times', 'normal'); // Set font to Times New Roman for better readability
    doc.setFontSize(24); // Set a larger font size for the title
    doc.text('Railway Reservation Ticket', 105, 30, null, null, 'center'); // Title centered

    // Set the font size for content
    doc.setFontSize(16);
    doc.setFont('times', 'normal');

    // Add ticket information in a centered format
    doc.text(`Train: ${train}`, 105, 50, null, null, 'center');
    doc.text(`User: ${user}`, 105, 60, null, null, 'center');
    doc.text(`Travel Date: ${date}`, 105, 70, null, null, 'center');
    doc.text(`Seat Type: ${seatType}`, 105, 80, null, null, 'center');

    // Optionally, you can add a thank you note
    doc.setFontSize(12);
    doc.setFont('times', 'italic');
    doc.text('Thank you for booking with us! Have a pleasant journey.', 105, 100, null, null, 'center');

    // Download the PDF
    doc.save('ticket.pdf');
});
