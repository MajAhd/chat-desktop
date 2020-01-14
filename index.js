const electron = require("electron");
const { app, BrowserWindow, Menu } = electron;
const url = require("url");
const path = require("path");
require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules", ".bin", "electron")
});
let MainWindow;
let template = [
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        role: "undo",
        accelartor: "CmdOrCtrl+Z"
      },
      {
        label: "Redo",
        role: "redo",
        accelartor: "Shift+CmdOrCtrl+Z"
      },
      {
        type: "separator"
      },
      {
        label: "Cut",
        role: "cut",
        accelartor: "CmdOrCtrl+X"
      },
      {
        label: "Copy",
        role: "copy",
        accelartor: "CmdOrCtrl+C"
      },
      {
        label: "Paste",
        role: "paste",
        accelartor: "CmdOrCtrl+V"
      },
      {
        label: "Select All",
        role: "selectall",
        accelartor: "CmdOrCtrl+A"
      }
    ]
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelartor: "CmdOrCtrl+R",
        click: (menuItem, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        }
      },
      {
        label: "Full Screen",
        accelartor: "CmdOrCtrl+F",
        click: (menuItem, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        }
      }
    ]
  }
];
if (process.platform === "darwin") {
  const name = app.name;
  template.unshift({
    label: name,
    name: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        label: "Check for Update",
        click: () => {}
      },
      {
        label: "Preferences",
        click: () => {}
      },
      {
        type: "separator"
      },
      {
        label: "Hide",
        role: "hide",
        accelartor: "Command+H"
      },
      {
        label: "Hide Others",
        role: "hideothers",
        accelartor: "Command+Alt+H"
      },
      {
        label: "Show All",
        role: "unhide"
      },
      {
        type: "separator"
      },
      {
        label: "Quick",
        click: () => {
          app.quit();
        }
      }
    ]
  });
}

app.on("ready", () => {
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (MainWindow === null) {
    createWindow();
  }
});

function createWindow() {
  MainWindow = new BrowserWindow({
    height: 700,
    width: 1200,

    minWidth: 900,
    maxWidth: 1600,
    minHeight: 800,
    show: false,
    movable: true,
    resizable: true,
    alwaysOnTop: false,
    title: "KelakChain",
    frame: true,
    titleBarStyle: "default",
    transparent: false
  });
  MainWindow.once("ready-to-show", () => {
    MainWindow.show();
  });
  const filePath = url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  });
  MainWindow.webContents.loadURL(filePath);
  MainWindow.on("close", () => {
    MainWindow = null;
  });
  // Right Click
  const ctxMenu = Menu.buildFromTemplate([
    {
      label: "Reload",
      click: (menuItem, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.reload();
        }
      }
    },
    {
      label: "Copy",
      role: "copy"
    },
    {
      label: "Cut",
      role: "cut"
    },
    {
      label: "Paste",
      role: "paste"
    },
    {
      type: "separator"
    },
    {
      label: "Select All",
      role: "selectall"
    },
    {
      label: "Full Screen",
      click: (menuItem, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
        }
      }
    }
  ]);
  MainWindow.webContents.on("context-menu", (event, params) => {
    event.preventDefault();
    ctxMenu.popup(MainWindow, params.x, params.y);
  });
}
