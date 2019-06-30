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
var test = document.getElementById("test");
var testInput = document.getElementById("testResist");
var answerTemp = document.getElementById("calculateTemp");
var ctx = document.getElementById('graph').getContext('2d');
var chart;



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

        CHtml.innerHTML = "C =" + C;
        BHtml.innerHTML = "B =" + B;
        AHtml.innerHTML = "A =" + A;
        
    }
    var dta = new Array(999);

    for(var i = 1; i<1000;i++){
       dta[i]={
           x:(i*50),
           y: getTemp(i*50)
        };
    }

    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        
    
    
        data: {
            datasets: [{
                label: 'Temperature Resistance Graph',
                borderColor: 'rgb(25, 255, 255)',
                data: dta
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: 50
                }
            },
            scales: {
                xAxes: [{
                  type: 'linear',
                  position: 'bottom',
                  ticks: {
                    min: -10,
                    max: 100,
                    stepSize: 10,
                    fixedStepSize: 10,
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 1,
                    max: 50000,
                    stepSize: 5000,
                    fixedStepSize: 5000,
                  }
                }]
              }
               
        }
    });
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