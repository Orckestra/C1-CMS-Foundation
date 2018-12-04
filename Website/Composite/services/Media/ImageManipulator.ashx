<%@ WebHandler Language="C#" Class="ImageManipulator" %>

using System;
using System.Drawing.Drawing2D;
using System.IO;
using System.Web;
using System.Drawing.Imaging;
using System.Drawing;
using Composite.C1Console.Actions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Core.IO;
using Composite.C1Console.Workflow;
using Composite.Core.WebClient;
using Composite.C1Console.Security;
using Composite.C1Console.Events;
using Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider;


public class ImageManipulator : IHttpHandler
{

    private string[] GetArguments(string action)
    {
        int startIndex = action.IndexOf('(');
        int stopIndex = action.IndexOf(')');

        string argumentString = action.Substring(startIndex + 1, stopIndex - startIndex - 1);

        return argumentString.Split(',');
    }


    private static int GetInt(string s)
    {
        return (int) Math.Round(float.Parse(s));
    }
    
    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetExpires(DateTime.Now.AddYears(-10));
        
        string actionString = context.Request["actions"];
        string save = context.Request["Save"];
        string viewId = context.Request["viewId"];
        string consoleId = context.Request["consoleId"];

        IMediaFile mediaFile = MediaUrlHelper.GetFileFromQueryString(context.Request.QueryString);

        /*if (mediaFile == null)
        {
            LoggingService.LogWarning("ImageManipulator", "Failed to find media by path '{0}'".FormatWith(src));
            return;
        }*/
        
        Bitmap image;
        
        // TODO: Caching here?
        using (Stream readStream = mediaFile.GetReadStream())
        {
            // the double new Bitmap(new Bitmap(..)) fixes GIF prb; 
            // "a graphics object cannot be created from an image that has an indexed pixel format"
            using (var innerBitmap = new Bitmap(readStream))
            using (Bitmap lockedSource = new Bitmap(innerBitmap))
            using (Graphics g = Graphics.FromImage(lockedSource)) {
                image = new Bitmap(lockedSource);
                g.DrawImage(image, new Point(0, 0));
            }
        }
        
     
        string[] actions = new string[0];
        if (actionString != null)
        {
            actions = actionString.Split(';');
        }
        else if (context.Request["action"] != null)
        {
            actions = new[] { context.Request["action"] }; 
        }
        foreach (string action in actions)
        {
            if (action == string.Empty)
            {
                continue;
            }

            if (action == "fit")
            {
                string maxWidthStr = context.Request["maxWidht"] ?? context.Request["maxwidth"] ?? context.Request["mw"] ?? "0";
                string maxHeightStr = context.Request["maxHeight"] ?? context.Request["maxheight"] ?? context.Request["mh"] ?? "0";
                
                int maxWidth, maxHeight;
                
                if(!int.TryParse(maxWidthStr, out maxWidth))
                {
                    maxWidth = 0;
                }
                
                if(!int.TryParse(maxHeightStr, out maxHeight))
                {
                    maxHeight = 0;
                }

                image = FitToFrame(image, maxWidth, maxHeight);
                
                continue;
            }

            string[] arguments = GetArguments(action);            
            
            switch (action[0])
            {
                case 'r': // rotate
                    int angle = GetInt(arguments[0]);
                    Rotate(image, angle);
                    break;
                case 'c': // crop
                    int leftImage = GetInt(arguments[0]);
                    int topImage = GetInt(arguments[1]);
                    int widthImage = GetInt(arguments[2]);
                    int heightImage = GetInt(arguments[3]);
                    image = Crop(image, leftImage, topImage, widthImage, heightImage);
                    break;
                case 's': // scale
                    string type = arguments[0];
                    
                    int horzontalArg = GetInt(arguments[1]);
                    int verticalArg = GetInt(arguments[2]);
                    
                    if (verticalArg < 1)
                    {
                        verticalArg = decimal.ToInt32((decimal)image.Height * ((decimal)horzontalArg / (decimal)image.Width));
                        if (verticalArg < 1) verticalArg = 1;
                    }
                    if (horzontalArg < 1)
                    {
                        horzontalArg = decimal.ToInt32((decimal)image.Width * ((decimal)verticalArg / (decimal)image.Height));
                        if (horzontalArg < 1) horzontalArg = 1;
                    }
                    if (arguments[0] == "\"px\"")
                    {
                        image = ScalePixels(image, horzontalArg, verticalArg);
                    }
                    else if (arguments[0] == "\"%\"")
                    {
                        image = ScalePercent(image, horzontalArg, verticalArg);
                    }   
                    break;
                case 'f': // flip
                    bool isFlip = bool.Parse(arguments[0]);
                    Flip(image, isFlip);
                    break;
            }
        }

