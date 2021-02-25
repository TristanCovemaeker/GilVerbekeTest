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

function randomizeSoundsTrial1(array) {
    var filler = [];
    var non_word = [];
    var unamb = [];
    var amb = [];

    for (var i = 0; i < array.length; i++) {
        if (array[i].condition == 'filler'){
            filler.push(array[i]);
        } else if (array[i].condition == 'non-word') {
            non_word.push(array[i]);
        } else if (array[i].condition == 'unamb_crit_word_ie' || array[i].condition == 'unamb_crit_word_i') {
            unamb.push(array[i]);
        } else if (array[i].condition == 'amb_crit_word_i' || array[i].condition == 'amb_crit_word_ie') {
            amb.push(array[i]);
        }
    }

    ldt_stim_random = [];
    for (var i = 0; i < 40; i++) {
        if (non_word.length > 0) {
            var rand = randomInArray(non_word);
            ldt_stim_random.push(non_word[rand]);
            non_word.splice(rand, 1);
        }else {
            var rand = randomInArray(filler);
            ldt_stim_random.push(filler[rand]);
            filler.splice(rand, 1);
        }

        var rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            if (filler.length > 0) {
                var rand = randomInArray(filler);
                ldt_stim_random.push(filler[rand]);
                filler.splice(rand, 1);
            }else {
                var rand = randomInArray(non_word);
                ldt_stim_random.push(non_word[rand]);
                non_word.splice(rand, 1);
            }  
        }else {
            if (non_word.length > 0) {
                var rand = randomInArray(non_word);
                ldt_stim_random.push(non_word[rand]);
                non_word.splice(rand, 1);
            }else {
                var rand = randomInArray(filler);
                ldt_stim_random.push(filler[rand]);
                filler.splice(rand, 1);
            } 
        }

        if (filler.length > 0) {
            var rand = randomInArray(filler);
            ldt_stim_random.push(filler[rand]);
            filler.splice(rand, 1);
        }else {
            var rand = randomInArray(non_word);
            ldt_stim_random.push(non_word[rand]);
            non_word.splice(rand, 1);
        }

        if (non_word.length > 0) {
            var rand = randomInArray(non_word);
            ldt_stim_random.push(non_word[rand]);
            non_word.splice(rand, 1);
        }else {
            var rand = randomInArray(filler);
            ldt_stim_random.push(filler[rand]);
            filler.splice(rand, 1);
        }

        var rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
            if (unamb.length > 0) {
                var rand = randomInArray(unamb);
                ldt_stim_random.push(unamb[rand]);
                unamb.splice(rand, 1);
            }else {
                var rand = randomInArray(amb);
                ldt_stim_random.push(amb[rand]);
                amb.splice(rand, 1);
            }  
        }else {
            if (amb.length > 0) {
                var rand = randomInArray(amb);
                ldt_stim_random.push(amb[rand]);
                amb.splice(rand, 1);
            }else {
                var rand = randomInArray(unamb);
                ldt_stim_random.push(unamb[rand]);
                unamb.splice(rand, 1);
            } 
        }
    }
    console.log(ldt_stim_random);
    console.log(non_word);
    console.log(filler);
}

function randomizeSoundsTrial2(array) {
    vis = [];
    bid = [];
    wit = [];
    kist = [];
    lig = [];

    pct_stim_random = [];
    var len = array.length;
    while (array.length > 0) {
        rand = randomInArray(array)
        var str = array[rand].target;
        var pos = str.indexOf('_');
        var str_current = str.slice(0, pos);

        if (str_current == 'vis') {
            vis.push(array[rand]);
            array.splice(rand, 1);
        }else if (str_current == 'bid') {
            bid.push(array[rand]);
            array.splice(rand, 1);
        }else if (str_current == 'wit') {
            wit.push(array[rand]);
            array.splice(rand, 1);
        }else if (str_current == 'kist') {
            kist.push(array[rand]);
            array.splice(rand, 1);
        }else if (str_current == 'lig') {
            lig.push(array[rand]);
            array.splice(rand, 1);
        }
    }
    for (var i = 0; i < 4; i++) {
        pct_stim_random.push(vis[i]);
        pct_stim_random.push(lig[i]);
        pct_stim_random.push(wit[i]);
        pct_stim_random.push(vis[i]);
        pct_stim_random.push(kist[i]);
    }
}

function randomInArray(array) {
    return random = Math.floor(Math.random() * array.length);
}

function splitSounds(array) {
    var test_stim_temp = [];

    stimuliInTrial = 40;
    numberOfTrials = array.length / stimuliInTrial;

    for (var i = 0; i < numberOfTrials; i++) {
        test_stim_temp[i] = array.splice(0, stimuliInTrial);
    }
    return test_stim_temp;
}

function checkForm() {
    var inputs = document.getElementsByTagName('input');
    var select = document.getElementsByTagName('select');

    if (inputs[0].value != '' && inputs[1].value != '' && inputs[2].value != '') {
        var userdata = '{"code":"' + inputs[0].value + '", "age":"' + inputs[1].value + '", "gender":"' + select[0].value + '", "province_geb":"' + select[1].value + '", "studies":"' + inputs[2].value + '", "province_opg":"' + select[2].value + '", "studies_inst":"' + select[3].value + '", "hearing":"' + select[4].value + '"';
        var accesscode = inputs[0].value;

        localStorage.setItem('userdata', userdata);
        localStorage.setItem('accesscode', accesscode);
        
        toPage('audio_test.html');
    } else {
        alert('Gelieve alle velden in te vullen.');
    }
}

function checkAudioTest() {
    var inputs = document.getElementsByTagName('input');

    if (inputs[0].value != '') {
        var userdata = localStorage.getItem('userdata');
        userdata += ', "headset":"' + inputs[0].value + '"';
        localStorage.setItem('userdata', userdata);

        toPage('test.html');
    } else {
        alert('Gelieve alle velden in te vullen.');
    }
}

function sendData(data, endpoint) {
    //data = '{"code":"TEST", "age":"13", "gender":"Vrouw", "province":"Limburg", "studies":"MCT", "headset":"Razor"}';
    var url = 'https://gilverbeketest.azurewebsites.net/api/';
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

function getData(endpoint) {
    var url = 'https://gilverbeketest.azurewebsites.net/api/';
    url += endpoint;

    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(myJson);
        localStorage.setItem('taak1', myJson.taak1);
        localStorage.setItem('taak2', myJson.taak2);
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
}