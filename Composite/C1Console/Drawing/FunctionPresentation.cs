using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient;

namespace Composite.C1Console.Drawing
{
    internal static class FunctionPresentation
    {
        public static void GenerateFunctionBoxWithPreview(
            HttpContext context, 
            string functionTitle, 
            Bitmap previewImage,
            bool showEditButton, 
            Stream outputStream)
        {
            using (var header = new FunctionHeader(functionTitle, false, showEditButton))
            {
                var headerSize = header.HeaderSize;

                Size totalSize = new Size(Math.Max(header.HeaderSize.Width, previewImage.Width), headerSize.Height + previewImage.Height);

                using (var bitmap = new Bitmap(totalSize.Width, totalSize.Height))
                using (var graphics = Graphics.FromImage(bitmap))
                {
                    header.DrawHeader(bitmap, graphics, totalSize.Width);

                    Point previewImageOffset = new Point(
                        (Math.Max(totalSize.Width - 10, previewImage.Width) - previewImage.Width) / 2, headerSize.Height);

                    // Preview image
                    graphics.DrawImage(previewImage, previewImageOffset);

                    // Image outline
                    using (var brush = new HatchBrush(HatchStyle.LargeCheckerBoard, Color.FromArgb(190, 190, 190), Color.Transparent))
                    using (var pen = new Pen(brush))
                    {
                        graphics.DrawRectangle(pen, new Rectangle(previewImageOffset,
                            new Size(previewImage.Width - 1, previewImage.Height - 1)));
                    }

                    context.Response.ContentType = "image/png";
                    context.Response.Cache.SetExpires(DateTime.Now.AddDays(10));

                    string tempFileName = Path.GetTempFileName();

                    try
                    {
                        // Saving to a temporary file, as Image.Save() sometimes on a not seekable stream throws
                        // an "A generic error occurred in GDI+." exception
                        bitmap.Save(tempFileName, ImageFormat.Png);

                        context.Response.WriteFile(tempFileName);
                        context.Response.Flush();
                    }
                    finally
                    {
                        C1File.Delete(tempFileName);
                    }
                }
            }
        }

        public static void GenerateFunctionBoxWithText(
            HttpContext context, 
            string functionTitle, 
            bool isWarning, 
            bool showEditButton,
            ICollection<string> lines, 
            Stream outputStream)
        {
            using (var header = new FunctionHeader(functionTitle, isWarning, showEditButton))
            {
                var headerSize = header.HeaderSize;

                const int minTextAreaWidth = 350;
                const int leftPadding = 14, rightPadding = 10, topPadding = 12, bottomPadding = 10;

                var linesTrimmed = lines.Take(20).ToList();

                using (var textFont = new Font("Helvetica", 9.5f, FontStyle.Regular))
                {
                    int lineHeight = MeasureText("Text", textFont).Height;

                    Size totalSize = new Size(Math.Max(headerSize.Width, minTextAreaWidth),
                        headerSize.Height + topPadding + lineHeight * linesTrimmed.Count + bottomPadding);

                    using (var bitmap = new Bitmap(totalSize.Width, totalSize.Height))
                    using (var graphics = Graphics.FromImage(bitmap))
                    {
                        graphics.Clear(Color.White);

                        header.DrawHeader(bitmap, graphics, totalSize.Width);

                        using(var solidBrush = new SolidBrush(Color.Gray))
                        for (int i = 0; i < linesTrimmed.Count; i++)
                        {
                            var line = linesTrimmed[i];
                            int lineY = headerSize.Height + topPadding + i * lineHeight;

                            int maxLineWidth = totalSize.Width - leftPadding - rightPadding;

                            string croppedLine = CropLineToFitMaxWidth(line, textFont, maxLineWidth);

                            graphics.DrawString(croppedLine, textFont, solidBrush, leftPadding, lineY);
                        }

                        // Text outline
                        using (var pen = new Pen(isWarning ? Color.Red : Color.Gray))
                        {
                            graphics.DrawRectangle(pen, new Rectangle(0, headerSize.Height,
                                totalSize.Width - 1, totalSize.Height - headerSize.Height - 1));
                        }

                        context.Response.ContentType = "image/png";
                        context.Response.Cache.SetExpires(DateTime.Now.AddDays(10));

                        string tempFileName = Path.GetTempFileName();

                        try
                        {
                            // Saving to a temporary file, as Image.Save() sometimes on a not seekable stream throws
                            // an "A generic error occurred in GDI+." exception
                            bitmap.Save(tempFileName, ImageFormat.Png);

                            context.Response.WriteFile(tempFileName);
                            context.Response.Flush();
                        }
                        finally
                        {
                            C1File.Delete(tempFileName);
                        }
                    }

                }
            }
        }

