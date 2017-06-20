using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Castle.Core.Internal;
using Composite.C1Console.Events;
using Composite.Core.IO;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;

public partial class ResxEditor : System.Web.UI.Page
{
    public string FileName
    {
        get { return (string)ViewState["FileName"]; }
        set { ViewState["FileName"] = value; }
    }

    public string CultureName
    {
        get { return (string)ViewState["CultureName"]; }
        set { ViewState["CultureName"] = value; }
    }

    public string PageTitle
    {
        get { return Path.GetFileName(GetCurrentAlternateFileName(FileName)); }
    }

    public bool OtherCultureExist
    {
        get { return bool.Parse((string)ViewState["OtherCultureExist"]); }
        set { ViewState["OtherCultureExist"] = value.ToString(); }
    }
    public List<string> OtherCulturesCultureNames { get; set; }


    protected void Page_Load(object sender, EventArgs e)
    {

        if (!this.IsPostBack)
        {
            OtherCultureExist = false;

            FileName = Request.QueryString["f"];

            CultureName = Request.QueryString["t"];

            if (CultureName != null)
            {
                OtherCultureExist = true;
                Save(null, null);
                var entityToken = new WebsiteFileElementProviderEntityToken("WebsiteFileElementProvider",
                    Path.GetDirectoryName(FileName), Path.GetDirectoryName(PathUtil.BaseDirectory));
                ConsoleMessageQueueFacade.Enqueue(new RefreshTreeMessageQueueItem { EntityToken = entityToken }, null);
            }

            if (!FileName.EndsWith(".resx", StringComparison.OrdinalIgnoreCase))
            {
                FileName = null;
                return;
            }

            var loc = CultureInfo.GetCultures(CultureTypes.AllCultures)
                .LastOrDefault(f => f.Name != "" && FileName.EndsWith(f.Name + ".Resx", StringComparison.OrdinalIgnoreCase));

            if (loc != null)
            {
                FileName = FileName.Replace(loc.Name + ".", "");
                OtherCultureExist = true;
            }

            if (loc != null)
            {
                CultureName = loc.Name;
            }

            this.BindGridView();
        }
    }



    private static Dictionary<string, string> GetResDic(string file)
    {
        Dictionary<string, string> res = new Dictionary<string, string>();

        try
        {
            var xdoc = XDocument.Load(file);
            var topicNodes = xdoc.Descendants("data");
            foreach (var node in topicNodes)
            {
                if (node.Attributes().Any(f => f.Name == XNamespace.Xml + "space" && f.Value == "preserve"))
                {
                    var xAttribute = node.Attribute("name");
                    if (xAttribute != null) res.Add(xAttribute.Value, node.Descendants("value").First().Value);
                }

            }

            return res;
        }
        catch
        {
            return null;
        }
    }

    public async void Save(object sender, CommandEventArgs e)
    {
        if (FileName == null)
            return;

        if (!OtherCultureExist)
        {
            var xdoc = await Task.Run(() => XDocument.Load(FileName));
            foreach (RepeaterItem item in DataRepeater.Items)
            {
                var labelcontrol = item.FindControl("Label") as Label;
                if (labelcontrol != null)
                {
                    var label = labelcontrol.Text;
                    var textBox = item.FindControl("Original") as TextBox;
                    if (textBox != null)
                    {
                        var original = textBox.Text;
                        var target = xdoc.Descendants("data").SingleOrDefault(f =>
                        {
                            var xAttribute = f.Attribute("name");
                            return xAttribute != null && xAttribute.Value == label;
                        });
                        if (target != null)
                        {
                            target.Descendants("value").Single().Value = original ?? "";
                        }
                    }
                }
            }

            await Task.Run(() => xdoc.Save(FileName));
        }
        else
        {
            var xdoc = await Task.Run(() => XDocument.Load(FileName));
            foreach (RepeaterItem item in DataRepeater.Items)
            {
                var labelcontrol = item.FindControl("Label") as Label;
                if (labelcontrol != null)
                {
                    var label = labelcontrol.Text;
                    var textBox = item.FindControl("Translated") as TextBox;
                    if (textBox != null)
                    {
                        var translated = textBox.Text;
                        var target = xdoc.Descendants("data").SingleOrDefault(f =>
                        {
                            var xAttribute = f.Attribute("name");
                            return xAttribute != null && xAttribute.Value == label;
                        });
                        if (target != null)
                        {
                            target.Descendants("value").Single().Value = translated ?? "";
                        }
                    }
                }
            }

            await Task.Run(() => xdoc.Save(GetCurrentAlternateFileName(FileName)));
        }
        SaveStatus(true);
    }

    public void OnMessage()
    {
        string message = ctlFeedback.GetPostedMessage();

        if (message == "save")
        {
            Save(null, null);
            ctlFeedback.SetStatus(true);
            SaveStatus(true);
        }
    }

    protected void SaveStatus(bool succeeded)
    {
        var viewId = Request["__VIEWID"];
        var consoleId = Request["__CONSOLEID"];
        ConsoleMessageQueueFacade.Enqueue(new SaveStatusConsoleMessageQueueItem { ViewId = viewId, Succeeded = succeeded }, consoleId);
    }

    private string GetCurrentAlternateFileName(string file)
    {
        return Path.GetDirectoryName(file) +
            Path.DirectorySeparatorChar +
            Path.GetFileNameWithoutExtension(file) + ((!CultureName.IsNullOrEmpty()) ? "." : "") +
               CultureName + Path.GetExtension(file);
    }

    private void BindGridView()
    {
        Dictionary<string, string> otherculturedic = null;

        if (FileName == null)
            return;

        var dic = GetResDic(FileName);

        if (dic == null)
            return;

        if (OtherCultureExist)
        {
            otherculturedic = GetResDic(GetCurrentAlternateFileName(FileName));
        }

        List<Phrase> li = new List<Phrase>();

        foreach (var n in dic)
        {
            var p = new Phrase()
            {
                Label = n.Key,
                Original = n.Value,
                Translated = (otherculturedic != null) ? otherculturedic[n.Key] : ""
            };
            li.Add(p);
        }

        DataRepeater.DataSource = li;
        DataRepeater.DataBind();
    }


    public class Phrase
    {
        public string Label { get; set; }
        public string Original { get; set; }
        public string Translated { get; set; }
    }
}


