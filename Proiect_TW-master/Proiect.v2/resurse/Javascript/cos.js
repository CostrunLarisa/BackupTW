
cerere();
    function cerere(){
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJ(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	ajaxRequest.open("GET", "/json/produs.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJ(obJson) { 
			//in acets div voi afisa template-urile   
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de studenti din obJson
			for(let i=0;i<obJson.produs.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				textTemplate+=(ejs.render("<div class='templ_student'>\
				<p><%= produs.tag %></p>\
				<p class='pretProd'> <%= produs.pret %></p>\
				<p class='numeProd'><%= produs.nume %> </p>\
				<p><%= produs.selectat %> </p>\
				<p class='stocProd'><%= produs.stoc %> </p>\
				<p><%= produs.about %> </p>\
				<p class='dataProd'> <%= produs.dataInreg %> </p>\
				</div>",                    
				{produs: obJson.produs[i]}));
			} 
			//adaug textul cu afisarea studentilor in container
			container.innerHTML=textTemplate;
	}

}
function login(){
    var x=document.getElementById("login");
    var y=document.getElementById("register");
    var z=document.getElementById("btn");
    x.style.left="50px";
    y.style.left="450px";
    z.style.left="0";
}
function signup(){
    var x=document.getElementById("login");
    var y=document.getElementById("register");
    var z=document.getElementById("btn");
    x.style.left="-400px";
    y.style.left="50px";
    z.style.left="110px";
    y.style.top="-230px"; 
    y.style.height="77%";
}

function initiate(){
     var obj=document.getElementsByClassName("templ_student");
    for(var k=0;k<obj.length;k++)obj[k].onclick=function(e){
            var ok=0;
            if(obj[k]!=null)
            {for(var val of obj[k].classList)
            {
                if(val=="sterge")ok=1;
            }
            if(ok==0 && obj[k])obj[k].className+=" sterge";
        if (e.ctrlKey){ //true dc ctrl era apasat
          this.remove();}}
    
    }}

function sorteazaNume(){
    var vector=document.querySelectorAll(".numeProd");
    var aux=[];
    var nou=document.createElement("div");
    nou.className="gridNou";
    for(var i=0;i<vector.length;i++)
        { aux[i]=vector[i].innerHTML;
        }
    for(var i=0;i<vector.length -1;i++)
        {
            for(var j=i+1;j<vector.length;j++)
                if(aux[j]<aux[i])
                    {  var c=aux[i];
                        aux[i]=aux[j];
                        aux[j]=c;
                    }
            
        }
     var ordon=document.querySelectorAll(".templ_student");
    for(var j=0;j<aux.length;j++)
        for(var ob of ordon)
        {
            
                if(ob.children[2].innerHTML==aux[j])nou.appendChild(ob);
        } 
    var inlocuieste=document.getElementById("afisTemplate");
    inlocuieste.innerHTML="";
    inlocuieste.appendChild(nou);
    initiate();
}
function sorteazaPret(){
     var vector=document.querySelectorAll(".pretProd");
    var aux=[];
    var nou=document.createElement("div");
        nou.className="gridNou";

    for(var i=0;i<vector.length;i++)
        { aux[i]=vector[i].innerHTML;
        }
    for(var i=0;i<vector.length -1;i++)
        {
            for(var j=i+1;j<vector.length;j++)
                if(aux[j]<aux[i])
                    {  var c=aux[i];
                        aux[i]=aux[j];
                        aux[j]=c;
                    }
            
        }
     var ordon=document.querySelectorAll(".templ_student");
    for(var j=0;j<aux.length;j++)
    {for(var ob of ordon)
        {
            
                if(ob.children[1].innerHTML==aux[j])nou.appendChild(ob);
        } }
    var inlocuieste=document.getElementById("afisTemplate");
    inlocuieste.innerHTML="";
    inlocuieste.appendChild(nou);
    
}

function inStoc(){
    var ordon=document.querySelectorAll(".templ_student");
    var nou=document.createElement("div");
        nou.className="gridNou";

    for(var ob of ordon)
        {
            
                if(ob.children[4].innerHTML==1)nou.appendChild(ob);
        } 
    var inlocuieste=document.getElementById("afisTemplate");
    inlocuieste.innerHTML="";
    inlocuieste.appendChild(nou);
}
function valoareProd(){
     var rasp_prompt=prompt("Produsele cu valoarea totala..");
    var suma=parseInt(0);
    var nou=document.createElement("div");
     var ordon=document.querySelectorAll(".templ_student");
    for(var ob of ordon)
        {
            if(suma+parseInt(ob.children[1].innerHTML)==rasp_prompt)
            {nou.appendChild(ob);
             suma+=parseInt(ob.children[1].innerHTML);
             break;}
            if(suma+parseInt(ob.children[1].innerHTML)<rasp_prompt)
            {nou.appendChild(ob);
            suma+=parseInt(ob.children[1].innerHTML);}
        } 
    var inlocuieste=document.getElementById("afisTemplate");
    inlocuieste.innerHTML="";
    inlocuieste.appendChild(nou);
}


    
 window.onkeypress =function(e){
        
        var gr=e.key.toUpperCase();
        var nou="";
        var obj=document.getElementsByClassName("sterge");
        for(let it=0;it<obj.length;it++)
            {
                 obj[k].classList.remove(" sterge");
                 obj[k].classList.add(gr);
                 nou.innerHTML+=obj[k];
            }
        if(nou!="")
            {
                var arata=document.getElementById("afisTemplate");
                arata.innerHTML="";
                arata.innerHTML=nou;
            }
    }
