function runCalculator() {
    var form = document.getElementById('CalculatorForm');
    if (!form.reportValidity()) {
        return false;
    }


    var p1 = parseFloat(document.getElementById('calPred1Bar').value) || 0;
    var w1 = parseInt(document.getElementById('calPoint1').value) || 0;
    var p2 = parseFloat(document.getElementById('calPred2Bar').value) || 0;
    var w2 = parseInt(document.getElementById('calPoint2').value) || 0;
    var p3 = parseFloat(document.getElementById('calPred3Bar').value) || 0;
    var w3 = parseInt(document.getElementById('calPoint3').value) || 0;
    Template.instance().pred1.set(p1);
    Template.instance().pred2.set(p2);
    Template.instance().pred3.set(p3);
    Template.instance().point1.set(w1);
    Template.instance().point2.set(w2);
    Template.instance().point3.set(w3);

    var BScore = function(x, y) { return 1 - (y - x) * (y - x); };
    var avgPos = w1 * BScore(p1, 1) + w2 * BScore(p2, 1) + w3 * BScore(p3, 1);
    avgPos = avgPos / (w1 + w2 + w3);
    var avgNeg = w1 * BScore(p1, 0) + w2 * BScore(p2, 0) + w3 * BScore(p3, 0);
    avgNeg = avgNeg / (w1 + w2 +w3);
    var pay = [w1 * (BScore(p1, 1) - avgPos), w1 * (BScore(p1, 0) - avgNeg)];

    if (w2 == 0 && w3 == 0) {
        pay = [0, 0];
    }

    if (pay[0] < 0) {
        //instance.netpay1.set('<span color="blue"> lose ' + (-pay[0]).toFixed(2) + '</span>');
        document.getElementById('netGain1').innerHTML = '';
        document.getElementById('netLose1').innerHTML = 'lose ' + (-pay[0]).toFixed(2);
    } else {
        document.getElementById('netGain1').innerHTML = 'gain ' + pay[0].toFixed(2);
        document.getElementById('netLose1').innerHTML = '';
    }
    if (pay[1] < 0) {
        document.getElementById('netGain2').innerHTML = '';
        document.getElementById('netLose2').innerHTML = 'lose ' + (-pay[1]).toFixed(2);
    } else {
        document.getElementById('netGain2').innerHTML = 'gain ' + pay[1].toFixed(2);
        document.getElementById('netLose2').innerHTML = '';
    }


    Template.instance().pay1.set((pay[0] + parseInt(w1)).toFixed(2));
    Template.instance().pay2.set((pay[1] + parseInt(w1)).toFixed(2));
}


Template.CalculatorGadgetWSWM.events = {
    'input #CalculatorForm': function(event, instance) {
        runCalculator();
    },
};



Template.CalculatorGadgetWSWM.helpers({
    pred1: function() {
        return Template.instance().pred1.get().toFixed(2);
    },
    pred2: function() {
        return Template.instance().pred2.get().toFixed(2);
    },
    pred3: function() {
        return Template.instance().pred3.get().toFixed(2);
    },
    point1: function() {
        return Template.instance().point1.get();
    },
    point2: function() {
        return Template.instance().point2.get();
    },
    point3: function() {
        return Template.instance().point3.get();
    },
    pay1: function() {
        return Template.instance().pay1.get();
    },
    pay2: function() {
        return Template.instance().pay2.get()
    },
    netpay1: function() {
        return Template.instance().netpay1.get()
    },
    netpay2: function() {
        return Template.instance().netpay2.get()
    }
});


Template.CalculatorGadgetWSWM.created = function() {
    this.pred1 = new ReactiveVar(0);
    this.pred2 = new ReactiveVar(0);
    this.pred3 = new ReactiveVar(0);
    this.point1 = new ReactiveVar(0);
    this.point2 = new ReactiveVar(0);
    this.point3 = new ReactiveVar(0);
    this.pay1 = new ReactiveVar(0);
    this.pay2 = new ReactiveVar(0);
    this.netpay1 = new ReactiveVar(0);
    this.netpay2 = new ReactiveVar(0);
};

Template.CalculatorGadgetWSWM.rendered = function() {
    $('html,body').scrollTop(0);
    runCalculator();
};