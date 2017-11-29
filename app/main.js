"use strict";
exports.__esModule = true;
var electron = require("electron");
var path = require("path");
var url = require("url");
var app = electron.app, BrowserWindow = electron.BrowserWindow;
var mainWin;
app.on('ready', function () {
    mainWin = new BrowserWindow({
        height: 700,
        width: 600
    });
    var uri = url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, '../app/pages/index.html')
    });
    mainWin.loadURL(uri);
});
