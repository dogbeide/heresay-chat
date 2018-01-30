const {expect} = require('chai');
var {genMsg} = require('./message');

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
