import { useState } from "react";

import FilePreview from "./FilePreview";

const FileUpload = ({activeDetails, setActiveDetails}) => {
  const [fileList, setFileList] = useState([]);
  const fileHandler = (e) => {        
    let files = [];
    Object.values(e.target.files).forEach(element => {
      files.push(element);
    });

    if(files.length > 0) {
      setFileList(files);
      setActiveDetails({...activeDetails, attachments: [...files]})
    };  
  };

  return (
    <div>
      <FilePreview fileList={fileList} />
      <input
        multiple
        type="file"
        onChange={fileHandler}
      />
    </div>
  );
};

export default FileUpload;

