/* 
 * @author Shashank
 * 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var timeVar;
/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function callerAllContact(jsonObjResult)
{
    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);

                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus.innerHTML = "Completed";
                }


            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            if(isCallDialpad === 1) {
                closeWIOStrip();
            }
            if ((jsonObjResult.transferState == "NA") && (jsonObjResult.conferenceState == "NA"))
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            }


            // document.getElementById("callDiv").style.display = "none";

        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + dahdiChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + dahdiChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    } else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            var actionUrl = "";
            
            if(jsonObjResult.isIO === "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            }            
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Complete";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }
        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }

            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
//    else if(jsonObjResult.callAction = "transfer")
//    {
//        
//    }
}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function allContact(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9  && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }

                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);

                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
            // document.getElementById("callDiv").style.display = "none";

        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold")
        {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        }
        else if(jsonObjResult.callState.trim() == "unhold")
        {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Complete";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }


            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }

            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function LeadFollow(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);

                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";
////                
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'  onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            
            if (document.getElementById("wioStripDiv").style.display == "none")
            {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Complete";
        }



    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Complete";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function ticketFollowUp(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }
            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }


    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function allCallBacks(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function makeCall(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }

            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;display:none' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);

                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                }

            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";
//                
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }
            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function previewMakeCall(jsonObjResult)
{
    debugger;
    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    var userID = sipID - 10000;
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
                startPreviewTimer(boxURL,boxName,boxPassword, sipID, userID)
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Complete";
                    var boxName = $("#boxUserName").val();
                    var boxPassword = $("#boxPassword").val();
                    var boxURL = $("#boxUrl").val();
                    var userID = sipID - 10000;
                    startPreviewTimer(boxURL,boxName,boxPassword, sipID, userID);
                }

            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
           if(jsonObjResult.transferState !== "complete")
           {
//                startTimers();
                callNowConnected = 0;
                stopBatchDialingTimer();
                timerConfiguration();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
    //            $("#callUID").val("");
                $('a').unbind("click.myDisable");
                isDispositionEnabled = 1;
                callNowConnected = 0;
                var wrapUpTimeExpire = "";
                if (wrapUpTimeExpire = document.getElementById("wrapUpTimeExpire") != null)
                {
                    wrapUpTimeExpire = document.getElementById("wrapUpTimeExpire").value;
                }
                totalSeconds = 0;
                isCallConnected = 0;
                if (isCompletedFillingWrapup)
                {
                    var callerID, campaignID, maxCallPerDay;
                    stopPrieviewTimer();
                    stopWrapUpTimer();
                    stopDialingTimer
                    stopTalkingTimer();
                    if (wrapUpTimeExpire == "Next Contact")
                    {
                        callerID = document.getElementById("callerID").value;
                        campaignID = document.getElementById("campaignID").value;
                        maxCallPerDay = document.getElementById("maxRedialPerDay").value;
                        readyForCallForAPI(pcallerID, pcampaignID, maxRedialPerDay)

                    }
                    if (wrapUpTimeExpire == "Not Ready")
                    {
                        notReady();
                        if (document.getElementById("readyForCallDiv") != null)
                        {
                            document.getElementById("readyForCallDiv").innerHTML = "<span class=\"greenButtons\"id='hook' onclick=\"dailerOffHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">READY FOR CALL</span>";
                            document.getElementById("readyForCallDiv").innerHTML = "<span class=\"redButtons\" id='hook' onclick=\"dailerAutoPreOnHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">NOT READY</span>";
                        }
                    }
                    if (wrapUpTimeExpire == "Wait")
                    {
                        callerID = document.getElementById("callerID").value;
                        campaignID = document.getElementById("campaignID").value;
                        maxCallPerDay = document.getElementById("maxRedialPerDay").value;
                        readyForCallForAPI(callerID, campaignID, maxCallPerDay)
                    }
                }
                else
                {
                    if (wrapUpTimeExpire == "Next Contact")
                    {
                        document.getElementById("prevDiv").style.display = "none";
                        document.getElementById("wrapupDiv").style.display = "";
                        document.getElementById("wrapupOnExpire").style.display = "";
                        stopPrieviewTimer();
                        stopDialingTimer();
                        stopTalkingTimer();
                        document.getElementById("prevTimer").innerHTML = "";
                        wrapup_timer_is_on = 1;
                        if(isWrapupTime != 1) {
                            showWrapupTimer();
                        }
                        isWrapupTime = 1;

                    }
                    if (wrapUpTimeExpire == "Not Ready")
                    {
                        document.getElementById("prevDiv").style.display = "none";
                        document.getElementById("wrapupDiv").style.display = "";
                        preview_timer_is_on = 0;
                        stopPrieviewTimer();
                        document.getElementById("prevTimer").innerHTML = "";
                        wrapup_timer_is_on = 1;
                        if(isWrapupTime != 1) {
                            showWrapupTimer();
                        }
                        isWrapupTime = 1;
                        var callStatus = document.getElementById("callSt");
                        if (document.getElementById("readyForCallDiv") != null)
                        {
                            document.getElementById("readyForCallDiv").innerHTML = "<span class=\"greenButtons\"id='hook' onclick=\"dailerOffHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">READY FOR CALL</span>"
                        }

                    }
                    if (wrapUpTimeExpire == "Wait")
                    {
                        document.getElementById("prevDiv").style.display = "none";
                        document.getElementById("wrapupDiv").style.display = "";
                        preview_timer_is_on = 0;
                        stopPrieviewTimer();
                        document.getElementById("prevTimer").innerHTML = "";
                        wrapup_timer_is_on = 1;
                        if(isWrapupTime != 1) {
                            showWrapupTimer();
                        }
                        isWrapupTime = 1;
                        var callStatus = document.getElementById("callSt");
                    }
                }
           }
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function predictiveMakeCall(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }

            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }

            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function campaignUpcomingCallBacks(jsonObjResult)
{
    debugger;
    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {
            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }


            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }

            if (jsonObjResult.transferState == "consulting")
            {
                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
                if (processimages != null)
                {
                    processimages.style.display = "none";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squarerayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";

                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);

                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }            
            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }


            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
             var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }

            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function leadFollowUp(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {
            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }


            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }

            if (jsonObjResult.transferState == "consulting")
            {
                previewMakeCall
                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
                if (processimages != null)
                {
                    processimages.style.display = "none";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function supportTicket(jsonObjResult)
{

    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {
            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }


            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }

            if (jsonObjResult.transferState == "consulting")
            {
                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
                if (processimages != null)
                {
                    processimages.style.display = "none";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }

            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";
//                
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }

}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function  reports(jsonObjResult)
{
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var transferChannel = "";
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (jsonObjResult.callState.trim() == "answered")
    {
        console.log("Agent monitor call is answered");
        updateAgentActiveCallState(jsonObjResult);
        console.log("Agent monitor called function after answered");
        if (jsonObjResult.transferTo != "NA")
        {
            updateMonitorTrasnferState(jsonObjResult)
        } else if (jsonObjResult.conferenceTo != "NA")
        {
            updateMonitorConferenceState(jsonObjResult);
        }
    }
    if (jsonObjResult.callState.trim() == "hangup")
    {
        console.log("Agent monitor call is hangup");
        updateAgentActiveCallState(jsonObjResult);
        console.log("Agent monitor called function after hangup");

    }
    if (jsonObjResult.callState.trim() == "dialing")
    {
        try
        {
            document.getElementById("hangupcallerTD").innerHTML = "";
            document.getElementById("holdUnHoldTD").innerHTML = "";
            document.getElementById("mutecallerTD").innerHTML = "";
            document.getElementById("transfercallerTD").innerHTML = "";
//                
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
            document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
            document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
        }
        catch (err)
        {

        }
    }
    if(jsonObjResult.callState.trim() == "hold") {
        document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
    } else if(jsonObjResult.callState.trim() == "unhold") {
        document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
    }
}

/**
 * 
 * @param {type} jsonObjResult
 * @returns {undefined}
 */
