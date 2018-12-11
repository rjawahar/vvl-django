var avroObj = {};

jQuery(document).ready(function($) {
    $('.dropDownHook span').on('click', function() {
        $(this).parents('.dropDownHook').children('.dropDownContent').stop(true, true).slideToggle('medium', function() {

            if ($('.dropDownContent').is(':visible')) {
                //  This alters the content of the "hook" when we open the drop down
            } else {
                //  This alters the content of the "hook" when we close the dropdown
            }
        });
    });

    $('html').on('click', function() {
        $('.dropDownContent:visible').slideToggle('fast');
    });

    $('.dropDownHook > *').on('click', function(event) {
        event.stopPropagation();
    });

});



var saleVal = 0;

function summationOfSales(id) {
    if (document.getElementById('brand_sale').value) {
        saleVal = parseFloat(document.getElementById('brand_sale').value);
        document.getElementById('total_sale').value = saleVal;
    }
    if (document.getElementById('nonbrand_sale').value) {
        saleVal = parseFloat(document.getElementById('nonbrand_sale').value);
        document.getElementById('total_sale').value = saleVal;
    }
    if (document.getElementById('brand_sale').value && document.getElementById('nonbrand_sale').value) {
        saleVal = parseFloat(document.getElementById('brand_sale').value) + parseFloat(document.getElementById('nonbrand_sale').value);
        document.getElementById('total_sale').value = saleVal;
    }

}
var surplusAvail = 0;

function CalcSurplusAvail(id) {
    if (document.getElementById('annual_household_income').value) {
        surplusAvail = parseFloat(document.getElementById('annual_household_income').value);
        document.getElementById('surplus_available').value = surplusAvail;
    }
    if (document.getElementById('annual_household_income').value && document.getElementById('annual_expenses').value) {
        surplusAvail = parseFloat(document.getElementById('annual_household_income').value) - parseFloat(document.getElementById('annual_expenses').value);
        document.getElementById('surplus_available').value = surplusAvail.toFixed(0);
    }

}

function maritalStatus_change() {
    var marital_status_val = document.getElementById("marital_status").value;
    if (marital_status_val == 2) {
        document.getElementById("no_of_child_below17").value = 0;
        document.getElementById("no_of_child_above17").value = 0;
    }
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault)
            theEvent.preventDefault();
    }
}

$('.dropDownContent').css('display', 'none');

window.onload = function() {

    if (screenHeight) {
        var height = screenHeight * (0.9);
        var slipHeight = height / 3;
        $('body').height((height * (0.9)));
        $('.task-div').height((height * (0.9)));
        $('.main-task').height((height * (0.9)));
        $('#right-pane-task').height((height * (0.9)));
        $('#right-pane-task-detail').height((height * (0.82)));
        document.getElementById('right-pane-task-detail').style.overflowY = 'auto';
    }
    setSelectOptionInForm(); /*Function in masterDataLoad.js	*/
    //loadingMlCompositeData();	/*Function in masterDataLoad.js	*/
    imagePopUp();
}

function loadingData() {

    var keyFields = Object.keys(data.mlcompositeArray[0]);
    var arrayKeys = ['memberAssetArray', 'memberNetworkArray', 'idProofArray', 'businessStaffArray', 'memberFamilyArray'];

    var imgFiles = ['member_bank_fk_alf_node_ref', 'member_bank_fk_alf_node_ref1', 'biz_address_fk_alf_node_ref', 'biz_address_fk_alf_node_ref1',
        'biz_id_alf_node_ref', 'biz_id_alf_node_ref1', 'alf_node_ref', 'alf_node_ref1', 'current_address_fk_alf_node_ref', 'current_document_url'
    ];

    for (var i = 0; i < keyFields.length; i++) {
        if (($.inArray(keyFields[i], arrayKeys) == -1)) { // && ($.inArray(keyFields[i], imgFiles) == -1)
            if (document.getElementById('' + keyFields[i] + '')) {
                if (data.mlcompositeArray[0][keyFields[i]] || (data.mlcompositeArray[0][keyFields[i]] == 0)) {
                    $("#" + keyFields[i] + " select").val(data.mlcompositeArray[0][keyFields[i]]);
                    document.getElementById('' + keyFields[i] + '').value = data.mlcompositeArray[0][keyFields[i]];
                }
            }
        }
    }

    var objData = data.mlcompositeArray[0];
    for (var i = 0; i < arrayKeys.length; i++) {
        if (objData[arrayKeys[i]]) {
            for (var j = 0; j < objData[arrayKeys[i]].length; j++) {
                var data_select = data.mlcompositeArray[0][arrayKeys[i]][j];
                var objKeys = Object.keys(data.mlcompositeArray[0][arrayKeys[i]][j]);
                for (var k = 0; k < objKeys.length; k++) {
                    if (data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] || (data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]] == 0)) {
                        if (document.getElementById(objKeys[k] + '_' + (j + 1))) {
                            $("#" + objKeys[k] + "_" + (j + 1) + " select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
                            document.getElementById('' + objKeys[k] + "_" + (j + 1) + '').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
                        }
                        if (document.getElementById('' + objKeys[k] + '')) {
                            $("#" + objKeys[k] + " select").val(data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]]);
                            document.getElementById('' + objKeys[k] + '').value = data.mlcompositeArray[0][arrayKeys[i]][j][objKeys[k]];
                        }
                    }
                }
            }
        }
    }
}

/*******Image to Show on File browser*******/
function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#' + id + '').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function imagePopUp() {

    /*ID proof*/
    $(".alf_node_ref_img").change(function() {
        readURL(this, 'alf_node_ref_img_pop');
    });

    $(".alf_node_ref1_img").change(function() {
        readURL(this, 'alf_node_ref1_img_pop');
    });

    /*Address proof*/
    $(".current_document_url_img").change(function() {
        readURL(this, 'current_document_url_img_pop');
    });
    $(".current_address_fk_alf_node_ref_img").change(function() {
        readURL(this, 'current_address_fk_alf_node_ref_img_pop');
    });

    /*Bank Address proof*/
    $(".member_bank_fk_alf_node_ref_img").change(function() {
        readURL(this, 'member_bank_fk_alf_node_ref_img_pop');
    });
    $(".member_bank_fk_alf_node_ref1_img").change(function() {
        readURL(this, 'member_bank_fk_alf_node_ref1_img_pop');
    });

    /*Business proof*/
    $(".biz_address_fk_alf_node_ref_img").change(function() {
        readURL(this, 'biz_address_fk_alf_node_ref_img_pop');
    });
    $(".biz_address_fk_alf_node_ref1_img").change(function() {
        readURL(this, 'biz_address_fk_alf_node_ref1_img_pop');
    });
    $(".biz_address_fk_alf_node_ref2_img").change(function() {
        readURL(this, 'biz_address_fk_alf_node_ref2_img_pop');
    });
    $(".biz_address_fk_alf_node_ref3_img").change(function() {
        readURL(this, 'biz_address_fk_alf_node_ref3_img_pop');
    });

    /*Business proof*/
    $(".biz_id_alf_node_ref_img").change(function() {
        readURL(this, 'biz_id_alf_node_ref_img_pop');
    });
    $(".biz_id_alf_node_ref1_img").change(function() {
        readURL(this, 'biz_id_alf_node_ref1_img_pop');
    });

    /*loan proof*/
    $(".ml_fk_alf_node_ref_img").change(function() {
        readURL(this, 'ml_fk_alf_node_ref_img_pop');
    });

    $(".file_img").on('click', function() {
        var theSrc = $(this).attr('src');
        showPopup(theSrc);
    });
    $(".popup").on('click', ".wrap", function() {
        $(".popup").fadeOut();
    })



    /*Address proof Img*/
    $("#current_document_url_img").change(function() {
        document.getElementById('current_document_url').value = this.value;
    });
    $("#current_address_fk_alf_node_ref_img").change(function() {
        document.getElementById('current_address_fk_alf_node_ref').value = this.value;
    });

    /*Bank Pass book Img*/
    $("#member_bank_fk_alf_node_ref_img").change(function() {
        document.getElementById('member_bank_fk_alf_node_ref').value = this.value;
    });
    $("#member_bank_fk_alf_node_ref1_img").change(function() {
        document.getElementById('member_bank_fk_alf_node_ref1').value = this.value;
    });

    /*BUSINESS PASSBOOK PROOF*/
    $("#biz_id_alf_node_ref_img").change(function() {
        document.getElementById('biz_id_alf_node_ref').value = this.value;
    });
    $("#biz_id_alf_node_ref1_img").change(function() {
        document.getElementById('biz_id_alf_node_ref1').value = this.value;
    });

    /*BUSINESS PASSBOOK PROOF*/
    $("#biz_address_fk_alf_node_ref_img").change(function() {
        document.getElementById('biz_address_fk_alf_node_ref').value = this.value;
    });
    $("#biz_address_fk_alf_node_ref1_img").change(function() {
        document.getElementById('biz_address_fk_alf_node_ref1').value = this.value;
    });
    $("#biz_address_fk_alf_node_ref2_img").change(function() {
        document.getElementById('biz_address_fk_alf_node_ref2').value = this.value;
    });
    $("#biz_address_fk_alf_node_ref3_img").change(function() {
        document.getElementById('biz_address_fk_alf_node_ref3').value = this.value;
    });

    /*LOAN DOCUMENT ATTACHMENT*/
    $("#ml_fk_alf_node_ref_img").change(function() {
        document.getElementById('ml_fk_alf_node_ref').value = this.value;
    });
}


function setURL(id) {
    if (id.indexOf("biz_address_fk") >= 0) {
        var id_split = id.split('_');
        var inp_url_id = id.substring(0, (id.length - 4));
        $("#" + id).change(function() {
            document.getElementById(inp_url_id).value = this.value;
            readURL(this, id + "_pop");
        });
    } else {
        var id_split = id.split('_');
        var inp_img_id = id.substring(0, (id.length - 2));
        var inp_url_id = id_split[0] + "_" + id_split[1] + "_" + id_split[2];
        var id_select = id_split[id_split.length - 1];
        $("#" + id).change(function() {
            document.getElementById(inp_url_id + "_" + id_select).value = this.value;
            readURL(this, inp_img_id + "_pop_" + id_select);
        });
    }
}

function validateIdProofArray(idInd, idVal, e) {

    var splitByID = idVal.split('_');
    var id = splitByID[4];
    var theEvent = e || window.event;
    theEvent.preventDefault();

    if (idInd == "ref") {
        if (document.getElementById("id_proof_type_" + id).value && document.getElementById("fk_id_proof_type_id_" + id).value)
            $('#alf_node_ref_img_' + id)[0].click();
        else {
            $("#id_proof_type_" + id).animate({
                backgroundColor: '#ffa812'
            }, 'slow');
            setTimeout(function() {
                $("#id_proof_type_" + id).animate({
                    backgroundColor: 'white'
                }, 'slow');
            }, 5000);
        }
    }

    if (idInd == "ref1") {
        if (document.getElementById("id_proof_type_" + id).value && document.getElementById("alf_node_ref_img_" + id).value)
            $('#alf_node_ref1_img_' + id)[0].click();
        if (!document.getElementById("id_proof_type_" + id).value)
            $("#id_proof_type_" + id).animate({
                backgroundColor: '#ffa812'
            }, 'slow');
        setTimeout(function() {
            $("#id_proof_type_" + id).animate({
                backgroundColor: 'white'
            }, 'slow');
        }, 5000);
        if (!document.getElementById("alf_node_ref_img_" + id).value)
            $("#alf_node_ref_" + id).animate({
                backgroundColor: '#ffa812'
            }, 'slow');
        setTimeout(function() {
            $("#alf_node_ref_" + id).animate({
                backgroundColor: 'white'
            }, 'slow');
        }, 5000);
    }
}

