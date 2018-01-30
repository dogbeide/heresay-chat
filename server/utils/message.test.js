const {expect} = require('chai');
var {genMsg, genGeoMsg} = require('./message');

describe('genMsg()', () => {
  it('should generate correct message object', (done) => {
    var from = 'testdev';
    var text = 'testing 1 2 3';
    var msg = genMsg(from, text);

    expect(msg).to.not.equal(undefined);
    expect(msg).to.not.equal(null);
    expect(msg).to.include({
      from,
      text
    });
    expect(msg.createdAt).to.be.a('number');

    done();
  });
});

describe('genGeoMsg()', () => {
  it('should generate correct location object', (done) => {
    var from = 'testdev';
    var lat = '1';
    var lng = '1';
    var msg = genGeoMsg(from, lat, lng);

    expect(msg).to.not.equal(undefined);
    expect(msg).to.not.equal(null);
    expect(msg).to.include({
      from,
      url:`https://www.google.com/maps?q=${lat},${lng}`
    });
    expect(msg.createdAt).to.be.a('number');

    done();
  });
});
