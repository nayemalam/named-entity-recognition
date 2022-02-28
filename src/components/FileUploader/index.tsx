import React from 'react'

const FileUploader = ({ setTransactions }: any) => {
  const [file, setFile] = React.useState<string | ArrayBuffer>('')

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const text = e.target.result
      setFile(text)
    }

    reader.readAsText(file)
  }

  React.useEffect(() => {
    if (file) {
      const transactions = (file as string)
        .split('\n')
        .filter((line) => line.length > 0)
      setTransactions(transactions)
    }
  }, [file])

  return (
    <div style={{ width: '90vw', display: 'grid' }}>
      <label htmlFor="file-uploader">
        Upload a text file to begin, supported extensions:{' '}
        <span
          style={{
            width: '80px',
            fontSize: '12px',
            fontFamily: 'Circular-Loom',
            padding: '0 5px',
          }}
        >
          .txt
        </span>
      </label>
      <input
        type="file"
        id="file-uploader"
        className="file-uploader"
        onChange={onFileUpload}
        accept=".txt"
        style={{ marginTop: 10, width: 200 }}
      />
    </div>
  )
}

export default FileUploader