$(document).on("click", "#care_of_relation", function() {
    var relation = $('input[name="care_of_relation"]:checked').val();
    if (relation == "Son of" || relation == "Daughter of") {
        $("#spouse_div *").prop("disabled", "true");
    }
    if (relation == "Wife of" || relation == "Husband of") {
        $("#spouse_div *").removeAttr("disabled");
    }
});

$(document).on("change", "#biz_location", function() {
    var biz_location = document.getElementById("biz_location").value;
    if (biz_location == "1") {
        $("#rent_pay_month").css("background-color", "#eee")
        $("#rent_div *").prop("disabled", "true");
        $("#rent").remove();
        var index = $.inArray("rent_pay_month", intValidate);
        delete intValidate[index];
    }

    if (biz_location == "2") {
        $("#rent_pay_month").css("background-color", "white");
        $("#rent_div *").removeAttr("disabled");
        $("#rent_div").append("<font id='rent' class='mandatory'>*</font></div>");
        intValidate.push("rent_pay_month");
    } else {
        $("#rent").remove();
    }
});

function validateShopImageArray(idInd, idVal, e) {

    var theEvent = e || window.event;
    theEvent.preventDefault();
    if (idInd == "1") {
        $('#biz_address_fk_alf_node_ref_1_img').css("visibility", "visible");
        $('#biz_address_fk_alf_node_ref_1_img')[0].click();
    }
    if (idInd == "2") {
        if (document.getElementById("biz_address_fk_alf_node_ref_1_img").value) {
            $('#biz_address_fk_alf_node_ref_2_img').css("visibility", "visible");
            $('#biz_address_fk_alf_node_ref_2_img')[0].click();
        } else {
            alert("Please upload the file in Shop Image 1 field !!!!!!");
            $("#shopImg1").animate({
                backgroundColor: '#ffa812'
            }, 'slow');
            setTimeout(function() {
                $("#shopImg1").animate({
                    backgroundColor: 'transparent'
                }, 'slow');
            }, 5000);
            $("#shopImg1").addClass("animated shake").delay(2000).queue(function() {
                $(this).removeClass("animated shake");
                $(this).dequeue();
            });
        }
    }
    if (idInd == "3") {
        if (document.getElementById("biz_address_fk_alf_node_ref_1_img").value) {
            if (document.getElementById("biz_address_fk_alf_node_ref_2_img").value) {
                $('#biz_address_fk_alf_node_ref_3_img').css("visibility", "visible");
                $('#biz_address_fk_alf_node_ref_3_img')[0].click();
            } else {
                alert("Please upload the file in Shop Image 2 field !!!!!!");
                $("#shopImg2").animate({
                    backgroundColor: '#ffa812'
                }, 'slow');
                setTimeout(function() {
                    $("#shopImg2").animate({
                        backgroundColor: 'transparent'
                    }, 'slow');
                }, 5000);
                $("#shopImg2").addClass("animated shake").delay(2000).queue(function() {
                    $(this).removeClass("animated shake");
                    $(this).dequeue();
                });
            }
        } else {
            alert("Please upload the file in Shop Image 1 field first !!!!!!");
            $("#shopImg1").animate({
                backgroundColor: '#ffa812'
            }, 'slow');
            setTimeout(function() {
                $("#shopImg1").animate({
                    backgroundColor: 'transparent'
                }, 'slow');
            }, 5000);
            $("#shopImg1").addClass("animated shake").delay(2000).queue(function() {
                $(this).removeClass("animated shake");
                $(this).dequeue();
            });
        }
    }

    if (idInd == "4") {
        if (document.getElementById("biz_address_fk_alf_node_ref_1_img").value) {
            if (document.getElementById("biz_address_fk_alf_node_ref_2_img").value) {
                if (document.getElementById("biz_address_fk_alf_node_ref_3_img").value) {
                    $('#biz_address_fk_alf_node_ref_4_img').css("visibility", "visible");
                    $('#biz_address_fk_alf_node_ref_4_img')[0].click();
                } else {
                    alert("Please upload the file in Shop Image 3 field !!!!!!");
                    $("#shopImg3").animate({
                        backgroundColor: '#ffa812'
                    }, 'slow');
                    setTimeout(function() {
                        $("#shopImg3").animate({
                            backgroundColor: 'transparent'
                        }, 'slow');
                    }, 5000);
                }
            } else {
                alert("Please upload the file in Shop Image 2 field first!!!!!!");
                $("#shopImg2").animate({
                    backgroundColor: '#ffa812'
                }, 'slow');
                setTimeout(function() {
                    $("#shopImg2").animate({
                        backgroundColor: 'transparent'
                    }, 'slow');
                }, 5000);
                $("#shopImg2").addClass("animated shake").delay(2000).queue(function() {
                    $(this).removeClass("animated shake");
                    $(this).dequeue();
                });
            }
        } else {
            alert("Please upload the file in Shop Image 1 field first !!!!!!");
            $("#shopImg1").animate({
                backgroundColor: '#ffa812'
            }, 'slow');
            setTimeout(function() {
                $("#shopImg1").animate({
                    backgroundColor: 'transparent'
                }, 'slow');
            }, 5000);
            $("#shopImg1").addClass("animated shake").delay(2000).queue(function() {
                $(this).removeClass("animated shake");
                $(this).dequeue();
            });
        }
    }


}



function changeForms11(d) {
    $('.label-text.active').attr("class", "label-text");
    $('#label-text' + d).attr("class", "label-text active");
}

