import { app, BrowserWindow } from 'electron'
import path from 'path'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
    })
    win.loadFile('./Pages/Nomes/build/index.html')
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})