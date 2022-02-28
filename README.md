# criptador4js

Encrypt JS files or code.

## Installation

```sh
$ npm i -s criptador4js
```

## What is it for?

What `criptador4js` does is to transform **valid JS code** to **valid and encrypted JS code**.

## How it works

The tool accepts a JS file, that can be run on node or browser, and transforms this file into
another JS file that does exactly that same that the previous one did, with one difference:
*the JS source code is in a string, and encrypted, and on runtime, the user is asked for the password
for this code to be decrypted correctly*.

If the user enters the correct password, the source code is correctly decrypted. Othewise, it won't be possible to run any JS, because the `eval` function will try to run invalid JS code, as it was not decrypted correctly through the correct password.

## Usage



### CLI

The command-line interface is only for files:

```sh
$ criptador4js
   # Required:
    --message "Question?"
    --password "Answer"
    --file file1.js
    --file file2.js
    --file file3.js
   # Optional:
    --verbose # prints every file path
    --override # replaces the file directly
    --export MyApi # globalizes the module
```

### API

The API, instead, can encrypt JS code from files:

```js
Criptador4js.encryptFile("./index.js");
Criptador4js.encryptFile(
  // Required:
  "./index.js",
  // Optional:
  "answer",
  "Question?",
  "MySuperIndex",
  "index.crypt.js",
  !!"shouldOverride"
); // creates: index.crypt.js
//
// Signature:
//    file,
//    password,
//    message,
//    globalId = false,
//    outputFile = undefined,
//    shouldOverride = false
//
```

...but also from strings (in browser):

```js
const encryptedCode = Criptador4js.encryptCode(
  // Required:
  "alert('You successfully decrypted the code'); 'The last value is returned by eval';",
  // Optional:
  "answer",
  "Question?",
  "GlobalId",
); // returns: evaluable async JS code
const response = eval(encryptedCode);
const output = await response; // evaluation always returns a Promise...
const everythingWentFine = output === 'The last value is returned by eval'; // true
```

## Why

Because more than 160 projects, and you do not give me a job... you are insane.

## Usage with Git

By default, and without using the `--override` flag, `criptador4js` will generate a `*.crypt.js` file from our `*.js` source file.

So, to commit only crypted files, add on `.gitignore` file, these lines:

```
*.js
!*.crypt.js
```

This way, your commits will only register crypted JS files.

Alternatively, you can use the flag `--override` to directly replace the original files by the new, encrypted and executable file.

## Trascendence

Go fuck yourself. Fucking rats.

## License

No license, do what you want. The rat is not me here.