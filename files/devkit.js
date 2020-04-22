function cL(who){ console.log(who) };
function cI(who){ console.info(who) };
function cW(who){ console.warn(who) };
function cE(who){ console.error(who) };

function isHex(hex) { return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test( hex ) } // Проверка является ли строка числом HEX