function isInt11(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat11(n) {
    return n === Number(n) && n % 1 !== 0;
}

function closePopUp11() {
    $(".popup").fadeOut();
}

/*Creating a New UUID*/
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

var id_mob = 2;

$(document).on('click', '#add-mob-btn', function() {
    var child = document.getElementById("add-mob-btn");
    child.remove();
    id_mob++;
    if (id_mob > 3)
        return
    var objTo = document.getElementById('mob')
    var mobile_number_div = document.createElement("div");
    mobile_number_div.innerHTML = '<input type="text"  id="mobile_number_' + id_mob + '" style="margin-top:3px;" onkeypress="validate(event)" maxlength="10" name="mobile_number"  placeholder="MOBILE"></input>' +
        '&nbsp<a href="javascript:void(0)"  id="add-mob-btn" class="btn btn-red btn-icon icon-left"  style="height:15px;padding-left:3px;">' +
        '<i 	class="entypo-plus"	 style="width:15px;height:15px;color: white;padding:0px;">	</i></a>';
    objTo.appendChild(mobile_number_div);
    if (id_mob == 3) {
        var child = document.getElementById("add-mob-btn");
        child.remove();
    }
        
});

var id_email = 1;
$(document).on('click', '#add-email-btn', function() {
    var child = document.getElementById("add-email-btn");
    child.remove();
    id_email++;
    if (id_email > 3)
        return
    var objTo = document.getElementById('email-div')
    var email_div = document.createElement("div");
    email_div.innerHTML = '<input type="email"  id="email_' + id_email + '" style="margin-top:3px;" name="email"  placeholder="EMAIL-ID"></input>' +
        '&nbsp<a href="javascript:void(0)"  id="add-email-btn" class="btn btn-red btn-icon icon-left"  style="height:15px;padding-left:3px;">' +
        '<i 	class="entypo-plus"	 style="width:15px;height: 15px;color: white;padding:0px;">	</i></a>';

    objTo.appendChild(email_div);
    if (id_email == 3) {
        var child = document.getElementById("add-email-btn");
        child.remove();
    }
});


function showPopup11(imgSrc) {
    if (imgSrc) {
        var theImg = '<div class="wrap">' +
            '<iframe width="100%" height="500" src="' + imgSrc + '"></iframe>' +
            '<div style="padding-top:1%;">' +
            '<a href="javascript:void(0)" onclick="closePopUp();"  class="btn btn-red btn-icon icon-left" style="height:30px;padding-left:40px;">' +
            '<i class="icon-entypo-cancel" style="width:30px;height: 28px;color: white;padding:6px;"></i>' +
            'Close' +
            '</a>' +
            '</div>' +
            '</div>';
        $(".popup").empty().append(theImg).fadeIn();
    } else {
        var theImg = '<div class="wrap"><label>No Image Added</label></div>';
    }
}

function maritalStatus_change() {

    var marital_status_val = document.getElementById("marital_status").value;

    if (marital_status_val == 2) {
        document.getElementById("no_of_child_below17").value = 0;
        document.getElementById("no_of_child_above17").value = 0;
    }

}

function submitForm() {
    var url = "/submit/";
    var html = '';
    $("#alertContentId").html('');
    var currentDateValue = (new Date());
    currentDateValue = JSON.stringify(currentDateValue);
    currentDateValue = currentDateValue.replace(/"/g, '');
    var count = 0;
    var validation = 0;
    var label = '';
    var mandatoryFieldsDict = {};

    for (var i = 1; i <= 6; i++) {
        if (!document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value)
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
        if (document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value)
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
        if (document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value)
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        if (!document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
        }
        if (!document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        }
        if (document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        }
        if (document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value) {
            count++;
        }
    }

    if (count < 3) {
        $.alert("Please provide atleast three ID Proof Details!");
        return false;
    }

    for (var i = 0; i < stringValidate.length; i++) {
        if (document.getElementById("" + stringValidate[i] + "")) {
            if (document.getElementById("" + stringValidate[i] + "").value == "") {
                $("#" + stringValidate[i] + "").css('background-color', 'yellow');
                $("#" + stringValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById("" + stringValidate[i] + "_label" + "").innerHTML;
                mandatoryFieldsDict[label] = "Input text";
            }
        }
    }

    for (var i = 0; i < intValidate.length; i++) {
        if (document.getElementById("" + intValidate[i] + "")) {
            if (/^[0-9]*$/.test(document.getElementById("" + intValidate[i] + "").value) == false || document.getElementById("" + intValidate[i] + "").value == "") {
                $("#" + intValidate[i] + "").css('background-color', 'yellow');
                $("#" + intValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(intValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Input only Numeric Value";
            }
        }
    }

    for (var i = 0; i < selectOptionValidate.length; i++) {
        if (document.getElementById("" + selectOptionValidate[i] + "")) {
            if (/^[0-9]*$/.test(document.getElementById("" + selectOptionValidate[i] + "").value) == false || document.getElementById("" + selectOptionValidate[i] + "").value == "") {
                $("#" + selectOptionValidate[i] + "").css('background-color', 'yellow');
                $("#" + selectOptionValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(selectOptionValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Select a Value";
            }
        }
    }


    for (var i = 0; i < file_inputs.length; i++) {
        if (document.getElementById("" + file_inputs[i] + "")) {
            if (document.getElementById("" + file_inputs[i] + "").value == "") {
                $("#" + file_inputs[i] + "").css('background-color', 'yellow');
                $("#" + file_inputs[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById("" + file_inputs[i] + "_label" + "").innerHTML;
                mandatoryFieldsDict[label] = "Upload document";
            }
        }
    }



    for (var i = 0; i < floatValidate.length; i++) {
        if (document.getElementById("" + floatValidate[i] + "")) {
            if (isFloat(parseFloat(document.getElementById("" + floatValidate[i] + "").value)) || (/^[-+]?[0-9]*$/.test(document.getElementById("" + floatValidate[i] + "").value)) || /^[-+]?[0-9]+\.[0-9]+$/.test(document.getElementById("" + floatValidate[i] + "").value) == true) {

            } else {
                $("#" + floatValidate[i] + "").css('background-color', 'yellow');
                $("#" + floatValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(floatValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Numeric";
            }

        }
    }



    /*************** Basic Details ****************/
    /*Name Details*/
    var firstname = document.getElementById("firstname").value;
    var middlename = document.getElementById("middlename").value;
    var lastname = document.getElementById("lastname").value;
    var mobile_number = document.getElementById("mobile_number_1").value;

    /*Gender relation and age Details*/
    var gender = $('input[name="gender"]:checked').val();
    var care_of_relation = $('input[name="care_of_relation"]:checked').val();

    var father_name = document.getElementById("father_name").value;
    var spouse_name = document.getElementById("spouse_name").value;
    var dob = document.getElementById("dob").value;
    var age = document.getElementById("age").value;

    /*Address details*/
    var doorNo = document.getElementById("current_door_no").value;
    var streetName = document.getElementById("current_street_name").value;
    var locationName = document.getElementById("current_location_name").value;
    var city_town = document.getElementById("fk_curr_village_or_town_id").value;

    var state = document.getElementById("current_state").value;
    var district = document.getElementById("current_district").value;
    var taluk = document.getElementById("current_taluk").value;
    var pincode = document.getElementById("current_pincode").value;

    /*Address Proof Information*/
    /*var fk_current_address_proof_type_id	= document.getElementById("fk_current_address_proof_type_id").value;	
    var current_document_value   		= document.getElementById("current_document_value").value;	
    var current_document_url		= document.getElementById("current_document_url").value;
    var current_address_fk_alf_node_ref	= document.getElementById("current_address_fk_alf_node_ref").value;*/
    var current_address_location_name = document.getElementById("current_address_location_name").value;

    /*Bank Information*/
    var id1_name_as_per_bank_records = document.getElementById("id1_name_as_per_bank_records").value;
    var id1_bank_name = document.getElementById("id1_bank_name").value;
    var id1_bank_account_number = document.getElementById("id1_bank_account_number").value;
    var id1_bank_ifsc_code = document.getElementById("id1_bank_ifsc_code").value;

    var member_bank_fk_alf_node_ref = document.getElementById("member_bank_fk_alf_node_ref").value;
    var member_bank_fk_alf_node_ref1 = document.getElementById("member_bank_fk_alf_node_ref1").value;

    /*Loan Information*/
    var fk_purpose_id = document.getElementById("fk_purpose_id").value;
    var fk_product_id_loan = document.getElementById("fk_product_id_loan").value;
    var application_loan_amount = document.getElementById("application_loan_amount").value;
    var ml_fk_alf_node_ref = document.getElementById("ml_fk_alf_node_ref").value;


    /*************** Business Details ****************/
    /*Business Info*/
    var biz_nature = document.getElementById("biz_nature").value;
    var biz_no_of_yrs = document.getElementById("biz_no_of_yrs").value;
    var biz_location = document.getElementById("biz_location").value;
    var rent_pay_month = document.getElementById("rent_pay_month").value;

    var biz_door_no = document.getElementById("biz_door_no").value;
    var biz_street_name = document.getElementById("biz_street_name").value;
    var biz_location_name = document.getElementById("biz_location_name").value;
    var fk_biz_village_or_town = document.getElementById("fk_biz_village_or_town").value;

    var biz_state = document.getElementById("biz_state").value;
    var biz_district = document.getElementById("biz_district").value;
    var biz_taluk = document.getElementById("biz_taluk").value;
    var biz_pincode = document.getElementById("biz_pincode").value;

    var biz_office_address_landline_number = document.getElementById("biz_office_address_landline_number").value;
    var biz_office_address_mobile_number = document.getElementById("biz_office_address_mobile_number").value;

    var biz_address_fk_alf_node_ref = document.getElementById("biz_address_fk_alf_node_ref_1").value;
    var biz_address_fk_alf_node_ref1 = document.getElementById("biz_address_fk_alf_node_ref_2").value;
    var biz_address_fk_alf_node_ref2 = document.getElementById("biz_address_fk_alf_node_ref_3").value;
    var biz_address_fk_alf_node_ref3 = document.getElementById("biz_address_fk_alf_node_ref_4").value;

    /*Regulatory Information*/
    var biz_localbody_app = $('input[name="biz_localbody_app"]:checked').val();
    var biz_id_alf_node_ref = document.getElementById("biz_id_alf_node_ref").value;
    var biz_id_alf_node_ref1 = document.getElementById("biz_id_alf_node_ref1").value;

    var biz_issued_by = document.getElementById("biz_issued_by").value;
    var biz_no = document.getElementById("biz_no").value;
    var biz_type = document.getElementById("biz_type").value;
    var biz_valid_upto = document.getElementById("biz_valid_upto").value;

    /*Sales and Expense information*/
    var brand_sale = document.getElementById("brand_sale").value;
    var nonbrand_sale = document.getElementById("nonbrand_sale").value;
    var total_sale = document.getElementById("total_sale").value;
    var min_sale_day = document.getElementById("min_sale_day").value;

    var annual_household_income = document.getElementById("annual_household_income").value;
    var annual_expenses = document.getElementById("annual_expenses").value;
    var surplus_available = document.getElementById("surplus_available").value;

    /*************** Demographic Details ****************/
    /*Famil Details*/
    var marital_status = document.getElementById("marital_status").value;
    var no_of_child_below17 = document.getElementById("no_of_child_below17").value;
    var no_of_child_above17 = document.getElementById("no_of_child_above17").value;
    var live_with = document.getElementById("live_with").value;

    /*Transportation and communication and other assets*/
    var Transportation_communication_assets = [];
    var dob_split = dob.split('-');
    var dob_dmy_fmt = dob_split[2] + '-' + dob_split[1] + '-' + dob_split[0];
    var keys = Object.keys(masterAssetArrayDic);
    var memberAssetsSelect = 0;
    for (var i = 1; i <= 32; i++) {
        var obj = {};
        if (document.getElementById("fk_member_asset_type_id_" + i + "")) {
            if (document.getElementById("fk_member_asset_type_id_" + i + "").checked) {
                var self_occupation_id = document.getElementById("fk_member_asset_type_id_" + i + "").value;
                if (self_occupation_id != "") {
                    memberAssetsSelect = 1;
                    obj["member_asset_member_id"] = 1;
                    obj["fk_member_asset_type_id"] = parseInt(i);
                    obj["member_asset_category"] = self_occupation_id;
                    obj["member_asset_fk_last_modified_by"] = userId;
                    obj["member_asset_fk_sci_client_id"] = 1;
                    obj["member_asset_last_modified_date"] = currentDateValue;
                }
            } else {
                var self_occupation_id = document.getElementById("fk_member_asset_type_id_" + i + "").value;
                if (self_occupation_id != "") {
                    memberAssetsSelect = 1;
                    obj["member_asset_member_id"] = 1;
                    obj["fk_member_asset_type_id"] = null;
                    obj["member_asset_category"] = null;
                    obj["member_asset_fk_last_modified_by"] = userId;
                    obj["member_asset_fk_sci_client_id"] = 1;
                    obj["member_asset_last_modified_date"] = currentDateValue;

                }
            }
            Transportation_communication_assets.push(obj);
        }
    }


    /*ID Proof Information*/
    var idProofArray = [];
    for (var i = 1; i <= 6; i++) {
        var idProof = {};
        if (document.getElementById("fk_id_proof_type_id_" + i + "") && document.getElementById("id_proof_type_" + i + "")) {
            if (document.getElementById("fk_id_proof_type_id_" + i + "").value) {
                if (jQuery('#alf_node_ref_img_' + (i) + "")[0].files) {
                    //jQuery.each(jQuery('#alf_node_ref_img_'+(i)+"")[0].files, function(j, file){
                    idProof['fk_id_proof_type_id'] = parseInt(document.getElementById("fk_id_proof_type_id_" + i + "").value);
                    idProof['id_proof_type'] = document.getElementById("id_proof_type_" + i + "").value;
                    idProof['alf_node_ref'] = document.getElementById("alf_node_ref_" + i + "").value;
                    idProof['alf_node_ref1'] = document.getElementById("alf_node_ref1_" + i + "").value;
                    idProof['id_proof_fk_last_modified_by'] = userId;
                    idProof['id_proof_last_modified_date'] = currentDateValue;
                    idProof['id_proof_fk_sci_client_id'] = 1;
                    idProofArray.push(idProof);
                    //});
                } else {
                    idProof['fk_id_proof_type_id'] = parseInt(document.getElementById("fk_id_proof_type_id_" + i + "").value);
                    idProof['id_proof_type'] = "";
                    idProof['alf_node_ref'] = "";
                    idProof['alf_node_ref1'] = "";
                    idProof['id_proof_fk_last_modified_by'] = userId;
                    idProof['id_proof_last_modified_date'] = currentDateValue;
                    idProof['id_proof_fk_sci_client_id'] = 1;
                    idProofArray.push(idProof);

                }
            }
        }
    }

    var addressProof = [];
    for (var data in idProofArray) {
        if (idProofArray[data]["id_proof_type"] != "" && idProofArray[data]['alf_node_ref'] != "" && idProofArray[data]['alf_node_ref1'] != "") {
            var obj = {};
            obj["fk_id_proof_type_id"] = idProofArray[data]["fk_id_proof_type_id"];
            obj["id_proof_type"] = idProofArray[data]["id_proof_type"];
            obj["alf_node_ref1"] = idProofArray[data]["alf_node_ref1"];
            obj["alf_node_ref"] = idProofArray[data]["alf_node_ref"];
            addressProof.push(obj);
        }
    }


    var alfNodeArray = [];
    for (var i = 1; i <= 4; i++) {
        var AlfNode = {};
        if (document.getElementById('biz_address_fk_alf_node_ref_' + i + '_img').files && document.getElementById('biz_address_fk_alf_node_ref_' + i + "").value) {
            AlfNode['alf_node_ref'] = document.getElementById('biz_address_fk_alf_node_ref_' + i + "").value;
            AlfNode['alf_last_modified_by'] = userId;
            AlfNode['alf_last_modified_date'] = currentDateValue;
            AlfNode['alf_fk_sci_client_id'] = 1;
            alfNodeArray.push(AlfNode);
        }
        /*else{
        	AlfNode['alf_node_ref'] 	= "";	
        	AlfNode['alf_last_modified_by'] = userId;
        	AlfNode['alf_last_modified_date'] = currentDateValue;
        	AlfNode['alf_fk_sci_client_id'] =1;
        	alfNodeArray.push( AlfNode );
		
        }*/
    }




    // Mobile number details
    var phoneNumberArray = [];
    for (var i = 1; i <= 3; i++) {
        var phoneNumber = {};
        if (document.getElementById("mobile_number_" + i + "")) {
            if (document.getElementById("mobile_number_" + i + "").value) {
                phoneNumber["number"] = parseInt(document.getElementById("mobile_number_" + i + "").value);
                phoneNumber['last_modified_by'] = userId;
                phoneNumber['type'] = "Ph_number Type";
                phoneNumber['last_modified_date'] = currentDateValue;
                phoneNumberArray.push(phoneNumber);
            }
        }
    }


    //Email-Id details

    var emailIdArray = [];
    for (var i = 1; i <= 3; i++) {
        var emailId = {};
        if (document.getElementById("email_" + i + "")) {
            if (document.getElementById("email_" + i + "").value) {
                emailId["email"] = document.getElementById("email_" + i + "").value;
                emailId['last_modified_by'] = userId;
                emailId['type'] = "Email-type";
                emailId['last_modified_date'] = currentDateValue;
                emailIdArray.push(emailId);
            }
        }

    }


    /*Network Details*/
    var network_details = [];
    var networkDetailsQSelect = 0;
    var networkDetailsASelect = 0;
    for (var i = 1; i < 6; i++) {
        var obj = {};
        var network_value1 = document.getElementById("network_details_answer_1").value;
        if (network_value1) {
            networkDetailsASelect = 1;
        }
        if (document.getElementById("network_details_question_" + i + "")) {
            var network_question = document.getElementById("network_details_question_" + i + "").value;
            var network_value = document.getElementById("network_details_answer_" + i + "").value;

            if ((network_value == "")) {
                obj["member_network_member_id"] = 1;
                obj["network_details_question"] = parseInt(NetQuestionArrayDic[network_question]);
                obj["network_details_answer"] = null;
                obj["member_network_fk_last_modified_by"] = userId;
                obj["member_network_fk_sci_client_id"] = 1;
                obj["member_network_last_modified_date"] = currentDateValue;
            }


            if ((network_value != "") && (network_question != "")) {

                obj["member_network_member_id"] = 1;
                obj["network_details_question"] = parseInt(NetQuestionArrayDic[network_question]);
                obj["network_details_answer"] = parseInt(network_value);
                obj["member_network_fk_last_modified_by"] = userId;
                obj["member_network_fk_sci_client_id"] = 1;
                obj["member_network_last_modified_date"] = currentDateValue;

                //network_details.push( obj );
            }
            network_details.push(obj);
        }

    }


    var staff_details = [];
    var staffDetailsSelectStaff = 0;
    var staffDetailsSelectTime = 0;
    for (var i = 1; i < 9; i++) {
        var obj = {};
        var jobVal1 = document.getElementById("biz_staff_work_hour_1").value;
        if (jobVal1) {
            staffDetailsSelectTime = 1;
        }
        if (document.getElementById("biz_staff_work_hour_" + i + "")) {
            var staffVal = document.getElementById("fk_biz_staff_rel_type_id_" + i + "").value;
            var jobVal = document.getElementById("biz_staff_work_hour_" + i + "").value;

            if (jobVal == "") {
                obj["biz_staff_member_id"] = 1;
                obj["fk_biz_staff_rel_type_id"] = parseInt(staffVal);
                obj["biz_staff_work_hour"] = null;
                obj["biz_staff_fk_last_modified_by"] = userId;
                obj["biz_staff_fk_sci_client_id"] = 1;
                obj["biz_staff_last_modified_date"] = currentDateValue;

            }

            if (jobVal != "") {
                obj["biz_staff_member_id"] = 1;
                obj["fk_biz_staff_rel_type_id"] = parseInt(staffVal);
                obj["biz_staff_work_hour"] = jobVal;
                obj["biz_staff_fk_last_modified_by"] = userId;
                obj["biz_staff_fk_sci_client_id"] = 1;
                obj["biz_staff_last_modified_date"] = currentDateValue;


            }
            staff_details.push(obj);
        }
    }


    /*Family Information*/
    var family_details = [];
    var familyDetailsSelectEducation = 0;
    var familyDetailsSelectEmployment = 0;
    for (var i = 1; i < 5; i++) {
        var obj = {};
        if (document.getElementById("fk_family_member_education_type_id_" + i + "")) {
            var education = document.getElementById("fk_family_member_education_type_id_" + i + "").value;
            var occupation = document.getElementById("family_member_employment_type_" + i + "").value;
            if (education) {
                familyDetailsSelectEducation = 1;
                obj["fk_family_member_education_type_id"] = parseInt(education);
            }
            if (occupation) {
                familyDetailsSelectEmployment = 1;
                obj["family_member_employment_type"] = occupation;
            }

            obj["family_member_name"] = masterRelationArrayDicEdu[i]; /*Family*/


            obj["member_family_fk_last_modified_by"] = userId;
            obj["member_family_last_modified_date"] = currentDateValue;
            obj["member_family_sci_client_id"] = 1;

            family_details.push(obj);
        }
    }



    if (memberAssetsSelect == 0) {
        if (document.getElementById("fk_member_asset_type_id_1")) {
            if (!document.getElementById("fk_member_asset_type_id_1").checked) {
                mandatoryFieldsDict["Assets"] = "Select Assets";
                $("#fk_member_asset_type_id_1").css('background-color', 'yellow');
                $("#fk_member_asset_type_id_1").css('color', 'black');
            }
        }
        validation = 1;
    }
    if (networkDetailsQSelect == 0) {
        if (document.getElementById("network_details_question_1")) {
            if (document.getElementById("network_details_question_1").value == "") {
                mandatoryFieldsDict["Network Question"] = "Select Question";
                $("#network_details_question_1").css('background-color', 'yellow');
                $("#network_details_question_1").css('color', 'black');
                networkDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (networkDetailsASelect == 0) {
        if (document.getElementById("network_details_answer_1")) {
            if (document.getElementById("network_details_answer_1").value == "") {
                mandatoryFieldsDict["Network Answer"] = "Select Answer";
                $("#network_details_answer_1").css('background-color', 'yellow');
                $("#network_details_answer_1").css('color', 'black');
                networkDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (staffDetailsSelectStaff == 0) {
        if (document.getElementById("fk_biz_staff_rel_type_id_1")) {
            if (document.getElementById("fk_biz_staff_rel_type_id_1").value == "") {
                mandatoryFieldsDict["Staff Selection"] = "Select Staff";
                $("#fk_biz_staff_rel_type_id_1").css('background-color', 'yellow');
                $("#fk_biz_staff_rel_type_id_1").css('color', 'black');
                staffDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (staffDetailsSelectTime == 0) {
        if (document.getElementById("biz_staff_work_hour_1")) {
            if (document.getElementById("biz_staff_work_hour_1").value == "") {
                mandatoryFieldsDict["FULLTIME / PARTTIME"] = "Select FULLTIME / PARTTIME";
                $("#biz_staff_work_hour_1").css('background-color', 'yellow');
                $("#biz_staff_work_hour_1").css('color', 'black');
                staffDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (familyDetailsSelectEducation == 0) {
        if (document.getElementById("fk_family_member_education_type_id_1")) {
            if (document.getElementById("fk_family_member_education_type_id_1").value == "") {
                mandatoryFieldsDict["Self Occupation"] = "Select Occupation";
                $("#family_member_employment_type_1").css('background-color', 'yellow');
                $("#family_member_employment_type_1").css('color', 'black');
                validation = 1;
            }
        }
    }
    if (familyDetailsSelectEmployment == 0) {
        if (document.getElementById("fk_family_member_education_type_id_1")) {
            if (document.getElementById("fk_family_member_education_type_id_1").value == "") {
                mandatoryFieldsDict["Self Education"] = "Select Edutcation";
                $("#fk_family_member_education_type_id_1").css('background-color', 'yellow');
                $("#fk_family_member_education_type_id_1").css('color', 'black');
                familyDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (!pincode) {
        $("#current_pincode").css('background-color', 'yellow');
        $("#current_pincode").css('color', 'black');
    }
    if (!biz_pincode) {
        $("#biz_pincode").css('background-color', 'yellow');
        $("#biz_pincode").css('color', 'black');
    }

    html += '<table style="margin:auto;width:90%;"><thead><tr><th>Empty Input Field</th><th> Input field type </th></tr></thead><tbody>';
    if (validation == 1) {
        showAlertBox();
        return false;
    }

    function showAlertBox() {
        var keys = Object.keys(mandatoryFieldsDict);
        for (var keys in mandatoryFieldsDict)
            html += '<tr style="padding-left:20%;"><td>' + keys + '</td><td>' + mandatoryFieldsDict[keys] + '</td></tr>'
        html += '</tbody></table>';
        $("#alertContentId").append(html);
        $('#myModal').modal('show');
        html = '';
    }


    var dataObj = {
        "firstname": firstname,
        "middlename": middlename,
        "lastname": lastname,
        "phoneNumberArray": phoneNumberArray,
        "emailIdArray": emailIdArray,
        "mobile_number": parseInt(mobile_number),

        "gender": gender,
        "care_of_relation": care_of_relation,
        "dob": dob,
        "age": parseInt(age),
        "father_name": father_name,
        "spouse_name": spouse_name,

        "idProofArray": idProofArray,

        "current_door_no": doorNo,
        "current_street_name": streetName,
        "current_location_name": locationName,
        "fk_curr_village_or_town_id": parseInt(city_town), // city
        "current_address_location_name": current_address_location_name,
        "current_state": parseInt(state), // Recently Added 18-04-16
        "current_district": parseInt(district),
        "current_taluk": parseInt(taluk),
        "current_pincode": parseInt(pincode),

        "fk_current_address_proof_type_id": addressProof[0]["fk_id_proof_type_id"], //address_proof_type,
        "current_document_value": addressProof[0]["id_proof_type"],
        //"current_document_url"			: addressProof[0]["alf_node_ref"],
        //"current_address_fk_alf_node_ref"	: addressProof[0]["alf_node_ref1"],

        "id1_name_as_per_bank_records": id1_name_as_per_bank_records,
        "id1_bank_name": id1_bank_name,
        "id1_bank_account_number": id1_bank_account_number,
        "id1_bank_ifsc_code": id1_bank_ifsc_code,

        "member_bank_fk_alf_node_ref": member_bank_fk_alf_node_ref,
        "member_bank_fk_alf_node_ref1": member_bank_fk_alf_node_ref1,

        "fk_purpose_id": parseInt(fk_purpose_id),
        "fk_product_id_loan": parseInt(fk_product_id_loan),
        "loan_type_id"      : String(application_loan_amount),//fk_product_id_loan,
        "application_loan_amount": parseFloat(application_loan_amount),
        "ml_fk_alf_node_ref": ml_fk_alf_node_ref,

        "biz_nature": biz_nature,
        "biz_no_of_yrs": parseInt(biz_no_of_yrs),
        "biz_location": biz_location,
        "rent_pay_month": parseFloat(rent_pay_month),

        "biz_door_no": biz_door_no,
        "biz_street_name": biz_street_name,
        "biz_location_name": biz_location_name,
        "fk_biz_village_or_town": parseInt(fk_biz_village_or_town),

        "biz_state": parseInt(biz_state), // Recently Added 18-04-16
        "biz_district": parseInt(biz_district),
        "biz_taluk": parseInt(biz_taluk),
        "biz_pincode": parseInt(biz_pincode),

        "biz_office_address_landline_number": parseInt(biz_office_address_landline_number),
        "biz_office_address_mobile_number": parseInt(biz_office_address_mobile_number),

        "biz_address_fk_alf_node_ref": biz_address_fk_alf_node_ref,
        "biz_address_fk_alf_node_ref1": biz_address_fk_alf_node_ref1,
        "biz_address_fk_alf_node_ref2": biz_address_fk_alf_node_ref2,
        "biz_address_fk_alf_node_ref3": biz_address_fk_alf_node_ref3,

        "biz_localbody_app": biz_localbody_app,
        "biz_id_alf_node_ref": biz_id_alf_node_ref,
        "biz_id_alf_node_ref1": biz_id_alf_node_ref1,

        "biz_issued_by": biz_issued_by,
        "biz_no": biz_no,
        "biz_type": biz_type,
        "biz_valid_upto": biz_valid_upto,

        "brand_sale": parseFloat(brand_sale),
        "nonbrand_sale": parseFloat(nonbrand_sale),
        "total_sale": parseFloat(total_sale),
        "min_sale_day": parseFloat(min_sale_day),

        "annual_household_income": parseFloat(annual_household_income),
        "annual_expenses": parseFloat(annual_expenses),
        "surplus_available": parseFloat(surplus_available),

        "marital_status": marital_status,
        "no_of_child_below17": no_of_child_below17,
        "no_of_child_above17": no_of_child_above17,
        "live_with": live_with,

        "businessStaffArray": staff_details,
        "memberAssetArray": Transportation_communication_assets,
        "memberNetworkArray": network_details,
        "memberFamilyArray": family_details,

        "fk_product_id": 1,
        "last_modified_date": currentDateValue,
        "fk_last_modified_by": userId,
        /*User Id*/
        "fk_sci_client_id": 1,
        "member_bank_last_modified_date": currentDateValue,
        "member_bank_fk_last_modified_by": userId,
        /*User Id*/
        "member_bank_fk_sci_client_id": 1,
        "biz_details_last_modified_by": userId,
        /*User Id*/
        "biz_details_last_modified_date": currentDateValue,
        "biz_details_fk_sci_client_id": 1,
        "permanent_address_fk_last_modified_by": userId,
        /*User Id*/
        "permanent_address_last_modified_date": currentDateValue,
        "permanent_address_fk_sci_client_id": 1,
        "current_address_fk_last_modified_by": userId,
        /*User Id*/
        "current_address_last_modified_date": currentDateValue,
        "current_address_sci_client_id": 1,
        "biz_address_fk_last_modified_by": userId,
        /*User Id*/
        "biz_address_last_modified_date": currentDateValue,
        "biz_address_fk_sci_client_id": 1,


        "fk_member_id": 1,
        "fk_last_modified_by_loan": userId,
        /*User Id*/
        "last_modified_date_loan": currentDateValue,
        "fk_sci_client_id_loan": 1,

        "biz_income_last_modified_date": currentDateValue,
        "biz_income_fk_last_modified_by": userId,
        /*User Id*/
        "biz_income_fk_sci_client_id": 1,
        "alfNodeArray": alfNodeArray,
    };
    var memberAddress = doorNo + ' ,' + streetName + ' ,' + locationName + ' ,' + parseInt(pincode);

    var dataArr = {
        "mlcompositeArray": [dataObj]
    };
    var biz_data = new FormData();

    var uuid = guid();
    /*Business Address proof 1*/
    jQuery.each(jQuery('#biz_id_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-1', file);
    });

    /*Business Address proof 2*/
    jQuery.each(jQuery('#biz_id_alf_node_ref1_img')[0].files, function(i, file) {
        biz_data.append('file-2', file);
    });

    /*Business Address proof 3*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_1_img')[0].files, function(i, file) {
        biz_data.append('file-3', file);
    });
    /*Business Address proof 4*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_2_img')[0].files, function(i, file) {
        biz_data.append('file-4', file);
    });
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_3_img')[0].files, function(i, file) {
        biz_data.append('file-5', file);
    });
    /*Business Address proof 4*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_4_img')[0].files, function(i, file) {
        biz_data.append('file-6', file);
    });

    /*ID PROOF*/
    for (var i = 1; i <= 6; i++) {
        jQuery.each(jQuery('#alf_node_ref_img_' + i + "")[0].files, function(j, file) {
            biz_data.append('file-5-' + i, file);
        });
        /*ID PROOF*/
        jQuery.each(jQuery('#alf_node_ref1_img_' + i + "")[0].files, function(j, file) {
            biz_data.append('file-6-' + i, file);
        });
    }


    var indexDict = {};

    //var len = $('.biz_address_fk_alf_node_ref').files.length;

    var k = 0;
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById("biz_address_fk_alf_node_ref_" + i + "_img").files) {
            k = k + 1;
            jQuery.each(jQuery('#biz_address_fk_alf_node_ref_' + i + '_img')[0].files, function(j, file) {
                biz_data.append('file-3-' + k, file);
                indexDict[k] = "file-3-" + k;
            });
        }
    }




    /*ADDRESS PROOF*/
    jQuery.each(jQuery('#alf_node_ref_img_1')[0].files, function(i, file) {
        biz_data.append('file-7', file);
    });
    /*ADDRESS PROOF*/
    jQuery.each(jQuery('#alf_node_ref1_img_1')[0].files, function(i, file) {
        biz_data.append('file-8', file);
    });
    /*BANK PASSBOOK PROOF*/
    jQuery.each(jQuery('#member_bank_fk_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-9', file);
    });
    /*BANK PASSBOOK PROOF*/
    jQuery.each(jQuery('#member_bank_fk_alf_node_ref1_img')[0].files, function(i, file) {
        biz_data.append('file-10', file);
    });
    /*LOAN PROOF*/
    jQuery.each(jQuery('#ml_fk_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-11', file);
    });

    /*JSON data for AVRO form*/
    biz_data.append('form_data', JSON.stringify(dataArr));

    biz_data.append("MemberAddress", memberAddress);
    biz_data.append("FileData", JSON.stringify(indexDict));

    /*Loading IMages*/
    var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' +
        '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' +
        '</div>' +
        '</div>';
    $(".popup").empty().append(theImg).fadeIn();

    var opts = {
        url: '/submitForm/submitFormAdd',
        data: biz_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            if (data['member_id'] && data['loan_id']) {
                $.alert('successful');
                //window.location ="/confirmation/"+data['member_id']+"/"+data['loan_id']+"/"+data['status']+"";
            } else {
                $.alert("Not created");
            }
        },error: function(data) {
            $(".popup").fadeOut();        
	    $.alert("Not created");
        }
    };
    if (biz_data.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + biz_data.boundary;
        opts.data = biz_data;
    }
    jQuery.ajax(opts);

}


function submitCibilFailureForm(status,statusId) {

    console.log('submitCibilFailureForm');
console.log(status);
console.log(statusId);

    var memberid = member_id;
    var loanid   = loan_id;
    var url = "/submitFormUpdate";
    var html = '';
    $("#alertContentId").html('');
    var currentDateValue = (new Date());
    currentDateValue = JSON.stringify(currentDateValue);
    currentDateValue = currentDateValue.replace(/"/g, '');
    var count = 0;
    var validation = 0;
    var label = '';
    var mandatoryFieldsDict = {};
    //imagePopUp();
    for (var i = 1; i <= 6; i++) {
        if (!document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value)
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
        if (document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value)
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
        if (document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value)
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        if (!document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
        }
        if (!document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#id_proof_type_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        }
        if (document.getElementById("id_proof_type_" + i + "").value && !document.getElementById("alf_node_ref_" + i + "").value && !document.getElementById("alf_node_ref1_" + i + "").value) {
            $("#alf_node_ref_" + i + "").css('background-color', 'yellow');
            $("#alf_node_ref1_" + i + "").css('background-color', 'yellow');
        }
        if (document.getElementById("id_proof_type_" + i + "").value && document.getElementById("alf_node_ref_" + i + "").value && document.getElementById("alf_node_ref1_" + i + "").value) {
            count++;
        }
    }

    if (count < 3) {
        $.alert("Please provide atleast three ID Proof Details!");
        return false;
    }

    for (var i = 0; i < stringValidate.length; i++) {
        if (document.getElementById("" + stringValidate[i] + "")) {
            if (document.getElementById("" + stringValidate[i] + "").value == "") {
                $("#" + stringValidate[i] + "").css('background-color', 'yellow');
                $("#" + stringValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById("" + stringValidate[i] + "_label" + "").innerHTML;
                mandatoryFieldsDict[label] = "Input text";
            }
        }
    }

    for (var i = 0; i < intValidate.length; i++) {
        if (document.getElementById("" + intValidate[i] + "")) {
            if (/^[0-9]*$/.test(document.getElementById("" + intValidate[i] + "").value) == false || document.getElementById("" + intValidate[i] + "").value == "") {
                $("#" + intValidate[i] + "").css('background-color', 'yellow');
                $("#" + intValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(intValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Input only Numeric Value";
            }
        }
    }

    for (var i = 0; i < selectOptionValidate.length; i++) {
        if (document.getElementById("" + selectOptionValidate[i] + "")) {
            if (/^[0-9]*$/.test(document.getElementById("" + selectOptionValidate[i] + "").value) == false || document.getElementById("" + selectOptionValidate[i] + "").value == "") {
                $("#" + selectOptionValidate[i] + "").css('background-color', 'yellow');
                $("#" + selectOptionValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(selectOptionValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Select a Value";
            }
        }
    }


    for (var i = 0; i < file_inputs.length; i++) {
        if (document.getElementById("" + file_inputs[i] + "")) {
            if (document.getElementById("" + file_inputs[i] + "").value == "") {
                $("#" + file_inputs[i] + "").css('background-color', 'yellow');
                $("#" + file_inputs[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById("" + file_inputs[i] + "_label" + "").innerHTML;
                mandatoryFieldsDict[label] = "Upload document";
            }
        }
    }



    for (var i = 0; i < floatValidate.length; i++) {
        if (document.getElementById("" + floatValidate[i] + "")) {
            if (isFloat(parseFloat(document.getElementById("" + floatValidate[i] + "").value)) || (/^[-+]?[0-9]*$/.test(document.getElementById("" + floatValidate[i] + "").value)) || /^[-+]?[0-9]+\.[0-9]+$/.test(document.getElementById("" + floatValidate[i] + "").value) == true) {

            } else {
                $("#" + floatValidate[i] + "").css('background-color', 'yellow');
                $("#" + floatValidate[i] + "").css('color', 'black');
                validation = 1;
                label = document.getElementById(floatValidate[i] + "_label").innerHTML;
                mandatoryFieldsDict[label] = "Numeric";
            }

        }
    }



    /*************** Basic Details ****************/
    /*Name Details*/
    /*if(document.getElementById("memberid")){
        var memberid = document.getElementById("memberid").innerHTML;
    }
    if(document.getElementById("loanid")){
        var loanid = document.getElementById("loanid").innerHTML;
    }*/
    var firstname = document.getElementById("firstname").value;
    var middlename = document.getElementById("middlename").value;
    var lastname = document.getElementById("lastname").value;
    var mobile_number = document.getElementById("mobile_number_1").value;

    /*Gender relation and age Details*/
    var gender = $('input[name="gender"]:checked').val();
    var care_of_relation = $('input[name="care_of_relation"]:checked').val();

    var father_name = document.getElementById("father_name").value;
    var spouse_name = document.getElementById("spouse_name").value;
    var dob = document.getElementById("dob").value;
    var age = document.getElementById("age").value;

    /*Address details*/
    var doorNo = document.getElementById("current_door_no").value;
    var streetName = document.getElementById("current_street_name").value;
    var locationName = document.getElementById("current_location_name").value;
    var city_town = document.getElementById("fk_curr_village_or_town_id").value;

    var state = document.getElementById("current_state").value;
    var district = document.getElementById("current_district").value;
    var taluk = document.getElementById("current_taluk").value;
    var pincode = document.getElementById("current_pincode").value;

    /*Address Proof Information*/
    /*var fk_current_address_proof_type_id	= document.getElementById("fk_current_address_proof_type_id").value;	
    var current_document_value   		= document.getElementById("current_document_value").value;	
    var current_document_url		= document.getElementById("current_document_url").value;
    var current_address_fk_alf_node_ref	= document.getElementById("current_address_fk_alf_node_ref").value;*/
    var current_address_location_name = document.getElementById("current_address_location_name").value;

    /*Bank Information*/
    var id1_name_as_per_bank_records = document.getElementById("id1_name_as_per_bank_records").value;
    var id1_bank_name = document.getElementById("id1_bank_name").value;
    var id1_bank_account_number = document.getElementById("id1_bank_account_number").value;
    var id1_bank_ifsc_code = document.getElementById("id1_bank_ifsc_code").value;

    var member_bank_fk_alf_node_ref = document.getElementById("member_bank_fk_alf_node_ref").value;
    var member_bank_fk_alf_node_ref1 = document.getElementById("member_bank_fk_alf_node_ref1").value;

    /*Loan Information*/
    var fk_purpose_id = document.getElementById("fk_purpose_id").value;
    var fk_product_id_loan = document.getElementById("fk_product_id_loan").value;
    var application_loan_amount = document.getElementById("application_loan_amount").value;
    var ml_fk_alf_node_ref = document.getElementById("ml_fk_alf_node_ref").value;


    /*************** Business Details ****************/
    /*Business Info*/
    var biz_nature = document.getElementById("biz_nature").value;
    var biz_no_of_yrs = document.getElementById("biz_no_of_yrs").value;
    var biz_location = document.getElementById("biz_location").value;
    var rent_pay_month = document.getElementById("rent_pay_month").value;

    var biz_door_no = document.getElementById("biz_door_no").value;
    var biz_street_name = document.getElementById("biz_street_name").value;
    var biz_location_name = document.getElementById("biz_location_name").value;
    var fk_biz_village_or_town = document.getElementById("fk_biz_village_or_town").value;

    var biz_state = document.getElementById("biz_state").value;
    var biz_district = document.getElementById("biz_district").value;
    var biz_taluk = document.getElementById("biz_taluk").value;
    var biz_pincode = document.getElementById("biz_pincode").value;

    var biz_office_address_landline_number = document.getElementById("biz_office_address_landline_number").value;
    var biz_office_address_mobile_number = document.getElementById("biz_office_address_mobile_number").value;

    var biz_address_fk_alf_node_ref = document.getElementById("biz_address_fk_alf_node_ref_1").value;
    var biz_address_fk_alf_node_ref1 = document.getElementById("biz_address_fk_alf_node_ref_2").value;
    var biz_address_fk_alf_node_ref2 = document.getElementById("biz_address_fk_alf_node_ref_3").value;
    var biz_address_fk_alf_node_ref3 = document.getElementById("biz_address_fk_alf_node_ref_4").value;

    /*Regulatory Information*/
    var biz_localbody_app = $('input[name="biz_localbody_app"]:checked').val();
    var biz_id_alf_node_ref = document.getElementById("biz_id_alf_node_ref").value;
    var biz_id_alf_node_ref1 = document.getElementById("biz_id_alf_node_ref1").value;

    var biz_issued_by = document.getElementById("biz_issued_by").value;
    var biz_no = document.getElementById("biz_no").value;
    var biz_type = document.getElementById("biz_type").value;
    var biz_valid_upto = document.getElementById("biz_valid_upto").value;

    /*Sales and Expense information*/
    var brand_sale = document.getElementById("brand_sale").value;
    var nonbrand_sale = document.getElementById("nonbrand_sale").value;
    var total_sale = document.getElementById("total_sale").value;
    var min_sale_day = document.getElementById("min_sale_day").value;

    var annual_household_income = document.getElementById("annual_household_income").value;
    var annual_expenses = document.getElementById("annual_expenses").value;
    var surplus_available = document.getElementById("surplus_available").value;

    /*************** Demographic Details ****************/
    /*Famil Details*/
    var marital_status = document.getElementById("marital_status").value;
    var no_of_child_below17 = document.getElementById("no_of_child_below17").value;
    var no_of_child_above17 = document.getElementById("no_of_child_above17").value;
    var live_with = document.getElementById("live_with").value;

    /*Transportation and communication and other assets*/
    var Transportation_communication_assets = [];
    var dob_split = dob.split('-');
    var dob_dmy_fmt = dob_split[2] + '-' + dob_split[1] + '-' + dob_split[0];
    var keys = Object.keys(masterAssetArrayDic);
    var memberAssetsSelect = 0;
    for (var i = 1; i <= 32; i++) {
        var obj = {};
        if (document.getElementById("fk_member_asset_type_id_" + i + "")) {
            if (document.getElementById("fk_member_asset_type_id_" + i + "").checked) {
                var self_occupation_id = document.getElementById("fk_member_asset_type_id_" + i + "").value;
                if (self_occupation_id != "") {
                    memberAssetsSelect = 1;
                    obj["member_asset_member_id"] = 1;
                    obj["fk_member_asset_type_id"] = parseInt(i);
                    obj["member_asset_category"] = self_occupation_id;
                    obj["member_asset_fk_last_modified_by"] = userId;
                    obj["member_asset_fk_sci_client_id"] = 1;
                    obj["member_asset_last_modified_date"] = currentDateValue;
                }
            } else {
                var self_occupation_id = document.getElementById("fk_member_asset_type_id_" + i + "").value;
                if (self_occupation_id != "") {
                    memberAssetsSelect = 1;
                    obj["member_asset_member_id"] = 1;
                    obj["fk_member_asset_type_id"] = parseInt(i);
                    obj["member_asset_category"] = null;
                    obj["member_asset_fk_last_modified_by"] = userId;
                    obj["member_asset_fk_sci_client_id"] = 1;
                    obj["member_asset_last_modified_date"] = currentDateValue;

                }
            }
            Transportation_communication_assets.push(obj);
        }
    }
    /*ID Proof Information*/
    var idProofArray = [];
    for (var i = 1; i <= 6; i++) {
        var idProof = {};
        if (document.getElementById("fk_id_proof_type_id_" + i + "") && document.getElementById("id_proof_type_" + i + "")) {
            if (document.getElementById("fk_id_proof_type_id_" + i + "").value) {
                if (jQuery('#alf_node_ref_img_' + (i) + "")[0].files) {
                    //jQuery.each(jQuery('#alf_node_ref_img_'+(i)+"")[0].files, function(j, file){
                    idProof['fk_id_proof_type_id'] = parseInt(document.getElementById("fk_id_proof_type_id_" + i + "").value);
                    idProof['id_proof_type'] = document.getElementById("id_proof_type_" + i + "").value;
                    idProof['alf_node_ref'] = document.getElementById("alf_node_ref_" + i + "").value;
                    idProof['alf_node_ref1'] = document.getElementById("alf_node_ref1_" + i + "").value;
                    idProof['id_proof_fk_last_modified_by'] = userId;
                    idProof['id_proof_last_modified_date'] = currentDateValue;
                    idProof['id_proof_fk_sci_client_id'] = 1;
                    idProofArray.push(idProof);
                    //});
                } else {
                    idProof['fk_id_proof_type_id'] = parseInt(document.getElementById("fk_id_proof_type_id_" + i + "").value);
                    idProof['id_proof_type'] = document.getElementById("id_proof_type_" + i + "").value;
                    idProof['alf_node_ref'] = document.getElementById("alf_node_ref_" + i + "").value;
                    idProof['alf_node_ref1'] = document.getElementById("alf_node_ref1_" + i + "").value;
                    idProof['id_proof_fk_last_modified_by'] = userId;
                    idProof['id_proof_last_modified_date'] = currentDateValue;
                    idProof['id_proof_fk_sci_client_id'] = 1;
                    idProofArray.push(idProof);
                }
            } else {
                idProof['fk_id_proof_type_id'] = 1;
                idProof['id_proof_type'] = "No Data";
                idProof['alf_node_ref'] = "";
                idProof['alf_node_ref1'] = "";
                idProof['id_proof_fk_last_modified_by'] = userId;
                idProof['id_proof_last_modified_date'] = currentDateValue;
                idProof['id_proof_fk_sci_client_id'] = 1;
                idProofArray.push(idProof);
            }
        }
    }


    var alfNodeArray = [];
    for (var i = 1; i <= 4; i++) {
        var AlfNode = {};
        if (document.getElementById('biz_address_fk_alf_node_ref_' + i + '_img').files && document.getElementById('biz_address_fk_alf_node_ref_' + i + "").value) {
            AlfNode['alf_node_ref'] = document.getElementById('biz_address_fk_alf_node_ref_' + i + "").value;
            AlfNode['alf_last_modified_by'] = userId;
            AlfNode['alf_last_modified_date'] = currentDateValue;
            AlfNode['alf_fk_sci_client_id'] = 1;
            AlfNode['alf_member_id'] = parseInt(memberid);
            AlfNode['alf_loan_id'] = parseInt(loanid);

        }
        /*else{
        	AlfNode['alf_node_ref'] 	= document.getElementById('biz_address_fk_alf_node_ref_'+i+"").value;	
        	AlfNode['alf_last_modified_by'] = userId;
        	AlfNode['alf_last_modified_date'] = currentDateValue;
        	AlfNode['alf_fk_sci_client_id'] =1;
        	AlfNode['alf_member_id'] = parseInt(memberid);
        	AlfNode['alf_loan_id'] = parseInt(loanid);
        	
        }*/
        alfNodeArray.push(AlfNode);

    }


    // Mobile number details
    var phoneNumberArray = [];
    for (var i = 1; i <= 3; i++) {
        var phoneNumber = {};
        if (document.getElementById("mobile_number_" + i + "")) {
            if (document.getElementById("mobile_number_" + i + "").value) {
                phoneNumber["number"] = parseInt(document.getElementById("mobile_number_" + i + "").value);
                phoneNumber['last_modified_by'] = userId;
                phoneNumber['type'] = "Ph_number Type";
                phoneNumber['last_modified_date'] = currentDateValue;
                phoneNumber['phno_member_id'] = parseInt(memberid);
                phoneNumber['phno_loan_id'] = parseInt(loanid);

            } else {
                phoneNumber["number"] = null;
                phoneNumber['last_modified_by'] = userId;
                phoneNumber['type'] = "Ph_number Type";
                phoneNumber['last_modified_date'] = currentDateValue;
                phoneNumber['phno_member_id'] = parseInt(memberid);
                phoneNumber['phno_loan_id'] = parseInt(loanid);
            }
            phoneNumberArray.push(phoneNumber);
        }
    }


    //Email-Id details

    var emailIdArray = [];
    for (var i = 1; i <= 3; i++) {
        var emailId = {};
        if (document.getElementById("email_" + i + "")) {
            if (document.getElementById("email_" + i + "").value) {
                emailId["email"] = document.getElementById("email_" + i + "").value;
                emailId['last_modified_by'] = userId;
                emailId['type'] = "Email-type";
                emailId['last_modified_date'] = currentDateValue;
                emailId['email_member_id'] = parseInt(memberid);
                emailId['email_loan_id'] = parseInt(loanid);
                emailIdArray.push(emailId);
            } else {
                emailId["email"] = "";
                emailId['last_modified_by'] = userId;
                emailId['type'] = "Email-type";
                emailId['last_modified_date'] = currentDateValue;
                emailId['email_member_id'] = parseInt(memberid);
                emailId['email_loan_id'] = parseInt(loanid);
                emailIdArray.push(emailId);
            }
        }

    }


    /*Network Details*/
    var network_details = [];
    var networkDetailsQSelect = 0;
    var networkDetailsASelect = 0;
    for (var i = 1; i < 6; i++) {
        var obj = {};
        var network_value1 = document.getElementById("network_details_answer_1").value;
        if (network_value1) {
            networkDetailsASelect = 1;
        }
        if (document.getElementById("network_details_question_" + i + "")) {
            var network_question = document.getElementById("network_details_question_" + i + "").value;
            var network_value = document.getElementById("network_details_answer_" + i + "").value;

            if ((network_value == "")) {
                obj["member_network_member_id"] = 1;
                obj["network_details_question"] = parseInt(NetQuestionArrayDic[network_question]);
                obj["network_details_answer"] = null;
                obj["member_network_fk_last_modified_by"] = userId;
                obj["member_network_fk_sci_client_id"] = 1;
                obj["member_network_last_modified_date"] = currentDateValue;
            }


            if ((network_value != "") && (network_question != "")) {

                obj["member_network_member_id"] = 1;
                obj["network_details_question"] = parseInt(NetQuestionArrayDic[network_question]);
                obj["network_details_answer"] = parseInt(network_value);
                obj["member_network_fk_last_modified_by"] = userId;
                obj["member_network_fk_sci_client_id"] = 1;
                obj["member_network_last_modified_date"] = currentDateValue;

                //network_details.push( obj );
            }
            network_details.push(obj);
        }

    }

    var staff_details = [];
    var staffDetailsSelectStaff = 0;
    var staffDetailsSelectTime = 0;
    for (var i = 1; i < 9; i++) {
        var obj = {};
        var jobVal1 = document.getElementById("biz_staff_work_hour_1").value;
        if (jobVal1) {
            staffDetailsSelectTime = 1;
        }
        if (document.getElementById("biz_staff_work_hour_" + i + "")) {
            var staffVal = document.getElementById("fk_biz_staff_rel_type_id_" + i + "").value;
            var jobVal = document.getElementById("biz_staff_work_hour_" + i + "").value;

            if (jobVal == "") {
                obj["biz_staff_member_id"] = 1;
                obj["fk_biz_staff_rel_type_id"] = parseInt(staffVal);
                obj["biz_staff_work_hour"] = null;
                obj["biz_staff_fk_last_modified_by"] = userId;
                obj["biz_staff_fk_sci_client_id"] = 1;
                obj["biz_staff_last_modified_date"] = currentDateValue;

            }

            if (jobVal != "") {
                obj["biz_staff_member_id"] = 1;
                obj["fk_biz_staff_rel_type_id"] = parseInt(staffVal);
                obj["biz_staff_work_hour"] = jobVal;
                obj["biz_staff_fk_last_modified_by"] = userId;
                obj["biz_staff_fk_sci_client_id"] = 1;
                obj["biz_staff_last_modified_date"] = currentDateValue;


            }
            staff_details.push(obj);
        }
    }

    /*Family Information*/
    var family_details = [];
    var familyDetailsSelectEducation = 0;
    var familyDetailsSelectEmployment = 0;
    for (var i = 1; i < 5; i++) {
        var obj = {};
        if (document.getElementById("fk_family_member_education_type_id_" + i + "")) {
            var education = document.getElementById("fk_family_member_education_type_id_" + i + "").value;
            var occupation = document.getElementById("family_member_employment_type_" + i + "").value;
            if (education) {
                familyDetailsSelectEducation = 1;
                obj["fk_family_member_education_type_id"] = parseInt(education);
            }
            if (occupation) {
                familyDetailsSelectEmployment = 1;
                obj["family_member_employment_type"] = occupation;
            }


            obj["family_member_name"] = masterRelationArrayDicEdu[i]; /*Family*/

            obj["member_family_fk_last_modified_by"] = userId;
            obj["member_family_last_modified_date"] = currentDateValue;
            obj["member_family_sci_client_id"] = 1;

            family_details.push(obj);
        }
    }



    if (memberAssetsSelect == 0) {
        if (document.getElementById("fk_member_asset_type_id_1")) {
            if (!document.getElementById("fk_member_asset_type_id_1").checked) {
                mandatoryFieldsDict["Assets"] = "Select Assets";
                $("#fk_member_asset_type_id_1").css('background-color', 'yellow');
                $("#fk_member_asset_type_id_1").css('color', 'black');
            }
        }
        validation = 1;
    }
    if (networkDetailsQSelect == 0) {
        if (document.getElementById("network_details_question_1")) {
            if (document.getElementById("network_details_question_1").value == "") {
                mandatoryFieldsDict["Network Question"] = "Select Question";
                $("#network_details_question_1").css('background-color', 'yellow');
                $("#network_details_question_1").css('color', 'black');
                networkDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (networkDetailsASelect == 0) {
        if (document.getElementById("network_details_answer_1")) {
            if (document.getElementById("network_details_answer_1").value == "") {
                mandatoryFieldsDict["Network Answer"] = "Select Answer";
                $("#network_details_answer_1").css('background-color', 'yellow');
                $("#network_details_answer_1").css('color', 'black');
                networkDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (staffDetailsSelectStaff == 0) {
        if (document.getElementById("fk_biz_staff_rel_type_id_1")) {
            if (document.getElementById("fk_biz_staff_rel_type_id_1").value == "") {
                mandatoryFieldsDict["Staff Selection"] = "Select Staff";
                $("#fk_biz_staff_rel_type_id_1").css('background-color', 'yellow');
                $("#fk_biz_staff_rel_type_id_1").css('color', 'black');
                staffDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (staffDetailsSelectTime == 0) {
        if (document.getElementById("biz_staff_work_hour_1")) {
            if (document.getElementById("biz_staff_work_hour_1").value == "") {
                mandatoryFieldsDict["FULLTIME / PARTTIME"] = "Select FULLTIME / PARTTIME";
                $("#biz_staff_work_hour_1").css('background-color', 'yellow');
                $("#biz_staff_work_hour_1").css('color', 'black');
                staffDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (familyDetailsSelectEducation == 0) {
        if (document.getElementById("fk_family_member_education_type_id_1")) {
            if (document.getElementById("fk_family_member_education_type_id_1").value == "") {
                mandatoryFieldsDict["Self Occupation"] = "Select Occupation";
                $("#family_member_employment_type_1").css('background-color', 'yellow');
                $("#family_member_employment_type_1").css('color', 'black');
                validation = 1;
            }
        }
    }
    if (familyDetailsSelectEmployment == 0) {
        if (document.getElementById("fk_family_member_education_type_id_1")) {
            if (document.getElementById("fk_family_member_education_type_id_1").value == "") {
                mandatoryFieldsDict["Self Education"] = "Select Edutcation";
                $("#fk_family_member_education_type_id_1").css('background-color', 'yellow');
                $("#fk_family_member_education_type_id_1").css('color', 'black');
                familyDetailsSelect = 0;
                validation = 1;
            }
        }
    }
    if (!pincode) {
        $("#current_pincode").css('background-color', 'yellow');
        $("#current_pincode").css('color', 'black');
    }
    if (!biz_pincode) {
        $("#biz_pincode").css('background-color', 'yellow');
        $("#biz_pincode").css('color', 'black');
    }

    html += '<table style="margin:auto;width:90%;"><thead><tr><th>Empty Input Field</th><th> Input field type </th></tr></thead><tbody>';
    if (validation == 1) {
        showAlertBox();
        return false;
    }

    function showAlertBox() {
        var keys = Object.keys(mandatoryFieldsDict);
        for (var keys in mandatoryFieldsDict)
            html += '<tr style="padding-left:20%;"><td>' + keys + '</td><td>' + mandatoryFieldsDict[keys] + '</td></tr>'
        html += '</tbody></table>';
        $("#alertContentId").append(html);
        $('#myModal').modal('show');
        html = '';
    }


    var memberNetworkArray = network_details;
    var memberAssetArray = Transportation_communication_assets;
    var businessStaffArray = staff_details;
    var memberFamilyArray = family_details;

    var arrayDict = {
        "idProofArray": idProofArray,
        "alfNodeArray": alfNodeArray,
        "emailIdArray": emailIdArray,
        "phoneNumberArray": phoneNumberArray,
        "businessStaffArray": businessStaffArray,
        "memberAssetArray": memberAssetArray,
        "memberNetworkArray": memberNetworkArray,
        "memberFamilyArray": memberFamilyArray
    };

    var recordIdDict = {
        "idProofArray": "id_proof_id",
        "alfNodeArray": "alf_id",
        "emailIdArray": "email_id",
        "phoneNumberArray": "phno_id",
        "businessStaffArray": "biz_staff_id",
        "memberAssetArray": "member_asset_id",
        "memberNetworkArray": "member_network_id",
        "memberFamilyArray": "member_family_id"
    };

    var alfNodeArray1 = [];
    var emailIdArray1 = [];
    var phoneNumberArray1 = [];


    dataArr = json_data["mlcompositeArray"][0];
    for (var key in dataArr) {
        /*if(document.getElementById(key)){
        	key = document.getElementById(key).value;
        }*/
        for (var key1 in dataArr[key]) {
            var obj = dataArr[key][key1];
            if (key == "idProofArray") {
                for (var key2 in idProofArray) {
                    if (obj["fk_id_proof_type_id"] == idProofArray[key2]["fk_id_proof_type_id"]) {
                        idProofArray[key2]["id_proof_id"] = obj["id_proof_id"];
                    }
                }
            }
            if (key == "phoneNumberArray") {
                for (var key2 in phoneNumberArray) {
                    for (var key3 in dataArr["phoneNumberArray"]) {
                        if (key2 == key3) {
                            dataArr["phoneNumberArray"][key2]["number"] = phoneNumberArray[key3]["number"];
                            phoneNumberArray[key2] = dataArr["phoneNumberArray"][key3];
                        }
                    }

                }
            }

            if (key == "emailIdArray") {
                for (var key2 in emailIdArray) {
                    for (var key3 in dataArr["emailIdArray"]) {
                        if (key2 == key3) {
                            dataArr["emailIdArray"][key2]["email"] = emailIdArray[key3]["email"];
                            emailIdArray[key2] = dataArr["emailIdArray"][key3];
                        }
                    }
                }
            }



            if (key == "alfNodeArray") {
                for (var key2 in alfNodeArray) {
                    for (var key3 in dataArr["alfNodeArray"]) {
                        if (key2 == key3 && alfNodeArray[key2]["alf_node_ref"] != "") {
                            alfNodeArray[key2]["alf_id"] = dataArr["alfNodeArray"][key3]["alf_id"];
                        }
                    }
                }
            }

            if (key == "businessStaffArray") {
                for (var key2 in businessStaffArray) {
                    if (obj["fk_biz_staff_rel_type_id"] == businessStaffArray[key2]["fk_biz_staff_rel_type_id"]) {
                        businessStaffArray[key2]["biz_staff_id"] = obj["biz_staff_id"];
                    }
                }
            }
            if (key == "memberNetworkArray") {
                for (var key2 in memberNetworkArray) {
                    if (obj["network_details_question"] == memberNetworkArray[key2]["network_details_question"]) {
                        memberNetworkArray[key2]["member_network_id"] = obj["member_network_id"];
                    }
                }
            }
            if (key == "memberFamilyArray") {
                for (var key2 in memberFamilyArray) {
                    if (obj["family_member_name"] == memberFamilyArray[key2]["family_member_name"]) {
                        memberFamilyArray[key2]["member_family_id"] = obj["member_family_id"];
                    }
                }
            }
            if (key == "memberAssetArray") {
                for (var key2 in memberAssetArray) {
                    if (obj["member_asset_category"] == memberAssetArray[key2]["member_asset_category"]) {
                        memberAssetArray[key2]["member_asset_id"] = obj["member_asset_id"];
                    }
                }
            }
        }
    }


    for (var dataKey in alfNodeArray) {
        if (Object.keys(alfNodeArray[dataKey]).length > 1) {
            //delete alfNodeArray[key3]['alf_id'];
            alfNodeArray1.push(alfNodeArray[dataKey]);
        }
    }

    for (var dataKey in emailIdArray) {
        if (emailIdArray[dataKey]["email"] != "") {
            //delete emailIdArray[key3]['email_id'];
            emailIdArray1.push(emailIdArray[dataKey]);
        }
    }

    for (var dataKey in phoneNumberArray) {
        if (phoneNumberArray[dataKey]["number"] != null) {
            //delete phoneNumberArray[key3]['phno_id'];
            phoneNumberArray1.push(phoneNumberArray[dataKey]);
        }
    }

    var addressProof = [];
    for (var data in idProofArray) {
        if (idProofArray[data]["id_proof_type"] != "" && idProofArray[data]['alf_node_ref'] != "" && idProofArray[data]['alf_node_ref1'] != "") {
            var obj = {};
            obj["fk_id_proof_type_id"] = idProofArray[data]["fk_id_proof_type_id"];
            obj["id_proof_type"] = idProofArray[data]["id_proof_type"];
            obj["alf_node_ref1"] = idProofArray[data]["alf_node_ref1"];
            obj["alf_node_ref"] = idProofArray[data]["alf_node_ref"];
            addressProof.push(obj);
        }
    }



    function currentDate() {
        var d = new Date(); // for now
        var currentTime = (d.getHours() + ":" + d.getMinutes()).toString();

        var currentDateValue = (new Date());
        currentDateValue = JSON.stringify(currentDateValue);
        currentDateValue = currentDateValue.replace(/"/g, '');
        currentDateValue = currentDateValue.split('T')[0];
        return [currentDateValue, currentTime];
    }
    [currentDateValue, currentTime] = currentDate();

    if(statusId  == 3){
        var processupdate = {
                    'variables': {
                        'Cibil_Verification_Status': {
                            'value': status
                        },
                    }
                };
         var taskName   = "Resolve Query"
    }
    else{
         var processupdate = {
                        'variables': {
                            'Member_Resubmit': {
                                'value': status
                            },
                        }
            };
        var taskName   = "Cibil Request Failure";
            
    }


    var remarks = document.getElementById('comments').value;
    console.log(remarks);	
    if (remarks.length < 1) {
        $.alert('Please Comment.');
        return false;
    }
    var remarks_arr = {
        "validation_member_id": parseInt(member_id),
        "validation_loan_id": parseInt(loan_id),
        "validation_type": parseInt(1),
        "validation_level": parseInt(1),
        "validation_status": parseInt(1),
        "remarks": remarks,
        "process_id": processid,
        "task_id": task_id,
        "task_name": taskName,
        "validation_fk_last_modified_by": user_id,
        "validation_last_modified_date": "" + currentDateValue + " at " + currentTime + "",
        "validation_fk_sci_client_id": parseInt(1)
    };

    var remarksData = {
        "mlValidationArray": [remarks_arr]
    };

    var dataObj = {
        
        "fk_member_id" : parseInt(memberid),
        "memberid" : parseInt(memberid),
        "loanid"   : parseInt(loanid),
        "firstname": firstname,
        "middlename": middlename,
        "lastname": lastname,
        "phoneNumberArray": phoneNumberArray1,
        "emailIdArray": emailIdArray1,
        "mobile_number": parseInt(mobile_number),

        "gender": gender,
        "care_of_relation": care_of_relation,
        "dob": dob,
        "age": parseInt(age),
        "father_name": father_name,
        "spouse_name": spouse_name,

        "idProofArray": idProofArray,

        "current_door_no": doorNo,
        "current_street_name": streetName,
        "current_location_name": locationName,
        "fk_curr_village_or_town_id": parseInt(city_town), // city
        "current_address_location_name": current_address_location_name,
        "current_state": parseInt(state), // Recently Added 18-04-16
        "current_district": parseInt(district),
        "current_taluk": parseInt(taluk),
        "current_pincode": parseInt(pincode),

        "fk_current_address_proof_type_id": addressProof[0]["fk_id_proof_type_id"], //address_proof_type,
        "current_document_value": addressProof[0]["id_proof_type"],

        "id1_name_as_per_bank_records": id1_name_as_per_bank_records,
        "id1_bank_name": id1_bank_name,
        "id1_bank_account_number": id1_bank_account_number,
        "id1_bank_ifsc_code": id1_bank_ifsc_code,

        "member_bank_fk_alf_node_ref": member_bank_fk_alf_node_ref,
        "member_bank_fk_alf_node_ref1": member_bank_fk_alf_node_ref1,

        "fk_purpose_id": parseInt(fk_purpose_id),
        "fk_product_id_loan": parseInt(fk_product_id_loan),
        "loan_type_id"      : String(application_loan_amount),
        "application_loan_amount": parseFloat(application_loan_amount),
        "ml_fk_alf_node_ref": ml_fk_alf_node_ref,

        "biz_nature": biz_nature,
        "biz_no_of_yrs": parseInt(biz_no_of_yrs),
        "biz_location": biz_location,
        "rent_pay_month": parseFloat(rent_pay_month),

        "biz_door_no": biz_door_no,
        "biz_street_name": biz_street_name,
        "biz_location_name": biz_location_name,
        "fk_biz_village_or_town": parseInt(fk_biz_village_or_town),

        "biz_state": parseInt(biz_state), // Recently Added 18-04-16
        "biz_district": parseInt(biz_district),
        "biz_taluk": parseInt(biz_taluk),
        "biz_pincode": parseInt(biz_pincode),

        "biz_office_address_landline_number": parseInt(biz_office_address_landline_number),
        "biz_office_address_mobile_number": parseInt(biz_office_address_mobile_number),

        "biz_address_fk_alf_node_ref": biz_address_fk_alf_node_ref,
        "biz_address_fk_alf_node_ref1": biz_address_fk_alf_node_ref1,
        "biz_address_fk_alf_node_ref2": biz_address_fk_alf_node_ref2,
        "biz_address_fk_alf_node_ref3": biz_address_fk_alf_node_ref3,

        "biz_localbody_app": biz_localbody_app,
        "biz_id_alf_node_ref": biz_id_alf_node_ref,
        "biz_id_alf_node_ref1": biz_id_alf_node_ref1,

        "biz_issued_by": biz_issued_by,
        "biz_no": biz_no,
        "biz_type": biz_type,
        "biz_valid_upto": biz_valid_upto,

        "brand_sale": parseFloat(brand_sale),
        "nonbrand_sale": parseFloat(nonbrand_sale),
        "total_sale": parseFloat(total_sale),
        "min_sale_day": parseFloat(min_sale_day),

        "annual_household_income": parseFloat(annual_household_income),
        "annual_expenses": parseFloat(annual_expenses),
        "surplus_available": parseFloat(surplus_available),

        "marital_status": marital_status,
        "no_of_child_below17": no_of_child_below17,
        "no_of_child_above17": no_of_child_above17,
        "live_with": live_with,

        "businessStaffArray": businessStaffArray,
        "memberAssetArray": memberAssetArray,
        "memberNetworkArray": memberNetworkArray,
        "memberFamilyArray": memberFamilyArray,

        "fk_product_id": 1,
        "last_modified_date": currentDateValue,
        "fk_last_modified_by": userId,
        /*User Id*/
        "fk_sci_client_id": 1,
        "member_bank_last_modified_date": currentDateValue,
        "member_bank_fk_last_modified_by": userId,
        /*User Id*/
        "member_bank_fk_sci_client_id": 1,
        "biz_details_last_modified_by": userId,
        /*User Id*/
        "biz_details_last_modified_date": currentDateValue,
        "biz_details_fk_sci_client_id": 1,
        "permanent_address_fk_last_modified_by": userId,
        /*User Id*/
        "permanent_address_last_modified_date": currentDateValue,
        "permanent_address_fk_sci_client_id": 1,
        "current_address_fk_last_modified_by": userId,
        /*User Id*/
        "current_address_last_modified_date": currentDateValue,
        "current_address_sci_client_id": 1,
        "biz_address_fk_last_modified_by": userId,
        /*User Id*/
        "biz_address_last_modified_date": currentDateValue,
        "biz_address_fk_sci_client_id": 1,


        //		"fk_member_id"				:1,                 
        "fk_last_modified_by_loan": userId,
        /*User Id*/
        "last_modified_date_loan": currentDateValue,
        "fk_sci_client_id_loan": 1,

        "biz_income_last_modified_date": currentDateValue,
        "biz_income_fk_last_modified_by": userId,
        /*User Id*/
        "biz_income_fk_sci_client_id": 1,
        "alfNodeArray": alfNodeArray1,
        "mlValidationArray": [remarks_arr]
    };

   /* if(statusId == 3){
        dataObj["fk_member_id"] = parseInt(member_id);
        dataObj["memberid"] = parseInt(member_id);
        dataObj["loanid"]   = parseInt(loan_id);
    }
    else{
        dataObj["fk_member_id"] = parseInt(memberid);
        dataObj["memberid"] = parseInt(memberid);
        dataObj["loanid"]   = parseInt(loanid);
    }*/

console.log("222222222222222222");

    var memberAddress = doorNo + ' ,' + streetName + ' ,' + locationName + ' ,' + parseInt(pincode);

    var dataArr1 = {
        "mlcompositeArray": [dataObj]
    };
    var biz_data = new FormData();

    var uuid = guid();
    /*Business Address proof 1*/
    jQuery.each(jQuery('#biz_id_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-1', file);
    });

    /*Business Address proof 2*/
    jQuery.each(jQuery('#biz_id_alf_node_ref1_img')[0].files, function(i, file) {
        biz_data.append('file-2', file);
    });

    /*Business Address proof 3*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_1_img')[0].files, function(i, file) {
        biz_data.append('file-3', file);
    });
    /*Business Address proof 4*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_2_img')[0].files, function(i, file) {
        biz_data.append('file-4', file);
    });
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_3_img')[0].files, function(i, file) {
        biz_data.append('file-5', file);
    });
    /*Business Address proof 4*/
    jQuery.each(jQuery('#biz_address_fk_alf_node_ref_4_img')[0].files, function(i, file) {
        biz_data.append('file-6', file);
    });

    /*ID PROOF*/
    for (var i = 1; i <= 6; i++) {
        jQuery.each(jQuery('#alf_node_ref_img_' + i + "")[0].files, function(j, file) {
            biz_data.append('file-5-' + i, file);
        });
        /*ID PROOF*/
        jQuery.each(jQuery('#alf_node_ref1_img_' + i + "")[0].files, function(j, file) {
            biz_data.append('file-6-' + i, file);
        });
    }
    
    

    var indexDict = {};

    var k = 0;
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById("biz_address_fk_alf_node_ref_" + i + "_img").files) {
            if (document.getElementById("biz_address_fk_alf_node_ref_" + i + "").value != "") {
                k = k + 1;
            }
            jQuery.each(jQuery('#biz_address_fk_alf_node_ref_' + i + '_img')[0].files, function(j, file) {
                biz_data.append('file-3-' + k, file);
                indexDict[k] = "file-3-" + k;
            });
        }
    }

    /*ADDRESS PROOF*/
    jQuery.each(jQuery('#alf_node_ref_img_1')[0].files, function(i, file) {
        biz_data.append('file-7', file);
    });
    /*ADDRESS PROOF*/
    jQuery.each(jQuery('#alf_node_ref1_img_1')[0].files, function(i, file) {
        biz_data.append('file-8', file);
    });
    /*BANK PASSBOOK PROOF*/
    jQuery.each(jQuery('#member_bank_fk_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-9', file);
    });
    /*BANK PASSBOOK PROOF*/
    jQuery.each(jQuery('#member_bank_fk_alf_node_ref1_img')[0].files, function(i, file) {
        biz_data.append('file-10', file);
    });
    /*LOAN PROOF*/
    jQuery.each(jQuery('#ml_fk_alf_node_ref_img')[0].files, function(i, file) {
        biz_data.append('file-11', file);
    });

    /*JSON data for AVRO form*/
    biz_data.append('form_data', JSON.stringify(dataArr1));

    biz_data.append("MemberAddress", memberAddress);
    biz_data.append("taskRemarks", JSON.stringify(remarksData));
    biz_data.append("processid", processid);

   


    //return false;
    if (status == "Resubmit" || status == "ReworkCompleted") {
        urls = '/submitFormUpdate/';
    }
    if (status == "Reject") {
        urls = "/updateTask";
    }

    biz_data.append("process", JSON.stringify(processupdate));
    biz_data.append("FileData", JSON.stringify(indexDict));
    biz_data.append("taskid", task_id);

    /*Loading IMages*/
    var theImg = '<div class="loading"><img style="width:350px;" src="/static/images/buffer-loading.gif">' +
        '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' +
        '</div>' +
        '</div>';
    $(".popup").empty().append(theImg).fadeIn();

    var opts = {
        url: urls,
        data: biz_data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        success: function(data) {
            $(".popup").fadeOut();
            if (data.message == "Success") {
                $.alert('Updated Successfully');
                window.location = "/tasks/";
            } else {
                $.alert("Not updated");
            }
        }
    };
    if (biz_data.fake) {
        // Make sure no text encoding stuff is done by xhr
        opts.xhr = function() {
            var xhr = jQuery.ajaxSettings.xhr();
            xhr.send = xhr.sendAsBinary;
            return xhr;
        }
        opts.contentType = "multipart/form-data; boundary=" + biz_data.boundary;
        opts.data = biz_data;
    }
    jQuery.ajax(opts);
}
