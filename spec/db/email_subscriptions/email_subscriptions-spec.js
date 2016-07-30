module.exports = {
    runTest: function(mysql) {
        describe('Testing MYSQL email_subscriptions methods/', function() {
            describe('select_subscription/', function() {
                it('empty', function() {
                    expect(
                        function() {
                            mysql.select_subscription();
                        }
                    ).toThrow(new Error("No parameter provided to select_subscription call."));
                });
            });
        });
    }
}
