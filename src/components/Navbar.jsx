import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { totalItems } = useCart();

    return (
        <header className="navbar">
            <div className="container navbar__inner">
                <Link to="/" className="brand" data-testid="brand-logo">
                    <img src="/logo-posdata.svg" alt="Posdata" className="brand__logo"/>                    
                </Link>            

                <nav className="navbar__links">
                    <NavLink to="/" end className="navbar__link">
                        Tiendas
                    </NavLink>
                    <NavLink to="/carrito" className="navbar__cart" data-testid="cart-link">
                        Carrito
                        {totalItems > 0 && (
                            <span className="badge" data-testid="cart-count">
                                {totalItems}
                            </span>
                        )}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}