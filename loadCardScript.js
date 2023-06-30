//======================================================================================================================
// Read Json to fill page with cards 
//======================================================================================================================

fetch('data.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        const sliders = ["swiper-wrapper content", "swiper-wrapper content2", "swiper-wrapper content3"];
        for(var j = 0; j < sliders.length; j++){
            for(var i = j*5; i < j*5+5; i++){
                // Get the swiper-wrapper content element
                var swiperWrapper = document.getElementById("swiper-wrapper content");

// Create the necessary HTML elements
                var swiperSlide = document.createElement("div");
                swiperSlide.classList.add("swiper-slide", "card");

                var cardContent = document.createElement("div");
                cardContent.classList.add("card-content");

                var imageDiv = document.createElement("div");
                imageDiv.classList.add("image");

                var image = document.createElement("img");
                image.src = data[i].image;
                image.alt = "";

                var descriptionDiv = document.createElement("div");
                descriptionDiv.classList.add("description");

                var description = document.createElement("span");
                description.classList.add("desc");
                description.textContent = data[i].desc;

                var buttonDiv = document.createElement("div");
                buttonDiv.classList.add("button");

                var button = document.createElement("button");
                button.classList.add("linkToSteam");

                var buttonImage = document.createElement("img");
                buttonImage.src = "images/steambadge2.png";

// Create hyperlink for the button
                var buttonLink = document.createElement("a");
                buttonLink.href = data[i].link;
                buttonLink.target = "_blank";
                buttonLink.style.textDecoration = "none"; // Add CSS to remove underline
                buttonLink.style.color = "white"
                // Setting Price 
                var initialPrice= data[i].initial;
                var finalPrice = data[i].final;
                var gameDate = data[i].date;
                var parsedGivenDate = new Date(gameDate.replace(/(\d{2})(?:st|nd|rd|th)/, "$1"));
                var currentDate = new Date();
                // Just Add the F
                if(currentDate < parsedGivenDate){
                    var price = document.createTextNode(gameDate);
                    buttonLink.appendChild(price);
                }
                else if (initialPrice === null || initialPrice === "") {
                    var price = document.createTextNode(finalPrice);
                    buttonLink.appendChild(price);
                } else {
                    var oldPrice = document.createElement("span");
                    oldPrice.className = "old-price";
                    oldPrice.innerText = initialPrice;
                    var newPrice = document.createElement("span");
                    newPrice.className = "new-price";
                    newPrice.innerText = finalPrice;
                    buttonLink.appendChild(oldPrice);
                    buttonLink.appendChild(newPrice);
                }
                button.appendChild(buttonLink);

                button.appendChild(buttonImage);
                buttonDiv.appendChild(button);

// Append the elements to their respective parents
                descriptionDiv.appendChild(description);
                imageDiv.appendChild(image);

                cardContent.appendChild(imageDiv);
                cardContent.appendChild(descriptionDiv);
                cardContent.appendChild(buttonDiv);

                swiperSlide.appendChild(cardContent);
                swiperWrapper.appendChild(swiperSlide);
            }
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
