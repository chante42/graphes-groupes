var Echelle = 0;
var Groupe= 0;


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
		outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-cog"></span></a></li>';
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

				// test si une fonction dans la chaine echelleTmp
				//
				var regex = /\w*\(\)/g;
				var fctName = String(echelleTmp).match(regex);
				
				if (eval(fctName) != undefined ) {
					console.log("fct :"+fctName+"\n");
					if ( fctName == "now()") {
						var d = new Date();
						var seconds = d.getTime() / 1000;
						echelleTmp = echelleTmp.replace("now()", String(seconds));
						echelleTmp = eval(echelleTmp);
						console.log("now() : "+ echelleTmp);
					}
					
				}
				var str1 = chaine.replace("%%echelle%%",echelleTmp);
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
			// traitement des variables dans EchelleParam ou groupeEchelleParam
			var echelleTmp;
			if (eval("conf.groups[Groupe].groupeEchelleParam") != undefined) {
			 	echelleTmp = conf.groups[Groupe].groupeEchelleParam[Echelle];
			}
			 if (j >= 0 && eval("conf.groups[Groupe].graph[j].echelleParam") != undefined) {
			 	echelleTmp = conf.groups[Groupe].graph[j].echelleParam[Echelle];
			}

			//console.log("echelleTmp:"+JSON.stringify(echelleTmp, null, 4));
			var varEvalEchelle;
			if (eval("echelleTmp") != undefined) { 	
				
			 	varEvalEchelle = eval("echelleTmp."+varPropre);
			}
			 
			if (varEvalEchelle == undefined){
			 	console.log('ERROR : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].groupeNom+'".echelleParam .');
			}
			else {
				var str = chaine.replace(variable[i], varEvalEchelle);
			 	chaine = str;
			}

			//
			// traitement de la variable contenu grouoeSubMenuVariable
			var varStr = "conf.groups[Groupe].grouoeSubMenuVariable";

			if ( eval(varStr) == undefined || eval(varStr+"."+varPropre) == undefined){
				console.log('WARning : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[Groupe].groupeNom+'.grouoeSubMenuVariable".');
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
	console.log("Sub MENU EVENT [" +conf.NoSubMenu+"]" );
  	console.log("chg_groupe ="+val);
	Groupe= val;


	resetSubMenu(val);	
	// recuperation du nom de la variable
	var variable = "host";

	var x = document.getElementById("buildWithSubMenu"+val).value;
	// modificaton du contenue de la variable contenue dans grouoeSubMenuVariable
	conf.groups[Groupe].grouoeSubMenuVariable.host=x;
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
	outputGraph += '          <li class="pull-right"> <a href="'+str1+'" target="_blank"><span class="glyphicon glyphicon-cog"></span></a></li>';
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


// -->