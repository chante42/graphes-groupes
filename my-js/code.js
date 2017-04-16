var Echelle 			= 0;
var Groupe 				= 0;
var SubMenuActifItem 	= 0;


// imageErrorMessage
//  Message d'erreur qui apparait quand il est impossible de charger une image
function imageErrorMessage(url) {
	$(this).parent().append("<h1>TOTOTOOTOTO "+url+" </h1>");
	console.log("onloadError : "+url);
}
//
//     affiche
// 
// fonction qui affiche les image et les contours et traite l'instentiation des variables
function affiche()
{
	
	var outputGraph1="";
	var outputGraph2="";
	var outputTitre = "";
	var urlTmp;
	for (var j in conf.groups[Groupe].graph) {
		var outputGraph="";
		var variable;
		var description="";
        var nomTitre= conf.groups[Groupe].graph[j].nom;
        var href=""

		// test si l'option clickURL existe
		if (typeof(conf.groups[Groupe].groupeClickURL) != 'undefined'  ){
			href = replaceVariable(conf.groups[Groupe].groupeClickURL, j);
		}
		if 	(typeof(conf.groups[Groupe].graph[j].clickURL) != 'undefined'  ){
			href = conf.groups[Groupe].graph[j].clickURL;
		}

		if ( typeof(conf.groups[Groupe].graph[j].nomDescription) != "undefined") {
			description = conf.groups[Groupe].graph[j].nomDescription;
		}

		if ( typeof(conf.groups[Groupe].graph[j].nomTitre) != "undefined") {
			nomTitre = conf.groups[Groupe].graph[j].nomTitre;
		}
		
		// Si URL pour le nom est definie est plus prioritaire que celle du groupe
		if (typeof(conf.groups[Groupe].graph[j].imageURL) != 'undefined' && conf.groups[Groupe].graph[j].imageURL!= "" ) {
			url = conf.groups[Groupe].graph[j].imageURL;
		}else {
			url = conf.groups[Groupe].groupeImageURL;
		}

		
		str1=replaceVariable(url, j);


		outputGraph += '<div class=" panel-primary" style="padding-top:4;" >';  
		outputGraph += '   <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
		outputGraph += '      <ul class="nav-tabs list-group list-unstyled"  style="border-bottom: 0px" 	>';
		outputGraph += '          <li class="text-center">'+nomTitre+'</li>';
		outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-paperclip"></span></a></li>';
		outputGraph += '      </ul></div>';
		outputGraph += '      <div class="panel-body" style="padding:0;">';
		
		
		outputGraph += '   ';

		//
		// test pour Savor si IMG (par défaut) ou IFRAME
		//
		if ( (typeof(conf.groups[Groupe].graph[j].Iframe) != 'undefined'  && conf.groups[Groupe].graph[j].Iframe == "true" ) ||
			  (typeof(conf.groups[Groupe].groupeIframe)  != "undefined" && conf.groups[Groupe].groupeIframe == "true")) {
			var taille="";

			// Adapte la taille de l'IFRAME
			if (typeof(conf.groups[Groupe].groupeIframeWidth) != 'undefined'  ) {
				taille += 'width="'+conf.groups[Groupe].groupeIframeWidth+'" ';
			}
			if (typeof(conf.groups[Groupe].groupeIframeHeight) != 'undefined'  ){
				taille += 'height="'+conf.groups[Groupe].groupeIframeHeight+'" ';
			}

		    outputGraph += '<iframe  '+taille+'id="iframeAAA'+j+'" src="'+str1+'">Les Iframe ne sont pas supportée</iframe>';
			
		}else {
			if (href !="") {
				outputGraph += '<a href="'+href+'" target="_blanck'+j+'">';
			}
			outputGraph += '<img  id="imgAAA'+j+'" src="'+str1+'" onerror="imageErrorMessage(\''+url+'\')" alt="Impossible d\'accéder ou vous n\'êtes pas identifié sur l\'url:'+str1+'">';
			if (href !="") {
				outputGraph += '</a>';
			}
		}
		outputGraph += '</div></div>';

		
		if (j%2 == 0) {
			outputGraph1 += outputGraph;
		}else {
			outputGraph2 += outputGraph;
		}
	} // FIN FOR 	"j in conf.groups[groupe].graph"

	$("#sortable1").html(outputGraph1);
	$("#sortable2").html(outputGraph2);

	// change la taille du graphe  si il n'y en a qu'un de définie
	if (typeof(conf.groups[Groupe].graph) == 'undefined' || conf.groups[Groupe].graph.length == 1 || typeof(conf.groups[Groupe].groupeSubMenuUrl) != 'undefined') {
		$("#sortable1").css({'width' :'98%'});
		$("#sortable2").hide();
	}
	else {
		$("#sortable1").css({'width' :'49%'});
		$("#sortable2").css({'width' :'49%'});
		$("#sortable2").show();

	}

	// Affiche le titre ud groupe
	//
	var groupeDescription ="";
	if ( typeof(conf.groups[Groupe].groupDescription) != "undefined") {
			description = conf.groups[Groupe].groupDescription;
		}

	outputTitre ='<h1 data-toggle="tooltip" data-placement="top" title="'+groupeDescription+'"class="text-center">';
	
	if ( typeof(conf.groups[Groupe].groupeTitre) != 'undefined' && conf.groups[Groupe].groupeTitre != "") {
		outputTitre +=conf.groups[Groupe].groupeTitre;
	}else {
		outputTitre +=conf.groups[Groupe].groupeNom;
	}
	outputTitre += "</h1>";
	$("#graphTitre").html(outputTitre);

	// Met a jour l'URL pour pouvoir l'appeler après
	window.history.pushState({state:1}, "State 1", "?graph="+conf.groups[Groupe].groupeNom+"&echelle="+Echelle); // logs {state:1}, "State 1", "?state=1"


}
function chg_groupe(val)
{
	console.log("chg_groupe ="+val);
	Groupe= val;
	resetSubMenu(val);

	affiche();
}

