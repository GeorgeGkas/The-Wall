$(document).ready(function() {
    $('#posts-table').DataTable({
        "language": {
            "decimal": "",
            "emptyTable": "Currently no posts exist.",
            "info": "_START_ to _END_  [_TOTAL_ total]",
            "infoEmpty": "",
            "lengthMenu": "_MENU_ posts/page",
            "loadingRecords": "Loading...",
            "processing": "Processing...",
            "search": "",
            "zeroRecords": "No post match the creteria.",
            "paginate": {
                "first": "",
                "last": "",
                "next": ">",
                "previous": "<"
            }
        },
        "lengthMenu": [ 5, 10, 20, 30]
    });

    $('.dataTables_filter input').attr("placeholder", "search");
});
