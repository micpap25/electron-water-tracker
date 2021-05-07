// Bridge between node.js and web
// Securely expose specific APIs
const Store = require("electron-store");

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

// Event listener for page loaded
window.addEventListener("DOMContentLoaded", () => {
  // Iterate over list of ID's and put its version where it belongs in index.html
  // JS interaction with HTML is important
  for (const type of ["theme", "targetFluidOunces", "currentFluidOunces"]) {
    replaceText(`${type}`, store.get(type));
  }
});

// Function to replace element with certain ID's text with something else.
function replaceText(selector, text) {
  const element = document.getElementById(selector);
  if (element) element.innerText = text;
}
