const expandMandlebrot = (real, imaginary, max) => {
  let incsCount = 0;
  let r = real;
  let i = imaginary;
  let magnitude = Math.sqrt(real * real + imaginary * imaginary);
  let newReal = 0;
  while(magnitude < 4.0) {
    ++incsCount;
    if(incsCount > max) { return -1; }
    newReal = r * r - i * i + real;
    i = r * i * 2 + imaginary;
    r = newReal;
    magnitude = Math.sqrt(r * r + i * i);
  }
  return incsCount;
};

export default expandMandlebrot;
