
//Start Add Documents in Asset Details
/*var id_prop= 1;
$(document).on('click', '#ass-doc-btn', function() {
    var child = document.getElementById("ass_docs_btn_div");
    child.remove();
    var asset;
    id_prop++;
    if (id_prop > 50)
        return
    var objTo = document.getElementById("assetDocsDiv")
    var prop_div = document.createElement("div");
    prop_div.innerHTML ='<div class="colomn-div"> <label id="asset_address_name_'+id_prop+'_label">Address</label></br> <input class="form-control" type="text" id="asset_address_name_'+id_prop+'" name="asset_address_name_'+id_prop+'" placeholder="ADDRESS NAME" value=""/>'+
                        '</div><div class="colomn-div"> <label id="asset_pincode_name_'+id_prop+'_label">Pincode</label></br> <input class="form-control" type="text" maxlength="6" id="asset_pincode" name="asset_pincode" placeholder="PINCODE" value="" onkeypress="validate(event)" onchange="pincodeChange('+"'"+asset+"'"+',this.id)"/>'+
                        '</div><div class="colomn-div"> <label id="asset_state_name_'+id_prop+'_label">State</label></br> <select id="asset_state_'+id_prop+'" class="extra select form-control current_state biz_state asset_state" name="asset_state_'+id_prop+'" placeholder="asset_state" onchange="assetStateChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_district_name_'+id_prop+'_label">District</label></br> <select id="asset_district_'+id_prop+'" class="extra select form-control asset_district" name="asset_district_'+id_prop+'" placeholder="asset_district" onchange="assetDistrictChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_taluk_name_'+id_prop+'_label">taluk</label></br> <select id="asset_taluk_'+id_prop+'" class="extra select form-control asset_taluk" name="asset_taluk_'+id_prop+'" placeholder="asset_taluk" onchange="assetTalukChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="fk_asset_village_or_town_'+id_prop+'_label">City / Town</label></br> <select id="fk_asset_village_or_town_'+id_prop+'" class="extra select form-control fk_asset_village_or_town" name="fk_asset_village_or_town_'+id_prop+'" placeholder="fk_asset__village_or_town"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_value_name_'+id_prop+'_label">Asset Value</label></br> <input class="form-control" type="text" id="asset_value_name_'+id_prop+'" name="asset_value_name_'+id_prop+'" placeholder="ASSET VALUE" value=""/>'+
                        '</div><div class="colomn-div"> <label id="property_document_name_'+id_prop+'_label">Document Name</label></br> <input class="form-control" type="text" id="property_document_name_'+id_prop+'" name="property_document_name_'+id_prop+'" placeholder="DOCUMENT NAME" value=""/>'+
                        '</div><div class="colomn-div"><label id="property_document_path_'+id_prop+'_label">Document Path</label></br><input class="form-control asset-class" type="file" style="width:58%;" id="property_document_path_'+id_prop+'_img" maxlength=30 name="biz_name" placeholder="LOCATION" value="Choose File"/>'+
                        '</div><div class="colomn-div"><input class="form-control" type="text" style="width:58%;" id="property_document_path_'+id_prop+'"  placeholder="DOCUMENT PATH" />'+
                        '</div><div class="row" id="prop_docs_btn_div"> <font class="mandatory" style="font-weight:bold;">Add Documents</font>&nbsp;&nbsp;'+
                        '<a href="javascript:void(0)" id="prop-doc-btn" onclick="" class="btn btn-red btn-icon icon-left" style="height:15px;padding-left:3px;"> '+
                        '<i class="entypo-plus" style="width:15px;height:15px;color: white;padding:0px;"> </i> </a> </div>';

                        /*'<div class="colomn-div"> <label id="asset_address_name_'+id_prop+'_label">Address</label></br> <input class="form-control" type="text" id="asset_address_name_'+id_prop+'" name="asset_address_name_'+id_prop+'" placeholder="ADDRESS NAME" value=""/>'+
                        '</div><div class="colomn-div"> <label id="asset_pincode_name_'+id_prop+'_label">Pincode</label></br> <input class="form-control" type="text" maxlength="6" id="asset_pincode" name="asset_pincode" placeholder="PINCODE" value="" onkeypress='validate(event)' onchange="pincodeChange('asset',this.id);"/>'+
                        '</div><div class="colomn-div"> <label id="asset_state_name_'+id_prop+'_label">State</label></br> <select id="asset_state_'+id_prop+'" class="extra select form-control current_state biz_state asset_state" name="asset_state_'+id_prop+'" placeholder="asset_state" onchange="assetStateChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_district_name_'+id_prop+'_label">District</label></br> <select id="asset_district_'+id_prop+'" class="extra select form-control asset_district" name="asset_district_'+id_prop+'" placeholder="asset_district" onchange="assetDistrictChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_taluk_name_'+id_prop+'_label">taluk</label></br> <select id="asset_taluk_'+id_prop+'" class="extra select form-control asset_taluk" name="asset_taluk_'+id_prop+'" placeholder="asset_taluk" onchange="assetTalukChange();"></select>'+
                        '</div><div class="colomn-div"> <label id="fk_asset_village_or_town_'+id_prop+'_label">City / Town</label></br> <select id="fk_asset_village_or_town_'+id_prop+'" class="extra select form-control fk_asset_village_or_town" name="fk_asset_village_or_town_'+id_prop+'" placeholder="fk_asset__village_or_town"></select>'+
                        '</div><div class="colomn-div"> <label id="asset_value_name_'+id_prop+'_label">Asset Value</label></br> <input class="form-control" type="text" id="asset_value_name_'+id_prop+'" name="asset_value_name_'+id_prop+'" placeholder="ASSET VALUE" value=""/>'+
                        '</div><div class="colomn-div"> <label id="property_document_name_'+id_prop+'_label">Document Name</label></br> <input class="form-control" type="text" id="property_document_name_'+id_prop+'" name="property_document_name_'+id_prop+'" placeholder="DOCUMENT NAME" value=""/>'+
                        '</div><div class="colomn-div"><label id="property_document_path_'+id_prop+'_label">Document Path</label></br><input class="form-control asset-class" type="file" style="width:58%;" id="property_document_path_'+id_prop+'_img" maxlength=30 name="biz_name" placeholder="LOCATION" value="Choose File"/>'+
                        '</div><div class="colomn-div"><input class="form-control" type="text" style="width:58%;" id="property_document_path_'+id_prop+'"  placeholder="DOCUMENT PATH" />'+
                        '</div><div class="row" id="prop_docs_btn_div"> <font class="mandatory" style="font-weight:bold;">Add Documents</font>&nbsp;&nbsp;'+
                        '<a href="javascript:void(0)" id="prop-doc-btn" onclick="" class="btn btn-red btn-icon icon-left" style="height:15px;padding-left:3px;"> '+
                        '<i class="entypo-plus" style="width:15px;height:15px;color: white;padding:0px;"> </i> </a> </div>';*/
  /*  
    objTo.appendChild(prop_div);
    $("#work_exp_from").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
                  changeYear: true });
    $("#work_exp_to").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
                  changeYear: true });
    if (id_prop== 50) {
        var child = document.getElementById("ass_docs_btn_div");
        child.remove();
    }
});
console.log(id_org);*/
//End Add Documents in Asset Details


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
    console.log("keyFields");
    console.log(data);
    var keyFields = Object.keys(data.mlcompositeArray[0]);
    console.log(keyFields);
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


    $("#bill_book_img").change(function() {
        document.getElementById('bill_book').value = this.value;
    });
    $("#purchase_or_sales_order_img").change(function() {
        document.getElementById('purchase_or_sales_order').value = this.value;
    });
    $("#income_tax_return1_img").change(function() {
        document.getElementById('income_tax_return1').value = this.value;
    });
     $("#income_tax_return2_img").change(function() {
        document.getElementById('income_tax_return2').value = this.value;
    });
     $("#income_tax_return3_img").change(function() {
        document.getElementById('income_tax_return3').value = this.value;
    });
     $("#emp_bank_statement1_img").change(function() {
        document.getElementById('emp_bank_statement1').value = this.value;
    });
     $("#emp_bank_statement2_img").change(function() {
        document.getElementById('emp_bank_statement2').value = this.value;
    });
     $("#emp_bank_statement3_img").change(function() {
        document.getElementById('emp_bank_statement3').value = this.value;
    });
     $("#current_organization_salary_status_img").change(function() {
        document.getElementById('current_organization_salary_status').value = this.value;
    });



}


