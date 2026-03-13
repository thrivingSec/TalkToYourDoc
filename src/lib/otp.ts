// Return OTP(5 digits)
export function getOTP(){
  return Math.floor(Math.random()*90000 + 10000)
}