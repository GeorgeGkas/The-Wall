import { expect } from 'chai';
import mysqlConn from '../setup';

describe('delete_author()', function () {
  beforeEach(function (done) {
    mysqlConn.query('TRUNCATE authors;');

    mysqlConn.insert_author({
      name: 'test',
      email: 'test@email.com',
      avatar: 'test',
      description: 'test',
      role: 'writer',
    }, function (err) {
      if (err) throw err;
      done();
    });
  });

  it('should return error if `author_email` is not string.', function () {
    expect(function () {
      mysqlConn.delete_author(null, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Parameter provided to delete_author should be string and not empty.');
  });

  it('should return error if `author_email` is not valid email.', function () {
    expect(function () {
      mysqlConn.delete_author('empty', function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Email format is not valid.');
  });

  it('should succeed.', function (done) {
    expect(function () {
      mysqlConn.delete_author('test@email.com', function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        done();
      });
    }).to.not.throw();
  });
});
