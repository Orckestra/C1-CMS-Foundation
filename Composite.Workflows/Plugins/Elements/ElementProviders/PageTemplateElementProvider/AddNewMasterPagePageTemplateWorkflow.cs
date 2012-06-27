using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Workflow.Activities;
using Composite.C1Console.Actions;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.PageTemplates.Foundation.PluginFacade;
using Composite.Core.ResourceSystem;
using Composite.Plugins.PageTemplates.MasterPages;
using Composite.Plugins.PageTemplates.Razor;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewMasterPagePageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string Marker_TemplateId = "%TemplateId%";
        private static readonly string Marker_TemplateTitle = "%TemplateTitle%";
        private static readonly string Marker_Codebehind = "%Codebehind%";
        

        private static readonly string NewMasterPage_Markup =
@"<%@ Master Language=""C#"" AutoEventWireup=""true"" CodeFile=""%Codebehind%"" Inherits=""page_template"" %>
<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">

<html xmlns=""http://www.w3.org/1999/xhtml"">
<head runat=""server"">
    <title><c1:Title id=""title"" runat=""server""/></title>
</head>
<body>
        <h1> Master page </h1>
        <h2>Content Placeholder</h2>
        <div>
            
            <c1:Placeholder  Content=""<%# Content %>"" runat=""server"" />

        </div>
        <h2>Bottom Placeholder</h2>
        <div>
            
            <c1:Placeholder Content=""<%# Bottom %>"" runat=""server"" />

        </div>

</body>
</html>".Replace("    ", "\t");

        private static readonly string NewMasterPage_Codebehind =
@"using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Composite.Plugins.PageTemplates.MasterPages;
using Composite.Core.Xml;
using Composite.Core.PageTemplates; 

public partial class page_template : MasterPagePageTemplate
{
	public override Guid TemplateId
	{
		get { return new Guid(""%TemplateId%""); }
	}

    public override string TemplateTitle {
        get { return ""%TemplateTitle%""; }
    }

	[Placeholder(Title=""Main Content"", IsDefault=true)]
	public XhtmlDocument Content { get; set; }
	
	[Placeholder(Title = ""Bottom"")]
	public XhtmlDocument Bottom { get; set; }

