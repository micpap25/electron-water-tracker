// Main functionality of app

// Import resources
// Cannot use import, must use require
// app allows lifecycle control
// BrowserWindow allows for browser display
const { app, BrowserWindow } = require("electron");
const path = require("path");

// Function to create your window
function createWindow() {
  // Make the Electron BrowserWindow
  const win = new BrowserWindow({
    // Set dimensions
    width: 800,
    height: 400,
    frame: false,
    // Set features in webPreferences
    webPreferences: {
      // Run this script before all others
      preload: path.join(__dirname, "src/preload.js"),
    },
  });
  // Pull up the index file to display
  win.loadFile("src/index.html");
}

// When the app is initialized (promise), make the window
app.whenReady().then(() => {
  createWindow();

  // If the app is activated (clicked on while initialized)
  // But not open, open it
  app.on("activate", () => {
    // Check if no windows exist
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// When all windows are closed, close the application
// Unless it is on Mac because of Mac's behaviors.
app.on("window-all-closed", () => {
  // Check if the app is on "darwin" (Mac)
  if (process.platform !== "darwin") {
    app.quit();
  }
});
