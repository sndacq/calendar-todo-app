import styles from '../../styles/Home.module.css';

const FilePreview = ({ fileList = [] }) => {
  const videoRegex = /video\/.*/g;
  const imageRegex = /image\/.*/g;

  return (
    <>
      {fileList.map((file, key) => {
        const { type, name } = file;
        const data = URL.createObjectURL(file);
        return (
          <div key={key} className={styles.filePreview}>
            <h2>{name}</h2>
            {type.match(videoRegex) && (
              <video width="400" controls>
                <source src={data} type={type}/>
                Your browser does not support HTML5 video.
              </video>
            )}
            {type.match(imageRegex) && (
              <img src={data} alt={name} />
            )}
          </div>
        )
      })}
    </>
  )
};

export default FilePreview;