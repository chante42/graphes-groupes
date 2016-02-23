var echelle = 0;
var groupe = 0;


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
	for (var j in conf.groups[groupe].graph) {
		var outputGraph="";
		var variable;
		var description="";
        var nomTitre= conf.groups[groupe].graph[j].nom;
        var href=""

		// test si l'option clickURL existe
		if (typeof(conf.groups[groupe].groupeClickURL) != 'undefined'  ){
			href = replaceVariable(conf.groups[groupe].groupeClickURL, j);
		}
		if 	(typeof(conf.groups[groupe].graph[j].clickURL) != 'undefined'  ){
			href = conf.groups[groupe].graph[j].clickURL;
		}

		if ( typeof(conf.groups[groupe].graph[j].nomDescription) != "undefined") {
			description = conf.groups[groupe].graph[j].nomDescription;
		}

		if ( typeof(conf.groups[groupe].graph[j].nomTitre) != "undefined") {
			nomTitre = conf.groups[groupe].graph[j].nomTitre;
		}
		
		// Si URL pour le nom est definie est plus prioritaire que celle du groupe
		if (typeof(conf.groups[groupe].graph[j].imageURL) != 'undefined' && conf.groups[groupe].graph[j].imageURL!= "" ) {
			url = conf.groups[groupe].graph[j].imageURL;
		}else {
			url = conf.groups[groupe].groupeImageURL;
		}

		
		str1=replaceVariable(url, j);


		outputGraph += '<div class=" panel-primary" style="padding-top:4;" >  <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
		outputGraph += ''+nomTitre+'</div><div class="panel-body" style="padding:0;">';

		//
		// test pour Savor si IMG (par défaut) ou IFRAME
		//
		if ( (typeof(conf.groups[groupe].graph[j].Iframe) != 'undefined'  && conf.groups[groupe].graph[j].Iframe == "true" ) ||
			  (typeof(conf.groups[groupe].groupeIframe)  != "undefined" && conf.groups[groupe].groupeIframe == "true")) {
			var taille="";

			// Adapte la taille de l'IFRAME
			if (typeof(conf.groups[groupe].groupeIframeWidth) != 'undefined'  ) {
				taille += 'width="'+conf.groups[groupe].groupeIframeWidth+'" ';
			}
			if (typeof(conf.groups[groupe].groupeIframeHeight) != 'undefined'  ){
				taille += 'height="'+conf.groups[groupe].groupeIframeHeight+'" ';
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
	if ( typeof(conf.groups[groupe].groupDescription) != "undefined") {
			description = conf.groups[groupe].groupDescription;
		}

	outputTitre ='<h1 data-toggle="tooltip" data-placement="top" title="'+groupeDescription+'"class="text-center">';
	
	if ( typeof(conf.groups[groupe].groupeTitre) != 'undefined' && conf.groups[groupe].groupeTitre != "") {
		outputTitre +=conf.groups[groupe].groupeTitre;
	}else {
		outputTitre +=conf.groups[groupe].groupeNom;
	}
	outputTitre += "</h1>";
	$("#graphTitre").html(outputTitre);

}
function chg_groupe(val)
{
	console.log("chg_groupe ="+val);
	groupe = val;
	affiche();
}

function chg_echelle(val)
{
	console.log("chg_echelle ="+val);
	echelle = val;
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

		//
		// Remplacement de la variable echelle 
		//
		if (variable[i] == "%%echelle%%") {
			//console.log('debug('+varPropre+'):'+eval("conf.groups[groupe].graph[j]."+varPropre));
			if (eval("conf.groups[groupe].graph[j]."+varPropre) != undefined) {
				console.log('ERROR : la variable '+variable[i]+' est définie alors que c\'est une variable réservé');
			}
			else { 
				var echelleTmp =echelle;
				// test si une gestion particuliere de echelle
				//
				if (eval("conf.groups[groupe].groupeEchelleParam") != undefined) {
					echelleTmp = conf.groups[groupe].groupeEchelleParam[echelle].val;
				}
				if (eval("conf.groups[groupe].graph[j].echelleParam") != undefined) {
					echelleTmp = conf.groups[groupe].graph[j].echelleParam[echelle].val;
				}

				var str1 = chaine.replace("%%echelle%%",echelleTmp);
				chaine = str1;
			}

		}else {
			var varEval = eval("conf.groups[groupe].graph[j]."+varPropre)

			if (varEval == undefined){
				console.log('ERROR : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[groupe].graph[j].nom+'".');
			}
			else {
				var str = chaine.replace(variable[i], varEval);
				chaine = str;
			}
		}
	} // FIN FOR "var i in variable"
	
//	console.log('Replacevariable OUT=|'+chaine+'|');
	return(chaine);
}

function onmouseovergroupename(i) {

	var htmlTooltip = '<div><div  class="panel-info">';
	htmlTooltip 	+=' <div id="bulle-panel" class="panel-heading text-center">'+conf.groups[i].groupeNom+'</div>';
	htmlTooltip 	+= '<div class="underline bulle-margin">'+conf.groups[i].groupeTitre+':</div>';
	htmlTooltip 	+= '<div class="panel-body bulle-margin">'+conf.groups[i].groupeDescription+'<hr>';
	htmlTooltip 	+= 'Les graphes inclus sont : <span>'
	for (var j in conf.groups[i].graph) {
		if (j%3 == 0) {
			htmlTooltip += '<br>';
		}
		
		htmlTooltip 	+= '<span style="margin-left:10px;">'+conf.groups[i].graph[j].nom+'</span>';
		if (j < conf.groups[i].graph) {
			htmlTooltip 	+= ',';
		}
		
	}
	htmlTooltip += '</span></div></div>';

	htmlTooltip 	+= '<span id="bulle-arrow_border"></span><span id="bulle-arrow_inner"></span></div>';

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
	var offset = -69;
		
	top_pos = kmouse.pageY +offset;
			
	left_pos =  $("#groupe").width() + 20;
	my_tooltip.css({left:left_pos, top:top_pos});
}

function onmouseoutgroupename() {
 	$("#mytooltip").css({left:"-9999px"});	
}
// -->