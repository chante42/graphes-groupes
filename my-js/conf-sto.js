//DESCRIPTION DES MOTS CLEF :
//---------------------------
// groupeNom 			: [Obligatoire] Nom du groupe qui apparait dans le menu sur la gauche
//                         si contient [separateur] affiche une ligne horizontale
// groupeTitre 			: [facultatif] 
// groupeDescription 	: [facultatif] Description du nom du graphe (apparait en hover)
// groupeImageURL		: [facultatif] URL pour le groupe
// groupeIframe			: [facultatif] si égale a "true"  l'URL est affiché dans un iframe
// groupeIframeWidth 	: [facultatif] Largeur de l'iframe 
// groupeIframeHeight 	: [facultatif] Hauteur de l'iframe
// groupeClickURL       : [facultatif] URL appelé si on click sur une image du groupe
// groupeEchelleParam   : [facultatif] contient un tableau qui représente la valeur de la variable %%echelles%% 
//                         ex : [ {"val" : "10800"},{"val" : "108000"},	{"val" : "864000"},{"val" : "34560000"},{"val" : "34560000"}],
// 
//
// graph				: [Obligatoire] Tableau de structure {nom, imageURL, ...} qui permet de définir un graphique
// nom 					: [Obligatoire] Nom d'un graph qui apparait sur le menu a gauche 
// nomTitre          	: [facultatif]  Titre du graphique 
// nomDescription       : [facultatif] 
// imageURL 			: [Obligatoire si pas groupeImageURL non définie] URL pour afficher l'image. Peux contenir des variables (%%nomvar%%)
// clickURL             : [facultatif] URL appelé si on click  l'image
//
//
// Les variables :
//    Pour évaluer une variable il faut l'entrourrer de '%%'.    ex %%var1%%
// 
// Les variables Pres-définie
//      %%echelle%% : Permet de choisir le zoom actuel : telque définie par "cacti,pnp4nagios, ..."
// 
//

// sto : http://vli0mix002/cgi-bin/3par-rpts/inserv_perf.exe?reptype=vstime&compare=VV&maxgraphs=8&comparesel=total_iops&refresh=&begintsecs=&endtsecs=&sellun=--All+LUNs--&txtfromselvv=&selvv=--All+VVs--&selnsp=&txtfromselhost=WIN0BDD010&selhost=WIN0BDD010&charttab=chart&chartlib=gdgraph&charttype=lines&graphx=1500&graphy=&timeform=Auto&graphlegpos=&report=vlun_perf_time&category=hires&selsys=--All+Systems--&seldomain=--All+Domains--
//
var conf = {
	"groups" : [  
		{	"groupeNom"         : "Ecran initial",     
	    	"groupeTitre" 		: "Ecran initial",
			"groupeDescription" : "",
			"groupeImageURL" 	: "images/debug/1%%echelle%%%%var1%%.png",
			"groupeClickURL" 	: "http://www.google.fr",
	    	"graph" : [    
				{"nom" : "img 0"		, "var1" : "0", "clickURL" : "images/debug/100.png"},  
				{"nom" : "img 1"		, "var1" : "1"},  
			    
			]
		},
		{	"groupeNom"         : "3PAR V400 host",     
	    	"groupeTitre" 		: "3PAR V400 par host",
			"groupeDescription" : "",
			"groupeIframe" 			: "true",
			"groupeIframeWidth" 	: "700",
			"groupeIframeHeight" 	: "1200",
			"groupeImageURL"    : "http://vli0mix002/cgi-bin/3par-rpts/inserv_perf.exe?reptype=vstime&compare=VV&maxgraphs=8&comparesel=total_iops&refresh=&begintsecs=&endtsecs=&sellun=--All+LUNs--&txtfromselvv=&selvv=--All+VVs--&selnsp=&txtfromselhost=%%host%%&selhost=%%host%%&charttab=chart&chartlib=gdgraph&charttype=lines&graphx=700&graphy=&timeform=Auto&graphlegpos=&report=vlun_perf_time&category=hires&selsys=--All+Systems--&seldomain=--All+Domains--",
	    	"graph" : [ 

				{"nom" : "WIN0BDD008"		, "host" :"WIN0BDD008"},  
				{"nom" : "WIN0BDD010"		, "host" :"WIN0BDD010"},  
			
			    
			]
		},
		{	"groupeNom"         : "3PAR V400  CPU",     
	    	"groupeTitre" 		: "3PAR V400 ressource ",
			"groupeDescription" : "",
			"groupeIframe" 			: "true",
			"groupeIframeWidth" 	: "700",
			"groupeIframeHeight" 	: "1200",
			"groupeImageURL"    : "http://vli0mix002/cgi-bin/3par-rpts/inserv_perf.exe?reptype=vstime&compare=Node&maxgraphs=8&comparesel=cpu_busy&refresh=&begintsecs=-31536000&endtsecs=&selnode=--All+Nodes--&charttab=chart&chartlib=gdgraph&charttype=lines&graphx=1500&graphy=&timeform=Auto&graphlegpos=&report=cpu_perf_time&category=daily&selsys=--All+Systems--",
	    	"graph" : [ 

				{"nom" : "V400A"		, "host" :"WIN0BDD008"},  
				{"nom" : "V400B"		, "host" :"WIN0BDD010"},  
			
			    
			]
		},
		
	    
	]
};



