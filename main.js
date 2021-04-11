const { app, BrowserWindow, systemPreferences, Menu, session, ipcMain } = require('electron')
const { join } = require('path')
const prompt = require('electron-prompt');

let mainWindow = null

const dev = process.argv.indexOf('--dev') != -1

if (process.platform == 'linux') {
  app.disableHardwareAcceleration()
  app.commandLine.appendSwitch("disable-software-rasterizer")
}

let id1 = app.commandLine.getSwitchValue("id1")
let id2 = app.commandLine.getSwitchValue("id2")

async function initialize() {
  function start() {
    console.log("persist:" + id2)
    ses = session.fromPartition("persist:" + id1)

    ses.loadExtension(join(__dirname, 'ext/fhkphphbadjkepgfljndicmgdlndmoke'))
    ses.loadExtension(join(__dirname, 'ext/lanfdkkpgfjfdikkncbnojekcppdebfp'))
    ses.loadExtension(join(__dirname, 'ext/olnbjpaejebpnokblkepbphhembdicik'))
    ses.loadExtension(join(__dirname, 'ext/pcbjiidheaempljdefbdplebgdgpjcbe'))

    ses.loadExtension(join(app.getAppPath(), '..', 'ext/fhkphphbadjkepgfljndicmgdlndmoke'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/lanfdkkpgfjfdikkncbnojekcppdebfp'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/olnbjpaejebpnokblkepbphhembdicik'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/pcbjiidheaempljdefbdplebgdgpjcbe'))

    ses.on('will-download', function (e, item, webContents) {
      item.setSavePath(join(app.getPath("downloads"), item.getFilename()))
    })

    ses = session.fromPartition("persist:" + id2)

    ses.loadExtension(join(__dirname, 'ext/fhkphphbadjkepgfljndicmgdlndmoke'))
    ses.loadExtension(join(__dirname, 'ext/lanfdkkpgfjfdikkncbnojekcppdebfp'))
    ses.loadExtension(join(__dirname, 'ext/olnbjpaejebpnokblkepbphhembdicik'))
    ses.loadExtension(join(__dirname, 'ext/pcbjiidheaempljdefbdplebgdgpjcbe'))

    ses.loadExtension(join(app.getAppPath(), '..', 'ext/fhkphphbadjkepgfljndicmgdlndmoke'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/lanfdkkpgfjfdikkncbnojekcppdebfp'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/olnbjpaejebpnokblkepbphhembdicik'))
    ses.loadExtension(join(app.getAppPath(), '..', 'ext/pcbjiidheaempljdefbdplebgdgpjcbe'))

    ses.on('will-download', function (e, item, webContents) {
      item.setSavePath(join(app.getPath("downloads"), item.getFilename()))
    })

    createWindow()
  }

  async function createWindow() {
    Menu.setApplicationMenu(new Menu())

    const windowOptions1 = {
      width: 1080,
      minWidth: 680,
      title: 'ChatRoulette - 1',
      height: 840,
      icon: join(__dirname, '/icon.png'),
      webPreferences: {
        webSecurity: false,
        enableRemoteModule: true,
        partition: "persist:" + id1,
        preload: join(__dirname, 'dist/preload.js')
      }
    }

    const windowOptions2 = {
      width: 1080,
      minWidth: 680,
      title: 'ChatRoulette - 2',
      height: 840,
      icon: join(__dirname, '/icon.png'),
      webPreferences: {
        webSecurity: false,
        enableRemoteModule: true,
        partition: "persist:" + id2,
        preload: join(__dirname, 'dist/preload.js')
      }
    }

    mainWindow = new BrowserWindow(windowOptions1)
    mainWindow.loadURL('https://videochatru.com/embed/?p=1')
    mainWindow.maximize()

    secondWindow = new BrowserWindow(windowOptions2)
    secondWindow.loadURL('https://videochatru.com/embed/?p=2')
    secondWindow.maximize()


    if (dev) {
      mainWindow.webContents.openDevTools()
      secondWindow.webContents.openDevTools()
    }

    try {
      if (process.platform == 'darwin' || process.platform == 'win32') {
        const m = systemPreferences.getMediaAccessStatus('microphone')
        const c = systemPreferences.getMediaAccessStatus('camera')

        if (m == 'not-determined')
          await systemPreferences.askForMediaAccess('microphone')
            .catch(console.log)

        if (c == 'not-determined')
          await systemPreferences.askForMediaAccess('camera')
            .catch(console.log)
      }
    } catch (e) {
      console.log(e)
    }

    mainWindow.on('closed', () => {
      app.quit()
    })

    secondWindow.on('closed', () => {
      app.quit()
    })
  }

  app.on('ready', () => {
    if (id1 == "" || id2 == "") {
      id1 = 1
      id2 = 2
    }

    ipcMain.on('forWin1', (event, arg) => {
      mainWindow.webContents.send('forWin1', arg);
    });

    ipcMain.on('openDevTools1', (event, arg) => {
      mainWindow.webContents.openDevTools()
    });

    ipcMain.on('clear1', (event, arg) => {
      session.fromPartition("persist:" + id1).clearStorageData().then(() => { location.reload() })
    });

    ipcMain.on('forWin2', (event, arg) => {
      secondWindow.webContents.send('forWin2', arg);
    });

    ipcMain.on('openDevTools2', (event, arg) => {
      secondWindow.webContents.openDevTools()
    });

    ipcMain.on('clear2', (event, arg) => {
      session.fromPartition("persist:" + id2).clearStorageData().then(() => { location.reload() })
    });

    start()
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

initialize().catch(console.log)