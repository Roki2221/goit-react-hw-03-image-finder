import axios from 'axios';

async function servicePhotos(request, page) {
  try {
    // Replace the following line to actually update the request string
    request = request.split(' ').join('+');

    const response = await axios.get(
      `https://pixabay.com/api/?key=40085171-b4834c19132777055d535b782&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`
    );

    if (response.data.hits.length < 1) {
      throw new Error('Sorry, nothing found.');
    }

    return response;
  } catch (error) {
    console.error('Error fetching photos:', error.message);
    throw error;
  }
}

export { servicePhotos };
