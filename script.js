// Fetch Google Sheets Data
async function fetchData() {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSdShEUVJzKieRYgX6fK1twiNkt1HBoxuabieN8w2R_v4DumvMpSeUOVCG4yH8DT9z-TPTEuqlN90o/pub?output=csv';
  const response = await fetch(sheetUrl);
  const data = await response.text();
  const rows = data.split('\n').slice(1); // Remove header row

  rows.forEach(row => {
    const [
      fullAddress, borough, street, city, zipCode, state, country, latitude, longitude, h3, timeZone, plusCode,
      areaService, workingHours, workingHoursOld, otherHours, popularTimes, businessStatus, about, range, posts,
      description, typicalTimeSpent, verified, ownerId, ownerTitle, ownerLink, reservationLinks, bookingLink,
      menuLink, orderLinks, locationLink, reviewsLink, placeId, googleId, cid, kgmid, reviewsId, locatedGoogleId,
      category, type, outscraperQuery
    ] = row.split(',');

    // Populate the template with data
    const template = document.getElementById('template').innerHTML;
    const rendered = template
      .replace(/{{businessName}}/g, about || description)
      .replace(/{{fullAddress}}/g, fullAddress)
      .replace(/{{city}}/g, city)
      .replace(/{{state}}/g, state)
      .replace(/{{phone}}/g, '123-456-7890') // Replace with actual phone if available
      .replace(/{{description}}/g, description)
      .replace(/{{reviewsLink}}/g, reviewsLink)
      .replace(/{{services}}/g, category || type);

    // Append the rendered HTML to the body
    document.body.innerHTML += rendered;
  });
}

fetchData();
