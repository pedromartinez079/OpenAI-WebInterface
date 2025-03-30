import { Modal, Button } from "react-bootstrap";

export default function ModalFileInformation (props) {
    const fileinformation = props.fileinformation;
    const showModalFileInfo = props.showModalFileInfo;
    const setShowModalFileInfo = props.setShowModalFileInfo;
    const convertToDate = (ts) => {
        const date = new Date(Number(ts) * 1000);
        const formattedDate = date.toLocaleString();
        return(formattedDate);
      };

    // console.log(showModalFileInfo);

    return (
        <Modal show={showModalFileInfo} onHide={() => setShowModalFileInfo(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Información</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {fileinformation && <pre>Nombre: {fileinformation.filename}</pre>}
            {fileinformation && <pre>id: {fileinformation.id}</pre>}
            {fileinformation && <pre>Fecha: {convertToDate(fileinformation.created_at)}</pre>}
            {fileinformation && <pre>Origen: {fileinformation.purpose}</pre>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModalFileInfo(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    );
}