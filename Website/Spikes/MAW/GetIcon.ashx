<%@ WebHandler Language="C#" Class="GetIcon" %>

using System;
using System.IO;
using System.Web;

using ICSharpCode.SharpZipLib.Zip;

public class GetIcon : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "image/png";

        ZipFile zf = new ZipFile(context.Server.MapPath("~/Spikes/MAW/Icons.zip"));

        ZipEntry ze = zf.GetEntry(context.Request["path"]);

        if (ze == null) throw new FileNotFoundException();
        
        using (Stream fileStream = zf.GetInputStream(ze))
        {
            StreamWriter sw = new StreamWriter(context.Response.OutputStream);

            byte[] _buffer = new byte[fileStream.Length];
            fileStream.Read(_buffer, 0, (int)fileStream.Length);

            context.Response.OutputStream.Write(_buffer, 0, (int)fileStream.Length);
        }
        
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}