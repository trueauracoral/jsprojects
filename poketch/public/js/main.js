let currentPage = 3;
const totalPages = 3;

let clock24;
let clockAnalog;
let counter = 0;

document.addEventListener('DOMContentLoaded', () => {
  loadPage();
});

// Function to show pressed image
function showPressedImage(imageSrc, buttonId) {
  const button = document.getElementById(buttonId);
  const pressedImage = document.createElement('img');
  pressedImage.src = imageSrc;
  pressedImage.className = 'pressed-image';

  // Append the pressed image to the button
  button.appendChild(pressedImage);
  setTimeout(() => {
    pressedImage.style.display = 'none';
    button.removeChild(pressedImage);
  }, 150);
}

// Modify your existing button click handler
function changePage(direction) {
  if (direction === 'forward') {
    showPressedImage("images/poketch_top_button_pressed.png", "button2");
    if (currentPage < totalPages) {
      currentPage++;
      loadPage();
    }
  } else if (direction === 'backward') {
    showPressedImage("images/poketch_bottom_button_pressed.png", 'button1');
    if (currentPage > 1) {
      currentPage--;
      loadPage();
    }
  }
}
// make this more universal and then have TWO TOTALLY epic button changers
// utter geniousness right here
function counterButton() {
  const button = document.getElementById("count-button");
  button.style.backgroundImage = "url('images/count-button-pressed.png')";
  counter += 1;
  console.log(counter);
  setTimeout(() => {
    button.style.backgroundImage = "url('images/count-button.png')";
  }, 150);
}
async function loadPage() {
  const pageContainer = document.getElementById('page-container');
  pageContainer.innerHTML = '';

  try {
    // Fetch the page content
    const response = await fetch(`pages/page${currentPage}.html`);
    const pageContent = await response.text();

    // Create a new div to hold the page content
    const newPageContainer = document.createElement('div');
    newPageContainer.innerHTML = pageContent;

    // Append the new page content to the page container
    pageContainer.appendChild(newPageContainer);
  } catch (error) {
    console.error('Error loading page:', error);
  }
  const contentContainer = document.getElementById('content-container');
  console.log(currentPage);
  switch (currentPage) {
    case 1:
      clearIntervals();
      contentContainer.style.background = 'url("images/clock_app_face.png") no-repeat center center';
      function updateClockNumbers() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
    
        // Get the individual digits
        const digit1 = Math.floor(hours / 10);
        const digit2 = hours % 10;
        const digit3 = Math.floor(minutes / 10);
        const digit4 = minutes % 10;
    
        // Update the src attribute of the number images
        document.getElementById('number1').src = `images/${digit1}.png`;
        document.getElementById('number2').src = `images/${digit2}.png`;
        document.getElementById('number3').src = `images/${digit3}.png`;
        document.getElementById('number4').src = `images/${digit4}.png`;
      }
      
      // Initial update
      updateClockNumbers();
      
      // Update the clock every second
      clock24 = setInterval(updateClockNumbers, 1000);
      break;
    case 2:
      clearIntervals();
      contentContainer.style.background = 'url("images/analog_app_face.png") no-repeat center center';
      function updateAnalog() {
        d = new Date(); //object of date()
        hr = d.getHours();
        min = d.getMinutes();
        hr_rotation = 30 * hr + min / 2; //converting current time
        min_rotation = 6 * min;
        minute.style.transform = `rotate(${min_rotation}deg)`;
        hour.style.transform = `rotate(${hr_rotation}deg)`;
      }

      updateAnalog();

      clockAnalog = setInterval(updateAnalog, 1000);
      break;
    case 3:
      clearIntervals();
      contentContainer.style.background = 'url("images/counter_app_face.png") no-repeat center center';
      break;
    default:
      contentContainer.style.background = 'url("") no-repeat center center';
  }

  function clearIntervals() {
    clearInterval(clock24);
    clearInterval(clockAnalog);
  }
}