<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="false" Inherits="Composite_Management_Login" CodeFile="Login.aspx.cs" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<head runat="server">
    <title>Composite.Management</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <% Response.WriteFile("favicon.inc"); %>
    <control:styleloader runat="server"/>
    <style type="text/css">
        
        form {
            height: auto;
        }

         input, input:focus, input:active {
             border: 0;
             background: #fff;
             outline: 0;
         }

        svg {
            stroke: currentColor;
            fill: currentColor;
        }

        .field {
            border-bottom: solid 1px #ddd;
            margin-bottom: 20px;
            height: 40px;
            padding: 5px 0;
        }

        .field .icon {
            float: left;
        }

        .field .value {
            height: 40px;
            margin-left: 20px;
        }

        .field input {
            border: 0;
            font-size: 16px;
            width: 100%;
            padding: 4px 10px 5px 15px;
        }
    </style>
</head>
<body>
    <div class="splash-cover">
        <div class="splash-bg"></div>
        <div id="splash" class="splash">
            <div class="splash-inner">
                <control:brandingSnippet runat="server" SnippetName="logo" />
                <div id="splashcontent">
                    <form id="form_login" method="post">
                        <!-- action="Login.aspx"  -->
                        <div class="text-error">
                            <p>The entered url is protected, please enter C1 Console credentials</p>
                            <div id="divLoginFailed" runat="server" visible="false" class="text-error hide">
                                Username or password is incorrect.
                            </div>
                        </div>
                        <div class="fields">
                            <div class="field">
                                <div class="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="text-primary" width="20px" height="26px" viewBox="0 0 20 20">
                                        <g id="user" viewBox="0 0 20 20">
                                            <path d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z" stroke="none" />
                                            <path d="M17.5 20h-16c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981s3.942 0.33 5.406 0.981c1.199 0.533 2.164 1.279 2.869 2.219 1.211 1.615 1.225 3.232 1.225 3.3 0 0.827-0.673 1.5-1.5 1.5zM9.5 13c-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h16c0.276 0 0.5-0.224 0.5-0.5-0-0.012-0.023-1.393-1.059-2.744-1.382-1.803-3.955-2.756-7.441-2.756z" stroke="none" />
                                        </g></svg>

                                </div>
                                <div class="value">
                                    <input runat="server" tabindex="1" placeholder="Username" type="text" id="txtUsername" onkeydown="if (event.keyCode == 13) document.getElementById('aLogin').click()" />
                                </div>
                            </div>
                            <div class="field">
                                <div class="icon text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="text-primary" viewBox="0 0 14 16" width="20px" height="26px">
                                        <g id="users-changeownpassword" viewBox="0 0 14 16" stroke-width="1" fill="none">
                                            <path d="M7,8.5 C7,8.776 6.776,9 6.5,9 C6.224,9 6,8.776 6,8.5 C6,8.224 6.224,8 6.5,8 C6.776,8 7,8.224 7,8.5 L7,8.5 Z" id="Stroke-69" />
                                            <path d="M6.48358154,9.48071289 L6.48358154,11.5175781" id="Stroke-71" stroke-linecap="round" />
                                            <path d="M12.5124512,5.50524903 L0.567382832,5.50524903 L0.567382832,14.4874271 L12.5124512,14.4874271 L12.5124512,5.50524903 Z" id="Stroke-73" />
                                            <path d="M6.5,0 C8.43327273,0 10.5031738,1.64133341 10.5031738,3.66666675 L10.5031738,5.50317383 L2.50640869,5.50317383 L2.50640869,3.66666675 C2.50640869,1.64133341 4.56672727,0 6.5,0 Z" id="Stroke-75" />
                                        </g>
                                    </svg>
                                </div>
                                <div class="value">
                                    <input runat="server" tabindex="2" type="password" placeholder="Password" id="txtPassword" onkeydown="if (event.keyCode == 13) document.getElementById('aLogin').click()" autocomplete="off" />
                                </div>
                            </div>
                            <div class="LoginButton">
                                <a href="#" id="aLogin" tabindex="3" class="clickbutton" onclick="document.forms['form_login'].submit();">Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        document.getElementById('txtUsername').focus();
    </script>
</body>
</html>
