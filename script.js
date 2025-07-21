const bankIcons = {
  "тинь": "🏦🔸",
  "тиньк": "🏦🔸",
  "озон": "🏦🔹",
  "рзон": "🏦🔹",
  "оз": "🏦🔹",
  "яд": "🏦🟣",
  "яндекс": "🏦🟣"
};

const fixedBanks = {
  "заира": "🏦🔸",
  "максим": "🏦🔸",
  "юсуф": "🏦🔸",
  "сидрат": "🏦🔸",
  "лариса": "🏦🔸",
  "раджаб": "🏦🔸",
  "сабир": "🏦🔸",
  "ибра т": "🏦🔸",
  "курбан": "🏦🔸",
  "фаина": "🏦🔹",
  "ибра": "🏦🔹",
  "гаджи": "🏦🟣",
  "гаджимурад": "🏦🟣",
  "ислам": "🏦🟣",
  "абдул": "🏦🟣",
  "шейх": "🏦🟣",
  "шейхмустафа": "🏦🟣",
  "давид": "🏦🟣",
  "муг": "🏦🟣",
  "мугма": "🏦🟣",
  "салимат": "🏦🟣"
};

function parseLine(line) {
  let [nameBank, ...rest] = line.split(/\s+/);
  if (!nameBank) return null;
  let name = nameBank.trim().toLowerCase();
  let bank = "";

  for (let keyword in bankIcons) {
    if (line.toLowerCase().includes(keyword)) {
      bank = bankIcons[keyword];
      break;
    }
  }

  if (fixedBanks[name]) bank = fixedBanks[name];

  let numbers = rest.join(" ")
    .replace(/\([^)]*\)/g, "") // удаление скобок и их содержимого
    .match(/\d+[.,]?\d*t?/gi) || [];

  let sumMap = {};
  let total = 0;

  for (let val of numbers) {
    val = val.replace(",", ".").toLowerCase();
    let isT = val.includes("т");
    let num = parseFloat(val);
    if (!isNaN(num)) {
      let final = isT ? num * 1000 : num * 1000;
      total += final;
      sumMap[final] = (sumMap[final] || 0) + 1;
    }
  }

  return {
    name: name.toUpperCase(),
    bank,
    sumMap,
    total
  };
}

function calculate() {
  let input = document.getElementById("input").value.trim();
  let lines = input.split(/\n+/);
  let people = [];
  let globalTotal = 0;

  for (let line of lines) {
    let parsed = parseLine(line);
    if (parsed && parsed.total > 0) {
      people.push(parsed);
      globalTotal += parsed.total;
    }
  }

  let output = "";
  for (let p of people) {
    output += `\n<b>${p.name}</b> ${p.bank}\n`;
    for (let amount in p.sumMap) {
      output += `${amount}₽ × ${p.sumMap[amount]}\n`;
    }
    output += `ИТОГО: ${p.total}₽\n\n`;
  }
  output += `<hr>ОБЩАК: ${globalTotal}₽`;
  document.getElementById("output").innerHTML = output;
}