var parser = (function () {
   var _processTerms = function (input) {

        var list = _matchTerms(input);

        console.log(_createTerms(list));
    }

    //Try to match the text with numbers and operators
    //input is the text representation of function
    var _matchTerms = function (input) {
        var list = [];
        var text = input;
        //
        //Create flatten array of numbers and operators
        do {
            //Number parsing
            var number = "";
            while (text.length > 0 && (!isNaN(text[0]) || text[0] == '.')) {
                number += text[0];
                text = text.substr(1);
            }
            if (number != "" && !isNaN(number)) list.push(parseFloat(number));

            //Operator parsing
            var op = Operators.getOperator(text);
            if (op) {
                list.push(op);
                text = text.substr(op.sign.length);
            }
            else {
                //Spec operator parsing
                var spec = SpecOperators.getOperator(text);
                if (spec) {
                    list.push(spec);
                    text = text.substr(spec.sign.length);
                }
                else {
                    //Variable parsing
                    var val = text.match(/\b[a-z]/);
                    if (val)
                        list.push({
                            name: val[0]
                        })
                    text = text.substr(val.length);
                }
            }

        } while (text.length > 0)

        console.log(list);
        return list;
    }

    var _createTerms = function (termlist) {
        var term = new Term();
        do {
            if (termlist[0] == SpecOperators.oBracket) {
                termlist.splice(0, 1);
                term.terms.push(_createTerms(termlist));
            }
            else if (termlist[0] == SpecOperators.cBracket) {
                termlist.splice(0, 1);
                return term;
            }
            else {
                term.terms.push(termlist[0])
                termlist.splice(0, 1);
            }

        } while (termlist.length > 0)

        return term;
    }

    return {
        matchTerms: _matchTerms,
        processTerms: _processTerms
    }
})();

function Term() {

    var self = this;

    this.terms = [];

    this.process = function () {
        return self.createOperands();
    }

    this.createOperands = function () {
        //
        //Only a constant value
        if (list.length == 1 && !isNaN(list[0])) return list[0];
        var result, index = 0;
        do {
            var op = Operators.getOperator(self.terms[index]);
            if (op) {
                op.calculate(self.terms[index - 1], self.terms[index + 1]);
            }
            index++;
        }
        while (self.terms.length > 0);
        console.log(result);
        return result;
    }
}

function ComputedFunction() {
    var variables = [];

    var _compute = function () {

    }
}