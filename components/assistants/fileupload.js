import { useState } from "react";

export default function FileUpload(props) {
    const updateFileList = props.updateFileList;
    const setUpdateFileList = props.setUpdateFileList;
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        // console.log(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('fileobj', file);
            formData.append('purpose', 'assistants');
            // console.log(formData);

            try {
                const responseuploadfile = await fetch('/api/file/uploadfile', {
                    method: 'POST',
                    body: formData,
                });
                if (!responseuploadfile.ok) {
                    throw new Error('Failed to upload file');
                }
                const data = await responseuploadfile.json();
                //console.log(data);
                setUpdateFileList(!updateFileList);
            } catch (error) {
                console.log('Upload file failed: ' + error);
            }            
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mx-3">
                    <input 
                    type="file" 
                    className="form-control" 
                    onChange={handleFileChange} 
                    />
                </div>
            </form>
            <div className="mb-3 mx-3">
                <button type="submit" className="my-1 btn btn-success" onClick={handleSubmit}>
                    Upload
                </button>
            </div>
        </div>
    );
}