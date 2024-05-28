const fileInput = document.getElementById('fileInput');
const combineButton = document.getElementById('combineButton');
const combinedData = document.getElementById('combinedData');

combineButton.addEventListener('click', async () => {
  const files = fileInput.files;
  const combinedDataArray = [];

  // Loop through each selected file
  for (const file of files) {
    const textData = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });

    // Parse CSV data using Papa Parse
    const parsedData = Papa.parse(textData).data;

    // Combine parsed data from each file into a single array
    combinedDataArray.push(...parsedData);
  }

  // Clear existing data in the table (optional)
  combinedData.innerHTML = '';

  // Optional: Create table header row (if headers are present)
  // ... (same logic as before)

  // Function to download combined data as CSV
  const downloadCombinedData = (data) => {
    const csvContent = Papa.unparse(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'combined_data.csv');
  };

  // Combine Button functionality
  if (combinedDataArray.length > 0) {
    // Display combined data in the table (optional)
    // ... (same logic as before to create rows/cells)

    // Add functionality to download button (optional)
    combineButton.textContent = 'Combine & Download';
    combineButton.addEventListener('click', () => downloadCombinedData(combinedDataArray));
  } else {
    alert('No CSV files selected!');
  }
});
