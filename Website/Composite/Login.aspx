<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="false" Inherits="Composite_Management_Login" CodeFile="Login.aspx.cs" %>
<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title>Composite.Management</title>
    
    <meta name="robots" content="noindex, nofollow" />
    <style type="text/css">
        body {
            background-color: #F0F0F0;
            
            font-family: "Segoe UI",Tahoma,sans-serif;
            font-size: 12px;
        }
        
        div#splash {
            color: #B2B2B2;
            display: block;
            height: 360px;
            left: 50%;
            margin-left: -180px;
            margin-top: -157px;
            overflow-x: hidden;
            overflow-y: hidden;
            position: absolute;
            top: 45%;
            width: 315px;
            z-index: 5;
            
            
        }
        div#splashcontent {
            height: 180px;
            margin-left: 58px;
            margin-top: 140px;
            position: relative;
            width: 200px;
            z-index: 2;
            
            position: static;
            clear: both;
            display: block;
            height: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
            position: absolute;
        }
        
        div#splashcontent div.splashtext {
            height: 95px;
        }
        
        div#backdrop {
            background-image: url("/Composite/images/box.png");
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
        /* Forms */
        div.field div.label {
            width: 60px;
            float: left;
            font-weight: bold;
            padding-top: 7px;
        }
        
        div.field div.value {
            height: 23px;
            float: right;
            padding-top: 4px;
        }
        
        div.field div.value input {
            width: 130px;
            border-style: solid;
            border-width: 1px;
            border-color: rgb(127,157,185);
            padding: 4px 7px 4px 7px;
            height: 25px;
        }
        
        div.field div.value input:focus {
            outline-style: solid;
            outline-width: 1px;
            outline-color: #B2B2B2;
        }
        
        input.error {
            border-color: rgb(204, 7, 30) !important;
        }
        
        div#divLoginFailed {
            color: rgb(204, 7, 30);
        }
        
        div.LoginButton {
            float: right;
            padding-top: 5px;
        }
        
        div.LoginButton a {
            text-transform: uppercase;
            display: inline-block;
            color: white;
            padding: 6px 10px 6px 30px;
            background-color: rgb(204, 7, 30);
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            vertical-align: central;
            height: 16px;
            background-image: url("skins/system/splash/button.png");
            background-position: 8px 7px;
            background-repeat: no-repeat;
        }
        
        div.clear {
            /* height: 0px;*/
            clear: both;
        }
        
    </style>
</head>
<body>
    <div id="splash">
        <div id="backdrop"></div>

        <div id="splashcontent">
            <form id="form_login" type="sumbit" method="post"> <!-- action="Login.aspx"  -->
                
            <div class="splashtext">
                The entered url is protected, please enter C1 Console credentials
                
                <div id="divLoginFailed" runat="server" Visible="false">
                    <br/>
                    Login failed.
                </div>
            </div>

            <div class="fields">
                <div class="field">
                    <div class="label">
                        <label for="txtUsername">Username</label>
                    </div>
                    <div class="value">
                        <input runat="server" type="text" id="txtUsername" />
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="field">
                    <div class="label">
                        <label for="txtPassword">Password</label>
                    </div>
                    <div class="value">
                        <input runat="server" type="password" id="txtPassword" />
                    </div>
                    <div class="clear"></div>
                </div>
                
                <div class="LoginButton">
                    <a href="#" onclick="document.forms['form_login'].submit();">
                        <!--img src="skins/system/splash/button.png" /-->
                        Login
                    </a>
                </div>
            </div>
            </form>
        </div>
        
        
    </div>
</body>
</html>
