function draw_guess_area() {
    let temp = new String();

    // create guessing area using table
    temp += "<table>";
    temp += "<tbody>";
    let cnt = 0;
    for (let i = 0; i < 6; i++) {
        temp += "<tr>";
        for (let j = 0; j < 5; j++) {
            temp += '<td class="guess_block" id="guess_';
            temp += cnt;
            temp += '">&emsp;</td>';
            cnt += 1;
        }
        temp += "</tr>";
    }
    temp += "</tbody>";
    temp += "</table>";

    document.getElementById("guess_area").innerHTML = temp;
}

function draw_keyboard_area() {
    let temp = new String();

    // create keyboard area using table
    temp += "<table>";
    temp += "<tbody>";

    let f_row = "QWERTYUIOP";
    let s_row = "ASDFGHJKL";
    let t_row = "ZXCVBNM";
    let all_keys = [f_row, s_row, t_row];

    for (let i = 0; i < 3; i++) {
        temp += "<tr>";
        for (let j = 0; j < all_keys[i].length; j++) {
            temp += '<td class="keyboard_block" id="key_';
            temp += all_keys[i][j];
            temp += '">';
            temp += all_keys[i][j];
            temp += "</td>";
        }
        if (i == 1) {
            // add backspace
            temp += '<td class="keyboard_block" id="key_Backspace">Del</td>';
        } else if (i == 2) {
            // add enter
            temp += '<td class="keyboard_block" id="key_Enter" colspan="3">Enter</td>';
        }
        temp += "</tr>";
    }
    temp += "</tbody>";
    temp += "</table>";

    document.getElementById("keyboard_area").innerHTML = temp;
}

// draw guess and keyboard area
draw_guess_area();
draw_keyboard_area();

// use some variables to track the guesses
let curr_pos = 0;
let lower_bound = 0;
let upper_bound = 4;

function keyboard_handler(e) {
    if (e.key == "Backspace") {
        if (curr_pos > lower_bound && curr_pos > 0) {
            this.document.getElementById("guess_" + (curr_pos - 1)).innerHTML = new String();
            curr_pos--;
        }
    }

    if (curr_pos >= lower_bound && curr_pos <= upper_bound) {
        if (e.key >= "a" && e.key <= "z") {
            this.document.getElementById("guess_" + curr_pos).innerHTML = e.key.toUpperCase();
            curr_pos++;
        }
    } else if (e.key == "Enter") {
        let temp_word = new String();
        for (let i = curr_pos - 5; i < curr_pos; i++) {
            temp_word += this.document.getElementById("guess_" + i).innerHTML;
        }
        // console.log(temp_word);

        // check answer
        verify(temp_word);

        // update bounds
        lower_bound = curr_pos;
        upper_bound = curr_pos + 4;
    }
}

window.addEventListener("keydown", keyboard_handler);

function mouse_handler(e) {
    let key = e.target.closest("td");

    if (!key) {
        // not clicked on a cell
        return;
    }

    let key_pressed = key.innerHTML;
    if (!/^key_[A-Z]$/.test(key.id) && key_pressed != "Del" && key_pressed != "Enter") {
        // not click on keyboard
        return;
    }

    // console.log(key.innerHTML, key.id);

    if (key_pressed == "Del") {
        if (curr_pos > lower_bound && curr_pos > 0) {
            this.document.getElementById("guess_" + (curr_pos - 1)).innerHTML = new String();
            curr_pos--;
        }
        return;
    }

    if (curr_pos >= lower_bound && curr_pos <= upper_bound) {
        if (key_pressed != "Enter") {
            this.document.getElementById("guess_" + curr_pos).innerHTML = key_pressed;
            curr_pos++;
        }
    } else if (key_pressed == "Enter") {
        let temp_word = new String();
        for (let i = curr_pos - 5; i < curr_pos; i++) {
            temp_word += this.document.getElementById("guess_" + i).innerHTML;
        }
        // console.log(temp_word);

        // check answer
        verify(temp_word);

        // update bounds
        lower_bound = curr_pos;
        upper_bound = curr_pos + 4;
    }
}

window.addEventListener("click", mouse_handler);

function verify(temp_word) {
    let ans = new String(document.getElementById("answer").innerHTML);
    let succ_cnt = 0;

    for (let i = 0; i < 5; i++) {
        // console.log(temp_word[i]);
        if (ans.includes(temp_word[i])) {
            if (temp_word[i] == ans[i]) {
                document.getElementById("guess_" + (i + curr_pos - 5)).style.backgroundColor = "chartreuse";
                document.getElementById("key_" + temp_word[i]).style.backgroundColor = "chartreuse";
                succ_cnt++;
            } else {
                document.getElementById("guess_" + (i + curr_pos - 5)).style.backgroundColor = "yellow";
                document.getElementById("key_" + temp_word[i]).style.backgroundColor = "yellow";
            }
        } else {
            // current character not in answer
            document.getElementById("key_" + temp_word[i]).style.backgroundColor = "grey";
        }
    }

    if (succ_cnt == 5) {
        console.log("you guess it!");
        document.getElementById("guess_it").style.visibility = "visible";
        document.getElementById("play_again").style.visibility = "visible";
        window.removeEventListener("keydown", keyboard_handler);
        window.removeEventListener("click", mouse_handler);
    } else if (curr_pos > 29) {
        console.log("you lose!");
        document.getElementById("game_over").style.visibility = "visible";
        document.getElementById("play_again").style.visibility = "visible";
        window.removeEventListener("keydown", keyboard_handler);
        window.removeEventListener("click", mouse_handler);
    }
}

function reload_page() {
    location.reload();
}
