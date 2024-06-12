"use client";
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import styles from './page.module.css';
import Link from 'next/link';
function Page() {
  const [centroides, setCentroides] = useState(null);
  const [mean, setMean] = useState(null);
  const [scale, setScale] = useState(null);
  const [inputs, setInputs] = useState({ release_year: '', duration: '' });
  const [predictedCluster, setPredictedCluster] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const modelUrl = `${window.location.origin}/model/model.json`;
      try {
        const response = await fetch(modelUrl);
        const data = await response.json();
        console.log('Modelo cargado:', data);
        // Calcular mean y scale a partir de los datos
        setMean([2000, 100]);
        setScale([10, 20]);
        setCentroides(data);
        
      } catch (error) {
        console.error('Error cargando el modelo:', error);
      }
    }
    loadModel();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePredict = async () => {
    if (!mean || !scale || !centroides) {
      console.log('Modelo centroides:', centroides);
        console.log('Modelo mean:', mean);
        console.log('Modelo scale:', scale);
      console.error('Los parámetros del modelo no están cargados aún');
      return;
    }

    const new_data = [parseFloat(inputs.release_year), parseFloat(inputs.duration)];
    if (isNaN(new_data[0]) || isNaN(new_data[1])) {
      console.error('Datos de entrada no válidos:', new_data);
      return;
    }

    // Normalizar los nuevos datos utilizando los parámetros de escalado
    const meanTensor = tf.tensor1d(mean);
    const scaleTensor = tf.tensor1d(scale);
    const new_dataTensor = tf.tensor2d([new_data]);
    const X_new_scaled = new_dataTensor.sub(meanTensor).div(scaleTensor);

    // Calcular las distancias a los centroides
    const centroidesTensor = tf.tensor2d(centroides);
    const distances = tf.norm(X_new_scaled.sub(centroidesTensor), 'euclidean', 1);

    // Obtener el clúster más cercano
    const predictedClusterIndex = distances.argMin().dataSync()[0];
    setPredictedCluster(predictedClusterIndex);
  };

  return (
    <div>
    <div className={styles.card}>
      
      <h1>Netflix Cluster</h1>
      <form>
        <label>
          Año de lanzamiento / Release year:
          <br/>
          <br/>
          <input type="number" name="release_year" value={inputs.release_year} onChange={handleChange} />
        </label>
        <label>
          Duración / duration (minutos/minutes):
          <br/>
          <br/>
          <input type="number" name="duration" value={inputs.duration} onChange={handleChange} />
        </label>
      </form>
      <button type="button" onClick={handlePredict}>Predecir</button>
      {predictedCluster !== null && (
        <h2>The new data belongs to the cluster {predictedCluster}</h2>
      )}
      
    </div>
    
    
    <div className="project-github">
      <p>This project is in </p>
      <Link href="https://github.com/diegoperea20">
        <img width="96" height="96" src="https://img.icons8.com/fluency/96/github.png" alt="github"/>
      </Link>
      <br/>
          <br/>
      <img className={styles.clusterImage}  src="/assets/cluster.png"  alt="cluster"/>
    </div>
    </div>
  );
}

export default Page;