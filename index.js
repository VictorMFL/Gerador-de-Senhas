let passwordLength = 16

const inputEl = document.querySelector('#ipassword')
const letraMaiusculaChecked = document.querySelector('input#imaiuscula')
const numeroChecked = document.querySelector('input#inumeros')
const simboloChecked = document.querySelector('input#isimbolos')
const barraSeguranca = document.querySelector('#security-indicator-bar')

function generatePassword() {
    let chars = 'abcdefghjklmnpqrstuvwxyz'
    const letrasMaiusculas = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    const numeros = '123456789'
    const simbolos = '?!@&*()[]'

    if (letraMaiusculaChecked.checked) {
        chars += letrasMaiusculas
    }
    if (numeroChecked.checked) {
        chars += numeros
    }
    if (simboloChecked.checked) {
        chars += simbolos
    }

    let password = ''

    for (let i = 0; i < passwordLength; i++) {
        const randonNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randonNumber, randonNumber + 1)
    }
    const inputEl = document.querySelector('#ipassword')
    inputEl.value = password

    console.log(password)
    calcularPorcentagem()
}

function calcularPorcentagem() {
    let porcentagem = Math.round((passwordLength / 64) * 25 +
     (letraMaiusculaChecked.checked ? 15 : 0) +
     (numeroChecked.checked ? 25 : 0) +
     (simboloChecked.checked ? 35 : 0))

    barraSeguranca.style.width = `${porcentagem}%`

    if(porcentagem > 64) {
        barraSeguranca.classList.remove('critical')
        barraSeguranca.classList.remove('warning')
        barraSeguranca.classList.add('safe')
    } else if(porcentagem > 50) {
        barraSeguranca.classList.remove('safe')
        barraSeguranca.classList.remove('critical')
        barraSeguranca.classList.add('warning')
    } else {
        barraSeguranca.classList.remove('safe')
        barraSeguranca.classList.remove('warning')
        barraSeguranca.classList.add('critical')
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}


let imgAtualizar = document.querySelector('#img-atualizar')
imgAtualizar.addEventListener('click', generatePassword)

let imgCopiar = document.querySelector('#img-copiar')
imgCopiar.addEventListener('click', copy)


function contador(value) {
    document.querySelector('span#password-length-text').innerHTML = value

    if(value <= 25) {
        inputEl.style.fontSize = '3rem'
    } else if (value <= 38) {
        inputEl.style.fontSize = '2em'
    } else if (value <= 54) {
        inputEl.style.fontSize = '1.4em'
    } else if (value < 64) {
        inputEl.style.fontSize = '1.2em'
    }
}

const passwordLengthEl = document.querySelector('#ipassword-length')
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    generatePassword()
})

letraMaiusculaChecked.addEventListener('click', generatePassword)
numeroChecked.addEventListener('click', generatePassword)
simboloChecked.addEventListener('click', generatePassword)

const copyButtonEl = document.querySelector('button#copiar')
copyButtonEl.addEventListener('click', copy)


generatePassword()