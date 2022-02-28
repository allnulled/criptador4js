const fs = require("fs");
const Criptador4js = require(__dirname + "/../src/index.js");
// const password = "Esa titi como mola se merece una ola";
const password = "a";

const checkDumpFile = function(exists = true) {
    return fs.existsSync(__dirname + "/files/dump.txt") === exists;
};

const main = async function() {
    // try {
    console.log("Password actual: " + password);
    if(!checkDumpFile(false)) fs.unlinkSync(__dirname + "/files/dump.txt");
    Criptador4js.encryptFile(__dirname + "/server/app.js", password, "Contraseña del fichero de app.js: ");
    Criptador4js.encryptFile(__dirname + "/files/create.js", password, "Contraseña del fichero create.js: ");
    Criptador4js.encryptFile(__dirname + "/files/destroy.js", password, "Contraseña del fichero destroy.js: ");
    // Criptador4js.encryptFile(__dirname + "/gitignore/example.js", password, "Contraseña del fichero gitignore/example.js: ");
    if(!checkDumpFile(false)) throw new Error("(err:1) Dump file should not exist yet.");
    try { await require(__dirname + "/files/create.crypt.js");} catch (error) {console.error("Error loading create.crypt.js");}
    if(!checkDumpFile(true)) throw new Error("(err:2) Dump file should already exist.");
    try { await require(__dirname + "/files/destroy.crypt.js");} catch (error) {console.error("Error loading destroy.crypt.js");}
    if(!checkDumpFile(false)) throw new Error("(err:3) Dump file should be already destroyed.");
    const encryptedCode = Criptador4js.encryptCode("console.log('Encryption/Decryption test passed sucessfully!'); true;", password, "Contraseña de código evaluado en tiempo de ejecución: ");
    // console.log(encryptedCode);
    const encryptedOutput = eval(encryptedCode);
    const result = await encryptedOutput;
    if(result !== true) throw new Error("(err:4) Evaluation should result in true");
    // } catch (error) { }
};

main();