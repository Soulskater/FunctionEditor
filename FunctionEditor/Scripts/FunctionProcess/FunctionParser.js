var parser = (function () {
    var _processTerms = function (input) {

        var list = _matchTerms(input);
        var term = _createTerms(list);

        return term;
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
                return term.normalize();
            }
            else {
                term.terms.push(termlist[0])
                termlist.splice(0, 1);
            }

        } while (termlist.length > 0)

        return term.normalize();
    }

    return {
        matchTerms: _matchTerms,
        processTerms: _processTerms
    }
})();

function Term() {

    var self = this;

    this.terms = [];

    this.modifier = function (value) { return value; };

    this.normalize = function () {
        var i = 0;
        var safeCount = 0;
        do {
            var item = self.terms[i];
            var before = self.terms[i - 1];
            var after = self.terms[i + 1];
            //
            //Check variables
            if (item.name) {
                if (!isNaN(before))
                    self.terms.splice(i, 0, Operators.getOperator("*"));
                if (!isNaN(after))
                    self.terms.splice(i + 1, 0, Operators.getOperator("*"));
            }
            //
            //Check number prefix
            if (item.prefixOp && (before == undefined || Operators.getOperator(before))) {
                if (!isNaN(after)) {
                    self.terms.splice(i, 0, item.calculate(0, self.terms[i + 1]));
                    self.terms.splice(i + 1, 2);
                    i = 0;
                }
                else
                    if (after.constructor == Term) {
                        after.modifier = function (op) { return function (value) { return op.calculate(0, value); }; }(item);
                        self.terms.splice(i, 1);
                        i--;
                    }
            }
            i++
            safeCount++;
        } while (i < self.terms.length && safeCount < 1000)
        return self;
    };

    this.process = function (vars) {
        var result, index = 0;
        var safeCounter = 0;
        var list = []
        list.pushRange(self.terms);
        if (list.length == 1)
            if (list[0].constructor == Term)
                return self.modifier(list[0].process(vars));
            else
                if (list[0].name)
                    return self.modifier(vars.firstOrDefault(function (v) { return list[0].name == v.name; }).value);
                else
                    return self.modifier(list[0]);
        do {
            var op = Operators.getOperator(list[index]);
            var important = op && !list.where(function (tmp, i) { return i > index; }).any(function (term) { return term.precedence > op.precedence; });
            if (important) {
                var surr1 = list[index - 1];
                var surr2 = list[index + 1];
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
                result = op.calculate(surr1, surr2);
                //
                //Try to remove the operator and values
                list.splice(op.singleOp ? index : index - 1, op.singleOp ? 2 : 3);
                //
                //Insert back the calculated value to chain the values
                if (list.length > 0) list.splice(op.singleOp ? index : index - 1, 0, result);
                index = 0;
            }
            else
                index++;
            safeCounter++;
        }
        while (list.length > 0 && safeCounter < 1000);

        return self.modifier(result);
    }
}

function ComputedFunction() {
    var variables = [];

    var _compute = function () {

    }
}