        string mimeType = mediaFile.MimeType;

        WriteBitmapToResponseSteam(context, image, mimeType);
        if (save != null)
        {
            UpdateMediaFileImage(mediaFile, image);

            if ((viewId != null) && (consoleId != null))
            {
                ConsoleMessageQueueFacade.Enqueue(new SaveStatusConsoleMessageQueueItem { ViewId = viewId, Succeeded = true }, consoleId);
            }
            
            RaiseWorkflowEvents(mediaFile);            
        }
        image.Dispose();      
    }

    
    
    public bool IsReusable
    {
        get { return false; }
    }



    private Bitmap ScalePixels(Bitmap source, int width, int height)
    {
        Bitmap scaled = new Bitmap(width, height, GetAcceptablePixelFormat(source));
        using(Graphics graphics = Graphics.FromImage(scaled))
        {
            graphics.Clear(Color.Transparent);
            graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

            graphics.DrawImage(source, new Rectangle(-1, -1, width + 1, height + 1), 
                                       new Rectangle(0, 0, source.Width - 1, source.Height - 1), GraphicsUnit.Pixel);
        }            
        source.Dispose();
        
        return scaled;
    }



    private PixelFormat GetAcceptablePixelFormat(Bitmap source)
    {
        if (source.PixelFormat == PixelFormat.Format1bppIndexed ||
            source.PixelFormat == PixelFormat.Format4bppIndexed ||
            source.PixelFormat == PixelFormat.Format8bppIndexed ||
            source.PixelFormat == PixelFormat.Undefined ||
            source.PixelFormat == PixelFormat.DontCare ||
            source.PixelFormat == PixelFormat.Format16bppArgb1555 ||
            source.PixelFormat == PixelFormat.Format16bppGrayScale)
        {
            return PixelFormat.Format32bppArgb;
        }
        return source.PixelFormat;
    }
    


    private Bitmap ScalePercent(Bitmap source, int xScale, int yScale)
    {
        int height = source.Height * xScale;
        if (height != 0)
        {
            height /= 100;
        }
        int width = source.Width * yScale;
        if (width != 0)
        {
            width /= 100;
        }
        Bitmap scaled = new Bitmap(width, height, source.PixelFormat);
        Graphics graphics = Graphics.FromImage(scaled);
        graphics.Clear(Color.Transparent);
        graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
        graphics.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

        graphics.DrawImage(source, new Rectangle(-1, -1, width + 1, height + 1),
                                   new Rectangle(0, 0, source.Width - 1, source.Height - 1), GraphicsUnit.Pixel);
        source.Dispose();
        return scaled;
    }


    private void Rotate(Bitmap source, float angle)
    {
        if (angle == 90)
        {
            source.RotateFlip(RotateFlipType.Rotate90FlipNone);
        }
        else if (angle == 180)
        {
            source.RotateFlip(RotateFlipType.Rotate180FlipNone);
        }
        else if (angle == 270)
        {
            source.RotateFlip(RotateFlipType.Rotate270FlipNone);
        }
    }



    private void Flip(Bitmap source, bool isVerticalFlip)
    {
        if (isVerticalFlip)
        {
            source.RotateFlip(RotateFlipType.RotateNoneFlipX);
        }
        else
        {
            source.RotateFlip(RotateFlipType.RotateNoneFlipY);
        }
    }



    private Bitmap Crop(Bitmap source, int left, int top, int width, int height)
    {
        int leftCull = 0;
        if (left < 0)
        {
            leftCull = Math.Abs(left);
            width = width - leftCull;
            left = 0;
        }
        if(left + width > source.Width)
        {
            int rightCull = left + width - source.Width;
            width = width - rightCull;
        }
        
        int topCull = 0;
        if (top < 0)
        {
            topCull = Math.Abs(top);
            height = height - topCull;
            top = 0;    
        }
        if (top + height > source.Height)
        {
            int bottomCull = top + height - source.Height;
            height = height - bottomCull;            
        }
                
        
        Bitmap croppedImage = new Bitmap(width, height, source.PixelFormat);
        using(Graphics graphics = Graphics.FromImage(croppedImage))
        {
            graphics.Clear(Color.Transparent);
            graphics.DrawImage(source, new Rectangle(0, 0, croppedImage.Width, croppedImage.Height), new Rectangle(left, top, width, height), GraphicsUnit.Pixel);
        }
        source.Dispose();
        
        return croppedImage;
    }
   


    private void WriteBitmapToResponseSteam(HttpContext context, Bitmap image, string mimeType)
    {
        context.Response.ContentType = mimeType;
        using (MemoryStream memStream = new MemoryStream())
        {
            image.Save(memStream, GetImageFormat(mimeType));
            memStream.WriteTo(context.Response.OutputStream);
        }
    }



    private void UpdateMediaFileImage(IMediaFile mediaFile, System.Drawing.Image image)
    {
        using (Stream writeStream = mediaFile.GetNewWriteStream())
        {
            // Use a temporary memory stream when the writeStream doesn't support returning the stream length which is called when using Image.Save()
            using (var ms = new MemoryStream())
            {
                image.Save(ms, GetImageFormat(mediaFile.MimeType));
                var buffer = ms.GetBuffer();
                writeStream.Write(buffer, 0, buffer.Length);
            }
        }
        DataFacade.Update(mediaFile);
    }

    private Bitmap FitToFrame(Bitmap image, int maxWidth, int maxHeight)
    {
        bool heightMuch = maxHeight == 0 || image.Height <= maxHeight;
        bool widthMuch = maxWidth == 0 || image.Width <= maxWidth;
        
        if(heightMuch && widthMuch) return image;
        
        bool stretchByHeight = !heightMuch;
        if(!heightMuch && !widthMuch) {
            float heightStrechRatio = maxHeight / (float)image.Height;
            float widthStrechRatio = maxWidth  / (float)image.Width;
            stretchByHeight = heightStrechRatio < widthStrechRatio;
        }

        int resultHeight, resultWidth;
        
        if (stretchByHeight)
        {
            resultHeight = maxHeight;
            resultWidth = (int)Math.Round(image.Width * (float)maxHeight / (float)image.Height);
            // It's possible that rounded width will be one pixel bigger than [maxWidth]            
            if (maxWidth != 0 && resultWidth > maxWidth)
            {
                resultWidth = maxWidth;
            }
        }
        else
        {
            resultWidth = maxWidth;
            resultHeight = (int)Math.Round(image.Height * (float)maxWidth / (float)image.Width);
            // It's possible that rounded value width will be one pixel bigger than [maxHeight]
            if (maxHeight != 0 && resultHeight > maxHeight)
            {
                resultHeight = maxHeight;
            }
        }

		return Composite.Core.WebClient.Media.ImageResizer.ResizeImage(image, resultWidth, resultHeight, false);
    }
    

    private ImageFormat GetImageFormat(string mimeType)
    {
        ImageFormat format;
        mimeType = MimeTypeInfo.GetCanonical(mimeType);
        if(mimeType == MimeTypeInfo.Jpeg)
        {
            format = ImageFormat.Jpeg;
        }
        else if(mimeType == MimeTypeInfo.Bmp)
        {
            format = ImageFormat.Bmp;
        }
        else if(mimeType == MimeTypeInfo.Gif)
        {
            format = ImageFormat.Gif;
        }
        else if(mimeType == MimeTypeInfo.Png)
        {
            format = ImageFormat.Png;
        }
        else if(mimeType == MimeTypeInfo.Tiff)
        {
            format = ImageFormat.Tiff;
        }
        else
        {
            format = ImageFormat.Png;
        }

        return format;
    }

    private void RaiseWorkflowEvents(IMediaFile mediaFile)
    {
        FlowControllerServicesContainer services = new FlowControllerServicesContainer();
        services.AddService(new ManagementConsoleMessageServiceMock());

        EntityToken entityToken = DataEntityTokenExtensions.GetDataEntityToken(mediaFile);
        ActionToken actionToken = new WorkflowActionToken(typeof(EditMediaFileContentWorkflow));

        ActionExecutorFacade.Execute(entityToken, actionToken, services);
    }


    #region Nested classes

    public sealed class ManagementConsoleMessageServiceMock : IManagementConsoleMessageService
    {
        public void RefreshTreeSection(EntityToken parentEntityToken)
        {
        }

        public void ShowMessage(DialogType dialogType, string title, string message)
        {
        }

        public void ShowGlobalMessage(DialogType dialogType, string title, string message)
        {
        }

        public void ShowLogEntry(Type sender, Exception exception)
        {
        }

        public void ShowLogEntry(Type sender, Composite.Core.Logging.LogLevel logLevel, string message)
        {
        }

        public bool CloseCurrentViewRequested
        {
            get; set;
        }

        public void CloseCurrentView()
        {
        }

        public string CurrentConsoleId
        {
            get { return string.Empty; }
        }


        public void RebootConsole()
        {
        }

        public void LockSystem()
        {
        }

        public void BroadcastMessage(string name, string value)
        {
        }

        public void CollapseAndRefresh()
        {
        }

        public void SaveStatus(bool succeeded)
        {
        }

        public bool HasView
        {
            get { return false; }
        }

        public void BindEntityTokenToView(string entityToken)
        {
        }

        public void ExpandTreeNode(EntityToken entityToken)
        {
        }


        public void SelectElement(string entityToken)
        {
        }
    }

    #endregion
}