let questions = [
    "I know the difference between what I can control and what I cannot control. When making investment choices, I only evaluate and act on controllables.",
    "I have a way of looking forward in my life without prediction to understand the likelihood of accomplishing my goals.",
    "I know which goals I would trade off and by how much to accomplish more important goals.",
    "I have a process for making measured adjustments to my goals in challenging times to maintain confidence in my future.",
    "I have a process for capturing excess wealth relative to my goals and redeploy that excess in line with my priorities.",
    "I know the risk exposure I have to take to exceed my goals versus the risk exposure I can tolerate."
]

let container = document.getElementById("test-slider")
let upOneQuestion = document.getElementById("js-up")
let downOneQuestion = document.getElementById("js-down")


for (let i = 0; i < questions.length; i++) {
    // Create slide container and add class name
    const slide = document.createElement("div")
    slide.classList.add("slide")

    slide.style.top = i * 600 + "px"

    // Create slide text
    const question = document.createElement("h4")
    question.innerHTML = questions[i]

    // Add text to main container
    slide.appendChild(question);
    container.appendChild(slide);

    // Question number
    const current = document.createElement("div")
    current.classList.add("slide-number")

    slide.appendChild(current);

    current.innerHTML = i + 1 + " of " + questions.length

    // Create options container and add class name
    const options = document.createElement("div")
    options.classList.add("options")

    slide.appendChild(options);


    // Create options and add them to option container
    for (let j = 1; j <= 5; j++) {
        const option = document.createElement("a")
        option.classList.add("option")
        option.setAttribute('data-option', j);
        option.setAttribute('data-question', i);
        option.innerHTML = j;
        options.appendChild(option);
    }

    // Create hidden field
    const hiddenField = document.createElement("input")

    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", i);

    container.appendChild(hiddenField);

    // Create description container and add class name
    const description = document.createElement("div")
    description.classList.add("description")

    const descr1 = document.createElement("div")
    descr1.innerHTML = "Strongly Disagree"

    const descr2 = document.createElement("div")
    descr2.innerHTML = "Neither Agree/Disagree"

    const descr3 = document.createElement("div")
    descr3.innerHTML = "Strongly Agree"

    description.appendChild(descr1)
    description.appendChild(descr2)
    description.appendChild(descr3)

    slide.appendChild(description);

    //Create OK button
    const button = document.createElement("button")
    button.classList.add("btn-ok")
    button.setAttribute('data-question', i);
    button.innerHTML = "OK" + "<svg height=\"13\" width=\"16\"><path d=\"M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z\"></path></svg>"

    if (i + 1 < questions.length) {
        slide.appendChild(button);
    }


    //Create Submit button
    const submit = document.createElement("button")
    submit.classList.add("btn-submit")
    submit.setAttribute("id","js-submit");
    submit.innerHTML = "Submit"

    if (i + 1 === questions.length) {
        slide.appendChild(submit);
    }

}

let button = document.querySelectorAll(".btn-ok")
let submit = document.getElementById("js-submit")

function slideOnClick(positionText, scrollUp) {

    let slide = document.querySelectorAll(".slide")
    let position = parseInt(positionText)
    let direction = position + 1

    if (scrollUp === true) {
        direction =  position - 1
    }

    upOneQuestion.dataset.question = direction
    downOneQuestion.dataset.question = direction

    for (let x = 0; x < slide.length; x++) {

        const newspaperSpinning = [
            {top: x * 600 - (position) * 600 + "px"},
            {top: x * 600 - direction  * 600 + "px"},
        ];

        const newspaperTiming = {
            duration: 600,
            fill: "forwards"
        }

        slide[x].animate(newspaperSpinning, newspaperTiming)

    }
    if (scrollUp && position === 1){
        upOneQuestion.disabled = true
        return;
    }
    else  upOneQuestion.disabled = false

    if (!scrollUp && position === slide.length - 2){
        downOneQuestion.disabled = true
        return;
    }
    else {
        downOneQuestion.disabled = false
    }
}

const selectOption = document.querySelectorAll(".option")
let slide = parseInt(document.querySelectorAll(".slide").length)

