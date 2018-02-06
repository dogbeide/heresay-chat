const {expect} = require('chai');
const {isRealStr} = require('./validation');


describe('isRealStr()', () => {

  it('should reject non-string values', (done) => {
    var num = 1234;
    var obj = new Object();

    expect(isRealStr(num)).to.equal(false);
    expect(isRealStr(obj)).to.equal(false);
    done();
  });

  it('should reject strings of only whitespace', (done) => {
    var whitespace = "     \t     \n ";
    expect(isRealStr(whitespace)).to.equal(false);
    done();
  });

  it('should accept strings containing non-whitespace chars', (done) => {
    var str = "testdev devtest";
    expect(isRealStr(str)).to.equal(true);
    done();
  });

});
