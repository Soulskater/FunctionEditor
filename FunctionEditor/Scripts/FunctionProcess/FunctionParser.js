var parser = (function () {
    var _parseTerms = function (input) {
        var result = new Term();

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
        input = "(" + input + ")";
        var term = _parseTerms(input, 0).result;
        console.log(term);
        return term.process();
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
        return self.createOperands();
    }

    this.createOperands = function () {
        var list = self.parseOperators();
        //
        //Only a constant value
        if (list.length == 1 && !isNaN(list[0])) return list[0];

        var operand;
        do {
            var op = Operators.any(function (op) { return op == list[0]; }) ? list[0] : list[1];
            var surr1 = isNaN(list[0]) ? list[1] : list[0];
            var surr2 = isNaN(list[2]) ? null : list[2];
            if (!operand) {
                operand = op.action(surr1, surr2);
            }
            else {
                operand = op.action(operand, surr1);
            }
            list.remove(op);
            list.remove(surr1);
            if (surr2) list.remove(surr2);
        }
        while (list.length > 0);
        //console.log(operand);
        return operand;
    }

    this.parseNumberStarts = function (text) {
        var number = "";
        while (text.length > 0 && !isNaN(text[0])) {
            number += text[0];
            text = text.substr(1);
        }
        return number;
    }

    this.parseOperators = function () {
        var list = [];
        var text = self.parsedText;
        //
        //Create flatten array of numbers and operators
        do {
            var number = self.parseNumberStarts(text);
            if (number != "") {
                list.push(parseFloat(number));
                text = text.substr(number.length);
            }
            if (text[0] == "t") {
                var index = parseFloat(self.parseNumberStarts(text.substr(1)));
                number = self.subterms[index].process();
                text = text.substr(("t" + index).length);
                list.push(parseFloat(number));
            }

            var op = Operators.firstOrDefault(function (item) { return item.sign == text.substr(0, item.sign.length); });
            if (op) {
                list.push(op);
                text = text.substr(op.sign.length);
            }

        } while (text.length > 0)

        var op = Operators.firstOrDefault(function (item) { return item == list[0]; });
        if (op && op.isOneVariableOp) {
            var numb = list[1];
            list.remove(op);
            list.remove(numb);
            list.splice(0, 0, op.action(numb));
        }

        //console.log(list);
        return list;
    }
}