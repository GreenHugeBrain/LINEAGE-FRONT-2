document.addEventListener("DOMContentLoaded", async () => {
    // Fetch stream data from the backend API
    const streamResponse = await fetch('https://lineage-api.onrender.com/api/url');
    if (streamResponse.ok) {
        const streamData = await streamResponse.json();
        console.log('Fetched streams:', streamData); // Debugging step

        const streamsContainer = document.querySelector('#streams-container'); // Correcting selector

        // Loop through the stream URLs and create iframe elements
        streamData.url.forEach((stream) => {  // Assuming the stream data has a 'url' field
            const streamUrl = stream.link; // Assuming the URL is in the 'link' field of the response

            // Create the new stream card div structure
            const streamCardDiv = document.createElement('div');
            streamCardDiv.classList.add('col-lg-4', 'col-md-6');

            const cardContentDiv = document.createElement('div');
            cardContentDiv.classList.add('stream-card');

            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.classList.add('stream-thumbnail');

            // Create the LIVE badge
            const liveBadge = document.createElement('span');
            liveBadge.classList.add('stream-live-badge');
            liveBadge.textContent = 'LIVE';

            // Create the iframe element
            const iframe = document.createElement('iframe');
            iframe.width = '100%';
            iframe.classList.add('rounded');
            iframe.height = '335';
            iframe.src = `https://www.youtube.com/embed/${streamUrl}`; // Embed the stream URL
            iframe.frameborder = '0';
            iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            // Append elements
            thumbnailDiv.appendChild(liveBadge); // Append the live badge
            thumbnailDiv.appendChild(iframe); // Append the iframe to the thumbnail div

            cardContentDiv.appendChild(thumbnailDiv); // Append the thumbnail to the card content div
            streamCardDiv.appendChild(cardContentDiv); // Append the card content to the stream card div

            streamsContainer.appendChild(streamCardDiv); // Add the stream card to the container
        });
    } else {
        console.error('Failed to fetch streams');
    }
});
