import * as vscode from "vscode"; // vscode api
import * as net from "net";

const DEFAULT_SOCKET_PATH = "/tmp/chace.sock";

// runs in the very first time extension is activated
export function activate(context: vscode.ExtensionContext) {
  // will be executed only once
  console.log('"vscode-chace" is now active!');

  const disposable = vscode.commands.registerCommand(
    "vscode-chace.completeFunction",
    async () => {
      // will be executed every time command is executed
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor");
        return;
      }

      // test socket connectivity
      try {
        await pingChace();
        vscode.window.showInformationMessage("Connected to CHACE");
      } catch (err) {
        vscode.window.showErrorMessage(
          `CHACE connection failed: ${String(err)}`
        );
      }
    }
  );
  context.subscriptions.push(disposable);
}

// called when extension is deactivated
export function deactivate() {}

function pingChace(): Promise<void> {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(DEFAULT_SOCKET_PATH);

    client.once("connect", () => {
      client.end();
      resolve();
    });

    client.once("error", (err) => {
      reject(err);
    });
  });
}