        public static Size MeasureText(string text, Font font)
        {
            using (var b = new Bitmap(1, 1))
            using (var g = Graphics.FromImage(b))
            {
                SizeF sizeF = g.MeasureString(text, font);
                return new Size((int)Math.Ceiling(sizeF.Width), (int)Math.Ceiling(sizeF.Height));
            }
        }

        private static string CropLineToFitMaxWidth(string line, Font textFont, int maxLineWidth)
        {
            if (line.Length <= 10 || MeasureText(line, textFont).Width <= maxLineWidth) return line;

            if (line.Length > 250)
            {
                line = line.Substring(250);
            }

            return CropLineToFitMaxWidth(line.Substring(0, line.Length - 5) + "...", textFont, maxLineWidth);
        }

        private static void MakeBlackTransparent(Bitmap bitmap, Rectangle rect)
        {
            for (int x = 0; x < rect.Width; x++)
            {
                for (int y = 0; y < rect.Height; y++)
                {
                    int totalX = rect.X + x;
                    int totalY = rect.Y + y;

                    var color = bitmap.GetPixel(totalX, totalY);
                    if (color.R != 255 || color.G != 255 || color.B != 255)
                    {
                        int alpha = (color.R + color.G + color.B) / 3;

                        bitmap.SetPixel(totalX, totalY, Color.FromArgb(alpha, 255, 255, 255));
                    }
                }
            }
        }

        private class FunctionHeader: IDisposable
        {
            const int HeaderHeight = 60;
            private const int TitleAndEditSpacing = 25;
            private readonly int _headerWidth;
            private readonly Font _titleFont;
            private readonly Font _buttonFont;
            private readonly string _title;
            readonly string _editLabel = LocalizationFiles.Composite_Web_VisualEditor.Function_Edit;
            private readonly Point _titlePosition;

            private Size _titleSize;
            private Size _editLabelSize;
            private readonly Image _functionIcon;

            private readonly bool _isWarning;
            private readonly bool _showEditButton;

            private static readonly string FunctionIconPath = GetIconPath("images/function.png");
            private static readonly string EditFunctionIconPath = GetIconPath("images/editfunction.png");
            private static readonly string WarningIconPath = GetIconPath("images/warning.png");

            private static string GetIconPath(string relativePath)
            {
                return HostingEnvironment.MapPath(UrlUtils.ResolveAdminUrl(relativePath));
            }

            private Image SafeImageFromFile(string path) 
            {
                using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
                    {
                        var img = Bitmap.FromStream(fs);
                        return img;
                    }
            }

            public FunctionHeader(string title, bool isWarning, bool showEditButton)
            {
                _title = title;
                _showEditButton = showEditButton;

                _titleFont = new Font("Helvetica", 12.0f, FontStyle.Regular);
                _buttonFont = new Font("Helvetica", 9.0f, FontStyle.Bold);

                _titleSize = MeasureText(_title, _titleFont);

                _isWarning = isWarning;
                _functionIcon = SafeImageFromFile(_isWarning ? WarningIconPath : FunctionIconPath);

                int leftPadding = 15;
                _titlePosition = new Point(leftPadding + _functionIcon.Width, (HeaderHeight - _titleSize.Height) / 2);

                int editButtonSizeWithPaddings = 0;
                if (showEditButton)
                {
                    _editLabelSize = MeasureText(_editLabel, _buttonFont);
                    editButtonSizeWithPaddings = _editLabelSize.Width + 45;
                }

                _headerWidth = _titlePosition.X + _titleSize.Width + editButtonSizeWithPaddings + TitleAndEditSpacing;

                MinimumWidth = _titlePosition.X + editButtonSizeWithPaddings;
            }

            public int MinimumWidth { get; private set; }

            public Size HeaderSize { get { return new Size(_headerWidth, HeaderHeight); } }

