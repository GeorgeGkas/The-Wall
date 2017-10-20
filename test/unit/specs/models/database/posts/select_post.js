describe('select_post()', function () {
  it('should return error if neither string nor object is provided.');
  it('should return featured post if string `featured` is past as argument.');
  it('should return error if object contains other properties than `type`, `status`, `author`, `title`.');
  it('should return error if `type` is neither `img`, `quote` nor `video`.');
  it('should return error if `status` is neither `draft`, `published` nor `deleted`.');
  it('should return error if `author` is not valid email.');
  it('should return limit number of posts if `limit` property is provided,');
});
