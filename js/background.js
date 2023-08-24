const images = ["0.jpg", "1.jpg", "2.jpg"]; // 이미지와 이름 같게

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");  // img 요소 만들기
bgImage.src = `img/${chosenImage}`;    // 'img/'는 이미지 넣어있는 폴더 이름

document.body.appendChild(bgImage);