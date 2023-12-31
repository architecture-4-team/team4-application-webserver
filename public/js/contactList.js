var uuid = location.search.replace('?uuid=', '');
// var uuid = "f8d556af-9955-40d9-955c-142cffd5b123";

$(document).ready(function () {
    initUI();
});

function initUI() {
    if (uuid == '') {
        alert("Check the UUID.");
        return;
    }

    $("#favoriteUserListDiv").addClass('noData');
    $("#favoriteUserListDiv > table").attr('display', true);
    $("#reservationListDiv").addClass('noData');
    $("#reservationListDiv > table").attr('display', true);

    $("#searchUserinfo").val('');
    $("#favoriteUserListDiv > table > tbody").text('');
    $("#searchUserListDiv > table > tbody").text('');
    $("#reservationListDiv > table > tbody").text('');

    $(".favoriteUserDiv").show();
    $(".reservationUserDiv").show();
    $(".searchUserDiv").hide();

    getFavoriteUserList();
    getReservationList();
}

function getFavoriteUserList() {
    $(".favoriteUserDiv").show();
    $(".reservationUserDiv").show();
    $(".searchUserDiv").hide();

    $.ajax({
        type: "GET",
        url: SERVER_IP + "api/contact/" + uuid,
        contentType: "application/json; charset=utf-8",
        async: false,
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", uuid);
        },
        error: function (data) {
            console.log('ajax fail.. :' + JSON.stringify(data));
        },
        success: function (data) {
            console.log("ajax success.. : " + JSON.stringify(data));
            drawContactList(data);
        }
    });

    $("#searchUserBtn").unbind().bind("click", function () {
        var userInfo = $("#searchUserinfo").val();
        if (userInfo == "") {
            alert("There are no values entered. Check again.");
            return;
        }

        $.ajax({
            type: "GET",
            url: SERVER_IP + "api/search/" + userInfo,
            contentType: "application/json; charset=utf-8",
            async: false,
            crossDomain: true,
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", uuid);
            },
            error: function (data) {
                console.log('ajax fail.. :' + JSON.stringify(data));
                alert("Fail to get UserInfo");
            },
            success: function (data) {
                console.log("ajax success.. : " + JSON.stringify(data));

                if (data.result != 'ok') {
                    alert("Fail to get UserInfo from server");
                } else {
                    getSearchUser(data);
                }
            }
        });
    });

    $("#AddFavoriteUserBtn").unbind().bind("click", function () {
        var userUUid = $("input[name='radio']:checked").attr('uuid');
        if (userUUid == undefined) {
            alert("No checked User. Check again.");
            return;
        }

        var data = {};
        data.favorite_uuid = userUUid;

        var userInfo = $("#nickname").val();
        if (userInfo != '') data.nickname = userInfo;
        else data.nickname = $("input[name='radio']:checked").attr('email');

        $.ajax({
            type: "POST",
            url: SERVER_IP + "api/contact/" + uuid,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            async: false,
            crossDomain: true,
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", uuid);
            },
            error: function (data) {
                console.log('ajax fail.. :' + JSON.stringify(data));
                alert("Fail to add contactList");
            },
            success: function (data) {
                console.log("ajax success.. : " + JSON.stringify(data));

                if (data.result != 'ok') {
                    alert("Fail to add contactList from server");
                } else {
                    alert("success to add contactList");

                    $("#nickname").val('');
                    $("#searchUserinfo").val('');
                    getFavoriteUserList();
                }
            }
        });
    });

    $("#makeACallBtn").unbind().bind("click", function () {
        // TODO 다자간 통신 변경 시, 수정되어야 함
        var userUUID = $("input[name='checkbox']:checked").attr('uuid');
        var userEmail = $("input[name='checkbox']:checked").attr('email');

        if (userUUID == undefined) {
            alert("No checked User. Check again.");
            return;
        }

        var jsonObj = {
            action: "call",
            email: userEmail,
            uuid: userUUID
        }

        // TODO
        // var jsonObj = {
        //     action: "call",
        //     receivers : [{
        //         email: userEmail,
        //         uuid: userUUID
        //     },
        //     {
        //         email: userEmail,
        //         uuid: userUUID
        //     },
        //     {
        //         email: userEmail,
        //         uuid: userUUID
        //     },
        //     {
        //         email: userEmail,
        //         uuid: userUUID
        //     }]
        // }

        console.log(jsonObj)
        window.chrome.webview.postMessage(JSON.stringify(jsonObj));
    });

    $("#cancelBtn").unbind().bind("click", function () {
        $("#nickname").val('');
        $("#searchUserinfo").val('');

        $(".favoriteUserDiv").show();
        $(".reservationUserDiv").show();
        $(".searchUserDiv").hide();
    });
}

