import React from 'react';
import * as XLSX from 'xlsx';


export const readData = () => {

    const handleFile = (file) => {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
           const bufferArray = e.target.result;
           const wb = XLSX.read(bufferArray, {type: 'buffer'});

           const wsname = wb.SheetNames[0];
           const ws = wb.Sheets[wsname];

           const data = XLSX.utils.sheet_to_json(ws);
           resolve(data);

        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((d) => {
        console.log(d);
      })
    }

    return (
        <div style={{ border: "double" }}>
            <input type="file" onChange={ (e) => {
              const file = e.target.files[0];

              handleFile(file);

            } } ></input>
        </div>
    )
}


