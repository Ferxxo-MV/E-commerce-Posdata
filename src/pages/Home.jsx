import CompanyCard from "../components/CompanyCard.jsx";
import { companies } from "../data/companies.js";

export default function Home() {
    return (
        <>
            <section className="hero">
                <div className="container hero__inner">
                    <span className="hero__eyebrow">Posdata • Tienda E-comerce</span>
                    <h1 className="hero__title">
                        Las marcas que ya venden en Posdata
                    </h1>
                    <p className="hero__subtitle">
                        Elige una tienda y entra directo a su catalogo. Cada marca maneja su propio inventario, sus precioos y sus envios.
                    </p>
                    <div className="hero__actions">
                        <a className="btn btn--primary" href="#tiendas">
                            Ver tiendas
                        </a>
                        <a className="btn btn--ghost" href="#negocios">
                            Quiero mi tienda
                        </a>
                    </div>
                </div>
            </section>

            <section id="tiendas" className="section">
                <div className="container">
                    <header className="section__header">
                        <h2>Tiendas disponibles</h2>
                        <p>{companies.length} marcas con tienda activa</p>
                    </header>

                    <div className="grid grid--companies" data-testid="companies-grid">
                        {companies.map((company) => (
                            <CompanyCard key={company.id} company={company} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="negocios" className="section">
                <div className="container">
                    <div className="cta">
                        <div className="cta__text">
                            <h2>¿Tienes un negocio?</h2>
                            <p>
                                Publicamos tu catalogo, tus formas de pago y tus envios en una tienda con tu marca.
                            </p>
                        </div>
                        <div className="contact">
                            <span className="contact__label">Contacto</span>

                            <ul className="contact__list">
                                <li className="contact__item">
                                    <span className="contact__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
                                            <path d="m3 7 8.3 5.5a1.5 1.5 0 0 0 1.4 0L21 7" />
                                        </svg>
                                    </span>
                                    <a href="mailto:ventas@bigdata-latam.com">ventas@bigdata-latam.com</a>
                                </li>

                                <li className="contact__item">
                                    <span className="contact__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 7.2 2 2 0 0 1 6.5 3Z" />
                                        </svg>
                                    </span>
                                    <a href="tel:+523330311572">(33) 3031-1572</a>
                                </li>

                                <li className="contact__item">
                                    <span className="contact__icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
                                            <circle cx="12" cy="10.5" r="2.6" />
                                        </svg>
                                    </span>
                                    <address>
                                        Calzada Central 250 Col. Ciudad Granja
                                        <br />
                                        Zapopan, Jal. C.P. 45010
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

