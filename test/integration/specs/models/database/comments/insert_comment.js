import { expect } from 'chai';
import mysqlConn from '../setup';

describe('insert_comment()', function () {
  it('should return error if either `post_id`, `author_name`, `content`or `author_email` properties are not provided.', function () {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_comment call.');

    expect(function () {
      mysqlConn.insert_comment({
        author_name: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_comment call.');

    expect(function () {
      mysqlConn.insert_comment({
        content: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_comment call.');

    expect(function () {
      mysqlConn.insert_comment({
        author_email: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'You need to provide all the parameters to insert_comment call.');
  });

  it('should return error if either `post_id`, `author_name`, `content`or `author_email` properties are empty string.', function () {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: '',
        author_name: 'a',
        content: 'a',
        author_email: 'a',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'No empty property is allowed.');

    expect(function () {
      mysqlConn.insert_comment({
        post_id: 'a',
        author_name: '',
        content: 'a',
        author_email: 'a',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'No empty property is allowed.');

    expect(function () {
      mysqlConn.insert_comment({
        post_id: 'a',
        author_name: 'a',
        content: '',
        author_email: 'a',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'No empty property is allowed.');

    expect(function () {
      mysqlConn.insert_comment({
        post_id: 'a',
        author_name: 'a',
        content: 'a',
        author_email: '',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'No empty property is allowed.');
  });

  it('should return error if `author_name` is not valid email.', function () {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: 'a',
        author_name: 'a',
        content: 'a',
        author_email: 'false.com',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Email format is not valid.');
  });

  it('should return error if `post_id` is not valid post.');

  it('should succeed.', function (done) {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: '3',
        author_name: 'george',
        content: 'hello',
        author_email: 'george@email.com',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        done();
      });
    }).to.not.throw();
  });
});
