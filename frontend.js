// frontend.js

async function fetchConfiguration() {
  const configId = document.getElementById('configId').value;

  try {
    const response = await fetch(`http://localhost:8080/api/configurations/${configId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch configuration: ${response.statusText}`);
    }

    const data = await response.json();

    // Update the output div with the retrieved data
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = JSON.stringify(data);
  } catch (error) {
    console.error(error);
    // Handle errors, e.g., display an error message
  }
}

async function updateConfiguration() {
  const updateConfigId = document.getElementById('updateConfigId').value;
  const remark = document.getElementById('remark').value;

  try {
    const response = await fetch(`http://localhost:8080/api/configurations/${updateConfigId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remark }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update configuration: ${response.statusText}`);
    }

    const result = await response.json();
    // Handle the result, e.g., show a success message
    console.log(result);
  } catch (error) {
    console.error(error);
    // Handle errors, e.g., display an error message
  }
}
