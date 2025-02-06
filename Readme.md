> **This is Quick Response Code Indonesian Standard (QRIS) Generator. To use this package, make sure you have a static QRIS, because this package will change your static QRIS to Dynamic.**

## How to install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 18.17 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install qris-dynamic-generator
```

## Code example



```js
const qrisDynamicGenerator = require("qris-dynamic-generator");

// Put your QRIS code here, you can get it by scanning your QRIS barcode with your native phone camera
const myQRIS = "00020101021126760024ID.CO.SPEEDCASH.MER...";
const QRIS = qrisDynamicGenerator(myQRIS);

// For example I create a function
const main = async () => {
  const QRISNewBarcode = await QRIS.generateBase64(2500, 600);
  console.log(QRISNewBarcode);
}

main();

// the results looks like this
// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA....
```

## Explanation

In this part you can get your QRIS code by scanning your QRIS barcode with your native phone camera
```js
const myQRIS = "00020101021126760024ID.CO.SPEEDCASH.MER...";
```

I provide 2 parameters here\
the first one is your amount in IDR\
the second one is barcode size
```js
const QRISNewBarcode = await QRIS.generateBase64(2500, 600);
```

I provided the result as base64\
so you can directly use it as an image\
\
I also provide another result ( QRIS code )\
you can use this method ( with only one parameter )

```js
const QRISNewBarcode = QRIS.generate(2500);
```
