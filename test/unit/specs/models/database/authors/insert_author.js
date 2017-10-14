describe('insert_author()', function () {
  it('should return error if either `email`, `name`, `avatar`or `description` properties are false values.');
  it('should return error if `email` is not valid email.');
  it('`role` property should be set to `writer` if it is not provided.');
  it('should return error if `role` property is set to value other than `writer` or `admin`.');
  it('should succeed.');
});
