const time = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});

const updateTimer = () => {
  const currentTime = new Date().toLocaleTimeString();
  time.textContent = currentTime;

  chrome.storage.local.get(["timer"], (result) => {
    const time = result.timer ?? 0;
    timerElement.textContent = `The timer is at: ${time} seconds`;
  });
};

updateTimer();
setInterval(updateTimer, 1000);

chrome.storage.sync
  .get(["name"])
  .then((result) => {
    const name = result.name ?? "";
    nameElement.textContent = `Your name is : ${name}`;
  })
  .catch((error) => {
    console.log(error);
  });
