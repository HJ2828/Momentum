// const loginForm = document.getElementById("login-form");
// const loginInput = loginForm.querySelector("input");
// const loginButton = loginForm.querySelector("button");

const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";  // 상수로 선언(반복되는 것은 상수로(오타 가능성))
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();    // event의 기본 행동이 발생되지 않도록 막기
    const username = loginInput.value;
    loginForm.classList.add(HIDDEN_CLASSNAME);  // 클래스 추가해 form 없애기
    localStorage.setItem(USERNAME_KEY, username); // 값 저장하기
    paintGreetings(username);
}

// 똑같은 코드는 함수로 만들어 관리하자
function paintGreetings(username) {
    greeting.innerText = `Hello, ${username}`;   // ` `: 백틱
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {    // username이 비어있다면
    loginForm.classList.remove(HIDDEN_CLASSNAME);   // hidden 클래스를 없애고 form 보이기
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}