//
//   Fichier de configuration de graphe Groupé
//
// groupeNom 			: [Obligatoire] Nom du groupe qui apparait dans le menu sur la gauche
// groupeTitre 			: [facultatif] 
// groupeDescription 	: [facultatif] 
// graph				: [Obligatoire] Tableau de structure {nom, imageURL, ...} qui permet de définir un graphique
// nom 					: [Obligatoire] Nom d'un graph qui apparait sur le menu a gauche 
// nomTitre          	: [facultatif]  Titre du graphique 
// imageURL 			: [Obligatoire] URL pour afficher l'image. Peux contenir des variables (%%nomvar%%)
// Reste A faire
// Remonté le imageURL d'un cran avec gestion des variables %%nom%% pour evité de faire des copier coller de imageURL sur chaque entrée 
//
var conf = {
	"groups" : [  
	    {	"groupeNom" : "conso elec C7000",     
	    	"groupeTitre" : "Consomation éléctrique des chassis C7000",
			"groupeDescription" : "",
	    	"graph" : [    
				{"nom" : "OA1C1B94"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C2A92"		, "imageURL" : "images/debug/0"},  
			    {"nom" : "OA1C3B94"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C4A92"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C5B94"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C6A92"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C7B94"		, "imageURL" : "images/debug/0"},  
				{"nom" : "OA1C8A92"		, "imageURL" : "images/debug/0"}   
			]},   
		{	"groupeNom" : "temp C7000",
			"groupeTitre" : "Température d'entrée d'air des chassis HP C7000",
			"groupeDescription" : "",
		    "graph" : [    
				{"nom" : "OA1C1B94"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C2A92"		, "imageURL" : "images/debug/1"},  
			    {"nom" : "OA1C3B94"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C4A92"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C5B94"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C6A92"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C7B94"		, "imageURL" : "images/debug/1"},  
				{"nom" : "OA1C8A92"		, "imageURL" : "images/debug/1"}   
			]},
		{	"groupeNom" : "dns response time",
			"groupeTitre" : "",
			"groupeDescription" : "",
			"graph" : [    
				{"nom" : "ad.si2m.tec"			, "imageURL" : "images/debug/2"},  
				{"nom" : "si2m.tec"				, "imageURL" : "images/debug/2"},  
			    {"nom" : "malakoff1.malmed.tec"	, "imageURL" : "images/debug/2"},  
				{"nom" : "malakoff-mederic.tec"	, "imageURL" : "images/debug/2"},  
				{"nom" : "mederic.malmed.tec"	, "imageURL" : "images/debug/2"}
			]} 
	]
};
