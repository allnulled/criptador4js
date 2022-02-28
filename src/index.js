CriptadorUtils = class {

    static readFileSync(file) {
        if(typeof file !== "string") {
            throw new Error("Required «file» to be a string");
        }
        return require("fs").readFileSync(file).toString();
    }

    static writeFileSync(file, contents) {
        if(typeof file !== "string") {
            throw new Error("Required «file» to be a string");
        }
        if(typeof contents !== "string") {
            throw new Error("Required «contents» to be a string");
        }
        return require("fs").writeFileSync(file, contents, "utf8");
    }

    static readdirRecursively(dir) {
        if(typeof dir !== "string") {
            throw new Error("Required «dir» to be a string");
        }
        const fs = require("fs");
        const path = require("path");
        let files = [];
        if(fs.lstatSync(dir).isFile()) {
            return [dir];
        }
        let subnodes = fs.readdirSync(dir).map(f => path.resolve(dir, f));
        for (let indexSubnode = 0; indexSubnode < subnodes.length; indexSubnode++) {
            const subnode = subnodes[indexSubnode];
            const subnodeStat = fs.lstatSync(subnode);
            if (subnodeStat.isDirectory()) {
                files = files.concat(CriptadorUtils.readdirRecursively(subnode));
            } else {
                files.push(subnode);
            }
        }
        return files;
    }

    static translateCharacterByKeyAndPosition(ch, key, pos) {
        if(typeof ch !== "string") {
            throw new Error("Required «ch» to be a string");
        }
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        if(typeof pos !== "number") {
            throw new Error("Required «pos» to be a string");
        }
        return String.fromCharCode(ch.charCodeAt(0) + key.charCodeAt(pos % key.length));
    }

    static reverseCharacterByKeyAndPosition(ch, key, pos) {
        if(typeof ch !== "string") {
            throw new Error("Required «ch» to be a string");
        }
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        if(typeof pos !== "number") {
            throw new Error("Required «pos» to be a string");
        }
        return String.fromCharCode(ch.charCodeAt(0) - key.charCodeAt(pos % key.length));
    }

    static translateKeyIntoAlgorythm(key) {
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        return function (text) {
            if(typeof text !== "string") {
                throw new Error("Required «text» to be a string");
            }
            let output = "";
            for (let index = 0; index < text.length; index++) {
                let ch = text[index];
                output += CriptadorUtils.translateCharacterByKeyAndPosition(ch, key, index);
            }
            return output;
        };
    }

    static translateKeyIntoReverseAlgorythm(key) {
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        return function (text) {
            if(typeof text !== "string") {
                throw new Error("Required «text» to be a string");
            }
            let output = "";
            for (let index = 0; index < text.length; index++) {
                let ch = text[index];
                output += CriptadorUtils.reverseCharacterByKeyAndPosition(ch, key, index);
            }
            return output;
        };
    }

    static xcryptFiles(basedir, filePattern, key, isEncryption = true, shouldOverride = false) {
        if(typeof basedir !== "string") {
            throw new Error("Required «basedir» to be a string");
        }
        if(typeof filePattern !== "string") {
            throw new Error("Required «filePattern» to be a string");
        }
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        if(typeof isEncryption !== "boolean") {
            throw new Error("Required «isEncryption» to be a boolean");
        }
        const filePatternRegex = new RegExp(filePattern, "g");
        const filesMatched = CriptadorUtils.readdirRecursively(basedir).filter(f => f.match(filePatternRegex));
        for(let index = 0; index < filesMatched.length; index++) {
            const file = filesMatched[index];
            const fileContents = CriptadorUtils.readFileSync(file);
            const fileContentsFinal = isEncryption 
                ? CriptadorUtils.translateKeyIntoAlgorythm(key)(fileContents)
                : CriptadorUtils.translateKeyIntoReverseAlgorythm(key)(fileContents);
            CriptadorUtils.writeFileSync(file, fileContentsFinal);
        }
    }

}

