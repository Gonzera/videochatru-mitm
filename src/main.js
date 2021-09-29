const { app, BrowserWindow, systemPreferences, Menu, session, ipcMain } = require('electron')
const { join } = require('path')

let mainWindow = null

const dev = process.argv.indexOf('--dev') != -1

if (process.platform == 'linux') {
  app.disableHardwareAcceleration()
  app.commandLine.appendSwitch("disable-software-rasterizer")
}

let id1 = app.commandLine.getSwitchValue("id1")
let id2 = app.commandLine.getSwitchValue("id2")

const { Voicemeeter, StripProperties } = require("voicemeeter-connector");

let strips = {
  "0": StripProperties.A1,
  "1": StripProperties.A2,
  "2": StripProperties.A3,
  "3": StripProperties.A4,
  "4": StripProperties.A5,
  "5": StripProperties.B1,
  "6": StripProperties.B2,
  "7": StripProperties.B3,
}

let outputspeaker = 0
let outputmicmusictodiscord = 1

let inputmusic = 2
let inputdiscord = 3

let inputmic = 4

let input1 = 5
let input2 = 6

let vmArgs = ["outputspeaker", "outputmicmusictodiscord", "inputmusic", "inputdiscord", "inputmic", "input1", "input2"]
vmArgs.forEach(
  (e) => {
    if (app.commandLine.getSwitchValue(e) != "") {
      eval(`${e} = ${parseInt(app.commandLine.getSwitchValue(e))}`)
    }
  }
)

let vmSpeakerOut = strips[outputspeaker.toString()]
let vmOuputOne = strips[input1.toString()]
let vmOutputOneMute = true
let vmOuputTwo = strips[input2.toString()]
let vmOutputTwoMute = true
let vmWeirdOutputToDiscord = strips[outputmicmusictodiscord.toString()]

if (vmOuputOne == StripProperties.B1 || vmOuputOne == StripProperties.B2 || vmOuputOne == StripProperties.B3) {
  vmOutputOneMute = false
}

if (vmOuputTwo == StripProperties.B1 || vmOuputTwo == StripProperties.B2 || vmOuputTwo == StripProperties.B3) {
  vmOutputTwoMute = false
}

