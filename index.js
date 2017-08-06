var turn;
var diff;
var state = [null, null, null, null, null, null, null, null, null];
var strategy = [
    [0, 1, 2],
    [1, 2, 0],
    [0, 2, 1],
    [0, 3, 6],
    [0, 6, 3],
    [3, 6, 0],
    [1, 4, 7],
    [1, 7, 4],
    [4, 7, 1],
    [2, 5, 8],
    [2, 8, 5],
    [5, 8, 2],
    [3, 4, 5],
    [3, 5, 4],
    [4, 5, 3],
    [6, 7, 8],
    [6, 8, 7],
    [7, 8, 6],
    [0, 4, 8],
    [0, 8, 4],
    [4, 8, 0],
    [2, 4, 6],
    [2, 6, 4],
    [4, 6, 2]
]
var start = function() {
    addListen();
    turn = $('#test1')[0].checked ? 'ai' : "pl";
    if($('#diff1')[0].checked) {
        diff = 0.3;
    }
    else {
    diff = $('#diff2')[0].checked ? 0.2 : 0.1;
    }
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
        turn = $('#test1')[0].checked ?  'ai' : "pl";
        if($('#diff1')[0].checked) {
            diff = 0.3;
        }
        else {
            diff = $('#diff2')[0].checked ? 0.2 : 0.1;
        }
        $('.material-icons').remove();
        $('.root').removeClass("z-depth-3 green red");
        addListen();
        state = [null, null, null, null, null, null, null, null, null];
        console.log(turn)
        if (turn == "ai") aiTurn();
    });
}
var mistake = function(){
    if(Math.random() < diff) {
        return state.indexOf(null);
    }
    return null;
}
var aiTurn = function() {
    let mist = mistake();
    if(mist !== null) {
        choise(mist + 1);
        return true;
    }
    let next = winCheck();
    if (next !== null) {
        choise(next);
        return true;
    }
    if (state[4] == null) {
        choise(5);
        return true;
    }
    if (state[4] == 'ai' && ((state[0] == 'pl' && state[8] == 'pl') || (state[2] == 'pl' && state[6] == 'pl'))) {
        if (state[1] == null) { choise(2); return true; }
        if (state[3] == null) { choise(4); return true; }
        if (state[5] == null) { choise(6); return true; }
        if (state[7] == null) { choise(8); return true; }
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
var winStrategyCheck = function(arr) {
    if (state[arr[0]] == state[arr[1]] && state[arr[0]] !== null && state[arr[2]] == null) {
        let status = state[arr[0]] == 'ai' ? 'win' : 'lose';
        return {
            status: status,
            result: arr[2] + 1
        }
    } else return null;
}
var winCheck = function() {
    let result = {
        lose: [],
        win: []
    }
    for (let i = 0; i < strategy.length; i++) {
        let win = winStrategyCheck(strategy[i]);
        if (win !== null) result[win.status].push(win.result);
    }
    if (result.win.length > 0) return result.win[0];
    if (result.lose.length > 0) return result.lose[0];
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
        turn = turn == "ai" ?  "pl" : "ai";
        $('#title')[0].innerHTML = turn == 'ai' ? "AI is turn now." : "Player turn!";
        if (turn == "ai") aiTurn();
    }
}
var validateStrategy = function(arr) {
    if (null !== state[arr[0]] && state[arr[0]] == state[arr[1]] && state[arr[0]] == state[arr[2]]) {
        winRow(arr);
        return false;
    } else return true;
}
var check = function() {
    for (let i = 0; i < strategy.length; i++) {
        if (!validateStrategy(strategy[i])) return false;
    }
    return true;

}
var winRow = function(arr) {
    let color = turn == "ai" ? "red" : "green";
    $(`.cell${arr[0]+1}`).addClass(`z-depth-3 ${color}`);
    $(`.cell${arr[1]+1}`).addClass(`z-depth-3 ${color}`);
    $(`.cell${arr[2]+1}`).addClass(`z-depth-3 ${color}`);
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
    for (let i = 1; i < 10; i++) {
        try {
            $(`.cell${i}`)[0].onclick = function() {}
        } catch (er) {
            console.log("Error in i = ", i)
        }
    }

}