function setURL(id) {
    if (id.indexOf("biz_address_fk") >= 0 || id.indexOf("biz_id_alf_node_ref") >= 0) {
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
    mobile_number_div.innerHTML = '<input type="text"  class="form-control" id="mobile_number_' + id_mob + '" style="margin-top:3px;" onkeypress="validate(event)" maxlength="10" name="mobile_number"  placeholder="MOBILE"></input>' +
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
    email_div.innerHTML = '<input type="email" class="form-control" id="email_' + id_email + '" style="margin-top:3px;" name="email"  placeholder="EMAIL-ID"></input>' +
        '&nbsp<a href="javascript:void(0)"  id="add-email-btn" class="btn btn-red btn-icon icon-left"  style="height:15px;padding-left:3px;">' +
        '<i 	class="entypo-plus"	 style="width:15px;height: 15px;color: white;padding:0px;">	</i></a>';

    objTo.appendChild(email_div);
    if (id_email == 3) {
        var child = document.getElementById("add-email-btn");
        child.remove();
    }
});

var id_org= 1;
$(document).on('click', '#add-prev-org-btn', function() {
    var child = document.getElementById("prev_org_btn_div");
    child.remove();
    id_org++;
    if (id_org > 6)
        return
    var objTo = document.getElementById("prev-org-div")
    var org_div = document.createElement("div");
    org_div.innerHTML = '<div class="colomn-div"> <label id="previous_organization_name_'+id_org+'_label">Organization Name</label></br> <input class="form-control" type="text" id="previous_organization_name_'+id_org+'" maxlength=30 placeholder="ORGANIZATION NAME" value=""/>'+
                        '</div> <div class="colomn-div"> <label id="previous_organization_designation_'+id_org+'_label">Job Title</label></br> <input class="form-control" type="text" id="previous_organization_designation_'+id_org+'" maxlength=30 placeholder="JOB TITLE" value=""/>'+
                        '</div> <div class="colomn-div"> <label id="previous_organization_location_'+id_org+'_label">Location</label></br> <input class="form-control" type="text" id="previous_organization_location_'+id_org+'" maxlength=30 placeholder="LOCATION" value=""/>'+
                        '</div> <div class="colomn-div"> <label id="previous_organization_from_'+id_org+'_label">From</label></br> <input class="form-control work_exp_from" type="text" id="previous_organization_from_'+id_org+'" maxlength=30 placeholder="YYYY-MM-DD" value=""/>'+
                        '</div><div class="colomn-div"> <label id="previous_organization_to_'+id_org+'_label">To</label></br> <input class="form-control work_exp_to" type="text" id="previous_organization_to_'+id_org+'" maxlength=30  placeholder="YYYY-MM-DD" value=""/>'+
                        '</div><div class="row" id="prev_org_btn_div"> <font class="mandatory" style="font-weight:bold;">Add Prev Organization Details</font>&nbsp;&nbsp;'+
                        '<a href="javascript:void(0)" id="add-prev-org-btn" onclick="" class="btn btn-red btn-icon icon-left" style="height:15px;padding-left:3px;"> '+
                        '<i class="entypo-plus" style="width:15px;height:15px;color: white;padding:0px;"> </i> </a> </div>';

    objTo.appendChild(org_div);
    $(".work_exp_from").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
	    		  changeYear: true });
	$(".work_exp_to").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
	    		  changeYear: true });
    if (id_org== 6) {
        var child = document.getElementById("prev_org_btn_div");
        child.remove();
    }
});


