import mysqlConn from './setup';

describe('MYSQL#', function () {
  describe('query()', function () {
    require('./MYSQL.query.js');
  });

  describe('authors', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE authors;');
    });

    require('./authors/insert_author');
    require('./authors/select_author');
    require('./authors/update_author');
    require('./authors/delete_author');
  });

  describe('comments', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE comments;');
    });

    require('./comments/insert_comment');
    require('./comments/select_comment');
    require('./comments/update_comment');
    require('./comments/delete_comment');
  });

  describe('likes', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE likes;');
    });

    require('./likes/post_like');
    require('./likes/comment_like');
  });

  describe('posts', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE posts;');
    });

    require('./posts/insert_post');
    require('./posts/select_post');
    require('./posts/update_post');
    require('./posts/delete_post');
  });

  describe('subscriptions', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE email_subscriptions;');
    });

    require('./subscriptions/insert_subscription');
    require('./subscriptions/select_subscription');
    require('./subscriptions/update_subscription');
  });
});
