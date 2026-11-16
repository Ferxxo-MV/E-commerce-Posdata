export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span>@ {new Date().getFullYear()} Posdata • Todos los derechos reservados</span>
                <span>Hecho en Mexico</span>
            </div>
        </footer>
    );
}