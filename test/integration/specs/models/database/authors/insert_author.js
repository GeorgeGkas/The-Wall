import { expect } from 'chai';
import mysqlConn from '../setup';

describe('insert_author()', function () {
  it('should return error if either `email`, `name`, `avatar`, `description` or `role` properties are not provided.', function () {
    expect(function () {
      mysqlConn.insert_author({
        email: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_author call.');

    expect(function () {
      mysqlConn.insert_author({
        name: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_author call.');

    expect(function () {
      mysqlConn.insert_author({
        description: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_author call.');

    expect(function () {
      mysqlConn.insert_author({
        avatar: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_author call.');

    expect(function () {
      mysqlConn.insert_author({
        role: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_author call.');
  });

  it('should return error if `role` property is set to value other than `writer` or `admin`.', function () {
    expect(function () {
      mysqlConn.insert_author({
        name: 'test',
        email: 'test@email.com',
        avatar: 'test',
        description: 'test',
        role: 'writer',
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw(Error, 'Role property should be either `writer` or `admin`.');

    expect(function () {
      mysqlConn.insert_author({
        name: 'test',
        email: 'test@email.com',
        avatar: 'test',
        description: 'test',
        role: 'admin',
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw(Error, 'Role property should be either `writer` or `admin`.');

    expect(function () {
      mysqlConn.insert_author({
        name: 'test',
        email: 'test@email.com',
        avatar: 'test',
        description: 'test',
        role: 'other',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Role property should be either `writer` or `admin`.');
  });

  it('should return error if `email` is not valid email.', function () {
    expect(function () {
      mysqlConn.insert_author({
        name: '',
        email: '',
        avatar: '',
        description: '',
        role: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Email format is not valid.');
  });

  it('should succeed.', function (done) {
    this.timeout(5000);

    expect(function () {
      mysqlConn.insert_author({
        name: 'george',
        email: 'gkas@gmail.com',
        avatar: 'https://some-image.com/img.png',
        description: 'web developer',
        role: 'admin',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.insert_author({
        name: 'nick',
        email: 'olow@gmail.com',
        avatar: 'https://some-image.com/img2.png',
        description: 'web designer',
        role: 'writer',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        done();
      });
    }).to.not.throw();
  });
});
