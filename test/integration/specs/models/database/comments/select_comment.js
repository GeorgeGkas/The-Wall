describe('select_comment()', function () {
  it('should return error if `select_details` is not object.');
  it('should return error if `post_id` is not valid post.');
  it('should return error if `state` is not valid state.');
  it('should return only pending comments.');
  it('should return only approved comments.');
  it('should return comments from newer to older date.');
});
