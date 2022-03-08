import { useState } from 'react'
import axios from 'axios'

export default function CsvReader() {
    const [csvFile, setCsvFile] = useState();

    const submitHandler = async(e) => {
        e.preventDefault();
        let formData = new FormData();
        console.log("FILE IS: ", csvFile)
        formData.append('file', csvFile);
        const file = csvFile;

        
        console.log("FORM DATA", formData.get('file'))

       const config={
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       }
       const res=await axios.post('/upload', formData, config)
    //    axios.post('http://localhost:5000/upload', formData, config).then(res => {
    //        console.log(res.data)
    //    })

        // const reader = new FileReader();


        // reader.onload = function (e) {
        //     const text = e.target.result;
        //     console.log(text);
        // }

        // reader.readAsText(file);
    }
    return (
        <form id='csv-form' encType="multipart/form-data" onSubmit={submitHandler}>
            <input
                type='file'
                accept='.csv'
                name='file'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br />
            <button
                type = 'submit'>
                Submit
            </button>
        </form>
    );

}