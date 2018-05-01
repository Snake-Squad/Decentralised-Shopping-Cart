function generateAddress() {
  var address = "0x";
  var chars = "abcdef0123456789";
  for (var i = 0; i < 40; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}
