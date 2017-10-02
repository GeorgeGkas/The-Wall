import mysqlConn from './setup';

describe('MYSQL', function () {
  describe('query', function () {
    require('./MYSQL.query.js');
  });

  describe('authors', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE authors;');
    });
  });

  describe('comments', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE comments;');
    });
  });

  describe('likes', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE likes;');
    });
  });

  describe('posts', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE posts;');
    });
  });

  describe('subscriptions', function () {
    beforeEach(function () {
      mysqlConn.query('TRUNCATE email_subscriptions;');
    });
  });
});
