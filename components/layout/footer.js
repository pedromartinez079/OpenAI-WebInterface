import Link from "next/link";

export default function Footer(props) {    
    return(
        <footer>
            <div className="d-flex bg-primary text-white text-center p-2">
                <div className="container col-sm-6 text-center">
                    &copy;<span id="year"> </span><span> Regulus EIRL 2024</span>
                </div>
                <div className="container col-sm-6 text-center">
                    <span>Diseño: <Link style={{color:'white'}} href="https://www.linkedin.com/in/pedro-martinezlr/?locale=en_US">Pedro L. Martinez La Rosa</Link></span>
                </div>
            </div>
        </footer>
    );
}