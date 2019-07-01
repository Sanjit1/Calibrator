var enter = document.getElementById("enter");
var R1Html = document.getElementById("R1");
var R2Html = document.getElementById("R2");
var R3Html = document.getElementById("R3");
var T1Html = document.getElementById("T1");
var T2Html = document.getElementById("T2");
var T3Html = document.getElementById("T3");
var AHtml = document.getElementById("A");
var BHtml = document.getElementById("B");
var CHtml = document.getElementById("C");
var C;
var B;
var A;
var Asn;
var Bsn;
var Csn;
var test = document.getElementById("test");
var testInput = document.getElementById("testResist");
var answerTemp = document.getElementById("calculateTemp");
var elt =document.getElementById('calculator');
var calculator = Desmos.GraphingCalculator(elt,{expressions:true});



enter.onclick = function(){
    var R1 = parseFloat(R1Html.value);
    var R2 = parseFloat(R2Html.value);
    var R3 = parseFloat(R3Html.value);
    var T1 = parseFloat(T1Html.value) + 273.15;
    var T2 = parseFloat(T2Html.value) + 273.15;
    var T3 = parseFloat(T3Html.value) + 273.15;
    if((R1!=R2)&&(R1!=R3)&&(R2!=R3)&&(T1!=T2)&&(T1!=T3)&&(T2!=T3)){

        
        const M1 = [
            [1,ln(R1),cb(ln(R1))],
            [1,ln(R2),cb(ln(R2))],
            [1,ln(R3),cb(ln(R3))]
        ];

        const M2 = [1/T1,1/T2,1/T3];

        const M3 = math.lusolve(M1,M2);

        A = M3[0];
        B = M3[1];
        C = M3[2];
        Asn = (A+'').replace("e","10^");
        Bsn = (B+'').replace("e","10^");
        Csn = (C+'').replace("e","10^");

        CHtml.innerHTML = "C =" + Csn;
        BHtml.innerHTML = "B =" + Bsn;
        AHtml.innerHTML = "A =" + Asn;

        var Adsn = (A+'').replace("e-","/10^");
        var Bdsn = (B+'').replace("e-","/10^");
        var Cdsn = (C+'').replace("e-","/10^");

    
    var equation ='x=1/(A+(B*\ln(y))+(C*\ln(y)^3))-273.15';
    calculator.setExpressions([
        {id:'curve', latex:equation ,color: Desmos.Colors.GREEN},
        {id:'A', latex: 'A = '+ Adsn ,color: Desmos.Colors.BLUE},
        {id:'B', latex: 'B = '+ Bdsn ,color: Desmos.Colors.BLUE},
        {id:'C', latex: 'C = '+ Cdsn ,color: Desmos.Colors.BLUE},
    ]);

    calculator.setMathBounds({
        left: -10,
        right: 100,
        bottom: 1,
        top: 50000
      });
    }

    
};


test.onclick = function (){
    resistance = parseFloat(testInput.value);
    temp = getTemp(resistance);
    answerTemp.innerHTML = "Temp = " + getTemp(resistance);
};

function getTemp(R){
    return 1/(+A + +(B*ln(R)) + +(C*cb(ln(R))))-273.15;
}

function cb(n){
    return n*n*n;
}

function ln(n){
    return math.log(n,math.E); 
}