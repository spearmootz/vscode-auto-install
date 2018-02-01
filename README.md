# vscode-auto-install README

vscode module to start `siddharthkp/auto-install` which installs and erases dependencies as you write your code

## Usage
run the 'Start Auto Install' command or set the autoInstall.startOnLaunch to true in the configuration

## Features

easily use `auto-install` in vscode

![Auto installs dependencies as you code](https://raw.githubusercontent.com/siddharthkp/auto-install/master/demo.gif)

Starts by default when it detects package.json in the root if autoInstall.startOnLaunch is true.
By default installs only packages that have >10k monthly downloads.
Checkout `siddharthkp/auto-install` for the details.

## Requirements

Only requires `auto-install`

## Extension Settings

This extension contributes the following settings:

* `autoInstall.secure`: if true, only install packages with >10k monthly downloads. see `auto-install` secure flag
* `autoInstall.startOnLaunch`: starts auto install if workspace has package.json in the root if true

## Known Issues

So far nothing, just fill out a new issue

## Release Notes

## [1.0.1]
Display parsing errors

### 1.0.0

Initial release