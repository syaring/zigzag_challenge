var assert = require('assert');
var fs = require('fs');
var vm = require('vm');
var path = './is-available-time.js';

var code = fs.readFileSync(path);
vm.runInThisContext(code);

describe('is-available-time', function () {
  it('영업시간 : 월-금 9시 ~ 18시 / 토 9시 ~ 13시 , 15시 ~ 17시 | 기준시간 : 화요일 17시', function () {
    assert.equal(isAvailableTime("12345^0900-1800@6^0900-1300&1500-1700", "2018-09-18T17:00:00"), true);
  });

  it('영업시간 : 월-목 오전 9시 ~ 오후 1시 / 오후 2시 ~ 오후 6시 | 기준시간 : 일요일 오후 2시', function () {
    assert.equal(isAvailableTime("1234^0900-1300&1400-1800", "2018-09-09T14:00:00"), false);
  });

  it('영업시간 : 토-일 9시 ~ 18시 | 기준시간 : 화요일 17시', function () {
    assert.equal(isAvailableTime("06^0900-1800", "2018-09-18T17:00:00"), false);
  });

  it('영업시간 : 월-금 9시 ~ 12시, 14시 ~ 18시 / 토 9시 ~ 13시 | 기준시간 : 화요일 18시', function () {
    assert.equal(isAvailableTime("12345^0900-1200&1400-1800@6^0900-1300", "2018-09-18T18:00:00"), false);
  });

  it('영업시간 : 월-수 9시 ~ 12시, 13시 ~ 16시 / 목-토 9시 ~ 13시 | 기준시간 : 토요일 12시', function () {
    assert.equal(isAvailableTime("123^0900-1200&1300-1600@456^0900-1300", "2018-09-15T12:00:00"), true);
  });

  it('영업시간 : 월-수 9시 ~ 12시, 13시 ~ 16시 / 목-토 9시 ~ 13시 | 기준시간 : 토요일 13시', function () {
    assert.equal(isAvailableTime("123^0900-1200&1300-1600@456^0900-1300", "2018-09-15T13:00:00"), false);
  });

  it('영업시간 : 월-수 9시 ~ 12시, 13시 ~ 16시 / 목-토 9시 ~ 13시 | 기준시간 : 수요일 12시30분', function () {
    assert.equal(isAvailableTime("123^0900-1200&1300-1600@456^0900-1300", "2018-09-19T12:30:00"), false);
  });
});
