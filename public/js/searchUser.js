$(document).ready(function () {
    //init();
    getSearchedUserList();
});

function getSearchedUserList() {
    var html = "";
    for (var i = 0; i < 2; i++) {
        html += '<tr> \
                    <td><input type="radio" id="chk_' + i + '" name="radio"> \
                    <label for="chk_' + i + '">' + 'aaa' + i + '@lge.com' + '</td> \
                </tr>';
    }

    $("#searchUserListDiv").removeClass('noData');
    $("#searchUserListDiv > table").css('display', 'inline-table');
    $("#searchUserListDiv > table > tbody").append(html);
}