	protected void Page_Load(object sender, EventArgs e)
    {

    }
}".Replace("    ", "\t");

        public AddNewMasterPagePageTemplateWorkflow()
        {
            InitializeComponent();
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("Title", string.Empty);

            List<KeyValuePair<Guid, string>> templatesOptions =
                (from template in PageTemplateFacade.GetPageTemplates()
                 where template is MasterPagePageTemplateDescriptor 
                       && template.IsValid
                       && TemplateIsClonable(template as MasterPagePageTemplateDescriptor)
                 orderby template.Title
                 select new KeyValuePair<Guid, string>(template.Id, template.Title)).ToList();

            templatesOptions.Insert(0, new KeyValuePair<Guid, string>(
                Guid.Empty, GetStr("AddNewPageTemplateStep1.LabelCopyFromEmptyOption")));

            this.Bindings.Add("CopyOfOptions", templatesOptions);
            this.Bindings.Add("CopyOfId", Guid.Empty);
        }



        private void codeActivity2_ExecuteCode(object sender, EventArgs e)
        {
            AddNewTreeRefresher addNewTreeRefresher = this.CreateAddNewTreeRefresher(this.EntityToken);

            Guid newTemplateId = Guid.NewGuid();
            string newTitle = this.GetBinding<string>("Title");

            string newPageTemplate_Markup, newPageTemplate_Codebehind, templateFolder;

            Guid copyOfId = this.GetBinding<Guid>("CopyOfId");
            if (copyOfId == Guid.Empty)
            {
                newPageTemplate_Markup = NewMasterPage_Markup;
                newPageTemplate_Codebehind = NewMasterPage_Codebehind;

                templateFolder = GetMasterPagesRootFolder();
            }
            else
            {
                ParseTemplateForCopying(copyOfId, out newPageTemplate_Markup, out newPageTemplate_Codebehind, out templateFolder);
            }

            string masterFilePath, codeFilePath;
            GenerateFileNames(templateFolder, newTitle, newTemplateId, out masterFilePath, out codeFilePath);

            newPageTemplate_Markup = newPageTemplate_Markup.Replace(Marker_Codebehind, Path.GetFileName(codeFilePath));
            newPageTemplate_Codebehind = newPageTemplate_Codebehind
                .Replace(Marker_TemplateId, newTemplateId.ToString())
                .Replace(Marker_TemplateTitle, CSharpEncodeString(newTitle));

            C1File.WriteAllText(codeFilePath, newPageTemplate_Codebehind);
            C1File.WriteAllText(masterFilePath, newPageTemplate_Markup);

            var entityToken = new PageTemplateEntityToken(newTemplateId);
            PageTemplateProviderRegistry.FlushTemplates();

            addNewTreeRefresher.PostRefreshMesseges(entityToken);

            this.ExecuteAction(entityToken, new WorkflowActionToken(typeof(EditMasterPageWorkflow)));
        }

        private static void GenerateFileNames(string root, string templateTitle, Guid templateId, out string masterFilePath, out string codeFilePath)
        {
            string baseFileName = PathUtil.CleanFileName(templateTitle, true) ?? templateId.ToString();

            for(int i=0; i<100; i++)
            {
                string fileName = baseFileName + (i == 0 ? "" : "_" + i.ToString());

                string _masterPageFilePath = Path.Combine(root, fileName + ".master");
                string _codebehindFilePath = Path.Combine(root, fileName + ".master.cs");

                if (!C1File.Exists(_masterPageFilePath)
                    && !C1File.Exists(_codebehindFilePath))
                {
                    masterFilePath = _masterPageFilePath;
                    codeFilePath = _codebehindFilePath;
                    return;
                }
            }

            throw new InvalidOperationException("Failed to generate file name");
        }

        private string GetMasterPagesRootFolder()
        {
            foreach(string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                if(provider is MasterPagePageTemplateProvider)
                {
                    return (provider as MasterPagePageTemplateProvider).TemplateDirectoryPath;
                }
            }

            throw new InvalidOperationException("Failed to get instance of " + typeof(MasterPagePageTemplateProvider));
        }

        private static string CSharpEncodeString(string text)
        {
            return text.Replace("\\", "\\\\").Replace("\"", "\\\"");
        }

        private void ParseTemplateForCopying(
            Guid templateId, 
            out string markupTemplate,
            out string codebehindTemplate,
            out string templateFolder)
        {
            var masterTemplate = PageTemplateFacade.GetPageTemplate(templateId) as MasterPagePageTemplateDescriptor;
            Verify.IsNotNull(masterTemplate, "Failed to get MasterPagePageTemplateDescriptor by template id '{0}'", templateId);

            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(templateId) as MasterPagePageTemplateProvider;
            Verify.IsNotNull(provider, "Failed to get MasterPagePageTemplateProvider by template id '{0}'", templateId);

            string markup = C1File.ReadAllText(masterTemplate.FilePath);
            string codebehind = C1File.ReadAllText(masterTemplate.CodeBehindFilePath);

            string codebehindFileName = Path.GetFileName(masterTemplate.CodeBehindFilePath);

            // Parsing markup
            markup = markup.Replace(codebehindFileName, Marker_Codebehind);

            // Parsing codebehind
            const string quote = @"""";

            Verify.That(codebehind.IndexOf(templateId.ToString(), StringComparison.OrdinalIgnoreCase) > 0, 
                "Failed to replace existing templateId '{0}'", templateId);

            codebehind = ReplaceString(codebehind, templateId.ToString(), Marker_TemplateId, StringComparison.OrdinalIgnoreCase);

            // Replacing title, considering 2 types of encoding
            codebehind = codebehind.Replace("@" + quote + masterTemplate.Title.Replace(quote, quote + quote) + quote,
                                            quote + Marker_TemplateTitle + quote);
            codebehind = codebehind.Replace(quote + CSharpEncodeString(masterTemplate.Title) + quote, 
                                            quote + Marker_TemplateTitle + quote);


            markupTemplate = markup;
            codebehindTemplate = codebehind;
            templateFolder = Path.GetDirectoryName(masterTemplate.CodeBehindFilePath);
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            string title = this.GetBinding<string>("Title");

            e.Result = PageTemplateFacade.GetPageTemplates()
                            .Any(f => f.Title.Equals(title, StringComparison.InvariantCultureIgnoreCase));
        }



        private void ValidateFilePath(object sender, ConditionalEventArgs e)
        {
            e.Result = true;
        }


        static string ReplaceString(string str, string oldValue, string newValue, StringComparison comparison)
        {
            var sb = new StringBuilder();

            int previousIndex = 0;
            int index = str.IndexOf(oldValue, comparison);
            while (index != -1)
            {
                sb.Append(str.Substring(previousIndex, index - previousIndex));
                sb.Append(newValue);
                index += oldValue.Length;

                previousIndex = index;
                index = str.IndexOf(oldValue, index, comparison);
            }
            sb.Append(str.Substring(previousIndex));

            return sb.ToString();
        }

        private bool TemplateIsClonable(MasterPagePageTemplateDescriptor templateDescriptor)
        {
            string codebehindFile = templateDescriptor.CodeBehindFilePath;
            if(codebehindFile == null)
            {
                return false;
            }

            string masterFile = templateDescriptor.FilePath;

            string codebehindFileReference = "\"" + Path.GetFileName(codebehindFile) + "\"";
            string templateId = templateDescriptor.Id.ToString();

            return C1File.ReadAllText(codebehindFile).IndexOf(templateId, StringComparison.OrdinalIgnoreCase) > 0
                && C1File.ReadAllText(masterFile).IndexOf(codebehindFileReference, StringComparison.OrdinalIgnoreCase) > 0;
        }

        private void showFieldErrorCodeActivity_ExecuteCode(object sender, EventArgs e)
        {
            ShowFieldMessage("NewPageTemplate.Title", GetStr("AddNewPageTemplateStep1.TitleInUseTitle"));
        }

        private static string GetStr(string stringName)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateElementProvider", stringName);
        }
    }
}
