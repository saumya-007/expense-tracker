import React from 'react'

export const FileUpload = (props) => {
    const handler = props.handler;
    const onUpload = props.onUpload;

    return (
        <>
            <input type="file" onChange={handler} />
            <button onClick={onUpload}>
                Upload Excel
            </button>
        </>
    )
}
