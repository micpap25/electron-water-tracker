// Bridge between node.js and web
// Securely expose specific APIs
const Store = require("electron-store");
const remote = require("electron").remote;
const win = remote.getCurrentWindow();
console.log("here");

const schema = {
  theme: {
    type: "string",
    default: "light",
  },
  targetFluidOunces: {
    type: "number",
    default: 80,
  },
  currentFluidOunces: {
    type: "number",
    default: 0,
  },
  lastAccessedDate: {
    type: "number",
    default: 0,
  },
};

const store = new Store({ schema });

window.onbeforeunload = () => {
  /* If window is reloaded, remove win event listeners
  (DOM element listeners get auto garbage collected but not
  Electron win listeners as the win is not dereferenced unless closed) */
  win.removeAllListeners();
};

// Event listener for page loaded
window.addEventListener("DOMContentLoaded", () => {
  // Iterate over list of ID's and put its version where it belongs in index.html
  // JS interaction with HTML is important
  for (const type of ["theme", "targetFluidOunces", "currentFluidOunces"]) {
    replaceText(`${type}`, store.get(type));
  }
  handleWindowControls();
});

// Function to replace element with certain ID's text with something else.
function replaceText(selector, text) {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
}

function handleWindowControls() {
  // Make minimise/maximise/restore/close buttons work when they are clicked
  document.getElementById("min-button").addEventListener("click", () => {
    win.minimize();
  });

  document.getElementById("max-button").addEventListener("click", () => {
    win.maximize();
    toggleMaxRestoreButtons();
  });

  document.getElementById("restore-button").addEventListener("click", () => {
    win.unmaximize();
    toggleMaxRestoreButtons();
  });

  document.getElementById("close-button").addEventListener("click", () => {
    win.close();
  });

  // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
  toggleMaxRestoreButtons();
}

function toggleMaxRestoreButtons() {
  if (win.isMaximized()) {
    document.body.classList.add("maximized");
  } else {
    document.body.classList.remove("maximized");
  }
}
