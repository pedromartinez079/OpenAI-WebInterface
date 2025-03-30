import { Modal, Button } from "react-bootstrap";

export default function ModalFileContent (props) {
    const filecontent = props.filecontent;
    const showModalFileContent = props.showModalFileContent;
    const setShowModalFileContent = props.setShowModalFileContent;

    let content = filecontent;
    if (typeof filecontent === 'object' && filecontent !== null) {
      content = JSON.stringify(filecontent);
    }

    return (
        <Modal show={showModalFileContent} onHide={() => setShowModalFileContent(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Contenido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {content && <pre>{content}</pre>}            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalFileContent(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
}

/*
To Do:
- Detect if filecontent is text or an image
- Show content depending on information's type
*/