// Load files

for (file in modInfo.langFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "lang/" + modInfo.langFiles[file] + ".js");
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

for (file in modInfo.modFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + modInfo.modFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}