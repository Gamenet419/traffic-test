const lights = {
    red: document.querySelector('.red'),
    yellow: document.querySelector('.yellow'),
    green: document.querySelector('.green')
};

let sequence = [];

let current = 0;
let timer = null;
let isRunning = false;

function updateTimers(){

    const redTime =
        Number(document.querySelector('#redTime').value);

    const yellowTime =
        Number(document.querySelector('#yellowTime').value);

    const greenTime =
        Number(document.querySelector('#greenTime').value);

    if(
        redTime <= 0 ||
        yellowTime <= 0 ||
        greenTime <= 0
    ){
        return;
    }

    sequence = [
        {
            light:'red',
            duration:redTime * 1000
        },
        {
            light:'yellow',
            duration:yellowTime * 1000
        },
        {
            light:'green',
            duration:greenTime * 1000
        },
        {
            light:'yellow',
            duration:yellowTime * 1000
        }
    ];
}

function clearLights(){
    Object.values(lights).forEach(light=>{
        light.classList.remove('active');
    });
}

function runTraffic(){

    if(!isRunning) return;

    clearLights();

    let active = sequence[current];

    lights[active.light].classList.add('active');

    timer = setTimeout(()=>{

        current =
            (current + 1) %
            sequence.length;

        runTraffic();

    }, active.duration);
}

function startTraffic(){

    if(isRunning) return;

    updateTimers();

    isRunning = true;

    runTraffic();
}

function pauseTraffic(){

    if(!isRunning) return;

    clearTimeout(timer);

    isRunning = false;
}

function stopTraffic(){

    clearTimeout(timer);

    isRunning = false;

    current = 0;

    clearLights();
}

document
    .querySelector('#start')
    .addEventListener('click', startTraffic);

document
    .querySelector('#pause')
    .addEventListener('click', pauseTraffic);

document
    .querySelector('#stop')
    .addEventListener('click', stopTraffic);
