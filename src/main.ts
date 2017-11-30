import * as electron from 'electron';
import * as path from 'path';
import * as url from 'url';

const {app, BrowserWindow} = electron;

let mainWin;

app.on('ready', () => {
  mainWin = new BrowserWindow({
    height: 700,
    width: 400
  });

  let uri = url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '../app/pages/index.html')
  });

  mainWin.loadURL(uri);
});
