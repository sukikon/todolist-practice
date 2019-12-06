function get_todo() {
    var todo = new Array;
    var todoString = localStorage.getItem('todo');
    if (todoString !== null) {
        todo = JSON.parse(todoString);  //change to JsonString
    }
    return todo;
}
function get_done(){
    var done = new Array;
    var doneString = localStorage.getItem('fin');
    if(doneString !== null){
        done = JSON.parse(doneString);
    }
    return done;
}
 
function add() {
    var text = document.getElementById('text').value;
    var todo = get_todo();  //Json
    if(text.length == 0){
        alert("enter something please")
        return
    }
    todo.push(text);
    localStorage.setItem('todo', JSON.stringify(todo));
 
    show();
 
    return false;
}

 
function done() {
    var id = this.getAttribute('id');
    var todo = get_todo();
    var done = get_done();

    done.push(todo[id]);
    todo.splice(id, 1);

    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('fin', JSON.stringify(done));
    
    show();
    return false;
}
function undo(){
    var id = this.getAttribute('id');
    var todo = get_todo();
    var done = get_done();

    todo.push(done[id]);
    done.splice(id, 1);

    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('fin', JSON.stringify(done));
    
    show();
    return false;
}
 
function show() {
    var todo = get_todo();
    var fin = get_done();
 
    var html = '<ul>';
    for(var i=0; i<todo.length; i++) {
        html += '<li><input type="checkbox" name="uncheck" id="' + i  + '">' + todo[i] + '</li>';
    };
    html += '</ul>';

    var htmlf = '<ul>';
    for(var i=0; i<fin.length; i++) {
        htmlf += '<li><input type="checkbox" name="check" checked="true" id="' + i  + '">' + fin[i] + '</li>'
    };
    htmlf += '</ul>';

    //<input type="checkbox" name="" id="">
 
    document.getElementById('todo').innerHTML = html;
    document.getElementById('doned').innerHTML = htmlf;
 
    var todoCheck = document.getElementsByName('uncheck');
    var doneCheck = document.getElementsByName('check');
    
    for (var i=0; i < todoCheck.length; i++) {
        todoCheck[i].addEventListener('change', done)
    };
    for (var i=0; i < doneCheck.length; i++) {
        doneCheck[i].addEventListener('change', undo)
    };
}

function clear(){
    localStorage.clear();
    show();
}
clear();
document.getElementById('add').addEventListener('click', add);
document.getElementById('clear').addEventListener('click',clear);
show();