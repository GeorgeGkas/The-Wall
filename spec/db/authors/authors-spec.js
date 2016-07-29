module.exports = {
    runTest: function() {
        describe("Hello World Test", function() {
            describe('1 + 1', function() {
                it('1+1 = 2 ', function() {
                    expect(1 + 2).toEqual(3);
                });
            });
        });
    }

}