function campaignMissedCallBacks(jsonObjResult)
{
    var callStatus = document.getElementById("callSt");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {
            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }


            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }

            if (jsonObjResult.transferState == "consulting")
            {
                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
                if (processimages != null)
                {
                    processimages.style.display = "none";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }

            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            stopBatchDialingTimer();
            timerConfiguration();
            document.getElementById('aavazBoxLoaderID').style.display = 'none';
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxDialPadTD').style.display = 'table';
            }

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

            if (document.getElementById('theLayer') != null) {
                document.getElementById("theLayer").style.display = "none";
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Completed";
                }
                else
                {
                    callStatus.innerHTML = "Completed";
                }
            }
            $("#boxTo").val("");
//            $("#callUID").val("");
        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("hhangupcallerTDoldUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";
//                
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }
            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }
    }
    else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);

            if (callStatus != null && flag)
            {
                callStatus.innerHTML = "Call Completed";
            } else {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
}

function defaultEventPage(jsonObjResult)
{
    var callStatus = document.getElementById("callSt");
    console.log("inside  defaultEventPage");
    var sipID = $("#boxsipExt").val();
    var boxName = $("#boxUserName").val();
    var boxPassword = $("#boxPassword").val();
    var boxURL = $("#boxUrl").val();
    var dahdiChannel = $("#dahdiChannel").val();
    var from = jsonObjResult.From;
    var to = jsonObjResult.To;
    var transferChannel = "";
    if (from != null && from.length > 9 && jsonObjResult.isIO == "inbound")
    {
        transferChannel = from;
    }
    else
    {
        transferChannel = to;
    }
    if (sipID == jsonObjResult.SipID)
    {
        if (jsonObjResult.callState.trim() == "answered")
        {

            document.getElementById("boxQueueName").innerHTML = jsonObjResult.queueName;
//            $("#callUID").val(jsonObjResult.CUID);
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + transferChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            $("#boxTo").val(transferChannel);
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('aavazBoxHangupID') != null)
            {
                document.getElementById('aavazBoxHangupID').style.display = '';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Call In Progress";
                }
                else
                {
                    callStatus.innerHTML = "Call In Progress";
                }
            }


            if (jsonObjResult.transferState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "inline";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "inline";
                }
            } else if (jsonObjResult.transferState == "complete")
            {
                stopBatchDialingTimer();
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            } else if (jsonObjResult.transferState == "keep")
            {
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.transferTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.transferTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                var keepTAB = document.getElementById("keepTAB" + jsonObjResult.transferTo);
                if (keepTAB != null)
                {
                    keepTAB.style.display = "none";
                }
                var completeTAB = document.getElementById("completeTAB" + jsonObjResult.transferTo);
                if (completeTAB != null)
                {
                    completeTAB.style.display = "none";
                }
            }
            if (jsonObjResult.conferenceState == "consulting")
            {
//                var processimages = document.getElementById("processimages" + jsonObjResult.transferTo);
//                if (processimages != null)
//                {
//                    processimages.style.display = "none";
//                }



                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "none";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "none";
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "inline";
                }
                var conferencecompleteTAG = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "inline";
                }
            } else if (jsonObjResult.conferenceState == "complete")
            {
                stopBatchDialingTimer();
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                var keepConferenceTAG = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepConferenceTAG != null)
                {
                    keepConferenceTAG.style.display = "none";
                }
                var conferencecompleteTAG = document.getElementById("completeConferenceTAB" + jsonObjResult.conferenceTo);
                if (conferencecompleteTAG != null)
                {
                    conferencecompleteTAG.style.display = "none";
                }

                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
                closeDiv();
                isBoxConfernceActive = 1;
                boxCallTransferState = 0;
                isTransfering = false;
                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:onConfernceHangupTheCall  ('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>KILL</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "";
                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                timeVar = setTimeout(function () {
                    document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:50%;margin-right:0px;' class='squareBlueBtn_new' onclick=\"javascript:transferOutInForConference('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + jsonObjResult.To + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a><a style='width:48%;margin-left:2px;' href='#' class='squareGrayBtn_Conf' onclick=\"javascript:leaveTheConferenceExternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

                }, 1000);
                var flag = leaveConferenceUpdateLegA(jsonObjResult);
                if (!flag)
                {
                    callStatus = "Completed";
                }
            } else if (jsonObjResult.conferenceState == "keep")
            {
                var keepconferenceTAB = document.getElementById("keepconferenceTAB" + jsonObjResult.conferenceTo);
                if (keepconferenceTAB != null)
                {
                    keepconferenceTAB.style.display = "none";
                }
                var completeConferenceTAB = document.getElementById("conferenceInternalTAB" + jsonObjResult.conferenceTo);
                if (completeConferenceTAB != null)
                {
                    completeConferenceTAB.style.display = "none";
                }
                var transferTAG = document.getElementById("transferTAB" + jsonObjResult.conferenceTo);
                if (transferTAG != null)
                {
                    transferTAG.style.display = "inline";
                }
                var conferenceTAB = document.getElementById("conferenceTAB" + jsonObjResult.conferenceTo);
                if (conferenceTAB != null)
                {
                    conferenceTAB.style.display = "inline";
                }
            }

        }
        if (jsonObjResult.callState.trim() == "hangup")
        {
            callNowConnected = 0;
            timerConfiguration();
            if ((jsonObjResult.transferState == "NA") && (jsonObjResult.conferenceState == "NA"))
            {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                if (document.getElementById('aavazBoxHangupID') != null)
                {
                    document.getElementById('aavazBoxHangupID').style.display = 'none';
                    document.getElementById('aavazBoxDialPadTD').style.display = 'table';
                }

                if (document.getElementById('callAcceptDiv') != null) {
                    document.getElementById("callAcceptDiv").style.display = "none";
                }

                if (document.getElementById('theLayer') != null) {
                    document.getElementById("theLayer").style.display = "none";
                }

                if (callStatus != null)
                {
                    if (document.getElementById("completeHideContactInfo").value == "true")
                    {
                        callStatus.innerHTML = "Completed";
                    }
                    else
                    {
                        callStatus.innerHTML = "Completed";
                    }
                }
                $("#boxTo").val("");
//                $("#callUID").val("");
            }


            // document.getElementById("callDiv").style.display = "none";

        }
        if (jsonObjResult.callState.trim() == "dialing")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' style='display:none' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + dahdiChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' style='display:none' onclick=\"javascript:transferOutInCallForAPI('" + sipID + "','" + dahdiChannel + "','" + boxURL + "')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";
            if (document.getElementById('aavazBoxDialPadTD') != null)
            {
                document.getElementById('aavazBoxDialPadTD').style.display = 'none';
            }
            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            if (document.getElementById('aavazBoxHangupID') != null) {
                document.getElementById('aavazBoxLoaderID').style.display = 'none';
                document.getElementById('aavazBoxHangupID').innerHTML = "<a href='#' class='squareSmallGrayBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "');\"><font color='white' > HANGUP</font> </a>";
                document.getElementById('aavazBoxHangupID').style.display = 'block';
            }

            if (callStatus != null)
            {
                if (document.getElementById("completeHideContactInfo").value == "true")
                {
                    callStatus.innerHTML = "Dialing: ----";
                }
                else
                {
                    callStatus.innerHTML = "Dialing: " + transferChannel;
                }
            }
        }
        if(jsonObjResult.callState.trim() == "hold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> UNHOLD</font></a>";
        } else if(jsonObjResult.callState.trim() == "unhold") {
            document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:getHoldUnholdAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HOLD</font></a>";
        }        
    } else if (jsonObjResult.transferTo === sipID)
    {
        if (jsonObjResult.transferState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.transferTo + "')\"><font color='white'> HANGUP</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.transferState === "complete")
        {
            $("#callUID").val(jsonObjResult.CUID);
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"\"><font color='white'> HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> MUTE</font></a>";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "')\"><font color='white'> HANGUP</font></a>";
            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }
            var actionUrl = "";
            
            if(jsonObjResult.isIO == "outbound"){
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.To + "&provider=Asterisk";
            } 
            else {
                actionUrl = "/aavaz/BoxInboundCallSearchStrip?InboundCall=" + jsonObjResult.isIO + "&queueName=" + jsonObjResult.queueName + "&callUUID=" + jsonObjResult.CUID + "&phoneNumber=" + jsonObjResult.From + "&provider=Asterisk";
            } 
            if (document.getElementById("wioStripDiv").style.display == "none") {
                if (document.getElementById("theLayer-2") == null) {
                    searchContactStripAsterisk(actionUrl);
                }
            }
            
            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
                closeWIOStrip();
            }

        }
        if (jsonObjResult.transferState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
    else if (jsonObjResult.conferenceTo === sipID)
    {
        if (jsonObjResult.conferenceState === "consulting")
        {
            try
            {
//                $("#callUID").val(jsonObjResult.CUID);
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:hangupInternal('" + boxURL + "','" + jsonObjResult.To + "','" + jsonObjResult.SipID + "','" + jsonObjResult.conferenceTo + "')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + jsonObjResult.SipID + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            if (callStatus != null)
            {
                callStatus.innerHTML = "Call In Progress";
            }
        }

        if (jsonObjResult.conferenceState === "complete")
        {
            try
            {
                document.getElementById("hangupcallerTD").innerHTML = "";
                document.getElementById("holdUnHoldTD").innerHTML = "";
                document.getElementById("mutecallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "";

                var conferenceRoom = jsonObjResult.SipID - 10000;
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new'onclick=\"javascript:featureNotAavailable('Transfer/Conference')\"><font color='white'>TRANSFER / CONFERENCE</font></a>";
                document.getElementById("hangupcallerTD").innerHTML = "<a href='#' class='squareGrayBtn_new' onclick=\"javascript:featureNotAavailable('Hangup ')\"><font color='white'> HANGUP</font></a>";

                document.getElementById("holdUnHoldTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:onHoldTheConfernceCall('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>HOLD</font></a>";
                document.getElementById("mutecallerTD").innerHTML = "<a href='#' class='squareBlueBtn_new' onclick=\"javascript:dialPadMuteTheAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";

                var mutediv = document.getElementById("aavazBoxMuteCallerFromDialPadID");

                if (mutediv) {
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "";
                    document.getElementById("aavazBoxMuteCallerFromDialPadID").innerHTML = "<a href='#' class='squareSmallMagnetaBtn' onclick=\"javascript:HangupCallForAgent('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>MUTE</font></a>";
                }
                document.getElementById("transfercallerTD").innerHTML = "";
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";

            }
            catch (err)
            {

            }
            if (document.getElementById("transfercallerTD") != null)
            {
                document.getElementById("transfercallerTD").innerHTML = "<a href='#' style='width:99%;' class='squareGrayBtn_new' onclick=\"javascript:leaveTheConferenceInternal('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + conferenceRoom + "','" + sipID + "')\"><font color='white'>LEAVE CONFERENCE</font></a>";
            }
            document.getElementById("callAcceptedPhone").innerHTML = "<img src='/aavaz/images/common/phone_settings.png' >&nbsp;<font color='#ce6700'>" + transferChannel + "</font>";

            if (document.getElementById('callAcceptDiv') != null) {
                document.getElementById("callAcceptDiv").style.display = "";
            }

            var flag = leaveConferenceUpdateLegB(jsonObjResult);


            if (typeof callStatus !== undefined)
            {
                if (flag)
                {
                    callStatus.innerHTML = "Call Completed";
                } else {
                    callStatus.innerHTML = "Call In Progress";
                }
            }
            if (jsonObjResult.callState == "hangup") {
                document.getElementById("callAcceptDiv").style.display = "none";
            }

        }
        if (jsonObjResult.conferenceState === "keep")
        {
//            document.getElementById("callUID").value = "";
            document.getElementById("callAcceptDiv").style.display = "none";
            callStatus.innerHTML = "Completed";
        }

    }
//    else if(jsonObjResult.callAction = "transfer")
//    {
//        
//    }
}

function timerConfiguration()
{
    if (document.getElementById('showCallDispoTimer' + calledRow) != null)
    {
//        document.getElementById('callDispoTimerText' + calledRow).style.display = "inline-block";
        var time = document.getElementById('ACW').value;
        if (time != "" && typeof time !== 'undefined')
        {
            var seconds = time % 60;
            var minuteSeconds = time - seconds;
            var minutes = minuteSeconds / 60;
            if (document.getElementById('showCallDispoTimer' + calledRow).style.display == "none")
            {
                document.getElementById('callDispoTimer' + calledRow).innerHTML = minutes + ":" + seconds;
                startTimers();
            }
        }
    }
}

function updateAgentActiveCallState(jsonObjResult)
{
    var agentID = parseInt(jsonObjResult.SipID) - 10000;
    var direction = document.getElementById("direction" + agentID);
    var callStartTime = document.getElementById("callStartTime" + agentID);
    var talkingTo = document.getElementById("talkingTo" + agentID);
    var onCall = document.getElementById("onHook" + agentID);
    var adminSipId = document.getElementById("adminSipId").value;
    var ba = document.getElementById("bargeInId" + agentID);
    var wa = document.getElementById("whisperId" + agentID);
    var lp = document.getElementById("listenId" + agentID);
    var detach = document.getElementById("exitId" + agentID);
    if (jsonObjResult.callState == "answered" && jsonObjResult.callAction == "NA")
    {
        direction.innerHTML = jsonObjResult.isIO;
        callStartTime.innerHTML = jsonObjResult.Time;
        if (jsonObjResult.isIO == "inbound")
        {
            talkingTo.innerHTML = jsonObjResult.From;
        } else {
            talkingTo.innerHTML = jsonObjResult.To;
        }
        onCall.innerHTML = "Yes";
        var currentlocalChannel = "Local/" + adminSipId;
        ba.setAttribute("href", "javascript:bargeInTheCall('" + agentID + "','" + adminSipId + "','" + jsonObjResult.SipID + "','existedSIPChannel','" + currentlocalChannel + "')");
        ba.innerHTML = "<img border='0' title='Barge In' src='/aavaz/images/barge/Barge-in.png'/>";
        wa.setAttribute("href", "javascript:whisperTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.SipID + "','existedSIPChannel','" + currentlocalChannel + "')");
        wa.innerHTML = "<img border='0'  title='Whisper' src='/aavaz/images/barge/Whisper.png'/>";
        lp.setAttribute("href", "javascript:listenTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.SipID + "','existedSIPChannel','" + currentlocalChannel + "')");
        lp.innerHTML = "<img border='0'  title='Listen' src='/aavaz/images/barge/Listen.png'/>";
        detach.setAttribute("href", "javascript:detachTheChannel('" + agentID + "','" + adminSipId + "','" + jsonObjResult.SipID + "','existedSIPChannel','" + currentlocalChannel + "')");
        detach.setAttribute("class", "exitACTIVE");
        detach.innerHTML = "<img border='0'  title='Exit current call' src='/aavaz/images/barge/Exit.png'/>";
    } else if (jsonObjResult.callState == "answered" && jsonObjResult.callAction != "NA") {
        if (jsonObjResult.transferState == "complete")
        {
            onCall.innerHTML = "No";
            direction.innerHTML = "--";
            callStartTime.innerHTML = "--";
            talkingTo.innerHTML = "--";
            ba.removeAttribute("href");
            ba.innerHTML = "";
            wa.removeAttribute("href");
            wa.innerHTML = "";
            lp.removeAttribute("href");
            lp.innerHTML = "";
            detach.removeAttribute("href");
            detach.setAttribute("class", "exitINACTIVE");
            detach.innerHTML = "";
        }
    } else {
        direction.innerHTML = "--";
        callStartTime.innerHTML = "--";
        talkingTo.innerHTML = "--";
        onCall.innerHTML = "No";

        ba.removeAttribute("href");
        ba.innerHTML = "";
        wa.removeAttribute("href");
        wa.innerHTML = "";
        lp.removeAttribute("href");
        lp.innerHTML = "";
        detach.removeAttribute("href");
        detach.setAttribute("class", "exitINACTIVE");
        detach.innerHTML = "";
    }
}


function updateMonitorTrasnferState(jsonObjResult)
{
    var agentID = parseInt(jsonObjResult.transferTo) - 10000;
    var direction = document.getElementById("direction" + agentID);
    var callStartTime = document.getElementById("callStartTime" + agentID);
    var talkingTo = document.getElementById("talkingTo" + agentID);
    var adminSipId = document.getElementById("adminSipId").value;
    var onCall = document.getElementById("onHook" + agentID);
    var ba = document.getElementById("bargeInId" + agentID);
    var wa = document.getElementById("whisperId" + agentID);
    var lp = document.getElementById("listenId" + agentID);
    var detach = document.getElementById("exitId" + agentID);

    if (jsonObjResult.transferState == "consulting")
    {
        direction.innerHTML = jsonObjResult.isIO;
        callStartTime.innerHTML = jsonObjResult.Time;
        talkingTo.innerHTML = jsonObjResult.SipID;
        onCall.innerHTML = "Yes";
        var currentlocalChannel = "Local/" + adminSipId;
        ba.setAttribute("href", "javascript:bargeInTheCall('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        ba.innerHTML = "<img border='0' title='Barge In' src='/aavaz/images/barge/Barge-in.png'/>";
        wa.setAttribute("href", "javascript:whisperTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        wa.innerHTML = "<img border='0'  title='Whisper' src='/aavaz/images/barge/Whisper.png'/>";
        lp.setAttribute("href", "javascript:listenTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        lp.innerHTML = "<img border='0'  title='Listen' src='/aavaz/images/barge/Listen.png'/>";
        detach.setAttribute("href", "javascript:detachTheChannel('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        detach.setAttribute("class", "exitACTIVE");
        detach.innerHTML = "<img border='0'  title='Exit current call' src='/aavaz/images/barge/Exit.png'/>";
    } else if (jsonObjResult.transferState == "complete")
    {
        if (jsonObjResult.isIO == "inbound")
        {
            talkingTo.innerHTML = jsonObjResult.From;
        } else {
            talkingTo.innerHTML = jsonObjResult.To;
        }
    } else {
        onCall.innerHTML = "No";
        direction.innerHTML = "--";
        callStartTime.innerHTML = "--";
        talkingTo.innerHTML = "--";

        ba.removeAttribute("href");
        ba.innerHTML = "";
        wa.removeAttribute("href");
        wa.innerHTML = "";
        lp.removeAttribute("href");
        lp.innerHTML = "";
        detach.removeAttribute("href");
        detach.setAttribute("class", "exitINACTIVE");
        detach.innerHTML = "";
    }

}


function updateMonitorConferenceState(jsonObjResult) {
    var agentID = parseInt(jsonObjResult.transferTo) - 10000;
    var direction = document.getElementById("direction" + agentID);
    var callStartTime = document.getElementById("callStartTime" + agentID);
    var talkingTo = document.getElementById("talkingTo" + agentID);
    var adminSipId = document.getElementById("adminSipId").value;
    var onCall = document.getElementById("onHook" + agentID);
    var ba = document.getElementById("bargeInId" + agentID);
    var wa = document.getElementById("whisperId" + agentID);
    var lp = document.getElementById("listenId" + agentID);
    var detach = document.getElementById("exitId" + agentID);

    if (jsonObjResult.conferenceState == "consulting")
    {
        direction.innerHTML = jsonObjResult.isIO;
        callStartTime.innerHTML = jsonObjResult.Time;
        talkingTo.innerHTML = jsonObjResult.SipID;
        onCall.innerHTML = "Yes";
        var currentlocalChannel = "Local/" + adminSipId;
        ba.setAttribute("href", "javascript:bargeInTheCall('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        ba.innerHTML = "<img border='0' title='Barge In' src='/aavaz/images/barge/Barge-in.png'/>";
        wa.setAttribute("href", "javascript:whisperTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        wa.innerHTML = "<img border='0'  title='Whisper' src='/aavaz/images/barge/Whisper.png'/>";
        lp.setAttribute("href", "javascript:listenTheParticipant('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        lp.innerHTML = "<img border='0'  title='Listen' src='/aavaz/images/barge/Listen.png'/>";
        detach.setAttribute("href", "javascript:detachTheChannel('" + agentID + "','" + adminSipId + "','" + jsonObjResult.transferTo + "','existedSIPChannel','" + currentlocalChannel + "')");
        detach.setAttribute("class", "exitACTIVE");
        detach.innerHTML = "<img border='0'  title='Exit current call' src='/aavaz/images/barge/Exit.png'/>";
    } else if (jsonObjResult.conferenceState == "complete")
    {
        if (jsonObjResult.isIO == "inbound")
        {
            talkingTo.innerHTML = jsonObjResult.From;
        } else {
            talkingTo.innerHTML = jsonObjResult.To;
        }
    } else {
        onCall.innerHTML = "No";
        direction.innerHTML = "--";
        callStartTime.innerHTML = "--";
        talkingTo.innerHTML = "--";

        ba.removeAttribute("href");
        ba.innerHTML = "";
        wa.removeAttribute("href");
        wa.innerHTML = "";
        lp.removeAttribute("href");
        lp.innerHTML = "";
        detach.removeAttribute("href");
        detach.setAttribute("class", "exitINACTIVE");
        detach.innerHTML = "";
    }
}



function leaveConferenceUpdateLegB(jsonObjResult)
{
    var leaveConferenceAgents = jsonObjResult.conferenceLeft.split("%%");
    var conferenceTo = jsonObjResult.conferenceTo;
    var agent = "";
    var flag = false;
    for (agent in leaveConferenceAgents)
    {
        if (leaveConferenceAgents[agent] === conferenceTo)
        {
            document.getElementById("callAcceptDiv").style.display = "none";
            isBoxConfernceActive = 0;
            flag = true;
        }
    }

    return flag;
}


function leaveConferenceUpdateLegA(jsonObjResult)
{
    var leaveConferenceAgents = jsonObjResult.conferenceLeft.split("%%");
    var sipID = jsonObjResult.SipID;
    var agent = "";
    var flag = true;
    for (agent in leaveConferenceAgents)
    {
        if (leaveConferenceAgents[agent] === sipID)
        {
            document.getElementById("callAcceptDiv").style.display = "none";
            isBoxConfernceActive = 0;
            flag = false;
        }
    }
    return  flag;
}

function startPreviewTimer(boxURL,boxName,boxPassword, sipID, userID)
{
    $('a').unbind("click.myDisable");
    isDispositionEnabled = 1;
    callNowConnected = 0;
    var wrapUpTimeExpire = "";
    if (wrapUpTimeExpire = document.getElementById("wrapUpTimeExpire") != null)
    {
        wrapUpTimeExpire = document.getElementById("wrapUpTimeExpire").value;
    }
    totalSeconds = 0;
    isCallConnected = 0;
    if (isCompletedFillingWrapup)
    {
        var callerID, campaignID, maxCallPerDay;
        stopPrieviewTimer();
        stopWrapUpTimer();
        stopDialingTimer();
        stopTalkingTimer();
        if (wrapUpTimeExpire == "Next Contact")
        {
            callerID = document.getElementById("callerID").value;
            campaignID = document.getElementById("campaignID").value;
            maxCallPerDay = document.getElementById("maxRedialPerDay").value;
            readyForCallForAPI(callerID, campaignID, maxCallPerDay)

        }
        if (wrapUpTimeExpire == "Not Ready")
        {
            notReady();
            if (document.getElementById("readyForCallDiv") != null)
            {
                document.getElementById("readyForCallDiv").innerHTML = "<span class=\"greenButtons\"id='hook' onclick=\"dailerOffHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">READY FOR CALL</span>";
                document.getElementById("readyForCallDiv").innerHTML = "<span class=\"redButtons\" id='hook' onclick=\"dailerAutoPreOnHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">NOT READY</span>";
            }
        }
        if (wrapUpTimeExpire == "Wait")
        {
            callerID = document.getElementById("callerID").value;
            campaignID = document.getElementById("campaignID").value;
            maxCallPerDay = document.getElementById("maxRedialPerDay").value;
            readyForCallForAPI(callerID, campaignID, maxCallPerDay)
        }
    }
    else
    {
        if (wrapUpTimeExpire == "Next Contact")
        {
            document.getElementById("prevDiv").style.display = "none";
            document.getElementById("wrapupDiv").style.display = "";
            document.getElementById("wrapupOnExpire").style.display = "";
            stopPrieviewTimer();
            stopDialingTimer();
            stopTalkingTimer();
            document.getElementById("prevTimer").innerHTML = "";
            wrapup_timer_is_on = 1;
            if(isWrapupTime != 1) {
                showWrapupTimer();
            }
            isWrapupTime = 1;

        }
        if (wrapUpTimeExpire == "Not Ready")
        {
            document.getElementById("prevDiv").style.display = "none";
            document.getElementById("wrapupDiv").style.display = "";
            preview_timer_is_on = 0;
            stopPrieviewTimer();
            document.getElementById("prevTimer").innerHTML = "";
            wrapup_timer_is_on = 1;
            if(isWrapupTime != 1) {
                showWrapupTimer();
            }
            isWrapupTime = 1;
            var callStatus = document.getElementById("callSt");
            if (document.getElementById("readyForCallDiv") != null)
            {
                document.getElementById("readyForCallDiv").innerHTML = "<span class=\"greenButtons\"id='hook' onclick=\"dailerOffHook('" + boxURL + "','" + boxName + "','" + boxPassword + "','" + sipID + "','" + userID + "','" + campaignID + "','" + maxCallPerDay + "')\">READY FOR CALL</span>"
            }

        }
        if (wrapUpTimeExpire == "Wait")
        {
            document.getElementById("prevDiv").style.display = "none";
            document.getElementById("wrapupDiv").style.display = "";
            preview_timer_is_on = 0;
            stopPrieviewTimer();
            document.getElementById("prevTimer").innerHTML = "";
            wrapup_timer_is_on = 1;
            if(isWrapupTime != 1) {
                showWrapupTimer();
            }
            isWrapupTime = 1;
            var callStatus = document.getElementById("callSt");
        }
    }
}
