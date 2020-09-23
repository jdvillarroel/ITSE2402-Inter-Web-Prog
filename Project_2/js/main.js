/**
 * Author: Jesus Villarroel
 * ITSE 2402 - Fall 2020
 * 
 * Description:
 * JavaScript code used to extract the values of the input radios and checkboxes corresponding
 * to every question in the exam form. A function getAnswers() is used to extract the values from
 * the HTML document and compare them with the values stored in the two dimensional array
 * exam_answers[].
 */

let score = 0;                          //Reserved for the exam score

/**
 * Two dimensional array that holds the answers for the test. Question 6 has multiple right answer
 * so the total score for that question is divided by the number of right options (10/3 per right answer).
 */
let exam_answers = [
    ["question1", "c"],
    ["question2", "c"],
    ["question3", "b"],
    ["question4", "d"],
    ["question5", "a"],
    ["question6", "a", "c", "d"],
    ["question7", "b"],
    ["question8", "c"],
    ["question9", "a"],
    ["question10", "a"]
];


function getAnswers () {
    let valuePerQuestion = (100 / exam_answers.length);
    /**
     * This for loop is used to scan all questions in the two dimensional array
     * exam_answers[]. It has a nested for loop since we need it to scan inside
     * each element of the array. Example: question will be equal to from 0 - 10
     */
    for(var question = 0; question < exam_answers.length; question++) {
        
        /**
         * This for loop scans inside each element of the array
         */
        for(var option = 0; option < exam_answers[question].length; option++) {
            
            /**
             * Every form input element of the questions are identified with name="question#"
             * (#=1-10), so I get the element by name using the array containing the answers
             * and check what elements are marked as "checked" . If it is checked its value
             * is compared to the anwer in the two dimensional array. If the value is equal,
             * we add to the score the value of the question (100/number of questions) divided
             * by the number of correct options for that question.
             */
            document.getElementsByName(exam_answers[question][0]).forEach(selected => {
                
                //Check if the element is checked
                if(selected.checked) {
                    
                    //Compare the selected value with the correct answer in the array
                    if(selected.value == exam_answers[question][option]) {
                        score += valuePerQuestion / (exam_answers[question].length - 1);
                        //console.log(score);
                        //Stores the score to be accessed by the other HTML document
                        localStorage.setItem("examScore", score);
                        window.location.href = "index.html";
                    }
                }
            })
            //console.log(exam_answers[question][option]);
        }
    }
}

function displayResult () {
    //alert('Your score is: ' + score.toFixed(1));
    alert("Your exam has been graded.\nPlease, click \"OK\" to see your score.");
    //console.log(score.toFixed(1));
}

/**
 * This function clears the input selections for taking the exam again
 */
function clearExam () {
    //Clear the acumulated score from the variable
    score = 0;

    /**
     * Uses the same principle as the getAnswer function but in this case it sets
     * to false the input elements that are checked
     */
    for(var q = 0; q < exam_answers.length; q++) {
        document.getElementsByName(exam_answers[q][0]).forEach(sel => {
            if(sel.checked)
                sel.checked = false;
        })
    }
}

/**
 * This function get called when the submit button is pressed
 */
function submit_test () {
    getAnswers();    
    displayResult();
    clearExam();
}

/**
 * Show a pop-up window with a brief set of instructions for the test
 */
function instructions () {
    alert("The test consist of multiple choice and \"True-False\" questions.\n\
    1.- Some questions may have more than one posible selection.\n\
    2.- Answer as many questions as possible.\n\
    3.- There is no time limit for the exam.");
}

/**
 * For help, show message.
 */
function help () {
    alert("Refer to your Instructor if assistance is needed!");
}
