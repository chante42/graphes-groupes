//
//   Fichier de configuration de graphe Groupé
//
// groupeNom 			: [Obligatoire] Nom du groupe qui apparait dans le menu sur la gauche
// groupeTitre 			: [facultatif] 
// groupeDescription 	: [facultatif] Description du nom du graphe (apparait en hover)
// groupeImageURL		: [facultatif] URL pour le groupe
// groupeIframe			: [facultatif] si égale a "true"  l'URL est affiché dans un iframe
// groupeIframeWidth 	: [facultatif] Largeur de l'iframe 
// groupeIframeHeight 	: [facultatif] Hauteur de l'iframe
//
// graph				: [Obligatoire] Tableau de structure {nom, imageURL, ...} qui permet de définir un graphique
// nom 					: [Obligatoire] Nom d'un graph qui apparait sur le menu a gauche 
// nomTitre          	: [facultatif]  Titre du graphique 
// nomDescription       : [facultatif] 
// imageURL 			: [Obligatoire si pas groupeImageURL non définie] URL pour afficher l'image. Peux contenir des variables (%%nomvar%%)
//
//
// Les variables :
//    Pour évalué une variable il faut l'entrourré de '%%'.    ex %%var1%%
// 
// Les variables Pres-définie
//      %%echelle%% : Permet de choisir le zoom actuel : telque définie par "cacti,pnp4nagios, ..."
// 
//
var conf = {
	"groups" : [  
	    {	"groupeNom" : "conso elec C7000",     
	    	"groupeTitre" : "Consomation éléctrique des chassis C7000",
			"groupeDescription" : "groupeDescription groupeDescription groupeDescription groupeDescription groupeDescription",
			"groupeImageURL" : "http://vli5res01/pnp4nagios/image?host=%%var1%%&srv=HP_blade_enclosure_health&view=%%echelle%%&source=0",
	    	"graph" : [    
				{"nom" : "OA1C1B94"		,"var1" : "OA1C1B94", "nomTitre" : "Consomation chassis C1 en Wh", "nomDescription" : " kqsugdfqjkgfgsdfgsquifygsquifiusgfygsqufguisqdgfusdygfusqgfus"},  
				{"nom" : "OA1C2A92"		,"var1" : "OA1C2A92"},  
			    {"nom" : "OA1C3B94"		,"var1" : "OA1C3B94"},  
				{"nom" : "OA1C4A92"		,"var1" : "OA1C4A92"},  
				{"nom" : "OA1C5B94"		,"var1" : "OA1C5B94"},  
				{"nom" : "OA1C6A92"		,"var1" : "OA1C6A92"},  
				{"nom" : "OA1C7B94"		,"var1" : "OA1C7B94"},  
				{"nom" : "OA1C8A92"		,"var1" : "OA1C8A92"}   
			]},   
		{	"groupeNom" : "temp C7000",
			"groupeTitre" : "Température d'entrée d'air des chassis HP C7000",
			"groupeDescription" : "",
			"groupeImageURL" : "http://vli5res01/pnp4nagios/image?host=%%var1%%&srv=Temperature_chassis_C7000&view=%%echelle%%&source=0",
		    "graph" : [    
				{"nom" : "OA1C1B94"		, "var1" : "OA1C1B94"},  
				{"nom" : "OA1C2A92"		, "var1" : "OA1C2A92"},  
			    {"nom" : "OA1C3B94"		, "var1" : "OA1C3B94"},  
				{"nom" : "OA1C4A92"		, "var1" : "OA1C4A92"},  
				{"nom" : "OA1C5B94"		, "var1" : "OA1C5B94"},  
				{"nom" : "OA1C6A92"		, "var1" : "OA1C6A92"},  
				{"nom" : "OA1C7B94"		, "var1" : "OA1C7B94"},  
				{"nom" : "OA1C8A92"		, "var1" : "OA1C8A92"}   
			]},
		{	"groupeNom" : "dns response time",
			"groupeTitre" : "",
			"groupeDescription" : "",
			"groupeImageURL" : "http://vli5res01/pnp4nagios/image?host=dnshost&srv=%%var1%%&source=0&view=%%echelle%%",
			"graph" : [
				{"nom" : "ad.si2m.tec 10.80"			, "var1" : "DNS_ad.si2m.tec_10.80.32.32"				},  
				{"nom" : "ad.si2m.tec 10.83"			, "var1" : "DNS_ad.si2m.tec__10.83.32.32"				},  
				{"nom" : "si2m.tec 10.80"				, "var1" : "DNS_si2m.tec_10.80.32.32"				},  
				{"nom" : "si2m.tec 10.83"				, "var1" : "DNS_si2m.tec_10.83.32.32" 				},  
			    {"nom" : "malakoff1.malmed.tec 10.80"	, "var1" : "DNS_malakoff1.malmed.tec__10.80.32.32"},  
			    {"nom" : "malakoff1.malmed.tec 10.83"	, "var1" : "DNS_malakoff1.malmed.tec__10.83.32.32"},  
				{"nom" : "malakoff-mederic.tec 10.80"	, "var1" : "DNS_malakoff-mederic.tec_10.80.32.32"},  
				{"nom" : "malakoff-mederic.tec 10.83"	, "var1" : "DNS_malakoff-mederic.tec__10.83.32.32"},  
				{"nom" : "mederic.malmed.tec 10.80"		, "var1" : "DNS_mederic.malmed.tec__10.80.32.32"},
				{"nom" : "mederic.malmed.tec 10.83"		, "var1" : "DNS_mederic.malmed.tec__10.83.32.32"}
			]
		},
		{	"groupeNom" : "Lien MAN DC",     
	    	"groupeTitre" : "débit des 4 liens MAN Datacenter ",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "A92 MAN1"		, "var1" : "5250"},  
				{"nom" : "A92 MAN2"		, "var1" : "5251"},  
			    {"nom" : "B94 MAN1"		, "var1" : "5252"},  
				{"nom" : "B94 MAN2"		, "var1" : "5253"} 
			]
		},
		{	"groupeNom" : "Lien 10 Gb entre DC",     
	    	"groupeTitre" : "débit des 4 liens MAN Datacenter ",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Lien 10Gb/s 1"		, "var1" : "5281"},  
				{"nom" : "Lien 10Gb/s 2"		, "var1" : "5280"}, 
			]
		},
		{	"groupeNom" : "Lien Site principaux",     
	    	"groupeTitre" : "débit des sites principaux ",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "A92 MAN1"			, "var1" : "5250"},  
				{"nom" : "B94 MAN1"			, "var1" : "5252"},  
				{"nom" : "internet" 		, "var1" : "5182"},
				{"nom" : "RavRac"			, "var1" : "5163"} ,
				{"nom" : "Paris Laffite"	, "var1" : "5540"} ,
				{"nom" : "Angers"			, "var1" : "4949"} ,
				{"nom" : "Marseille"		, "var1" : "5025"} ,
				{"nom" : "Nantes"			, "var1" : "5016"} ,
				{"nom" : "St Jean"			, "var1" : "5160"} ,
				{"nom" : "Metz"				, "var1" : "5082"} ,
			]
		},
		{	"groupeNom" 			: "T Réel :Lien Site principaux",     
	    	"groupeTitre" 			: "débit temps réel des sites principaux ",
			"groupeDescription" 	: "",
			"groupeIframe" 			: "true",
			"groupeIframeWidth" 	: "700",
			"groupeIframeHeight" 	: "300",
			"groupeImageURL" : "http://supervisiondc.si2m.tec/cacti/plugins/realtime/graph_popup_rt.php?local_graph_id=%%var1%%&graph_start=-300&graph_end=0&ds_step=10&count=0",
	    	"graph" : [    
				{"nom" : "A92 MAN1"			, "var1" : "5250"},  
				{"nom" : "B94 MAN1"			, "var1" : "5252"},  
				{"nom" : "internet" 		, "var1" : "5182"},
				{"nom" : "RavRac"			, "var1" : "5163"} ,
				{"nom" : "Paris Laffite"	, "var1" : "5540"} ,
				{"nom" : "Angers"			, "var1" : "4949"} ,
				{"nom" : "Marseille"		, "var1" : "5025"} ,
				{"nom" : "Nantes"			, "var1" : "5016"} ,
				{"nom" : "St Jean"			, "var1" : "5160"} ,
				{"nom" : "Metz"				, "var1" : "5082"} ,


			]
		},

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
		},
		{	"groupeNom" : "C7000 C4 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 4 liens 10Gb/s du chassis C4",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel 308 A92 46"	, "var1" : "5735"},  
				{"nom" : "Portchanel 308 A92 48"	, "var1" : "5791"}, 
				{"nom" : "Portchanel 307 A92 46"	, "var1" : "5734"}, 
				{"nom" : "Portchanel 307 A92 48"	, "var1" : "5790"}, 		
			]
		},
		{	"groupeNom" : "C7000 C6 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 4 liens 10Gb/s du chassis C6",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel 305 A92 46"	, "var1" : "5732"},  
				{"nom" : "Portchanel 305 A92 48"	, "var1" : "5788"}, 
				{"nom" : "Portchanel 306 A92 46"	, "var1" : "5733"}, 
				{"nom" : "Portchanel 306 A92 48"	, "var1" : "5789"}, 		
			]
		},
		{	"groupeNom" : "C7000 C8 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 4 liens 10Gb/s du chassis C6",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel 319 A92 46"	, "var1" : "5742"},  
				{"nom" : "Portchanel 319 A92 48"	, "var1" : "5798"}, 
				{"nom" : "Portchanel 320 A92 46"	, "var1" : "5743"}, 
				{"nom" : "Portchanel 320 A92 48"	, "var1" : "5799"}, 		
			]
		},
		{	"groupeNom" : "C7000 C1 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 2 liens 10Gb/s du chassis C1",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel B94 6"	, "var1" : ""},  
				{"nom" : "Portchanel B94 8"	, "var1" : ""}, 
				{"nom" : "Portchanel B94 6"	, "var1" : ""}, 
				{"nom" : "Portchanel B94 8"	, "var1" : ""}, 		
			]
		},
		{	"groupeNom" : "C7000 C3 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 2 liens 10Gb/s du chassis C3",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel  B94 6"	, "var1" : ""},  
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 6"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 		
			]
		},
		{	"groupeNom" : "C7000 C5 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 2 liens 10Gb/s du chassis C5",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel  B94 6"	, "var1" : ""},  
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 6"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 		
			]
		},
		{	"groupeNom" : "C7000 C7 Réseau VC",     
	    	"groupeTitre" : "Débit  des 2 VC composés de 2 liens 10Gb/s du chassis C7",
			"groupeDescription" : "",
			"groupeImageURL" : "http://supervisiondc/cacti/graph_image.php?action=view&local_graph_id=%%var1%%&rra_id=%%echelle%%",
	    	"graph" : [    
				{"nom" : "Portchanel  B94 6"	, "var1" : ""},  
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 6"	, "var1" : ""}, 
				{"nom" : "Portchanel  B94 8"	, "var1" : ""}, 		
			]
		},
		{	"groupeNom" : "test1",     
	    	"groupeTitre" : "test1 de la structure",
			"groupeDescription" : "",
			"groupeImageURL" : "http://www.sylvieolivier.fr/protec/images/0%%echelle%%%%var1%%.png",
	    	"graph" : [    
				{"nom" : "img 0"		, "var1" : "0"},  
				{"nom" : "img 1"		, "var1" : "1"},  
			    {"nom" : "img 2"		, "var1" : "2"},  
				{"nom" : "img 3"		, "var1" : "3"},  
				{"nom" : "img 4"		, "var1" : "4"},  
				{"nom" : "img 5"		, "var1" : "5"},  
				{"nom" : "img 6"		, "var1" : "6"},  
				{"nom" : "img 7"		, "var1" : "7"}   
			]
		},
		{	"groupeNom" : "Ping filer nagios",     
	    	"groupeTitre" : "Temps de ping des vfiler sous nagios",
			"groupeDescription" : "",
			"groupeImageURL" : "images/debug/1%%echelle%%%%var1%%.png",
			
	    	"graph" : [    
				{"nom" : "votzfil001"		, "imageURL" : "http://linnagiosap.si2m.tec/centreon/include/views/graphs/generateGraphs/generateImage.php?session_id=rj3men9hda4vi9klm5uctj9gk4&index=14695&end=1453384597&start=1450706197" },
				{"nom" : "votzfil002"		, "imageURL" : "http://linnagiosap.si2m.tec/centreon/include/views/graphs/generateGraphs/generateImage.php?session_id=rj3men9hda4vi9klm5uctj9gk4&index=14689&end=1453384860&start=1453341660"},
				{"nom" : "votzfil002"		, "imageURL" : "http://linnagiosap.si2m.tec/centreon/include/views/graphs/generateGraphs/generateImage.php?index=14689&end=1453384860&start=1453341660"},
			  
			]
		},
		{	"groupeNom" : "test2",     
	    	"groupeTitre" : "test2 de la structure",
			"groupeDescription" : "",
			"groupeImageURL" : "images/debug/1%%echelle%%%%var1%%.png",
	    	"graph" : [    
				{"nom" : "img 0"		, "var1" : "0"},  
				{"nom" : "img 1"		, "var1" : "1"},  
			    {"nom" : "img 2"		, "var1" : "2"},  
				{"nom" : "img 3"		, "var1" : "3"},  
				{"nom" : "img 4"		, "var1" : "4"},  
				{"nom" : "img 5"		, "var1" : "5"},  
				{"nom" : "img 6"		, "var1" : "6"},  
				{"nom" : "img 7"		, "var1" : "7"}   
			]
		},
	]
};



