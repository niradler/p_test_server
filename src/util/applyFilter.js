const moment = require('moment');

let _filter_props=null;

const findType = (type)=>{
  if (filter_props.indexOf(type)>-1) {
    return true;
  }
  return false;
}

const applyFilter = (data, filter) => {

  if (!filter || typeof filter === 'object' && Object.getOwnPropertyNames(filter).length === 0) {
    return data;
  }

  filter_props = Object.getOwnPropertyNames(filter);
  let temp_data = data;

  //apply filters by filter keys

    temp_data = temp_data.filter((e) => {
      let is = true;
      if (findType('blacklisted')  && e.blacklisted !== filter.blacklisted) {
        is=false;
      }
      if (findType('event_type')  && e.event_type !== filter.event_type) {
        is=false;
      }
      if (findType('ip')  && e.ip !== filter.ip) {
        is=false;
      }
      if (findType('domain') ) {
       if(typeof filter.domain==='object'){
          is=false;
          filter.domain.forEach((d)=> {
            if (e.domain === d) {
              is=true; 
            }
          });
        }
      }
      if (findType('search')  && !e.event_type.includes(filter.search)) {
        is=false;
      }
      if (findType('from')  && findType('to')) {
        const from = moment(filter.from),to = moment(filter.to),event_time = moment(e.timestamp);
        if (!(event_time.isBetween(from, to))) {
          is=false;
        }
      }
      return is;
    });

  return temp_data;
}

module.exports = applyFilter;