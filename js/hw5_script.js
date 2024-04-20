// some constants and arrays
const TIMEOUT = 500; // timeout (speed)
const NUM_RANGE = 49; // pick numbers from 1 to NUM_RANGE
let lottery = [1, 2, 3, 4, 5, 6, 7];
let balls = new Array();

// change the number on the ball randomly
function roll_a_ball(element_id) {
    let num = Math.ceil(Math.random() * NUM_RANGE);
    document.getElementById(element_id).textContent = num;
}

// update all the balls with the numbers in lottery array
function update_balls() {
    for (let i = 0; i < 7; i++) {
        document.getElementById(i + 1).textContent = lottery[i];
    }
}

// start to rapidly change the number on all the balls randomly (for visual)
function start_rolling() {
    for (let i = 0; i < 7; i++) {
        balls[i] = setInterval(function () {
            roll_a_ball(i + 1);
        }, TIMEOUT / 10);
    }
}

// randomly change the numbers after the given index in the lottery array
// then update the balls
function rand(start) {
    for (let i = start; i < 7; i++) {
        let num = Math.ceil(Math.random() * NUM_RANGE);
        // check if already in lottery array
        while (lottery.includes(num)) {
            num = Math.ceil(Math.random() * NUM_RANGE);
        }
        lottery[i] = num;
    }
    update_balls();
}

let i = 0;
let intervalId;

function stop_a_ball() {
    if (i < 7) {
        // keep rolling rest of the balls
        rand(i);
        // stop changing the ball already chosen
        clearInterval(balls[i]);
        i++;
    } else {
        // end the interval after chosen all the balls
        clearInterval(intervalId);
        // enable the button
        document.getElementById(8).disabled = false;
    }
}

// main rolling process
function roll() {
    // disable the button
    document.getElementById(8).disabled = true;
    i = 0;
    start_rolling();
    intervalId = setInterval(stop_a_ball, TIMEOUT);
}

// initial update
update_balls();