            public void DrawHeader(Bitmap bitmap, Graphics graphics, int bitmapWidth)
            {
                using (var whiteBrush = new SolidBrush(Color.White))
                {
                    graphics.FillRectangle(whiteBrush, 0, 0, bitmapWidth, HeaderHeight);
                }

                // Function icon
                var functionIconRec = new Rectangle(10, (HeaderHeight - _functionIcon.Height) / 2,
                                    _functionIcon.Width, _functionIcon.Height);
                graphics.DrawImage(_functionIcon, functionIconRec);


                // Title
                using (var solidBrush = new SolidBrush(_isWarning ? Color.Red : Color.Black))
                {
                    graphics.DrawString(_title, _titleFont, solidBrush, _titlePosition);
                }

                if (!_isWarning)
                {
                    // Making the icon and the label transparent
                    MakeBlackTransparent(bitmap, functionIconRec);

                    var textSize = MeasureText(_title, _titleFont);
                    var textRec = new Rectangle(_titlePosition.X, _titlePosition.Y, textSize.Width, textSize.Height);

                    MakeBlackTransparent(bitmap, textRec);
                }

                // "Edit" label 
                if (_showEditButton)
                {
                    DrawTransparentEditButton(bitmap, graphics, bitmapWidth);
                }
            }

            private void DrawTransparentEditButton(Bitmap bitmap, Graphics graphics, int bitmapWidth)
            {
                Point editLabelPosition = new Point(bitmapWidth - TitleAndEditSpacing - _editLabelSize.Width, (HeaderHeight - _editLabelSize.Height) / 2);

                using (var whiteBrush = new SolidBrush(Color.White))
                {
                    graphics.FillRectangle(whiteBrush, editLabelPosition.X - 50, 0, bitmapWidth - editLabelPosition.X + 50, HeaderHeight);
                }

                using (var solidBrush = new SolidBrush(Color.Black))
                {
                    graphics.DrawString(_editLabel, _buttonFont, solidBrush, editLabelPosition);
                }

                int editFunctionIconY;
                Size editFunctionIconSize;

                const int labelRightPadding = 5;

                // Edit function "pen" icon
                using (var icon = (Bitmap)SafeImageFromFile(EditFunctionIconPath))
                {
                    editFunctionIconSize = icon.Size;
                    editFunctionIconY = (HeaderHeight - icon.Height) / 2;

                    graphics.DrawImage(icon, editLabelPosition.X - icon.Width, editFunctionIconY);

                    // Mirroring 5 px of the "pen" icon
                    for (int x = 0; x < 5; x++)
                    {
                        for (int y = 0; y < icon.Height; y++)
                        {
                            bitmap.SetPixel(editLabelPosition.X + _editLabelSize.Width + labelRightPadding + x, editFunctionIconY + y,
                                icon.GetPixel(4 - x, y));
                        }
                    }

                    var borderColor = icon.GetPixel(10, 0);

                    using (var pen = new Pen(borderColor))
                    {
                        // Top line for edit function link
                        graphics.DrawLine(pen, editLabelPosition.X, editFunctionIconY,
                                               editLabelPosition.X + _editLabelSize.Width + labelRightPadding, editFunctionIconY);

                        // Bottom line for edit function link
                        int bottomLineY = editFunctionIconY + icon.Height - 1;
                        graphics.DrawLine(pen, editLabelPosition.X, bottomLineY,
                                               editLabelPosition.X + _editLabelSize.Width + labelRightPadding, bottomLineY);
                    }
                }

                // Making the "Edit" button transparent
                var editFuncRect = new Rectangle(editLabelPosition.X - editFunctionIconSize.Width, editFunctionIconY,
                    editFunctionIconSize.Width + _editLabelSize.Width + labelRightPadding + 5, editFunctionIconSize.Height);

                MakeBlackTransparent(bitmap, editFuncRect);
            }

            public void Dispose()
            {
                _titleFont.Dispose();
                _buttonFont.Dispose();
                _functionIcon.Dispose();
#if LeakCheck
                GC.SuppressFinalize(this);
#endif
            }

#if LeakCheck
            private string stack = Environment.StackTrace;
            /// <exclude />
            ~FunctionHeader()
            {
                Composite.Core.Instrumentation.DisposableResourceTracer.RegisterFinalizerExecution(stack);
            }
#endif
        }
    }
}
