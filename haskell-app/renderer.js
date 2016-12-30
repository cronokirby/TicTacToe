// Backend and endpoint details
const host     = 'http://127.0.0.1:8080'
const endpoint = '/hello'

let fetchGreeting = function(url) {
  $.getJSON(url, function(greeting) {
      // Construct the greeting HTML output
      let output = `${greeting.greeting}`

    $('#greeting').html(output)
  })
}

fetchGreeting(host + endpoint)
