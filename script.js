
   // ფუნქცია, რომელიც URL-იდან პარამეტრებს მოაქვს
   function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Chatbot-ის ფუნქცია
function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");
    if (!userInput) return;

    var userMessage = "<p><strong>You:</strong> " + userInput + "</p>";
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = "";

    setTimeout(() => {
        var botMessage = "<p><strong>WayGe AI:</strong> " + getBotResponse(userInput) + "</p>";
        chatBox.innerHTML += botMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}

// ჩატის პასუხები
function getBotResponse(input) {
    const responses = {
        "where should I go in Tbilisi?": "You should visit Narikala Fortress, Sameba Cathedral, and Rustaveli Avenue!",
        "best places in Georgia?": "Some must-visit places in Georgia include Kazbegi, Svaneti, and Vardzia!",
        "recommend a place to eat in Tbilisi": "Try Barbarestan for traditional Georgian cuisine!"
    };
    return responses[input.toLowerCase()] || "I'm not sure, but I can recommend checking the map above!";
}

// Google Maps-ის ინიციალიზაცია
function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.7151, lng: 44.8271 },
        zoom: 7
    });
}

// ლოკაციის ძებნა Google Maps-ზე
function searchLocation() {
    var location = document.getElementById('location').value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': location }, function (results, status) {
        if (status === 'OK') {
            window.map.setCenter(results[0].geometry.location);
            new google.maps.Marker({
                map: window.map,
                position: results[0].geometry.location
            });
        } else {
            alert('Location not found: ' + status);
        }
    });
}

// სურათებზე კლიკით გადამისამართება დამატებით გვერდზე
document.querySelectorAll(".place img").forEach(img => {
    img.addEventListener("click", function () {
        const placeName = this.nextElementSibling.innerText;
        const imageUrl = this.getAttribute("src");

        // გადამისამართება სწორ გვერდზე
        location.assign(`booking.html?place=${encodeURIComponent(placeName)}&image=${encodeURIComponent(imageUrl)}`);
    });
});

// მონაცემების გადაადგილება URL პარამეტრებიდან
document.addEventListener("DOMContentLoaded", function () {
    const placeName = getQueryParam('place');
    const placeImage = getQueryParam('image');

    if (placeName) {
        document.getElementById('place-name').innerText = placeName;
    }
    if (placeImage) {
        const imageElement = document.getElementById('place-image');
        imageElement.src = placeImage;
        imageElement.alt = placeName;

        // ✅ სურათზე კლიკით დაბრუნება მთავარ გვერდზე
        imageElement.style.cursor = "pointer";
        imageElement.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});


    // ფუნქცია query params-ის ამოსაღებად
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            place: params.get("place"),
            image: params.get("image")
        };
    }

    // გვერდის ჩატვირთვისას ჩასვამს სახელს და სურათს
    window.onload = () => {
        const { place, image } = getQueryParams();
        if (place) {
            document.getElementById("place-name").textContent = place;
        }
        if (image) {
            document.getElementById("place-image").src = image;
        }
    };

