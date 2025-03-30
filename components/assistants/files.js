import { useState, useEffect } from "react"; 
import axios from "axios";
import { Fragment } from "react";
import FileList from "./filelist";
import FileUpload from "./fileupload";


export default function Files(props) {
    const [fileList, setFileList] = useState(null);
    const [updateFileList, setUpdateFileList] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const responsefilelist = await axios.get('/api/file/listfiles', {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                setFileList(responsefilelist.data.data);
                //console.log(responsefilelist.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFiles();
    }, [ , updateFileList]);

    return (
        <Fragment>
            <FileList filelist={fileList} updateFileList={updateFileList} setUpdateFileList={setUpdateFileList}/>
            <FileUpload updateFileList={updateFileList} setUpdateFileList={setUpdateFileList}/>
        </Fragment>
    );
}