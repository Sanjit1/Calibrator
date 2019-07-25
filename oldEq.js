// Excuse me? No I will not comment HTML. (Is that even legal?)
var enter = document.getElementById("enter"); // Html button to tell us to calculate
var R1Html = document.getElementById("R1"); // Inputs Resistance 1 Temperature 1 etc
var R2Html = document.getElementById("R2");
var R3Html = document.getElementById("R3");
var T1Html = document.getElementById("T1");
var T2Html = document.getElementById("T2");
var T3Html = document.getElementById("T3");
var C; // A,B,C values 
var B;
var A;
var Asn; // A,B,C in scientific notation I might do something with it later
var Bsn;
var Csn;
var test = document.getElementById("test"); // For Model Testing
var testInput = document.getElementById("testResist"); // Resistance input
var answerTemp = document.getElementById("calculateTemp"); // Modele tester Calculate button
var elt = document.getElementById('calculator'); // graph element Html
var calculator = Desmos.GraphingCalculator(elt,{expressions:false}); 
// Make the js graph object expressions:False hides the equation panel that desmos provides



enter.onclick = function(){
    var R1 = parseFloat(R1Html.value); // parse the values
    var R2 = parseFloat(R2Html.value);
    var R3 = parseFloat(R3Html.value);
    var T1 = parseFloat(T1Html.value) + 273.15; // convert to Kelvin
    var T2 = parseFloat(T2Html.value) + 273.15;
    var T3 = parseFloat(T3Html.value) + 273.15;
    if((R1!=R2)&&(R1!=R3)&&(R2!=R3)&&(T1!=T2)&&(T1!=T3)&&(T2!=T3)){ // You cannot have the  same T values with diff R values, that will just crash my page
        /* The relationship between the temperature and resistance of a thermistor is shown by the Steinhart equation
        1/T = A + BlnR + Cln^3R
        Where T is temperature in kelvins, R is resistance in Ω, and A,B,C are the Steinhart-hart coefficients. A,B,C vary from thermistor to thermistor.
        So that's why we have this app. To calibrate the values, use three corresponding resistance and temperature values, and make a matrix.
        The equation will be:
         _                _      _ _     _    _
        | 1, lnR1, ln^3 R1 |    | A |   | 1/T1 |
        | 1, lnR2, ln^3 R2 |  * | B | = | 1/T2 |
        |_1, lnR3, ln^3 R3_|    |_C_|   |_1/T3_|

        1 is the factor of the coefficient A (1 A) lnR1 id factor of B (B lnR1) and you probably get it.
        So we plug in R1,R2,R3,T1,T2,T3 and extract A,B,C. How? It just so happens that there is a library for that(There is a library for everything)
        Literally copied this from my Java comments
        */
        
        const M1 = [ //Now you know what this Matrix is
            [1,ln(R1),cb(ln(R1))],
            [1,ln(R2),cb(ln(R2))],
            [1,ln(R3),cb(ln(R3))]
        ];

        const M2 = [1/T1,1/T2,1/T3]; // In my java i made this m3, but this is fine too

        const M3 = math.lusolve(M1,M2); // solve the matrix

        A = M3[0];
        B = M3[1];
        C = M3[2];


        document.getElementById("C").innerHTML = "double C =" + C +';'; // Set the calculated values
        document.getElementById("B").innerHTML = "double B =" + B +';';
        document.getElementById("A").innerHTML = "double A =" + A +';';
        var Adsn = (A+'').replace("e-","/10^"); // Convert to Sci method
        var Bdsn = (B+'').replace("e-","/10^");
        var Cdsn = (C+'').replace("e-","/10^");

    var equation ='x=1/(A+(B*\\ln(y))+(C*\\ln(y)^3))-273.15'; // Make the text equation
    calculator.setExpressions([
        {id:'curve', latex:equation ,color: Desmos.Colors.GREEN}, 
        {id:'A', latex: 'A = '+ Adsn ,color: Desmos.Colors.BLUE}, // I do not want a hairy equation, thats why I seperated a,b,c
        {id:'B', latex: 'B = '+ Bdsn ,color: Desmos.Colors.BLUE},
        {id:'C', latex: 'C = '+ Cdsn ,color: Desmos.Colors.BLUE},
    ]);

    calculator.setMathBounds({ // Set domain and range
        left: -10,
        right: 100,
        bottom: 1,
        top: 50000
      });
    }

    
};


test.onclick = function (){ // Model tester
    resistance = parseFloat(testInput.value); // Input res
    temp = getTemp(resistance); // find coreesponding temp
    answerTemp.innerHTML = "Temp = " + getTemp(resistance); // display it
};

function getTemp(R){
    return 1/(+A + +(B*ln(R)) + +(C*cb(ln(R))))-273.15; // Steinhart equation
}

function cb(n){ // cb function, cuz why not
    return n*n*n;
}

function ln(n){ // ln function. The mathjs library had ln, but i copied a lot of code from java, so I just copied this
    return math.log(n,math.E); 
}