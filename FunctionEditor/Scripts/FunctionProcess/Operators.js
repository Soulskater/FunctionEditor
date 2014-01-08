var Operators = (function () {
    return [
        {
            precedence: 0,
            sign: "+",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                return parseFloat(a) + parseFloat(b);
            }
        },
        {
            precedence: 0,
            sign: "-",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a)) console.error(a + " is not a number!");
                if (!b || b == "")
                    return parseFloat(a) * (-1);
                return parseFloat(a) - parseFloat(b);
            }
        },
        {
            precedence: 1,
            sign: "*",
            isOneVariableOp: false,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                return parseFloat(a) * parseFloat(b);
            }
        },
        {
            precedence: 1,
            sign: "/",
            isOneVariableOp: false,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                return parseFloat(a) / parseFloat(b);
            }
        },
        {
            precedence: 1,
            sign: "^",
            isOneVariableOp: false,
            action: function (a, b) {
                if (isNaN(a) || isNaN(b)) console.error(a + " or " + b + " is not a number!");
                return Math.pow(parseFloat(a), parseFloat(b));
            }
        },
        {
            precedence: 1,
            sign: "sin",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a)) console.error(a + " is not a number!");
                return Math.sin((Math.PI / 180) * a);
            }
        },
        {
            precedence: 1,
            sign: "cos",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a)) console.error(a + " is not a number!");
                return Math.cos((Math.PI / 180) * a);
            }
        },
        {
            precedence: 1,
            sign: "tan",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a)) console.error(a + " is not a number!");
                return Math.tan((Math.PI / 180) * a);
            }
        },
        {
            precedence: 1,
            sign: "ctg",
            isOneVariableOp: true,
            action: function (a, b) {
                if (isNaN(a)) console.error(a + " is not a number!");
                return 1/(Math.tan((Math.PI / 180) * a));
            }
        }
    ];
})();

var Operand = function () {

    var self = this;
    //
    //This could be a value
    this.leftSide

    //
    //This could be a value
    this.rightSide

    //
    //This could be null if this is a single operand
    this.operator

    this.calc = function () {
        if (!self.operator)
            return self.leftSide;

        if (!self.rightSide && !self.operator.isOneVariableOp)
            console.error("The operator is not a one variable operator, left-hand side expected!");
        if (typeof self.leftSide == "object")
            self.leftSide = self.leftSide.calc();

        if (typeof self.rightSide == "object")
            self.rightSide = self.rightSide.calc();

        return self.operator.action(self.leftSide, self.rightSide);
    }
};