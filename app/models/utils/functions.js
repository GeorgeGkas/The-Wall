module.exports = {
    get_curr_date: function() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    prepare_index_post_data: function(res, featured) {
        var data = [];

        if (featured !== undefined) {
            var dateFormat = String(featured['post_date']).substr(4, 11).split(' ');
            data.push({
                post_type: featured.post_type,
                post_content: featured.post_content,
                post_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
                post_like_count: featured.post_like_count,
                post_comment_count: featured.post_comment_count,
                post_has_article: featured.post_has_article,
                post_title: featured.post_title,
                post_datetime_tag: featured.post_date,
                post_ID: featured.post_ID
            });
        }

        for (var i = 0; i < res.length; ++i) {
            var dateFormat = String(res[i]['post_date']).substr(4, 11).split(' ');
            data.push({
                post_type: res[i].post_type,
                post_content: res[i].post_content,
                post_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
                post_datetime_tag: res[i].post_date,
                post_like_count: res[i].post_like_count,
                post_comment_count: res[i].post_comment_count,
                post_has_article: res[i].post_has_article,
                post_title: res[i].post_title,
                post_ID: res[i].post_ID
            });
        }

        return data;
    },
    isEmpty: function(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
    prepare_comments_data: function(res) {
        var data = [];
        for (var i = 0; i < res.length; ++i) {
            var dateFormat = String(res[i]['comment_date']).substr(4, 11).split(' ');
            data.push({
                comment_ID: res[i].comment_ID,
                comment_author: res[i].comment_author,
                comment_like_count: res[i].comment_like_count,
                comment_content: res[i].comment_content,
                comment_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
                datetime_tag: res[i]['comment_date']

            });
        }
        return data;

    }

}
