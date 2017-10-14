describe('select_author()', function () {
  it('should return all authors.');
  it('should return one author when specific `email` is provided.');
  it('should return authors when specific `role` is provided.');
  it('should return authors when specific `email` and `role` is provided.');
  it('should fail if no parameter is provided.');
  it('should fail when `role` is neither `writer` nor `admin`.');
  it('should fail if `email` is not valid email.');
  it('should succeed.');
});
