

prediction_1="";
prediction_2="";

Webcam.set({
    height:300,
    width:350,
    image_format:"png",
 png_quality:95
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    }) ;
}

console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QXVfYAJmX/model.json",modelLoaded);

function modelLoaded() {
    console.log('MODEL LOADED!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1="the First Prediction is" +prediction_1;
    speak_data_2="the Second Prediction is" +prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check() {
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if(error){
        console.error(error);
    }

    else {
        console.log (result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        document.getElementById("result_emotion_name2").innerHTML=result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;

        speak();
        if(result[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }

        if(result[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }

        if(result[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if(result[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if(result[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }

        if(result[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }

        

    }
}