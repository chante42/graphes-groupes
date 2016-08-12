var Echelle = 0;
var Groupe = 0;


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
		if (typeof(conf.groups[Groupe].GroupeClickURL) != 'undefined'  ){
			href = replaceVariable(conf.groups[Groupe].GroupeClickURL, j);
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
		
		// Si URL pour le nom est definie est plus prioritaire que celle du Groupe
		if (typeof(conf.groups[Groupe].graph[j].imageURL) != 'undefined' && conf.groups[Groupe].graph[j].imageURL!= "" ) {
			url = conf.groups[Groupe].graph[j].imageURL;
		}else {
			url = conf.groups[Groupe].GroupeImageURL;
		}

		
		str1=replaceVariable(url, j);


		outputGraph += '<div class=" panel-primary" style="padding-top:4;" >';  
		outputGraph += '   <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
		outputGraph += '      <ul class="nav-tabs list-group list-unstyled"  style="border-bottom: 0px" 	>';
		outputGraph += '          <li class="text-center">'+nomTitre+'</li>';
		outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-cog"></span></a></li>';
		outputGraph += '      </ul></div>';
		outputGraph += '      <div class="panel-body" style="padding:0;">';
		
		
		outputGraph += '   ';

		//
		// test pour Savor si IMG (par défaut) ou IFRAME
		//
		if ( (typeof(conf.groups[Groupe].graph[j].Iframe) != 'undefined'  && conf.groups[Groupe].graph[j].Iframe == "true" ) ||
			  (typeof(conf.groups[Groupe].GroupeIframe)  != "undefined" && conf.groups[Groupe].GroupeIframe == "true")) {
			var taille="";

			// Adapte la taille de l'IFRAME
			if (typeof(conf.groups[Groupe].GroupeIframeWidth) != 'undefined'  ) {
				taille += 'width="'+conf.groups[Groupe].GroupeIframeWidth+'" ';
			}
			if (typeof(conf.groups[Groupe].GroupeIframeHeight) != 'undefined'  ){
				taille += 'height="'+conf.groups[Groupe].GroupeIframeHeight+'" ';
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
	} // FIN FOR 	"j in conf.groups[Groupe].graph"

	$("#sortable1").html(outputGraph1);
	$("#sortable2").html(outputGraph2);

	// Affiche le titre ud Groupe
	//
	var GroupeDescription ="";
	if ( typeof(conf.groups[Groupe].groupDescription) != "undefined") {
			description = conf.groups[Groupe].groupDescription;
		}

	outputTitre ='<h1 data-toggle="tooltip" data-placement="top" title="'+GroupeDescription+'"class="text-center">';
	
	if ( typeof(conf.groups[Groupe].GroupeTitre) != 'undefined' && conf.groups[Groupe].GroupeTitre != "") {
		outputTitre +=conf.groups[Groupe].GroupeTitre;
	}else {
		outputTitre +=conf.groups[Groupe].GroupeNom;
	}
	outputTitre += "</h1>";
	$("#graphTitre").html(outputTitre);

}
function chg_Groupe(val)
{
	console.log("chg_Groupe ="+val);
	Groupe = val;
	affiche();
}

function chg_Echelle(val)
{
	console.log("chg_Echelle ="+val);
	Echelle = val;
	affiche();
};


function configButton_onclick()
{
	$('#configFrame').html('<iframe src="my-js/conf.js"  type="text/plain utf8"><iframe>');

	$('#configContenue').toggle();
}

function helpButton_onclick()
{
	$('#messageHelpFrame').html('<iframe src="README.MD"  type="text/plain utf8" ><iframe>');
	
	$('#messageHelpContenue').toggle();
}

//
//    Replace Variable
//
// chaine : chaine a remplacer
// j index de parchous de la structure de config j= no du Groupe
function replaceVariable(chaine,j) {
//	console.log('Replacevariable IN=|'+chaine+'|');
	//
	// Remplacement des variables de URL par celle contenue dans le nom
	if (chaine == "") { return}
		
	variable= chaine.match(/%%(.*?)%%/ig); // recherche des mot du type  %%var1%%
	for (var i in variable) {
		var varPropre=variable[i].replace(/%%/gi,'');
        //console.log('variable|'+ varPropre+'|\n');
		//
		// Remplacement de la variable Echelle 
		//
		if (variable[i] == "%%Echelle%%") {
			//console.log('debug('+varPropre+'):'+eval("conf.groups[Groupe].graph[j]."+varPropre));
			if (j>= 0 && eval("conf.groups[Groupe].graph[j]."+varPropre) != undefined) {
				console.log('WARNING : la variable '+variable[i]+' est définie alors que c\'est une variable réservé');
			}
			else { 
				var EchelleTmp = Echelle;
				// test si une gestion particuliere de Echelle
				//
				//nsole.log("GroupeEchelleParam");
				if (eval("conf.groups[Groupe].GroupeEchelleParam") != undefined) {
					EchelleTmp = conf.groups[Groupe].GroupeEchelleParam[Echelle].Echelle;
				}
				if (j>= 0 &&  eval("conf.groups[Groupe].graph[j].EchelleParam") != undefined) {
					EchelleTmp = conf.groups[Groupe].graph[j].EchelleParam[Echelle].Echelle;
				}

				// test si une fonction dans la chaine EchelleTmp
				//
				var regex = /\w*\(\)/g;
				var fctName = String(EchelleTmp).match(regex);
				
				if (eval(fctName) != undefined ) {
					console.log("fct :"+fctName+"\n");
					if ( fctName == "now()") {
						var d = new Date();
						var seconds = d.getTime() / 1000;
						EchelleTmp = EchelleTmp.replace("now()", String(seconds));
						EchelleTmp = eval(EchelleTmp);
						console.log("now() : "+ EchelleTmp);
					}
					
				}
				var str1 = chaine.replace("%%Echelle%%",EchelleTmp);
				chaine = str1;
			}

		}else {
			if (j>= 0) {
				var varEval = eval("conf.groups[Groupe].graph[j]."+varPropre)

				if (varEval == undefined){
					console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].graph[j].nom+'".');
				}
				else {
					var str = chaine.replace(variable[i], varEval);
					chaine = str;
				}
			}

			//
			// traitement des variables dans EchelleParam ou GroupeEchelleParam
			var EchelleTmp;
			if (eval("conf.groups[Groupe].GroupeEchelleParam") != undefined) {
			 	EchelleTmp = conf.groups[Groupe].GroupeEchelleParam[Echelle];
			}
			 if (j >= 0 && eval("conf.groups[Groupe].graph[j].EchelleParam") != undefined) {
			 	EchelleTmp = conf.groups[Groupe].graph[j].EchelleParam[Echelle];
			}

			//console.log("EchelleTmp:"+JSON.stringify(EchelleTmp, null, 4));
			var varEvalEchelle;
			if (eval("EchelleTmp") != undefined) { 	
				
			 	varEvalEchelle = eval("EchelleTmp."+varPropre);
			}
			 
			if (varEvalEchelle == undefined){
			 	console.log('ERROR : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].GroupeNom+'".EchelleParam .');
			}
			else {
				var str = chaine.replace(variable[i], varEvalEchelle);
			 	chaine = str;
			}

			//
			// traitement de la variable contenu grouoeSubMenuVariable
			var varStr = "conf.groups[Groupe].grouoeSubMenuVariable";

			if ( eval(varStr) == undefined || eval(varStr+"."+varPropre) == undefined){
				console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].GroupeNom+'.grouoeSubMenuVariable".');
			}
			else {
				var str = chaine.replace(variable[i], eval(varStr+"."+varPropre));
				chaine = str;
			}
		}
	} // FIN FOR "var i in variable"
	
