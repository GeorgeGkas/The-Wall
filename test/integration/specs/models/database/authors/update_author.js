describe('update_author()', function () {
  it('should return error if neither `newAvatar`, `newDescription`, `newName` nor `newRole` is provided.');
  it('should return error if no `email` property is provided.');
  it('should return error if `email` is not valid email.');
  it('should update author\'s role only if `newRole` is provided.');
  it('should return error if either `newAvatar`, `newDescription` or `newName` properties are false values.');
  it('should return error if `newRole` property is set to value other than `writer` or `admin`.');
  it('should succeed.');
});
