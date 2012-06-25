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
using Composite.Plugins.PageTemplates.Razor;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [AllowPersistingWorkflow(WorkflowPersistingType.Idle)]
    public sealed partial class AddNewRazorPageTemplateWorkflow : Composite.C1Console.Workflow.Activities.FormsWorkflow
    {
        private static readonly string DefaultRazorTemplateMarkup = 
@"@inherits RazorPageTemplate
              
@functions {

    override public Guid TemplateId
    {
        get { return new Guid(""%TemplateId%""); }
    } 

    override public string TemplateTitle
    {
        get { return ""%TemplateTitle%""; }
    }

    [Placeholder(Title=""Content"", IsDefault=true)]
	public XhtmlDocument Content { get; set; }

    [Placeholder(Title=""Bottom"")]
    public XhtmlDocument Bottom { get; set; }    
}

<!DOCTYPE html>
<html xmlns=""http://www.w3.org/1999/xhtml"" 
 xmlns:f=""http://www.composite.net/ns/function/1.0"" xmlns:lang=""http://www.composite.net/ns/localization/1.0"" xmlns:rendering=""http://www.composite.net/ns/rendering/1.0""  xmlns:asp=""http://www.composite.net/ns/asp.net/controls"">
    <f:function name=""Composite.Web.Html.Template.LangAttribute"" />
	<head></head>
    <body>
        <h1> Razor template </h1>
        <h2>Content Placeholder</h2>
        <div>
            
            @Placeholder(Content)

        </div>
        <h2>Bottom Placeholder</h2>
        <div>
            
            @Placeholder(Bottom)

        </div>
        
    </body>
</html>".Replace("    ", "\t");

        public AddNewRazorPageTemplateWorkflow()
        {
            InitializeComponent();
        }



        private void codeActivity1_ExecuteCode(object sender, EventArgs e)
        {
            this.Bindings.Add("Title", string.Empty);

            List<KeyValuePair<Guid, string>> templatesOptions =
                (from template in PageTemplateFacade.GetPageTemplates()
                 where template is RazorPageTemplateDescriptor && template.IsValid
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

            string newPageTemplateMarkup;

            Guid copyOfId = this.GetBinding<Guid>("CopyOfId");
            if (copyOfId == Guid.Empty)
            {
                newPageTemplateMarkup = DefaultRazorTemplateMarkup
                    .Replace("%TemplateId%", newTemplateId.ToString())
                    .Replace("%TemplateTitle%", newTitle);
            }
            else
            {
                newPageTemplateMarkup = ProcessExistingTemplate(copyOfId, newTemplateId, newTitle);
            }

            string folderPath = GetRazorTemplatesRootFolder();
            string filePath = GeneratedCshtmlFileName(folderPath, newTitle, newTemplateId);

            C1File.WriteAllText(filePath, newPageTemplateMarkup);

            var entityToken = new PageTemplateEntityToken(newTemplateId);

            PageTemplateProviderRegistry.FlushTemplates();

            addNewTreeRefresher.PostRefreshMesseges(entityToken);

            this.ExecuteAction(entityToken, new WorkflowActionToken(typeof(EditRazorPageTemplateWorkflow)));
        }

        private static string GeneratedCshtmlFileName(string root, string templateTitle, Guid TemplateId)
        {
            string fileName = PathUtil.CleanFileName(templateTitle, true) ?? TemplateId.ToString();

            for(int i=0; i<100; i++)
            {
                string filePath = Path.Combine(root, fileName + (i == 0 ? "" : "_" + i.ToString()) + ".cshtml");

                if(!C1File.Exists(filePath))
                {
                    return filePath;
                }
            }

            throw new InvalidOperationException("Failed to generate file name");
        }

        private string GetRazorTemplatesRootFolder()
        {
            foreach(string providerName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(providerName);
                if(provider is RazorPageTemplateProvider)
                {
                    return (provider as RazorPageTemplateProvider).TemplateDirectoryPath;
                }
            }

            throw new InvalidOperationException("Failed to get instance of " + typeof(RazorPageTemplateProvider));
        }

        private string ProcessExistingTemplate(Guid templateId, Guid newTemplateId, string newTitle)
        {
            var razorTemplate = PageTemplateFacade.GetPageTemplate(templateId) as RazorPageTemplateDescriptor;
            Verify.IsNotNull(razorTemplate, "Failed to get razor template descriptor by id '{0}'", templateId);

            var provider = PageTemplateProviderRegistry.GetProviderByTemplateId(templateId) as RazorPageTemplateProvider;
            Verify.IsNotNull(provider, "Failed to get razor template provider by template id '{0}'", templateId);

            string fullPath = PathUtil.Resolve(razorTemplate.VirtualPath);
            string text = C1File.ReadAllText(fullPath);

            const string quote = @"""";

            Verify.That(text.IndexOf(templateId.ToString(), StringComparison.OrdinalIgnoreCase) > 0, 
                "Failed to replace existing templateId '{0}'", templateId);

            text = ReplaceString(text, templateId.ToString(), newTemplateId.ToString(), StringComparison.OrdinalIgnoreCase);

            // Replacing title
            text = text.Replace(quote + razorTemplate.Title + quote, quote + newTitle + quote);

            return text;
        }



        private void IsTitleUsed(object sender, ConditionalEventArgs e)
        {
            string title = this.GetBinding<string>("Title");

            e.Result = PageTemplateFacade.GetPageTemplates()
                            .Any(f => f.Title.Equals(title, StringComparison.InvariantCultureIgnoreCase));
        }



        private void ValidateFilePath(object sender, ConditionalEventArgs e)
        {
            // TODO: check for forbidden characters

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
