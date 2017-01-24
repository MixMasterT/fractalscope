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
//
//
// function exapand_M(real,imaginary,MAX) {
//   var count=0;
//   var r = real, i = imaginary;
//   var mag = Math.sqrt(r * r + i * i);
//   var new_r = 0.0;
//   while( mag < 4.0 ) {
//     ++count;
//     if(count > MAX) { return -1; }
//     new_r = r * r - i * i + real;
//     i = r * i * 2 + imaginary;
//     r = new_r;
//     mag = Math.sqrt(r * r + i * i);
//   }
//   return count;
// }
