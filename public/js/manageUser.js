$(document).ready(function () {
    //init();
    getFavoriteUserList();
    getReservationList();
});

function getFavoriteUserList() {
    var html = "";
    for (var i = 0; i < 4; i++) {
        html += '<tr> \
                    <td><input type="checkbox" id="chk_' + i + '" name="checkbox"> \
                    <label for="chk_' + i + '">' + "aaa@lge.com" + '</td> \
                </tr>';
    }

    $("#favoriteUserListDiv").removeClass('noData');
    $("#favoriteUserListDiv > table").css('display', 'inline-table');
    $("#favoriteUserListDiv > table > tbody").append(html);

    // TODO User가 없을 때, 서버 연동시 적용해야함
    // $("#favoriteUserListDiv").addClass('noData');
    // $("#favoriteUserListDiv > table").attr('display', true);

}

function getReservationList() {
    var html = "";
    for (var i = 0; i < 4; i++) {
        html += '<tr> \
                    <td style="width:200px;" >Daily Meeting ( 23.07.1' + i + ' 09:30 AM )</td> \
                    <td><button type="button" class="button dark mini fw" style="width:50px;" >JOIN</button></td> \
                </tr>';
    }

    $("#reservationListDiv").removeClass('noData');
    $("#reservationListDiv > table").css('display', 'inline-table');
    $("#reservationListDiv > table > tbody").append(html);
}