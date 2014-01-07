var Operators = (function () {
    return [
        {
            precedence: 0,
            sign: "+",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) throw new Exception(a + " or " + b + " is not a number!");
                return parseFloat(a) + parseFloat(b);
            }
        },
        {
            precedence: 0,
            sign: "-",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) throw new Exception(a + " or " + b + " is not a number!");
                return parseFloat(a) - parseFloat(b);
            }
        },
        {
            precedence: 1,
            sign: "*",
            isOneVariableOp: false,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) throw new Exception(a + " or " + b + " is not a number!");
                return parseFloat(a) * parseFloat(b);
            }
        },
        {
            precedence: 1,
            sign: "/",
            isOneVariableOp: false,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) throw new Exception(a + " or " + b + " is not a number!");
                return parseFloat(a) / parseFloat(b);
            }
        }
    ];
})();

var Operand = function () {

    var self = this;

    this.leftSide
    this.rightSide

    this.operator

    this.calc = function () {
        if (!self.rightSide && !self.operator.isOneVariableOp)
            console.error("The operator is not a one variable operator, left-hand side expected!");
        return self.operator.action(self.leftSide, self.rightSide);
    }
};