using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Composite.C1Console.Actions;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;

public partial class ResxEditor : System.Web.UI.Page, IPostBackEventHandler
{
    public string FileName
    {
        get { return (string)ViewState["FileName"]; }
        set { ViewState["FileName"] = value; }
    }

    public string PageTitle
    {
        get { return Path.GetFileName(FileName); }
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

            SaveButton.Enabled = false;

            var culList = new[] { new ListItem { Text = "Select Another Culture", Value = null } }.Concat(StringResourceSystemFacade.GetSupportedCultures().
                Where(f => f.Name != "en-US").Select(t => new ListItem { Text = t.DisplayName, Value = t.Name }));

            if (loc != null)
            {
                culList = culList.Union(new[] { new ListItem { Text = loc.DisplayName, Value = loc.Name } });
                CultureSelector.SelectedValue = loc.Name;
            }

            CultureSelector.DataSource = culList;
            CultureSelector.DataTextField = "Text";
            CultureSelector.DataValueField = "Value";
            CultureSelector.DataBind();

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
                var xAttribute = node.Attribute("name");
                if (xAttribute != null) res.Add(xAttribute.Value, node.Value);

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
                            target.Value = original ?? "";
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
                            target.Value = translated ?? "";
                        }
                    }
                }
            }

            await Task.Run(() => xdoc.Save(GetCurrentAlternateFileName(FileName)));
        }

        SaveButton.Enabled = false;
    }

    private string GetCurrentAlternateFileName(string file)
    {
        return Path.GetDirectoryName(file) +
            Path.DirectorySeparatorChar +
            Path.GetFileNameWithoutExtension(file) + "." +
               CultureSelector.SelectedItem.Value + Path.GetExtension(file);
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


    protected void Culture_OnSelectedIndexChanged(object sender, EventArgs e)
    {
        OtherCultureExist = true;
        ListItem removeItem = CultureSelector.Items.FindByValue("Select Another Culture");
        CultureSelector.Items.Remove(removeItem);
        BindGridView();
    }

    protected void TextBox_OnKeyPress()
    {
        SaveButton.Enabled = true;
    }

    public void RaisePostBackEvent(string eventArgument)
    {
        TextBox_OnKeyPress();
    }

    public class Phrase
    {
        public string Label { get; set; }
        public string Original { get; set; }
        public string Translated { get; set; }
    }
}


