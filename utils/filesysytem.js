const fs = require("fs").promises;
const { config } = require("../confiq");

const readFile = async () => {
    //sprawdzamy czy mozemy taki odczyt wykonac
    if (config.readingEnabled) {
        //wykonamy odczyt pliku
       const data = await fs.readFile("./newFile.text");
    return data.toString(); 
    } else {
        console.log("Sorry reading is not enabled");
    }
};

//zapis pliku
const saveFile = async (fileName) => {
    const dataToSave = "Some example data to save";
    await fs.writeFile(fileName, dataToSave)
};
const transaction = async () => {
    const fileName = await readFile();
    await saveFile(fileName);
}
const addFile = async () => {
    await fs.appendFile("./newFile.text", "some new data")
}
const readDir = async () => {
    const files = await fs.readdir("./");
    console.log(files)
}

readDir();

module.exports = {
    readFile,
    saveFile
}