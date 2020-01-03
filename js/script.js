// Regular expressions to validate email and number.
regExpEmail = /\w+@\w+\.+[a-z]/;
regExpNum = /^([0-9])*$/;

// Variables to use in data.
var name, email;

// Preguntas.
var arrayQuiz = [
    {   
        id: 1,
        question: "How much is 3 + 5:",
        answer: 8
    },{
        id: 2,
        question: "How much is 10 / 2:",
        answer: 5
    },{
        id: 3,
        question: "How much is 150 * 5:",
        answer: 750
    },{
        id: 4,
        question: "How much is 10 / 5:",
        answer: 2
    },{
        id: 5,
        question: "How much is 25 * 5:",
        answer: 125
    }
];

$(document).ready(function() {
    $("#btnValidate").click(function(e){
        //Prevent submit automatic.
        e.preventDefault();

        //function call validateForm.
        var formOk = validateForm();

        //if return 'true', redirect the url.
        if(formOk) {
            //change effects.
            $("#form").fadeOut();
            setTimeout(function(){
                $("#game").fadeIn()
            }, 400);
            //Loading data.
            loadData();
            //Assigning function to a new button to validate responses.
            $("#btnValidateResp").click(function(e){
                //Prevent submit automatic.
                e.preventDefault();
                //Call to function to count answers.
                countResp();
            })
        }
    });
});

//Function to validate using Jquery.
function validateForm() {
    name = $("#nameInput").val();
    email = $("#emailInput").val();
    var validate = true;

    // Validations.
    if(name.length < 4 || name.length > 12) {
        $("#nameError").fadeIn();
        validate = false;
    }else {
        $("#nameError").fadeOut();
        if(email == "" || !regExpEmail.test(email)) {
            $("#emailError").fadeIn();
            validate = false;
        }
    }

    //When everything is correct, return 'true'.
    return validate;
}

// Function to load player data.
function loadData() {
    // Player data.
    $("#nameJg").html(name);
    $("#dataJg").html(email);

    // Loading Questions.
    $.each(arrayQuiz ,function(index, element) {
        $(document.createElement('h5')).attr('class','card-title mt-2').html((index+1) + ' - ' +element.question).appendTo("#questions");
        $(document.createElement('input')).attr({'type':'number', 'class':'answers'}).appendTo("#questions");
    });

    // Evaluate button.
    $(document.createElement('button')).attr({'class':'btn btn-primary mt-5', 'type':"submit", 'id':"btnValidateResp"}).html("Evaluate!").appendTo("#questions");
}

// Function that counts the number of responses entered, if they are less than 5 or are not numbers triggers an alert.
function countResp() {
    var  answers = $(".answers").get();
    var count = 5;

    $.each(answers, function(index, ans){
        if(ans.value == "" || !regExpNum.test(ans.value)){
            count --;
        }
    });

    if(count == 5){
        compareAnswers();
    }else {
        alert("Enter all the answers, and only numbers.");
    }
}


// Function that compares the answers entered with the correct answers.
function compareAnswers() {
    var answers = $(".answers").get();
    var ansValid = 0;

    $.each(answers, function(index, ans){
        if(ans.value == arrayQuiz[index].answer){
            ansValid ++;
        }
    });

    if(ansValid > 2){ 
        $(location).attr('href','win.html');
    }else {
        $(location).attr('href','lose.html');
    }
}