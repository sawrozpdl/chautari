export const createBlobUrl = async (
  data: any,
  callback?: any
): Promise<string> => {
  const url = URL.createObjectURL(await data.blob());
  if (callback) {
    await callback(url);
  }

  return url;
};

const gifs = [
  'https://media1.giphy.com/media/AFuvqdSLGoaJGTE7Iy/giphy.gif',
  'https://lh4.googleusercontent.com/proxy/AkhUrryhc3j-2lw71fiGrVI6DSOfnSIsgPf2K_BGBHtibgISfGy4e7TZwwQqV7yttYlE7oY1YVocRvud6DG-BgwOercdEqh62-tU2jmF2LVC85Y=s0-d',
  'https://i.pinimg.com/originals/7b/9b/d0/7b9bd02a0cb39e17da33afc07e2fd4ee.gif',
  'https://i.pinimg.com/originals/4b/d2/d8/4bd2d8c1a3d62b1404b800a84867666b.gif',
  'https://i.pinimg.com/originals/b6/ed/bc/b6edbc9d4e00eb709fb7cba31e678437.gif',
  'https://i.gifer.com/WiC6.gif', // Star wars dancing.
  'https://media0.giphy.com/media/kBT8T9yaHWucie70BX/giphy.gif', // cursor moving around.
  'https://i.pinimg.com/originals/60/08/c4/6008c47b9570086418ad740d3f2f2361.gif',
  'https://media4.giphy.com/media/ZaRSSqMukSQgVzJA9t/giphy.gif',
  'https://media0.giphy.com/media/PioiouZVpWiwaDLcUJ/giphy.gif',
  'https://media0.giphy.com/media/LVtc9j3IjggrqBpJfK/giphy.gif',
  'https://64.media.tumblr.com/fa6a5521df61447bfe6fa934e222c3a4/tumblr_o1cmflRgDX1qlwqqzo2_500.gifv',
];

export const getRandomLoadingGif = (
  n = Math.floor(Math.random() * gifs.length)
): string => gifs[n];
