# criptador4js

Encrypt JS files or code.

## Installation

```sh
$ npm i -s criptador4js
```

## What is it for?

What `criptador4js` does is to transform **valid JS code** to **valid and encrypted JS code**.

## How it works

## Usage

### CLI

The command-line interface is only for files:

```sh
$ criptador4js
  --message "¿Te acuerdas de la contraseña? Era sobre algo de un tío de las sombras... que estaba ido."
  --password "Érase una vez un ser extraño que surgía de las penumbras. Lokote1331."
  --files file1.js file2.js file3.js
```

### API

The API, instead, can encrypt JS code from files:

```js
Criptador4js.encryptFile("./index.js"); // creates: index.crypt.js
```

...but also from strings (in browser):

```js
const encryptedCode = Criptador4js.encryptCode("alert('You successfully decrypted the code'); 'The last value is returned by eval';"); // returns: evaluable async JS code
const response = eval(encryptedCode);
const output = await response;
const everythingWentFine = output === 'The last value is returned by eval'; // true
```

## Why

Because more than 160 projects, and you do not give me a job... you are insane.

## Usage with Git

By default, `criptador4js` generates a `*.crypt.js` file from our `*.js` source file.

So, to commit only crypted files, add in the `.gitignore` these lines:

```
*.js
!*.crypt.js
```

This way, your commits will only register crypted JS files.

## Trascendence

Go fuck yourself. Fucking rats.

## License

No license, do what you want. The rat is not me here.