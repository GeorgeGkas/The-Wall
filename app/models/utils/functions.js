module.exports = {
    get_curr_date: function() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    prepate_index_post_data: function(res) {
        var data = [];
        for (var i = 0; i < res.length; ++i) {
            var dateFormat = String(res[i]['post_date']).substr(4, 11).split(' ');
            data.push({
                post_type: res[i].post_type,
                post_content: res[i].post_content,
                post_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
                post_like_count: res[i].post_like_count,
                post_comment_count: res[i].post_comment_count,
                post_has_article: res[i].post_has_article,
                post_title: res[i].post_title,
            });
        }
        return data;
    }
}
