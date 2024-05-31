const unsplashLink = (id: string) => `/sponsors/${id}`;

const unsplashPhotos = [
  { id: "beaugendre.jpg", width: 120, height: 120 },
  { id: "bouchard.jpg", width: 120, height: 120 },
  { id: "bouetard.jpg", width: 120, height: 120 },
  { id: "breizhsports.jpg", width: 120, height: 120 },
  { id: "brittany_classic_cars.jpg", width: 120, height: 120 },
  { id: "burger_king.jpg", width: 120, height: 120 },
  { id: "cap_a_l_ouest.jpg", width: 120, height: 120 },
  { id: "chanson.jpg", width: 120, height: 120 },
  { id: "collet_yann.jpg", width: 120, height: 120 },
  { id: "comite_35.jpg", width: 120, height: 120 },
  { id: "cornillet.jpg", width: 120, height: 120 },
  { id: "gcp.jpg", width: 120, height: 120 },
  { id: "generali.jpg", width: 120, height: 120 },
  { id: "guinde.jpg", width: 120, height: 120 },
  { id: "l_immobiliere_d_entreprise.jpg", width: 120, height: 120 },
  { id: "la_befana.jpg", width: 120, height: 120 },
  { id: "laine.jpg", width: 120, height: 120 },
  { id: "le_partage.jpg", width: 120, height: 120 },
  { id: "le_triskell.jpg", width: 120, height: 120 },
  { id: "noyal_chatillon.jpg", width: 120, height: 120 },
  { id: "ocopa.jpg", width: 120, height: 120 },
  { id: "ordynamik.jpg", width: 120, height: 120 },
  { id: "poussel.jpg", width: 120, height: 120 },
  { id: "sma2r.jpg", width: 120, height: 120 },
  { id: "someval.jpg", width: 120, height: 120 },
  { id: "superu.jpg", width: 120, height: 120 },
  { id: "tylia.jpg", width: 120, height: 120 },
  { id: "un_autre_regard.jpg", width: 120, height: 120 },
  { id: "we_clean.jpg", width: 120, height: 120 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id),
  width: photo.width,
  height: photo.height
}));

export default photos;