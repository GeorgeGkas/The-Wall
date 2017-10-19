describe('insert_subscription()', function () {
  it('should return error if `sub_email` is not string.');
  it('should return error if `sub_email` is not valid email.');
  it('should activate subscription and not create new duplicate entry to database if `sub_email` is already exist.')
});