for (let k = 0; k < selectOption.length; k++) {
    selectOption[k].addEventListener("click", function (e) {
        let clickedQuestion = parseInt(this.dataset.question)
        let currentQuestionElements = document.querySelectorAll("[data-question='" + clickedQuestion + "']")

        if (this.classList.contains('active')) {
            return
        }

        for (let o = 0; o < currentQuestionElements.length; o++) {
            if (currentQuestionElements[o].classList.contains('active')) {
                currentQuestionElements[o].classList.remove("active")
            }
        }

        this.classList.add("active")

        document.querySelector("input[name='" + clickedQuestion + "']").value = this.dataset.option

        if (clickedQuestion === slide - 1) {
            return
        }

        slideOnClick(clickedQuestion)

        this.dataset.option

    })
}




for (let p = 0; p < button.length; p++) {
    button[p].addEventListener("click", function (e) {
        let clickedQuestion = this.dataset.question
        if (clickedQuestion === slide - 1) {
            return
        }
        slideOnClick(clickedQuestion)

    })
}

upOneQuestion.addEventListener("click", function () {
    let clickedQuestion = parseInt(this.dataset.question)

    slideOnClick(clickedQuestion, true)

    this.dataset.question = clickedQuestion - 1
})

downOneQuestion.addEventListener("click", function () {
    let clickedQuestion = parseInt(this.dataset.question)

    slideOnClick(clickedQuestion, false)

    this.dataset.question = clickedQuestion + 1
})

submit.addEventListener("click", function () {
    this.classList.add("loading")
    this.innerHTML = '<?xml version=\"1.0\" encoding=\"utf-8\"?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"margin: 0 auto; background: none; display: block; shape-rendering: auto;\" width=\"52px\" height=\"52px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\"><g transform=\"rotate(0 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(30 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(60 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"></animate></rect>"</g><g transform=\"rotate(90 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(120 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(150 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(180 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"> <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(210 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(240 50 50)\"><rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(270 50 50)\"> <rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"></animate></rect>"</g><g transform=\"rotate(300 50 50)\"> <rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\"><animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"></animate></rect></g><g transform=\"rotate(330 50 50)\"> <rect x=\"47\" y=\"24\" rx=\"0\" ry=\"0\" width=\"6\" height=\"12\" fill=\"#ffffff\">  <animate attributeName=\"opacity\" values=\"1;0\" keyTimes=\"0;1\" dur=\"1s\" begin=\"0s\" repeatCount=\"indefinite\"></animate>\ </rect></g><!-- [ldio] generated by https://loading.io/ --></svg>'

    let totalPoints = 0

    for ( let y = 0; y < slide; y++) {
        let currentQuestionPoints = parseInt(document.querySelector("input[name='" + y + "']").value)
console.log(currentQuestionPoints)
        if (currentQuestionPoints) {
            totalPoints += currentQuestionPoints
        }
    }

    let message
    let messageSuffix = ""

    if (totalPoints < 16) {
        message = "We have work to do so you feel more confident about your future and to put you in better control. Please contact us using the information at the right."
    }
    else if (totalPoints >= 16 && totalPoints < 23) {
        message = "You are doing well. You have a good approach. A few adjustments can help make it even better. Please contact us using the information at the right for some suggestions."
    }

    else if (totalPoints >= 23) {
        message = "You are making the most of your life. Follow up with us using the information at the right."
        messageSuffix = "Congratulations!"
    }

    function randNumb(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    setTimeout(doSomething, randNumb(300,800));

    function doSomething() {

        const score = document.createElement("div")
        score.classList.add("score")
        score.innerHTML = "Your score is " + totalPoints + " " + messageSuffix

        const result = document.createElement("div")
        result.classList.add("result")
        result.innerHTML = message

        const image = document.createElement("img")
        image.src = "/young_logo.png"

        const homepageButton = document.createElement("a")
        homepageButton.innerHTML = "Back to home page"
        homepageButton.classList.add("home-button")
        homepageButton.href = "/"

        container.innerHTML = ""
        container.appendChild(image);
        container.appendChild(score);
        container.appendChild(result);
        container.appendChild(homepageButton);

        document.addEventListener("keypress" , function (e) {
            if ( e.key === "Enter" ) {
                location.href = "/";
            }
        })
    }
})