function alterDateFormat(time, n) {
  var ampm = time.slice(0, 2);
  var hours;
  
  if(ampm === "PM") {
    hours = (time.slice(3, 5) / 1 + 12) % 24;
  } else {
    if(time.slice(3, 5) === "12"){
      hours = 0;
    } else {
       hours = time.slice(3, 5) / 1;
    }
  }
 
  var minutes = time.slice(6, 8) / 1;
  var seconds = time.slice(9, 11) / 1;
  
  seconds += n;
  
  if(seconds >= 60){
    minutes += Math.floor(seconds / 60);
    seconds %= 60;
    
    if(minutes >= 60){
      hours += Math.floor(minutes / 60);
      minutes %= 60;
      
      if(hours >= 24) {
        hours %= 24;
      }
    }
  }
  
  var result = (hours.toString().length === 1) ?
              ("0" + hours.toString() + ":") :
              (hours.toString() + ":");
  
  result += (minutes.toString().length === 1) ?
            ("0" + minutes.toString() + ":") :
            (minutes.toString() + ":");
  
  result += (seconds.toString().length === 1) ?
            ("0" + seconds.toString()) :
            (seconds.toString());
  
  return result;
}
