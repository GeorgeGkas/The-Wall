import { expect } from 'chai';
import mysqlConn from '../setup';

describe('insert_comment()', function () {
  it('should return error if either `post_id`, `author_name`, `content`, `author_email` or `state` properties are not provided.', function () {
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

    expect(function () {
      mysqlConn.insert_comment({
        state: '',
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
        state: 'a'
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
        state: 'a'
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
        state: 'a'
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
        state: 'a'
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'No empty property is allowed.');

    expect(function () {
      mysqlConn.insert_comment({
        post_id: 'a',
        author_name: 'a',
        content: 'a',
        author_email: 'a',
        state: ''
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
        state: 'approved'
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Email format is not valid.');
  });

  it('should return error if `post_id` is not valid post.');

  it('should return error if `state` is neither `approved` nor `pending`.', function() {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: '1',
        author_name: 'a',
        content: 'a',
        author_email: 'george@email.com',
        state: 'approved'
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.insert_comment({
        post_id: '1',
        author_name: 'a',
        content: 'a',
        author_email: 'george@email.com',
        state: 'pending'
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.insert_comment({
        post_id: '1',
        author_name: 'a',
        content: 'a',
        author_email: 'george@email.com',
        state: 'other'
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'State should be either `approved` or `pending`.');
  });

  it('should succeed.', function (done) {
    expect(function () {
      mysqlConn.insert_comment({
        post_id: '3',
        author_name: 'george',
        content: 'hello',
        author_email: 'george@email.com',
        state: 'approved'
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        done();
      });
    }).to.not.throw();
  });
});
