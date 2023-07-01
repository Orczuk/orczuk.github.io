//======================================================================================================================
// Read Json to fill page with cards 
//======================================================================================================================

fetch('data.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {

        const titles = ["Top Upcoming Games This Week", "Top Upcoming Games This Month",
        "Featured Upcoming Games", "Top Free Games This Week", "Top Games on Sale This Week",
        "Top Full Priced Games This Week"];
        
        // JavaScript code
        const container = document.getElementById("body");

        for (let i = 0; i <= titles.length; i++) {
            // Create the <div> element
            const div = document.createElement("div");

            // Create the <h2> element
            const h2 = document.createElement("h2");
            h2.classList.add("title");
            h2.textContent = titles[i];

            // Append the <h2> element to the <div> element
            div.appendChild(h2);

            // Append the <div> element to the container
            container.appendChild(div);

            // Create the <section> element
            const section = document.createElement("section");

            // Create the swiper elements
            const swiperDiv = document.createElement("div");
            swiperDiv.classList.add("swiper", "mySwiper");

            const swiperWrapperDiv = document.createElement("div");
            swiperWrapperDiv.classList.add("swiper-wrapper", "content");
            swiperWrapperDiv.id = titles[i];

            // Append the swiper wrapper to the swiper container
            swiperDiv.appendChild(swiperWrapperDiv);

            // Append the swiper container to the section
            section.appendChild(swiperDiv);

            // Create the pagination element
            const paginationDiv = document.createElement("div");
            paginationDiv.classList.add("swiper-pagination", "swiper-pagination" + i);

            // Append the pagination element to the section
            section.appendChild(paginationDiv);

            // Append the section to the container
            container.appendChild(section);
        }
        
        for(var j = 0; j < titles.length; j++){
            for(var i = j*5; i < j*5+5; i++){
                // Get the swiper-wrapper content element
                var swiperWrapper = document.getElementById(titles[j]);

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
                buttonImage.src = "images/steamBadge.png";

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
                    swiperSlide.style.background = "linear-gradient(to bottom, #247aa1, #171a21)";
                    imageDiv.style.background = "linear-gradient(to bottom, #247aa1, #171a21)";
                }
                else if (initialPrice === null || initialPrice === "") {
                    var price = document.createTextNode(finalPrice);
                    buttonLink.appendChild(price);
                    swiperSlide.style.background = "linear-gradient(to bottom, #4e5c6b, #171a21)";
                    imageDiv.style.background = "linear-gradient(to bottom, #4e5c6b, #171a21)";
                    
                } else {
                    var oldPrice = document.createElement("span");
                    oldPrice.className = "old-price";
                    oldPrice.innerText = initialPrice;
                    var newPrice = document.createElement("span");
                    newPrice.className = "new-price";
                    newPrice.innerText = finalPrice;
                    buttonLink.appendChild(oldPrice);
                    buttonLink.appendChild(newPrice);
                    swiperSlide.style.background = "linear-gradient(to bottom, #4c6b22, #171a21)";
                    imageDiv.style.background = "linear-gradient(to bottom, #4c6b22, #171a21)";
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
