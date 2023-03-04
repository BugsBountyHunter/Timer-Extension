const inputName = document.getElementById("name-input");
const timeInput = document.getElementById("time-input");
const saveBtn = document.getElementById("save-btn");

saveBtn.addEventListener("click", () => {
  const name = inputName.value;
  const notificationTime = timeInput.value;

  chrome.storage.sync.set({ name, notificationTime }).then((result) => {
    console.log(`name is set to ${name}`);
  });
});

chrome.storage.sync
  .get(["name", "notificationTime"])
  .then((result) => {
    inputName.value = result.name ?? "";
    timeInput.value = result.notificationTime ?? 10;
  })
  .catch((error) => {
    console.log(error);
  });
