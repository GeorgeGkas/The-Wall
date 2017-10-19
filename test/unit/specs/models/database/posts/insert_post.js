describe('insert_post()', function () {
  it('should return error if `post_details` is not object.');
  it('should return error if either `author`, `post_content`, `type`, or `title` is not present.');
  it('`post_details.status` should accept only spessific values.');
  it('`post_details.status` should be set to `draft` if is not present.');
  it('`post_details.has_article` should accept spessific values.');
  it('`post_details.has_article` should be set to `0` if is not present.');
  it('`post_details.article_content` should be set to empty string if is not present.');
  it('`post_details.type` should accept only spessific values.');
});
