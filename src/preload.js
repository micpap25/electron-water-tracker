// Bridge between node.js and web
// Securely expose specific APIs

// Event listener for page loaded
window.addEventListener('DOMContentLoaded', () => {
  // Iterate over list of ID's and put its version where it belongs in index.html
  // JS interaction with HTML is important
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

// Function to replace element with certain ID's text with something else.
function replaceText (selector, text) {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}
