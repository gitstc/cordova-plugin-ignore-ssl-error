module.exports = function (context) {
    let fs = require('fs'),
        path = require('path'),
        originalString = "super.onReceivedSslError(view, handler, error);",
        replaceString = "/**REPLACED**/handler.proceed();/**REPLACED**/";

    let file = path.resolve('platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java');
    let data = fs.readFileSync(file, "utf8");
    if (context.opts.options.release) {
        /** @var string**/
        data = data.replace(originalString, replaceString);

    } else {
        data = data.replace(replaceString, originalString);
    }

    fs.writeFileSync(file, data);
};
