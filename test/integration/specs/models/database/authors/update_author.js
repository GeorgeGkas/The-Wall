import { expect } from 'chai';
import mysqlConn from '../setup';

describe('update_author()', function () {
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

  it('should return error if no `email` property is provided.', function () {
    expect(function () {
      mysqlConn.update_author({
        newAvatar: 'http://some-image.com/img.png',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Please provide the author\'s email whose informations will be change.');
  });

  it('should return error if `email` is not valid email.', function () {
    expect(function () {
      mysqlConn.update_author({
        email: 'blha@op',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Email format is not valid.');
  });

  it('should return error if neither `newAvatar`, `newDescription`, `newName` nor `newRole` is provided.', function () {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Empty parameter provided. Can not change anything.');
  });

  it('should return error if `newRole` property is set to value other than `writer` or `admin`.', function () {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newRole: 'admin',
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newRole: 'writer',
      }, function (err) {
        if (err) throw err;
      });
    }).to.not.throw();

    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newRole: 'other',
      }, function (err) {
        if (err) throw err;
      });
    }).to.throw(Error, 'Author\'s new role must be set to either `admin` or `writer`.');
  });

  it('should update author\'s role if `newRole` is provided.', function (done) {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newRole: 'admin',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        mysqlConn.select_author({
          email: 'test@email.com',
        }, function (err2, res2) {
          if (err2) throw err2;
          expect(res2[0]).to.have.property('author_role', 'admin');
          done();
        });
      });
    }).to.not.throw();
  });

  it('should update author\'s description if `newDescription` is provided.', function (done) {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newDescription: 'this is a new description',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        mysqlConn.select_author({
          email: 'test@email.com',
        }, function (err2, res2) {
          if (err2) throw err2;
          expect(res2[0]).to.have.property('author_description', 'this is a new description');
          done();
        });
      });
    }).to.not.throw();
  });

  it('should update author\'s name if `newName` is provided.', function (done) {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newName: 'new name',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        mysqlConn.select_author({
          email: 'test@email.com',
        }, function (err2, res2) {
          if (err2) throw err2;
          expect(res2[0]).to.have.property('author_name', 'new name');
          done();
        });
      });
    }).to.not.throw();
  });

  it('should update author\'s avatar if `newAvatar` is provided.', function (done) {
    expect(function () {
      mysqlConn.update_author({
        email: 'test@email.com',
        newAvatar: 'new avatar',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        mysqlConn.select_author({
          email: 'test@email.com',
        }, function (err2, res2) {
          if (err2) throw err2;
          expect(res2[0]).to.have.property('author_avatar', 'new avatar');
          done();
        });
      });
    }).to.not.throw();
  });

  it('should succeed.', function (done) {
    expect(function () {
      mysqlConn.update_author({
        newName: 'george',
        email: 'test@email.com',
        newAvatar: 'gkas',
        newDescription: 'hello',
        newRole: 'admin',
      }, function (err, res) {
        if (err) throw err;
        expect(res).to.have.property('affectedRows', 1);
        mysqlConn.select_author({
          email: 'test@email.com',
        }, function (err2, res2) {
          if (err2) throw err2;
          expect(res2[0]).to.have.property('author_avatar', 'gkas');
          expect(res2[0]).to.have.property('author_description', 'hello');
          expect(res2[0]).to.have.property('author_name', 'george');
          expect(res2[0]).to.have.property('author_role', 'admin');
          done();
        });
      });
    }).to.not.throw();
  });
});
