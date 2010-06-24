<%@ WebService Language="C#" Class="MyWebService" %>

using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Threading;

using Composite.Logging;
using Composite.Threading;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class MyWebService  : System.Web.Services.WebService 
{    
    [WebMethod]
    public string HelloWorld() 
    {
        Thread thread = new Thread(ThreadManager.CreateThreadStart(MyThread));

        ThreadManager.StartThread(thread);

        thread.Join();
        
        return "Hello World";
    }


    private void MyThread()
    {
        LoggingService.LogInformation("MyWebService", Composite.Users.UserSettings.Username);
    }
}

