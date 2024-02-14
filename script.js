const $typingContent = document.querySelector('.content_editor_codes p');
const $inputField = document.querySelector('.input_field');
const $time = document.querySelector('.progress_time span');
const $wordPerMin = document.querySelector('.progress_WPM span');
const $accuracy = document.querySelector('.progress_ACC span');
const $rotate = document.querySelector('i.rotate');

let timer;
let time = 0;
let isTyping = false;
let charIdx = 0;
let mistypedChar = 0;


function randomContent () {
    let randomIdx = Math.floor(Math.random() * contents.length);
    $typingContent.innerHTML = '';
    let contentSpans = contents[randomIdx].split('').map(element => `<span>${element}</span>`).join('');
    $typingContent.innerHTML = contentSpans;
    $typingContent.addEventListener('click', () => $inputField.focus());
}

function typing() {
    const characters = $typingContent.querySelectorAll('span');
    let typedChar = $inputField.value.split('')[charIdx];
    if (charIdx <= characters.length) {
        if (!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        // 입력이 없거나 입력을 지우는 경우 
        if (typedChar === undefined) {
            charIdx--;
            if (characters[charIdx].classList.contains('incorrect')) {
                mistypedChar--;
            } 
            characters[charIdx].classList.remove('correct', 'incorrect');
        } else {
            if (characters[charIdx].innerText === typedChar) {
                characters[charIdx].classList.add("correct");   
            } else {
                mistypedChar++;
                characters[charIdx].classList.add("incorrect");   
            }
            charIdx++;      
        }
        
        characters.forEach(span => span.classList.remove("active"));
        // 마지막에 갔을 전에는 active를 삭제해준다
        if (charIdx !== characters.length) {
            characters[charIdx].classList.add('active');
        } else { // 마지막에는 타이머를 종료한다. 
            clearInterval(timer);
        }
    
        let acc = Math.round(((charIdx - mistypedChar) / charIdx) * 100);
        acc = acc < 0 || !acc || acc === Infinity ? 0 : acc;
        let wpm = Math.round((((charIdx - mistypedChar) / 5) / time) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        $accuracy.innerText = `${acc}%`;
        $wordPerMin.innerText = wpm;
    } else {
        $inputField.value = '';
        clearInterval(timer);
    }

}

function startTimer() {
    time++;
    $time.innerText = `${time} s`;
}

function resetTyping() {
    randomContent();
    $inputField.value = '';
    clearInterval(timer);
    time = 0;
    isTyping = false;
    charIdx = 0;
    mistypedChar = 0;
    $time.innerText = '-';
    $accuracy.innerText = '-';
    $wordPerMin.innerText = '-';
}

randomContent();
$inputField.addEventListener('input', typing);
$rotate.addEventListener('click', resetTyping);
