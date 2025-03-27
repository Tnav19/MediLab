const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = ['public/patients', 'public/doctors'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to download image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

// Images to download (using reliable URLs from UI Faces)
const images = [
  {
    url: 'https://i.pravatar.cc/300?img=1',
    path: 'public/patients/duncan-pitt.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=2',
    path: 'public/patients/mary-weather.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=3',
    path: 'public/patients/matthew-abel.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=4',
    path: 'public/patients/gill-hames.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=5',
    path: 'public/patients/finn-mcdonald.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=6',
    path: 'public/patients/donna-summer.jpg'
  },
  {
    url: 'https://i.pravatar.cc/300?img=7',
    path: 'public/doctors/dr-kawasaki.jpg'
  }
];

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.path)))
  .then(() => console.log('All images downloaded successfully'))
  .catch(err => console.error('Error downloading images:', err)); 