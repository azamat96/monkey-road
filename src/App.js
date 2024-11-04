import React, {useRef, useEffect, useState} from 'react';
import map from './assets/images/map.png'
import chempi from './assets/images/chempi.png'
import point2 from './assets/images/point_2.png'
import {roadToPoint2} from "./helpers/constants";
import {drawRoad, size} from "./helpers/utils";

function App() {
  const canvasRef = useRef(null);
  const imgMapRef = useRef(null)
  const imgChempiRef = useRef(null)
  const imgPoint2Ref = useRef(null)
  const [isImagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    const imageRefs = [imgMapRef, imgChempiRef, imgPoint2Ref]
    let loadedCount = 0
    const onloadImages = () => {
      loadedCount++
      if (imageRefs.length === loadedCount) {
        setImagesLoaded(true)
      }
    }
    imageRefs.forEach((ref) => {
      if (ref.current?.complete) {
        onloadImages()
      } else {
        ref.current.onload = onloadImages
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current;
    const imgMap = imgMapRef.current
    const imgChempi = imgChempiRef.current
    const imgPoint2 = imgPoint2Ref.current
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = size();
    ctx.canvas.height = size();

    if (isImagesLoaded) {
      ctx.drawImage(imgMap, 0, 0, window.innerWidth, window.innerWidth);
      ctx.drawImage(imgChempi, size(0.63), size(0.9), size(0.06), size(0.06));
      ctx.drawImage(imgPoint2, size(0.48) - size(0.0368)/2, size(0.85) - size(0.0368)/4, size(0.0368), size(0.0368)/2);
    }

    drawRoad(ctx, roadToPoint2)

    const drawPoint = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      console.log(Math.round(x*100/size())/100, Math.round(y*100/size())/100)
      ctx.fillStyle = 'green';
      ctx.fill();
    };

    // Add the event listener
    canvas.addEventListener('mousedown', drawPoint);

    // Clean up function
    return () => {
      canvas.removeEventListener('mousedown', drawPoint);
    };
  }, [isImagesLoaded]);

  return (
      <>
        <canvas ref={canvasRef} />
        <img ref={imgMapRef} src={map} style={{display: "none"}} alt='map'/>
        <img ref={imgChempiRef} src={chempi} style={{display: "none"}} alt='chempi'/>
        <img ref={imgPoint2Ref} src={point2} style={{display: "none"}} alt='point2'/>
      </>
  );
}

export default App;