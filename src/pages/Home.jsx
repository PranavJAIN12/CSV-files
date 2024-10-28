import '../App.css'

const Home = () => {
  return (
    <div className="app">
    <h2>CSV File Editor</h2>
    
    {/* File Upload */}
    <input type="file" accept=".csv" />

    {/* Table to display CSV content */}
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
            <th>Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Col 1</td>
            <td>Row 1, Col 2</td>
            <td>Row 1, Col 3</td>
          </tr>
          <tr>
            <td>Row 2, Col 1</td>
            <td>Row 2, Col 2</td>
            <td>Row 2, Col 3</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Download Button */}
    <button>Download CSV</button>
  </div>
  )
}

export default Home
