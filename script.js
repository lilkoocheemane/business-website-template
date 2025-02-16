// Fetch Google Sheets Data
async function fetchData() {
  // Replace this URL with your published Google Sheet link
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSdShEUVJzKieRYgX6fK1twiNkt1HBoxuabieN8w2R_v4DumvMpSeUOVCG4yH8DT9z-TPTEuqlN90o/pubhtml';
  
  try {
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Remove header row

    // Loop through each row and process the data
    rows.forEach(row => {
      const [businessName, location, phone, reviews] = row.split(',');

      // Log the data to the console (for testing)
      console.log({
        businessName,
        location,
        phone,
        reviews
      });

      // You can now use this data to dynamically update your website
      // For example, update the business name in the header:
      const header = document.getElementById('header');
      if (header) {
        header.querySelector('h1').textContent = businessName;
      }

      // Update the phone number in the "Call Us Now" button:
      const callButton = document.querySelector('.cta-buttons button[onclick*="tel:"]');
      if (callButton) {
        callButton.setAttribute('onclick', `tel:${phone}`);
      }

      // Update the reviews section:
      const reviewsSection = document.getElementById('google-reviews');
      if (reviewsSection) {
        reviewsSection.innerHTML = `<iframe src="${reviews}" width="100%" height="500px"></iframe>`;
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to fetch and display data
fetchData();
