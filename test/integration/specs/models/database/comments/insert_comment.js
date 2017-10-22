describe('insert_comment()', function () {
  it('should return error if either `post_id`, `author_name`, `content` or `author_email` properties are empty strings.');
  it('should return error if `author_name` is not valid email.');
  it('should return error if `post_id` is not valid post.');
  it('should succeed.');
});
