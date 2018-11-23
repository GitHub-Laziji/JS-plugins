function parseCsv(data, separator) {
  if (!data || typeof data !=='string') {
    return [];
  }
  if (!separator || separator.length > 1) {
    separator = ',';
  }
  let csv = [[]];
  let i = 0;
  let ch = data.charAt(0);
  let val = '';
  let flag = 0;
  while (ch) {
    if (ch == '"') {
      flag++;
    }
    if ((ch == separator && flag % 2 == 0) || ch == '\n' || ch == '') {
      val = val.trim();
      if (val.charAt(0) == '"') {
        val = val.substring(1, val.length - 1);
        val.replace('""', '"');
      } else if(/^\d+(\.\d+)?$/.test(val)){
        val = parseFloat(val);
      }
      csv[csv.length - 1].push(val);
      flag = 0;
      val = '';
    } else {
      val += ch;
    }
    if (ch == '\n') {
      csv.push([])
    }
    ch = data.charAt(++i);
  }
  return csv;
}
