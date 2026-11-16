import { useState } from "react";
import { Link, useParams} from "react-router-dom";
import NotFound from "./NotFound.jsx";
import { useCart } from "../context/CartContext.jsx";
import { getCompanyBySlug, getProductById } from "../data/companies.js";
import { formatPrice } from "../utils/format.js";

export default function ProductDetail() {
    const { companySlug, productId} = useParams();
    const company = getCompanyBySlug(companySlug);
    const product = getProductById(company, productId);

    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!company || !product) {
        return <NotFound />;
    }

    return (
        <div
            className="container"
            style={{ "--brand": company.theme.primary, "--brand-soft": company.theme.soft }}
        >
            <nav className="breadcrumb">
                <Link to="/">Tiendas</Link>
                <span></span>
                <Link to={`/tienda/${company.slug}`}>{company.name}</Link>
                <span></span>
                <span>{product.name}</span>
            </nav>

            <section className="product-detail" data-testid="product-detail">
                <div
                    className="product-detail__media"
                    style={{ backgroundImage: company.theme.gradient }}
                >
                    <span aria-hidden="true">{product.image}</span>
                </div>

                <div className="product-detail__info">
                    <span className="chip">{product.category}</span>
                    <h1 data-testid="product-name">{product.name}</h1>
                    <p className="product-detail__price" data-testid="product-price">
                        {formatPrice(product.price)}
                    </p>
                    <p>{product.description}</p>

                    <ul className="meta-list">
                        <li>Vendido por {company.name}</li>
                        <li>{product.stock} piezas disponibles</li>
                        <li>{company.shipping.estimate}</li>
                    </ul>

                    <div className="product-detail__actions">
                        <div className="stepper" data-testid="quantity-stepper">
                            <button
                                type="button"
                                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                aria-label="Quitar una pieza"
                            >
                                -
                            </button>
                            <span data-testid="quantity-value">{quantity}</span>
                            <button 
                                type="button"
                                onClick={() =>
                                    setQuantity((value) => Math.min(product.stock, value + 1))
                                }
                                aria-label="Agregar una pieza"
                            >
                                +
                            </button>
                        </div>

                        <button
                            type="button"
                            className="btn btn--brand"
                            onClick={() => addItem(product, company.id, quantity)}
                            data-testid="add-to-cart"
                        >
                            Agregar al carrito
                        </button>

                        <Link className="btn btn--ghost" to={`/tienda/${company.slug}`}>
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

