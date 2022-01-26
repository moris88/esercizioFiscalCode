import { mappatura, car, corrispondenza, comuni } from './mappatura'

const calcola = (
    nome: string,
    cognome: string,
    data_nascita: Date,
    sesso: Sesso,
    idComune: string
) => {
    let codice = ''
    codice += getName(cognome)
    codice += getName(nome)
    codice += getAnno(data_nascita)
    codice += getMese(data_nascita)
    codice += getGiorno(data_nascita, sesso)
    codice += getComune(idComune)
    codice += getLettera(codice)
    return codice
}

const getName = (name: string) => {
    let conta = 0
    let codice = ''
    let vocale = ''
    for (let key of name) {
        const lettera = key.toUpperCase()
        if (
            lettera !== 'A' &&
            lettera !== 'E' &&
            lettera !== 'I' &&
            lettera !== 'O' &&
            lettera !== 'U'
        ) {
            codice += lettera
            conta++
        } else {
            if (vocale === '') vocale = lettera
        }
        if (conta === 3) break
    }
    if (codice.length < 3) codice += vocale
    return codice
}

const getAnno = (data_nascita: Date) => {
    return data_nascita.getFullYear().toString().substring(2)
}

const getMese = (data_nascita: Date) => {
    for (let key of mappatura) {
        if (key.mese === data_nascita.getMonth() + 1) return key.value
    }
}

const getGiorno = (data_nascita: Date, sesso: Sesso) => {
    if (sesso === 'M') return data_nascita.getDate()
    else return data_nascita.getDate() + 40
}

const getComune = (idComune: string) => {
    const id = parseInt(idComune)
    for (let key of comuni) {
        if (key.id === id) return key.value
    }
}

const getLettera = (codice: string) => {
    let sum = somma(codice)
    let resto = sum % 26
    for (let chiave of corrispondenza) {
        if (chiave.key === resto) return chiave.value
    }
}

const somma = (codice: string) => {
    let somma = 0
    let conta = 1
    for (let key of codice) {
        let resto = conta % 2
        for (let chiave of car) {
            if (chiave.carattere === key.toLowerCase() && resto === 0) {
                somma = somma + chiave.pari
                break
            } else if (chiave.carattere === key.toLowerCase() && resto !== 0) {
                somma = somma + chiave.dispari
                break
            }
        }
        conta++
    }
    return somma
}

export default calcola
