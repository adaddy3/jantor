document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Service data
    const services = [
        {
            title: "Residential Cleaning",
            description: "Thorough cleaning of your home including living areas, bedrooms, kitchens, and bathrooms.",
            price: "$120 - $250",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            title: "Commercial Cleaning",
            description: "Professional cleaning for offices, retail spaces, and other commercial properties.",
            price: "$200 - $500",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        {
            title: "Deep Cleaning",
            description: "Intensive cleaning service that reaches all the hidden areas and tough spots in your space.",
            price: "$250 - $600",
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
    ];

    // Timing data
    const timeSlotsData = [
        {
            title: "Morning Slots",
            description: "Available from 8:00 AM to 12:00 PM",
            slots: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"]
        },
        {
            title: "Afternoon Slots",
            description: "Available from 1:00 PM to 5:00 PM",
            slots: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]
        },
        {
            title: "Evening Slots",
            description: "Available from 6:00 PM to 9:00 PM",
            slots: ["6:00 PM", "7:00 PM", "8:00 PM"]
        }
    ];

    // Render services
    const servicesContainer = document.querySelector('#services .cards-container');
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-image">
                <img src="${service.image}" alt="${service.title}">
            </div>
            <div class="card-content">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                <div class="price">${service.price}</div>
            </div>
        `;
        servicesContainer.appendChild(card);
    });

    // Render timing slots
    const timingsContainer = document.querySelector('#timings .cards-container');
    timeSlotsData.forEach(timeSlot => {
        const card = document.createElement('div');
        card.className = 'card';
        
        let slotsHTML = '';
        timeSlot.slots.forEach(slot => {
            slotsHTML += `<div class="time-slot">${slot}</div>`;
        });
        
        card.innerHTML = `
            <div class="card-content">
                <h3>${timeSlot.title}</h3>
                <p>${timeSlot.description}</p>
                <div class="timing-slots">${slotsHTML}</div>
            </div>
        `;
        timingsContainer.appendChild(card);
    });

    // Create booking form
    const bookingForm = document.getElementById('appointmentForm');
    bookingForm.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="service">Service Type</label>
                <select id="service" name="service" required>
                    <option value="">Select a service</option>
                    <option value="residential">Residential Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="deep">Deep Cleaning</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="date">Date</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div class="form-group">
                <label for="time">Time Slot</label>
                <select id="time" name="time" required>
                    <option value="">Select a time slot</option>
                    ${timeSlotsData.flatMap(slot => slot.slots).map(time => 
                        `<option value="${time}">${time}</option>`
                    ).join('')}
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="address">Service Address</label>
            <input type="text" id="address" name="address" required>
        </div>
        <div class="form-group">
            <label for="notes">Special Instructions</label>
            <textarea id="notes" name="notes" rows="4"></textarea>
        </div>
        <button type="submit" class="submit-btn">Book Appointment</button>
    `;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            
            // Add selected class to clicked slot
            this.classList.add('selected');
            
            // Update the time select in the form
            document.getElementById('time').value = this.textContent;
        });
    });

    // Form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        // Simple validation
        if (!name || !service || !date || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Format the service name for display
        let serviceName = '';
        switch(service) {
            case 'residential':
                serviceName = 'Residential Cleaning';
                break;
            case 'commercial':
                serviceName = 'Commercial Cleaning';
                break;
            case 'deep':
                serviceName = 'Deep Cleaning';
                break;
        }
        
        // Format date for display
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Show confirmation
        alert(`Thank you, ${name}!\n\nYour ${serviceName} appointment is confirmed for:\n${formattedDate} at ${time}\n\nWe'll contact you shortly to confirm details.`);
        
        // Reset form
        bookingForm.reset();
        timeSlots.forEach(s => s.classList.remove('selected'));
    });
});
// Form submission handler
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('notes').value
    };
    
    // Format the SMS message
    const smsMessage = `New Booking Request:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}
Date: ${formData.date}
Time: ${formData.time}
Address: ${formData.address}
Notes: ${formData.notes || 'None'}`;
    
    // Send SMS using Twilio or other SMS gateway
    sendSMS(smsMessage);
    
    // Show confirmation to user
    alert('Thank you! Your booking request has been submitted. We will contact you shortly.');
    this.reset();
});

// Function to send SMS (using Twilio as an example)
function sendSMS(message) {
    const ownerPhoneNumber = '+14158667605'; // Owner's phone number
    
    // In a real implementation, you would use an SMS API like Twilio
    // This is a simplified example - actual implementation requires server-side code
    console.log('SMS would be sent to:', ownerPhoneNumber);
    console.log('Message:', message);
    
    // For a real implementation, you would need to:
    // 1. Set up a server endpoint to handle SMS sending
    // 2. Call that endpoint from here with the message data
    // 3. Use an SMS service like Twilio, Nexmo, etc.
    
    // Example using fetch (requires backend implementation):
    /*
    fetch('/api/send-sms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: ownerPhoneNumber,
            message: message
        }),
    })
    .then(response => response.json())
    .then(data => console.log('SMS sent:', data))
    .catch(error => console.error('Error sending SMS:', error));
    */
}

// Populate service options (you can customize these)
function populateServices() {
    const services = [
        'Office Cleaning',
        'Commercial Cleaning',
        'Residential Cleaning',
        'Deep Cleaning',
        'Carpet Cleaning',
        'Window Cleaning',
        'Post-Construction Cleaning'
    ];
    
    const serviceSelect = document.getElementById('service');
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
    });
}

// Populate time slots (you can customize these)
function populateTimeSlots() {
    const times = [
        '8:00 AM - 10:00 AM',
        '10:00 AM - 12:00 PM',
        '12:00 PM - 2:00 PM',
        '2:00 PM - 4:00 PM',
        '4:00 PM - 6:00 PM'
    ];
    
    const timeSelect = document.getElementById('time');
    times.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateServices();
    populateTimeSlots();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
