import '../App.css';
import Papa from 'papaparse';
import { useState } from 'react';
import { saveAs } from 'file-saver';

const Home = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      console.error("No file selected");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed result:", result);

        if (result.errors.length) {
          console.error("Error parsing CSV:", result.errors);
          return;
        }
        
        if (result.data && result.data.length > 0) {
          setData(result.data);
          setHeaders(Object.keys(result.data[0]));
          setIsFileUploaded(true);
        } else {
          console.error("CSV file is empty or has incorrect data");
        }
      },
      error: (error) => {
        console.error("Parsing error:", error.message);
      },
    });
  };

  const handleCellChange = (rowIndex, column, value) => {
    const updatedData = [...data];
    updatedData[rowIndex] = {
      ...updatedData[rowIndex],
      [column]: value,
    };
    setData(updatedData);
  };

  const handleSave = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'edited_data.csv');
  };

  return (
    <div className="App">
      <h2>CSV File Editor</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {isFileUploaded && (
        <div>
          <table border="1">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((column) => (
                    <td key={column}>
                      <input
                        value={row[column] || ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, column, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSave}>Save CSV</button>
        </div>
      )}
    </div>
  );
}

export default Home;