var id_prop= 1;
$(document).on('click', '#asset-doc-btn', function() {
    console.log("asset-details");
    var child = document.getElementById("prop_docs_btn_div");
    child.remove();
    var asset;
    id_prop++;
    //asset++;
    if (id_prop > 50)
        return
    var objTo = document.getElementById("assetDocsDiv")
    var prop_div = document.createElement("div");

    prop_div.innerHTML ='<div class="sub-header" style="background-color: #981B1B;"><div>ASSET DOCUMENT '+id_prop+' </div> </div>'+
                        '<div class="colomn-div"> <label id="asset_address_'+id_prop+'_label">Address</label></br><input class="form-control" type="text" id="property_document_address_'+id_prop+'" maxlength=30 placeholder="Address" value=""/></div>'+
                        '<div class="colomn-div"><label id="asset_pincode_'+id_prop+'_label">Pincode</label></br><input class="form-control" type="text" maxlength="6" id="property_document_pincode_'+id_prop+'" name="property_document_pincode" placeholder="PINCODE" value="" onkeypress="validate(event)" onchange="pincodeChange('+"'asset'"+',this.id)"/><font class="mandatory">*</font></div>'+
                        '<div class="colomn-div"><label id="asset_state_'+id_prop+'_label">State</label></br><select id="property_document_state_'+id_prop+'" class="extra select form-control biz_state current_state asset_state_'+id_prop+' property_document_state_'+id_prop+'" name="property_document_state" placeholder="property_document_state" onchange="currentStateChange();"></select><font class="mandatory">*</font></div>'+
                        '<div class="colomn-div"><label id="asset_district_'+id_prop+'_label">District</label></br><select id="property_document_district_'+id_prop+'" class="extra select form-control asset_district_'+id_prop+'" name="property_document_district" placeholder="property_document_district" onchange="currentDistrictChange();"></select></div>'+
                        '<div class="colomn-div"><label id="asset_taluk_'+id_prop+'_label">Taluk</label></br><select id="property_document_taluk_'+id_prop+'" class="extra select form-control asset_taluk_'+id_prop+'" name="property_document_taluk" placeholder="asset_taluk" onchange="currentTalukChange();"></select></div>'+
                        '<div class="colomn-div"><label id="fk_asset_village_or_town_'+id_prop+'_label">City / Town</label></br><select id="property_document_city_or_town_'+id_prop+'" class="extra select form-control fk_asset_village_or_town_'+id_prop+'" name="property_document_city_or_town_1" placeholder="fk_asset__village_or_town"></select></div> '+
                        '<div class="colomn-div"><label id="asset_value_'+id_prop+'_label">Asset Value</label></br><input class="form-control" type="text" id="property_document_asset_value_'+id_prop+'" maxlength=30 placeholder="Asset Value" value=""/></div>'+
                        '<div class="colomn-div"><label id="biz_shop_'+id_prop+'_label">Document Name</label></br><input class="form-control" type="text" id="property_document_name_'+id_prop+'" maxlength=30 placeholder="DOCUMENT NAME" value=""/></div>'+
                        '<div class="colomn-div"><label id="jobtitle_'+id_prop+'_label">Document Path</label></br><input class="form-control asset-class" type="file" style="width:58%;" id="property_document_path_'+id_prop+'_img"  placeholder="LOCATION" value="Choose File"/></div>'+
                        '<div class="colomn-div"><input class="form-control" type="text" style="width:58%;" id="property_document_'+id_prop+'_txt"   placeholder="DOCUMENT PATH" ></div></div>'+
                        '<div class="row" id="prop_docs_btn_div"><font class="mandatory" style="font-weight:bold;">Add Documents</font><a href="javascript:void(0)" id="asset-doc-btn" class="btn btn-red btn-icon icon-left" style="height:15px;padding-left:3px;"><i class="entypo-plus" style="width:15px;height:15px;color: white;padding:0px;"></i></a></div>'
    objTo.appendChild(prop_div);
    $("#work_exp_from").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
	    		  changeYear: true });
	$("#work_exp_to").datepicker({ dateFormat: 'yy-mm-dd',yearRange: "-100:+0", changeMonth: true,//this option for allowing user to select month
	    		  changeYear: true });
    if (id_prop== 50) {
        var child = document.getElementById("prop_docs_btn_div");
        child.remove();
    }
});
console.log(id_org);

