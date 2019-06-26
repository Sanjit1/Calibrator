var button = document.getElementById("enter");
var R1Html = document.getElementById("R1");
var R2Html = document.getElementById("R2");
var R3Html = document.getElementById("R3");
var T1Html = document.getElementById("T1");
var T2Html = document.getElementById("T2");
var T3Html = document.getElementById("T3");
var AHtml = document.getElementById("A");
var BHtml = document.getElementById("B");
var CHtml = document.getElementById("C");



button.onclick = function(){
    var R1 = parseFloat(R1Html.value);
    var R2 = parseFloat(R2Html.value);
    var R3 = parseFloat(R3Html.value);
    var T1 = parseFloat(T1Html.value) + 273.15;
    var T2 = parseFloat(T2Html.value) + 273.15;
    var T3 = parseFloat(T3Html.value) + 273.15;
    if((R1!=R2)&&(R1!=R3)&&(R2!=R3)&&(T1!=T2)&&(T1!=T3)&&(T2!=T3)){

        C =((1/T1-1/T2)-(Math.log(R1)- Math.log(R2))*(1/T1-1/T3)/(Math.log(R1)-Math.log(R3)))/((Math.pow(Math.log(R1),3)-Math.pow(Math.log(R2),3)) - (Math.log(R1)-Math.log(R2))*(Math.pow(Math.log(R1),3)-Math.pow(Math.log(R3),3))/(Math.log(R1)-Math.log(R3)));
        B =((1/T1-1/T2)-C*(Math.pow(Math.log(R1),3)-Math.pow(Math.log(R2),3)))/(Math.log(R1)-Math.log(R2));
        A = 1/T1-C*(Math.log(R1))*(Math.log(R1))*(Math.log(R1))-B*Math.log(R1);

        
        const M1 = math.matrix([
            [1,ln(R1),cb(ln(R1))],
            [1,ln(R2),cb(ln(R2))],
            [1,ln(R3),cb(ln(R3))]
        ])

        const M2 = math.matrix([[1/T1],[1/T2],[1/T3]])

        //const M3 = math.lusolve(math.lup(M1),M2)


        CHtml.innerHTML = typeof (M1);
        BHtml.innerHTML = typeof (M2);
        AHtml.innerHTML = A;

    }

    function cb(n){
        return n*n*n;
    }

    function ln(n){
        math.log(n,math.E);
    }
};




