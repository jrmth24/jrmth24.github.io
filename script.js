document.getElementById('translateToBrailleButton').addEventListener('click', translateToBraille);
document.getElementById('translateToTextButton').addEventListener('click', translateToText);
document.getElementById('clearBrailleButton').addEventListener('click', clearBraille);
document.getElementById('clearTextButton').addEventListener('click', clearText);
document.getElementById('saveTXTButton').addEventListener('click', saveAsTxt);
document.getElementById('textInput').addEventListener('input', autoResize);
document.getElementById('brailleTextInput').addEventListener('input', autoResize);

const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵', '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉',
    '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛',
    '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    'á': '⠷','é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾', 'ñ': '⠻','ü':'⠳',
    '.': '⠄', ',': '⠂', ';': '⠆', ':': '⠒', '_': '⠤',
    '¿': '⠢', '?': '⠢', '¡': '⠖', '!': '⠖', '"': '⠦',
    '(': '⠣', ')': '⠜', '+': '⠖', '*': '⠦',  '=': '⠶', '÷': '⠲',  '-': '⠤', 
    'A': '⠨⠁', 'B': '⠨⠃', 'C': '⠨⠉', 'D': '⠨⠙', 'E': '⠨⠑',
    'F': '⠨⠋', 'G': '⠨⠛', 'H': '⠨⠓', 'I': '⠨⠊', 'J': '⠨⠚',
    'K': '⠨⠅', 'L': '⠨⠇', 'M': '⠨⠍', 'N': '⠨⠝', 'O': '⠨⠕',
    'P': '⠨⠏', 'Q': '⠨⠟', 'R': '⠨⠗', 'S': '⠨⠎', 'T': '⠨⠞',
    'U': '⠨⠥', 'V': '⠨⠧', 'W': '⠨⠺', 'X': '⠨⠭', 'Y': '⠨⠽',
    'Z': '⠨⠵',  ' ': ' '
};

const reverseBrailleMap = {
    '⠁': 'a', '⠃': 'b', '⠉': 'c', '⠙': 'd', '⠑': 'e',
    '⠋': 'f', '⠛': 'g', '⠓': 'h', '⠊': 'i', '⠚': 'j',
    '⠅': 'k', '⠇': 'l', '⠍': 'm', '⠝': 'n', '⠕': 'o',
    '⠏': 'p', '⠟': 'q', '⠗': 'r', '⠎': 's', '⠞': 't',
    '⠥': 'u', '⠧': 'v', '⠺': 'w', '⠭': 'x', '⠽': 'y',
    '⠵': 'z', '⠼⠁': '1', '⠼⠃': '2', '⠼⠉': '3',
    '⠼⠙': '4', '⠼⠑': '5', '⠼⠋': '6', '⠼⠛': '7',
    '⠼⠓': '8', '⠼⠊': '9', '⠼⠚': '0',
    '⠷': 'á', '⠮': 'é', '⠌': 'í', '⠬': 'ó', '⠾': 'ú', '⠻': 'ñ', '⠳': 'ü',
    '⠄': '.', '⠂': ',', '⠆': ';', '⠒': ':', '⠤': '_',
    '⠢': '¿', '⠖': '¡', '⠦': '"', '⠣': '(', '⠜': ')', 
    '⠖': '+', '⠦': '*', '⠶': '=', '⠲': '÷', '⠤': '-', 
    '⠨⠁': 'A', '⠨⠃': 'B', '⠨⠉': 'C', '⠨⠙': 'D', '⠨⠑': 'E',
    '⠨⠋': 'F', '⠨⠛': 'G', '⠨⠓': 'H', '⠨⠊': 'I', '⠨⠚': 'J',
    '⠨⠅': 'K', '⠨⠇': 'L', '⠨⠍': 'M', '⠨⠝': 'N', '⠨⠕': 'O',
    '⠨⠏': 'P', '⠨⠟': 'Q', '⠨⠗': 'R', '⠨⠎': 'S', '⠨⠞': 'T',
    '⠨⠥': 'U', '⠨⠧': 'V', '⠨⠺': 'W', '⠨⠭': 'X', '⠨⠽': 'Y',
    '⠨⠵': 'Z', ' ': ' '
};



const brailleKeyboard = document.getElementById('brailleKeyboard');

// Crear las teclas del teclado virtual
for (let [char, braille] of Object.entries(brailleMap)) {
    const key = document.createElement('div');
    key.className = 'braille-key';
    key.innerHTML = `<span>${char === ' ' ? 'Espacio en blanco' : char}</span><div class="braille-symbol">${braille}</div>`;
    key.dataset.char = char;
    brailleKeyboard.appendChild(key);
    key.addEventListener('click', addBrailleCharacter);
}

function translateToBraille() {
    const inputText = document.getElementById('textInput').value;
    let outputBraille = '';
    
    for (let char of inputText) {
        if (brailleMap[char]) {
            outputBraille += brailleMap[char] + ' ';
        } else {
            outputBraille += '? ';  
        }
    }

    document.getElementById('brailleOutput').innerText = outputBraille.trim();
}

function translateToText() {
    const brailleText = document.getElementById('brailleTextInput').value;
    let outputText = '';
    let interrogationCount = 0;
    let exclamationCount = 0;

    for (let i = 0; i < brailleText.length; i++) {
        const char = brailleText[i];
        if (char === '⠼') {
            i++;
            outputText += reverseBrailleMap['⠼' + brailleText[i]];
        } else if (char === '⠹') {
            interrogationCount++;
            outputText += (interrogationCount % 2 === 1) ? '¿' : '?';
        } else if (char === '⠖') {
            exclamationCount++;
            outputText += (exclamationCount % 2 === 1) ? '¡' : '!';
        } else if (char === '⠨') {
            i++;
            outputText += reverseBrailleMap['⠨' + brailleText[i]].toUpperCase();
        } else if (reverseBrailleMap[char]) {
            outputText += reverseBrailleMap[char];
        } else {
            outputText += '?';
        }
    }

    document.getElementById('textOutput').innerText = outputText;
}

function addBrailleCharacter(event) {
    const brailleChar = event.currentTarget.querySelector('.braille-symbol').innerText;
    const brailleTextInput = document.getElementById('brailleTextInput');
    brailleTextInput.value += brailleChar;
}

function clearBraille() {
    document.getElementById('brailleOutput').innerText = '';
    document.getElementById('textInput').value = '';
}

function clearText() {
    document.getElementById('textOutput').innerText = '';
    document.getElementById('brailleTextInput').value = '';
}


function saveAsTxt() {
    let brailleOutput = document.getElementById('brailleOutput').innerText;

    if (!brailleOutput) {
        alert('No hay texto Braille para guardar.');
        return;
    }

    // Reflejar el texto Braille
    brailleOutput = mirrorBraille(brailleOutput);

    // Crear el archivo de texto
    const blob = new Blob([brailleOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = url;
    a.download = 'braille_text.txt';

    // Simular un clic en el enlace para iniciar la descarga
    a.click();

    // Liberar la URL del blob
    URL.revokeObjectURL(url);
}

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}