function addDocument(id,e){
    var theEvent = e || window.event;
    theEvent.preventDefault();
    $('#addDocBtn_' + id)[0].click();
    }

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
    var biz_name = document.getElementById("biz_name").value;
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
    var bill_book = document.getElementById("bill_book").value;
    var purchase_or_sales_order = document.getElementById("purchase_or_sales_order").value;

    /*************** Demographic Details ****************/
    /*Famil Details*/
    var marital_status = document.getElementById("marital_status").value;
    var no_of_child_below17 = document.getElementById("no_of_child_below17").value;
    var no_of_child_above17 = document.getElementById("no_of_child_above17").value;
    var live_with = document.getElementById("live_with").value;



    var employment_type = $('input[name="employment_type"]:checked').val();
    var current_organization_name = document.getElementById("current_organization_name").value;
    var current_organization_designation = document.getElementById("current_organization_designation").value;
    var current_organization_total_experience = document.getElementById("current_organization_total_experience").value;
    var current_organization_net_take_home = document.getElementById("current_organization_net_take_home").value;

    var current_organization_address = document.getElementById("current_organization_address").value;
    var current_organization_location = document.getElementById("current_organization_location").value;
    var current_organization_city = document.getElementById("current_organization_city").value;
    var current_organization_pincode = document.getElementById("current_organization_pincode").value;
    var current_organization_state = document.getElementById("current_organization_state").value;

    var current_organization_joining_date = document.getElementById("current_organization_joining_date").value;
    var current_organization_existing_emi = document.getElementById("current_organization_existing_emi").value;
    var current_organization_salary_mode = document.getElementById("current_organization_salary_mode").value;
    var current_organization_salary_status = document.getElementById("current_organization_salary_status").value;


    var prevOrgDataArray = [];
    for (var i = 1; i <= 10; i++) {
        var prevOrgData = {};
        if(document.getElementById("previous_organization_name_" + i + "") && document.getElementById("previous_organization_designation_" + i + "") && document.getElementById("previous_organization_location_" + i + "") && document.getElementById("previous_organization_from_" + i + "") && document.getElementById("previous_organization_to_" + i + "")){
            if(document.getElementById("previous_organization_name_" + i + "").value && document.getElementById("previous_organization_designation_" + i + "").value && document.getElementById("previous_organization_location_" + i + "").value && document.getElementById("previous_organization_from_" + i + "").value && document.getElementById("previous_organization_to_" + i + "").value){
                prevOrgData['previous_organization_name'] = document.getElementById("previous_organization_name_" + i + "").value;
                prevOrgData['previous_organization_designation'] = document.getElementById("previous_organization_designation_" + i + "").value;
                prevOrgData['previous_organization_location'] = document.getElementById("previous_organization_location_" + i + "").value;
                prevOrgData['previous_organization_from'] = document.getElementById("previous_organization_from_" + i + "").value;
                prevOrgData['previous_organization_to'] = document.getElementById("previous_organization_to_" + i + "").value;
                prevOrgDataArray.push(prevOrgData);
            }
        }
    }


    var income_tax_assessment_year1 = document.getElementById("income_tax_assessment_year1").value;
    var income_tax_return1 = document.getElementById("income_tax_return1").value;
    var income_tax_assessment_year2 = document.getElementById("income_tax_assessment_year2").value;
    var income_tax_return2 = document.getElementById("income_tax_return2").value;
    var income_tax_assessment_year3 = document.getElementById("income_tax_assessment_year3").value;

    var income_tax_return3 = document.getElementById("income_tax_return3").value;
    var emp_bank_statement1 = document.getElementById("emp_bank_statement1").value;
    var emp_bank_statement2 = document.getElementById("emp_bank_statement2").value;
    var emp_bank_statement3 = document.getElementById("emp_bank_statement3").value;

    var nature_of_profession = document.getElementById("nature_of_profession").value;
    var profession_firm_name = document.getElementById("profession_firm_name").value;
    var name_of_proprietor = document.getElementById("name_of_proprietor").value;
    var professional_qualification = document.getElementById("professional_qualification").value;
    var professional_address = document.getElementById("professional_address").value;
    var professional_location = document.getElementById("professional_location").value;
    var professional_city = document.getElementById("professional_city").value;
    var professional_pincode = document.getElementById("professional_pincode").value;
    var professional_state = document.getElementById("professional_state").value;
    var professional_landline = document.getElementById("professional_landline").value;

    var professional_mobile = document.getElementById("professional_mobile").value;
    var professional_hours_of_work = document.getElementById("professional_hours_of_work").value;
    var professional_working_hours_from = document.getElementById("professional_working_hours_from").value;
    var professional_working_hours_to = document.getElementById("professional_working_hours_to").value;
    var employmentObj = {};
    console.log(employment_type);

    if(employment_type == "salaried"){
        employmentObj = {
            "employment_type" : employment_type,
            "current_organization_name" : current_organization_name,
            "current_organization_designation" : current_organization_designation,
            "current_organization_total_experience" : current_organization_total_experience,
            "current_organization_net_take_home" : parseFloat(current_organization_net_take_home),
            "current_organization_address" : current_organization_address,
            "current_organization_location" : current_organization_location,
            "current_organization_city" : current_organization_city,
            "current_organization_pincode" : parseInt(current_organization_pincode),
            "current_organization_joining_date" : current_organization_joining_date,
            "current_organization_existing_emi" : parseFloat(current_organization_existing_emi),
            "current_organization_salary_mode" : current_organization_salary_mode,
            "current_organization_salary_status" : current_organization_salary_status,
            "previousOrganizationArray" : prevOrgDataArray,
            "income_tax_assessment_year1" : income_tax_assessment_year1,
            "income_tax_return1" : income_tax_return1,
            "income_tax_assessment_year2" : income_tax_assessment_year2,
            "income_tax_return2" : income_tax_return2,
            "income_tax_assessment_year3" : income_tax_assessment_year3,
            "income_tax_return3" : income_tax_return3,
            "emp_bank_statement1" : emp_bank_statement1,
            "emp_bank_statement2" : emp_bank_statement2 ,
            "emp_bank_statement3" : emp_bank_statement3
        };
        biz_door_no = current_organization_address;
        biz_street_name = current_organization_location;
        biz_location_name = current_organization_city;
        biz_pincode = parseInt(current_organization_pincode);
        biz_state = current_organization_state;
    }
     if(employment_type == "self_employed_professional"){
         employmentObj = {
            "employment_type" : employment_type,
            "nature_of_profession" : nature_of_profession,
            "profession_firm_name" : profession_firm_name,
            "name_of_proprietor" : name_of_proprietor,
            "professional_qualification" :professional_qualification,
            "professional_address" : professional_address,
            "professional_city": professional_city,
            "professional_pincode" : parseInt(professional_pincode),
            "professional_landline" : parseInt(professional_landline),
            "professional_mobile" : parseInt(professional_mobile),
            "professional_hours_of_work" : parseInt(professional_hours_of_work),
            "professional_working_hours_from" : professional_working_hours_from,
            "professional_working_hours_to" : professional_working_hours_to
         };
         biz_door_no = professional_address;
         biz_street_name = professional_location;
         biz_location_name = professional_city;
         biz_pincode = parseInt(professional_pincode);
         biz_state = professional_state;
     }


     var propertyDocumentsObj = {};
    /*propertyDocumentsArray000000000*/
    var propertyDocumentsArray = [];
    var arrcount = document.querySelectorAll(".asset-class")
     console.log("\narrcount");
    console.log(arrcount);
    alert(arrcount.length); 

    for (var i = 1; i <= arrcount.length; i++) {
        //var assetObj = {};
        if (jQuery('#property_document_path_' + i + "_img")) {
            if (jQuery('#property_document_path_' + i + "_img")[0]) {
                jQuery.each(jQuery('#property_document_path_' + i + "_img")[0].files, function(j, file) { 
                    if  (document.getElementById("property_document_path_"+ i + "_img").value){
                        var property_document_path = document.getElementById("property_document_path_"+ i + "_img").value;  
                    }
                    else if(document.getElementById("property_document_path_"+ i + "_img").value == null){
                        var property_document_path = "";
                    }
                    if  (document.getElementById("property_document_address_"+i).value){
                        var property_document_address = document.getElementById("property_document_address_"+i).value;
                    }
                    else if(document.getElementById("property_document_address_"+i).value == null){
                        var property_document_address = "";
                    }
                    if  (document.getElementById("property_document_state_"+i).value){
                        var property_document_state = document.getElementById("property_document_state_"+i).value;
                    }
                    else if(document.getElementById("property_document_state_"+i).value == null){
                        var property_document_state = "";
                    }
                    if  (document.getElementById("property_document_district_"+i).value){
                        var property_document_district = document.getElementById("property_document_district_"+i).value;
                    }
                    else if(document.getElementById("property_document_district_"+i).value == null){
                        var property_document_district = "";
                    }                    
                    if  (document.getElementById("property_document_pincode_"+i).value){
                        var property_document_pincode = parseInt(document.getElementById("property_document_pincode_"+i).value);
                    }
                    else if(document.getElementById("property_document_pincode_"+i).value == null){
                        var property_document_pincode = 0;
                    }
                    if  (document.getElementById("property_document_taluk_"+i).value){
                        var property_document_taluk = document.getElementById("property_document_taluk_"+i).value;
                    }
                    else if(document.getElementById("property_document_taluk_"+i).value == null){
                        var property_document_taluk = "";
                    }
                    if  (document.getElementById("property_document_city_or_town_"+i).value){
                        var property_document_city_or_town = document.getElementById("property_document_city_or_town_"+i).value;
                    }
                    else if(document.getElementById("property_document_city_or_town_"+i).value == null){
                        var property_document_city_or_town = "";
                    }
                    if  (document.getElementById("property_document_asset_value_"+i).value){
                        var property_document_asset_value = parseFloat(document.getElementById("property_document_asset_value_"+i).value);
                    }
                    else if(document.getElementById("property_document_asset_value_"+i).value == null){
                        var property_document_asset_value = "";
                    }    
                    if  (document.getElementById("property_document_name_"+i).value){
                        var property_document_name = document.getElementById("property_document_name_"+i).value;
                    }
                    else if(document.getElementById("property_document_name_"+i).value == null){
                        var property_document_name = "";
                    }                
                    
                    
                   /* var property_document_taluk = document.getElementById("property_document_taluk_"+i).value;
                    var property_document_pincode = parseInt(document.getElementById("property_document_pincode_"+i).value);
                    var property_document_city_or_town = document.getElementById("property_document_city_or_town_"+i).value;
                    var property_document_asset_value = parseFloat(document.getElementById("property_document_asset_value_"+i).value);
                    var property_document_name = document.getElementById("property_document_name_"+i).value;*/
                    var property_document_type = file.type;
                    var property_document_size = file.size;
                    var property_document_uploaded_date = new Date();
                    var property_document_status = "Active"
                    var property_document_last_modified_by = userId;
                    var property_document_last_modified_date = new Date();
                    var property_document_fk_sci_client_id = 1;   

                     propertyDocumentsObj = {
                    'property_document_state': property_document_state,
                    'property_document_last_modified_by': property_document_last_modified_by,
                    'property_document_address': property_document_address,
                    'property_document_path': property_document_path,
                    'property_document_size': property_document_size,
                    'property_document_type': property_document_type,
                    'property_document_taluk': property_document_taluk,
                    'property_document_pincode': property_document_pincode,
                    'property_document_district': property_document_district,
                    'property_document_name': property_document_name,
                    'property_document_city_or_town': property_document_city_or_town,
                    'property_document_asset_value': property_document_asset_value,
                    'property_document_uploaded_date': property_document_uploaded_date,
                    'property_document_last_modified_date': property_document_last_modified_date,
                    'property_document_status': property_document_status,
                    'property_document_fk_sci_client_id': property_document_fk_sci_client_id

                    }  
                    propertyDocumentsArray.push(propertyDocumentsObj);             
                });

            }
        }
    }    

    

    console.log("\propertyDocumentsArray");
    console.log(propertyDocumentsArray);

   /* var arrcount = document.querySelectorAll(".asset-class")
     console.log("\narrcount");
    console.log(arrcount);
    alert(arrcount.length);
    var propertyDocumentsArray = [];
    for (var i = 1; i <= arrcount.length; i++) {
        var assetObj = {};
        if (jQuery('#property_document_path_' + i + "_img")) {
			if (jQuery('#property_document_path_' + i + "_img")[0]) {
				jQuery.each(jQuery('#property_document_path_' + i + "_img")[0].files, function(j, file) {
					//dataObj.append('file-' + (i + 12), file);
                    assetObj["property_document_path"] = document.getElementById("property_document_path_"+ i + "_img").value;
                    if(document.getElementById("property_document_address_"+i).value){
                        assetObj["property_document_address"] = document.getElementById("property_document_address_"+i).value;
                    }
                    else {
                        assetObj["property_document_address"] = "";   
                    }					
                    
                    if(document.getElementById("property_document_state_"+i).value){
                        assetObj["property_document_state"] = document.getElementById("property_document_state_"+i).value;
                    }
                    else {
                        assetObj["property_document_state"] = "";   
                    }
                    if(document.getElementById("property_document_district_"+i).value){
                        assetObj["property_document_district"] = document.getElementById("property_document_district_"+i).value;
                    }
                    else {
                        assetObj["property_document_district"] = "";   
                    }
                    if(document.getElementById("property_document_taluk_"+i).value){
                       assetObj["property_document_taluk"] = document.getElementById("property_document_taluk_"+i).value;
                    }
                    else {
                        assetObj["property_document_taluk"] = "";   
                    }
                    if(document.getElementById("property_document_pincode_"+i).value){
                       assetObj["property_document_pincode"] = parseInt(document.getElementById("property_document_pincode_"+i).value);
                    }
                    else {
                        assetObj["property_document_pincode"] = "";   
                    }
                    if(document.getElementById("property_document_city_or_town_"+i).value){
                       assetObj["property_document_city_or_town"] = document.getElementById("property_document_city_or_town_"+i).value;
                    }
                    else {
                        assetObj["property_document_city_or_town"] = "";   
                    }

					if(document.getElementById("property_document_asset_value_"+i).value){
                       assetObj["property_document_asset_value"] = parseFloat(document.getElementById("property_document_asset_value_"+i).value);
                    }
                    else {
                        assetObj["property_document_asset_value"] = "";   
                    }                  
					var fileNameSplit = assetObj["property_document_path"].split('.');
					var lengthOfNameArr = (fileNameSplit.length - 1);
					assetObj["property_document_name"] = document.getElementById("property_document_name_"+i).value;
					assetObj["property_document_type"] = file.type;
					assetObj["property_document_size"] = file.size;
					assetObj["property_document_uploaded_date"] = new Date();
					assetObj["property_document_status"] = "Active"
					assetObj["property_document_last_modified_by"] = userId;
					assetObj["property_document_last_modified_date"] = new Date();
                    assetObj["property_document_fk_sci_client_id"] = 1;
                    //assetObj["property_doc_id"] = 1;
				});
			}
			propertyDocumentsArray.push(assetObj);
		}
    }
    console.log("\npropertyDocumentsArray");
    console.log(propertyDocumentsArray);
*/
    //modified byu vickram
    /*var arrcount = document.querySelectorAll(".asset-class > input[type='file']")
    alert(arrcount.length);
    var propertyDocArray = [];
    for (var i = 1; i <= arrcount; i++) {
        var assetObj = {};

        if (jQuery('#property_document_path_' + i + "_img")) {
			if (jQuery('#property_document_path_' + i + "_img")[0]) {
				jQuery.each(jQuery('#property_document_path_' + i + "_img")[0].files, function(j, file) {
					//dataObj.append('file-' + (i + 12), file);
					assetObj["property_document_address"] = document.getElementById("property_document_address_"+i).value;
					assetObj["property_document_state"] = document.getElementById("property_document_state_"+i).value;
					assetObj["property_document_district"] = document.getElementById("property_document_district_"+i).value;
					assetObj["property_document_taluk"] = document.getElementById("property_document_taluk_"+i).value;
					assetObj["property_document_pincode"] = document.getElementById("property_document_pincode_"+i).value;
					assetObj["property_document_path"] = document.getElementById("property_document_path_"+i).value;
					var fileNameSplit = assetObj["property_document_path"].split('.');
					var lengthOfNameArr = (fileNameSplit.length - 1);
					assetObj["property_document_name"] = document.getElementById("property_document_name_"+i).value;
					assetObj["property_document_type"] = file.type;
					assetObj["property_document_size"] = file.size;
					assetObj["property_document_uploaded_date"] = JSON.stringify(new Date());
					assetObj["property_document_status"] = "Active"
					assetObj["property_document_last_modified_by"] = userId;
					assetObj["property_document_last_modified_date"] =JSON.stringify(new Date());
				});
			}
			propertyDocArray.push(assetObj);
		}
    }*/

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
   /* if (staffDetailsSelectTime == 0) {
        if (document.getElementById("biz_staff_work_hour_1")) {
            if (document.getElementById("biz_staff_work_hour_1").value == "") {
                mandatoryFieldsDict["FULLTIME / PARTTIME"] = "Select FULLTIME / PARTTIME";
                $("#biz_staff_work_hour_1").css('background-color', 'yellow');
                $("#biz_staff_work_hour_1").css('color', 'black');
                staffDetailsSelect = 0;
                validation = 1;
            }
        }
    }*/
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
   /* if (!biz_pincode) {
        $("#biz_pincode").css('background-color', 'yellow');
        $("#biz_pincode").css('color', 'black');
    }*/

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

    var CoApplicantDetail;
    /*Co Applicant Details*/
    if(document.getElementById("co_applicant_check").checked){
        CoApplicantDetail = {};
	var co_app_first_name = document.getElementById("co_app_first_name").value;
	var co_app_middle_name= document.getElementById("co_app_middle_name").value;
	var co_app_last_name  = document.getElementById("co_app_last_name").value;
	var co_app_address1   = document.getElementById("co_app_address1").value;
	var co_app_address2   = document.getElementById("co_app_address2").value;
	var co_app_address3   = document.getElementById("co_app_address3").value;
	var co_app_state      = document.getElementById("co_app_state").value;
	var co_app_phno	      = document.getElementById("co_app_phno").value;
	var co_app_pincode    = document.getElementById("co_app_pincode").value;
	var co_app_gender     = $('input[name="co_app_gender"]:checked').val();//document.getElementById("co_app_gender").value;
	var co_app_dob        = document.getElementById("co_app_dob").value;
	var co_app_id_proof1  = document.getElementById("co_app_id_proof1").value;
	var co_app_id_proof2  = document.getElementById("co_app_id_proof2").value;
	var co_app_id_proof3  = document.getElementById("co_app_id_proof3").value;
	var co_app_id_proof4  = document.getElementById("co_app_id_proof4").value;
	var co_app_id_proof5  = document.getElementById("co_app_id_proof5").value;
	var co_app_id_proof6  = document.getElementById("co_app_id_proof6").value;

	var coappvalflag = 0;
	for (var i=1;i<7;i++){
		if(document.getElementById("co_app_id_proof"+i+"").value != ""){
		    coappvalflag += 1 ;
		}
	}

	if(co_app_first_name == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant FirstName"] = "Please Enter Name";
	}
	if(co_app_address1 == "" || ( co_app_address1.length< 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Door Number"] = "Please Enter Street Number (min 3 Character)";
	}
	if(co_app_address2 == "" || (co_app_address2.length < 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Street Number"] = "Please Enter Street Number (min 3 Character)";
	}
	if(co_app_address3 == "" || (co_app_address3.length < 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Location"] = "Please Enter Street Number (min 3 Character)";
	}
	if(co_app_state == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant State"] = "Please select State";
	}
	if(co_app_phno == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant phone"] = "Please Enter phone Number";
	}
	if(co_app_pincode == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant pincode"] = "Please Enter Pincode";
	}
	if(coappvalflag <2){
		validation = 1;
		mandatoryFieldsDict["Id Proof Of Co Applicant"] = "Please Enter minimum 2 id proof's";
	}
	CoApplicantDetail = {

				"co_app_first_name"	:co_app_first_name,
				"co_app_middle_name"	:co_app_middle_name,
				"co_app_last_name"	:co_app_last_name,
				"co_app_address1"	:co_app_address1,
				//"co_app_address1"	:"1",
				"co_app_address2"	:co_app_address2,
				"co_app_address3"	:co_app_address3,
				"co_app_state"		:co_app_state,
				"co_app_phno"		:parseInt(co_app_phno),
				"co_app_pincode"	:parseInt(co_app_pincode),
				"co_app_gender"		:co_app_gender,
				"co_app_dob"		:co_app_dob,
				"co_app_id_proof1"	:co_app_id_proof1,
				"co_app_id_proof2"	:co_app_id_proof2,
				"co_app_id_proof3"	:co_app_id_proof3,
				"co_app_id_proof4"	:co_app_id_proof4,
				"co_app_id_proof5"	:co_app_id_proof5,
				"co_app_id_proof6"	:co_app_id_proof6,
				"co_app_last_modified_by"	: userId,
				/*User Id*/
				"co_app_last_modified_date"	: currentDateValue,

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
        //"current_door_no": "11",
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

	    "biz_name":biz_name,
        "biz_nature": biz_nature,
        "biz_no_of_yrs": parseInt(biz_no_of_yrs),
        "biz_location": biz_location,
        "rent_pay_month": parseFloat(rent_pay_month),

        "biz_door_no": biz_door_no,
        //"biz_door_no": "11",
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
        "bill_book": bill_book,
        "purchase_or_sales_order":purchase_or_sales_order,

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
        "employmentArray" : [employmentObj],
        //"propertyDocumentsArray" : propertyDocArray,

	"documentsArray":[],

        /*CoApplicantDetail*/
        "coApplicantDetailArray": [CoApplicantDetail],
        //"memberLoanLocationArray": [],
        "propertyDocumentsArray": propertyDocumentsArray
    };
    }
    else if ($('#co_applicant_check').prop('checked', false)){
    	console.log("checked fales========");
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
        //"current_door_no": "11",
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

	"biz_name":biz_name,
        "biz_nature": biz_nature,
        "biz_no_of_yrs": parseInt(biz_no_of_yrs),
        "biz_location": biz_location,
        "rent_pay_month": parseFloat(rent_pay_month),

        "biz_door_no": biz_door_no,
        //"biz_door_no": "11",
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
        "employmentArray" : [employmentObj],
        //"memberLoanLocationArray": [],
        "propertyDocumentsArray": propertyDocumentsArray
	    };
    }

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

    /*property files*/
    /*jQuery.each(jQuery('#property_document_path_1_img')[0].files, function(i, file) {
        biz_data.append('file-12c', file);
    });*/
    var indexDictAsset = {};

    var a = 0;
    for (var i = 1; i <= 4; i++) {
        if (document.getElementById("property_document_path_" + i + "_img")) {
            a = a + 1;
            jQuery.each(jQuery('#property_document_path_' + i + '_img')[0].files, function(j, file) {
                biz_data.append('file-12-' + a, file);
                indexDictAsset[a] = "file-12-" + a;
            });
        }
    }

    /*JSON data for AVRO form*/
    biz_data.append('form_data', JSON.stringify(dataArr));

    biz_data.append("MemberAddress", memberAddress);
    biz_data.append("FileData", JSON.stringify(indexDict));
    biz_data.append("FileDataAsset", JSON.stringify(indexDictAsset));

    console.log("\nbiz_data");
    console.log(biz_data);

    /*Loading IMages*/
    var theImg = '<div class="loading"><img  src="/static/images/buffer-loading.gif">' + '<div style="padding-top:1%;" ><label style="padding-top:1%;">LOADING ...</label>' + '</div>' + '</div>';
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
        },
        error: function(data) {
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

    var CoApplicantDetail = {};
    /*Co Applicant Details*/
    if(document.getElementById("co_applicant_check").checked){
	var co_app_first_name = document.getElementById("co_app_first_name").value;
	var co_app_middle_name= document.getElementById("co_app_middle_name").value;
	var co_app_last_name  = document.getElementById("co_app_last_name").value;
	var co_app_address1   = document.getElementById("co_app_address1").value;
	var co_app_address2   = document.getElementById("co_app_address2").value;
	var co_app_address3   = document.getElementById("co_app_address3").value;
	var co_app_state      = document.getElementById("co_app_state").value;
	var co_app_phno	      = document.getElementById("co_app_phno").value;
	var co_app_pincode    = document.getElementById("co_app_pincode").value;
	var co_app_gender     = $('input[name="co_app_gender"]:checked').val();//document.getElementById("co_app_gender").value;
	var co_app_dob        = document.getElementById("co_app_dob").value;
	var co_app_id_proof1  = document.getElementById("co_app_id_proof1").value;
	var co_app_id_proof2  = document.getElementById("co_app_id_proof2").value;
	var co_app_id_proof3  = document.getElementById("co_app_id_proof3").value;
	var co_app_id_proof4  = document.getElementById("co_app_id_proof4").value;
	var co_app_id_proof5  = document.getElementById("co_app_id_proof5").value;
	var co_app_id_proof6  = document.getElementById("co_app_id_proof6").value;



	var coappvalflag = 0;
	for (var i=1;i<7;i++){
		if(document.getElementById("co_app_id_proof"+i+"").value != ""){
		    coappvalflag += 1 ;
		}
	}

	if(co_app_first_name == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant FirstName"] = "Please Enter Name";
	        $("#co_app_first_name").css('background-color', 'yellow');
	        $("#co_app_first_name").css('color', 'black');
	}
	if(co_app_address1 == "" || ( co_app_address1.length< 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Door Number"] = "Please Enter Street Number (min 3 Character)";
	        $("#co_app_address1").css('background-color', 'yellow');
	        $("#co_app_address1").css('color', 'black');
	}
	if(co_app_address2 == "" || (co_app_address2.length < 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Street Number"] = "Please Enter Street Number (min 3 Character)";
	        $("#co_app_address2").css('background-color', 'yellow');
	        $("#co_app_address2").css('color', 'black');
	}
	if(co_app_address3 == "" || (co_app_address3.length < 4)){
		validation = 1;
		mandatoryFieldsDict["Co Applicant Location"] = "Please Enter Street Number (min 3 Character)";
	        $("#co_app_address3").css('background-color', 'yellow');
	        $("#co_app_address3").css('color', 'black');
	}
	if(co_app_state == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant State"] = "Please select State";
	        $("#co_app_state").css('background-color', 'yellow');
	        $("#co_app_state").css('color', 'black');
	}
	if(co_app_phno == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant phone"] = "Please Enter phone Number";
	        $("#co_app_phno").css('background-color', 'yellow');
	        $("#co_app_phno").css('color', 'black');
	}
	if(co_app_pincode == ""){
		validation = 1;
		mandatoryFieldsDict["Co Applicant pincode"] = "Please Enter Pincode";
	        $("#co_app_pincode").css('background-color', 'yellow');
	        $("#co_app_pincode").css('color', 'black');
	}
	if(coappvalflag <2){
		validation = 1;
		mandatoryFieldsDict["Id Proof Of Co Applicant"] = "Please Enter minimum 2 id proof's";
	        $("#co_app_id_proof1").css('background-color', 'yellow');
	        $("#co_app_id_proof1").css('color', 'black');
	}


	CoApplicantDetail = {

				"co_applicant_id"	:co_applicant_id,
				"co_app_first_name"	:co_app_first_name,
				"co_app_middle_name"	:co_app_middle_name,
				"co_app_last_name"	:co_app_last_name,
				"co_app_address1"	:co_app_address1,
				"co_app_address2"	:co_app_address2,
				"co_app_address3"	:co_app_address3,
				"co_app_state"		:co_app_state,
				"co_app_phno"		:parseInt(co_app_phno),
				"co_app_pincode"	:parseInt(co_app_pincode),
				"co_app_gender"		:co_app_gender,
				"co_app_dob"		:co_app_dob,
				"co_app_id_proof1"	:co_app_id_proof1,
				"co_app_id_proof2"	:co_app_id_proof2,
				"co_app_id_proof3"	:co_app_id_proof3,
				"co_app_id_proof4"	:co_app_id_proof4,
				"co_app_id_proof5"	:co_app_id_proof5,
				"co_app_id_proof6"	:co_app_id_proof6,
				"co_app_last_modified_by"	: userId,
				/*User Id*/
				"co_app_last_modified_date"	: currentDateValue,

			}


    var propertyDocumentsArray = {};
    /*propertyDocumentsArray000000000*/
    var arrcount = document.querySelectorAll(".asset-class")
     console.log("\narrcount");
    console.log(arrcount);
    alert(arrcount.length);    

    /*for (var i = 1; i <= arrcount.length; i++) {
        var assetObj = {};
        if (jQuery('#property_document_path_' + i + "_img")) {
            if (jQuery('#property_document_path_' + i + "_img")[0]) {
                jQuery.each(jQuery('#property_document_path_' + i + "_img")[0].files, function(j, file) {                   
                    var property_document_path = document.getElementById("property_document_path_"+ i + "_img").value;  
                    var property_document_address = document.getElementById("property_document_address_"+i).value;
                    var property_document_state = document.getElementById("property_document_state_"+i).value;
                    var property_document_district = document.getElementById("property_document_district_"+i).value;
                    var property_document_taluk = document.getElementById("property_document_taluk_"+i).value;
                    var property_document_pincode = parseInt(document.getElementById("property_document_pincode_"+i).value);
                    var property_document_city_or_town = document.getElementById("property_document_city_or_town_"+i).value;
                    var property_document_asset_value = parseFloat(document.getElementById("property_document_asset_value_"+i).value);                                           
                    
                    var property_document_name = document.getElementById("property_document_name_"+i).value;
                    var property_document_type = file.type;
                    var property_document_size = file.size;
                    var property_document_uploaded_date = new Date();
                    var property_document_status = "Active"
                    var property_document_last_modified_by = userId;
                    var property_document_last_modified_date = new Date();
                    var property_document_fk_sci_client_id = 1;                  
                }
            }
        }
    }    

    propertyDocumentsArray = {
            'property_document_state': property_document_state,
            'property_document_last_modified_by': property_document_last_modified_by,
            'property_document_address': property_document_address,
            'property_document_path': property_document_path,
            'property_document_size': property_document_size,
            'property_document_type': property_document_type,
            'property_document_taluk': property_document_taluk,
            'property_document_pincode': property_document_pincode,
            'property_document_district': property_document_district,
            'property_document_name': property_document_name,
            'property_document_city_or_town': property_document_city_or_town,
            'property_document_asset_value': property_document_asset_value,
            'property_document_uploaded_date': property_document_uploaded_date,
            'property_document_last_modified_date': property_document_last_modified_date,
            'property_document_status': u'Active',
            'property_document_fk_sci_client_id': 1

            }

    console.log("\propertyDocumentsArray");
    console.log(propertyDocumentsArray);*/


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
        "mlValidationArray": [remarks_arr],


        /*CoApplicantDetail*/
        "coApplicantDetailArray": [CoApplicantDetail]
    	};
    }

    else if($('#co_applicant_check').prop('checked', false)){
    	console.log("chckbox is unchecked");

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
        "mlValidationArray": [remarks_arr],


        /*CoApplicantDetail*/
        //"coApplicantDetailArray": [CoApplicantDetail]
    	};


    }





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
