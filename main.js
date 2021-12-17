const answer = document.querySelectorAll('.answer');
const submitBtn = document.getElementById('submit');
const quiz = document.getElementById('question');
let scores_choose = 0;
let scores = 0;
let question_now = 0;
load_question();

function load_question(){
    fetch('http://localhost:8080/restful_api/restful_api_php/api/question/read.php')
    .then(res => res.json())
    .then(data => {
        document.getElementById('total_question').value = data.question.length;
        const title = document.getElementById('title');
        const a_answer = document.getElementById('a_answer');
        const b_answer = document.getElementById('b_answer');
        const c_answer = document.getElementById('c_answer');
        const d_answer = document.getElementById('d_answer');

        //show question
        const get_question = data.question[question_now];
    
        title.innerText = get_question.title;
        a_answer.innerText = get_question.cau_a;
        b_answer.innerText = get_question.cau_b;
        c_answer.innerText = get_question.cau_c;
    
        if(get_question.cau_d != null){
            d_answer.innerText = get_question.cau_d;
            document.getElementById('cau_d').classList.remove('show_question');
        }else{
            document.getElementById('d_answer').classList.add('show_question');
        }

        document.getElementById('cau_dung').value = get_question.cau_dung;
    })
    .catch(error => console.log('error'));
}

//choose answer
function choose_answer(){
    let choose = undefined;
    answer.forEach((answer) => {
        if(answer.checked){
            choose = answer.id;
        }
    });
    return choose;
}

//remove question
function remove_answer(){
    answer.forEach((answer) => {
        answer.checked = false;
    })
}

//event submit
submitBtn.addEventListener("click", () => {
    const choose = choose_answer();
    if(choose){
        if(choose === document.getElementById('cau_dung').value){
            scores_choose++;
            scores++;
        }
    }
    question_now++;
    load_question();

    if(question_now < document.getElementById('total_question').value){
        load_question();
    }else{
        const total_question = document.getElementById('total_question').value;
        quiz.innerHTML = `
            <h2>Bạn đã đúng ${scores}/${total_question} câu hỏi </h2>
            <button onclick="location.reload()">Làm Lại</button>
            `
    }
})