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
                                defaultValue="gpt-5.6-luna"
                                >
                                <option value="gpt-4.1">gpt-4.1 | input $2.0/1M</option>
                                <option value="gpt-5-mini">gpt-5-mini | input $0.25/1M</option>
                                <option value="gpt-5-nano">gpt-5-nano | input $0.05/1M</option>
                                <option value="gpt-5">gpt-5 | input $1.25/1M</option>
                                <option value="gpt-5.4-mini">gpt-5.4-mini | input $0.75/1M</option>
                                <option value="gpt-5.4-nano">gpt-5.4-nano | input $0.2/1M</option>
                                <option value="gpt-5.4">gpt-5.4 | input $2.5/1M</option>
                                <option value="gpt-5.5">gpt-5.5 | input $5/1M</option>
                                <option value="gpt-5.6-luna">gpt-5.6-luna | input $0.2/1M</option>
                                <option value="gpt-5.6-terra">gpt-5.6-terra | input $2/1M</option>
                                <option value="gpt-5.6-sol">gpt-5.6-sol | input $5/1M</option>
                                {/* Add more model options here if needed */}                                
                            </select> )
                        }
                    </ul>                    
                </div>
            </div>
        </nav>        
    );
}