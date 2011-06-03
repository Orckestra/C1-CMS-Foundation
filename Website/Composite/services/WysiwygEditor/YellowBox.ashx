<%@ WebHandler Language="C#" Class="YellowBox" %>

using System;
using System.IO;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using Composite.C1Console.Drawing;
using Composite.Core.WebClient;
 
public class YellowBox : IHttpHandler
{
    private const int _minCharsPerDescriptionLine = 50;
    
    
    public void ProcessRequest(HttpContext context)
    {
        try
        {
            string title = context.Request["title"];
            if (string.IsNullOrEmpty(title) == true) throw new ArgumentException("Missing query string argument 'title'");

            string boxtype = context.Request["type"];
            if (string.IsNullOrEmpty(boxtype) == true) throw new ArgumentException("Missing query string argument 'boxtype'");
            if (boxtype != "html" && boxtype != "function") throw new ArgumentException("Query string argument 'boxtype' expected to be 'html' or 'function'");            
            
            List<string> lines = new List<string>();
            if (string.IsNullOrEmpty(context.Request["description"]) == false)
            {
                foreach (string naturalLine in context.Request["description"].Split('\n'))
                {
                    if (naturalLine.Length == 0) lines.Add("");
                    
                    string rest = naturalLine.Trim();

                    while (rest.Length > _minCharsPerDescriptionLine && rest.IndexOf(' ') > -1)
                    {
                        int firstSpaceIndex = rest.LastIndexOf(' ', _minCharsPerDescriptionLine);

                        if (firstSpaceIndex == -1) firstSpaceIndex = rest.IndexOf(' ');

                        if (firstSpaceIndex > -1)
                        {
                            lines.Add(rest.Substring(0, firstSpaceIndex));
                            rest = rest.Substring(firstSpaceIndex + 1).Trim();
                        }
                    }

                    if (rest.Length > 0)
                    {
                        lines.Add(rest);
                    }
                }
            }
                
            string filePath = context.Server.MapPath(UrlUtils.ResolveAdminUrl(string.Format("images/{0}box.png",boxtype)));
            
            

            Bitmap bitmap = (Bitmap)Bitmap.FromFile(filePath);

            ImageTemplatedBoxCreator imageCreator = new ImageTemplatedBoxCreator(bitmap, new Point(55, 40), new Point(176, 78));

            imageCreator.MinHeight = 50;

            int textLeftPadding = (boxtype == "function" ? 30 : 36);

            imageCreator.SetTitle(title, new Point(textLeftPadding, 9), new Point(70, 15), Color.Black, "Tahoma", 8.0f, FontStyle.Bold);
            imageCreator.SetTextLines(lines, new Point(textLeftPadding, 0), new Point(100, 80), Color.Black, "Tahoma", 8.0f, FontStyle.Regular);

            context.Response.ContentType = "image/png";

            Bitmap boxBitmap = imageCreator.CreateBitmap();
            MemoryStream ms = new MemoryStream();
            boxBitmap.Save(ms, ImageFormat.Png);

            ms.WriteTo(context.Response.OutputStream);
        }
        catch (Exception ex)
        {
            Composite.Core.Logging.LoggingService.LogError(this.GetType().ToString(), ex.ToString());
            throw;
        }
    }
    
    
    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}