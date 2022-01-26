(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var mappatura_1 = require("./mappatura");

var calcola = function calcola(nome, cognome, data_nascita, sesso, idComune) {
  var codice = '';
  codice += getName(cognome);
  codice += getName(nome);
  codice += getAnno(data_nascita);
  codice += getMese(data_nascita);
  codice += getGiorno(data_nascita, sesso);
  codice += getComune(idComune);
  codice += getLettera(codice);
  return codice;
};

var getName = function getName(name) {
  var conta = 0;
  var codice = '';
  var vocale = '';

  for (var _i = 0, name_1 = name; _i < name_1.length; _i++) {
    var key = name_1[_i];
    var lettera = key.toUpperCase();

    if (lettera !== 'A' && lettera !== 'E' && lettera !== 'I' && lettera !== 'O' && lettera !== 'U') {
      codice += lettera;
      conta++;
    } else {
      if (vocale === '') vocale = lettera;
    }

    if (conta === 3) break;
  }

  if (codice.length < 3) codice += vocale;
  return codice;
};

var getAnno = function getAnno(data_nascita) {
  return data_nascita.getFullYear().toString().substring(2);
};

var getMese = function getMese(data_nascita) {
  for (var _i = 0, mappatura_2 = mappatura_1.mappatura; _i < mappatura_2.length; _i++) {
    var key = mappatura_2[_i];
    if (key.mese === data_nascita.getMonth() + 1) return key.value;
  }
};

var getGiorno = function getGiorno(data_nascita, sesso) {
  if (sesso === 'M') return data_nascita.getDate();else return data_nascita.getDate() + 40;
};

var getComune = function getComune(idComune) {
  var id = parseInt(idComune);

  for (var _i = 0, comuni_1 = mappatura_1.comuni; _i < comuni_1.length; _i++) {
    var key = comuni_1[_i];
    if (key.id === id) return key.value;
  }
};

var getLettera = function getLettera(codice) {
  var sum = somma(codice);
  var resto = sum % 26;

  for (var _i = 0, corrispondenza_1 = mappatura_1.corrispondenza; _i < corrispondenza_1.length; _i++) {
    var chiave = corrispondenza_1[_i];
    if (chiave.key === resto) return chiave.value;
  }
};

var somma = function somma(codice) {
  var somma = 0;
  var conta = 1;

  for (var _i = 0, codice_1 = codice; _i < codice_1.length; _i++) {
    var key = codice_1[_i];
    var resto = conta % 2;

    for (var _a = 0, car_1 = mappatura_1.car; _a < car_1.length; _a++) {
      var chiave = car_1[_a];

      if (chiave.carattere === key.toLowerCase() && resto === 0) {
        somma = somma + chiave.pari;
        break;
      } else if (chiave.carattere === key.toLowerCase() && resto !== 0) {
        somma = somma + chiave.dispari;
        break;
      }
    }

    conta++;
  }

  return somma;
};

exports["default"] = calcola;

},{"./mappatura":3}],2:[function(require,module,exports){
"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fiscalCode_1 = __importDefault(require("./fiscalCode"));

var comune = window.document.getElementById('comune');
var btn = window.document.getElementById('btn');
var nome = window.document.getElementById('nome');
var cognome = window.document.getElementById('cognome');
var data_nascita = window.document.getElementById('data_nascita');
var sesso = window.document.getElementById('sesso');
var risultato = window.document.getElementById('risultato');

function fiscalCode() {
  var data = new Date(data_nascita.value);
  var codice_fiscale = (0, fiscalCode_1["default"])(nome.value, cognome.value, data, sesso.value, comune.value);
  test(codice_fiscale) ? console.info('TEST: OK') : console.error('TEST: Error FiscalCode');
  if (risultato !== null) risultato.innerHTML = "<h1 class=\"text-center fs-1 fw-bold\">CODICE FISCALE: ".concat(codice_fiscale, " </h1>");
}

function test(codice) {
  var patten = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;

  if (codice.match(patten)) {
    return true;
  } else {
    return false;
  }
}

btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', fiscalCode);

},{"./fiscalCode":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comuni = exports.corrispondenza = exports.car = exports.mappatura = void 0;
exports.mappatura = [{
  mese: 1,
  value: 'A'
}, {
  mese: 2,
  value: 'B'
}, {
  mese: 3,
  value: 'C'
}, {
  mese: 4,
  value: 'D'
}, {
  mese: 5,
  value: 'E'
}, {
  mese: 6,
  value: 'H'
}, {
  mese: 7,
  value: 'L'
}, {
  mese: 8,
  value: 'M'
}, {
  mese: 9,
  value: 'P'
}, {
  mese: 10,
  value: 'R'
}, {
  mese: 11,
  value: 'S'
}, {
  mese: 12,
  value: 'T'
}];
exports.car = [{
  carattere: '0',
  pari: 0,
  dispari: 1
}, {
  carattere: '1',
  pari: 1,
  dispari: 0
}, {
  carattere: '2',
  pari: 2,
  dispari: 5
}, {
  carattere: '3',
  pari: 3,
  dispari: 7
}, {
  carattere: '4',
  pari: 4,
  dispari: 9
}, {
  carattere: '5',
  pari: 5,
  dispari: 13
}, {
  carattere: '6',
  pari: 6,
  dispari: 15
}, {
  carattere: '7',
  pari: 7,
  dispari: 17
}, {
  carattere: '8',
  pari: 8,
  dispari: 19
}, {
  carattere: '9',
  pari: 9,
  dispari: 21
}, {
  carattere: 'a',
  pari: 0,
  dispari: 1
}, {
  carattere: 'b',
  pari: 1,
  dispari: 0
}, {
  carattere: 'c',
  pari: 2,
  dispari: 5
}, {
  carattere: 'd',
  pari: 3,
  dispari: 7
}, {
  carattere: 'e',
  pari: 4,
  dispari: 9
}, {
  carattere: 'f',
  pari: 5,
  dispari: 13
}, {
  carattere: 'g',
  pari: 6,
  dispari: 15
}, {
  carattere: 'h',
  pari: 7,
  dispari: 17
}, {
  carattere: 'i',
  pari: 8,
  dispari: 19
}, {
  carattere: 'j',
  pari: 9,
  dispari: 21
}, {
  carattere: 'k',
  pari: 10,
  dispari: 2
}, {
  carattere: 'l',
  pari: 11,
  dispari: 4
}, {
  carattere: 'm',
  pari: 12,
  dispari: 18
}, {
  carattere: 'n',
  pari: 13,
  dispari: 20
}, {
  carattere: 'o',
  pari: 14,
  dispari: 11
}, {
  carattere: 'p',
  pari: 15,
  dispari: 3
}, {
  carattere: 'q',
  pari: 16,
  dispari: 6
}, {
  carattere: 'r',
  pari: 17,
  dispari: 8
}, {
  carattere: 's',
  pari: 18,
  dispari: 12
}, {
  carattere: 't',
  pari: 19,
  dispari: 14
}, {
  carattere: 'u',
  pari: 20,
  dispari: 16
}, {
  carattere: 'v',
  pari: 21,
  dispari: 10
}, {
  carattere: 'w',
  pari: 22,
  dispari: 22
}, {
  carattere: 'x',
  pari: 23,
  dispari: 25
}, {
  carattere: 'y',
  pari: 24,
  dispari: 24
}, {
  carattere: 'z',
  pari: 25,
  dispari: 23
}];
exports.corrispondenza = [{
  key: 0,
  value: 'A'
}, {
  key: 1,
  value: 'B'
}, {
  key: 2,
  value: 'C'
}, {
  key: 3,
  value: 'D'
}, {
  key: 4,
  value: 'E'
}, {
  key: 5,
  value: 'F'
}, {
  key: 6,
  value: 'G'
}, {
  key: 7,
  value: 'H'
}, {
  key: 8,
  value: 'I'
}, {
  key: 9,
  value: 'J'
}, {
  key: 10,
  value: 'K'
}, {
  key: 11,
  value: 'L'
}, {
  key: 12,
  value: 'M'
}, {
  key: 13,
  value: 'N'
}, {
  key: 14,
  value: 'O'
}, {
  key: 15,
  value: 'P'
}, {
  key: 16,
  value: 'Q'
}, {
  key: 17,
  value: 'R'
}, {
  key: 18,
  value: 'S'
}, {
  key: 19,
  value: 'T'
}, {
  key: 20,
  value: 'U'
}, {
  key: 21,
  value: 'V'
}, {
  key: 22,
  value: 'W'
}, {
  key: 23,
  value: 'X'
}, {
  key: 24,
  value: 'Y'
}, {
  key: 25,
  value: 'Z'
}];
exports.comuni = [{
  name: 'Altamura',
  value: 'A225',
  id: 1
}, {
  name: 'Martina Franca',
  value: 'E986',
  id: 2
}, {
  name: 'Matera',
  value: 'F052',
  id: 3
}, {
  name: 'Palermo',
  value: 'G273',
  id: 4
}];

},{}]},{},[2]);
