# FiscalCode

Realizzare una interfaccia in Html e javascript per la composizione del codice fiscale.

Alla fine utilizzare questa funzione per il controllo del codice generato:

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

    // USE FUNCTION
    test(codice_fiscale)
        ? console.info('TEST: OK')
        : console.error('TEST: Error FiscalCode')