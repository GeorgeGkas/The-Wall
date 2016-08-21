module.exports = {
    prepare_index_post_data: function(res, featured) {
        var data = [];

        if (featured !== undefined) {
            featured.post_datetime_tag = featured.post_date;
            featured.post_date = String(featured.post_date).substr(4, 11).split(' ').swap(0, 1).join(' ')
            data.push(featured);
        }

        for (var i = 0; i < res.length; ++i) {
            res[i].post_datetime_tag = res[i].post_date;
            res[i].post_date = String(res[i].post_date).substr(4, 11).split(' ').swap(0, 1).join(' ')
            data.push(res[i]);
        }

        return data;
    },
    isEmpty: function(val) {
        return (val === undefined || val == null || val.length <= 0) ? true : false;
    },
    prepare_comments_data: function(res) {
        var data = [];
        for (var i = 0; i < res.length; ++i) {
            res[i].datetime_tag = res[i].comment_date;
            res[i].comment_date = String(res[i].comment_date).substr(4, 11).split(' ').swap(0, 1).join(' ');
            data.push(res[i]);
        }
        return data;

    }

}
