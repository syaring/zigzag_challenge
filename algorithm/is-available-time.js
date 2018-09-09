function isAvailableTime (time) {
  var unit = time.split('@');
  
  if(arguments[1]) {
    var date = new Date(arguments[1]);
  } else {
    var date = new Date();
  }
  
  var current_time = date.getHours().toString();
  current_time += (date.getMinutes() === 0) ? "00" : date.getMinutes().toString();
  
  for(let i in unit) {
    let period = unit[i].split('^');
    
    if(period[0].includes(date.getDay())) {
      let time = period[1].split('&');
      
      for(let j in time) {
        if(time[j].slice(0, 4) <= current_time && time[j].slice(-4) > current_time){
          return true;
        }
      }
    }
  }
  
  return false;
}
