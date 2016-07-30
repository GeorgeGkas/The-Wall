module.exports = {
    get_curr_date: function() {
        return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    }
}
