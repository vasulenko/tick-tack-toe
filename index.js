var turn = 'ai';
var state = [null, null, null, null, null, null, null, null, null];
var start = function() {
    addListen();
    var title = $('#title')[0];
    title.innerHTML = 'GO!';
    $("#startBtn").remove();
    var el = document.createElement('button');
    el.className = "waves-effect waves-light btn cyan";
    el.id = "refresh";
    el.innerHTML = "Restart";
    $(".title")[0].appendChild(el);
    $('.material-icons').remove();
    $('.root').removeClass("z-depth-3");
    $("#refresh").click(function() {
        var title = $('#title')[0];
        title.innerHTML = 'GO!';
        turn = 'ai';
        $('.material-icons').remove();
        addListen();
    })
}
var choise = function(num) {
    target = $(`.cell${num}`)[0];
    target.onclick = function() {};
    var el = document.createElement("i");
    el.className = "material-icons md-48";
    turn == "ai" ? el.innerHTML = "clear" : el.innerHTML = "panorama_fish_eye";
    str = ".cell" + num;
    $(`${str}`)[0].appendChild(el);
    state[num - 1] = turn;
    !check() ? finish() : turn == "ai" ? turn = "pl" : turn = "ai";
    var title = $('#title')[0];
    title.innerHTML = turn + " is turn now";
}
var check = function() {
    console.log(state)
        //console.log('0 = ', state[0], ' 1 = ', state[1], ' 2 = ', state[2], ' 3 = ', state[3], ' 4 = ', state[4], ' 5 = ', state[5], ' 6 = ', state[6], ' 7 = ', state[7], ' 8 = ', state[8])
    if (null !== state[0] && state[0] == state[1] && state[0] == state[2]) {
        console.log(state[0], state[1], state[2])
        return false;
    }
    if (null !== state[0] && state[0] == state[3] && state[0] == state[6]) {
        return false;
    }
    if (null !== state[0] && state[0] == state[4] && state[0] == state[8]) {
        return false;
    }
    if (null !== state[3] && state[3] == state[4] && state[3] == state[5]) {
        return false;
    }
    if (null !== state[6] && state[6] == state[7] && state[6] == state[8]) {
        return false;
    }
    if (null !== state[1] && state[1] == state[4] && state[1] == state[7]) {
        return false;
    }
    if (null !== state[2] && state[2] == state[5] && state[2] == state[8]) {
        return false;
    }
    if (null !== state[2] && state[2] == state[4] && state[2] == state[6]) {
        return false;
    }
    return true;
}
var finish = function() {
    setTimeout(() => {
        var title = $('#title')[0];
        title.innerHTML = turn + ' win !';
        offListen();
        state = [null, null, null, null, null, null, null, null, null];

    }, 100);
}
var addListen = function() {
    $(`.cell1`)[0].onclick = function() {
        choise(1);
    }
    $(`.cell2`)[0].onclick = function() {
        choise(2);
    }
    $(`.cell3`)[0].onclick = function() {
        choise(3);
    }
    $(`.cell4`)[0].onclick = function() {
        choise(4);
    }
    $(`.cell5`)[0].onclick = function() {
        choise(5);
    }
    $(`.cell6`)[0].onclick = function() {
        choise(6);
    }
    $(`.cell7`)[0].onclick = function() {
        choise(7);
    }
    $(`.cell8`)[0].onclick = function() {
        choise(8);
    }
    $(`.cell9`)[0].onclick = function() {
        choise(9);
    }
}
var offListen = function() {
    $(`.cell1`)[0].onclick = function() {}
    $(`.cell2`)[0].onclick = function() {}
    $(`.cell3`)[0].onclick = function() {}
    $(`.cell4`)[0].onclick = function() {}
    $(`.cell5`)[0].onclick = function() {}
    $(`.cell6`)[0].onclick = function() {}
    $(`.cell7`)[0].onclick = function() {}
    $(`.cell8`)[0].onclick = function() {}
    $(`.cell9`)[0].onclick = function() {}
}