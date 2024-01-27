//Assignment 1 
//INFS3201- Web Technologies II
//Date: 27-Jan-2024
//Name: Faisal Musalman
//ID: 60101223
//Simple Password Generator.


const prompt = require('prompt-sync')();
const fs = require('fs');

let passwordLength = 8;
let symbols = 'abcdefghijklmnopqrtsuvwxyz';
let numberOfPasswords = 2;
let outputOption = 'console';
let outputFile = 'passwords.txt';


function configure() {

    /*

    the configure() function allows the user to configure password generation settings
    prompt for password, symbols, number of passwords, and output Option (console or file)

    */ 


    console.log(`Password length [${passwordLength}]: `);
    const newPasswordLength = prompt('');
    passwordLength = newPasswordLength.trim() !== '' ? parseInt(newPasswordLength) : passwordLength;

    console.log(`Symbols [${symbols}]: `);
    const newSymbols = prompt('');
    symbols = newSymbols.trim() !== '' ? newSymbols : symbols;

    console.log(`Number of passwords [${numberOfPasswords}]: `);
    const newPasswords = prompt('');
    numberOfPasswords = newPasswords.trim() !== '' ? parseInt(newPasswords) : numberOfPasswords;

    console.log(`Output [${outputOption}]: `);
    const newOutputOption = prompt('');
    outputOption = newOutputOption.trim() !== '' ? newOutputOption : outputOption;

    if (outputOption !== 'console') {
        console.log(`Output file [${outputFile}]: `);
        const newOutputFile = prompt('');
        outputFile = newOutputFile.trim() !== '' ? newOutputFile : outputFile;
    }
}

function displayConfiguration() {

    /*
        the displayConfiguration() function displays the current configuration on the console 

    */

    console.log(`  Length: ${passwordLength}`);
    console.log(` Symbols: ${symbols}`);
    console.log(`Quantity: ${numberOfPasswords}`);
    console.log(`  Output: ${outputOption}`);
    if (outputOption !== 'console') {
        console.log(`  File: ${outputFile}`);
    }
}

function generatePasswords() {

    /*
        the generatePasswords() function generate passwords based on the configured settings
        it also display passwords on the console or write to a file by calling writePasswordsToFile() function based on the settings. 

    */

    const passwords = [];
    for (let i = 0; i < numberOfPasswords; i++) {
        const password = generatePassword();
        passwords.push(password);
    }

    if (outputOption === 'console') {
        console.log(passwords.join('\n'));
    } else {
        writePasswordsToFile(passwords);
        console.log('Passwords written to file.');
    }
}

function generatePassword() {
    
    /*
        the generatePassword() function generates a single random password
    */

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        password += symbols.charAt(randomIndex);
    }
    return password;
}

function writePasswordsToFile(passwords) {

    /*
        the writePasswordsToFile() function takes passwords as a parameter then write the passwords generated to a file
    */
    
    fs.writeFileSync(outputFile, passwords.join('\n'));
}


//Main Program loop

while(true){
    console.log('1. Configure');
    console.log('2. Display Configuration');
    console.log('3. Generate Passwords');
    console.log('99. Exit Program');
    let selection = Number(prompt("what would you like to do? "))

    if (selection === 1){
        configure()
    }
    else if (selection === 2){
        displayConfiguration()
    }
    else if (selection === 3){
        generatePasswords()
    }
    else if (selection === 99){
        console.log('Thank you for using this program.');
        break
    }
    else{
        console.log('******** ERROR!!! Pick a number between 1 and 3. *********')
        console.log('******** ERROR!!!     99 to exit the program     *********')
    }
}