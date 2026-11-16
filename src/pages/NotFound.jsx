import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="container">
            <div className="empty-state" data-testid="not-found">
                <span className="empty-state__icon" aria-hidden="true">
                    ⏱️
                </span>
                <h1>No encontramos esta pagina</h1>
                <p>La tienda o el producto que buscas ya n o está disponible.</p>
                <Link className="btn btn-primary" to="/">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}