function drawContactList(data) {
    $("#favoriteUserListDiv > table").css('display', 'none');
    $("#favoriteUserListDiv > table > tbody").text('');

    if (data.contents.length == undefined) {
        $("#favoriteUserListDiv").addClass('noData');
        $("#favoriteUserListDiv > table").attr('display', true);
        return;
    } else {
        var html = "";
        for (var i = 0; i < data.contents.length; i++) {
            html += '<tr> \
                        <td style="width:250px;"><input type="checkbox" id="chk_' + i + '" name="checkbox" uuid="' + data.contents[i].favorite_uid.uuid + '" email="' + data.contents[i].favorite_uid.email + '"> \
                        <label for="chk_' + i + '">' + data.contents[i].nickname + '</td> \
                        <td><button type="button" class="button dark mini fw delFavoriteUser" style="width:50px; float: right;" uuid="' + data.contents[i].favorite_uid.uuid + '" >DEL</button></td> \
                    </tr>';
        }

        $("#favoriteUserListDiv").removeClass('noData');
        $("#favoriteUserListDiv > table").css('display', 'inline-table');
        $("#favoriteUserListDiv > table > tbody").append(html);

        $(".delFavoriteUser").unbind().bind("click", function () {
            var data = {};
            data.favorite_uuid = $(this).attr('uuid');

            $.ajax({
                type: "DELETE",
                url: SERVER_IP + "api/contact/" + uuid,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                async: false,
                crossDomain: true,
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", uuid);
                },
                error: function (data) {
                    console.log('ajax fail.. :' + JSON.stringify(data));
                    alert("Fail to delete contactList");
                },
                success: function (data) {
                    console.log("ajax success.. : " + JSON.stringify(data));

                    if (data.result != 'ok') {
                        alert("Fail to delete contactList from server");
                    } else {
                        alert("success to delete contactList");
                        getFavoriteUserList();
                    }
                }
            });
        });
    }
}

function getSearchUser(data) {
    $("#searchUserListDiv > table").css('display', 'none');
    $("#searchUserListDiv > table > tbody").text('');

    if (data.result == "nok" || data.contents.length == 0) {
        alert("No searched User.");
        return;
    } else {
        // TODO 내 검색 미포함 처리하기
        var html = "";
        for (var i = 0; i < data.contents.length; i++) {
            html += '<tr> \
                    <td><input type="radio" id="radio_' + i + '" name="radio" uuid="' + data.contents[i].uuid + '" email="' + data.contents[i].email + '" > \
                    <label for="radio_' + i + '">' + data.contents[i].email + ", " + data.contents[i].firstname + " " + data.contents[i].lastname + '</td> \
                </tr>';
        }

        $("#searchUserListDiv").removeClass('noData');
        $("#searchUserListDiv > table").css('display', 'inline-table');
        $("#searchUserListDiv > table > tbody").append(html);

        $(".favoriteUserDiv").hide();
        $(".reservationUserDiv").hide();
        $(".searchUserDiv").show();
    }
}

function getReservationList() {
    $.ajax({
        type: "GET",
        url: SERVER_IP + "api/schedule",
        contentType: "application/json; charset=utf-8",
        async: false,
        crossDomain: true,
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", uuid);
        },
        error: function (data) {
            console.log('ajax fail.. :' + JSON.stringify(data));
        },
        success: function (data) {
            console.log("ajax success.. : " + JSON.stringify(data));
            drawReservationList(data);
        }
    });
}

function drawReservationList(data) {
    $("#reservationListDiv > table").css('display', 'none');
    $("#reservationListDiv > table > tbody").text('');

    if (data.contents.length == undefined) {
        $("#reservationListDiv").addClass('noData');
        $("#reservationListDiv > table").attr('display', true);
        return;
    } else {
        var html = "";
        for (var i = 0; i < data.contents.length; i++) {
            var time = new Date(data.contents[i].updated_at);
            var now = new Date();

            // TODO 시작시간 1일 이내의 미팅만 JOIN 버튼 활성화
            console.log(now.getTime())
            console.log(time.getTime())

            var active = false;
            if (now.getTime() >= time.getTime() && now.getTime() < (time.getTime() + 86500000))
                active = true;

            console.log(active)

            html += '<tr> \
                        <td style="width:250px;">' + "[ Reservation ID : " + data.contents[i].room_id + " ] " + time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + '</td> \
                        <td><button type="button" class="button dark mini fw joinMeeting" style="width:50px; float: right;" roomid=" ' + data.contents[i].room_id + '">JOIN</button></td> \
                    </tr>';
        }

        $("#reservationListDiv").removeClass('noData');
        $("#reservationListDiv > table").css('display', 'inline-table');
        $("#reservationListDiv > table > tbody").append(html);

        $(".joinMeeting").unbind().bind("click", function () {
            var roomId = $(this).attr('roomid').toString().replace(' ', '');
            var jsonObj = {
                action: "join",
                roomid: roomId
            }
            console.log(jsonObj)
            window.chrome.webview.postMessage(JSON.stringify(jsonObj));
        });
    }
}
