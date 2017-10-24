import { expect } from 'chai';
import mysqlConn from '../setup';

describe('select_author()', function () {
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
      mysqlConn.insert_author({
        name: 'test1',
        email: 'test1@email.com',
        avatar: 'test1',
        description: 'test1',
        role: 'admin',
      }, function (err2) {
        if (err2) throw err2;
        done();
      });
    });
  });

  it('should return all authors.', function (done) {
    expect(function () {
      mysqlConn.select_author('*', function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test@email.com');
        expect(res[0]).to.have.property('author_role', 'writer');
        expect(res[0]).to.have.property('author_name', 'test');
        expect(res[0]).to.have.property('author_avatar', 'test');
        expect(res[0]).to.have.property('author_description', 'test');

        expect(res[1]).to.have.property('author_email', 'test1@email.com');
        expect(res[1]).to.have.property('author_role', 'admin');
        expect(res[1]).to.have.property('author_name', 'test1');
        expect(res[1]).to.have.property('author_avatar', 'test1');
        expect(res[1]).to.have.property('author_description', 'test1');
        done();
      });
    }).to.not.throw();
  });

  it('should return one author when specific `email` is provided.', function (done) {
    expect(function () {
      mysqlConn.select_author({
        email: 'test@email.com',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test@email.com');
        expect(res[0]).to.have.property('author_role', 'writer');
        expect(res[0]).to.have.property('author_name', 'test');
        expect(res[0]).to.have.property('author_avatar', 'test');
        expect(res[0]).to.have.property('author_description', 'test');
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.select_author({
        email: 'test1@email.com',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test1@email.com');
        expect(res[0]).to.have.property('author_role', 'admin');
        expect(res[0]).to.have.property('author_name', 'test1');
        expect(res[0]).to.have.property('author_avatar', 'test1');
        expect(res[0]).to.have.property('author_description', 'test1');
        done();
      });
    }).to.not.throw();
  });

  it('should return authors when specific `role` is provided.', function (done) {
    expect(function () {
      mysqlConn.select_author({
        role: 'writer',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test@email.com');
        expect(res[0]).to.have.property('author_role', 'writer');
        expect(res[0]).to.have.property('author_name', 'test');
        expect(res[0]).to.have.property('author_avatar', 'test');
        expect(res[0]).to.have.property('author_description', 'test');
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.select_author({
        role: 'admin',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test1@email.com');
        expect(res[0]).to.have.property('author_role', 'admin');
        expect(res[0]).to.have.property('author_name', 'test1');
        expect(res[0]).to.have.property('author_avatar', 'test1');
        expect(res[0]).to.have.property('author_description', 'test1');
        done();
      });
    }).to.not.throw();
  });

  it('should return authors when specific `email` and `role` is provided.', function (done) {
    expect(function () {
      mysqlConn.select_author({
        role: 'writer',
        email: 'test@email.com',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test@email.com');
        expect(res[0]).to.have.property('author_role', 'writer');
        expect(res[0]).to.have.property('author_name', 'test');
        expect(res[0]).to.have.property('author_avatar', 'test');
        expect(res[0]).to.have.property('author_description', 'test');
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.select_author({
        role: 'admin',
        email: 'test1@email.com',
      }, function (err, res) {
        if (err) throw err;
        expect(res[0]).to.have.property('author_email', 'test1@email.com');
        expect(res[0]).to.have.property('author_role', 'admin');
        expect(res[0]).to.have.property('author_name', 'test1');
        expect(res[0]).to.have.property('author_avatar', 'test1');
        expect(res[0]).to.have.property('author_description', 'test1');
        done();
      });
    }).to.not.throw();
  });

  it('should not return error if select_author is null.', function (done) {
    expect(function () {
      mysqlConn.select_author(null, function (err) {
        if (err) throw err;
        done();
      });
    }).to.not.throw();
  });

  it('should not return error if select_author does not contain role or email properties', function (done) {
    expect(function () {
      mysqlConn.select_author({

      }, function (err) {
        if (err) throw err;
        done();
      });
    }).to.not.throw();
  });
});
