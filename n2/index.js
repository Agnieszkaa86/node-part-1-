const readline = require('readline');
const { program } = require('commander');
const fs = require('fs').promises;
require('colors');
program.option(
  '-f, --file [type]',
  'file for saving game results',
  'results.txt',
);

//podajemy argumenty z wiersza polecen
program.parse(process.argv);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//<1,10>
const randomInteger = Math.floor(Math.random() * 10) + 1;
let count = 0;
//sciezka do pliku z wynikami
const logFile = program.opts().file;
const isValid = (n) => {
    if (isNaN(n)) {
        console.log("Wprowadź liczbę!!".red);
        return false;
    }
    if (n < 0 || n > 10) {
        console.log("Liczba powinna znajdować się w przedziale od 1-10".red);
        return false;
    }
    return true;
};
const log = async(data) => {
    try {
      await fs.appendFile(logFile, `${data}\n`);
        console.log(`Udało się zapisać rezultat w pliku ${logFile}`.green); 
    } catch (err) {
        console.log(`Nie udało się zapisać pliku ${logFile}`.red); 
    }
}
const gameLoop = () => {
    rl.question("Wprowadź liczbę od 1 do 10".yellow, (value) => { 
        let n = +value;//String to=> Number
        if (!isValid(n)) {
            gameLoop();
            return;
        }
        count += 1;
        if (n === randomInteger) {
            console.log("Gratulacje. Odgadłeś liczbę w ${count)razy".green);
            //zapis do pliku
            //YYYY.MM.DD
            log(`${new Date().toLocaleDateString()}: Gratulacje, udało się odgadnąć liczbę za ${count}razem`)
                .finally(() => rl.close());//always
            //.then(()=>{})resolve
            //.catch(()=>{})reject
            return;

        }
        console.log("Nie zgdałeś. Kolejna próba".red)
        gameLoop();
    });
};
gameLoop();

