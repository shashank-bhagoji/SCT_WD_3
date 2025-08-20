let questions = [];
let answers = [];

async function fetchQuestions() {
    const res = await fetch('http://localhost:5000/questions');
    questions = await res.json();
    renderQuestions();
}

function renderQuestions() {
    const form = document.getElementById('quizForm');
    form.innerHTML = '';
    answers = [];
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'question';
        div.innerHTML = `<div>${i + 1}. ${q.text}</div>`;
        answers.push({ questionId: q._id, selectedOptions: [] });

        q.options.forEach((opt, idx) => {
            const optId = `q${i}_opt${idx}`;
            let inpType = q.type === 'multi' ? 'checkbox' : 'radio';
            div.innerHTML += `
                <div class="option">
                    <input type="${inpType}" id="${optId}" name="q${i}" value="${idx}" 
                        onchange="handleOption(${i},${idx},'${q.type}',this)">
                    <label for="${optId}">${opt}</label>
                </div>`;
        });
        form.appendChild(div);
    });
    form.innerHTML += `<button type="button" onclick="submitQuiz()">Submit</button>`;
}

window.handleOption = function(qIdx, optIdx, type, el) {
    if (type === 'single') {
        answers[qIdx].selectedOptions = [optIdx];
    } else {
        if (el.checked) {
            if (!answers[qIdx].selectedOptions.includes(optIdx))
                answers[qIdx].selectedOptions.push(optIdx);
        } else {
            answers[qIdx].selectedOptions = answers[qIdx].selectedOptions.filter(o => o !== optIdx);
        }
    }
}

async function submitQuiz() {
    const res = await fetch('http://localhost:5000/questions/submit', {
     
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({answers})
    });
    const result = await res.json();
    document.getElementById('result').innerText =
        `Your Score: ${result.score} out of ${result.total}`;
}

fetchQuestions();
