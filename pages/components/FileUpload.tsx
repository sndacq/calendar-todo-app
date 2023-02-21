import { useState, FC, Dispatch } from 'react';

import FilePreview from './FilePreview';
import { IActiveDetails } from '../../utils/types';

interface IFileUploadProps {
  activeDetails: IActiveDetails;
  setActiveDetails: Dispatch<IActiveDetails>;
}

const FileUpload: FC<IFileUploadProps> = ({ activeDetails, setActiveDetails }) => {
  const [fileList, setFileList] = useState([]);
  const fileHandler = (e) => {
    const files = [];
    Object.values(e.target.files).forEach((element) => {
      files.push(element);
    });

    if (files.length > 0) {
      setFileList(files);
      setActiveDetails({ ...activeDetails, attachments: [...files] });
    }
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
