<%@ WebHandler Language="C#" Class="YellowBox" %>
 
using System;
using System.Web;
using System.Xml.Linq;
using System.Drawing;
using System.Xml;
using System.IO;
using System.Text;
using Composite.Functions;
using Composite.C1Console.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;
using Composite.Core.WebClient;
 
public class YellowBox : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        try
        {
            string label = context.Request["name"] ?? "[ error ]";
            
            string filePath = context.Server.MapPath(UrlUtils.ResolveAdminUrl("images/fieldbox.png"));

            Bitmap bitmap = (Bitmap)Bitmap.FromFile(filePath);

            ImageTemplatedBoxCreator imageCreator = new ImageTemplatedBoxCreator(bitmap, new Point(30, 13), new Point(43, 0));

            imageCreator.MinHeight = 26;
            imageCreator.SetTitle(label, new Size(26, 6), new Size(38, 1), Color.Black, "Tahoma", 8.0f, FontStyle.Bold);

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



    private string MakeTitleFromName(string name)
    {
        string[] nameParts = name.Split('.');
        string titleBase = nameParts[nameParts.Length - 1];

        StringBuilder sb = new StringBuilder( titleBase.Substring(0,1).ToUpper());

        bool lastWasUpper = true;
        
        for (int i = 1; i < titleBase.Length; i++)
        {
            string letter = titleBase.Substring(i, 1);
            if (letter != letter.ToLowerInvariant())
            {
                bool nextLetterIsLower = (i < titleBase.Length - 1) && (titleBase.Substring(i + 1, 1).ToLowerInvariant() == titleBase.Substring(i + 1, 1));

                if (lastWasUpper == false || nextLetterIsLower == true)
                {
                    sb.Append(" ");
                }
                lastWasUpper = true;
            }
            else
            {
                lastWasUpper = false;
            }
            sb.Append(letter);
        }

        return sb.ToString();
    }
}