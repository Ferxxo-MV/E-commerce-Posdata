import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { companies } from "../data/companies.js";
import { formatPrice } from "../utils/format.js";

export default function Cart() {
    const { items, setQuantity, removeItem, clearCart, subtotal } = useCart();
    const [checkoutMessage, setCheckoutMessage] = useState("");

    if (items.length === 0) {
        return (
            <div className="container">
                <div className="empty-state" data-testid="empty-cart">
                    <span className="empty-state__icon" aria-hidden="true">
                        🛒
                    </span>
                    <h1>Carrito vacío</h1>
                    <p>Entra a una tienda y agrega lo que te guste.</p>
                    <Link className="btn btn-primary" to="/">
                        Ver tiendas|
                    </Link>
                </div>
            </div>
        );
    }

    const groups = companies
        .map((company) => ({
            company,
            lines: items.filter((item) => item.companyId === company.id),
        }))
        .filter((group) => group.lines.length > 0);

    return (
        <div className="container">
            <section className="cart" data-testid="cart-page">
                <div>
                    <header className="section__header">
                        <h1>Tu carrito</h1>
                        <button type="button" className="link-button" onClick={clearCart}>
                            Vaciar carrito
                        </button>
                    </header>

                    {groups.map(({ company, lines }) => {
                        const groupTotal = lines.reduce(
                            (total, line) => total + line.price * line.quantity,
                            0
                        );

                        return (
                            <div
                                key={company.id}
                                className="cart__group"
                                style={{
                                    "--brand": company.theme.primary,
                                    "--brand-soft": company.theme.soft,
                                }}
                                data-testid="cart-group"
                                data-company={company.slug}
                            >
                                <div className="cart__group-header">
                                    <strong>
                                        {company.logo} {company.name}
                                    </strong>
                                    <span>{formatPrice(groupTotal)}</span>
                                </div>

                                {lines.map((line) => (
                                    <div
                                        key={line.productId}
                                        className="cart__line"
                                        data-testid="cart-line"
                                        data-product={line.productId}
                                    >
                                        <span className="cart__thumb" aria-hidden="true">
                                            {line.image}
                                        </span>

                                        <div>
                                            <strong>{line.name}</strong>
                                            <p className="note">{formatPrice(line.price)} c/u</p>
                                        </div>

                                        <div className="cart__line-actions">
                                            <div className="stepper">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setQuantity(line.companyId, line.productId, line.quantity - 1)
                                                    }
                                                    aria-label="Quitar una pieza"
                                                >
                                                    -
                                                </button>
                                                <span>{line.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setQuantity(line.companyId, line.productId, line.quantity + 1)
                                                    }
                                                    aria-label="Agregar una pieza"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <strong>{formatPrice(line.price * line.quantity)}</strong>

                                            <button
                                                type="button"
                                                className="link-button"
                                                onClick={() => removeItem(line.companyId, line.productId)}
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                <aside className="summary">
                    <h2>Resumen</h2>
                    
                    <div className="summary__row">
                        <span>Productos</span>
                        <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="summary__row">
                        <span>Envío</span>
                        <span>Se calcula al confirmar</span>
                    </div>
                    <div className="summary__row summary__row--total">
                        <span>Total</span>
                        <span data-testid="cart-total">{formatPrice(subtotal)}</span>
                    </div>

                    <button
                        type="button"
                        className="btn btn--primary btn--block"
                        onClick={() =>
                            setCheckoutMessage("Pendiente: falta integrar la pasarela de pago.")
                        }
                        data-testid="checkout-button"
                    >
                        Continuar con el pago
                    </button>

                    {checkoutMessage && <p className="note">{checkoutMessage}</p>}

                    <p className="note">
                        Cada marca procesa su pedido por separado y te envia su propia guia.
                    </p>
                </aside>
            </section>
        </div>
    );
}

