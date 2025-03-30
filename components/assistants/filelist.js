import axios from "axios";
import { useState } from "react";
import ModalFileInformation from "../layout/modalfileinformation";
import ModalFileContent from "../layout/modalfilecontent";
import { Fragment } from "react";

export default function FileList(props) {
    const [showModalFileInfo, setShowModalFileInfo] = useState(false);
    const [fileInfo, setFileInfo] = useState(null);
    const [showModalFileContent, setShowModalFileContent] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const filelist = props.filelist;
    const updateFileList = props.updateFileList;
    const setUpdateFileList = props.setUpdateFileList;
    let files = [];

    const onRetrieve = async (fileid) => {
        //console.log('Retrieve file', fileid);        
        try{
            const responseretrievefile = await axios.post('/api/file/retrievefile', {fileid: fileid},
            {
                headers: {'Content-Type': 'application/json',},
            });
            //console.log(responseretrievefile.data);
            setFileInfo(responseretrievefile.data);
            setShowModalFileInfo(true);
        } catch (error) {
            console.log('Retrieve file failed' + error);
        }
    };

    const onDisplay = async (fileid) => {
        //console.log('Show file content', fileid);
        try{
            const responseretrievecontent = await axios.post('/api/file/retrievefilecontent', {fileid: fileid},
            {
                headers: {'Content-Type': 'application/json',},
            });
            //console.log(responseretrievecontent.data);
            setFileContent(responseretrievecontent.data);
            setShowModalFileContent(true);
        } catch (error) {
            console.log('Retrieve file content failed ' + error);
        }
    };

    const onDelete = async (fileid) => {
        //console.log('Delete file', fileid);
        try{
            const responsedeletefile = await axios.post('/api/file/deletefile', {fileid: fileid},
            {
                headers: {'Content-Type': 'application/json',},
            });
            setUpdateFileList(!updateFileList);
            //console.log(responsedeletefile.data);
        } catch (error) {
            console.log('Delete file failed' + error);
        }
    };

    if (filelist !== null) {
        filelist.map((f) => {
            let id = f.id;
            let name = f.filename;
            files.push({id: id, name: name});
        });
    }

    return (
      <Fragment>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Archivo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={file.id}>
                <th scope="row">{index + 1}</th>
                <td>{file.name}</td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm me-2" 
                    onClick={() => onRetrieve(file.id)}>
                    Información
                  </button>
                  <button 
                    className="btn btn-primary btn-sm me-2" 
                    onClick={() => onDisplay(file.id)}>
                    Contenido
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => onDelete(file.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ModalFileInformation 
          fileinformation={fileInfo} showModalFileInfo={showModalFileInfo} 
          setShowModalFileInfo={setShowModalFileInfo}
        />
        <ModalFileContent
          filecontent={fileContent} showModalFileContent={showModalFileContent} 
          setShowModalFileContent={setShowModalFileContent}
        />
      </Fragment>
      );
}