Criptador = class {

    static get utils() {
        return CriptadorUtils;
    }

    static encryptFiles(basedir, key, filePattern = ".*") {
        return CriptadorUtils.xcryptFiles(basedir, filePattern, key, true);
    }

    static decryptFiles(basedir, key, filePattern = ".*") {
        return CriptadorUtils.xcryptFiles(basedir, filePattern, key, false);
    }

    static encrypt(text, key) {
        return CriptadorUtils.translateKeyIntoAlgorythm(key)(text);
    }

    static decrypt(text, key) {
        return CriptadorUtils.translateKeyIntoReverseAlgorythm(key)(text);
    }

}

Criptador4js = class {

    static get Criptador() {
        return Criptador;
    }

    static get CriptadorUtils() {
        return CriptadorUtils;
    }

    static fromCodeToCryptedEval(encryptedCode, message = false, globalId = false) {
        let source = `(function (factory, scope) {
    const output = factory.call(scope);
    const name = ${globalId ? JSON.stringify(globalId) : false};
    if(typeof module !== "undefined") {
        module.exports = output;
    }
    if(name) {
        if(typeof window !== "undefined") {
            window[name] = output;
        }
        if(typeof global !== "undefined") {
            global[name] = output;
        }
    }
    return output;
})(function() {
    
    try {
        let Criptador, CriptadorUtils, Criptador4js;
    } catch (error) { }

    CriptadorUtils = class {

        static readFileSync(file) {
            if (typeof file !== "string") {
                throw new Error("Required «file» to be a string");
            }
            return require("fs").readFileSync(file).toString();
        }

        static writeFileSync(file, contents) {
            if (typeof file !== "string") {
                throw new Error("Required «file» to be a string");
            }
            if (typeof contents !== "string") {
                throw new Error("Required «contents» to be a string");
            }
            return require("fs").writeFileSync(file, contents, "utf8");
        }

        static readdirRecursively(dir) {
            if (typeof dir !== "string") {
                throw new Error("Required «dir» to be a string");
            }
            const fs = require("fs");
            const path = require("path");
            let files = [];
            let subnodes = fs.readdirSync(dir).map(f => path.resolve(dir, f));
            for (let indexSubnode = 0; indexSubnode < subnodes.length; indexSubnode++) {
                const subnode = subnodes[indexSubnode];
                const subnodeStat = fs.lstatSync(subnode);
                if (subnodeStat.isDirectory()) {
                    files = files.concat(CriptadorUtils.readdirRecursively(subnode));
                } else {
                    files.push(subnode);
                }
            }
            return files;
        }

        static translateCharacterByKeyAndPosition(ch, key, pos) {
            if (typeof ch !== "string") {
                throw new Error("Required «ch» to be a string");
            }
            if (typeof key !== "string") {
                throw new Error("Required «key» to be a string");
            }
            if (typeof pos !== "number") {
                throw new Error("Required «pos» to be a string");
            }
            return String.fromCharCode(ch.charCodeAt(0) + key.charCodeAt(pos % key.length));
        }

        static reverseCharacterByKeyAndPosition(ch, key, pos) {
            if (typeof ch !== "string") {
                throw new Error("Required «ch» to be a string");
            }
            if (typeof key !== "string") {
                throw new Error("Required «key» to be a string");
            }
            if (typeof pos !== "number") {
                throw new Error("Required «pos» to be a string");
            }
            return String.fromCharCode(ch.charCodeAt(0) - key.charCodeAt(pos % key.length));
        }

        static translateKeyIntoAlgorythm(key) {
            if (typeof key !== "string") {
                throw new Error("Required «key» to be a string");
            }
            return function (text) {
                if (typeof text !== "string") {
                    throw new Error("Required «text» to be a string");
                }
                let output = "";
                for (let index = 0; index < text.length; index++) {
                    let ch = text[index];
                    output += CriptadorUtils.translateCharacterByKeyAndPosition(ch, key, index);
                }
                return output;
            };
        }

        static translateKeyIntoReverseAlgorythm(key) {
            if (typeof key !== "string") {
                throw new Error("Required «key» to be a string");
            }
            return function (text) {
                if (typeof text !== "string") {
                    throw new Error("Required «text» to be a string");
                }
                let output = "";
                for (let index = 0; index < text.length; index++) {
                    let ch = text[index];
                    output += CriptadorUtils.reverseCharacterByKeyAndPosition(ch, key, index);
                }
                return output;
            };
        }

        static xcryptFiles(basedir, filePattern, key, isEncryption = true) {
            if (typeof basedir !== "string") {
                throw new Error("Required «basedir» to be a string");
            }
            if (typeof filePattern !== "string") {
                throw new Error("Required «filePattern» to be a string");
            }
            if (typeof key !== "string") {
                throw new Error("Required «key» to be a string");
            }
            if (typeof isEncryption !== "boolean") {
                throw new Error("Required «isEncryption» to be a boolean");
            }
            const filePatternRegex = new RegExp(filePattern, "g");
            const filesMatched = CriptadorUtils.readdirRecursively(basedir).filter(f => f.match(filePatternRegex));
            for (let index = 0; index < filesMatched.length; index++) {
                const file = filesMatched[index];
                const fileContents = CriptadorUtils.readFileSync(file);
                const fileContentsFinal = isEncryption
                    ? CriptadorUtils.translateKeyIntoAlgorythm(key)(fileContents)
                    : CriptadorUtils.translateKeyIntoReverseAlgorythm(key)(fileContents);
                CriptadorUtils.writeFileSync(file, fileContentsFinal);
            }
        }

    }

    Criptador = class {

        static get utils() {
            return CriptadorUtils;
        }

        static encryptFiles(basedir, key, filePattern = ".*") {
            return CriptadorUtils.xcryptFiles(basedir, filePattern, key, true);
        }

        static decryptFiles(basedir, key, filePattern = ".*") {
            return CriptadorUtils.xcryptFiles(basedir, filePattern, key, false);
        }

        static encrypt(text, key) {
            return CriptadorUtils.translateKeyIntoAlgorythm(key)(text);
        }

        static decrypt(text, key) {
            return CriptadorUtils.translateKeyIntoReverseAlgorythm(key)(text);
        }

    }
    
    const source = ${JSON.stringify(encryptedCode)};
    const eval = ((typeof window !== "undefined") && (typeof window.eval === "function")) ? window.eval : ((typeof global !== "undefined") && (typeof global.eval === "function")) ? global.eval : () => ({});
    const prompter = ((typeof window !== "undefined") && (typeof window.prompt === "function"))
        ? (enunciado, callback) => {
            const respuesta = window.prompt(enunciado);
            callback(respuesta);
        }
        : (typeof require === "function")
            ? (enunciado, callback) => {
                const rl = require("readline").createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question(enunciado, (respuesta) => {
                    callback(respuesta);
                    rl.close();
                });
            }
            : () => "What";
    return new Promise((ok, fail) => {
        prompter(${message ? JSON.stringify(message) : JSON.stringify('Introduce clave secreta del código fuente: ')}, password => {
            const sourceDecrypted = Criptador.decrypt(source, password);
            try {
                const sourceOutput = eval(sourceDecrypted);
                return ok(sourceOutput);
            } catch(error) {
                console.error("Error al ejecutar código encriptado: ", error);
                return fail(error);
            }
        });
    });
}, this);`;
        return source;
    }

    static encryptCode(code, password, message, globalId = false) {
        const encryptedCode = Criptador.encrypt(code, password);
        const encryptedCodeEvaluable = Criptador4js.fromCodeToCryptedEval(encryptedCode, message, globalId);
        return encryptedCodeEvaluable;
    }

    static encryptFile(file, password, message, globalId = false, outputFile = undefined, shouldOverride = false) {
        const fs = require("fs");
        const contents = fs.readFileSync(file).toString();
        const encryptedContents = Criptador4js.encryptCode(contents, password, message, globalId);
        let outputFileFinal = undefined;
        if(outputFile) {
            outputFileFinal = outputFile;
        } else if(!shouldOverride) {
            outputFileFinal = file.replace(/\.js$/g, ".crypt.js");
        } else {
            outputFileFinal = file;
        }
        fs.writeFileSync(outputFileFinal, encryptedContents, "utf8");
        return true;
    }

}

Criptador4js.default = Criptador4js;

if (typeof window !== "undefined") {
    window.Criptador4js = Criptador4js;
}

if (typeof global !== "undefined") {
    global.Criptador4js = Criptador4js;
}

if (typeof module !== "undefined") {
    module.exports = Criptador4js;
}

