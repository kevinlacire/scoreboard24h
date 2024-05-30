const breakpoints = [150, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id: string, width: number, height: number) => `/sponsors/${id}`;

const unsplashPhotos = [
  { id: "24h.jpg", width: 150, height: 150 },
  { id: "banette.jpg", width: 150, height: 150 },
  { id: "beaugendre.jpg", width: 150, height: 150 },
  { id: "befana.jpg", width: 150, height: 150 },
  { id: "bouchard.jpg", width: 150, height: 150 },
  { id: "breizh-sports.jpg", width: 150, height: 150 },
  { id: "brittany-classic-cars.jpg", width: 150, height: 150 },
  { id: "burger-king.jpg", width: 150, height: 150 },
  { id: "cap-a-louest.jpg", width: 150, height: 150 },
  { id: "caracthair.jpg", width: 150, height: 150 },
  { id: "cave-le-partage.jpg", width: 150, height: 150 },
  { id: "cimm.png", width: 150, height: 150 },
  { id: "collet.jpg", width: 150, height: 150 },
  { id: "comite-35.jpg", width: 150, height: 150 },
  { id: "eurovia.jpg", width: 150, height: 150 },
  { id: "generali.jpg", width: 150, height: 150 },
  { id: "hbd-logo-ok.jpg", width: 150, height: 150 },
  { id: "immobiliere.jpg", width: 150, height: 150 },
  { id: "le-triskell.jpg", width: 150, height: 150 },
  { id: "le-flyse.jpg", width: 150, height: 150 },
  { id: "menuiserie-laine.jpg", width: 150, height: 150 },
  { id: "noyal.jpg", width: 150, height: 150 },
  { id: "ordynamik.jpg", width: 150, height: 150 },
  { id: "pouessel.jpg", width: 150, height: 150 },
  { id: "superu.jpg", width: 150, height: 150 },
  { id: "tylia.jpg", width: 150, height: 150 },
  { id: "un-autre-regard.jpg", width: 150, height: 150 },
];

const photos = unsplashPhotos.map((photo) => ({
  src: unsplashLink(photo.id, photo.width, photo.height),
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: unsplashLink(photo.id, breakpoint, height),
      width: breakpoint,
      height,
    };
  }),
}));

/*const photos = [
  {
    src: "/sponsors/24h.jpg",
    //width: photo.width,
    //height: photo.height,
    srcSet: breakpoints.map((breakpoint) => {
      const height = Math.round((photo.height / photo.width) * breakpoint);
      return {
        src: unsplashLink(photo.id, breakpoint, height),
        width: breakpoint,
        height,
      };
    }
  }
];*/

export default photos;