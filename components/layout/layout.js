import React, { Fragment, useState } from "react";

import NavBar from './navbar';
import Footer from './footer';

export default function Layout(props) {
    const [selectedValue, setSelectedValue] = useState('gpt-4o');
        
    return(
        <Fragment>
            <NavBar title={props.title} setSelectedValue={setSelectedValue}/>
            <main>{/*props.children*/}{React.cloneElement(props.children, { selectedValue })}</main>
            <Footer />
        </Fragment>
    );
}