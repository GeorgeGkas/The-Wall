module.exports = {
    get_curr_date: function() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    },
    prepare_index_post_data: function(res, featured) {
        var data = [];

        var dateFormat = String(featured['post_date']).substr(4, 11).split(' ');
        data.push({
            post_type: featured.post_type,
            post_content: featured.post_content,
            post_date: dateFormat[1] + ' ' + dateFormat[0] + ' ' + dateFormat[2],
            post_like_count: featured.post_like_count,
            post_comment_count: featured.post_comment_count,
            post_has_article: featured.post_has_article,
            post_title: featured.post_title,
        });


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
    },
    isEmpty: function(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    }

}
