var nocButton = document.getElementById("nocButt");
var nocInput = document.getElementById("noc");
var tempResCoeffGrid = document.getElementById("TempResCoeffGrid");
var nocval;
var defTempResBeg = "<div class=\"grid-item item1\"><h4 class=\"special\">Resistance (Ω)</h4></div><div class=\"grid-item item2\"><h4 class=\"special\">Temperature (°C)</h4></div><div class=\"grid-item item3\"><h4 class=\"special\">Coefficients</h4></div>";
var calcButton = document.getElementById("enter");
var resValList = [];
var temValList = [];
var coeValList = [];
var M1 = [];
var M2 = [];
var M3 = [];
var rRefInput = document.getElementById("rref");
var rRef;



nocButton.onclick = function(){
    nocval = parseInt(nocInput.value);
    tempResCoeffGrid.innerHTML = defTempResBeg;
    for(i = 0; i<nocval; i++){
        tempResCoeffGrid.innerHTML = tempResCoeffGrid.innerHTML + "<div class=\"grid-item item1\">R<sub>"+(i+1)+"</sub>: <input id=\"R"+i+"\" type=\"number\" name=\"R"+i+"\ max =\"100000\" min =\"0.00000001\"></div>";
        tempResCoeffGrid.innerHTML = tempResCoeffGrid.innerHTML + "<div class=\"grid-item item2\">T<sub>"+(i+1)+"</sub>: <input id=\"T"+i+"\" type=\"number\" name=\"T"+i+"\ max =\"200\" min =\"-100\"></div>";
        tempResCoeffGrid.innerHTML = tempResCoeffGrid.innerHTML + "<div class=\"grid-item item3\"><h4 style=\"margin:0px;\" id=\"C"+i+"\">C<sub>"+(i+1)+"</sub> = ;</h4></div>";
    }
    tempResCoeffGrid.innerHTML = tempResCoeffGrid.innerHTML + "<div class=\"grid-item item4\" id=\"calculator\" style=\"width: 640px; height: 360px; grid-row: 1 / span "+(nocval+1)+";\"></div>";

};

calcButton.onclick = function(){
    rRef = parseFloat(rRefInput.value);
    for(j = 0; j<nocval; j++){
        resValList[j] = parseFloat(document.getElementById("R"+j).value);
        temValList[j] = parseFloat(document.getElementById("T"+j).value);
    } 
    for(k = 0; k < nocval; k++){
        var constuctor = [];
        for(l = 0; l<nocval;l++){
            constuctor.push(Math.pow(ln(resValList[k]/rRef),l));
        }
        M1.push(constuctor);
        M2.push(1/(temValList[k]+273.15));
    }
    const M3 = math.lusolve(M1,M2);
    for(m = 0; m<nocval; m++){
        document.getElementById("C"+m).innerHTML = "C<sub>"+(m+1)+"</sub> = "+M3[m]+" ;";
    }

};






function ln(n){
    return math.log(n,math.E); 
}