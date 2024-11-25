// import React, { useState, useRef } from 'react';
// import axios from 'axios';

//  const Scanner = () =>  {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [imageData, setImageData] = useState(null);

//     const startCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             videoRef.current.srcObject = stream;
//         } catch (error) {
//             console.error("Camera Access Error ", error);
//             throw(error);
//         }
//     }

//     const captureImage = () => {
//         const canvas = canvasRef.current;
//         const video = videoRef.current;

//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         const context = canvas.getContext('2d');
//         context.drawImage(video, 0, 0, canvas.width, canvas.height);
//         const dataUrl = canvas.toDataURL('image/png');
//         setImageData(dataUrl);
//     }

//     const uploadImage = async () => {
//         if (imageData) {
//             const blob = await (await fetch(imageData)).blob();
//             const formData = new FormData();

//             formData.append('file', blob, 'scan.png');

//             try {
//                 const response = await axios.post("http://localhost:3001/api/verify", formData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//             } catch (error) {
//                 console.error("Upload Error ", error);
//                 throw(error);
//             }
//         }
//     }

//   return (
//     <div>
//       <button className="mt-2 sm:mt-0 bg-green-600 text-white py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1 w-full sm:w-auto text-xs sm:text-sm" onClick={startCamera}>Open Camera</button>
//       <video ref={videoRef} autoPlay></video>
//       <button className="mt-2 sm:mt-0 bg-red-600 text-white py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-1 w-full sm:w-auto text-xs sm:text-sm" onClick={captureImage}>Capture</button>
//       <canvas className="mt-2 block w-full p-2 border rounded mb-4" ref={canvasRef} style={{ display: 'none' }}></canvas>
//       {imageData && (
//         <>
//             <img src={imageData} />
//             <button onClick={uploadImage}>Upload Image</button>
//         </>
//       )}
//     </div>
//   )
// }

// export default Scanner
