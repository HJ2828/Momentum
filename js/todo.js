const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");    // const toDoInput = document.querySelector("#todo-form input"); 와 동일
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"    // 여러번 사용하는 변수는 상수로

let toDos = [];     // todo 넣을 array

function saveToDos() {  // todo 저장
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));   // local 저장소에 todo 저장 
}

function deleteToDo(event) {    // todo 삭제
    const li = event.target.parentElement;  // 클릭 타겟(버튼)의 부모 요소 => li
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));     // id를 이용해 todo array에서 제외시키기
    saveToDos();    // todo 저장
}

function paintToDo(newTodo) {  // todo 그리기
    const li = document.createElement("li");    // html에 li 만들기
    li.id = newTodo.id;     // html의 li에 id 주기
    const button = document.createElement("button");    // html에 button 만들기
    button.innerText = "❌";    // button 내용 넣기
    const span = document.createElement("span");    // html에 sapn 만들기
    span.innerText = newTodo.text;   // sapn에 todo 내용 넣기

    button.addEventListener("click", deleteToDo);   // 삭제 버튼 클릭 이벤트

    li.appendChild(button); // li 내부에 button 넣기
    li.appendChild(span);   // li 내부에 span 넣기
    toDoList.appendChild(li);   // todolist 안에 li 넣기 (html의 ul안에 li 넣기)
}

function handleToDoSubmit(event) {  // todo 입력
    event.preventDefault();    // event의 기본 행동이 발생되지 않도록 막기
    const newTodo = toDoInput.value;    // value 저장
    toDoInput.value = "";   // 엔터 누르면 input에 입력한 value 비우기
    
    // text말고 object 푸시하기
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),     // Date.now()를 사용해 id로 랜덤 숫자 
    }

    toDos.push(newTodoObj);    // array에 todo 넣기

    paintToDo(newTodoObj); // todo 그리는 함수 호출

    saveToDos();    // todo 저장 함수
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) { // saveToDos가 localStorage에 존재한다면(저장되어있다면)
    const parsedToDos = JSON.parse(savedToDos); // localStorage에 저장된 todos를 단순한 string에서 살아있는 array로 변환
    toDos = parsedToDos;    // toDos array가 비어있다면 기존 todo를 넣어주기
    parsedToDos.forEach(paintToDo);    // 각각 item들을 paintToDo 함수 이용해 화면에 나타내기
}


