
function analyze() {
    const input = document.getElementById("input").value;
    const lines = input.split(/\n|\r/).map(line => line.trim()).filter(Boolean);
    const people = {};
    const bankEmojis = {
        "тинь": "🏦🔸", "тиньк": "🏦🔸",
        "озон": "🏦🔹", "оз": "🏦🔹", "рзон": "🏦🔹",
        "яд": "🏦🟣", "яндекс": "🏦🟣"
    };

    lines.forEach(line => {
        if (line.includes("(")) return;

        let [name, ...amounts] = line.split(/\s+/);
        name = name.toUpperCase();

        const bank = Object.keys(bankEmojis).find(key => line.toLowerCase().includes(key));
        const emoji = bank ? bankEmojis[bank] : "";

        amounts = amounts.map(val => parseFloat(val.replace(/[тт]/, "")))
                         .filter(val => !isNaN(val))
                         .map(val => Math.round(val * 1000));

        if (!people[name]) {
            people[name] = { emoji, values: [] };
        }

        people[name].values.push(...amounts);
    });

    let result = "";
    let total = 0;

    for (const [name, data] of Object.entries(people)) {
        const group = {};
        data.values.forEach(v => group[v] = (group[v] || 0) + 1);
        const list = Object.entries(group).map(([v, c]) => `${v}₽ × ${c}`).join("  ");
        const sum = data.values.reduce((a, b) => a + b, 0);
        result += `<b>${name}</b> ${data.emoji}<br>${list}<br><b>ИТОГО: ${sum}₽</b><br><br>`;
        total += sum;
    }

    result += `<hr><b>ОБЩАК: ${total}₽</b>`;
    document.getElementById("output").innerHTML = result;
}
