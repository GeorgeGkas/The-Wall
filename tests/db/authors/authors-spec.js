module.exports = {

    runTest: function(mysql) {
        describe('Testing MYSQL authors_methods/', function() {
            describe('insert_author/', function() {
                describe('forgot keys/', function() {
                    it('name', function() {
                        expect(
                            function() {
                                mysql.insert_author({
                                    avatar: 'test',
                                    description: 'test',
                                    email: 'test'
                                });
                            }
                        ).toThrow(new Error("You need to provide all the parameters to insert_author call."));
                    });

                    it('description', function() {
                        expect(
                            function() {
                                mysql.insert_author({
                                    avatar: 'test',
                                    name: 'test',
                                    email: 'test'
                                });
                            }
                        ).toThrow(new Error("You need to provide all the parameters to insert_author call."));
                    });

                    it('avatar', function() {
                        expect(
                            function() {
                                mysql.insert_author({
                                    description: 'test',
                                    name: 'test',
                                    email: 'test'
                                });
                            }
                        ).toThrow(new Error("You need to provide all the parameters to insert_author call."));
                    });

                    it('email', function() {
                        expect(
                            function() {
                                mysql.insert_author({
                                    description: 'test',
                                    name: 'test',
                                    avatar: 'test'
                                });
                            }
                        ).toThrow(new Error("You need to provide all the parameters to insert_author call."));
                    });
                });


            });

            describe('update_author/', function() {
                describe('wrong parameter provided/', function() {
                    it('undefined', function() {
                        expect(
                            function() {
                                mysql.update_author();
                            }
                        ).toThrow(new Error("Empty parameter provided. Can not change anything."));
                    });

                    it('empty', function() {
                        expect(
                            function() {
                                mysql.update_author({});
                            }
                        ).toThrow(new Error("Empty parameter provided. Can not change anything."));
                    });

                    it('no row email undentifier', function() {
                        expect(
                            function() {
                                mysql.update_author({
                                    newName: 'test'
                                });
                            }
                        ).toThrow(new Error("Please provide the author's email whose informations will be change."));
                    });

                    it('no new parameters to change', function() {
                        expect(
                            function() {
                                mysql.update_author({
                                    email: 'test'
                                });
                            }
                        ).toThrow(new Error("Empty parameter provided. Can not change anything."));
                    });
                });
            });

            describe('select_author/', function() {
                describe('wrong parameter provided', function() {
                    it('empty', function() {
                        expect(function() {
                            mysql.select_author();
                        }).toThrow(new Error("No parameter provided to select_author call."));
                    });
                });
            });

            describe('delete_author/', function() {
                describe('wrong parameter provided', function() {
                    it('empty', function() {
                        expect(function() {
                            mysql.delete_author();
                        }).toThrow(new Error("No parameter provided to delete_author call."));
                    });
                });
            });

        });

    }
}
