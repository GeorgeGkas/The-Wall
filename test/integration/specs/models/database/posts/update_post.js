describe('update_post()', function () {
  it('should return error if `update_details` is neither object nor string.');
  it('should return error if `post_id` is not present.');
  it('`update_details.status` should accept only spessific values.');
  it('`update_details.has_article` should accept spessific values.');
  it('should update `post_content`.');
  it('should update `article_content`.');
  it('should update `title`.');
  it('`post_details.type` should accept only spessific values.');
  it('should increase post view count if `add-one-view` is used by update_details.');
  it('should increase post view count if `add-one-view` should be followed by post_id.');
});
