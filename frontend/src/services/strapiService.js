// src/services/strapiService.js (Version temporaire de diagnostic)

const STRAPI_BASE_URL = 'http://localhost:1337'; 

export const getProperties = async () => {
  try {
    // Appel le plus simple possible
    const response = await fetch(`${STRAPI_BASE_URL}/api/proprietes?populate=*`);
    
    if (!response.ok) {
      // Si la réponse n'est pas 200 (ex: 403, 404, 500), on lance une erreur
      throw new Error(`Erreur HTTP: ${response.status}`); 
    }

    const data = await response.json();
    console.log("Données brutes reçues de Strapi:", data); // Affiche les données dans la console du navigateur
    
    // On renvoie les données brutes pour l'instant
    return data.data.map(item => ({
        id: item.id,
        ...item.attributes,
        // Si vous avez des images ou des relations, elles seront ici, 
        // mais on n'essaie pas de les formater tout de suite.
    }));

  } catch (error) {
    console.error("ÉCHEC DE LA CONNEXION À STRAPI:", error);
    return [];
  }
};