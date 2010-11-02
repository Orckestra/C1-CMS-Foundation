<%@ WebHandler Language="C#" Class="YellowBox" %>

using System;
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
            if (string.IsNullOrEmpty(title) == true) throw new ArgumentException("Missing query atring argument 'title'");

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
                
            string filePath = context.Server.MapPath(UrlUtils.ResolveAdminUrl("images/functionbox.png"));

            Bitmap bitmap = (Bitmap)Bitmap.FromFile(filePath);

            ImageTemplatedBoxCreator imageCreator = new ImageTemplatedBoxCreator(bitmap, new Point(55, 40), new Point(176, 78));

            imageCreator.MinHeight = 50;
           
            imageCreator.SetTitle(title, new Point(30, 9), new Point(70, 15), Color.Black, "Tahoma", 8.0f, FontStyle.Bold);
            imageCreator.SetTextLines(lines, new Point(30, 0), new Point(100, 80), Color.Black, "Tahoma", 8.0f, FontStyle.Regular);

            context.Response.ContentType = "image/png";

            Bitmap boxBitmap = imageCreator.CreateBitmap();
            Composite.Core.IO.MemoryStream ms = new Composite.Core.IO.MemoryStream();
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