//	console.log('Replacevariable OUT=|'+chaine+'|');
	return(chaine);
}

function onmouseoverGroupename(i) {

	var htmlTooltip = '<div class="panel-info"> <div class="panel-heading text-center">'+conf.groups[i].GroupeNom+'</div><div class="underline">'+conf.groups[i].GroupeTitre+':</div><div class="panel-body">'+conf.groups[i].GroupeDescription+'</div></div></div>'
//	console.log(conf.groups[i].GroupeNom);
//	console.log(htmlTooltip);

	$("#mytooltip").html(htmlTooltip);
	$("#mytooltip").css({opacity:1, display:"none"}).fadeIn(400);
}

//
// affiche la bulle d aide au dessus du nom du Groupe
//
function onmousemoveGroupename(kmouse) {
    
	
    
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

function onmouseoutGroupename() {
	$("#mytooltip").css({left:"-9999px"});	

}

//
// buildWithSubMenu() 
//
function buildWithSubMenu(noGroupe) {
    var str="";

	str += ' <li class="nav-divider"></li>';	
	str += '<li class="buildWithSubMenu"> <div style="padding:0px; padding-left:5px;"';
	str += ' onmouseover="onmouseoverGroupename('+noGroupe+')"   onmousemove="onmousemoveGroupename(event)" ';
	str += ' onmouseout="onmouseoutGroupename()">'+conf.groups[noGroupe].GroupeNom + '</div>';
	str += '<div style="padding:0px; padding-left:5px;">';
	str += '<select class="selectpicker" id="buildWithSubMenu'+noGroupe+'" data-live-search="true" onchange="buildWithSubMenuEvent('+noGroupe+')" >';


	console.log('->'+conf.groups[noGroupe].GroupeNom+':url :'+conf.groups[noGroupe].GroupeSubMenuUrl)
	$.get( conf.groups[noGroupe].GroupeSubMenuUrl, 
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
	var x = document.getElementById("buildWithSubMenu"+val).value;

    console.log(x);
  	console.log("chg_Groupe ="+val);
	Groupe = val;

	// force les autre Groupe a rien avoir de selectionne
	for(i=0;i<NbWithSubMenu;i++) {
		if (i != val) {
			  console.log("reset de "+val);
			 //document.getElementById("buildWithSubMenu"+i).value="";
		}

	}


	// recuperation du nom de la variable
	var variable = "host";

	// modificaton du contenue de la variable contenue dans grouoeSubMenuVariable
	conf.groups[Groupe].grouoeSubMenuVariable.host=x;
	//var pt = eval("conf.groups[Groupe].grouoeSubMenuVariable."+variable);
	//pt = x;
	//console.log("submenu SetVariable |"+eval(pt)+"| val=|"+pt+"|\n");
    buildWithSubMenuAffiche(x);
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

	
	url = conf.groups[Groupe].GroupeImageURL;
	console.log(url);
	
	str1=replaceVariable(url, -1);
	console.log(str1);

	outputGraph += '<div class=" panel-primary" style="padding-top:4;" >';  
	outputGraph += '   <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
	outputGraph += '      <ul class="nav-tabs list-group list-unstyled"  style="border-bottom: 0px" 	>';
	outputGraph += '          <li class="text-center">'+nomTitre+'</li>';
	outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-cog"></span></a></li>';
	outputGraph += '      </ul></div>';
	outputGraph += '      <div class="panel-body" style="padding:0;">';
	outputGraph += '   ';

	//
	// test pour Savor si IMG (par défaut) ou IFRAME
	//
	if (typeof(conf.groups[Groupe].GroupeIframe)  != "undefined" && conf.groups[Groupe].GroupeIframe == "true") {
		var taille="";

		// Adapte la taille de l'IFRAME
		if (typeof(conf.groups[Groupe].GroupeIframeWidth) != 'undefined'  ) {
			taille += 'width="'+conf.groups[Groupe].GroupeIframeWidth+'" ';
		}
		if (typeof(conf.groups[Groupe].GroupeIframeHeight) != 'undefined'  ){
			taille += 'height="'+conf.groups[Groupe].GroupeIframeHeight+'" ';
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
	

	// Affiche le titre ud Groupe
	//
	var GroupeDescription ="";
	if ( typeof(conf.groups[Groupe].groupDescription) != "undefined") {
			description = conf.groups[Groupe].groupDescription;
		}

	outputTitre ='<h1 data-toggle="tooltip" data-placement="top" title="'+GroupeDescription+'"class="text-center">';
	
	if ( typeof(conf.groups[Groupe].GroupeTitre) != 'undefined' && conf.groups[Groupe].GroupeTitre != "") {
		outputTitre +=conf.groups[Groupe].GroupeTitre;
	}else {
		outputTitre +=conf.groups[Groupe].GroupeNom;
	}
	outputTitre += "</h1>";
	$("#graphTitre").html(outputTitre);

}
// -->