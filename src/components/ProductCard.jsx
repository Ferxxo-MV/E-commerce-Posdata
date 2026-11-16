import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({ product, company }) {
    const { addItem } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
        if (!justAdded) return undefined;

        const timer = setTimeout(() => setJustAdded(false), 1400);
        return () => clearTimeout(timer);
    }, [justAdded]);

    function handleAdd() {
        addItem(product, company.id);
        setJustAdded(true);
    }

    return (
        <article className="product-card" data-testid="product-card" data-product={product.id}>
            <Link
                to={`/tienda/${company.slug}/producto/${product.id}`}
                className="product-card__media"
                style={{ backgroundImage: company.theme.gradient }}
                aria-label={product.name}
            >
                <span aria-hidden="true">{product.image}</span>
            </Link>

            <div className="product-card__body">
                <span className="chip">{product.category}</span>
                <h3 className="product-card__name">
                    <Link to={`/tienda/${company.slug}/producto/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <p className="product-card__description">{product.description}</p>

                <div className="product-card__footer">
                    <span className="price" data-testid="product-price">
                        {formatPrice(product.price)}
                    </span>
                    <button
                        type="button"
                        className={`btn btn--sm ${justAdded ? "btn--success" : "btn--brand"}`}
                        onClick={handleAdd}
                        data-testid="add-to-cart"
                    >
                        {justAdded ? "¡Agregado!" : "Agregar"}
                    </button>
                </div>
            </div>
        </article>
    );
}