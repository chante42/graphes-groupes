var echelle = 0;
var groupe = 0;

<!--
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
		if ( typeof(conf.groups[groupe].graph[j].nomDescription) != "undefined") {
			description = conf.groups[groupe].graph[j].nomDescription;
		}

		if ( typeof(conf.groups[groupe].graph[j].nomTitre) != "undefined") {
			nomTitre = conf.groups[groupe].graph[j].nomTitre;
		}
		outputGraph += '<div class=" panel-primary" style="padding-top:4;" >  <div data-toggle="tooltip" data-placement="top" title="'+description+'" class="panel-heading text-center">';
		outputGraph += ''+nomTitre+'</div><div class="panel-body" style="padding:0;">';

		// Si URL pour le nom est definie est plus prioritaire que celle du groupe
		if (typeof(conf.groups[groupe].graph[j].imageURL) != 'undefined' && conf.groups[groupe].graph[j].imageURL!= "" ) {
			url = conf.groups[groupe].graph[j].imageURL;
		}else {
			url = conf.groups[groupe].groupeImageURL;
		}

		// Remplacement des variables de URL par celle contenue dans le nom
		variable= url.match(/%%(.*?)%%/ig); // recherche des mot du type  %%var1%%
		for (var i in variable) {
			var varPropre=variable[i].replace(/%%/gi,'');

			// Ignore les variables internes
			if (variable[i] == "%%echelle%%") {
				//console.log('debug('+varPropre+'):'+eval("conf.groups[groupe].graph[j]."+varPropre));
				if (eval("conf.groups[groupe].graph[j]."+varPropre) != undefined) {
					console.log('ERROR : la variable '+variable[i]+' est définie alors que c\'est une variable réservé');
				}
			}else {
				var varEval = eval("conf.groups[groupe].graph[j]."+varPropre)

				if (varEval == undefined){
					console.log('ERROR : la variable '+variable[i]+' n\'est pas definie dans les attributs de "'+conf.groups[groupe].graph[j].nom+'".');
				}
				else {
					var str = url.replace(variable[i], varEval);
					console.log('url('+varPropre+') = |'+str+'|');
					url = str;
				}
			}
		} // FIN FOR "var i in variable"
		
		// Remplacement des variables fixe et interne 
		var str1 = url.replace("%%echelle%%",echelle);
		
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
			outputGraph += '<img  id="imgAAA'+j+'" src="'+str1+'">';
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
	var username="toto";
	var password="olivier";
	var pictureUrl="http://www.sylvieolivier.fr/protec/images/101.png"
	
	$.get( "/my-js/conf.js", function( data ) {
    	$( "#configTxt" ).html( data );
    });
    $('#configContenue').toggle();

    return;



	$.ajax({

        headers: {
            'Authorization': "Basic " + btoa(username + ":" + password),
            "Accept": "application/json; odata=verbose"
        },
        contentType: "image/png; odata=verbose",

        data1: "{ }",
        type: "GET",
        url: pictureUrl,
        success: function (model) {



            if (pictureUrl != null) {
                $("#imgAAA1").attr('src', pictureUrl);
            } else {
                $("#imgAAA1").attr('src', "../../assets/images/facebook- profile.jpg");
            }



        },
        error: function () {
            alert("failed");
        }
    });
	
	$('#configContenue').toggle();
}

// -->