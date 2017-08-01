var turn = 'ai';
var state = [null, null, null, null, null, null, null, null, null];
var start = function() {
    addListen();
    $('#test1')[0].checked ? turn = 'ai' : turn = "pl";
    $('#title')[0].innerHTML = 'GO!';
    $("#startBtn").remove();
    let el = document.createElement('button');
    el.className = "waves-effect waves-light btn cyan";
    el.id = "refresh";
    el.innerHTML = "Restart";
    $(".title")[0].appendChild(el);
    $('.material-icons').remove();
    $('.root').removeClass("z-depth-3");
    if (turn == "ai") aiTurn();
    $("#refresh").click(function() {
        $('#title')[0].innerHTML = 'GO!';
        $('#test1')[0].checked ? turn = 'ai' : turn = "pl";
        $('.material-icons').remove();
        $('.root').removeClass("z-depth-3 green red");
        addListen();
        state = [null, null, null, null, null, null, null, null, null];
        console.log(turn)
        if (turn == "ai") aiTurn();
    });
}
var aiTurn = function() {
    let next = winCheck();
    if (next !== null) {
        choise(next);
        return true;
    }
    if (state[4] == null) {
        choise(5);
        return true;
    }
    if (state[4] == 'ai' && (state[1] == 'pl' || state[3] == 'pl' || state[5] == 'pl' || state[7] == 'pl') &&
        (state[0] !== 'ai' && state[2] !== 'ai' && state[6] !== 'ai' && state[8] !== 'ai')) {
        if (state[1] == 'pl' && state[0] == null) { choise(1); return true; }
        if (state[1] == 'pl' && state[2] == null) { choise(3); return true; }
        if (state[3] == 'pl' && state[0] == null) { choise(1); return true; }
        if (state[3] == 'pl' && state[6] == null) { choise(7); return true; }
        if (state[5] == 'pl' && state[2] == null) { choise(3); return true; }
        if (state[5] == 'pl' && state[8] == null) { choise(9); return true; }
        if (state[7] == 'pl' && state[6] == null) { choise(7); return true; }
        if (state[7] == 'pl' && state[8] == null) { choise(9); return true; }
    }
    if (state[4] == 'ai' && (state[1] == 'pl' || state[3] == 'pl' || state[5] == 'pl' || state[7] == 'pl')) {
        if (state[1] == 'pl' && state[0] == 'ai' && state[6] == null) { choise(7); return true; }
        if (state[1] == 'pl' && state[2] == 'ai' && state[8] == null) { choise(8); return true; }
        if (state[3] == 'pl' && state[0] == 'ai' && state[4] == null) { choise(3); return true; }
        if (state[3] == 'pl' && state[6] == 'ai' && state[7] == null) { choise(8); return true; }
        if (state[5] == 'pl' && state[2] == 'ai' && state[0] == null) { choise(1); return true; }
        if (state[5] == 'pl' && state[8] == 'ai' && state[5] == null) { choise(6); return true; }
        if (state[7] == 'pl' && state[6] == 'ai' && state[0] == null) { choise(1); return true; }
        if (state[7] == 'pl' && state[8] == 'ai' && state[2] == null) { choise(3); return true; }
    }
    if (state[4] == 'pl' && (state[0] == 'pl' || state[2] == 'pl' || state[6] == 'pl' || state[8] == 'pl')) {

        if (state[0] == null) { choise(1); return true; }
        if (state[2] == null) { choise(3); return true; }
        if (state[6] == null) { choise(7); return true; }
        if (state[8] == null) { choise(9); return true; }
    }
    if (state.indexOf(null) !== -1) {
        choise(state.indexOf(null) + 1);
    }
    return false;

}
var winCheck = function() {
    if (state[0] == state[1] && state[0] !== null && state[2] == null) {
        return 3;
    }
    if (state[1] == state[2] && state[1] !== null && state[0] == null) {
        return 1;
    }
    if (state[0] == state[2] && state[0] !== null && state[1] == null) {
        return 2;
    }
    if (state[0] == state[3] && state[0] !== null && state[6] == null) {
        return 7;
    }
    if (state[0] == state[6] && state[0] !== null && state[3] == null) {
        return 4;
    }
    if (state[3] == state[6] && state[3] !== null && state[0] == null) {
        return 1;
    }
    if (state[1] == state[4] && state[1] !== null && state[7] == null) {
        return 8;
    }
    if (state[1] == state[7] && state[1] !== null && state[4] == null) {
        return 5;
    }
    if (state[4] == state[7] && state[4] !== null && state[1] == null) {
        return 2;
    }
    if (state[2] == state[5] && state[2] !== null && state[8] == null) {
        return 9;
    }
    if (state[2] == state[8] && state[2] !== null && state[5] == null) {
        return 6;
    }
    if (state[5] == state[8] && state[5] !== null && state[2] == null) {
        return 3;
    }
    if (state[3] == state[4] && state[3] !== null && state[5] == null) {
        return 6;
    }
    if (state[3] == state[5] && state[3] !== null && state[4] == null) {
        return 5;
    }
    if (state[4] == state[5] && state[4] !== null && state[3] == null) {
        return 4;
    }
    if (state[6] == state[7] && state[6] !== null && state[8] == null) {
        return 9;
    }
    if (state[6] == state[8] && state[6] !== null && state[7] == null) {
        return 8;
    }
    if (state[7] == state[8] && state[7] !== null && state[6] == null) {
        return 7;
    }
    if (state[0] == state[4] && state[0] !== null && state[8] == null) {
        return 9;
    }
    if (state[0] == state[8] && state[0] !== null && state[4] == null) {
        return 5;
    }
    if (state[4] == state[8] && state[4] !== null && state[0] == null) {
        return 1;
    }
    if (state[2] == state[4] && state[2] !== null && state[6] == null) {
        return 7;
    }
    if (state[2] == state[6] && state[2] !== null && state[4] == null) {
        return 5;
    }
    if (state[4] == state[6] && state[4] !== null && state[2] == null) {
        return 3;
    }
    return null;
}

