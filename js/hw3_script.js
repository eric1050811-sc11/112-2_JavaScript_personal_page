function calculate_change() {
    const n = parseInt(document.getElementById("n").value);
    const solutions = findChange(n);
    const output = document.getElementById("output");
    output.innerHTML = "";
    for (const [tenDollars, fiveDollars, oneDollars] of solutions)
    {
        output.innerHTML += `n=${n}: ${tenDollars} 10-dollars ${fiveDollars} 5-dollars ${oneDollars} 1-dollars<br>`;
    }
}

function findChange(amount) {
    const solutions = [];

    for (let x = 0; x <= amount / 10; x++) {
        for (let y = 0; y <= (amount - x * 10) / 5; y++) {
            const z = amount - x * 10 - y * 5;
            solutions.push([x, y, z]);
        }
    }

    return solutions;
}
