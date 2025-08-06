import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import hljs from 'highlight.js'; 
import 'highlight.js/styles/github.css';
import MarkdownIt from 'markdown-it';

const MessagesDiv = ({ messages }) => {
	const copyToClipboard = (text) => {
    	const textarea = document.createElement('textarea');
    	textarea.value = text;
    	document.body.appendChild(textarea);
    	textarea.select();
    	document.execCommand('copy');
    	document.body.removeChild(textarea);
	};

	const handleClick = (text) => {			
		const md = new MarkdownIt({ highlight: function (str, lang) { 
			if (lang && hljs.getLanguage(lang)) { 
				try { return `<pre class="hljs"><code>${hljs.highlightElement(lang, str, true).value}</code></pre>`; } 
				catch (__) {} } 
			return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`; 
			} 
		});
		
		const htmlContent = md.render(text);
		//console.log(htmlContent);
		const newWindow = window.open('', '_blank'); 
		if (newWindow) { 				 
			newWindow.document.write(` 
				<!DOCTYPE html>
				<html lang="es">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Text, Code & Markdown Snippets</title>
					<!-- Esto es opcional: Incluye el estilo CSS de highlight.js para los snippets -->
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
					<style>
						body {
							font-family: "monaco", monospace;
							line-height: 1.6;
						}
						h1, h2, h3 {
							color: #333;
						}
						p {
							margin-bottom: 1em;
						}
						pre {
							background-color: #f5f5f5; /* Fondo claro para el área del código */
							padding: 10px; /* Espaciado interno */
							border-radius: 4px; /* Bordes redondeados */
							overflow-x: auto; /* Desplazamiento horizontal para líneas largas */
						}
						code {
							font-family: 'Courier New', Courier, monospace; /* Fuente monoespaciada */
							color: #2977c7; /* Color del texto del código */
						}
						.hljs {
							background: #f5f5f5; /* Fondo del código resaltado */
							color: #21209d; /* Color primario del texto */
						}
					</style>
				</head>
				<body>
					<h3># OpenAI ChatGPT #</h3>
					<div id="content">
						<!-- Aquí insertarías el resultado HTML generado por markdown-it -->
						${htmlContent}
					</div>
					<!-- Opcional: Incluye highlight.js para aplicar resalte de sintaxis -->
					<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
					<script>hljs.highlightAll();</script>
				</body>
				</html>					
			`); 
			newWindow.document.close(); 
		}
	};
	
	const divRef = useRef(null);
	
	useEffect(() => { 
		if (divRef.current) { 
			divRef.current.scrollTop = divRef.current.scrollHeight; } 				
	}, [messages]); 
	
	if (messages !== null) {			
		if (messages.some(obj => 'id' in obj)) {
			console.log('Thread messages');
			let newMessages = [];
			messages.map((msg) => {
				let role = msg.role;
				let content = msg.content[0].text.value;
				let newMsg = {role: role, content: content};
				newMessages.push(newMsg);
			});
			messages = newMessages.reverse();
			console.log(messages);
		} else {console.log('ChatGPT messages or empty Thread messages');}
	} else {return(<div>Lista de mensajes vacía</div>);}
	
	return ( 
		<div ref={divRef} className="chat-container border border-primary px-3 py-1 my-2" style={{ height: '370px', overflowY: 'scroll', padding: '10px', borderRadius: '10px' }}>
			{messages.map((msg, index) => ( 
				<div 
					onDoubleClick={msg.url === undefined ? () => handleClick(msg.content) : () => {}} 
					key={index} 
					className={msg.role === 'user' ? 'chat-bubble user' : 'row chat-bubble openai'} 
					style={{ 
						cursor: msg.url === undefined ? 'pointer' : '', 
						marginBottom: '10px', display: 'flex', 
						justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
					}} > 
					<div 
						className="chat-content" role="region" aria-live="polite"
						style={{ 
							backgroundColor: msg.role === 'user' ? '#a5fafc' : '#edf3f3', 
							padding: '8px', borderRadius: '10px', maxWidth: '85%' 
						}}> 
						<strong style={{ color: '#555' }}>{msg.role === 'user' ? '' : ''}</strong>
						<pre className="form-control-plaintext " id="msg-content" style={{ minHeight: '2rem', whiteSpace: "pre-wrap", wordBreak: "break-word", overflowX: "auto", fontSize: '1rem', lineHeight: '1.5'}}>
							{msg.content}
						</pre>
						{msg.role === 'user' ? null :
						<button 
							className="btn btn-outline-secondary btn-sm"
							aria-label="Copiar al portapapeles"
							onClick={() => copyToClipboard(msg.content)}
						>
							<i className="bi bi-clipboard"></i>
						</button>
						}
					</div> 						
					{!(msg.url === undefined) && (
						<div className='chat-url my-2' style={{ position: 'relative', width: '160px', height: '120px' }}>
							<a href={ msg.url === undefined ? '#' : msg.url} target="_blank">
							<Image
								src={ msg.url === undefined ? '#' : msg.url} // Ruta de la imagen
								alt="Dall-E Image" // Descripción para accesibilidad
								/*layout="responsive"
								width={10}  Ancho deseado
								height={10}  Alto deseado */
								fill
								sizes="(max-width: 160px) 100vw, 100px"
							/>
							</a>
						</div> 
						) 
					}																
				</div> 
				)
			)} 
		</div> 
	)
}; 
export default MessagesDiv;

/*
Messages for last render:
messages = [{role:"user", content:"hi!"}, {role:"user", content:"hello!"}]
*/