const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashLink = (id: string, width: number, height: number) => `/sponsors/${id}`;

const unsplashPhotos = [
  { id: "24h.jpg", width: 1080, height: 1440 },
  { id: "banette.jpg", width: 1080, height: 1440 },
  { id: "beaugendre.jpg", width: 1080, height: 1440 },
  { id: "befana.jpg", width: 1080, height: 1440 },
  { id: "bouchard.jpg", width: 1080, height: 1440 },
  { id: "breizh-sports.jpg", width: 1080, height: 1440 },
  { id: "brittany classic cars.jpg", width: 1080, height: 1440 },
  { id: "burger-king.jpg", width: 1080, height: 1440 },
  { id: "cap-a-louest.jpg", width: 1080, height: 1440 },
  { id: "caracthair.jpg", width: 1080, height: 1440 },
  { id: "cave-le-partage.jpg", width: 1080, height: 1440 },
  { id: "cimm.png", width: 1080, height: 1440 },
  { id: "collet.jpg", width: 1080, height: 1440 },
  { id: "comite-35.jpg", width: 1080, height: 1440 },
  { id: "eurovia.jpg", width: 1080, height: 1440 },
  { id: "generali.jpg", width: 1080, height: 1440 },
  { id: "hbd-logo-ok.jpg", width: 1080, height: 1440 },
  { id: "immobiliere.jpg", width: 1080, height: 1440 },
  { id: "le triskell.jpg", width: 1080, height: 1440 },
  { id: "le-flyse.jpg", width: 1080, height: 1440 },
  { id: "menuiserie-laine.jpg", width: 1080, height: 1440 },
  { id: "noyal.jpg", width: 1080, height: 1440 },
  { id: "ordynamik.jpg", width: 1080, height: 1440 },
  { id: "pouessel.jpg", width: 1080, height: 1440 },
  { id: "superu.jpg", width: 1080, height: 1440 },
  { id: "tylia.jpg", width: 1080, height: 1440 },
  { id: "un-autre-regard.jpg", width: 1080, height: 1440 },
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