Voicemeeter.init().then(async (vm_cl) => {
  // Connect to your voicemeeter client
  vm_cl.connect();
  vm = vm_cl
  vm.setStripParameter(inputmic, vmOuputOne, 0)
  //vm.setStripParameter(inputmic, StripProperties.Gain, -5.0)
  vm.setStripParameter(input1, vmSpeakerOut, 1)
  vm.setStripParameter(inputmic, vmOuputTwo, 0)
  //vm.setStripParameter(inputmic, StripProperties.Gain, -5.0)
  vm.setStripParameter(input2, vmSpeakerOut, 1)
  vm.setStripParameter(inputdiscord, vmOuputOne, 0)
  vm.setStripParameter(inputdiscord, vmSpeakerOut, 1)
  vm.setStripParameter(inputdiscord, vmOuputTwo, 0)
  vm.setStripParameter(inputdiscord, vmSpeakerOut, 1)
  vm.setStripParameter(inputmusic, vmOuputOne, 0)
  vm.setStripParameter(inputmusic, vmSpeakerOut, 1)
  vm.setStripParameter(inputmusic, vmOuputTwo, 0)
  vm.setStripParameter(inputmusic, vmSpeakerOut, 1)
  vm.setStripParameter(input1, vmSpeakerOut, 1)
  vm.setStripParameter(input2, vmSpeakerOut, 1)
  vm.setStripParameter(inputmusic, vmWeirdOutputToDiscord, 0)
});


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
      item.setSavePath(join(app.getPath("downloads"), "videochatru", item.getFilename()))
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
      item.setSavePath(join(app.getPath("downloads"), "videochatru", item.getFilename()))
    })

    createWindow()
  }

  async function createWindow() {
    Menu.setApplicationMenu(new Menu())

    const windowOptions1 = {
      width: 1080,
      minWidth: 680,
      title: 'videochat-mitm: 1',
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
      title: 'videochat-mitm: 2',
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
      vm.disconnect();
      app.quit()
    })

    secondWindow.on('closed', () => {
      vm.disconnect();
      app.quit()
    })
  }

  app.on('ready', () => {
    if (id1 == "" || id2 == "") {
      id1 = 1
      id2 = 2
    }

    function PTT_A(enable) {
      if (enable) {
        vm.setStripParameter(inputmic, vmOuputOne, 1)
        //vm.setStripParameter(inputmic, StripProperties.Gain, 0)
        if (vmOutputOneMute)
          vm.setStripParameter(input1, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputmic, vmOuputOne, 0)
        //vm.setStripParameter(inputmic, StripProperties.Gain, -5.0)
        if (vmOutputOneMute)
          vm.setStripParameter(input1, vmSpeakerOut, 1)
      }
    }

    function PTT_B(enable) {
      if (enable) {
        vm.setStripParameter(inputmic, vmOuputTwo, 1)
        //vm.setStripParameter(inputmic, StripProperties.Gain, 0)
        if (vmOutputTwoMute)
          vm.setStripParameter(input2, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputmic, vmOuputTwo, 0)
        //vm.setStripParameter(inputmic, StripProperties.Gain, -5.0)
        if (vmOutputTwoMute)
          vm.setStripParameter(input2, vmSpeakerOut, 1)
      }
    }

    function DPTT_A(enable) {
      if (enable) {
        vm.setStripParameter(inputdiscord, vmOuputOne, 1)
        if (vmOutputOneMute)
          vm.setStripParameter(inputdiscord, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputdiscord, vmOuputOne, 0)
        if (vmOutputOneMute)
          vm.setStripParameter(inputdiscord, vmSpeakerOut, 1)
      }
    }

    function DPTT_B(enable) {
      if (enable) {
        vm.setStripParameter(inputdiscord, vmOuputTwo, 1)
        if (vmOutputTwoMute)
          vm.setStripParameter(inputdiscord, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputdiscord, vmOuputTwo, 0)
        if (vmOutputTwoMute)
          vm.setStripParameter(inputdiscord, vmSpeakerOut, 1)
      }
    }

    function MUSIC_A(enable) {
      if (enable) {
        vm.setStripParameter(inputmusic, vmOuputOne, 1)
        if (vmOutputOneMute)
          vm.setStripParameter(inputmusic, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputmusic, vmOuputOne, 0)
        if (vmOutputOneMute)
          vm.setStripParameter(inputmusic, vmSpeakerOut, 1)
      }
    }

    function MUSIC_B(enable) {
      if (enable) {
        vm.setStripParameter(inputmusic, vmOuputTwo, 1)
        if (vmOutputTwoMute)
          vm.setStripParameter(inputmusic, vmSpeakerOut, 0)
      } else {
        vm.setStripParameter(inputmusic, vmOuputTwo, 0)
        if (vmOutputTwoMute)
          vm.setStripParameter(inputmusic, vmSpeakerOut, 1)
      }
    }

    function SWITCH_A() {
      if (vm.getStripParameter(input1, vmSpeakerOut) == 0) {
        vm.setStripParameter(input1, vmSpeakerOut, 1)
      } else {
        vm.setStripParameter(input1, vmSpeakerOut, 0)
      }
    }

    function SWITCH_B() {
      if (vm.getStripParameter(input2, vmSpeakerOut) == 0) {
        vm.setStripParameter(input2, vmSpeakerOut, 1)
      } else {
        vm.setStripParameter(input2, vmSpeakerOut, 0)
      }
    }

    function SWITCH_DISCORD() {
      if (vm.getStripParameter(inputmusic, vmWeirdOutputToDiscord) == 0) {
        vm.setStripParameter(inputmusic, vmWeirdOutputToDiscord, 1)
      } else {
        vm.setStripParameter(inputmusic, vmWeirdOutputToDiscord, 0)
      }
    }

    ipcMain.on('SWITCH_DISCORD', (event, arg) => {
      SWITCH_DISCORD()
    });

    ipcMain.on('SWITCH_A', (event, arg) => {
      SWITCH_A()
    });

    ipcMain.on('SWITCH_B', (event, arg) => {
      SWITCH_B()
    });

    ipcMain.on('PTT_A', (event, arg) => {
      PTT_A(arg)
      mainWindow.webContents.send('PTT_A', arg);
      secondWindow.webContents.send('PTT_A', arg);
    });

    ipcMain.on('PTT_B', (event, arg) => {
      PTT_B(arg)
      mainWindow.webContents.send('PTT_B', arg);
      secondWindow.webContents.send('PTT_B', arg);
    });

    ipcMain.on('DPTT_A', (event, arg) => {
      DPTT_A(arg)
      mainWindow.webContents.send('DPTT_A', arg);
      secondWindow.webContents.send('DPTT_A', arg);
    });

    ipcMain.on('DPTT_B', (event, arg) => {
      DPTT_B(arg)
      mainWindow.webContents.send('DPTT_B', arg);
      secondWindow.webContents.send('DPTT_B', arg);
    });

    ipcMain.on('MUSIC_A', (event, arg) => {
      MUSIC_A(arg)
      mainWindow.webContents.send('MUSIC_A', arg);
      secondWindow.webContents.send('MUSIC_A', arg);
    });

    ipcMain.on('MUSIC_B', (event, arg) => {
      MUSIC_B(arg)
      mainWindow.webContents.send('MUSIC_B', arg);
      secondWindow.webContents.send('MUSIC_B', arg);
    });

    ipcMain.on('forWin1', (event, arg) => {
      mainWindow.webContents.send('forWin1', arg);
    });

    ipcMain.on('dc1', (event, arg) => {
      mainWindow.webContents.send('dc1', arg);
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

    ipcMain.on('dc2', (event, arg) => {
      secondWindow.webContents.send('dc2', arg);
    });

    ipcMain.on('openDevTools2', (event, arg) => {
      secondWindow.webContents.openDevTools()
    });

    ipcMain.on('clear2', (event, arg) => {
      session.fromPartition("persist:" + id2).clearStorageData().then(() => { location.reload() })
    });

    ipcMain.on('getSettings1', (event, arg) => {
      event.sender.send('setSettings', {
        "cam": app.commandLine.getSwitchValue("cam1"),
        "mic": app.commandLine.getSwitchValue("mic1"),
        "speaker": app.commandLine.getSwitchValue("spk1"),
        "mirror": app.commandLine.getSwitchValue("cam2"),
        "ws": app.commandLine.getSwitchValue("ws"),
        "checkIp": app.commandLine.hasSwitch("checkip")
      });
    });

    ipcMain.on('getSettings2', (event, arg) => {
      event.sender.send('setSettings', {
        "cam": app.commandLine.getSwitchValue("cam2"),
        "mic": app.commandLine.getSwitchValue("mic2"),
        "speaker": app.commandLine.getSwitchValue("spk2"),
        "mirror": app.commandLine.getSwitchValue("cam1"),
        "ws": app.commandLine.getSwitchValue("ws"),
        "checkIp": app.commandLine.hasSwitch("checkip")
      });
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