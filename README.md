# vscode-auto-install README

vscode module to start `siddharthkp/auto-install` which installs and erases dependencies as you write your code

## Features

easily use `auto-install` in vscode

![Auto installs dependencies as you code](https://raw.githubusercontent.com/siddharthkp/auto-install/master/demo.gif)

Starts by default when it detects package.json in the root.
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

### 1.0.0

Initial release