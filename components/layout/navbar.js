import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavBar(props) {
    const [isChatPage, setIsChatPage] = useState(false);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        props.setSelectedValue(value);
        if (value=="Seleccionar modelo") {props.setSelectedValue("gpt-4o");}
      };

    useEffect(() => {
        setIsChatPage(window.location.pathname === '/chat');
      }, []);
    
    return(        
        <nav className="navbar navbar-expand-lg bg-primary justify-content-center">
            <div className="container-fluid">
                <a className="navbar-brand main-heading fs-4 text-white" href="/">
                    <strong>{props.title}</strong>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon navbar-dark"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Enlaces
                            </a>
                            <ul className="dropdown-menu">
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'/'}>Inicio</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'/chat'}>Chat GPT</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'/dalle'}>Dall-E</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'/assistants'}>Asistentes</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'/response'}>Respuestas IA</a></li>
                                <li><hr className="dropdown-divider" /></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Acerca de ...
                            </a>
                            <ul className="dropdown-menu">
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href={'#'}>&copy; Regulus EIRL 2024</a></li>
                                <li><span className="dropdown-item"><Link href="https://www.linkedin.com/in/pedro-martinezlr/?locale=en_US">Pedro L. Martinez La Rosa</Link></span></li>
                                <li><hr className="dropdown-divider" /></li>
                            </ul>
                        </li>
                        { isChatPage && (
                            <select className="form-select mx-2 bg-primary text-white" 
                                onChange={handleSelectChange} 
                                aria-label="Selección de modelo para ChatGPT"
                                defaultValue="gpt-4.1"
                                >
                                <option value="gpt-4o">gpt-4o</option>
                                <option value="gpt-4o-mini">gpt-4o-mini</option>
                                <option value="gpt-4o-mini-search-preview">gpt-4o-mini-search-preview</option>
                                <option value="gpt-4o-search-preview">gpt-4o-search-preview</option>
                                <option value="gpt-4-turbo">gpt-4-turbo</option>
                                <option value="gpt-4.1">gpt-4.1</option>
                                <option value="gpt-4.1-mini">gpt-4.1-mini</option>
                                <option value="gpt-4.1-nano">gpt-4.1-nano</option>
                                <option value="o1">o1</option>                                
                                {/*<option value="o1-mini">o1-mini (deprecated)</option>
                                <option value="o1-preview">o1-preview (deprecated)</option>
                                <option value="o1-pro">o1-pro (costo alto)</option>*/}
                                <option value="o3-mini">o3-mini</option>                                
                            </select> )
                        }
                    </ul>                    
                </div>
            </div>
        </nav>        
    );
}