var choise = function(num) {
    $(`.cell${num}`)[0].onclick = function() {};
    console.log(num)
    let el = document.createElement("i");
    el.className = "material-icons md-48";
    turn == "ai" ? el.innerHTML = "clear" : el.innerHTML = "panorama_fish_eye";
    $(`.cell${num}`)[0].appendChild(el);
    state[num - 1] = turn;
    if (!check()) {
        finish(turn);
    } else {
        if (state.indexOf(null) == -1) { finish("No one"); return; };
        turn == "ai" ? turn = "pl" : turn = "ai";
        $('#title')[0].innerHTML = turn == 'ai' ? "AI is turn now." : "Player turn!";
        if (turn == "ai") aiTurn();
    }
}
var check = function() {
    if (null !== state[0] && state[0] == state[1] && state[0] == state[2]) {
        winRow(0, 1, 2);
        return false;
    }
    if (null !== state[0] && state[0] == state[3] && state[0] == state[6]) {
        winRow(0, 3, 6);
        return false;
    }
    if (null !== state[0] && state[0] == state[4] && state[0] == state[8]) {
        winRow(0, 4, 8);
        return false;
    }
    if (null !== state[3] && state[3] == state[4] && state[3] == state[5]) {
        winRow(3, 4, 5);
        return false;
    }
    if (null !== state[6] && state[6] == state[7] && state[6] == state[8]) {
        winRow(6, 7, 8);
        return false;
    }
    if (null !== state[1] && state[1] == state[4] && state[1] == state[7]) {
        winRow(1, 4, 7);
        return false;
    }
    if (null !== state[2] && state[2] == state[5] && state[2] == state[8]) {
        winRow(2, 5, 8);
        return false;
    }
    if (null !== state[2] && state[2] == state[4] && state[2] == state[6]) {
        winRow(2, 4, 6);
        return false;
    }
    return true;
}
var winRow = function(f, s, t) {
    let color = turn == "ai" ? "red" : "green";
    $(`.cell${f+1}`).addClass(`z-depth-3 ${color}`);
    $(`.cell${s+1}`).addClass(`z-depth-3 ${color}`);
    $(`.cell${t+1}`).addClass(`z-depth-3 ${color}`);
}
var finish = function(turn) {
    setTimeout(() => {
        $('#title')[0].innerHTML = turn == 'ai' ? "AI win!" : turn == "pl" ? 'Player win!' : turn + " win!";
        offListen();
        state = [null, null, null, null, null, null, null, null, null];
    }, 100);
}
var addListen = function() {
    for (let i = 1; i < 10; i++) {
        $(`.cell${i}`)[0].onclick = function() {
            choise(i);
        }
    }

}
var offListen = function() {
    for (let i = 1; 1 < 10; i++) {
        $(`.cell${i}`)[0].onclick = function() {}
    }

}