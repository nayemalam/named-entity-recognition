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
      <label htmlFor="file-uploader">Upload a text (.txt) file to begin</label>
      <input
        type="file"
        id="file-uploader"
        className="file-uploader"
        onChange={onFileUpload}
        accept=".txt"
        style={{ marginTop: 10 }}
      />
    </div>
  )
}

export default FileUploader
