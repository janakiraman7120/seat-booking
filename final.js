document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    // Get form values
    var usn = document.getElementById("usn").value;
    var time = document.getElementById("time").value;
    var classType = document.getElementById("class").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    
    // Show confirmation message
    document.querySelector('.container').innerHTML = "<h1 id='confirmation-message'>Booking Confirmed</h1>";
    
    // Redirect to home page after 5 seconds
    setTimeout(function() {
        window.location.href = "index1.html"; // Change "index1.html" to your home page URL
    }, 1000);
});
