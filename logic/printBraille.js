/**
 * Escuchador de eventos para imprimir el Braille
 */
document.getElementById('saveTXTButtonNormal').addEventListener('click', function(){
    printBraille(document.getElementById('brailleOutput').textContent);
});

function printBraille(textToPrint) {
    localStorage.setItem('translatedText', textToPrint); // Almacenar en localStorage
    window.location.href = '../view/print.html'; // Cambiar a la página de destino
    
}
