const { app, BrowserWindow } = require('electron')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800
  })
  mainWindow.loadFile('app/Login.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})