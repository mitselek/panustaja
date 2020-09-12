const entu = require('entulib')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})


var print_result = function print_result(data) {
    console.log(stringifier(data))
}

var stringifier = function stringifier(o) {
    var cache = [];
    return JSON.stringify(o, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, replace key
                return 'Circular reference to: ' + key
            }
            // Store value in our collection
            cache.push(value)
        }
        return value
    }, '\t')
}


let entuOptions = {
    entuUrl: 'https://saal.entu.ee',
    user: 4,
    key: process.env['ENTU_SAAL_KEY']
}

readline.question('Entity_id:', (e_id) => {
    entu.getEntity(e_id, entuOptions)
    .then(function(person) {
        print_result(person.get())
    })

})


