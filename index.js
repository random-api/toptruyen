"use strict";
const {spawn} = require('child_process');
//_____________________________START APP_____________________________//
function Start(message) {
    message ? console.log(message) : "";
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
    child.on("close", async(codeExit) => {
        var x = 'codeExit'.replace('codeExit', codeExit);
        if (codeExit != 0 || global.countRestart && global.countRestart < 5) {
            Start("Restarting...");
            global.countRestart += 1;
        } else if (x.indexOf(2) == 0) {
            await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2, '')) * 1000));
            Start("Open ...");
        } else return;
    });
    child.on("error", function(error) {
        console.error("An error occurred: " + JSON.stringify(error.stack), "Starting...");
    });
}
Start();