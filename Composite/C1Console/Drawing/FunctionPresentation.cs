using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Windows.Forms;
using Composite.Core.ResourceSystem;
using Composite.Core.WebClient;

namespace Composite.C1Console.Drawing
{
    internal static class FunctionPresentation
    {
        public static void GenerateFunctionBoxWithPreview(HttpContext context, string functionTitle, Bitmap previewImage, Stream outputStream)
        {
            using (var header = new FunctionHeader(functionTitle, false))
            {
                var headerSize = header.HeaderSize;

                Size totalSize = new Size(Math.Max(headerSize.Width, previewImage.Width), headerSize.Height + previewImage.Height);

                using (var bitmap = new Bitmap(totalSize.Width, totalSize.Height))
                using (var graphics = Graphics.FromImage(bitmap))
                {
                    header.DrawHeader(bitmap, graphics, totalSize.Width);

                    Point prevewImageOffset = new Point(
                        (Math.Max(totalSize.Width - 10, previewImage.Width) - previewImage.Width) / 2, headerSize.Height);

                    // Preview image
                    graphics.DrawImage(previewImage, prevewImageOffset);

                    // Image outline
                    using (var brush = new HatchBrush(HatchStyle.LargeCheckerBoard, Color.FromArgb(190, 190, 190), Color.Transparent))
                    using (var pen = new Pen(brush))
                    {
                        graphics.DrawRectangle(pen, new Rectangle(prevewImageOffset,
                            new Size(previewImage.Width - 1, previewImage.Height - 1)));
                    }

                    context.Response.ContentType = "image/png";
                    context.Response.Cache.SetExpires(DateTime.Now.AddDays(10));

                    bitmap.Save(outputStream, ImageFormat.Png);
                }
            }
        }

        public static void GenerateFunctionBoxWithText(HttpContext context, string functionTitle, bool isWarning, ICollection<string> lines, Stream outputStream)
        {
            using (var header = new FunctionHeader(functionTitle, isWarning))
            {
                var headerSize = header.HeaderSize;

                int minTextAreaWidth = 350;

                int leftPadding = 14, rightPadding = 10, topPadding = 12, bottomPadding = 10;

                var linesTrimmed = lines.Take(20).ToList();

                using (var textFont = new Font("Tahoma", 10.0f, FontStyle.Regular))
                {
                    int lineHeight = TextRenderer.MeasureText("Text", textFont).Height;

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

                        bitmap.Save(outputStream, ImageFormat.Png);
                    }

                }
            }
        }

        private static string CropLineToFitMaxWidth(string line, Font textFont, int maxLineWidth)
        {
            if (line.Length <= 10 || TextRenderer.MeasureText(line, textFont).Width <= maxLineWidth) return line;

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
            const int _headerHeight = 40;
            private readonly int _headerWidth;
            private readonly Font _font;
            private readonly string _title;
            readonly string _editLabel = LocalizationFiles.Composite_Web_SourceEditor.Function_Edit;
            private readonly Point _titlePosition;

            private Size _titleSize;
            private Size _editLabelSize;
            private readonly Image _functionIcon;

            private readonly bool _isWarning;

            private static readonly string FunctionIconPath = GetIconPath("images/function.png");
            private static readonly string EditFunctionIconPath = GetIconPath("images/editfunction.png");
            private static readonly string WarninigIconPath = GetIconPath("images/icons/harmony/composite/warning_16.png");

            private static string GetIconPath(string relativePath)
            {
                return HostingEnvironment.MapPath(UrlUtils.ResolveAdminUrl(relativePath));
            }

            public FunctionHeader(string title, bool isWarning)
            {
                _title = title;

                _font = new Font("Tahoma", 15.0f, FontStyle.Regular);

                _titleSize = TextRenderer.MeasureText(_title, _font);
                _editLabelSize = TextRenderer.MeasureText(_editLabel, _font);

                _isWarning = isWarning;
                _functionIcon = Bitmap.FromFile(_isWarning ? WarninigIconPath : FunctionIconPath);

                _titlePosition = new Point(20 + _functionIcon.Width, (_headerHeight - _titleSize.Height) / 2);
                _headerWidth = _titlePosition.X + _titleSize.Width + 45 + _editLabelSize.Width + 20;
            }

            public Size HeaderSize { get { return new Size(_headerWidth, _headerHeight); } }

            public void DrawHeader(Bitmap bitmap, Graphics graphics, int bitmapWidth)
            {
                using (var whiteBrush = new SolidBrush(Color.White))
                {
                    graphics.FillRectangle(whiteBrush, 0, 0, bitmapWidth, _headerHeight);
                }

                // Function icon
                graphics.DrawImage(_functionIcon, 10, (_headerHeight - _functionIcon.Height) / 2 + (_isWarning ? -2 : 0));

                // Title
                using (var solidBrush = new SolidBrush(_isWarning ? Color.Red : Color.Black))
                {
                    graphics.DrawString(_title, _font, solidBrush, _titlePosition);
                }

                // "Edit" label 
                Point editLabelPosition = new Point(bitmapWidth - 5 - _editLabelSize.Width,
                    (_headerHeight - _editLabelSize.Height) / 2);

                using (var solidBrush = new SolidBrush(Color.Black))
                {
                    graphics.DrawString(_editLabel, _font, solidBrush, editLabelPosition);
                }

                int editFunctionIconY;
                Size editFunctionIconSize;

                // Edit function "pen" icon
                using (var icon = (Bitmap)Image.FromFile(EditFunctionIconPath))
                {
                    editFunctionIconSize = icon.Size;
                    editFunctionIconY = (_headerHeight - icon.Height) / 2;

                    graphics.DrawImage(icon, editLabelPosition.X - icon.Width, editFunctionIconY);

                    // Mirroring 5 px of the "pen" icon
                    for (int x = 0; x < 5; x++)
                    {
                        for (int y = 0; y < icon.Height; y++)
                        {
                            bitmap.SetPixel(editLabelPosition.X + _editLabelSize.Width + x, editFunctionIconY + y,
                                icon.GetPixel(4 - x, y));
                        }
                    }

                    var borderColor = icon.GetPixel(10, 0);

                    using (var pen = new Pen(borderColor))
                    {
                        // Top line for edit function link
                        graphics.DrawLine(pen, editLabelPosition.X, editFunctionIconY, editLabelPosition.X + _editLabelSize.Width, editFunctionIconY);

                        // Bottom line for edit function link
                        int bottomLineY = editFunctionIconY + icon.Height - 1;
                        graphics.DrawLine(pen, editLabelPosition.X, bottomLineY,
                                               editLabelPosition.X + _editLabelSize.Width, bottomLineY);
                    }
                }

                if (_isWarning)
                {
                    // Making only the "Edit" button transparent
                    var editFuncRect = new Rectangle(editLabelPosition.X - editFunctionIconSize.Width, editFunctionIconY,
                        editFunctionIconSize.Width + _editLabelSize.Width + 5, editFunctionIconSize.Height);

                    MakeBlackTransparent(bitmap, editFuncRect);
                }
                else
                {
                    MakeBlackTransparent(bitmap, new Rectangle(0, 0, bitmapWidth, _headerHeight));
                }
            }

            public void Dispose()
            {
                _font.Dispose();
                _functionIcon.Dispose();
            }
        }
    }
}
