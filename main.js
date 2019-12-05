//i hate you QQQQQ
function get_todo() {
    var todo = new Array;
    var todoString = localStorage.getItem('todo');
    if (todoString !== null) {
        todo = JSON.parse(todoString);  //change to JsonString
    }
    return todo;
}
function get_fin(){
    var fin = new Array;
    var finString = localStorage.getItem('fin');
    if(finString !== null){
        fin = JSON.parse(finString);
    }
    return fin;
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
    var fin = get_fin();

    fin.push(todo[id]);
    todo.splice(id, 1);

    localStorage.setItem('todo', JSON.stringify(todo));
    localStorage.setItem('fin', JSON.stringify(fin));
    
 
    show();
 
    return false;
}
 
function show() {
    var todo = get_todo();
    var fin = get_fin();
 
    var html = '<ul>';
    for(var i=0; i<todo.length; i++) {
        html += '<li><input type="checkbox" name="done" id="' + i  + '">' + todo[i] + '</li>';
    };
    html += '</ul>';

    var htmlf = '<ul>';
    for(var i=0; i<fin.length; i++) {
        htmlf += '<li><input type="checkbox" name="done" checked="true" id="' + i  + '">' + fin[i] + '</li>'
    };
    htmlf += '</ul>';

    //<input type="checkbox" name="" id="">
 
    document.getElementById('todo').innerHTML = html;
    document.getElementById('fin').innerHTML = htmlf;
 
    var buttons = document.getElementsByName('done');
    
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('change', done)
    };
}

document.getElementById('add').addEventListener('click', add);
show();