function updateClockNumbers() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Get the individual digits
    const digit1 = Math.floor(hours / 10);
    const digit2 = hours % 10;
    const digit3 = Math.floor(minutes / 10);
    const digit4 = minutes % 10;
    console.log(digit1);
    console.log(digit2);

    // Update the src attribute of the number images
    document.getElementById('number1').src = `images/${digit1}.png`;
    document.getElementById('number2').src = `images/${digit2}.png`;
    document.getElementById('number3').src = `images/${digit3}.png`;
    document.getElementById('number4').src = `images/${digit4}.png`;
}

// Initial update
updateClockNumbers();

// Update the clock every second
setInterval(updateClockNumbers, 1000);