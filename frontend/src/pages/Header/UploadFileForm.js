import React, { useRef, useEffect, useState } from 'react'
import Card from '../../components/Card';
import Button from '../../components/Button';

const UploadFileForm = () => {

  console.log('Upload Expense Form Rendered');

  const [file, setFile] = useState();
  const drop = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { files } = e.dataTransfer;

    if (files && files.length) {
      setFile(files);
    }
  };

  const handleUpload = (e) => {
    // console.log(file);
  }

  useEffect(() => {
    drop?.current?.addEventListener('dragover', handleDragOver);
    drop?.current?.addEventListener('drop', handleDrop);

    return () => {
      drop?.current?.removeEventListener('dragover', handleDragOver);
      drop?.current?.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
    <>
      <Card>
        <div className='FileDragAndFrop'
          ref={drop}
        >
          <div className='FilesDragAndDrop__area'>
            Hey, drop me some files
            <span
              role='img'
              aria-label='emoji'
              className='area__icon'
            > &nbsp; &#128526;
              <div className='center-div p-10'>
              </div>
            </span>
          </div>
        </div>
        <div>
          <Button
            onClick={handleUpload}
            buttonValue='Add Expenses'
            buttonColor="purple"
            buttonTextColor="white"
          >
          </Button>
        </div>
      </Card>

    </>
  )
}

export default UploadFileForm;
