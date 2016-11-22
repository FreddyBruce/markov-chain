var names;
var order = 3;
var ngrams = {};
var beginnings = [];

function preload() {
    names = loadStrings('names.txt');
    console.log(names);
}

function setup() {
    noCanvas()

    for (var j = 0; j < names.length; j++) {
      var txt = names[j];

        for (var i = 0; i <= txt.length - order; i++) {
            var gram = txt.substring(i, i + order);

            if (i == 0) {
              beginnings.push(gram);
            }

            if (!ngrams[gram]) {
                ngrams[gram] = [];
            }
            ngrams[gram].push(txt.charAt(i + order));
        }
        button = createButton("generate");
        button.mousePressed(markovIt);
        console.log(ngrams);
    }
}

function markovIt() {
    var currentGram = random(beginnings);
    var result = currentGram;

    for (var i = 0; i < 10; i++) {
        var possibilities = ngrams[currentGram];
        var next = random(possibilities);
        result += next;
        var len = result.length;
        currentGram = result.substring(len - order, len);
    }
    createP(result);

}
