using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;


namespace Composite.Core.WebClient.Captcha
{
    /// <summary>
    /// Image creator
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class ImageCreator
    {
        #region private members
        int Height;
        int Width;
        string ImageText = string.Empty;
        string _FontFamilyName = string.Empty;
        FontWarpFactor _FontWarp;
        NoiseLevel _Noise;
        LineNoiseLevel _LineNoise;
        Color _BackgroundColor = Color.White;
        Color _NoiseColor = Color.Black;
        Color _LineNoiseColor = Color.Black;
        Color _FontColor = Color.Black;
        Random Rand = new Random();
        // a list of known good fonts in on both Windows XP and Windows Server 2003
        string[] FontWhitelist = { "arial", "arial black", "comic sans ms", "courier new", "estrangelo edessa",
			"franklin gothic medium", "georgia", "lucida console", "lucida sans unicode", "mangal", "microsoft sans serif",
			"palatino linotype", "sylfaen", "tahoma", "times new roman", "trebuchet ms", "verdana"};
        #endregion

        #region properties
        public string FontFamilyName
        {
            get
            {
                return _FontFamilyName;
            }
            set
            {
                _FontFamilyName = value;
            }
        }
        public FontWarpFactor FontWarp
        {
            get
            {
                return _FontWarp;
            }
            set
            {
                _FontWarp = value;
            }
        }
        public NoiseLevel Noise
        {
            get
            {
                return _Noise;
            }
            set
            {
                _Noise = value;
            }
        }
        public LineNoiseLevel LineNoise
        {
            get
            {
                return _LineNoise;
            }
            set
            {
                _LineNoise = value;
            }
        }
        public Color BackgroundColor
        {
            get
            {
                return _BackgroundColor;
            }
            set
            {
                _BackgroundColor = value;
            }
        }
        public Color NoiseColor
        {
            get
            {
                return _NoiseColor;
            }
            set
            {
                _NoiseColor = value;
            }
        }
        public Color LineNoiseColor
        {
            get
            {
                return _LineNoiseColor;
            }
            set
            {
                _LineNoiseColor = value;
            }
        }
        public Color FontColor
        {
            get
            {
                return _FontColor;
            }
            set
            {
                _FontColor = value;
            }
        }
        #endregion

        #region Constructors
        /// <summary>
        /// Class for generating CAPTCHA images
        /// </summary>
        /// <param name="width">Width of the image</param>
        /// <param name="height">Height of the image</param>
        public ImageCreator(int width, int height)
        {
            if (height < 10 || height > 400)
            {
                throw new ArgumentOutOfRangeException("height");
            }
            if (width < 100 || height > 500)
            {
                throw new ArgumentOutOfRangeException("width");
            }
            Height = height;
            Width = width;
        }
        #endregion

        #region Public methods
        public Bitmap CreateImage(string text)
        {
            ImageText = text;
            return GenerateImagePrivate();
        }
        #endregion

        #region Private Members
        private Bitmap GenerateImagePrivate()
        {
            Rectangle rectangle;
            Bitmap bitmap = new Bitmap(Width, Height, PixelFormat.Format32bppArgb);
            Graphics graphics = Graphics.FromImage(bitmap);
            graphics.SmoothingMode = SmoothingMode.AntiAlias;

            // fill an empty white rectangle
            rectangle = new Rectangle(0, 0, Width, Height);
            using (var backgroundBrush = new SolidBrush(BackgroundColor))
            {
                graphics.FillRectangle(backgroundBrush, rectangle);
            }

            int charOffset = 0;
            double charWidth = Width / ImageText.Length;
            Rectangle rectangleChar;

            using (var solidFontBrush = new SolidBrush(FontColor))
            foreach (char c in ImageText)
            {
                // establish font and draw area
                rectangleChar = new Rectangle(Convert.ToInt32(charOffset * charWidth), 0, Convert.ToInt32(charWidth), Height);

                // warp the character
                GraphicsPath graphicsPath;

                // TODO: Creating a font is the heaviest operation, takes ~ 300ms every CAPTCHA request, some caching logic can be done here
                using (Font font = GetFont())
                {
                    graphicsPath = TextPath(c, font, rectangleChar);
                }

                WarpText(graphicsPath, rectangleChar);

                // draw the character
                graphics.FillPath(solidFontBrush, graphicsPath);

                charOffset += 1;
            }

            AddNoise(graphics, rectangle);
            AddLine(graphics, rectangle);

            // clean up unmanaged resources
            graphics.Dispose();

            return bitmap;
        }

        /// <summary>
        /// Returns the CAPTCHA font in an appropriate size 
        /// </summary>
        private Font GetFont()
        {
            Single FontSize;
            string FontName = FontFamilyName;
            if (String.IsNullOrEmpty(FontName))
            {
                FontName = RandomFontFamily();
            }
            switch (FontWarp)
            {
                case FontWarpFactor.None:
                    FontSize = Convert.ToInt32(Height * 0.7);
                    break;
                case FontWarpFactor.Low:
                    FontSize = Convert.ToInt32(Height * 0.8);
                    break;
                case FontWarpFactor.Medium:
                    FontSize = Convert.ToInt32(Height * 0.85);
                    break;
                case FontWarpFactor.High:
                    FontSize = Convert.ToInt32(Height * 0.9);
                    break;
                default:
                    FontSize = Convert.ToInt32(Height * 0.95);
                    break;

            }
            return new Font(FontName, FontSize, FontStyle.Bold);
        }
        /// <summary>
        /// Returns a random font family from the font whitelist
        /// </summary>
        private string RandomFontFamily()
        {
            return FontWhitelist[Rand.Next(0, FontWhitelist.GetLength(0) - 1)];
        }

        /// <summary>
        /// Returns a GraphicsPath containing the specified string and font
        /// </summary>
        private static GraphicsPath TextPath(char s, Font font, Rectangle rectangle)
        {
            StringFormat stringFormat = new StringFormat();
            stringFormat.Alignment = StringAlignment.Near;
            stringFormat.LineAlignment = StringAlignment.Near;
            GraphicsPath graphicsPath = new GraphicsPath();
            graphicsPath.AddString(s.ToString(), font.FontFamily, (int)font.Style, font.Size, rectangle, stringFormat);
            stringFormat.Dispose();
            return graphicsPath;
        }

        /// <summary>
        /// Warp the provided text GraphicsPath by a variable amount
        /// </summary>
        private void WarpText(GraphicsPath textPath, Rectangle rectangle)
        {
            float WarpDivisor;
            float RangeModifier;

            switch (FontWarp)
            {
                case FontWarpFactor.None:
                    return;
                case FontWarpFactor.Low:
                    WarpDivisor = 6f;
                    RangeModifier = 1f;
                    break;
                case FontWarpFactor.Medium:
                    WarpDivisor = 5f;
                    RangeModifier = 1.3f;
                    break;
                case FontWarpFactor.High:
                    WarpDivisor = 4.5f;
                    RangeModifier = 1.4f;
                    break;
                default:
                    WarpDivisor = 4f;
                    RangeModifier = 1.5f;
                    break;
            }

            RectangleF rectangleF;
            rectangleF = new RectangleF(Convert.ToSingle(rectangle.Left), 0, Convert.ToSingle(rectangle.Width), rectangle.Height);

            int HeightRange = Convert.ToInt32(rectangle.Height / WarpDivisor);
            int WidthRange = Convert.ToInt32(rectangle.Width / WarpDivisor);
            int Left = rectangle.Left - Convert.ToInt32(WidthRange * RangeModifier);
            int Top = rectangle.Top - Convert.ToInt32(HeightRange * RangeModifier);
            int Width = rectangle.Left + rectangle.Width + Convert.ToInt32(WidthRange * RangeModifier);
            int Height = rectangle.Top + rectangle.Height + Convert.ToInt32(HeightRange * RangeModifier);

            if (Left < 0)
            {
                Left = 0;
            }
            if (Top < 0)
            {
                Top = 0;
            }
            if (Width > this.Width)
            {
                Width = this.Width;
            }
            if (Height > this.Height)
            {
                Height = this.Height;
            }

            PointF LeftTop = RandomPoint(Left, Left + WidthRange, Top, Top + HeightRange);
            PointF RightTop = RandomPoint(Width - WidthRange, Width, Top, Top + HeightRange);
            PointF LeftBottom = RandomPoint(Left, Left + WidthRange, Height - HeightRange, Height);
            PointF RightBottom = RandomPoint(Width - WidthRange, Width, Height - HeightRange, Height);

            PointF[] Points = { LeftTop, RightTop, LeftBottom, RightBottom };

            Matrix matrix = new Matrix();
            matrix.Translate(0, 0);
            textPath.Warp(Points, rectangleF, matrix, WarpMode.Perspective, 0);
            matrix.Dispose();
        }
        /// <summary>
        /// Add a variable level of graphic noise to the image
        /// </summary>
        private void AddNoise(Graphics graphics1, Rectangle rect)
        {
            int density;
            int size;

            switch (Noise)
            {
                case NoiseLevel.None:
                    return;
                case NoiseLevel.Low:
                    density = 150;
                    size = 40;
                    break;
                case NoiseLevel.Medium:
                    density = 100;
                    size = 40;
                    break;
                case NoiseLevel.High:
                    density = 50;
                    size = 39;
                    break;
                default:
                    density = 20;
                    size = 38;
                    break;
            }

            using (SolidBrush br = new SolidBrush(NoiseColor))
            {
                int max = Convert.ToInt32(Math.Max(rect.Width, rect.Height)/size);

                for (int i = 0; i <= Convert.ToInt32((rect.Width*rect.Height)/density); i++)
                {
                    graphics1.FillEllipse(br, Rand.Next(rect.Width), Rand.Next(rect.Height), Rand.Next(max), Rand.Next(max));
                }
            }
        }
        /// <summary>
        /// Add variable level of curved lines to the image
        /// </summary>
        private void AddLine(Graphics graphics1, Rectangle rect)
        {
            int length;
            float width;
            int linecount;

            switch (LineNoise)
            {
                case LineNoiseLevel.None:
                    return;
                case LineNoiseLevel.Low:
                    length = 4;
                    width = Convert.ToSingle(Height / 31.25); // 1.6
                    linecount = 1;
                    break;
                case LineNoiseLevel.Medium:
                    length = 5;
                    width = Convert.ToSingle(Height / 27.7777); // 1.8
                    linecount = 1;
                    break;
                case LineNoiseLevel.High:
                    length = 3;
                    width = Convert.ToSingle(Height / 25); // 2.0
                    linecount = 2;
                    break;
                default:
                    length = 3;
                    width = Convert.ToSingle(Height / 22.7272); // 2.2
                    linecount = 3;
                    break;
            }

            using(Pen p = new Pen(LineNoiseColor, width))
            {
                PointF[] pf = new PointF[length];

                for (int l = 1; l <= linecount; l++)
                {
                    for (int i = 0; i < length; i++)
                    {
                        pf[i] = RandomPoint(rect);
                    }
                    graphics1.DrawCurve(p, pf, 1.75f);
                }
            }
        }

        /// <summary>
        /// Returns a random point within the specified rectangle
        /// </summary>
        private PointF RandomPoint(Rectangle rect)
        {
            return RandomPoint(rect.Left, rect.Width, rect.Top, rect.Bottom);
        }
        /// <summary>
        /// Returns a random point within the specified x and y ranges
        /// </summary>
        private PointF RandomPoint(int xmin, int xmax, int ymin, int ymax)
        {
            return new PointF(Rand.Next(xmin, xmax), Rand.Next(ymin, ymax));
        }
        #endregion
    }

    /// <summary>
    /// Amount of random font warping to apply to rendered text
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum FontWarpFactor
    {
        None,
        Low,
        Medium,
        High,
        Extreme
    }

    /// <summary>
    /// Amount of background noise to add to rendered image
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum NoiseLevel
    {
        None,
        Low,
        Medium,
        High,
        Extreme
    }

    /// <summary>
    /// Amount of curved line noise to add to rendered image
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum LineNoiseLevel
    {
        None,
        Low,
        Medium,
        High,
        Extreme
    }
}
