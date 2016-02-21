
OBJECTIF :
----------
   Ce script, permet de regrouper sur une même page HTML, les graphes venant d'outil différent et de changer d'échelle pour tous les graphes en même temps.
   Caque graphe peut etre déplacé en cliquant dessus pour mettre les graphes les plus intéressent les uns à coté des autres de façon intéractif, mais sans sauvegarde

   Le script ne gére pas l'authentification pour accéder aux image, il est nécéssaire de s'authentifier sur les différents outils avant de utiliser ce scripts.

INSTALLATION:
-------------

CONFIGURATION:
--------------


DESCRIPTION DES MOTS CLEF :
---------------------------
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


EXEMPLE DE FICHIER DE CONFIG
----------------------------
var conf = { 
	"groups" : [  
	    {	"groupeNom" : "conso elec C7000",     
	    	"groupeTitre" : "Consommation éléctrique des chassis C7000",
			"groupeDescription" : "",
			"groupeImageURL" : "http://vli5res01/pnp4nagios/image?host=%%var1%%&srv=HP_blade_enclosure_health&view=%%echelle%%&source=0",
	    	"graph" : [    
				{"nom" : "OA1C1B94"		,"var1" : "OA1C1B94"},  
				{"nom" : "OA1C2A92"		,"var1" : "OA1C2A92"},  
			    {"nom" : "OA1C3B94"		,"var1" : "OA1C3B94"},  
				{"nom" : "OA1C4A92"		,"var1" : "OA1C4A92"},  
				{"nom" : "OA1C5B94"		,"var1" : "OA1C5B94"},  
				{"nom" : "OA1C6A92"		,"var1" : "OA1C6A92"},  
				{"nom" : "OA1C7B94"		,"var1" : "OA1C7B94"},  
				{"nom" : "OA1C8A92"		,"var1" : "OA1C8A92"}   
			]},   
		{	"groupeNom" : "C7000 C2 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 4 liens 10Gb/s du chassis C2",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel 310 A92 46"	, "var1" : "5737"},  
				{"nom" : "Portchanel 310 A92 48"	, "var1" : "5793"}, 
				{"nom" : "Portchanel 309 A92 46"	, "var1" : "5853"}, 
				{"nom" : "Portchanel 309 A92 48"	, "var1" : "5792"}, 		
			]
		}
	]
};

