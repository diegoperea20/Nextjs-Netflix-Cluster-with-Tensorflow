# Nextjs Netflix Cluster with Tensorflow

<p align="justify">
Nextjs Netflix Cluster with Tensorflow converting a kmeans cluster  model to tensorflowjs that is .json 
</p>

The training and dataset are in this IPynb public\model\netflix_clustering.ipynb

the dataset is in this repository [clustering-data](https://github.com/diegoperea20/clustering-data/blob/main/netflix_titles.csv.zip)

<p align="center">
  <img src="README-images/homeclusterr.PNG" alt="Step1">
</p>
<p align="center">
  <img src="README-images/partone.PNG" alt="Step2">
</p>
<p align="center">
  <img src="README-images/cluster.png" alt="Step3">
</p>
<p align="center">
  <img src="README-images/parttwo.PNG" alt="Step4">
</p>
<p align="center">
  <img src="README-images/parthree.PNG" alt="Step5">
</p>

<p align="center">
  <img src="README-images/partfour.PNG" alt="Step5">
</p>
<p align="center">
  <img src="README-images/partfive.PNG" alt="Step5">
</p>


----
Convert kmeans cluster  to Tensorflowjs in ipynb

```python
# Obtener los centroides de los clústeres
centroides = your_model_kmeans.cluster_centers_

# Guardar los centroides en un archivo JSON
with open("model.json", "w") as f:
    json.dump(centroides.tolist(), f)
```
-----

Fronted Nextjs Options for do it:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Nodejs version v20.10.0 and Next.js version v14.2.3 

First
```bash
npm install
```
run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resolve : Error Nextjs Parsing error: Cannot find module 'next/babel'

Put this code in .eslintrc.json 
```bash
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```


Created by [Diego Ivan Perea Montealegre](https://github.com/diegoperea20)