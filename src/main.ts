import calcola from './fiscalCode'

// HTML ELEMENT
const comune = window.document.getElementById('comune') as HTMLSelectElement
const btn = window.document.getElementById('btn') as HTMLButtonElement
const nome = window.document.getElementById('nome') as HTMLInputElement
const cognome = window.document.getElementById('cognome') as HTMLInputElement
const data_nascita = window.document.getElementById(
    'data_nascita'
) as HTMLDataElement
const sesso = window.document.getElementById('sesso') as HTMLSelectElement
const risultato = window.document.getElementById(
    'risultato'
) as HTMLHeadingElement

// FUNCTION FISCAL CODE
function fiscalCode() {
    const data = new Date(data_nascita.value)
    const codice_fiscale = calcola(
        nome.value,
        cognome.value,
        data,
        sesso.value as Sesso,
        comune.value
    )
    test(codice_fiscale)
        ? console.info('TEST: OK')
        : console.error('TEST: Error FiscalCode')
    if (risultato !== null)
        risultato.innerHTML = `<h1 class="text-center fs-1 fw-bold">CODICE FISCALE: ${codice_fiscale} </h1>`
}

// TEST VALIDATION FISCAL CODE
function test(codice: string): boolean {
    const patten =
        /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/
    if (codice.match(patten)) {
        return true
    } else {
        return false
    }
}

// EVENT LISTENER ON CLICK BUTTON
btn?.addEventListener('click', fiscalCode)
