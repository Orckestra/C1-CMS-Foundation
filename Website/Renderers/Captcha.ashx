<%@ WebHandler Language="C#" Class="CaptchaImageCreator" %>

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web;

using Composite.Core.WebClient.Captcha;

public class CaptchaImageCreator : IHttpHandler
{
	#region private const
	private const string IMAGE_JPEG = "image/jpeg";
	private const string WIDTH = "Width";
	private const string HEIGHT = "Height";
    private const string CAPTCHA_VALUE = "value";
	private const string BACKGROUND_COLOR = "BackGroundColor";
	private const string FONT_WARP = "FontWarp";
	private const string FONT_COLOR = "FontColor";
	private const string NOISE = "Noise";
	private const string NOISE_COLOR = "NoiseColor";
	private const string LINE_NOISE = "LineNoise";
	private const string LINE_NOISE_COLOR = "LineNoiseColor";
	#endregion

	#region private vars
	private ImageCreator ic;
	private HttpContext CurrentContext;
	private Color _BackgroundColor = Color.White;
	private FontWarpFactor _FontWarpFactor = FontWarpFactor.Low;
	private Color _FontColor = Color.Black;
	private NoiseLevel _NoiseLevel = NoiseLevel.Low;
	private Color _NoiseColor = Color.Black;
	private LineNoiseLevel _LineNoiseLevel = LineNoiseLevel.Low;
	private Color _LineNoiseColor = Color.Black;
	#endregion

	#region private properties
	private int Width
	{
		get
		{
    		return int.Parse(CurrentContext.Request.Params[WIDTH] ?? "160");
		}
	}
	private int Height
	{
		get
		{
    		return int.Parse(CurrentContext.Request.Params[HEIGHT] ?? "40");
		}
	}

    private string Text
    {
        get
        {
            string encrypted = CurrentContext.Request.QueryString[CAPTCHA_VALUE];

            string value;
            DateTime timeStamp;

            if(string.IsNullOrEmpty(encrypted)
                || !Captcha.IsValid(encrypted)
                || !Captcha.Decrypt(encrypted, out timeStamp, out value))
            {
                return null;
            }

            return value;
        }
    }

	#endregion

	public void ProcessRequest (HttpContext context)
	{
		CurrentContext = context;
		ic = new ImageCreator(Width, Height);
		ReadSettings();
		ConfigureCaptcha();

	    string text = Text;
        if (!string.IsNullOrEmpty(text))
        {
            Bitmap image = ic.CreateImage(text);
            image.Save(CurrentContext.Response.OutputStream, ImageFormat.Jpeg);
            image.Dispose();
            CurrentContext.Response.ContentType = IMAGE_JPEG;
            CurrentContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            CurrentContext.Response.StatusCode = 200;
        }
        CurrentContext.ApplicationInstance.CompleteRequest();
	}

	private void ReadSettings()
	{
		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[BACKGROUND_COLOR]))
			{
				_BackgroundColor = ColorTranslator.FromHtml(CurrentContext.Request.QueryString[BACKGROUND_COLOR]);
			}
		}
		catch (Exception) {}

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[FONT_WARP]))
			{
				_FontWarpFactor = (FontWarpFactor)Enum.Parse(typeof(FontWarpFactor), CurrentContext.Request.QueryString[FONT_WARP]);
			}
		}
		catch (ArgumentNullException) { }
		catch (ArgumentException) { }

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[FONT_COLOR]))
			{
				_FontColor = ColorTranslator.FromHtml(CurrentContext.Request.QueryString[FONT_COLOR]);
			}
		}
		catch (Exception) { }

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[NOISE]))
			{
				_NoiseLevel = (NoiseLevel)Enum.Parse(typeof(NoiseLevel), CurrentContext.Request.QueryString[NOISE]);
			}
		}
		catch (ArgumentNullException) { }
		catch (ArgumentException) { }

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[NOISE_COLOR]))
			{
				_NoiseColor = ColorTranslator.FromHtml(CurrentContext.Request.QueryString[NOISE_COLOR]);
			}
		}
		catch (Exception) { }

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[LINE_NOISE]))
			{
				_LineNoiseLevel = (LineNoiseLevel)Enum.Parse(typeof(LineNoiseLevel), CurrentContext.Request.QueryString[LINE_NOISE]);
			}
		}
		catch (ArgumentNullException) { }
		catch (ArgumentException) { }

		try
		{
			if (!String.IsNullOrEmpty(CurrentContext.Request.QueryString[LINE_NOISE_COLOR]))
			{
				_LineNoiseColor = ColorTranslator.FromHtml(CurrentContext.Request.QueryString[LINE_NOISE_COLOR]);
			}
		}
		catch (Exception) { }
	}

	private void ConfigureCaptcha()
	{
		ic.BackgroundColor = _BackgroundColor;
		ic.FontWarp = _FontWarpFactor;
		ic.FontColor = _FontColor;
		ic.Noise = _NoiseLevel;
		ic.NoiseColor = _NoiseColor;
		ic.LineNoise = _LineNoiseLevel;
		ic.LineNoiseColor = _LineNoiseColor;
	}

	public bool IsReusable
	{
		get
		{
			return false;
		}
	}
}

