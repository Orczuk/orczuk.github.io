//======================================================================================================================
// Read Json to fill page with cards 
//======================================================================================================================

fetch('data.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        const sliders = ["slider", "slider2", "slider3"];
        for(var j = 0; j < sliders.length; j++){
          for(var i = j*5; i < j*5+5; i++){
          // Get the target element
          const sliderElement = document.getElementById(sliders[j]);
    
          const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.id = 'card';
                
          const columnElement = document.createElement('div');
    
          // Set the class or any other attributes for the column element
          columnElement.className = 'column';
          columnElement.id = 'column1';
    
    
          // Create name and attach it from Json
          //const nameElement = document.createElement('title-overlay');
          //nameElement.innerText = data[i].name;
          
          // Create price and attach it form Json
            const priceElement = document.createElement("titleText");
            
            // Set color based on if it's full price, on sale or coming soon
            if(j < 1){
              priceElement.innerText = data[i].price;
              cardElement.style.background = "linear-gradient(to bottom, #1b2838, #171a21)";
            }
            else if(j >= 1 && j < 2){
              priceElement.innerText = data[i].price;
              cardElement.style.background = "linear-gradient(to bottom, #4c6b22, #171a21)";
            }
            else {
              priceElement.innerText = data[i].date;
              cardElement.style.background = "linear-gradient(to bottom, #247aa1, #171a21)";
            }
    
          // Create a 
          const aElement = document.createElement('a');
    
          // Attach the image
          const bElement = document.createElement('img');
          bElement.src = data[i].image;
          bElement.alt = data[i].image;
    
          // Create name and attach it from Json
          const descElement = document.createElement('desc');
          descElement.innerText = data[i].desc;
    
          // Create a anchaor for the hyperlink copy link from Json
          const anchorElement = document.createElement('a');
          anchorElement.href = data[i].link;
    
          // Attach the image
          const buttonImageElement = document.createElement('img');
          buttonImageElement.src = "https://i2.wp.com/www.oceansdigitalgame.com/wp-content/uploads/2019/01/steam-store-badge.png?ssl=1";
          buttonImageElement.alt = "https://i2.wp.com/www.oceansdigitalgame.com/wp-content/uploads/2019/01/steam-store-badge.png?ssl=1";
    
          // Append the name 
          //columnElement.appendChild(nameElement);
          // Append the name 
          columnElement.appendChild(priceElement);
          // Append the image element to the anchor element
          aElement.appendChild(bElement);
          // Append the anchor element to the output element
          columnElement.appendChild(aElement);
          // Append the name 
          columnElement.appendChild(descElement);
          // Append the image element to the anchor element
          anchorElement.appendChild(buttonImageElement);
          // Append the anchor element to the output element
          columnElement.appendChild(anchorElement);
          cardElement.appendChild(columnElement);
          sliderElement.appendChild(cardElement);
          }
        }
        })
    .catch(error => {
      console.log('Error:', error);
    });

//======================================================================================================================
// Uses Buttons  
//======================================================================================================================

document.addEventListener("click", e => {
  let handle
  if (e.target.matches(".handle")) {
    handle = e.target
  } else {
    handle = e.target.closest(".handle")
  }
  if (handle != null) onHandleClick(handle)
})

const throttleProgressBar = throttle(() => {
  document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)
}, 250)
window.addEventListener("resize", throttleProgressBar)

document.querySelectorAll(".progress-bar").forEach(calculateProgressBar)

function calculateProgressBar(progressBar) {
  progressBar.innerHTML = ""
  const slider = progressBar.closest(".row").querySelector(".slider")
  const itemCount = slider.children.length
  const itemsPerScreen = parseInt(
      getComputedStyle(slider).getPropertyValue("--items-per-screen")
  )
  let sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = Math.ceil(itemCount / itemsPerScreen)

  if (sliderIndex >= progressBarItemCount) {
    slider.style.setProperty("--slider-index", progressBarItemCount - 1)
    sliderIndex = progressBarItemCount - 1
  }

  for (let i = 0; i < progressBarItemCount; i++) {
    const barItem = document.createElement("div")
    barItem.classList.add("progress-item")
    if (i === sliderIndex) {
      barItem.classList.add("active")
    }
    progressBar.append(barItem)
  }
}

function onHandleClick(handle) {
  const progressBar = handle.closest(".row").querySelector(".progress-bar")
  const slider = handle.closest(".container").querySelector(".slider")
  const sliderIndex = parseInt(
      getComputedStyle(slider).getPropertyValue("--slider-index")
  )
  const progressBarItemCount = progressBar.children.length
  if (handle.classList.contains("left-handle")) {
    if (sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressBarItemCount - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[progressBarItemCount - 1].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex - 1].classList.add("active")
    }
  }

  if (handle.classList.contains("right-handle")) {
    if (sliderIndex + 1 >= progressBarItemCount) {
      slider.style.setProperty("--slider-index", 0)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[0].classList.add("active")
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1)
      progressBar.children[sliderIndex].classList.remove("active")
      progressBar.children[sliderIndex + 1].classList.add("active")
    }
  }
}

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}