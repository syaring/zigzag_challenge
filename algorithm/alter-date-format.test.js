var assert = require('assert');
var fs = require('fs');
var vm = require('vm');
var path = './alter-date-format.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe('alter-date-format', function () {
  it('일반적인 경우', function () {
    assert.equal(alterDateFormat("PM 01:00:00", 10), "13:00:10");
    assert.equal(alterDateFormat("PM 10:40:38", 9), "22:40:47");
    assert.equal(alterDateFormat("AM 08:27:09", 39), "08:27:48");
  });

  it('초->분, 분->시간 으로 단위가 바뀌는 경우', function () {
    assert.equal(alterDateFormat("AM 11:36:31", 33), "11:37:04");
    assert.equal(alterDateFormat("PM 09:59:03", 80), "22:00:23");
    assert.equal(alterDateFormat("AM 05:24:03", 102392), "09:50:35");
    assert.equal(alterDateFormat("PM 11:59:59", 1), "00:00:00");
  });

  it('AM->PM, PM->AM 으로 바뀌는 경우', function () {
    assert.equal(alterDateFormat("AM 11:55:59", 301), "12:01:00");
    assert.equal(alterDateFormat("PM 11:21:00", 2349), "00:00:09");
    assert.equal(alterDateFormat("AM 12:31:02", 363), "00:37:05");
    assert.equal(alterDateFormat("AM 12:10:00", 40), "00:10:40");
  });
});
