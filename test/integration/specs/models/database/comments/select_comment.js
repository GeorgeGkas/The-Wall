import { expect } from 'chai';
import mysqlConn from '../setup';

describe('select_comment()', function () {
  beforeEach(function(done) {
    mysqlConn.query('TRUNCATE comments;');

    mysqlConn.insert_comment({
      post_id: '800',
      author_name: 'test',
      content: 'test comment',
      author_email: 'test@email.com',
      state: 'approved'
    }, function (err) {
      mysqlConn.insert_comment({
        post_id: '800',
        author_name: 'test2',
        content: 'test2 comment',
        author_email: 'test2@email.com',
        state: 'pending'
      }, function (err) {
        if (err) throw err;
        mysqlConn.insert_comment({
          post_id: '800',
          author_name: 'test3',
          content: 'test3 comment',
          author_email: 'test3@email.com',
          state: 'approved'
        }, function (err) {
          if (err) throw err;
          done();
        });
      });
    });
  });

  it('should return error if `select_details` is null or undefined.', function() {
    expect(function() {
      mysqlConn.select_comment(null, function(err) {
        if (err) throw err;
      }).to.throw(Error, 'No parameter provided to select_comment call.');
    });
  });

  it('should return error if `select_details` is not object.', function() {
    expect(function() {
      mysqlConn.select_comment('string', function(err) {
        if (err) throw err;
      }).to.throw(Error, 'Non Object. Wrong parameter provided to select_comment call.');
    });
  });

  it('should return error if `post_id` is not valid post.');

  it('should return error if `state` is not valid state.');

  it('should return only pending comments.');

  it('should return only approved comments.');

  it('should return comments from newer to older date.');
});
