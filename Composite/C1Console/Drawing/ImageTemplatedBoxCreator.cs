using System;
using System.Linq;
using System.Drawing;
using System.Collections.Generic;


namespace Composite.C1Console.Drawing
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ImageTemplatedBoxCreator
    {
        private Point _topLeftResize;
        private Point _bottomRightResize;
        private readonly Bitmap _templateBitmap;

        private TitleItem _titleItem;
        private WrappedTextItem _wrappedTextItem;
        private TextLinesItem _textLinesItem;
        private ImageItem _topRightIconItem;
        private ImageItem _image;

        private int _width;
        private int _height;
        private Bitmap _currentBitmap;


        /// <exclude />
        public ImageTemplatedBoxCreator(Bitmap templateBitmap, Point topLeftResize, Point bottomRightResize)
        {
            _topLeftResize = topLeftResize;
            _bottomRightResize = bottomRightResize;
            _templateBitmap = templateBitmap;

            this.LinePadding = 3;
            this.SeparatorChar = ' ';
            this.MaxWidth = 700;
            this.MinWidth = 200;
            this.MinHeight = 50;
        }



        #region Simple properties
        /// <exclude />
        public int MinWidth { get; set; }

        /// <exclude />
        public int MaxWidth { get; set; }

        /// <exclude />
        public int MinHeight { get; set; }

        /// <exclude />
        public int LinePadding { get; set; }


        /// <exclude />
        public char SeparatorChar { get; set; }
        #endregion


        /// <exclude />
        public void SetTitle(string title, Size topLeftPadding, Size bottomRightPadding, Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle)
        {
            _titleItem = new TitleItem(title, topLeftPadding, bottomRightPadding, fontColor, fontFamilyName, fontSize, fontStyle);
        }



        /// <exclude />
        public void SetWrappedText(string text, Point topLeftPadding, Point bottomRightPadding, Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle)
        {
            _textLinesItem = null;
            _wrappedTextItem = new WrappedTextItem(text, topLeftPadding, bottomRightPadding, fontColor, fontFamilyName, fontSize, fontStyle);
        }



        /// <exclude />
        public void SetTextLines(ICollection<string> lines, Size topLeftPadding, Size bottomRightPadding, Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle)
        {
            _wrappedTextItem = null;
            _textLinesItem = new TextLinesItem(lines, topLeftPadding, bottomRightPadding, fontColor, fontFamilyName, fontSize, fontStyle);
        }

        /// <exclude />
        public void SetIcon(Bitmap icon, Size topLeftPadding, Size bottomRightPadding)
        {
            _topRightIconItem = new ImageItem(icon, topLeftPadding, bottomRightPadding);
        }

        /// <exclude />
        public void SetPreviewImage(Bitmap previewImage, Size topLeftPadding, Size bottomRightPadding)
        {
            _image = new ImageItem(previewImage, topLeftPadding, bottomRightPadding); 
        }


        /// <exclude />
        public Bitmap CreateBitmap()
        {
            CalculateWidthAndHeight();

            _currentBitmap = new Bitmap(_templateBitmap, new Size(_width, _height));

            DrawImage(_width, _height);

            using (Graphics graphics = Graphics.FromImage(_currentBitmap))
            {
                if (_topRightIconItem != null)
                {
                    Point point = new Point(_width - _topRightIconItem.BottomRightPadding.Width - _topRightIconItem.Image.Width, 
                                            _topRightIconItem.BottomRightPadding.Height);

                    graphics.DrawImage(_topRightIconItem.Image, point);
                }


                if (_titleItem != null)
                {
                    int counter = 0;

                    using (var solidBrush = new SolidBrush(_titleItem.FontColor))
                    foreach (string line in _titleItem.Lines)
                    {
                        int x = _titleItem.TopLeftPadding.Width;
                        int y = _titleItem.TopLeftPadding.Height + counter * (this.LinePadding + _titleItem.LineHeight);

                        graphics.DrawString(line, _titleItem.Font, solidBrush, x, y);

                        counter++;
                    }


                    //graphics.DrawString(_titleItem.Title, _titleItem.Font, new SolidBrush(_titleItem.FontColor), _titleItem.TopLeftPadding.X, _titleItem.TopLeftPadding.Y);
                }

                int titleHeightWidthPadding = (_titleItem != null) ? _titleItem.HeightWidthPadding : 0;
                if (_wrappedTextItem != null)
                {
                    int counter = 0;

                    using (var solidBrush = new SolidBrush(_wrappedTextItem.FontColor))
                    foreach (string line in _wrappedTextItem.Lines)
                    {
                        int x = _wrappedTextItem.TopLeftPadding.X;
                        int y = _wrappedTextItem.TopLeftPadding.Y + counter * (this.LinePadding + _wrappedTextItem.LineHeight) + titleHeightWidthPadding;

                        graphics.DrawString(line, _wrappedTextItem.Font, solidBrush, x, y);

                        counter++;
                    }
                }
                else if (_textLinesItem != null)
                {
                    int counter = 0;
                    using (var solidBrush = new SolidBrush(_textLinesItem.FontColor))
                    foreach (string line in _textLinesItem.Lines)
                    {
                        int x = _textLinesItem.TopLeftPadding.Width;
                        int y = _textLinesItem.TopLeftPadding.Height + counter * (this.LinePadding + _textLinesItem.LineHeight) + titleHeightWidthPadding;

                        graphics.DrawString(line, _textLinesItem.Font, solidBrush, x, y);

                        counter++;
                    }
                }
            }

            return _currentBitmap;
        }



        private void CalculateWidthAndHeight()
        {
            int width = MinWidth;
            int height = MinHeight;

            using (Graphics graphics = Graphics.FromImage(_templateBitmap))
            {
                int titleHeightWithPadding = 0;

                if (_titleItem != null)
                {
                    //                    SplitLine(width - _wrappedTextItem.TopLeftPadding.X - _wrappedTextItem.BottomRightPadding.X, _wrappedTextItem.Text, _wrappedTextItem.Font, _wrappedTextItem.TopLeftPadding.Y, out textWidth, out lineHeight);

                    SizeF titleSize = graphics.MeasureString(_titleItem.Title, _titleItem.Font);

                    int titleWidth = (int)titleSize.Width + _titleItem.TopLeftPadding.Width + _titleItem.BottomRightPadding.Width;

                    if (_topRightIconItem != null)
                    {
                        titleWidth += _topRightIconItem.GetBoxSize().Width;
                    }

                    int titleHeight;

                    if (titleWidth > this.MaxWidth)
                    {
                        int lineHeight;
                        _titleItem.Lines = SplitLine(this.MaxWidth - _titleItem.PaddingSize.Width, _titleItem.Title, _titleItem.Font, _titleItem.TopLeftPadding.Height, out titleWidth, out lineHeight);
                        _titleItem.LineHeight = lineHeight;

                        width = this.MaxWidth;

                        titleHeight = _titleItem.Lines.Count * _titleItem.LineHeight +
                                     (_titleItem.Lines.Count - 1) * this.LinePadding +
                                     _titleItem.PaddingSize.Width;

                        if (titleHeight > height)
                        {
                            height = titleHeight;
                        }
                    }
                    else
                    {
                        _titleItem.Lines = new List<string> { _titleItem.Title };
                        _titleItem.LineHeight = (int)titleSize.Height;

                        titleHeight = (int)titleSize.Height + _titleItem.PaddingSize.Height;

                        width = titleWidth;
                    }

                    if (titleHeight > height)
                    {
                        height = titleHeight;
                    }

                    titleHeightWithPadding = titleHeight + this.LinePadding;
                    _titleItem.HeightWidthPadding = titleHeightWithPadding;
                }


                if (_wrappedTextItem != null)
                {
                    int textWidth, lineHeight;
                    _wrappedTextItem.Lines = SplitLine(width - _wrappedTextItem.TopLeftPadding.X - _wrappedTextItem.BottomRightPadding.X, _wrappedTextItem.Text, _wrappedTextItem.Font, _wrappedTextItem.TopLeftPadding.Y + titleHeightWithPadding, out textWidth, out lineHeight);
                    _wrappedTextItem.LineHeight = lineHeight;

                    textWidth += _wrappedTextItem.TopLeftPadding.X + _wrappedTextItem.BottomRightPadding.X;

                    if (textWidth > width)
                    {
                        width = textWidth;
                    }

                    int textHeight = _wrappedTextItem.Lines.Count * _wrappedTextItem.LineHeight +
                                     (_wrappedTextItem.Lines.Count - 1) * this.LinePadding +
                                     _wrappedTextItem.TopLeftPadding.Y + _wrappedTextItem.BottomRightPadding.Y +
                                     titleHeightWithPadding;

                    if (textHeight > height)
                    {
                        height = textHeight;
                    }
                }
                else if (_textLinesItem != null)
                {
                    foreach (string line in _textLinesItem.Lines)
                    {
                        SizeF lineSize = graphics.MeasureString(line, _textLinesItem.Font);

                        int lineWidth = (int)lineSize.Width + _textLinesItem.TopLeftPadding.Width + _textLinesItem.BottomRightPadding.Width;

                        if (lineWidth > width)
                        {
                            width = lineWidth;
                        }

                        _textLinesItem.LineHeight = (int)lineSize.Height;
                    }

                    int textHeight = _textLinesItem.Lines.Count * _textLinesItem.LineHeight +
                                     (_textLinesItem.Lines.Count - 1) * this.LinePadding +
                                     _textLinesItem.TopLeftPadding.Height + _textLinesItem.BottomRightPadding.Height;

                    if (textHeight > height)
                    {
                        height = textHeight;
                    }
                }

                if (_image != null)
                {
                    height = Math.Max(height, _image.GetBoxSize().Height);
                    width = Math.Max(width, _image.GetBoxSize().Width);
                }

                if (_topRightIconItem != null)
                {
                    int iconHeight = _topRightIconItem.GetBoxSize().Height;

                    if (iconHeight > height)
                    {
                        height = iconHeight;
                    }
                }
            }

            _width = width;
            _height = height;
        }



        private List<string> SplitLine(int currentWidth, string text, Font font, int offsetY, out int newWidth, out int lineHeight)
        {
            newWidth = currentWidth;
            lineHeight = 0;

            List<string> lines = new List<string>();

            string[] words = text.Split(this.SeparatorChar);

            using (Graphics graphics = Graphics.FromImage(_templateBitmap))
            {
                foreach (string word in words)
                {
                    SizeF size = graphics.MeasureString(word, font);

                    if ((int)size.Width > newWidth)
                    {
                        newWidth = (int)size.Width;
                    }

                    lineHeight = (int)size.Height;
                }

                int index = 0;
                string currentLine = "";
                int currentAdjustedWidth = AdjustedWidth(lines.Count + 1, newWidth, offsetY, lineHeight);
                while (index < words.Length)
                {
                    string newLine;

                    if (currentLine == "")
                    {
                        newLine = words[index];
                    }
                    else
                    {
                        newLine = string.Format("{0}{1}{2}", currentLine, this.SeparatorChar, words[index]);
                    }

                    SizeF size = graphics.MeasureString(newLine, font);
                    if ((int)size.Width < currentAdjustedWidth)
                    {
                        currentLine = newLine;
                        index++;
                    }
                    else
                    {
                        lines.Add(currentLine);
                        currentLine = "";
                        currentAdjustedWidth = AdjustedWidth(lines.Count + 1, newWidth, offsetY, lineHeight);
                    }
                }

                lines.Add(currentLine);
            }

            return lines;
        }



        /// <exclude />
        public int AdjustedWidth(int currentLineNumber, int width, int offsetY, int lineHeight)
        {
            if (_topRightIconItem == null) return width;

            int lineTop = (currentLineNumber - 1) * (lineHeight + this.LinePadding) +
                          offsetY;

            int lineBottom = lineTop + lineHeight;

            int iconTop = _topRightIconItem.TopLeftPadding.Height;
            int iconBottom = _topRightIconItem.GetBoxSize().Height;

            if ((lineTop >= iconTop) && (lineBottom <= iconBottom))
            {
                return width - _topRightIconItem.GetBoxSize().Width;
            }

            return width;
        }



        private void DrawImage(int width, int height)
        {
            int topBorder = _topLeftResize.Y;
            int bottomBorder = _templateBitmap.Height - _bottomRightResize.Y;
            int leftBorder = _topLeftResize.X;
            int rightBorder = _templateBitmap.Width - _bottomRightResize.X;

            int newRightOffset = width - rightBorder;
            int newBottomOffset = height - bottomBorder;


            // Top left cornor
            DrawCornor(leftBorder, topBorder, 0, 0, 0, 0);
            // Top right cornor
            DrawCornor(rightBorder, topBorder, _bottomRightResize.X, 0, newRightOffset, 0);
            // Bottom left cornor
            DrawCornor(leftBorder, bottomBorder, 0, _bottomRightResize.Y, 0, newBottomOffset);
            // Bottom right cornor
            DrawCornor(rightBorder, bottomBorder, _bottomRightResize.X, _bottomRightResize.Y, newRightOffset, newBottomOffset);


            DrawHorizontalSide(width - leftBorder - rightBorder, topBorder, _topLeftResize.X, 0, leftBorder, 0);
            DrawHorizontalSide(width - leftBorder - rightBorder, bottomBorder, _topLeftResize.X, _bottomRightResize.Y, leftBorder, height - bottomBorder);

            DrawVerticalSide(leftBorder, height - topBorder - bottomBorder, 0, _topLeftResize.Y, 0, topBorder);
            DrawVerticalSide(rightBorder, height - topBorder - bottomBorder, _bottomRightResize.X, _topLeftResize.Y, width - rightBorder, topBorder);

            DrawInner(width - leftBorder - rightBorder, height - topBorder - bottomBorder, _topLeftResize.X, _topLeftResize.Y, leftBorder, topBorder);

            if (_image != null)
            {
                using (Graphics g = Graphics.FromImage(_currentBitmap))            
                {
                    g.DrawImage(_image.Image, new Point(_image.TopLeftPadding));
                }
            }
        }



        private void DrawCornor(int width, int height, int originalOffsetX, int originalOffsetY, int newOffsetX, int newOffsetY)
        {
            for (int x = 0; x < width; ++x)
            {
                for (int y = 0; y < height; ++y)
                {
                    Color color = _templateBitmap.GetPixel(x + originalOffsetX, y + originalOffsetY);

                    _currentBitmap.SetPixel(x + newOffsetX, y + newOffsetY, color);
                }
            }
        }



        private void DrawHorizontalSide(int width, int height, int originalOffsetX, int originalOffsetY, int newOffsetX, int newOffsetY)
        {
            for (int x = 0; x < width; ++x)
            {
                for (int y = 0; y < height; ++y)
                {
                    Color color = _templateBitmap.GetPixel(originalOffsetX, y + originalOffsetY);

                    _currentBitmap.SetPixel(x + newOffsetX, y + newOffsetY, color);
                }
            }
        }



        private void DrawVerticalSide(int width, int height, int originalOffsetX, int originalOffsetY, int newOffsetX, int newOffsetY)
        {
            for (int x = 0; x < width; ++x)
            {
                for (int y = 0; y < height; ++y)
                {
                    Color color = _templateBitmap.GetPixel(x + originalOffsetX, originalOffsetY);

                    _currentBitmap.SetPixel(x + newOffsetX, y + newOffsetY, color);
                }
            }
        }



        private void DrawInner(int width, int height, int originalOffsetX, int originalOffsetY, int newOffsetX, int newOffsetY)
        {
            Color color = _templateBitmap.GetPixel(originalOffsetX, originalOffsetY);

            using (Graphics g = Graphics.FromImage(_currentBitmap))            
            using (var solidBrush = new SolidBrush(color))
            {
                g.FillRectangle(solidBrush, newOffsetX, newOffsetY, width, height);
            }
        }





        private sealed class TitleItem : PaddedItem
        {
            public TitleItem(string title, Size topLeftPadding, Size bottomRightPadding, 
                Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle) : base(topLeftPadding, bottomRightPadding)
            {
                this.Title = title;
                this.FontColor = fontColor;
                this.Font = new Font(fontFamilyName, fontSize, fontStyle);
            }


            public string Title
            {
                get;
                private set;
            }


            public List<string> Lines
            {
                get;
                set;
            }


            public int LineHeight
            {
                get;
                set;
            }


            public int HeightWidthPadding
            {
                get;
                set;
            }


            public Color FontColor
            {
                get;
                private set;
            }


            public Font Font
            {
                get;
                private set;
            }

            public override Size GetInnerDimentions()
            {
                throw new NotImplementedException();
                // graphics
                //return new Size(0, Lines.Count * LineHeight + (Lines.Count - 1) * this.LinePadding;
            }
        }



        private sealed class WrappedTextItem
        {
            public WrappedTextItem(string text, Point topLeftPadding, Point bottomRightPadding, Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle)
            {
                this.Text = text;
                this.TopLeftPadding = topLeftPadding;
                this.BottomRightPadding = bottomRightPadding;
                this.FontColor = fontColor;
                this.Font = new Font(fontFamilyName, fontSize, fontStyle);
            }


            public string Text
            {
                get;
                private set;
            }


            public List<string> Lines
            {
                get;
                set;
            }


            public int LineHeight
            {
                get;
                set;
            }

            public Point TopLeftPadding
            {
                get;
                private set;
            }


            public Point BottomRightPadding
            {
                get;
                private set;
            }


            public Color FontColor
            {
                get;
                private set;
            }


            public Font Font
            {
                get;
                private set;
            }
        }



        private sealed class TextLinesItem
        {
            public TextLinesItem(ICollection<string> lines, Size topLeftPadding, Size bottomRightPadding, Color fontColor, string fontFamilyName, float fontSize, FontStyle fontStyle)
            {
                this.Lines = lines;
                this.TopLeftPadding = topLeftPadding;
                this.BottomRightPadding = bottomRightPadding;
                this.FontColor = fontColor;
                this.Font = new Font(fontFamilyName, fontSize, fontStyle);
            }


            public ICollection<string> Lines
            {
                get;
                private set;
            }


            public int LineHeight
            {
                get;
                set;
            }


            public Size TopLeftPadding
            {
                get;
                private set;
            }


            public Size BottomRightPadding
            {
                get;
                private set;
            }


            public Color FontColor
            {
                get;
                private set;
            }


            public Font Font
            {
                get;
                private set;
            }
        }

        private abstract class PaddedItem
        {
            public PaddedItem(Size topLeftPadding, Size bottomRightPadding)
            {
                this.TopLeftPadding = topLeftPadding;
                this.BottomRightPadding = bottomRightPadding;
            }
            public abstract Size GetInnerDimentions();

            public Size TopLeftPadding { get; private set; }

            public Size BottomRightPadding { get; private set; }

            public Size PaddingSize
            {
                get { return new Size(TopLeftPadding.Width + BottomRightPadding.Width, TopLeftPadding.Height + BottomRightPadding.Height); }
            }

            public Size GetBoxSize()
            {
                var innerDimensions = GetInnerDimentions();

                return new Size(innerDimensions.Width + TopLeftPadding.Width + BottomRightPadding.Width,
                                innerDimensions.Height + TopLeftPadding.Height + BottomRightPadding.Height);
            }
        }


        private sealed class ImageItem : PaddedItem
        {
            public ImageItem(Bitmap icon, Size topRightPadding, Size bottomLeftPadding)
                : base(topRightPadding, bottomLeftPadding)
            {
                this.Image = icon;
            }

            public Bitmap Image
            {
                get;
                private set;
            }
            
            public override Size GetInnerDimentions()
            {
                return Image.Size;
            }
        }
    }
}
