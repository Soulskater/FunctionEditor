var parser = (function () {
    var _parseTerms = function (input) {
        var result = Term();

        var termstart = input.indexOf("(");
        var subpart = input.substr(termstart + 1);
        for (var i = 0; i < subpart.length; i++) {
            var char = subpart[i];
            if (char == "(") {
                var subterm = _parseTerms(subpart.substr(i));
                i += subterm.skip;
                char = subpart[i];
                result.subterms.push(subterm.result);
            }
            if (char == ")") {
                result.termText = subpart.substr(0, i);
                result.parsedText = result.termText;
                result.subterms.foreach(function (item, index) {
                    result.parsedText = result.parsedText.replace("(" + item.termText + ")", "t" + index);
                });
                return {
                    skip: subpart.substr(0, i).length + 2,
                    result: result
                }
            }
        }
    }

    var _parseText = function (input) {
        if (input[0] != "(")
            input = "(" + input + ")";
        console.log(_parseTerms(input, 0).result);
    };

    return {
        parseText: _parseText
    }
})();

function Term() {

    var self = this;

    this.termText = "";
    this.parsedText = "";
    this.subterms = [];

    this.process = function () {
        self.subterms.foreach(function (item, index) {
            var res = item.process();
            self.parsedText = self.parsedText.replace("t" + index, res);
        });
        var value="";
        var operand = null;
        for (var i = 0; i < self.parsedText.length; i++)
        {
            var char = self.parsedText[i];
            var op = Operators.firstOrDefault(function(item){ return item.sign == char; });
        }
    }
}