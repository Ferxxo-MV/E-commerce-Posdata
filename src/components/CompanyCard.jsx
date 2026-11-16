import { Link } from "react-router-dom";

export default function CompanyCard({ company }) {
    return (
        <Link
            to={`/tienda/${company.slug}`}
            className="company-card"

            style={{ "--brand": company.theme.primary, "--brand-soft": company.theme.soft }}
            data-testid="company-card"
            data-company={company.slug}
        >
            <div
                className="company-card__cover"
                style={{ backgroundImage: company.theme.gradient }}
            >
                {company.logoImage ? (
                    <img
                        className="company-card__logo company-card__logo--img"
                        src={company.logoImage}
                        alt={company.name}
                    />
                ) : (
                    <span className="company-card__logo" aria-hidden="true">
                        {company.logo}
                    </span>
                )}
            </div>

            <div className="company-card__body">
                <span className="chip">{company.category}</span>
                <h3 className="company-card__name">{company.name}</h3>
                <p className="company-card__tagline">{company.tagline}</p>

                <div className="company-card__meta">
                    <span>★ {company.rating.toFixed(1)}</span>
                    <span>{company.city}</span>
                    <span>{company.products.length} productos</span>
                </div>

                <span className="company-card__cta">Entrar a la tienda →</span>
            </div>
        </Link>
    );
}