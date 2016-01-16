
OBJECTIF :
----------

INSTALLATION:
-------------

CONFIGURATION:
--------------


DESCRIPTION DES MOTS CLEF :
---------------------------
// groupeNom 			: [Obligatoire] Nom du groupe qui apparait dans le menu sur la gauche
// groupeTitre 			: [facultatif] 
// groupeDescription 	: [facultatif] 
// graph				: [Obligatoire] Tableau de structure {nom, imageURL, ...} qui permet de définir un graphique
// nom 					: [Obligatoire] Nom d'un graph qui apparait sur le menu a gauche 
// nomTitre          	: [facultatif]  Titre du graphique 
// imageURL 			: [Obligatoire si pas groupeImageURL non définie] URL pour afficher l'image. Peux contenir des variables (%%nomvar%%)
// groupeImageURL		: [facultatif] URL pour le groupe


GESTION DES VARIABLE:
---------------------
   Pour évalué une variable il faut l'entrourré de '%%'.    ex %%var1%%


VARIABLES RESERVES :
--------------------

 %%echelle%% : Permet de choisir le zoom actuel : telque définie par "cacti,pnp4nagios, ..."

EXEMPLE DE FICHIER DE CONFIG
----------------------------
var conf = { 
	"groups" : [  
	    {	"groupeNom" : "conso elec C7000",     
	    	"groupeTitre" : "Consomation éléctrique des chassis C7000",
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

