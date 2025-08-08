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
                                <option value="gpt-4o">gpt-4o | input $2.50/1M</option>
                                <option value="gpt-4o-mini">gpt-4o-mini | input $0.15/1M</option>
                                <option value="gpt-4o-mini-search-preview">gpt-4o-mini-search-preview | input $0.15/1M</option>
                                <option value="gpt-4o-search-preview">gpt-4o-search-preview | input $2.50/1M</option>
                                <option value="gpt-4-turbo">gpt-4-turbo | input $10/1M</option>
                                <option value="gpt-4.1">gpt-4.1 | input $2.0/1M</option>
                                <option value="gpt-4.1-mini">gpt-4.1-mini | input $0.4/1M</option>
                                <option value="gpt-4.1-nano">gpt-4.1-nano | input $0.1/1M</option>
                                <option value="gpt-5">gpt-5 | input $1.25/1M</option>
                                <option value="gpt-5-mini">gpt-5-mini | input $0.25/1M</option>
                                <option value="gpt-5-nano">gpt-5-nano | input $0.05/1M</option>
                                <option value="o1">o1 | input $15/1M</option>                                
                                {/*<option value="o1-mini">o1-mini (deprecated)</option>
                                <option value="o1-preview">o1-preview (deprecated)</option>
                                <option value="o1-pro">o1-pro | input $150/1M</option>
                                <option value="o3">o3 | input $2/1M</option> Verify ID Organization for o3*/}
                                <option value="o3-mini">o3-mini | input $1.10/1M</option>
                                <option value="o4-mini">o4-mini | input $1.10/1M</option>                                
                            </select> )
                        }
                    </ul>                    
                </div>
            </div>
        </nav>        
    );
}