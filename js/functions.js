// General functions
function playAudio() {
    var audio = new Audio('../audio/Pre_test_Tone.mp3');
    audio.play();
}

function toPage(page) {
    window.location = page;
}

function disableButton() {
    var checkbox = document.getElementById('consent');
    var button = document.getElementById('button');

    if (checkbox.checked == true) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function randomizeSounds() {
    pre_test_stim_random = [];
    var i = 0;

    var random = Math.floor(Math.random() * pre_test_stim.length);
    pre_test_stim_random.push(pre_test_stim[random]);
    pre_test_stim.splice(random, 1);

    while (pre_test_stim.length > 0) {
        random = Math.floor(Math.random() * pre_test_stim.length);
        var str = pre_test_stim[random].target;
        var pos = str.indexOf('_');
        var str_current = str.slice(0, pos);

        str = pre_test_stim_random[i].target;
        pos = str.indexOf('_');
        var str_previous = str.slice(0, pos);

        if (str_current == str_previous) {
        } else {
            pre_test_stim_random.push(pre_test_stim[random]);
            pre_test_stim.splice(random, 1);
            i++;
        }
    }
    splitSounds(pre_test_stim_random);
}

function splitSounds(array) {
    pre_test_stim_temp = [];

    stimuliInTrial = 50;
    numberOfTrials = array.length / stimuliInTrial;

    for (var i = 0; i < numberOfTrials; i++) {
        pre_test_stim_temp[i] = array.splice(0, stimuliInTrial);
    }
}

function checkForm() {
    var inputs = document.getElementsByTagName('input');
    var select = document.getElementsByTagName('select');

    if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != '') {
        var userdata = '{"code":"' + inputs[0].value + '", "age":"' + inputs[1].value + '", "gender":"' + select[0].value + '", "province_geb":"' + select[1].value + '", "studies":"' + inputs[2].value + '", "province_opg":"' + select[2].value + '", "studies_inst":"' + select[3].value + '", "hearing":"' + select[4].value + '"';
        var accesscode = inputs[0].value;

        localStorage.setItem('userdata', userdata);
        localStorage.setItem('accesscode', accesscode);
        
        toPage('/GilVerbeke/pages/audio_test.html');
    } else {
        alert('Gelieve alle velden in te vullen.');
    }
}

function checkAudioTest() {
    var inputs = document.getElementsByTagName('input');

    if (inputs[0].value != '') {
        var userdata = localStorage.getItem('userdata');
        userdata += ', "headset":"' + inputs[0].value + '"}';
        localStorage.setItem('userdata', userdata);
        //sendData(userdata, 'userdata');

        toPage('test.html');
    } else {
        alert('Gelieve alle velden in te vullen.');
    }
}

function sendData(data, endpoint) {
    //data = '{"code":"TEST", "age":"13", "gender":"Vrouw", "province":"Limburg", "studies":"MCT", "headset":"Razor"}';
    var url = 'https://gilverbekepretest.azurewebsites.net/api/';
    url += endpoint;

    fetch(url, {
        method: 'post',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => console.log('Succes:', JSON.stringify(response)))
        .catch(error => console.error('Error', error));
}