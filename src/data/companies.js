export const companies = [
    {
        id: "caballito",
        slug: "caballito-pastelerias",
        name: "Caballito Pastelerías",
        tagline: "Pastelería artesanal desde 1998",
        category: "Pastelería",
        city: "Zapopan, Jal.",
        rating: 4.9,
        logo: "🧁",
        logoImage: "/caballito-logo.png",
        theme: {
        primary: "#04188b",
        soft: "#fde7ef",
        gradient: "linear-gradient(135deg, #fbc761 0%, #04188b 100%)",
        },
        
        shipping: {
            freeFrom: 500,
            estimate: "Entrega el mismo día en CDMX",
        },
        
        products: [
            {
                id: "pastel-tres-leches",
                name: "Pastel de tres leches",
                description: "Para 10 personas, con fresa natural y crema batida.",
                price: 380,
                category: "Pasteles",
                image: "🍰",
                stock: 12,
            },
            {
                id: "cheesecake-zarzamora",
                name: "Cheesecake de zarzamora",
                description: "Base de galleta de mantequilla y zarzamora de temporada.",
                price: 420,
                category: "Pasteles",
                image: "🫐",
                stock: 8,
            },
            {
                id: "cupcakes-vainilla",
                name: "Caja de 6 cupcakes",
                description: "Vainilla con betún de queso crema y chispas de colores.",
                price: 180,
                category: "Cupcakes",
                image: "🧁",
                stock: 25,
            },
            {
                id: "rosca-naranja",
                name: "Rosca de naranja",
                description: "Panqué de naranja con glaseado cítrico, pieza de 900 g.",
                price: 210,
                category: "Panadería",
                image: "🍊",
                stock: 15,
            },
            {
                id: "galletas-mantequilla",
                name: "Galletas de mantequilla (12 pz)",
                description: "Receta de la casa, horneadas el mismo día.",
                price: 120,
                category: "Galletas",
                image: "🍪",
                stock: 40,
            },
        ],
    },
];

export function getCompanyBySlug(slug) {
    return companies.find((company) => company.slug === slug);
}

export function getCompanyById(id) {
    return companies.find((company) => company.id === id);
}

export function getProductById(company, productId) {
    return company?.products.find((product) => product.id === productId);
}