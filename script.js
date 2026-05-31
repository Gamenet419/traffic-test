const lights = {
    red: document.querySelector('.red'),
    yellow: document.querySelector('.yellow'),
    green: document.querySelector('.green')
};

const sequence = [
    { light: 'red', duration: 3000 },
    { light: 'yellow', duration: 1500 },
    { light: 'green', duration: 3000 },
    { light: 'yellow', duration: 1500 }
];

let current = 0;
let timer = null;
let isRunning = false;
let isPaused = false;

function clearLights() {
    Object.values(lights).forEach(light => {
        light.classList.remove('active');
    });
}

function runTraffic() {
    if (!isRunning) return;

    clearLights();

    let active = sequence[current];
    lights[active.light].classList.add('active');

    timer = setTimeout(() => {
        current = (current + 1) % sequence.length;
        runTraffic();
    }, active.duration);
}

function startTraffic() {
    if (isRunning) return;

    isRunning = true;
    isPaused = false;
    runTraffic();
}

function pauseTraffic() {
    if (!isRunning) return;

    clearTimeout(timer);
    isRunning = false;
    isPaused = true;
}

function stopTraffic() {
    clearTimeout(timer);

    isRunning = false;
    isPaused = false;
    current = 0;

    clearLights();
}


// button hookups
document.querySelector("#start").addEventListener("click", startTraffic);
document.querySelector("#pause").addEventListener("click", pauseTraffic);
document.querySelector("#stop").addEventListener("click", stopTraffic);