// Backend and endpoint details
const host     = 'http://127.0.0.1:8080';
const endpoint = '/hello';

/*let fetchGreeting = function(url) {
  $.getJSON(url, function(greeting) {
      // Construct the greeting HTML output
      let output = `${greeting.greeting}`

    $('#greeting').html(output)
  })
}

fetchGreeting(host + endpoint)*/
function additionCallback(result){
    let output = `${result.body}`;
    console.log(output);
    $('#additionResult').html(output);
}
function fetchAddition() {
    let postData = { body: "3 + 1" };
    $.ajax({
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        url:      host + "/addition",
        type:     'POST',
        data:     JSON.stringify(postData),
        dataType: 'json',
        success: additionCallback
    });
}

document.getElementById("fetchAddition").onclick = fetchAddition;
