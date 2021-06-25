const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const timerEl = document.getElementById('timer');
const pomodoroCountEl = document.getElementById('pomodoro-count');
const toggleTypeEl = document.getElementById('toggle-type');
const mainContainerEl = document.querySelector('.main-container');


const defaultTextEl = document.getElementById('default-text');


const tasksInputEl = document.getElementById('tasks-input');
const addTaskBtn = document.getElementById('tasks-btn');
const taskListEl = document.querySelector('.task-table');


let focusTime = 25;
let breakTime = 5;
let longBreakTime = 20;

let numOfMinutes = 25;
let time = numOfMinutes * 60;

let flag = false; //When false, timer is off, when true, timer is running

let myTimer;

let pomodoroCounter = 0;


timerToggle = true; //when true then its work time, when false then its a break

//FUNCTIONS

const Timer = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60
    updateDisplay(minutes, seconds);
    if(minutes > 0 || seconds > 0){
        time--;
    }
    else if(minutes < 1 && seconds < 1){
        timerToggleFunc();
    }
    // else{
    //     return;
    // }
}

const startTimer = () => {
    if(flag === false){
    myTimer = setInterval(Timer, 1000);
    flag = true;
    }
    else{
        return;
    }
}

const stopTimer = () => {
	window.clearInterval(myTimer);
    flag = false;
}

const resetTimer = () => {
	window.clearInterval(myTimer);
    if(timerToggle === true){
        setTimeVals(focusTime);
    }
    else{
        setTimeVals(breakTime);
    }
    updateDisplay(numOfMinutes, 00);
    flag = false;
}

const updatePomodoro = () => {
    pomodoroCounter++;
    pomodoroCountEl.innerHTML = `Round: ${pomodoroCounter}`
}


const setTimeVals = (minutes) => {
    numOfMinutes = minutes;
    time = numOfMinutes * 60;
}

const updateDisplay = (minutes, seconds) => {
    minutes = Math.floor(time / 60);
    seconds = time % 60
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    timerEl.innerHTML = `${minutes}:${seconds}`;
}

const updateHeader = (type) => {
    toggleTypeEl.innerHTML = `${type}`;
    if(type === 'Focus') {
        mainContainerEl.style.backgroundColor = '#DF6565';
    } else if(type === 'Break') {
        mainContainerEl.style.backgroundColor = 'rgb(99, 124, 192)';
    }
    else if(type === 'Long Break') {
        mainContainerEl.style.backgroundColor = '#59AB6B';
    }
    console.log('changing background to red');
}

const timerToggleFunc = () => {
    if(timerToggle === true) {
        timerToggle = false;
        console.log("Time to take a break");
        updateHeader('Break')
        if((pomodoroCounter) > 0 && (pomodoroCounter % 4) === 0){
            setTimeVals(longBreakTime)
            console.log('long break');
            updateHeader('Long Break')
            updatePomodoro();
        }
        else{
        setTimeVals(breakTime)
        updatePomodoro();
        startTimer();
        }
        
    }
    else if(timerToggle === false){
        timerToggle = true;
        console.log("Time to to work");
        updateHeader('Focus')
        setTimeVals(focusTime);
        startTimer();
    }
}


const addTask = (task) => {
    if(tasksInputEl.value === ''){
        alert('please input task');
    }
    else {
        createTask(tasksInputEl.value);
        defaultTextToggle();
        inputDefault();
    }
}

const inputDefault = () => {
    tasksInputEl.value = '';
}


const createTask = (task) => {
    const taskEl = document.createElement('tr');
    const attribute = document.createAttribute('data-id');
    attribute.value = generateId();
    taskEl.setAttributeNode(attribute);

    // <td><input type="checkbox"><td>
    taskEl.innerHTML =  `
    <td class='delete-task-column'><button type="button" class="delete-btn"><i class="fa fa-close"></i>
    </button></td>
    <td>${task}</td>
    `
    const deleteBtn = taskEl.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', deleteTask);

    console.log(tasksInputEl.value)
    taskListEl.append(taskEl);
}

const generateId = () => {
    return Math.floor(Math.random() * Date.now())
}

const deleteTask = (event) => {
    const element = event.currentTarget.parentElement.parentElement;
    taskListEl.removeChild(element);
    defaultTextToggle();
}

const defaultTextToggle = () => {
    if(taskListEl.children.length > 1){
        defaultTextEl.classList.add('default-text-toggle')
    }
    else{
        defaultTextEl.classList.remove('default-text-toggle')
    }
}


//EVENT LISTENERS
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

addTaskBtn.addEventListener('click', addTask);