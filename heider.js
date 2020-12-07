// temps entre chaque image (s)
var animationSampling = 0.04;
var iligne = 0;
var ligne0;
var t0 = Date.now() / 1000.0;
var stepFlag = false;
window.setInterval(function (evt) {
    let t = Date.now() / 1000.0;
    let event = new CustomEvent('toc', { detail: t });
    document.querySelectorAll('*').forEach(function (node) {
        node.dispatchEvent(event);
    });
}, animationSampling * 1000)



document.getElementById('playBtn').addEventListener("click", function (evt) {
    iligne = 0;
    ligne0=false;
    t0 = Date.now() / 1000.0;
    stepFlag = true
});

document.getElementById('pauseBtn').addEventListener("click", function (evt) {
    stepFlag = false
});

document.getElementById('program').value = '# Entrée triomphale au chateau\n#debut\n1,100,350,650,250,-30,650,600,-30,0," "\n# avancer face a la porte\n# anticipation\n0.5,90,350,650,250,-30,650,600,-30,0\n0.2,90,350,650,250,-30,650,600,-30,0\n# mouvement\n5,500,350,650,250,-30,650,600,-30,0,"[sifflote]"\n#tournent la tête\n1,500,350,650,250,-70,650,600,30,0\n#attente\n2,500,350,650,250,-70,650,600,30,0,"Bonjour messieurs! puis-je entrer ?"\n#porte ouverte\n1,500,350,650,250,-30,650,600,-30,-90,""\n#entrée\n5,800,500,650,250,-30,650,600,-30,-90,"Merci beaucoup!"\n#claquer la porte\n#overlap\n0.5,800,500,650,250,-30,650,600,-30,10,""\n#retour\n0.1,800,500,650,250,-30,650,600,-30,0,""';
document.getElementById('program').addEventListener("toc", function (evt) {
    let t = evt.detail;
    // enlever les lignes de commentaire
    prog = []
    progInit = this.value.split('\n');
    for(iligne_t=0;iligne_t<=progInit.length-1;iligne_t++){
        if(!(progInit[iligne_t].startsWith("#"))){
            prog.push(progInit[iligne_t]);
        }
    }
    let N = prog.length;
    //console.log(N,iligne);
    iligne = Math.min(iligne,N-1);
    
    let ligne = JSON.parse('['+prog[iligne]+']');
    if(!ligne0){
        ligne0 = JSON.parse('['+prog[0]+']');
    }
    //console.log(ligne);
    if(t>t0+ligne[0] && stepFlag){
        t0=t;
        ligne0=ligne;
        iligne++;
        // console.log(iligne);
    }
    let b=Math.min(1,(t-t0)/ligne[0]);

    document.getElementById('petitRond').setAttributeNS(null, 'transform',"translate("+((1-b)*ligne0[1]+b*ligne[1])+","+((1-b)*ligne0[2]+b*ligne[2])+") scale(20) ");
    document.getElementById('petitTriangle').setAttributeNS(null, 'transform',"translate("+((1-b)*ligne0[3]+b*ligne[3])+","+((1-b)*ligne0[4]+b*ligne[4])+") rotate("+((1-b)*ligne0[5]+b*ligne[5])+") scale(20) ");
    document.getElementById('grosTriangle').setAttributeNS(null, 'transform',"translate("+((1-b)*ligne0[6]+b*ligne[6])+","+((1-b)*ligne0[7]+b*ligne[7])+") rotate("+((1-b)*ligne0[8]+b*ligne[8])+") scale(60) ");
    document.getElementById('porte').setAttributeNS(null, 'transform',"translate(700,500) rotate("+((1-b)*ligne0[9]+b*ligne[9])+",0,0) scale(200) ");
    if(ligne[10]){
        document.getElementById('soustitre').innerHTML = ligne[10];
    }
});