var parser = (function () {
    var _processTerms = function (input) {

        var list = _matchTerms(input);
        var variables = [{ name: 'x', value: 2 }];
        var term = _createTerms(list);

        console.log(term.process(variables));
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
                    if (val) {
                        list.push({
                            name: val[0]
                        });
                        text = text.substr(val.length);
                    }
                }
            }

        } while (text.length > 0)

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

    this.process = function (vars) {
        var result, index = 0;
        do {
            var op = Operators.getOperator(self.terms[index]);
            var important =  op && !self.terms.where(function (tmp, i) { return i > index; }).any(function (term) { return term.precedence > op.precedence; });
            if (important) {
                var surr1 = self.terms[index - 1];
                var surr2 = self.terms[index + 1];
                //
                //Nested Terms
                if (surr1 && surr1.constructor == Term) surr1 = surr1.process(vars);
                if (surr2 && surr2.constructor == Term) surr2 = surr2.process(vars);
                //
                //Variables
                if (surr1 && surr1.name)
                    surr1 = vars.firstOrDefault(function (v) { return surr1.name == v.name; }).value;
                if (surr2 && surr2.name)
                    surr2 = vars.firstOrDefault(function (v) { return surr2.name == v.name; }).value;
                var operationRes = op.calculate(surr1, surr2);
                result = operationRes.value;
                self.terms.splice(index > 0 ? index - 1 : 0, operationRes.count);
                if (self.terms.length > 0) self.terms.splice(index > 0 ? index - 1 : 0, 0, result);
                index = 0;
            }
            else
                index++;
        }
        while (self.terms.length > 0);
        return result;
    }
}

function ComputedFunction() {
    var variables = [];

    var _compute = function () {

    }
}