const inputChecked = document.querySelectorAll('input[name="checked"]');
const checked1 = document.getElementById('theme1')
const checked2 = document.getElementById('theme2')
const checked3 = document.getElementById('theme3')

const storage = localStorage

const theme1 = () => {
    document.body.classList.add('theme-1')
    document.body.classList.remove('theme-2','theme-3')
    inputChecked[0].checked = true
}
const theme2 = () => {
    document.body.classList.add('theme-2')
    document.body.classList.remove('theme-1','theme-3')
    inputChecked[1].checked = true
}
const theme3 = () => {
    document.body.classList.add('theme-3')
    document.body.classList.remove('theme-2','theme-1')
    inputChecked[2].checked = true
}

const activeThemeChecked = () => {
    if(checked1.checked){
        theme1()
        storage.setItem('theme','theme-1')
    }
    if(checked2.checked){
        theme2()
        storage.setItem('theme','theme-2')
    }
    if(checked3.checked){
        theme3()
        storage.setItem('theme','theme-3')
    }
}

checked1.addEventListener('change', e => {
    activeThemeChecked(e)
})
checked2.addEventListener('change', e => {
    activeThemeChecked(e)
})
checked3.addEventListener('change', e => {
    activeThemeChecked(e)
})


if(storage.getItem('theme')) {
    const theme = storage.getItem('theme')
    if(theme === 'theme-1')  theme1()
    if(theme === 'theme-2') theme2()
    if(theme === 'theme-3')  theme3()
}



//OPERACIONES BASICAS

const buttons = document.querySelector('.grid')
const result = document.querySelector('.result')

buttons.addEventListener('click', e => {
    //obtenemos el ultimo caracter
    let compareOperations = result.innerText.charAt(result.innerText.length - 1);
    // validamos que el target se realice en la propiedad boton
    if(e.target.tagName === 'BUTTON') {
        //validamos que si el target es diferente a = DEL RESET para poder agregar el valor a input result
        if(e.target.innerText !== "=" && e.target.innerText !== "DEL" && e.target.innerText !== "RESET") {
            // creamos una variable que guarda el valor del target 
            let val = e.target.innerText
            // validamos que si no es numero y el ultimo caracter no es igual al target para poder quitar y dejar el ultimo valor
            if(isNaN(val) && compareOperations !== val) {
                // comparamos si el valor de comparacion el igual al valor del target
                if(compareOperations === val) {
                    result.innerText = result.innerText.slice(0, result.innerText.length - 1) + e.target.innerText   
                } else if(isNaN(compareOperations)){
                    result.innerText = result.innerText.slice(0, result.innerText.length - 1) + e.target.innerText    
                } else {
                    result.innerText += e.target.innerText                 
                }  
            } else {                 
                if(isNaN(compareOperations) && compareOperations === val){
                    result.innerText = result.innerText.slice(0, result.innerText.length - 1) + e.target.innerText    
                } else {                    
                result.innerText += e.target.innerText  
                }      
            }
        }
        // si el target tiene el valoro igual generamos el valor de las operaciones
        if(e.target.innerText === "=") {
            if(result.innerText ==="") {
                result.innerText = "0"
                return
            }
            if(isNaN(compareOperations)) {
                return
            }
            result.innerText = calculate(result.innerText)
        }
        // limpiamos el valor del result
        if(e.target.innerText === "RESET") {
            result.innerText = ""
        }
        // eliminamos el ultimo caracter
        if(e.target.innerText === "DEL") {
            // con slice obtemos el ultimo caracter para poder eliminar
            result.innerText = result.innerText.slice(0, result.innerText.length - 1);
        }
        
    }
})

const calculate = (listOperations) => {
    // Cconvertimos la cadena del input a un arreglo
    let arrOfOperations = listOperations.split(/([\+\-\x\/])/)

    // Realizamos primero la multiplicación y la división
    for (let i = 1; i < arrOfOperations.length; i += 2) {
        if(arrOfOperations[i] === "x") {
            arrOfOperations[i] = "*"
        }
        if (arrOfOperations[i] === "*" || arrOfOperations[i] === "/") {
        let operacion = arrOfOperations[i];
        let left = parseFloat(arrOfOperations[i - 1]);
        let right = parseFloat(arrOfOperations[i + 1]);
        let result;
    
        if (operacion === "*") {
            result = left * right;
        } else {
            result = left / right;
        }
    
        arrOfOperations.splice(i - 1, 3, result.toString());
        i -= 2;
        }
    }
    
    // Luego realizamos la suma y la resta
    let result = parseFloat(arrOfOperations[0]);    
    for (let i = 1; i < arrOfOperations.length; i += 2) {
        let operation = arrOfOperations[i];
        let number = parseFloat(arrOfOperations[i + 1]);
    
        switch (operation) {
        case "+":
            result += number;
            break;
        case "-":
            result -= number;
            break;
        }
    }
    return result
}