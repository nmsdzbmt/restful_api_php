const answer = document.querySelectorAll('.answer');
const submitBtn = document.getElementById('submit');
let scores = 0;
let question_now = 0;
load_question();

function load_question(){
    fetch('http://localhost:8080/restful_api/restful_api_php/api/question/read.php')
    .then(res => res.json())
    .then(data => {
        const title = document.getElementById('title');
        const a_answer = document.getElementById('a_answer');
        const b_answer = document.getElementById('b_answer');
        const c_answer = document.getElementById('c_answer');
        const d_answer = document.getElementById('d_answer');

        //show question
        const get_question = data.question[question_now];
        console.log('get_question');
    
        title.innerText = get_question.title;
        a_answer.innerText = get_question.cau_a;
        b_answer.innerText = get_question.cau_b;
        c_answer.innerText = get_question.cau_c;
    
        if(get_question.cau_d != null){
            d_answer.innerText = get_question.cau_d;
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
    const answer_ = choose_answer();
    console.log(answer_);
    if(answer_){
        if(answer_ === document.getElementById('cau_dung').value){
            scores++;
            console.log(scores);
        }
    }
    question_now++;
    load_question();
})