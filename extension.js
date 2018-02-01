const vscode = require('vscode');
const { spawn } = require('child_process');

const autoInstalls = {};
const config = vscode.workspace.getConfiguration('autoInstall');
let autoStart = config.startOnLaunch;

const startIfNeeded = () => {
    if (autoStart) {
        startAutoInstalls();
    }
}

const getWorkspacePaths = () => vscode.workspace.workspaceFolders.map(workspace => workspace.uri.fsPath);
vscode.workspace.onDidChangeWorkspaceFolders(startIfNeeded);

const startAutoInstalls = () => {
    const arguments = [];
    if (vscode.workspace.getConfiguration('autoInstall').secure) {
        arguments.push('--secure');
    }

    const outputConsole = vscode.window.createOutputChannel("Auto Install");
    const outputToConsole = data => {
        outputConsole.appendLine(data);
    };
    autoStart = true;
    vscode.window.showInformationMessage('Starting Auto Install');

    getWorkspacePaths().forEach((workspace) => {
        let showParseError = true;

        if (autoInstalls[workspace] != null) {
            stopAutoInstall(workspace);
        }

        const autoInstall = spawn(`${__dirname}/node_modules/auto-install/lib/index.js`, arguments, { async: true, cwd: workspace });
        autoInstalls[workspace] = autoInstall;

        autoInstall.stdout.on('data', (data) => {
            if (/npm init/.test(data)) {
                vscode.window.showErrorMessage(`Auto Install error: package.json is not found in the project root`);
            } else if (/Could not parse/.test(data) && showParseError) {
                showParseError = false;
                vscode.window.showErrorMessage(`Auto Install error: there are some errors parsing out files`);
            }

            outputToConsole('info: ' + data);
        });
        autoInstall.stderr.on('data', data => outputToConsole('error: ' + data));

        autoInstall.on("error", err => {
            outputToConsole(err);
            vscode.window.showErrorMessage(`Auto Install error: ${err.message}`);
        });

        autoInstall.on("close", (code) => {
            outputToConsole('closing ' + code)
            vscode.window.showInformationMessage("Auto Install Stopped");
        });
    });
}
const stopAutoInstall = (workspace) => {
    if (autoInstalls[workspace]) {
        autoInstalls[workspace].kill();
    }
    autoInstalls[workspace] = null;
}

const stopAutoInstalls = () => {
    vscode.window.showInformationMessage('Stoping Auto Install');
    getWorkspacePaths().forEach(stopAutoInstall);
    autoStart = false;
}

function activate(context) {
    [
        {
            command: startAutoInstalls,
            name: 'start'
        },
        {
            command: stopAutoInstalls,
            name: 'stop'
        }
    ].forEach(({ command, name }) => {
        const commandToRegister = vscode.commands.registerCommand(`extension.${name}`, command);
        context.subscriptions.push(commandToRegister);
    });
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
    stopAutoInstalls();
}
exports.deactivate = deactivate;

startIfNeeded();