function chg_echelle(val)
{
	console.log("chg_echelle ="+val);
	Echelle = val;

	$('#btnEchelle0').removeClass("active");
	$('#btnEchelle1').removeClass("active");
	$('#btnEchelle2').removeClass("active");
	$('#btnEchelle3').removeClass("active");
	$('#btnEchelle4').removeClass("active");

	$('#btnEchelle'+val).addClass("active");

	
	affiche();
	if (document.getElementById("buildWithSubMenu"+SubMenuActifItem) != null) {
		if (typeof(document.getElementById("buildWithSubMenu"+SubMenuActifItem).value) != 'undefined') {
			buildWithSubMenuAffiche(document.getElementById("buildWithSubMenu"+SubMenuActifItem).value);
		}
	}
	
};


function configButton_onclick()
{
	$('#configFrame').html('<iframe src='+FichierConf+'  type="text/plain utf8"><iframe>');

	$('#configContenue').toggle();
}

function helpButton_onclick()
{
	$('#messageHelpFrame').html('<iframe src="README.MD"  type="text/plain utf8" ><iframe>');
	
	$('#messageHelpContenue').toggle();
}

//
// ReaceFonction
//
function replaceFonction(chaine){

	//
	var regex = /\w*\(\)/g;
	var fctName = String(chaine).match(regex);
	
	if (eval(fctName) != undefined ) {
		console.log("fct :"+fctName+"\n");
		if ( fctName == "now()") {
			var d = new Date();
			var seconds = d.getTime() / 1000;
			chaine = chaine.replace("now()", String(seconds));
			//chaine = eval(chaine);
			console.log("now() : "+ chaine);
		} // now()
		else if ( fctName == "jour()") {
			var d = new Date();
			var jour = d.getDate();
			chaine = chaine.replace("jour()", String("0"+ jour).slice(-2));
			console.log("jour() : "+ chaine);
		} // Mois()
		else if ( fctName == "mois()") {
			var d = new Date();
			var mois = d.getMonth()+1;
			chaine = chaine.replace("mois()", String( "0" + mois).slice(-2));
			console.log("mois() : "+ chaine);
		} // Mois()
		else if ( fctName == "moisStr()") {
			var moisFrancais= ["", "janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"];
			var d = new Date();
			var mois = d.getMonth()+1;
			var moisStr = moisFrancais[mois];
			chaine = chaine.replace("moisStr()", String(moisStr));
			console.log("moisStr() : "+ chaine);
		} // Mois()
		else if ( fctName == "annee()") {
			var d = new Date();
			var  annee= d.getFullYear();
			chaine = chaine.replace("annee()", String(annee));
			console.log("annee() : "+ chaine);
		} // Annee()

		
		var regex = /[-()\d/*+.]{1,}/g;
		var operation = String(chaine).match(regex);
		
		if (operation !=  undefined) {

			result = math.eval(operation);
			
			chaine = chaine.replace(operation, String(result));

		}
		
	}
	return(chaine);
}

//
//    Replace Variable
//
// chaine : chaine a remplacer
// j index de parchous de la structure de config j= no du groupe
function replaceVariable(chaine,j) {
//	console.log('Replacevariable IN=|'+chaine+'|');
	//
	// Remplacement des variables de URL par celle contenue dans le nom
	variable= chaine.match(/%%(.*?)%%/ig); // recherche des mot du type  %%var1%%
	for (var i in variable) {
		var varPropre=variable[i].replace(/%%/gi,'');
        //console.log('variable|'+ varPropre+'|\n');
		//
		// Remplacement de la variable echelle 
		//
		if (variable[i] == "%%echelle%%") {
			//console.log('debug('+varPropre+'):'+eval("conf.groups[groupe].graph[j]."+varPropre));
			if (j>= 0 && eval("conf.groups[Groupe].graph[j]."+varPropre) != undefined) {
				console.log('WARNING : la variable '+variable[i]+' est définie alors que c\'est une variable réservé');
			}
			else { 
				var echelleTmp = Echelle;
				// test si une gestion particuliere de echelle
				//
				//nsole.log("groupeEchelleParam");
				if (eval("conf.groups[Groupe].groupeEchelleParam") != undefined) {
					echelleTmp = conf.groups[Groupe].groupeEchelleParam[Echelle].echelle;
				}
				if (j>= 0 &&  eval("conf.groups[Groupe].graph[j].echelleParam") != undefined) {
					echelleTmp = conf.groups[Groupe].graph[j].echelleParam[Echelle].echelle;
				}

				
				var str1 = chaine.replace("%%echelle%%",echelleTmp);
				chaine = str1;
			}

		}else {
			if (j>= 0) {
				var varEval = eval("conf.groups[Groupe].graph[j]."+varPropre)

				varEval = replaceFonction(varEval);
				if (varEval == undefined){
					//console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].graph[j].nom+'".');
				}
				else {
					var str = chaine.replace(variable[i], varEval);
					chaine = str;
				}
			}

			//
			// traitement des variables dans EchelleParam ou groupeEchelleParam
			var echelleTmp;
			if (eval("conf.groups[Groupe].groupeEchelleParam") != undefined) {
			 	echelleTmp = conf.groups[Groupe].groupeEchelleParam[Echelle];
			}
			 if (j >= 0 && eval("conf.groups[Groupe].graph[j].echelleParam") != undefined) {
			 	echelleTmp = conf.groups[Groupe].graph[j].echelleParam[Echelle];
			}

			//console.log("***** echelleTmp AV replace fct : "+echelleTmp+"chaine :"+chaine);
			//echelleTmp = replaceFonction(echelleTmp);
			//console.log("***** echelleTmp AP replace fct : "+echelleTmp+"chaine :"+chaine);

			//console.log("echelleTmp:"+JSON.stringify(echelleTmp, null, 4));
			var varEvalEchelle;
			if (eval("echelleTmp") != undefined) { 	
				
			 	varEvalEchelle = eval("echelleTmp."+varPropre);
			 	varEvalEchelle = replaceFonction(varEvalEchelle);
			}
			 
			if (varEvalEchelle == undefined){
			 	//console.log('ERROR : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].groupeNom+'".echelleParam .');
			}
			else {
				var str = chaine.replace(variable[i], varEvalEchelle);
			 	chaine = str;
			}

			//
			// traitement de la variable contenu groupeSubMenuVariable
			//
			var varStr = "conf.groups[Groupe].groupeSubMenuVariable";

			if ( eval(varStr) == undefined || eval(varStr+"."+varPropre) == undefined){
				//console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].groupeNom+'.groupeSubMenuVariable".');
			}
			else {
				varStr = eval(varStr+"."+varPropre);
				varStr =  replaceFonction(varStr);
				var str = chaine.replace(variable[i], varStr);
				chaine = str;
			}
			//
			// traitement de la variable contenu groupeVariable
			//
			var varStr = "conf.groups[Groupe].groupeVariable";

			if ( eval(varStr) == undefined || eval(varStr+"."+varPropre) == undefined){
				console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].groupeNom+'.groupeVariable".');
			}
			else {
				varStr = eval(varStr+"."+varPropre);
				varStr =  replaceFonction(varStr);
				console.log('-=- varStr = '+varStr+'-=-');

				var str = chaine.replace(variable[i], varStr);
				console.log('-=- '+varStr+'='+JSON.stringify(varStr, null, 4)+'-=-');
				chaine = str;
			}
		}
	} // FIN FOR "var i in variable"
	
//	console.log('Replacevariable OUT=|'+chaine+'|');
	return(chaine);
}

function onmouseovergroupename(i) {

	var htmlTooltip = '<div class="panel-info"> <div class="panel-heading text-center">'+conf.groups[i].groupeNom+'</div><div class="underline">'+conf.groups[i].groupeTitre+':</div><div class="panel-body">'+conf.groups[i].groupeDescription+'</div></div></div>'
//	console.log(conf.groups[i].groupeNom);
//	console.log(htmlTooltip);

	$("#mytooltip").html(htmlTooltip);
	$("#mytooltip").css({opacity:1, display:"none"}).fadeIn(400);
}

//
// affiche la bulle d aide au dessus du nom du groupe
//
function onmousemovegroupename(kmouse) {
    
	
    
	var my_tooltip = $("#mytooltip");    
    var border_top = $(window).scrollTop(); 
	var border_right = $(window).width();
	var left_pos;
	var top_pos;
	var offset = 20;
	if(border_right - (offset *2) >= my_tooltip.width() + kmouse.pageX){
		left_pos = kmouse.pageX+offset;
		} else{
		left_pos = border_right-my_tooltip.width()-offset;
		}
		
	if(border_top + (offset *2)>= kmouse.pageY - my_tooltip.height()){
		top_pos = border_top +offset;
		} else{
		top_pos = kmouse.pageY-my_tooltip.height()-offset;
		}	
			
				
	my_tooltip.css({left:left_pos, top:top_pos});
}

function onmouseoutgroupename() {
	$("#mytooltip").css({left:"-9999px"});	

}

//
// buildWithSubMenu() 
//
function buildWithSubMenu(noGroupe) {
    var str="";

	str += ' <li class="nav-divider"></li>';	
	str += '<li class="buildWithSubMenu"> <div style="padding:0px; padding-left:5px;"';
	str += ' onmouseover="onmouseovergroupename('+noGroupe+')"   onmousemove="onmousemovegroupename(event)" ';
	str += ' onmouseout="onmouseoutgroupename()">'+conf.groups[noGroupe].groupeNom + '</div>';
	str += '<div style="padding:0px; padding-left:5px;">';
	str += '<select class="selectpicker" id="buildWithSubMenu'+noGroupe+'" data-live-search="true" onchange="buildWithSubMenuEvent('+noGroupe+')" >';


	console.log('->'+conf.groups[noGroupe].groupeNom+':url :'+conf.groups[noGroupe].groupeSubMenuUrl)
	$.get( conf.groups[noGroupe].groupeSubMenuUrl, 
		function(data){
			    var perLine=data.split('\n');
			    var myVars=[];

			    $('#buildWithSubMenu'+noGroupe).append(new Option('','',false,false));

			    for(i=0;i<perLine.length;i++) {
				    var line=perLine[i].split(' ');
				    
				    $('#buildWithSubMenu'+noGroupe).append(new Option(line[0],line[0],false,false));
				    //console.log(line[0]);
				}   // fin FOR
				
			 
			
		}
	);
	
	str += '</select></div>';
	str += '</li> ';	
	str += ' <li class="nav-divider"></li>';	

	return (str);
}


function buildWithSubMenuEvent(val){
	//console.log("Sub MENU EVENT [" +conf.NoSubMenu+"]" );
  	console.log("chg_groupe ="+val);
	Groupe= val;


	resetSubMenu(val);	
	// recuperation du nom de la variable
	var variable = "host";
	
	// stock le item sous menu Actif pour le changement de date
	SubMenuActifItem = val;

	var x = document.getElementById("buildWithSubMenu"+val).value;
	// modificaton du contenue de la variable contenue dans grouoeSubMenuVariable
	conf.groups[Groupe].groupeSubMenuVariable.host=x;
	//var pt = eval("conf.groups[Groupe].grouoeSubMenuVariable."+variable);
	//pt = x;
	//console.log("submenu SetVariable |"+eval(pt)+"| val=|"+pt+"|\n");
    buildWithSubMenuAffiche(x);
}

function resetSubMenu(val) {
	// force les autre groupe a rien avoir de selectionne
	for(i =0; i < conf.NoSubMenu.length; i++) {
		if (conf.NoSubMenu[i] != val) {
			  console.log("Sub MENU EVENT boucle [" +conf.NoSubMenu[i]+"]" );
			 //$("#buildWithSubMenu"+conf.NoSubMenu[i]).value="";
			 // -=- 
			 $('#buildWithSubMenu'+conf.NoSubMenu[i]).prop('selectedIndex',0);
		}

	}

}
//
//     buildWithSubMenuAffiche
// 
// fonction qui affiche les image et les contours et traite l'instentiation des variables
function buildWithSubMenuAffiche(name)
{
	
	var outputGraph1="";
	
	var outputTitre = "";
	var urlTmp;
	
	var outputGraph="";
	var variable;
	var description="";
    var nomTitre= name;
    var href=""

	
	url = conf.groups[Groupe].groupeImageURL;
	console.log(url);
	
	str1=replaceVariable(url, -1);
	console.log(str1);

	outputGraph += '<div class=" panel-primary" style="padding-top:4;" >';  
	outputGraph += '   <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
	outputGraph += '      <ul class="nav-tabs list-group list-unstyled"  style="border-bottom: 0px" 	>';
	outputGraph += '          <li class="text-center">'+nomTitre+'</li>';
	outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-paperclip"></span></a></li>';
	outputGraph += '      </ul></div>';
	outputGraph += '      <div class="panel-body" style="padding:0;">';
	outputGraph += '   ';

	//
	// test pour Savor si IMG (par défaut) ou IFRAME
	//
	if (typeof(conf.groups[Groupe].groupeIframe)  != "undefined" && conf.groups[Groupe].groupeIframe == "true") {
		var taille="";

		// Adapte la taille de l'IFRAME
		if (typeof(conf.groups[Groupe].groupeIframeWidth) != 'undefined'  ) {
			taille += 'width="'+conf.groups[Groupe].groupeIframeWidth+'" ';
		}
		if (typeof(conf.groups[Groupe].groupeIframeHeight) != 'undefined'  ){
			taille += 'height="'+conf.groups[Groupe].groupeIframeHeight+'" ';
		}

	    outputGraph += '<iframe  '+taille+'id="iframeAAA'+name+'" src="'+str1+'">Les Iframe ne sont pas supportée</iframe>';
		
	}else {
		if (href !="") {
			outputGraph += '<a href="'+href+'" target="_blanck'+name+'">';
		}
		outputGraph += '<img  id="imgAAA'+name+'" src="'+str1+'" onerror="imageErrorMessage(\''+str1+'\')" alt="Impossible d\'accéder ou vous n\'êtes pas identifié sur l\'url:'+str1+'">';
		if (href !="") {
			outputGraph += '</a>';
		}
	}
	outputGraph += '</div></div>';

	
	
	$("#sortable1").html(outputGraph);
	$("#sortable2").html("");
	

	// Affiche le titre ud groupe
	//
	var groupeDescription ="";
	if ( typeof(conf.groups[Groupe].groupDescription) != "undefined") {
			description = conf.groups[Groupe].groupDescription;
		}

	outputTitre ='<h1 data-toggle="tooltip" data-placement="top" title="'+groupeDescription+'"class="text-center">';
	
	if ( typeof(conf.groups[Groupe].groupeTitre) != 'undefined' && conf.groups[Groupe].groupeTitre != "") {
		outputTitre +=conf.groups[Groupe].groupeTitre;
	}else {
		outputTitre +=conf.groups[Groupe].groupeNom;
	}
	outputTitre += "</h1>";
	$("#graphTitre").html(outputTitre);

}

//
//  getRequest()
//
//http://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript
//
//var QueryString = getRequests();
//if url === "index.html?test1=t1&test2=t2&test3=t3"
//console.log(QueryString["test1"]); //logs t1
//console.log(QueryString["test2"]); //logs t2
//console.log(QueryString["test3"]); //logs t3
function getRequests() {
    var s1 = location.search.substring(1, location.search.length).split('&'),
        r = {}, s2, i;
    for (i = 0; i < s1.length; i += 1) {
        s2 = s1[i].split('=');
        r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
    }
    return r;
};


// -=- OCH impossible de faire fonctionner history.js !!!!!!! WHY
(function(window,undefined){

	//console.log("history init OCH");
	// Prepare
	var History = window.History; // Note: We are using a capital H instead of a lower h
	if ( !History.enabled ) {
		 // History.js is disabled for this browser.
		 // This is because we can optionally choose to support HTML4 browsers or not.
		 console.log("history dont WORK OCH");
		return false;
	}

	// Bind to StateChange Event
	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		History.log(State.data, State.title, State.url);
	});

	History.getState() ;
	// Change our States
	//History.pushState({state:1}, "State 1", "?state=1"); // logs {state:1}, "State 1", "?state=1"
	//History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
	//History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
	//History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
	//History.back(); // logs {state:3}, "State 3", "?state=3"
	//History.back(); // logs {state:1}, "State 1", "?state=1"
	//History.back(); // logs {}, "Home Page", "?"
	//History.go(2); // logs {state:3}, "State 3", "?state=3"

})(window);


// Parse l'URL pour connaitr le graphe a afficher au 1er chargement de la page
function initaliseGroupeUrl() {
	// -=- OCH 
	var QueryString = getRequests();
	console.log("************* getURL parameter = "+QueryString["graph"]); //logs t1	

	if (typeof(QueryString["echelle"]) != "undefined") {
		chg_echelle(parseInt(QueryString["echelle"]));
		
	}
	for (var j in conf.groups) {
		var nomTitre= conf.groups[j].groupeNom;
        
        if (nomTitre == QueryString["graph"]) {
        	Groupe= j
        }

	} // fin for j	
}

// -->