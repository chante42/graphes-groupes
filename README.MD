
OBJECTIF :
----------
   Ce script, permet de regrouper sur une même page HTML, les graphes venant d'outil différent et de changer d'échelle pour tous les graphes en même temps.
   
   Chaque graphe peut etre déplacé en cliquant dessus pour mettre les graphes les plus intéressent les uns à coté des autres de façon intéractif, mais sans sauvegarde

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

// groupeVariable       : [facultatif] Liste variable : valeur : La valeur npeux contenir une fonction parmis celle définie 

//
// Les variables :
//    Pour évaluer une variable il faut l'entrourrer de '%%'.    ex %%var1%%
// 
// Les variables Pres-définie
//      %%echelle%% : Permet de choisir le zoom actuel : telque définie par "cacti,pnp4nagios, ..."
// 


//
// Les Fonctions :
//
// * annee()   : retour l'anné sous formme yyyy
// * mois()    : retourne le no du mois sur 2 digits ( ex 01 ou 12)
// * moisStr() : retourne le nom du mois en français sans accents: ("janvier, decembre")
// * jour()    : retourne le jours du mois sur 2 digits (ex 01, 31)
//
//  exmple : {"varAnnee" : "annee()", "varMois" : "mois()", "varMoisStr" : "moisStr()", "varJour" : "jour()"},
//
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
				{"nom" : "chassis1"		,"var1" : "chassis1tec"},  
				{"nom" : "chassis2"		,"var1" : "chassis2tec"},  
			    {"nom" : "chassis3"		,"var1" : "chassis3tec"},  
				{"nom" : "chassis3"		,"var1" : "chassis4tec"},  
				{"nom" : "chassis4"		,"var1" : "chassis5tec"},  
				{"nom" : "chassis5"		,"var1" : "chassis6tec"},  
				{"nom" : "chassis6"		,"var1" : "chassis7tec"},  
				{"nom" : "chassis7"		,"var1" : "chassis8tec"}   
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

