// temps entre chaque image (s)
var animationSampling = 0.01;
var scale = 100;
var g = 9.81;
var K = 100;
var A = 2;
var z0 = 0.02;
var z = 0.02;
var zp = 0;
var zpp = 0;
var display=false;
var mass=0.1;
document.getElementById("massInput").value=mass;
document.getElementById("raidInput").value=K;
// loop executed every "animationSamping"
window.setInterval(function (evt) {
    // get the now time
    let t = Date.now() / 1000.0;
    // modify the mass
    if(!isNaN(parseFloat(document.getElementById("massInput").value))){
        if(parseFloat(document.getElementById("massInput").value)>0.01){
            mass = (parseFloat(document.getElementById("massInput").value));
        }
    }
    // modify the raideur
    if(!isNaN(parseFloat(document.getElementById("raidInput").value))){
        if(parseFloat(document.getElementById("raidInput").value)>0.01){
            K = (parseFloat(document.getElementById("raidInput").value));
        }
    }
    A=K*0.02
    // compute acceleration
    zpp = g-(K*(z-z0)+A*zp)/mass;
    
    // compute speed
    zp = zp + zpp*animationSampling
    
    // compute position
    z = z + zp*animationSampling
    
    // position of the mass
    document.getElementById('mass').setAttributeNS(null, 'cy',(z*100).toFixed(3)+"cm")
    // position of the bottom of the mass
    document.getElementById('spring').setAttributeNS(null, 'y2',(z*100).toFixed(3)+"cm")
    // radius of the mass
    document.getElementById('mass').setAttributeNS(null, 'r',mass*100)
    if(display){
        console.log("mass:",mass);
        console.log("zpp:",zpp);
        console.log("zp:",zp);
        console.log("z:",z);
    }
}, animationSampling * 1000)

