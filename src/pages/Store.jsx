import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import NotFound from "./NotFound.jsx";
import { getCompanyBySlug } from "../data/companies.js";
import { formatPrice } from "../utils/format.js";

const ALL_CATEGORIES = "Todos";

export default function Store() {
    const { companySlug } = useParams();
    const company = getCompanyBySlug(companySlug);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(ALL_CATEGORIES);

    useEffect(() => {
        setSearch("");
        setCategory(ALL_CATEGORIES);
    }, [companySlug]);

    const categories = useMemo(() => {
        if (!company) return [];
        return [ALL_CATEGORIES, ...new Set(company.products.map((p) => p.category))];
    }, [company]);

    const visibleProducts = useMemo(() => {
        if (!company) return [];
        
        const term = search.trim().toLowerCase();

        return company.products.filter((product) => {
            const matchesCategory = 
                category === ALL_CATEGORIES || product.category === category;
            const matchesSearch =
                term === "" ||
                product.name.toLowerCase().includes(term);

            return matchesCategory && matchesSearch;
        });
    }, [company, search, category]);

    if (!company) {
        return <NotFound />;
    }

    return (
        <div
            className="store"
            style={{ "--brand": company.theme.primary, "--brand-soft": company.theme.soft }}
            data-testid="store-page"
            data-company={company.slug}
        >
            <div className="store__cover" style={{ backgroundImage: company.theme.gradient }}>
                <div className="container store__cover-inner">
                    {company.logoImage ? (
                        <img
                            className="store__logo store__logo--img"
                            src={company.logoImage}
                            alt={company.name}
                        />
                    ) : (
                        <span className="store__logo" aria-hidden="true">
                            {company.logo}
                        </span>
                    )}
                    <div>
                        <h1 className="store__name" data-testid="store-name">
                            {company.name}
                        </h1>
                        <p className="store__tagline">{company.tagline}</p>
                        <p className="stpre__tagline">
                            ★ {company.rating.toFixed(1)} · {company.city}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <nav className="breadcrumb">
                    <Link to="/">Tiendas</Link>
                    <span></span>
                    <span>{company.name}</span>
                </nav>

                <p className="shipping-note">
                    🚚 {company.shipping.estimate} · Envío gratis desde{" "}
                    {formatPrice(company.shipping.freeFrom)} 
                </p>

                <div className="toolbar">
                    <div className="filters" data-testid="category-filters">
                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={`filter ${item === category ? "filter--active" : ""}`}
                                onClick={() => setCategory(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <label className="search">
                        <span aria-hidden="true">🔍</span>
                        <input 
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar en esta tienda"
                            data-testid="store-search"
                        />
                    </label>
                </div>

                {visibleProducts.length === 0 ? (
                    <div className="empty-state" data-testid="no-results">
                        <span className="empty-state__icon" aria-hidden="true">
                            🫗
                        </span>
                        <h2>Sin resultados</h2>
                        <p>No hay productos con esos filtros</p>
                    </div>
                ) : (
                    <div className="grid grid--products" data-testid="product-grid">
                        {visibleProducts.map((product) => (
                            <ProductCard key={product.id} product={product} company={company} />
                        ))}                       
                    </div>
                )}
            </div>
        </div>
    );
}

