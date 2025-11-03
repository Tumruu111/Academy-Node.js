import * as fs from "node:fs";

fs.writeFile("jishee.txt", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 